// app/wiki/page.jsx
import ArticleFileTree from '@/components/Article/file_tree/ArticleFileTree'
import { sbServer } from '@/lib/supabase-server'

export default async function WikiPage() {
  const supabase = await sbServer()

  // Fetch all *published* articles (public wiki-ish view)
  const { data: articles, error } = await supabase
    .from('articles')
    .select(
      `
      id,
      slug,
      title,
      category,
      subcategory,
      topic_detail,
      sort_order,
      status,
      visibility
    `
    )
    .eq('status', 'published')       // tweak if you want drafts too
    .order('category', { ascending: true }) // optional initial ordering

  if (error) {
    console.error('Error loading articles for wiki:', error)
  }

  return (
    <main style={{ maxWidth: 960, margin: '0 auto', padding: '24px 16px 40px' }}>
      <h1 style={{ marginBottom: '12px' }}>VoxCorda Wiki</h1>
      <p style={{ marginBottom: '16px', opacity: 0.8, fontSize: '0.9rem' }}>
        Browse articles by category, subcategory, and topic.
      </p>

      <ArticleFileTree articles={articles || []} />
    </main>
  )
}


