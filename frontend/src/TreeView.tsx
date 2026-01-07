import { TreeNode } from './types';
import { Folder, File } from 'lucide-react';

interface Props {
  projectName: string;
  nodes: TreeNode[];
}

export default function TreeView({ projectName, nodes }: Props) {
  const buildTree = (parentId: string | null, level: number = 0): JSX.Element[] => {
    const children = nodes.filter(n => n.parentId === parentId);

    return children.map((node, index) => {
      const isLast = index === children.length - 1;
      const prefix = level === 0 ? '' : isLast ? '└── ' : '├── ';

      return (
        <div key={node.id}>
          <div className="tree-item" style={{ paddingLeft: `${level * 20}px` }}>
            <span className="tree-prefix">{prefix}</span>
            {node.type === 'folder' ? (
              <Folder size={14} className="tree-icon folder-icon" />
            ) : (
              <File size={14} className="tree-icon file-icon" />
            )}
            <span className="tree-name">{node.name}</span>
          </div>
          {node.type === 'folder' && buildTree(node.id, level + 1)}
        </div>
      );
    });
  };

  return (
    <div className="tree-view">
      <div className="tree-root">
        <Folder size={14} className="tree-icon folder-icon" />
        <span className="tree-name root-name">{projectName || 'my-project'}</span>
      </div>
      {buildTree(null, 1)}
    </div>
  );
}
