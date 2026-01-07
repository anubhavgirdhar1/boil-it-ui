import { CheckCircle, FolderOpen, Code, Undo } from 'lucide-react';
import { BoilResult } from './types';

interface Props {
  result: BoilResult;
  onClose: () => void;
  onOpenFolder: () => void;
  onOpenVSCode: () => void;
  onUndo: () => void;
}

export default function SuccessModal({
  result,
  onClose,
  onOpenFolder,
  onOpenVSCode,
  onUndo,
}: Props) {
  const hasValidPath = result.outputPath && result.outputPath.trim().length > 0;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header success-header">
          <CheckCircle size={24} className="success-icon" />
          <h2 className="modal-title">Structure Created</h2>
        </div>

        <div className="modal-body">
          <div className="success-stats">
            <div className="stat-item">
              <span className="stat-label">Folders:</span>
              <span className="stat-value">{result.folderCount}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Files:</span>
              <span className="stat-value">{result.fileCount}</span>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Output Path</label>
            <div className="output-path">{result.outputPath || 'No path selected'}</div>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onUndo} className="icon-btn-large">
            <Undo size={16} /> Undo
          </button>
          <button
            onClick={onOpenFolder}
            className="icon-btn-large"
            disabled={!hasValidPath}
          >
            <FolderOpen size={16} /> Open Folder
          </button>
          <button
            onClick={onOpenVSCode}
            className="primary-btn"
            disabled={!hasValidPath}
          >
            <Code size={16} /> Open in VS Code
          </button>
        </div>
      </div>
    </div>
  );
}
