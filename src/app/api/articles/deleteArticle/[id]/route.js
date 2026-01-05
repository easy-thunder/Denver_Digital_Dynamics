// app/api/articles/[id]/route.js
import { NextResponse } from 'next/server'
import { sbServer } from  '@/lib/supabase-server'

export async function DELETE(req, { params }) {
  const supabase = await sbServer()

  // 1. Auth check
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  // 2. Make sure user is on voxcorda_team
  const { data: teamRow, error: teamError } = await supabase
    .from('voxcorda_team')
    .select('id, role')
    .eq('user_id', user.id)
    .maybeSingle()

  if (teamError || !teamRow) {
    return NextResponse.json({ error: 'Not authorized' }, { status: 403 })
  }

  // 3. Delete draft by id (you can keep the `status = draft` guard if you like)
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', params.id)

  if (error) {
    console.error('Delete article error:', error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
