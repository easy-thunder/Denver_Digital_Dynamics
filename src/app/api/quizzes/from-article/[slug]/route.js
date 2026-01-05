// app/api/quizzes/from-article/[slug]/route.js
import { NextResponse } from 'next/server'
import { sbServer } from  '@/lib/supabase-server'

export async function POST(req, { params }) {
  const supabase = await sbServer()
  const body = await req.json()

  // Auth
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // Find article and ensure current user is author
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select('id, author_id')
    .eq('slug', params.slug)
    .maybeSingle()

  if (articleError) {
    console.error('Load article for quiz error:', articleError)
    return NextResponse.json(
      { error: articleError.message },
      { status: 400 }
    )
  }

  if (!article || article.author_id !== user.id) {
    return NextResponse.json(
      { error: 'Article not found or you do not have permission.' },
      { status: 404 }
    )
  }

  // 1 quiz per article: delete existing questions + quiz (optional)
  const { data: existingQuiz } = await supabase
    .from('quizzes')
    .select('id')
    .eq('article_id', article.id)
    .maybeSingle()

  if (existingQuiz) {
    await supabase.from('quiz_questions').delete().eq('quiz_id', existingQuiz.id)
    await supabase.from('quizzes').delete().eq('id', existingQuiz.id)
  }

  // Create quiz
  const { data: quizRow, error: quizError } = await supabase
    .from('quizzes')
    .insert({
      article_id: article.id,
      title: body.title || 'Quiz',
      description: body.description || null,
    })
    .select()
    .single()

  if (quizError) {
    console.error('Create quiz error:', quizError)
    return NextResponse.json({ error: quizError.message }, { status: 400 })
  }

  const quizId = quizRow.id

  // Prepare question rows
  const questionRows = (body.questions || [])
    .filter(q => q.questionText?.trim())
    .map(q => ({
      quiz_id: quizId,
      type: q.type, // must match your enum values
      question_text: q.questionText.trim(),
      choices: q.choices || [],
      correct_answer: q.correctAnswer
        ? [q.correctAnswer]       // store as array
        : [],
      explanation: q.explanation || null,
    }))

  if (questionRows.length > 0) {
    const { error: qError } = await supabase
      .from('quiz_questions')
      .insert(questionRows)

    if (qError) {
      console.error('Insert quiz questions error:', qError)
      return NextResponse.json({ error: qError.message }, { status: 400 })
    }
  }

  return NextResponse.json({ quizId })
}
