import { useState, useRef } from 'react';
import { X, FolderOpen } from 'lucide-react';

interface Props {
  onClose: () => void;
  onConfirm: (path: string) => void;
}

export default function PathSelectionModal({ onClose, onConfirm }: Props) {
  const [path, setPath] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleBrowse = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      const fullPath = (file as any).path || file.webkitRelativePath;
      if (fullPath) {
        const dirPath = fullPath.substring(0, fullPath.lastIndexOf('/'));
        setPath(dirPath || fullPath);
      }
    }
  };

  const handleConfirm = () => {
    if (path.trim()) {
      onConfirm(path.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && path.trim()) {
      handleConfirm();
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">Create Project Structure</h2>
          <button onClick={onClose} className="icon-btn">
            <X size={16} />
          </button>
        </div>

        <div className="modal-body">
          <div className="field-group">
            <label className="field-label">Destination Path</label>
            <div style={{ display: 'flex', gap: '8px' }}>
              <input
                type="text"
                value={path}
                onChange={(e) => setPath(e.target.value)}
                onKeyDown={handleKeyDown}
                className="text-input"
                placeholder="/Users/yourname/Projects/my-project"
                style={{ flex: 1 }}
              />
              <button
                onClick={handleBrowse}
                className="secondary-btn"
                style={{ display: 'flex', alignItems: 'center', gap: '6px', whiteSpace: 'nowrap' }}
              >
                <FolderOpen size={14} />
                Browse
              </button>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              style={{ display: 'none' }}
              {...({ webkitdirectory: '', directory: '' } as any)}
            />
            <p style={{ fontSize: '12px', color: '#666', marginTop: '8px', lineHeight: '1.5' }}>
              Browse to select a folder or enter the full path manually. The structure will be created at this location.
            </p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="secondary-btn">Cancel</button>
          <button
            onClick={handleConfirm}
            className="primary-btn"
            disabled={!path.trim()}
          >
            Boil It
          </button>
        </div>
      </div>
    </div>
  );
}
