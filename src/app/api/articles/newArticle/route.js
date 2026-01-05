import { NextResponse } from 'next/server'
import { sbServer } from  '@/lib/supabase-server'

export async function POST(req) {
  const supabase = await sbServer()

  // 1. Get the current user
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // 2. Check VoxCorda team membership
  const { data: teamRow, error: teamError } = await supabase
    .from('voxcorda_team')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (teamError) {
    console.error('voxcorda_team check failed:', teamError)
    return NextResponse.json(
      { error: 'Could not verify team membership' },
      { status: 500 }
    )
  }

  if (!teamRow) {
    return NextResponse.json(
      { error: 'Not authorized – VoxCorda team only' },
      { status: 403 }
    )
  }

  // 3. Parse body
  let body
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
  }

  const {
    title,
    slug,
    category,
    subcategory,
    topicDetail,
    excerpt,
    thumbnailUrl,
    videoUrl,
    contentRaw,
    sortOrder,
    status,
    visibility,
  } = body || {}

  // 4. Basic validation
  if (
    !title?.trim() ||
    !slug?.trim() ||
    !category?.trim() ||
    !subcategory?.trim() ||
    !contentRaw?.trim()
  ) {
    return NextResponse.json(
      { error: 'Missing required fields' },
      { status: 400 }
    )
  }

// 5. Build content JSON
const contentJson = {
    type: 'markdown',
    version: 1,
    markdown: contentRaw.trim(),
  }
  

  // 6. Insert article
  const { data, error } = await supabase
    .from('articles')
    .insert({
      title: title.trim(),
      slug: slug.trim(),
      category: category.trim(),
      subcategory: subcategory.trim(),
      topic_detail: topicDetail?.trim() || null,
      excerpt: excerpt?.trim() || null,
      thumbnail_url: thumbnailUrl?.trim() || null,
      video_url: videoUrl?.trim() || null,
      content: contentJson,
      sort_order: sortOrder ? Number(sortOrder) : null,
      status: status || 'draft',
      visibility: visibility || 'public',
      author_id: user.id,
    })
    .select('id, slug')
    .single()

  if (error) {
    console.error('Error inserting article:', error)
    return NextResponse.json(
      { error: 'Failed to create article' },
      { status: 500 }
    )
  }

  return NextResponse.json({ id: data.id, slug: data.slug }, { status: 201 })
}
