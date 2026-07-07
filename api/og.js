import { ImageResponse } from '@vercel/og';

export const config = { runtime: 'edge' };

const SB_URL = 'https://nhmmfriwthsvacfsrchd.supabase.co';
const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obW1mcml3dGhzdmFjZnNyY2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MjYzMjQsImV4cCI6MjA5NDUwMjMyNH0.FIN04Hjcsm6oMMpHB-lFG4_-FBByjtWX7HtezoHL1-o';

export default async function handler() {
  const res = await fetch(`${SB_URL}/rest/v1/scores?select=army,points`, {
    headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }
  });
  const scores = await res.json();

  const totals = { rat: 0, cat: 0 };
  scores.forEach(s => { totals[s.army] += s.points; });

  return new ImageResponse(
    <div style={{ width: '1200px', height: '630px', background: '#080608', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: 'serif', position: 'relative' }}>
      <div style={{ position: 'absolute', inset: '20px', border: '1px solid rgba(201,168,76,0.3)', display: 'flex' }} />
      <div style={{ color: '#c9a84c', fontSize: '28px', letterSpacing: '0.4em', textTransform: 'uppercase', marginBottom: '16px', display: 'flex' }}>
        The Amazing Digital Circus
      </div>
      <div style={{ color: '#ffffff', fontSize: '64px', fontWeight: 'bold', marginBottom: '8px', display: 'flex' }}>
        ⚔️ THE GREAT WAR
      </div>
      <div style={{ width: '200px', height: '1px', background: 'rgba(201,168,76,0.5)', marginBottom: '48px', display: 'flex' }} />
      <div style={{ display: 'flex', gap: '80px', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '48px', display: 'flex' }}>🐀</div>
          <div style={{ color: '#a0522d', fontSize: '24px', letterSpacing: '0.2em', display: 'flex' }}>RAT ARMY</div>
          <div style={{ color: '#a0522d', fontSize: '96px', fontWeight: 'bold', lineHeight: 1, display: 'flex' }}>{totals.rat}</div>
        </div>
        <div style={{ color: '#333', fontSize: '48px', display: 'flex' }}>VS</div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
          <div style={{ fontSize: '48px', display: 'flex' }}>🐱</div>
          <div style={{ color: '#9b59b6', fontSize: '24px', letterSpacing: '0.2em', display: 'flex' }}>CAT ARMY</div>
          <div style={{ color: '#9b59b6', fontSize: '96px', fontWeight: 'bold', lineHeight: 1, display: 'flex' }}>{totals.cat}</div>
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '40px', color: 'rgba(201,168,76,0.4)', fontSize: '14px', letterSpacing: '0.3em', display: 'flex' }}>
        PUBLIC SCORES ONLY · HIDDEN VARIABLES REVEALED AT THE FINALE
      </div>
    </div>,
    { width: 1200, height: 630 }
  );
}