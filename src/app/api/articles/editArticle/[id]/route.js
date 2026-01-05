// app/api/articles/editArticle/[slug]/route.js
import { NextResponse } from 'next/server'
import { sbServer } from '@/lib/supabase-server'

export async function PATCH(req, { params }) {
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

  if (!body.id) {
    return NextResponse.json({ error: 'Missing article id' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('articles')
    .update({
      title: body.title,
      // do NOT change slug here; we trust the existing DB value
      category: body.category,
      subcategory: body.subcategory,
      topic_detail: body.topicDetail,
      excerpt: body.excerpt,
      thumbnail_url: body.thumbnailUrl,
      video_url: body.videoUrl,
      sort_order: body.sortOrder ? Number(body.sortOrder) : null,
      status: body.status,
      visibility: body.visibility,
      content: {
        type: 'markdown',
        version: 1,
        markdown: body.contentRaw || '',
      },
    })
    .eq('id', body.id)         // ⬅️ use primary key
    .eq('author_id', user.id)  // ⬅️ must be the original author
    .select()
    .maybeSingle()

  if (error) {
    console.error('Update article error:', error)
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Article not found or you do not have permission to edit it.' },
      { status: 404 }
    )
  }

  return NextResponse.json(data)
}
