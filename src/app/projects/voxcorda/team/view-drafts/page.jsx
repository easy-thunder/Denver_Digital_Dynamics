import DraftsDashboard from '@/components/Article/article_preview/DraftsDashboard'
import { redirect } from 'next/navigation'
import { sbServer } from '@/lib/supabase-server';
export default async function ViewDraftsPage() {
    const supabase = await sbServer()


    // 1. Require auth
    const {
        data: { user },
        error: userError,
    } = await supabase.auth.getUser()

    if (userError || !user) {
        redirect('/login')
    }

    // 2. Require Voxcorda team membership
    const { data: teamRow, error: teamError } = await supabase
        .from('voxcorda_team')
        .select('role')
        .eq('user_id', user.id)
        .maybeSingle()

    if (teamError || !teamRow) {
        redirect('/login')
    }

    // 3. Load draft articles
    const { data: drafts, error: draftsError } = await supabase
        .from('articles')
        .select(
            `
      id,
      title,
      slug,
      category,
      subcategory,
      topic_detail,
      excerpt,
      thumbnail_url,
      status,
      visibility,
      sort_order,
      content,
      created_at,
      updated_at
    `
        )
        .order('created_at', { ascending: false })

    if (draftsError) {
        console.error('Error loading drafts:', draftsError)
    }
    return (
        <div>
            <h1>View Drafts Page</h1>
            <p>This is where team members can view their draft articles.</p>
            <DraftsDashboard
                drafts={drafts || []}
                teamRole={teamRow.role}
                userEmail={user.email}
            />        </div>
    )
}



