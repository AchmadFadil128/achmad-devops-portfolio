import Image from 'next/image';

export function PortraitFrame({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'portrait-frame portrait-frame--compact' : 'portrait-frame'}>
      <div className="portrait-frame__grid" aria-hidden="true" />
      <Image src="/profile.png" alt="Achmad Fadil" fill style={{ objectFit: 'cover' }} priority />
      <div className="portrait-frame__meta">
        <span>PROFILE_ASSET</span>
        <span>04:05 / PNG-WEBP</span>
      </div>
      <div className="portrait-frame__scan" aria-hidden="true" />
    </div>
  );
}
