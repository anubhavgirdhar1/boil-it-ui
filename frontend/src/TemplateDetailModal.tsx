import { useState, useMemo } from 'react';
import { Template, PreviewMode, TreeNode } from './types';
import { X } from 'lucide-react';
import TreeView from './TreeView';
import ManifestView from './ManifestView';
import { validateStructure } from './api';

interface Props {
  template: Template;
  onClose: () => void;
  onBoil: (nodes: TreeNode[]) => void;
  onForge: (template: Template) => void;
}

export default function TemplateDetailModal({ template, onClose, onBoil, onForge }: Props) {
  const [mode, setMode] = useState<PreviewMode>('tree');

  const manifestData = useMemo(() => {
    const folderCount = template.structure.filter(n => n.type === 'folder').length;
    const fileCount = template.structure.filter(n => n.type === 'file').length;
    const warnings = validateStructure(template.structure);
    return { folderCount, fileCount, warnings };
  }, [template.structure]);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal template-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{template.name}</h2>
          <button onClick={onClose} className="icon-btn">
            <X size={16} />
          </button>
        </div>

        {template.tags.length > 0 && (
          <div className="modal-tags">
            {template.tags.map((tag, i) => (
              <span key={i} className="card-tag">{tag}</span>
            ))}
          </div>
        )}

        <div className="modal-preview">
          <div className="toggle-group">
            <button
              className={`toggle-btn ${mode === 'tree' ? 'active' : ''}`}
              onClick={() => setMode('tree')}
            >
              Tree View
            </button>
            <button
              className={`toggle-btn ${mode === 'manifest' ? 'active' : ''}`}
              onClick={() => setMode('manifest')}
            >
              Manifest View
            </button>
          </div>

          <div className="modal-preview-content">
            {mode === 'tree' ? (
              <TreeView projectName={template.name} nodes={template.structure} />
            ) : (
              <ManifestView data={manifestData} />
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="secondary-btn">Close</button>
          <button onClick={() => onForge(template)} className="secondary-btn">
            Forge it
          </button>
          <button onClick={() => onBoil(template.structure)} className="primary-btn">
            Boil it
          </button>
        </div>
      </div>
    </div>
  );
}
