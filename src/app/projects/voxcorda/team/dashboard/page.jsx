// app/team/dashboard/page.jsx
import { redirect } from 'next/navigation';
import { sbServer } from '@/lib/supabase-server';
import Button from '@/components/ui/Button/Button';

export default async function TeamDashboardPage() {
  const supabase = await sbServer();

  // 1. Check if the user is logged in
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    redirect('/login'); // adjust if your login route is different
  }

  // 2. Check if this user is in voxcorda_team
  const { data: teamRow, error: teamError } = await supabase
    .from('voxcorda_team')
    .select('role')
    .eq('user_id', user.id)
    .maybeSingle();

  if (teamError || !teamRow) {
    redirect('/login');
  }

  // 3. If we get here, they are a team member
  return (
    <main style={{ padding: '2rem', height: '100vh' }}>
      <h2>VoxCorda Team Dashboard</h2>
      <p>Welcome, {user.email}</p>
      <p>Your role: {teamRow.role}</p>
      <p>Your Actions:</p>
        <Button label='Write Article' href='/projects/voxcorda/team/new-article'>
          Write Article
        </Button>
        <Button label='View Drafts'href='/projects/voxcorda/team/view-drafts' style={{ marginLeft: '1rem' }}>
          View Drafts
        </Button>
    </main>
  );
}
