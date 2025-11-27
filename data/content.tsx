import React from 'react';
import { Layout, Cpu, Terminal, Share2, Zap, Database, Code, Box, GitBranch } from 'lucide-react';
import { PackageMeta, PackageDocs, FileNode } from '../types';
import { Mermaid } from '../components/Mermaid';
import { CodeBlock } from '../components/CodeBlock';
import { FileTree } from '../components/FileTree';

// --- Helper Components for Content ---

const FeatureCard = ({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) => (
  <div className="bg-white p-4 border border-border rounded-sm flex flex-col items-start gap-3 hover:border-zinc-400 transition-colors">
    <div className="text-zinc-900">{icon}</div>
    <div>
      <h4 className="font-bold text-zinc-900 text-sm font-mono">{title}</h4>
      <p className="text-xs text-zinc-500 mt-1 leading-relaxed">{desc}</p>
    </div>
  </div>
);

const PhaseItem = ({ phase, title, desc }: { phase: string, title: string, desc: string }) => (
  <div className="flex gap-4 items-start p-4 border border-border bg-zinc-50/50 rounded-sm">
    <div className="w-6 h-6 border border-zinc-900 bg-white text-zinc-900 flex items-center justify-center font-bold font-mono text-xs shrink-0">
      {phase}
    </div>
    <div>
      <h4 className="font-bold text-zinc-900 text-sm font-mono">{title}</h4>
      <p className="text-xs text-zinc-600 mt-1">{desc}</p>
    </div>
  </div>
);

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'outline' }) => {
  const styles = {
    default: "bg-zinc-900 text-white border-zinc-900",
    outline: "bg-white text-zinc-900 border-zinc-200",
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-sm ${styles[variant]}`}>
      {children}
    </span>
  );
};

// --- Package Metadata ---

export const PACKAGES: PackageMeta[] = [
  { id: 'ui-kit', name: '@quivly/ui-kit', version: '2.4.0', status: 'prod', description: 'Core design system and component library.' },
  { id: 'flow', name: '@quivly/flow', version: '1.1.0', status: 'prod', description: 'Workflow automation engine.' },
  { id: 'data-grid', name: '@quivly/data-grid', version: '0.0.1-alpha', status: 'proposed', description: 'Headless, high-performance data table engine.' },
];

// --- Documentation Content ---

// Note: Mermaid strings are dedented to prevent syntax errors
const DATA_GRID_ARCH_CHART = `flowchart TB
  subgraph Application
    App[Consumer App]
  end
  subgraph PackageScope ["Package Scope"]
    Provider[DataGridProvider]
    Hook[useDataGrid]
    subgraph CoreLogic ["Core Logic"]
      TanStack[TanStack Table v8]
      Virtual[TanStack Virtual]
    end
    subgraph UIImplementation ["UI Implementation"]
      Header
      Body[VirtualizedBody]
      Footer
    end
  end
  App --> Provider
  Provider --> Hook
  Hook --> CoreLogic
  Provider --> UIImplementation
  UIImplementation --> CoreLogic`;

const DATA_GRID_GANTT_CHART = `gantt
  title Implementation Phase Timeline
  dateFormat YYYY-MM-DD
  axisFormat %W
  section Phase 1 Core
  Repo Setup       :done,    des1, 2024-01-01, 3d
  TanStack Config  :active,  des2, after des1, 5d
  Virtualization   :         des3, after des2, 5d
  section Phase 2 Features
  Selection Logic  :         des4, after des3, 5d
  Keyboard Nav     :         des5, after des4, 5d
  section Phase 3 Polish
  Styling / Theme  :         des6, after des5, 5d`;

const DATA_GRID_FILE_TREE: FileNode = {
  name: "@quivly/data-grid",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        { 
          name: "core",
          type: "folder",
          children: [
            { name: "useTanStackTable.ts", type: "hook", comment: "Core instance wrapper" },
            { name: "DataGridProvider.tsx", type: "component", comment: "Context provider" }
          ]
        },
        { 
          name: "components",
          type: "folder",
          children: [
            { name: "VirtualizedBody.tsx", type: "component", comment: "Windowing logic" },
            { name: "Cell.tsx", type: "component" }
          ]
        },
        { name: "types.ts", type: "file" }
      ]
    },
    { name: "package.json", type: "file" }
  ]
};

export const DOCS_MAP: Record<string, PackageDocs> = {
  'data-grid': {
    overview: {
      title: "Overview",
      content: (
        <>
          <div className="mb-8 p-6 bg-white border border-border rounded-sm">
            <p className="text-base text-zinc-700 leading-relaxed font-sans">
              <strong className="font-mono text-zinc-900 font-bold">@quivly/data-grid</strong> is a headless, high-performance data table engine built on TanStack Table v8. Designed as the foundational grid for enterprise applications, it prioritizes performance (60fps virtualization), strict typing, and a headless architecture.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <FeatureCard 
              icon={<Zap size={20} />} 
              title="Virtualization" 
              desc="10K+ rows @ 60fps via TanStack Virtual. Windowing logic for performance." 
            />
            <FeatureCard 
              icon={<Database size={20} />} 
              title="Headless Architecture" 
              desc="Zero styles included. Pure state management and logic layer." 
            />
            <FeatureCard 
              icon={<Code size={20} />} 
              title="TypeScript First" 
              desc="Generics for strict column definitions and row data." 
            />
            <FeatureCard 
              icon={<Layout size={20} />} 
              title="Modular Fields" 
              desc="Plugin-based registry system for custom cell renderers." 
            />
          </div>

          <div className="bg-zinc-900 text-zinc-100 p-6 rounded-sm">
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4">Quick Install</h4>
            <CodeBlock language="bash" code="npm install @quivly/data-grid @tanstack/react-table" />
          </div>
        </>
      )
    },
    architecture: {
      title: "Architecture",
      content: (
        <>
          <div className="bg-white border border-border p-1 rounded-sm mb-8">
            <Mermaid chart={DATA_GRID_ARCH_CHART} />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
                <Box size={18} /> System Design
              </h3>
              <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
                The architecture enforces a strict separation between state management and UI rendering. The <code>DataGridProvider</code> initializes the TanStack instance and exposes it via context, preventing prop drilling.
              </p>
              <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-600 marker:text-zinc-400">
                <li><strong>Core:</strong> Wrapper around <code>useReactTable</code>.</li>
                <li><strong>Rendering:</strong> Virtualized DOM rendering using absolute positioning.</li>
                <li><strong>Features:</strong> Hook-based feature injection (Selection, Editing).</li>
              </ul>
            </div>
            <FileTree data={DATA_GRID_FILE_TREE} />
          </div>
        </>
      )
    },
    api: {
      title: "Core API",
      content: (
        <>
          <div className="space-y-8">
            <section>
              <div className="flex items-baseline justify-between mb-2">
                 <h3 className="text-lg font-bold text-zinc-900 font-mono">DataGridProvider</h3>
                 <Badge variant="outline">Component</Badge>
              </div>
              <p className="text-sm text-zinc-600 mb-4">Root component that provides table context to all child components.</p>
              <CodeBlock code={`interface DataGridProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableVirtualization?: boolean; // default: true
  onRowClick?: (row: Row<TData>) => void;
  getRowId?: (row: TData) => string;
}`} />
            </section>

            <section>
              <div className="flex items-baseline justify-between mb-2">
                 <h3 className="text-lg font-bold text-zinc-900 font-mono">useDataGrid</h3>
                 <Badge variant="outline">Hook</Badge>
              </div>
              <p className="text-sm text-zinc-600 mb-4">Access the underlying TanStack table instance and grid-specific state.</p>
              <CodeBlock code={`const { 
  table, // TanStack instance
  virtualizer, // TanStack virtualizer
  selection, // Selection state
} = useDataGrid();`} />
            </section>
          </div>
        </>
      )
    },
    plan: {
      title: "Implementation Plan",
      content: (
        <>
          <div className="bg-white border border-border p-1 rounded-sm mb-8">
            <Mermaid chart={DATA_GRID_GANTT_CHART} />
          </div>
          
          <div className="space-y-3">
            <PhaseItem phase="1" title="Core Foundation" desc="Monorepo configuration, basic TanStack Table setup, column definitions factory." />
            <PhaseItem phase="2" title="Virtualization Engine" desc="Integration of TanStack Virtual with dynamic height support and scroll restoration." />
            <PhaseItem phase="3" title="Interactive Features" desc="Row selection (multi/range), keyboard navigation, and focus management." />
            <PhaseItem phase="4" title="Advanced & Release" desc="Inline editing, drag-and-drop rows, and package publishing." />
          </div>
        </>
      )
    }
  }
};
