import { notFound } from 'next/navigation'
import { sbServer } from '@/lib/supabase-server'
import ArticleView from '@/components/Article/article_view/ArticleView'

export default async function ViewArticlePage({ params }) {
  const supabase = await sbServer()
  const { slug } = params

  // 1️⃣ Load the article (only published + public)
  const { data: article, error: articleError } = await supabase
    .from('articles')
    .select(`
      id,
      slug,
      title,
      content,
      category,
      subcategory,
      topic_detail,
      excerpt,
      thumbnail_url,
      video_url,
      status,
      visibility
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .eq('visibility', 'public')
    .maybeSingle()

  if (articleError) {
    console.error('Article fetch error:', articleError)
  }

  if (!article) {
    notFound()
  }

  // 2️⃣ Load quiz (if any) for this article
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

  // 3️⃣ Render the shared ArticleView
  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 40px' }}>
      <ArticleView article={article} quiz={quiz || null} />
    </main>
  )
}
