export type NodeType = 'folder' | 'file';

export interface TreeNode {
  id: string;
  name: string;
  type: NodeType;
  parentId: string | null;
}

export interface Project {
  name: string;
  nodes: TreeNode[];
}

export interface Template {
  id: string;
  name: string;
  tags: string[];
  structure: TreeNode[];
  createdAt: Date;
}

export interface ValidationWarning {
  type: 'duplicate' | 'empty-root' | 'missing-readme' | 'invalid-name';
  message: string;
  nodeId?: string;
}

export interface BoilResult {
  success: boolean;
  folderCount: number;
  fileCount: number;
  outputPath: string;
}

export interface ManifestData {
  folderCount: number;
  fileCount: number;
  warnings: ValidationWarning[];
}

export type PreviewMode = 'tree' | 'manifest';
