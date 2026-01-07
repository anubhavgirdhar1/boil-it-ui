import { useState } from 'react';
import { PreviewMode, ManifestData } from './types';
import TreeView from './TreeView';
import ManifestView from './ManifestView';

interface Props {
  projectName: string;
  nodes: any[];
  manifestData: ManifestData;
}

export default function PreviewPanel({ projectName, nodes, manifestData }: Props) {
  const [mode, setMode] = useState<PreviewMode>('tree');

  return (
    <div className="preview-panel">
      <div className="preview-header">
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
      </div>

      <div className="preview-content">
        {mode === 'tree' ? (
          <TreeView projectName={projectName} nodes={nodes} />
        ) : (
          <ManifestView data={manifestData} />
        )}
      </div>
    </div>
  );
}
