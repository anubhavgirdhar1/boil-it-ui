import { Flame } from 'lucide-react';

export default function TitleBar() {
  return (
    <div className="title-bar">
      <div className="title-bar-content">
        <Flame className="fire-icon" size={16} strokeWidth={2} />
        <span className="title-text">Boil-it UI</span>
      </div>
      <div className="title-bar-mode">
        <button className="mode-btn active">Manual</button>
        <button className="mode-btn disabled" disabled>
          AI
          <span className="badge">Coming Soon</span>
        </button>
      </div>
    </div>
  );
}
