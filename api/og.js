export const config = { runtime: 'edge' };

export default async function handler() {
  const SB_URL = 'https://nhmmfriwthsvacfsrchd.supabase.co';
  const SB_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5obW1mcml3dGhzdmFjZnNyY2hkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzg5MjYzMjQsImV4cCI6MjA5NDUwMjMyNH0.FIN04Hjcsm6oMMpHB-lFG4_-FBByjtWX7HtezoHL1-o';

  const res = await fetch(`${SB_URL}/rest/v1/scores?select=army,points`, {
    headers: { apikey: SB_ANON, Authorization: `Bearer ${SB_ANON}` }
  });
  const scores = await res.json();
  const totals = { rat: 0, cat: 0 };
  scores.forEach(s => { totals[s.army] += s.points; });

  const svg = `<svg width="1200" height="630" xmlns="http://www.w3.org/2000/svg">
    <rect width="1200" height="630" fill="#080608"/>
    <rect x="20" y="20" width="1160" height="590" fill="none" stroke="rgba(201,168,76,0.3)" stroke-width="1"/>
    <text x="600" y="120" font-family="serif" font-size="28" fill="#c9a84c" text-anchor="middle" letter-spacing="8">THE AMAZING DIGITAL CIRCUS</text>
    <text x="600" y="210" font-family="serif" font-size="64" font-weight="bold" fill="#ffffff" text-anchor="middle">THE GREAT WAR</text>
    <text x="280" y="310" font-family="serif" font-size="64" text-anchor="middle">🐀</text>
    <text x="280" y="360" font-family="serif" font-size="24" fill="#a0522d" text-anchor="middle" letter-spacing="4">RAT ARMY</text>
    <text x="280" y="470" font-family="serif" font-size="96" font-weight="bold" fill="#a0522d" text-anchor="middle">${totals.rat}</text>
    <text x="600" y="420" font-family="serif" font-size="48" fill="#333333" text-anchor="middle">VS</text>
    <text x="920" y="310" font-family="serif" font-size="64" text-anchor="middle">🐱</text>
    <text x="920" y="360" font-family="serif" font-size="24" fill="#9b59b6" text-anchor="middle" letter-spacing="4">CAT ARMY</text>
    <text x="920" y="470" font-family="serif" font-size="96" font-weight="bold" fill="#9b59b6" text-anchor="middle">${totals.cat}</text>
    <text x="600" y="590" font-family="serif" font-size="14" fill="rgba(201,168,76,0.4)" text-anchor="middle" letter-spacing="3">PUBLIC SCORES ONLY · HIDDEN VARIABLES REVEALED AT THE FINALE</text>
  </svg>`;

  return new Response(svg, {
    headers: { 'Content-Type': 'image/svg+xml', 'Cache-Control': 'no-cache' }
  });
}