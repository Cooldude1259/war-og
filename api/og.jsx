import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

export default async function handler() {
  const SB_URL = 'https://supabase.co';
  const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obW1mcml3dGhzdmFjZnNyY2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MjYzMjQsImV4cCI6MjA5NDUwMjMyNH0.FIN04Hjcsm6oMMpHB-lFG4_-FBByjtWX7HtezoHL1-o';

  const res = await fetch(`${SB_URL}/rest/v1/scores?select=army,points`, {
    headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }
  });
  const scores = await res.json();
  const totals = { rat: 0, cat: 0 };
  scores.forEach(s => { totals[s.army] += s.points; });

  return new ImageResponse(
    (
      <div style={{
        width: '1200px',
        height: '630px',
        backgroundColor: '#080608',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '50px 20px',
        position: 'relative',
        fontFamily: 'serif'
      }}>
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          right: '20px',
          bottom: '20px',
          border: '1px solid rgba(201,168,76,0.3)',
          pointerEvents: 'none'
        }} />

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ color: '#c9a84c', fontSize: '28px', letterSpacing: '8px', marginBottom: '10px' }}>
            THE AMAZING DIGITAL CIRCUS
          </div>
          <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 'bold' }}>
            THE GREAT WAR
          </div>
        </div>

        <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around', alignItems: 'center', padding: '0 60px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
            <span style={{ fontSize: '64px' }}>🐀</span>
            <span style={{ color: '#a0522d', fontSize: '24px', letterSpacing: '4px', marginTop: '10px' }}>RAT ARMY</span>
            <span style={{ color: '#a0522d', fontSize: '96px', fontWeight: 'bold' }}>{totals.rat}</span>
          </div>

          <div style={{ color: '#333333', fontSize: '48px', fontWeight: 'bold' }}>VS</div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '300px' }}>
            <span style={{ fontSize: '64px' }}>🐱</span>
            <span style={{ color: '#9b59b6', fontSize: '24px', letterSpacing: '4px', marginTop: '10px' }}>CAT ARMY</span>
            <span style={{ color: '#9b59b6', fontSize: '96px', fontWeight: 'bold' }}>{totals.cat}</span>
          </div>
        </div>

        <div style={{ color: 'rgba(201,168,76,0.4)', fontSize: '14px', letterSpacing: '3px' }}>
          PUBLIC SCORES ONLY · HIDDEN VARIABLES REVEALED AT THE FINALE
        </div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
