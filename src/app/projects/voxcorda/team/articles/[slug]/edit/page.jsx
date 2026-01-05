// app/team/articles/[slug]/edit/page.jsx
import { redirect, notFound } from 'next/navigation'
import { sbServer } from '@/lib/supabase-server'
import EditArticleForm from './EditArticleForm'

export default async function EditArticlePage({ params }) {
  const supabase = await sbServer()

  // 1. Auth
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  // 2. Must be VoxCorda team
  const { data: teamRow } = await supabase
    .from('voxcorda_team')
    .select('id')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!teamRow) {
    redirect('/login')
  }

  // 3. Load article by slug
  const { data: article, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', params.slug)
    .maybeSingle()

  if (error) {
    console.error('Edit article fetch error:', error)
  }

  if (!article) {
    notFound()
  }

  return <EditArticleForm initialArticle={article} />
}