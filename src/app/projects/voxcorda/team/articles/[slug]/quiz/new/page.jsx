// app/team/articles/[slug]/quiz/new/page.jsx
import { notFound, redirect } from 'next/navigation'
import { sbServer } from '@/lib/supabase-server'
import QuizBuilder from './QuizBuilder'

export default async function NewQuizPage({ params }) {
  const supabase = await sbServer()

  // Auth
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    redirect('/login')
  }

  // Load article by slug, but only if current user is the author
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .eq('author_id', user.id)
    .maybeSingle()

  if (error) {
    console.error('Load article for quiz error:', error)
  }
  if (!article) {
    notFound()
  }

  // Optional: if you ever want “edit quiz”, you could also load an
  // existing quiz here with .from('quizzes').select('*').eq('article_id', article.id)

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 40px' }}>
      <QuizBuilder article={article} />
    </main>
  )
}
