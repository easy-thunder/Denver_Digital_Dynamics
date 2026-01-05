import { NextResponse } from 'next/server'
import { sbServer } from  '@/lib/supabase-server'

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

  // Expect status in body (e.g., 'published' or 'draft')
  if (!body.status) {
    return NextResponse.json({ error: 'Missing status.' }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('articles')
    .update({ status: body.status })
    .eq('id', params.id)
    .eq('author_id', user.id) 
    .select()
    .maybeSingle()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  if (!data) {
    return NextResponse.json(
      { error: 'Article not found or permission denied.' },
      { status: 404 }
    )
  }

  return NextResponse.json({ success: true, status: data.status })
}
