import { ImageResponse } from 'next/og';

export const size = { width: 64, height: 64 };
export const contentType = 'image/png';

export default function Icon() {
  return new ImageResponse(
    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#0a0e10', color: '#dfff72', fontSize: 24, fontWeight: 800, border: '2px solid #dfff72' }}>
      AF
    </div>,
    size,
  );
}
