import React from 'react';
import { Folder, FileCode, File, Box } from 'lucide-react';
import { FileNode } from '../types';

const FileTreeNode: React.FC<{ node: FileNode; depth?: number; last?: boolean }> = ({ node, depth = 0, last = false }) => {
  const getIcon = () => {
    switch (node.type) {
      case 'folder': return <Folder size={14} className="fill-zinc-800 text-zinc-800" />;
      case 'component': return <Box size={14} className="text-zinc-600" />;
      case 'hook': return <FileCode size={14} className="text-zinc-600" />;
      default: return <File size={14} className="text-zinc-400" />;
    }
  };

  return (
    <div className="font-mono text-xs select-none relative">
      <div 
        className="flex items-center gap-2 py-1 hover:bg-zinc-100 rounded-sm px-2 transition-colors duration-100 cursor-default"
        style={{ paddingLeft: `${depth * 1.25 + 0.5}rem` }}
      >
        {depth > 0 && (
           <div className="absolute left-0 top-0 bottom-0 border-l border-zinc-200" style={{ left: `${(depth * 1.25)}rem` }} />
        )}
        {getIcon()}
        <span className={`${node.type === 'folder' ? 'text-zinc-900 font-bold' : 'text-zinc-600'}`}>
          {node.name}
        </span>
        {node.comment && (
          <span className="text-zinc-400 italic ml-auto mr-2 opacity-60 text-[10px]">// {node.comment}</span>
        )}
      </div>
      {node.children && (
        <div>
          {node.children.map((child, idx) => (
            <FileTreeNode key={idx} node={child} depth={depth + 1} last={idx === node.children!.length - 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const FileTree: React.FC<{ data: FileNode }> = ({ data }) => {
  return (
    <div className="bg-white border border-border rounded-sm p-4 my-6 overflow-x-auto">
      <div className="flex items-center gap-2 mb-3 text-xs font-bold text-zinc-500 uppercase tracking-widest px-2 border-b border-zinc-100 pb-2">
        <span>Project Explorer</span>
      </div>
      <FileTreeNode node={data} />
    </div>
  );
};