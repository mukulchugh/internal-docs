import React from 'react';

export type DocStatus = 'prod' | 'proposed' | 'deprecated';

export interface NavItem {
  id: string;
  label: string;
}

export interface PackageMeta {
  id: string;
  name: string;
  version: string;
  status: DocStatus;
  description: string;
}

export interface FileNode {
  name: string;
  type: 'file' | 'folder' | 'component' | 'hook';
  children?: FileNode[];
  comment?: string;
}

export interface DocSection {
  title: string;
  content: React.ReactNode;
}

export interface PackageDocs {
  overview: DocSection;
  architecture: DocSection;
  api: DocSection;
  plan: DocSection;
}
