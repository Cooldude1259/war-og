import { ImageResponse } from '@vercel/og';

export const runtime = 'edge';

export async function GET() {
  const SB_URL = 'https://nhmmfriwthsvacfsrchd.supabase.co';
  const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obW1mcml3dGhzdmFjZnNyY2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MjYzMjQsImV4cCI6MjA5NDUwMjMyNH0.FIN04Hjcsm6oMMpHB-lFG4_-FBByjtWX7HtezoHL1-o';

  const res = await fetch(`${SB_URL}/rest/v1/scores?select=army,points`, {
    headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }
  });
  const scores = await res.json();
  const totals = { rat: 0, cat: 0 };
  scores.forEach(s => { totals[s.army] += s.points; });

  return new ImageResponse(
    (
      /* Doubled container to 2400x1260 for native 2x density (no more blur) */
      <div style={{
        width: '2400px',
        height: '1260px',
        backgroundColor: '#080608',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '100px 40px',
        position: 'relative',
        fontFamily: 'serif'
      }}>
        {/* Doubled Decorative Border Layout */}
        <div style={{
          position: 'absolute',
          top: '40px',
          left: '40px',
          right: '40px',
          bottom: '40px',
          border: '2px solid rgba(201,168,76,0.3)',
          pointerEvents: 'none'
        }} />

        {/* Header Section */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#c9a84c', fontSize: '56px', letterSpacing: '16px', marginBottom: '20px' }}>
            THE AMAZING DIGITAL CIRCUS
          </div>
          <div style={{ color: '#ffffff', fontSize: '128px', fontWeight: 'bold' }}>
            THE GREAT WAR
          </div>
        </div>

        {/* Versus Score Section */}
        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', padding: '0 120px' }}>
          {/* Rat Army */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px' }}>
            <span style={{ fontSize: '128px' }}>🐀</span>
            <span style={{ color: '#a0522d', fontSize: '48px', letterSpacing: '8px', marginTop: '20px' }}>RAT ARMY</span>
            <span style={{ color: '#a0522d', fontSize: '192px', fontWeight: 'bold' }}>{totals.rat}</span>
          </div>

          {/* VS */}
          <div style={{ color: '#333333', fontSize: '96px', fontWeight: 'bold' }}>VS</div>

          {/* Cat Army */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '600px' }}>
            <span style={{ fontSize: '128px' }}>🐱</span>
            <span style={{ color: '#9b59b6', fontSize: '48px', letterSpacing: '8px', marginTop: '20px' }}>CAT ARMY</span>
            <span style={{ color: '#9b59b6', fontSize: '192px', fontWeight: 'bold' }}>{totals.cat}</span>
          </div>
        </div>

        {/* Footer Section */}
        <div style={{ color: 'rgba(201,168,76,0.4)', fontSize: '28px', letterSpacing: '6px' }}>
          PUBLIC SCORES ONLY · HIDDEN VARIABLES REVEALED AT THE FINALE
        </div>
      </div>
    ),
    { 
      width: 1200, 
      height: 630 
    } // Keeps meta bounds at standard 1200x630 while drawing at 2x resolution
  );
}
