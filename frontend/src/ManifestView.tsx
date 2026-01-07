import { ManifestData } from './types';
import { AlertTriangle, CheckCircle } from 'lucide-react';

interface Props {
  data: ManifestData;
}

export default function ManifestView({ data }: Props) {
  return (
    <div className="manifest-view">
      <div className="manifest-section">
        <h3 className="manifest-title">Summary</h3>
        <div className="manifest-stats">
          <div className="stat-item">
            <span className="stat-label">Folders:</span>
            <span className="stat-value">{data.folderCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Files:</span>
            <span className="stat-value">{data.fileCount}</span>
          </div>
          <div className="stat-item">
            <span className="stat-label">Total:</span>
            <span className="stat-value">{data.folderCount + data.fileCount}</span>
          </div>
        </div>
      </div>

      <div className="manifest-section">
        <h3 className="manifest-title">Validation</h3>
        {data.warnings.length === 0 ? (
          <div className="validation-ok">
            <CheckCircle size={16} />
            <span>No issues found</span>
          </div>
        ) : (
          <div className="warnings-list">
            {data.warnings.map((warning, i) => (
              <div key={i} className="warning-item">
                <AlertTriangle size={14} className="warning-icon" />
                <span className="warning-text">{warning.message}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
