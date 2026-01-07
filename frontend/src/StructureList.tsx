import { TreeNode } from './types';
import { Folder, File, Trash2, Copy, Edit2 } from 'lucide-react';

interface Props {
  nodes: TreeNode[];
  onRename: (id: string, newName: string) => void;
  onDelete: (id: string) => void;
  onDuplicate: (id: string) => void;
}

export default function StructureList({ nodes, onRename, onDelete, onDuplicate }: Props) {
  const buildTree = (parentId: string | null, level: number = 0): JSX.Element[] => {
    return nodes
      .filter(n => n.parentId === parentId)
      .map(node => (
        <div key={node.id}>
          <div className="structure-item" style={{ paddingLeft: `${level * 20 + 8}px` }}>
            <div className="structure-item-left">
              {node.type === 'folder' ? (
                <Folder size={14} className="node-icon" />
              ) : (
                <File size={14} className="node-icon" />
              )}
              <input
                type="text"
                value={node.name}
                onChange={(e) => onRename(node.id, e.target.value)}
                className="node-name-input"
              />
            </div>
            <div className="structure-item-actions">
              <button
                onClick={() => onDuplicate(node.id)}
                className="icon-btn"
                title="Duplicate"
              >
                <Copy size={12} />
              </button>
              <button
                onClick={() => onDelete(node.id)}
                className="icon-btn"
                title="Delete"
              >
                <Trash2 size={12} />
              </button>
            </div>
          </div>
          {node.type === 'folder' && buildTree(node.id, level + 1)}
        </div>
      ));
  };

  return (
    <div className="structure-list">
      {nodes.length === 0 ? (
        <div className="empty-state">No nodes yet. Add a folder or file to start.</div>
      ) : (
        buildTree(null)
      )}
    </div>
  );
}
