export function PortraitFrame({ compact = false }: { compact?: boolean }) {
  return (
    <div className={compact ? 'portrait-frame portrait-frame--compact' : 'portrait-frame'}>
      <div className="portrait-frame__grid" aria-hidden="true" />
      <div className="portrait-frame__placeholder">
        <div className="portrait-frame__silhouette" aria-hidden="true">
          <span />
          <i />
        </div>
        <p>HALF-BODY PORTRAIT SPACE</p>
        <small>Replace this layer with /public/profile.png</small>
      </div>
      <div className="portrait-frame__meta">
        <span>PROFILE_ASSET</span>
        <span>04:05 / PNG-WEBP</span>
      </div>
      <div className="portrait-frame__scan" aria-hidden="true" />
    </div>
  );
}
