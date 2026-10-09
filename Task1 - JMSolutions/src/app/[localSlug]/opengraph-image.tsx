import { ImageResponse } from 'next/og';
import { parseLocalSlug } from '@/lib/local';

export const runtime = 'edge';
export const alt = 'AC Repair Services';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function Image({ params }: { params: Promise<{ localSlug: string }> }) {
  const { localSlug } = await params;
  const hit = parseLocalSlug(localSlug);
  if (!hit) return new Response('Not Found', { status: 404 });

  const { area } = hit;

  return new ImageResponse(
    (
      <div
        style={{
          background: '#090a0d',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          padding: '64px',
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 'bold', marginBottom: 32 }}>
          JM Comfort Solutions
        </div>
        <div style={{ fontSize: 48, color: '#38bdf8' }}>
          AC Repair in {area.town}, {area.st}
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
