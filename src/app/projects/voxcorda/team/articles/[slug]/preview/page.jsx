// app/team/articles/[slug]/preview/page.jsx
import { notFound, redirect } from 'next/navigation'
import { sbServer } from '@/lib/supabase-server'
import ArticleView from '@/components/Article/article_view/ArticleView'

export default async function TeamArticlePreviewPage({ params }) {
  const supabase = await sbServer()

  // 1. Check auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Ensure user is a VoxCorda team member
  const { data: teamRow } = await supabase
    .from('voxcorda_team')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!teamRow) {
    // not a team member → you can redirect or 404
    redirect('/login')
  }

  // 3. Load article by slug (drafts allowed)
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle()

  if (error) {
    console.error('Article preview fetch error:', error)
  }
  if (!article) {
    notFound()
  }


    // 4. Load quiz (if any) for this article
    const { data: quiz, error: quizError } = await supabase
    .from('quizzes')
    .select(`
      id,
      title,
      description,
      quiz_questions (
        id,
        type,
        question_text,
        choices,
        correct_answer,
        explanation
      )
    `)
    .eq('article_id', article.id)
    .maybeSingle()

  if (quizError) {
    console.error('Quiz fetch error:', quizError)
  }

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 40px' }}>
      <ArticleView article={article} quiz={quiz ?? null}/>
    </main>
  )
}
