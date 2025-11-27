import React from 'react';
import { Copy, Check, Terminal } from 'lucide-react';

interface CodeBlockProps {
  code: string;
  language?: string;
  title?: string;
}

export const CodeBlock: React.FC<CodeBlockProps> = ({ code, language = 'typescript', title }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6 border border-primary bg-zinc-950 text-zinc-100 rounded-sm overflow-hidden shadow-sm font-mono text-sm">
      <div className="flex items-center justify-between px-3 py-2 border-b border-zinc-800 bg-zinc-900/50">
        <div className="flex items-center gap-2 text-zinc-400">
          <Terminal size={14} />
          <span className="text-xs font-medium uppercase tracking-wider">{title || language}</span>
        </div>
        <button 
          onClick={handleCopy}
          className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
          title="Copy to clipboard"
        >
          {copied ? <Check size={14} className="text-emerald-500" /> : <Copy size={14} />}
        </button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="font-mono text-[13px] leading-relaxed">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};