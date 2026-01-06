import TeamHeader from './TeamHeader';

export default function TeamLayout({ children }) {
  return (
    <div>
      <TeamHeader />
      <main
        style={{
          maxWidth: '960px',
          margin: '0 auto',
          padding: '1.5rem 1rem',
        }}
      >
        {children}
      </main>
    </div>
  );
}
