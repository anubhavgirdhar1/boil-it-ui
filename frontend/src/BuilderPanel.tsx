import { useState } from 'react';
import { TreeNode, NodeType } from './types';
import StructureList from './StructureList';
import { Plus } from 'lucide-react';

interface Props {
  projectName: string;
  nodes: TreeNode[];
  onProjectNameChange: (name: string) => void;
  onAddNode: (node: TreeNode) => void;
  onRenameNode: (id: string, newName: string) => void;
  onDeleteNode: (id: string) => void;
  onDuplicateNode: (id: string) => void;
  onBoilIt: () => void;
  onForgeIt: () => void;
}

export default function BuilderPanel({
  projectName,
  nodes,
  onProjectNameChange,
  onAddNode,
  onRenameNode,
  onDeleteNode,
  onDuplicateNode,
  onBoilIt,
  onForgeIt,
}: Props) {
  const [nodeType, setNodeType] = useState<NodeType>('folder');
  const [nodeName, setNodeName] = useState('');
  const [parentId, setParentId] = useState<string | null>(null);

  const handleAdd = () => {
    if (!nodeName.trim()) return;

    const newNode: TreeNode = {
      id: `node-${Date.now()}`,
      name: nodeName.trim(),
      type: nodeType,
      parentId,
    };

    onAddNode(newNode);
    setNodeName('');
  };

  const folderNodes = nodes.filter(n => n.type === 'folder');

  return (
    <div className="builder-panel">
      <div className="panel-section">
        <label className="field-label">Project Name</label>
        <input
          type="text"
          value={projectName}
          onChange={(e) => onProjectNameChange(e.target.value)}
          className="text-input"
          placeholder="my-project"
        />
      </div>

      <div className="panel-section">
        <label className="field-label">Add Node</label>
        <div className="toggle-group">
          <button
            className={`toggle-btn ${nodeType === 'folder' ? 'active' : ''}`}
            onClick={() => setNodeType('folder')}
          >
            Folder
          </button>
          <button
            className={`toggle-btn ${nodeType === 'file' ? 'active' : ''}`}
            onClick={() => setNodeType('file')}
          >
            File
          </button>
        </div>

        <input
          type="text"
          value={nodeName}
          onChange={(e) => setNodeName(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          className="text-input"
          placeholder="Name"
        />

        <select
          value={parentId ?? ''}
          onChange={(e) => setParentId(e.target.value || null)}
          className="select-input"
        >
          <option value="">Root</option>
          {folderNodes.map(f => (
            <option key={f.id} value={f.id}>{f.name}</option>
          ))}
        </select>

        <button onClick={handleAdd} className="add-btn">
          <Plus size={14} /> Add
        </button>
      </div>

      <div className="panel-section flex-1">
        <label className="field-label">Structure</label>
        <StructureList
          nodes={nodes}
          onRename={onRenameNode}
          onDelete={onDeleteNode}
          onDuplicate={onDuplicateNode}
        />
      </div>

      <div className="panel-actions">
        <button onClick={onBoilIt} className="primary-btn">Boil it</button>
        <button onClick={onForgeIt} className="secondary-btn">Forge it</button>
      </div>
    </div>
  );
}
