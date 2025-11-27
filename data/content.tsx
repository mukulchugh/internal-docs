import React from 'react';
import { Layout, Cpu, Terminal, Share2, Zap, Database, Code, Box, GitBranch, Edit3, Keyboard, MousePointer, Layers, Move, BarChart3, Palette, Server, Table2, CheckSquare, Eye, Paintbrush } from 'lucide-react';
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

const Badge = ({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'outline' | 'success' | 'warning' }) => {
  const styles = {
    default: "bg-zinc-900 text-white border-zinc-900",
    outline: "bg-white text-zinc-900 border-zinc-200",
    success: "bg-emerald-100 text-emerald-800 border-emerald-200",
    warning: "bg-amber-100 text-amber-800 border-amber-200",
  };
  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-sm ${styles[variant]}`}>
      {children}
    </span>
  );
};

const StatCard = ({ value, label }: { value: string, label: string }) => (
  <div className="text-center p-4 bg-zinc-50 border border-border rounded-sm">
    <div className="text-2xl font-bold text-zinc-900 font-mono">{value}</div>
    <div className="text-xs text-zinc-500 mt-1">{label}</div>
  </div>
);

const ApiSection = ({ name, type, description, children }: { name: string, type: string, description: string, children: React.ReactNode }) => (
  <section className="mb-8">
    <div className="flex items-baseline justify-between mb-2">
      <h3 className="text-lg font-bold text-zinc-900 font-mono">{name}</h3>
      <Badge variant="outline">{type}</Badge>
    </div>
    <p className="text-sm text-zinc-600 mb-4">{description}</p>
    {children}
  </section>
);

const FeatureList = ({ items }: { items: string[] }) => (
  <ul className="space-y-2">
    {items.map((item, idx) => (
      <li key={idx} className="flex items-start gap-2 text-sm text-zinc-600">
        <CheckSquare size={14} className="text-emerald-600 mt-0.5 shrink-0" />
        <span>{item}</span>
      </li>
    ))}
  </ul>
);

const ColorSwatch = ({ name, value, token, className }: { name: string, value: string, token: string, className?: string }) => (
  <div className="flex items-center gap-3 p-2 bg-white border border-border rounded-sm">
    <div className={`w-8 h-8 rounded-sm border border-border shrink-0 ${className}`} style={{ backgroundColor: value }} />
    <div className="flex-1 min-w-0">
      <div className="font-mono text-xs font-bold text-zinc-900 truncate">{name}</div>
      <div className="font-mono text-[10px] text-zinc-500">{token}</div>
    </div>
  </div>
);

const StyleSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
  <section className="mb-10">
    <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
      {icon} {title}
    </h3>
    {children}
  </section>
);

// --- Package Metadata ---

export const PACKAGES: PackageMeta[] = [
  { id: 'ui-kit', name: '@quivly/ui-kit', version: '2.4.0', status: 'prod', description: 'Core design system and component library.' },
  { id: 'flow', name: '@quivly/flow', version: '1.1.0', status: 'prod', description: 'Workflow automation engine.' },
  { id: 'data-grid', name: '@quivly/data-grid', version: '0.1.0-alpha', status: 'proposed', description: 'Enterprise data table with TanStack Table, virtualization, inline editing, and CRM-grade features.' },
];

// --- Mermaid Charts ---

const DATA_GRID_ARCH_CHART = `flowchart TB
  subgraph App["Your Application"]
    Consumer["React App"]
  end
  subgraph Package["@quivly/data-grid"]
    subgraph Core["Core Layer"]
      Provider["DataGridProvider"]
      TanStackHook["useTanStackTable"]
      VirtualHook["useVirtualization"]
    end
    subgraph UI["UI Components"]
      Table["DataGrid"]
      Header["TableHeader"]
      Body["VirtualizedBody"]
      Cell["TableCell"]
      Footer["TableFooter"]
    end
    subgraph Features["Feature Modules"]
      Selection["useSelection"]
      Navigation["useKeyboardNav"]
      Editing["useInlineEdit"]
      DragDrop["useDragDrop"]
    end
  end
  subgraph FieldPkg["@quivly/data-grid-fields"]
    TextField["TextField"]
    NumberField["NumberField"]
    DateField["DateField"]
    MoreFields["...20+ types"]
  end
  subgraph TanStack["TanStack Foundation"]
    TanStackTable["@tanstack/react-table"]
    TanStackVirtual["@tanstack/react-virtual"]
  end
  Consumer --> Provider
  Provider --> Core
  Core --> TanStack
  Core --> UI
  UI --> Features
  FieldPkg --> Cell`;

const DATA_GRID_DATA_FLOW = `flowchart LR
  subgraph Input["Data Input"]
    Props["Props"]
    Data["Data Source"]
    Schema["Column Schema"]
  end
  subgraph TanStack["TanStack Table"]
    TableInstance["Table Instance"]
    RowModel["Row Model"]
    ColumnModel["Column Model"]
  end
  subgraph Virtual["TanStack Virtual"]
    Virtualizer["Virtualizer"]
    VirtualItems["Virtual Items"]
  end
  subgraph Render["Render Output"]
    VisibleRows["Visible Rows"]
    Cells["Cells"]
  end
  Props --> TableInstance
  Data --> TableInstance
  Schema --> ColumnModel
  TableInstance --> RowModel
  RowModel --> Virtualizer
  Virtualizer --> VirtualItems
  VirtualItems --> VisibleRows
  ColumnModel --> Cells`;

// --- File Trees ---

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
            { name: "DataGrid.tsx", type: "component", comment: "Main component" },
            { name: "DataGridProvider.tsx", type: "component", comment: "Context provider" },
            { name: "useTanStackTable.ts", type: "hook", comment: "TanStack wrapper" },
            { name: "useVirtualization.ts", type: "hook", comment: "Virtual scroll" },
            { name: "createColumns.ts", type: "file", comment: "Column factory" },
          ]
        },
        {
          name: "components",
          type: "folder",
          children: [
            {
              name: "header",
              type: "folder",
              children: [
                { name: "TableHeader.tsx", type: "component" },
                { name: "HeaderCell.tsx", type: "component" },
                { name: "ColumnResizer.tsx", type: "component" },
                { name: "SortIndicator.tsx", type: "component" },
              ]
            },
            {
              name: "body",
              type: "folder",
              children: [
                { name: "VirtualizedBody.tsx", type: "component", comment: "Windowing" },
                { name: "GroupedBody.tsx", type: "component" },
                { name: "GroupHeader.tsx", type: "component" },
              ]
            },
            {
              name: "row",
              type: "folder",
              children: [
                { name: "TableRow.tsx", type: "component" },
                { name: "DraggableRow.tsx", type: "component" },
                { name: "RowCheckbox.tsx", type: "component" },
              ]
            },
            {
              name: "cell",
              type: "folder",
              children: [
                { name: "TableCell.tsx", type: "component" },
                { name: "CellEditPortal.tsx", type: "component", comment: "Floating UI" },
                { name: "CellDisplayMode.tsx", type: "component" },
              ]
            },
            {
              name: "footer",
              type: "folder",
              children: [
                { name: "TableFooter.tsx", type: "component" },
                { name: "AggregateCell.tsx", type: "component" },
              ]
            },
          ]
        },
        {
          name: "hooks",
          type: "folder",
          children: [
            { name: "useTableInstance.ts", type: "hook" },
            { name: "useRowSelection.ts", type: "hook" },
            { name: "useKeyboardNavigation.ts", type: "hook" },
            { name: "useInlineEdit.ts", type: "hook" },
            { name: "useDragDrop.ts", type: "hook" },
            { name: "useGrouping.ts", type: "hook" },
            { name: "useAggregates.ts", type: "hook" },
            { name: "useScrollToRow.ts", type: "hook" },
          ]
        },
        {
          name: "interfaces",
          type: "folder",
          children: [
            { name: "FieldRegistry.ts", type: "file", comment: "Field plugin system" },
            { name: "DataSource.ts", type: "file", comment: "Server-side" },
            { name: "Theme.ts", type: "file" },
          ]
        },
        {
          name: "styles",
          type: "folder",
          children: [
            { name: "base.css", type: "file" },
            { name: "theme.css", type: "file", comment: "CSS variables" },
          ]
        },
        { name: "index.ts", type: "file", comment: "Public exports" },
      ]
    },
    { name: "package.json", type: "file" },
  ]
};

const DATA_GRID_FIELDS_TREE: FileNode = {
  name: "@quivly/data-grid-fields",
  type: "folder",
  children: [
    {
      name: "src",
      type: "folder",
      children: [
        {
          name: "fields",
          type: "folder",
          children: [
            { name: "TextField.tsx", type: "component" },
            { name: "NumberField.tsx", type: "component" },
            { name: "CurrencyField.tsx", type: "component" },
            { name: "DateField.tsx", type: "component" },
            { name: "SelectField.tsx", type: "component" },
            { name: "MultiSelectField.tsx", type: "component" },
            { name: "EmailField.tsx", type: "component" },
            { name: "PhoneField.tsx", type: "component" },
            { name: "UrlField.tsx", type: "component" },
            { name: "RelationField.tsx", type: "component" },
            { name: "UserField.tsx", type: "component" },
            { name: "RatingField.tsx", type: "component" },
            { name: "ProgressField.tsx", type: "component" },
            { name: "BooleanField.tsx", type: "component" },
            { name: "TagsField.tsx", type: "component" },
            { name: "ColorField.tsx", type: "component" },
            { name: "JsonField.tsx", type: "component" },
            { name: "RichTextField.tsx", type: "component" },
          ]
        },
        { name: "createFieldRegistry.ts", type: "file", comment: "Registry factory" },
        { name: "defaultRegistry.ts", type: "file", comment: "Pre-configured" },
        { name: "index.ts", type: "file" },
      ]
    },
    { name: "package.json", type: "file" },
  ]
};

// --- Documentation Content ---

export const DOCS_MAP: Record<string, PackageDocs> = {
  // ============================================
  // @quivly/data-grid - MAIN DOCUMENTATION
  // ============================================
  'data-grid': {
    overview: {
      title: "Overview",
      content: (
        <>
          <div className="mb-8 p-6 bg-white border border-border rounded-sm">
            <p className="text-base text-zinc-700 leading-relaxed font-sans">
              <strong className="font-mono text-zinc-900 font-bold">@quivly/data-grid</strong> is a headless, high-performance React data table built on TanStack Table v8. Designed for CRM-grade applications, it provides virtualization for 10K+ rows at 60fps, inline editing, keyboard navigation, and a pluggable field system.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <StatCard value="10K+" label="Rows @ 60fps" />
            <StatCard value="20+" label="Field Types" />
            <StatCard value="100%" label="TypeScript" />
            <StatCard value="~15kb" label="Gzipped" />
          </div>

          {/* Core Features */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
            <Zap size={18} /> Core Features
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <FeatureCard
              icon={<Zap size={20} />}
              title="Virtualization"
              desc="Render 10K+ rows at 60fps with TanStack Virtual's efficient windowing."
            />
            <FeatureCard
              icon={<Edit3 size={20} />}
              title="Inline Editing"
              desc="Click-to-edit cells with floating UI portals and auto-save on blur."
            />
            <FeatureCard
              icon={<Keyboard size={20} />}
              title="Keyboard Navigation"
              desc="Full keyboard support: arrows, vim keys (j/k), hotkeys for power users."
            />
            <FeatureCard
              icon={<MousePointer size={20} />}
              title="Row Selection"
              desc="Single, multi, range (Shift+Click), and select all (Ctrl+A)."
            />
            <FeatureCard
              icon={<Layers size={20} />}
              title="Grouping"
              desc="Group by any field with collapsible sections and group aggregates."
            />
            <FeatureCard
              icon={<BarChart3 size={20} />}
              title="Aggregates"
              desc="Sum, avg, min, max, count with customizable footer display."
            />
            <FeatureCard
              icon={<Move size={20} />}
              title="Column Resize"
              desc="Drag-to-resize columns with smooth real-time updates."
            />
            <FeatureCard
              icon={<Table2 size={20} />}
              title="Drag & Drop"
              desc="Reorder rows and move between groups with drag-drop."
            />
          </div>

          {/* Additional Features */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4">Additional Features</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <FeatureList items={[
              "Column reordering via drag-drop",
              "Column visibility toggle (hide/show)",
              "Multi-column sorting",
              "Advanced filtering",
              "Empty state handling",
              "Loading skeletons",
            ]} />
            <FeatureList items={[
              "Scroll-to-row programmatic control",
              "Focus management (row & cell level)",
              "Click-outside detection for edit mode",
              "Pluggable field type system",
              "Server-side data support",
              "Full TypeScript support",
            ]} />
          </div>

          {/* Dependencies */}
          <div className="bg-zinc-900 text-zinc-100 p-6 rounded-sm">
            <h4 className="font-mono font-bold text-xs uppercase tracking-widest text-zinc-400 mb-4">Dependencies</h4>
            <CodeBlock language="json" code={`{
  "name": "@quivly/data-grid",
  "peerDependencies": {
    "react": ">=18.0.0",
    "react-dom": ">=18.0.0"
  },
  "dependencies": {
    "@tanstack/react-table": "^8.20.0",
    "@tanstack/react-virtual": "^3.10.0",
    "@floating-ui/react": "^0.26.0",
    "@hello-pangea/dnd": "^17.0.0",
    "react-hotkeys-hook": "^4.5.0"
  }
}`} />
          </div>
        </>
      )
    },

    architecture: {
      title: "Architecture",
      content: (
        <>
          {/* High-Level Architecture */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
            <Cpu size={18} /> High-Level Architecture
          </h3>
          <div className="bg-white border border-border p-1 rounded-sm mb-8">
            <Mermaid chart={DATA_GRID_ARCH_CHART} />
          </div>

          {/* Data Flow */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
            <Share2 size={18} /> Data Flow
          </h3>
          <div className="bg-white border border-border p-1 rounded-sm mb-8">
            <Mermaid chart={DATA_GRID_DATA_FLOW} />
          </div>

          {/* Architecture Explanation */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
                <Box size={18} /> System Design
              </h3>
              <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
                The architecture enforces strict separation between state management and UI rendering.
                TanStack Table provides the headless state logic while TanStack Virtual handles
                efficient DOM virtualization.
              </p>
              <ul className="list-disc pl-4 space-y-2 text-sm text-zinc-600 marker:text-zinc-400">
                <li><strong>Core Layer:</strong> Wraps TanStack Table instance with additional state for editing, focus, and selection.</li>
                <li><strong>Virtualization:</strong> Only renders visible rows using absolute positioning and transform for 60fps performance.</li>
                <li><strong>Field System:</strong> Plugin-based registry allows custom field types with display/edit components.</li>
                <li><strong>Feature Hooks:</strong> Modular hooks inject functionality (selection, navigation, editing) without coupling.</li>
              </ul>
            </div>
            <FileTree data={DATA_GRID_FILE_TREE} />
          </div>

          {/* Fields Package */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
            <Database size={18} /> Field Types Package
          </h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
            <div>
              <p className="text-zinc-600 mb-4 text-sm leading-relaxed">
                The <code>@quivly/data-grid-fields</code> package provides 20+ pre-built field types
                for common data types. Each field type includes display and edit components.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>TEXT</code> - Plain text</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>NUMBER</code> - Numeric</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>CURRENCY</code> - Money</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>DATE</code> - Date picker</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>SELECT</code> - Dropdown</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>MULTI_SELECT</code> - Tags</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>EMAIL</code> - Email link</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>PHONE</code> - Phone link</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>URL</code> - Web link</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>RELATION</code> - FK link</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>USER</code> - Avatar</div>
                <div className="bg-zinc-50 p-2 rounded border border-border"><code>RATING</code> - Stars</div>
              </div>
            </div>
            <FileTree data={DATA_GRID_FIELDS_TREE} />
          </div>

          {/* TanStack Integration */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mb-4 flex items-center gap-2">
            <Code size={18} /> TanStack Integration
          </h3>
          <p className="text-zinc-600 mb-4 text-sm">
            The table is built entirely on TanStack Table v8 APIs. Here's how features map to TanStack:
          </p>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-sm">
              <thead className="bg-zinc-50">
                <tr>
                  <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Feature</th>
                  <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">TanStack API</th>
                  <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Custom Code</th>
                </tr>
              </thead>
              <tbody>
                <tr><td className="p-3 border-b border-border">Sorting</td><td className="p-3 border-b border-border font-mono text-xs">getSortedRowModel()</td><td className="p-3 border-b border-border text-zinc-500">-</td></tr>
                <tr><td className="p-3 border-b border-border">Filtering</td><td className="p-3 border-b border-border font-mono text-xs">getFilteredRowModel()</td><td className="p-3 border-b border-border text-zinc-500">-</td></tr>
                <tr><td className="p-3 border-b border-border">Grouping</td><td className="p-3 border-b border-border font-mono text-xs">getGroupedRowModel()</td><td className="p-3 border-b border-border text-zinc-500">-</td></tr>
                <tr><td className="p-3 border-b border-border">Selection</td><td className="p-3 border-b border-border font-mono text-xs">rowSelection state</td><td className="p-3 border-b border-border text-zinc-500">Range selection</td></tr>
                <tr><td className="p-3 border-b border-border">Column Resize</td><td className="p-3 border-b border-border font-mono text-xs">columnResizeMode</td><td className="p-3 border-b border-border text-zinc-500">-</td></tr>
                <tr><td className="p-3 border-b border-border">Virtualization</td><td className="p-3 border-b border-border font-mono text-xs">@tanstack/react-virtual</td><td className="p-3 border-b border-border text-zinc-500">-</td></tr>
                <tr><td className="p-3 border-b border-border">Inline Editing</td><td className="p-3 border-b border-border text-zinc-500">-</td><td className="p-3 border-b border-border font-mono text-xs">useInlineEdit</td></tr>
                <tr><td className="p-3 border-b border-border">Keyboard Nav</td><td className="p-3 border-b border-border text-zinc-500">-</td><td className="p-3 border-b border-border font-mono text-xs">useKeyboardNav</td></tr>
                <tr><td className="p-3">Drag & Drop</td><td className="p-3 text-zinc-500">-</td><td className="p-3 font-mono text-xs">@hello-pangea/dnd</td></tr>
              </tbody>
            </table>
          </div>
        </>
      )
    },

    api: {
      title: "Core API",
      content: (
        <>
          <div className="space-y-8">
            {/* DataGridProvider */}
            <ApiSection
              name="DataGridProvider"
              type="Component"
              description="Root component that provides table context to all child components. Initializes TanStack Table instance."
            >
              <CodeBlock code={`interface DataGridProviderProps<TData extends RowData> {
  // Required
  tableId: string;
  columns: ColumnDef<TData>[];
  data: TData[];

  // Optional: Field system
  fieldRegistry?: FieldRegistry;

  // Optional: Data source for server-side operations
  dataSource?: DataSource<TData>;

  // Optional: Callbacks
  onRowClick?: (row: TData, index: number) => void;
  onRowDoubleClick?: (row: TData, index: number) => void;
  onSelectionChange?: (selectedIds: string[]) => void;
  onCellEdit?: (rowId: string, columnId: string, value: unknown) => void;
  onSortChange?: (sorting: SortingState) => void;
  onFilterChange?: (filters: ColumnFiltersState) => void;
  onColumnResize?: (columnId: string, width: number) => void;
  onColumnReorder?: (columnOrder: string[]) => void;
  onRowReorder?: (rowId: string, newIndex: number, groupId?: string) => void;

  // Optional: Initial state
  initialSorting?: SortingState;
  initialFilters?: ColumnFiltersState;
  initialSelection?: RowSelectionState;
  initialColumnOrder?: string[];
  initialColumnSizing?: ColumnSizingState;
  initialGrouping?: GroupingState;

  // Optional: Configuration
  getRowId?: (row: TData) => string;
  enableRowSelection?: boolean | ((row: Row<TData>) => boolean);
  enableMultiRowSelection?: boolean;

  children: React.ReactNode;
}`} />
            </ApiSection>

            {/* DataGrid */}
            <ApiSection
              name="DataGrid"
              type="Component"
              description="Main table component. Renders header, virtualized body, and optional footer."
            >
              <CodeBlock code={`interface DataGridProps {
  // Feature toggles
  enableVirtualization?: boolean;          // Default: true
  enableInlineEditing?: boolean;           // Default: true
  enableRowSelection?: boolean;            // Default: true
  enableColumnResize?: boolean;            // Default: true
  enableColumnReorder?: boolean;           // Default: true
  enableDragAndDrop?: boolean;             // Default: false
  enableKeyboardNavigation?: boolean;      // Default: true
  enableGrouping?: boolean;                // Default: false
  enableAggregateFooter?: boolean;         // Default: false
  enableSorting?: boolean;                 // Default: true
  enableFiltering?: boolean;               // Default: false

  // Configuration
  rowHeight?: number;                      // Default: 32
  overscan?: number;                       // Default: 10
  stickyHeader?: boolean;                  // Default: true

  // Custom components
  emptyComponent?: React.ComponentType;
  loadingComponent?: React.ComponentType;
  rowComponent?: React.ComponentType<RowProps>;
  cellComponent?: React.ComponentType<CellProps>;

  // Styling
  className?: string;
  style?: React.CSSProperties;
  theme?: 'light' | 'dark' | ThemeConfig;
}`} />
            </ApiSection>

            {/* Hooks */}
            <ApiSection
              name="Exported Hooks"
              type="Hooks"
              description="Access table state and functionality from any child component."
            >
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-sm">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Hook</th>
                      <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Description</th>
                      <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Returns</th>
                    </tr>
                  </thead>
                  <tbody className="font-mono text-xs">
                    <tr><td className="p-3 border-b border-border">useTableInstance()</td><td className="p-3 border-b border-border font-sans text-zinc-600">Access TanStack table instance</td><td className="p-3 border-b border-border">Table&lt;TData&gt;</td></tr>
                    <tr><td className="p-3 border-b border-border">useRowSelection()</td><td className="p-3 border-b border-border font-sans text-zinc-600">Selection state and actions</td><td className="p-3 border-b border-border">{`{ selectedIds, selectRow, selectAll, clearSelection }`}</td></tr>
                    <tr><td className="p-3 border-b border-border">useFocusManager()</td><td className="p-3 border-b border-border font-sans text-zinc-600">Row/cell focus control</td><td className="p-3 border-b border-border">{`{ focusedRowIndex, focusRow, focusCell }`}</td></tr>
                    <tr><td className="p-3 border-b border-border">useInlineEdit()</td><td className="p-3 border-b border-border font-sans text-zinc-600">Edit mode control</td><td className="p-3 border-b border-border">{`{ editingCell, startEdit, commitEdit }`}</td></tr>
                    <tr><td className="p-3 border-b border-border">useScrollToRow()</td><td className="p-3 border-b border-border font-sans text-zinc-600">Programmatic scrolling</td><td className="p-3 border-b border-border">{`{ scrollToRow, scrollToTop }`}</td></tr>
                    <tr><td className="p-3 border-b border-border">useGrouping()</td><td className="p-3 border-b border-border font-sans text-zinc-600">Grouping state and actions</td><td className="p-3 border-b border-border">{`{ grouping, setGrouping, toggleGroup }`}</td></tr>
                    <tr><td className="p-3">useAggregates()</td><td className="p-3 font-sans text-zinc-600">Aggregate calculations</td><td className="p-3">{`{ aggregates, setAggregateOperation }`}</td></tr>
                  </tbody>
                </table>
              </div>
            </ApiSection>

            {/* Field Registry */}
            <ApiSection
              name="FieldRegistry"
              type="Interface"
              description="Plugin system for registering custom field types with display and edit components."
            >
              <CodeBlock code={`interface FieldRegistry {
  register(type: string, config: FieldConfig): void;
  get(type: string): FieldConfig;
  getDisplayComponent(type: string): React.ComponentType<FieldDisplayProps>;
  getEditComponent(type: string): React.ComponentType<FieldEditProps>;
  getAggregateOperations(type: string): AggregateOperation[];
  getFilterOperations(type: string): FilterOperation[];
}

interface FieldConfig {
  displayComponent: React.ComponentType<FieldDisplayProps>;
  editComponent?: React.ComponentType<FieldEditProps>;
  isEditable?: boolean;
  aggregateOperations?: AggregateOperation[];
  filterOperations?: FilterOperation[];
  sortable?: boolean;
  defaultWidth?: number;
}

interface FieldDisplayProps<T = unknown> {
  value: T;
  field: FieldDefinition;
  row: RowData;
}

interface FieldEditProps<T = unknown> {
  value: T;
  field: FieldDefinition;
  row: RowData;
  onChange: (value: T) => void;
  onSubmit: () => void;
  onCancel: () => void;
  autoFocus?: boolean;
}`} />
            </ApiSection>

            {/* DataSource */}
            <ApiSection
              name="DataSource"
              type="Interface"
              description="Interface for server-side data fetching and mutations."
            >
              <CodeBlock code={`interface DataSource<TData> {
  // Fetch data with pagination, sorting, filtering
  fetchData(params: FetchParams): Promise<FetchResult<TData>>;

  // Mutations
  updateRow?(rowId: string, data: Partial<TData>): Promise<TData>;
  createRow?(data: Partial<TData>): Promise<TData>;
  deleteRow?(rowId: string): Promise<void>;
  deleteRows?(rowIds: string[]): Promise<void>;
  reorderRow?(rowId: string, newIndex: number, groupId?: string): Promise<void>;

  // Real-time (optional)
  subscribe?(callback: (event: DataEvent<TData>) => void): () => void;
}

interface FetchParams {
  pageIndex: number;
  pageSize: number;
  sorting?: SortingState;
  filters?: ColumnFiltersState;
  grouping?: GroupingState;
}

interface FetchResult<TData> {
  data: TData[];
  totalCount: number;
  pageCount: number;
}`} />
            </ApiSection>

            {/* Usage Example */}
            <ApiSection
              name="Basic Usage"
              type="Example"
              description="Complete example showing basic table setup with inline editing."
            >
              <CodeBlock code={`import { DataGrid, DataGridProvider } from '@quivly/data-grid';
import { defaultFieldRegistry } from '@quivly/data-grid-fields';
import { createColumnHelper } from '@tanstack/react-table';

interface Contact {
  id: string;
  name: string;
  email: string;
  company: string;
  status: 'active' | 'inactive' | 'pending';
  revenue: number;
}

const columnHelper = createColumnHelper<Contact>();

const columns = [
  columnHelper.accessor('name', { header: 'Name', size: 200 }),
  columnHelper.accessor('email', { header: 'Email', size: 250 }),
  columnHelper.accessor('company', { header: 'Company', size: 180 }),
  columnHelper.accessor('status', { header: 'Status', size: 120 }),
  columnHelper.accessor('revenue', {
    header: 'Revenue',
    size: 120,
    cell: ({ getValue }) => \`$\${getValue().toLocaleString()}\`,
  }),
];

function ContactsTable() {
  const [contacts, setContacts] = useState<Contact[]>([]);

  return (
    <DataGridProvider
      tableId="contacts"
      columns={columns}
      data={contacts}
      fieldRegistry={defaultFieldRegistry}
      onCellEdit={async (rowId, columnId, value) => {
        await api.updateContact(rowId, { [columnId]: value });
      }}
      onSelectionChange={(ids) => console.log('Selected:', ids)}
    >
      <DataGrid
        enableVirtualization
        enableInlineEditing
        enableRowSelection
        enableColumnResize
        theme="dark"
      />
    </DataGridProvider>
  );
}`} />
            </ApiSection>
          </div>
        </>
      )
    },

    hooks: {
      title: "Hooks Reference",
      content: (
        <>
          <div className="mb-8 p-6 bg-white border border-border rounded-sm">
            <p className="text-base text-zinc-700 leading-relaxed font-sans">
              Complete reference for all hooks in <strong className="font-mono text-zinc-900">@quivly/data-grid</strong>.
              Based on Twenty CRM's production implementation with 30+ specialized hooks for table operations.
            </p>
          </div>

          {/* Focus & Navigation Hooks */}
          <StyleSection title="Focus & Navigation Hooks" icon={<Keyboard size={18} />}>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useMoveFocusedCell</h4>
                  <Badge variant="outline">Navigation</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Manages cell focus movement across the grid with boundary constraints.</p>
                <CodeBlock code={`const { moveUp, moveDown, moveLeft, moveRight, moveFocus } = useMoveFocusedCell();

// Move focus in direction
moveFocus('down');

// Or use individual functions
moveUp();    // Arrow Up / k
moveDown();  // Arrow Down / j
moveLeft();  // Arrow Left / h
moveRight(); // Arrow Right / l`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useFocusedRow</h4>
                  <Badge variant="outline">Row Focus</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Manages row-level focus with focus stack integration for proper modality.</p>
                <CodeBlock code={`const {
  focusRow,           // (rowIndex: number) => void
  unfocusRow,         // () => void
  restoreFocusFromCell, // () => void - restore from cell edit
  focusedRowIndex,    // number | null
  isRowFocusActive,   // boolean
} = useFocusedRow();

// Focus a specific row
focusRow(5);

// Unfocus current row
unfocusRow();`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useActiveRow</h4>
                  <Badge variant="outline">Hover State</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Manages "soft focus" (hover state) separate from keyboard focus.</p>
                <CodeBlock code={`const {
  activateRow,        // (rowIndex: number) => void
  deactivateRow,      // () => void
  activeRowIndex,     // number | null
} = useActiveRow();

// On mouse enter
activateRow(rowIndex);

// On mouse leave
deactivateRow();`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useScrollToPosition</h4>
                  <Badge variant="outline">Scroll</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Programmatic scroll control for virtualized content.</p>
                <CodeBlock code={`const { scrollToRow, scrollToCell, scrollToTop } = useScrollToPosition();

// Scroll row into view
scrollToRow(rowIndex, { align: 'center' });

// Scroll specific cell into view
scrollToCell({ row: 10, column: 3 });`} />
              </div>
            </div>
          </StyleSection>

          {/* Cell Edit Hooks */}
          <StyleSection title="Cell Edit Hooks" icon={<Edit3 size={18} />}>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useFocusCell</h4>
                  <Badge variant="outline">Cell Focus</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Focus a specific cell at given position.</p>
                <CodeBlock code={`const { focusCell, unfocusCell, currentFocusPosition } = useFocusCell();

// Focus cell at position
focusCell({ row: 5, column: 2 });

// Clear cell focus
unfocusCell();

// Get current position
console.log(currentFocusPosition); // { row: 5, column: 2 }`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useOpenCell</h4>
                  <Badge variant="outline">Edit Mode</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Enter cell edit mode with full state management.</p>
                <CodeBlock code={`const { openCell, closeCell, isEditMode } = useOpenCell();

// Open cell for editing
openCell({
  cellPosition: { row: 3, column: 1 },
  recordId: 'record-123',
  fieldDefinition: columnDef,
  isReadOnly: false,
  initialValue: currentValue,
});

// Close edit mode (commits changes)
closeCell();`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useCellHotkeys</h4>
                  <Badge variant="outline">Keyboard</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Cell-level keyboard shortcuts for navigation.</p>
                <CodeBlock code={`// Automatically handles:
// - ArrowUp/Down/Left/Right: Move focus
// - Enter: Open edit mode
// - Escape: Close edit mode / unfocus
// - Tab: Move to next cell (in edit mode)

useCellHotkeys({
  onEnter: () => openCell(currentPosition),
  onEscape: () => closeCell(),
  onArrowKey: (direction) => moveFocus(direction),
});`} />
              </div>
            </div>
          </StyleSection>

          {/* Selection Hooks */}
          <StyleSection title="Selection Hooks" icon={<CheckSquare size={18} />}>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useRowSelection</h4>
                  <Badge variant="outline">Selection</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Complete row selection with single, multi, and range selection support.</p>
                <CodeBlock code={`const {
  setRowSelected,     // (rowId, isSelected, shouldSelectRange?) => void
  toggleRowSelected,  // (rowId) => void
  selectAll,          // () => void
  clearSelection,     // () => void
  selectedRowIds,     // string[]
  selectionStatus,    // 'none' | 'some' | 'all'
  lastSelectedIndex,  // number | null (for range selection)
} = useRowSelection();

// Toggle single row
toggleRowSelected('row-123');

// Range selection (Shift+Click)
setRowSelected('row-456', true, true); // shouldSelectRange = true

// Select all rows
selectAll();`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useSelectAllRows</h4>
                  <Badge variant="outline">Bulk Select</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Toggle all rows selection state.</p>
                <CodeBlock code={`const { toggleSelectAll, hasUserSelectedAll } = useSelectAllRows();

// Ctrl/Cmd+A handler
toggleSelectAll();

// Check if user initiated select-all
if (hasUserSelectedAll) {
  // Show bulk actions toolbar
}`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useRowHotkeys</h4>
                  <Badge variant="outline">Row Keyboard</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Row-level keyboard shortcuts.</p>
                <CodeBlock code={`// Keyboard shortcuts handled:
// x          - Toggle row selection
// Shift+x    - Range selection from last selected
// Ctrl/Cmd+a - Select all rows
// Ctrl/Cmd+Enter - Open record in drawer
// Enter      - Focus first cell of row
// Escape     - Unfocus row, clear selection

useRowHotkeys({
  rowIndex,
  onToggleSelect: () => toggleRowSelected(rowId),
  onRangeSelect: () => setRowSelected(rowId, true, true),
  onSelectAll: () => selectAll(),
  onEnterRow: () => focusCell({ row: rowIndex, column: 0 }),
  onEscape: () => { unfocusRow(); clearSelection(); },
});`} />
              </div>
            </div>
          </StyleSection>

          {/* Column & Resize Hooks */}
          <StyleSection title="Column & Resize Hooks" icon={<Move size={18} />}>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useMoveColumn</h4>
                  <Badge variant="outline">Reorder</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Reorder columns via drag-drop or programmatically.</p>
                <CodeBlock code={`const { moveColumn } = useMoveColumn();

// Move column from index 2 to index 5
moveColumn({
  fromIndex: 2,
  toIndex: 5,
});`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useResizeColumn</h4>
                  <Badge variant="outline">Resize</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Column resize with drag handle.</p>
                <CodeBlock code={`const {
  startResize,        // (columnId: string) => void
  updateResize,       // (offset: number) => void
  endResize,          // () => void
  isResizing,         // boolean
  resizingColumnId,   // string | null
  resizeOffset,       // number
} = useResizeColumn();

// On mousedown on resize handle
startResize('column-email');

// On mousemove
updateResize(deltaX);

// On mouseup
endResize();`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useLastColumnWidth</h4>
                  <Badge variant="outline">Dynamic Width</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Calculate last column width to fill remaining space.</p>
                <CodeBlock code={`const { lastColumnWidth } = useLastColumnWidth({
  tableWidth,
  visibleColumns,
  minWidth: 104,
});

// Returns width that fills remaining table space
// Ensures table always fills container`} />
              </div>
            </div>
          </StyleSection>

          {/* Drag & Drop Hooks */}
          <StyleSection title="Drag & Drop Hooks" icon={<Move size={18} />}>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useRowDragDrop</h4>
                  <Badge variant="outline">Row DnD</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Row reordering and multi-select drag.</p>
                <CodeBlock code={`const {
  isDragging,
  isSecondaryDragged,  // Part of multi-select drag
  dragHandleProps,     // Spread on drag handle element
  draggableProps,      // Spread on row element
} = useRowDragDrop({
  rowId,
  rowIndex,
  selectedRowIds,
});

<div {...draggableProps}>
  <div {...dragHandleProps}>
    <GripIcon />
  </div>
  {/* row content */}
</div>`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useDragSelect</h4>
                  <Badge variant="outline">Multi-Select</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Mouse drag to select multiple rows.</p>
                <CodeBlock code={`const {
  onDragStart,
  onDragMove,
  onDragEnd,
  isDragSelecting,
} = useDragSelect({
  boundaryClass: 'data-grid-body',
  onSelectionChange: (selectedIds) => {
    setSelectedRowIds(selectedIds);
  },
});`} />
              </div>
            </div>
          </StyleSection>

          {/* Data Hooks */}
          <StyleSection title="Data & Mutation Hooks" icon={<Database size={18} />}>
            <div className="space-y-4">
              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useTableData</h4>
                  <Badge variant="outline">Data</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Initialize and manage table data.</p>
                <CodeBlock code={`const {
  setTableData,       // (data: TData[]) => void
  appendData,         // (newData: TData[]) => void
  updateRow,          // (rowId, updates) => void
  deleteRow,          // (rowId) => void
  rowCount,           // number
  allRowIds,          // string[]
} = useTableData();`} />
              </div>

              <div className="bg-white border border-border rounded-sm p-4">
                <div className="flex items-baseline justify-between mb-2">
                  <h4 className="font-mono font-bold text-zinc-900">useCreateNewRecord</h4>
                  <Badge variant="outline">Create</Badge>
                </div>
                <p className="text-sm text-zinc-600 mb-3">Create new record from empty row.</p>
                <CodeBlock code={`const { createNewRecord } = useCreateNewRecord({
  onRecordCreated: (newRecord) => {
    // Handle new record
    refetchData();
  },
});

// When user fills empty row
createNewRecord({
  name: 'New Contact',
  email: 'new@example.com',
});`} />
              </div>
            </div>
          </StyleSection>
        </>
      )
    },

    state: {
      title: "State Management",
      content: (
        <>
          <div className="mb-8 p-6 bg-white border border-border rounded-sm">
            <p className="text-base text-zinc-700 leading-relaxed font-sans">
              State architecture for <strong className="font-mono text-zinc-900">@quivly/data-grid</strong> using React Context and component-scoped state.
              Supports multiple table instances with isolated state.
            </p>
          </div>

          {/* React Contexts */}
          <StyleSection title="React Contexts" icon={<Box size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Four nested contexts provide table, row, cell, and body-level state access.
            </p>

            <CodeBlock title="DataGridContext.ts" code={`// Main table context - provided by DataGridProvider
interface DataGridContextValue {
  tableId: string;
  objectName: string;
  visibleColumns: ColumnDefinition[];
  fieldRegistry: FieldRegistry;
  permissions: TablePermissions;
  triggerEvent: 'CLICK' | 'MOUSE_DOWN';
  onRecordClick?: (rowIndex: number, recordId: string) => void;
}

// Row context - provided per row
interface RowContextValue {
  recordId: string;
  rowIndex: number;
  isSelected: boolean;
  isReadOnly: boolean;
  pathToDetail: string;
}

// Cell context - provided per cell
interface CellContextValue {
  field: FieldDefinition;
  cellPosition: { row: number; column: number };
}

// Body context - callbacks for cell operations
interface BodyContextValue {
  groupId?: string;
  onOpenCell: (args: OpenCellArgs) => void;
  onCloseCell: () => void;
  onMoveFocus: (direction: Direction) => void;
  onMoveHover: (position: CellPosition) => void;
  onContextMenu: (event: MouseEvent, recordId: string) => void;
  hasUserSelectedAll: boolean;
}`} />

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-zinc-50 border border-border rounded-sm p-4">
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-2">Context Nesting</h4>
                <div className="font-mono text-xs text-zinc-600 space-y-1">
                  <div>DataGridProvider</div>
                  <div className="pl-4">└─ DataGridBodyProvider</div>
                  <div className="pl-8">└─ RowProvider</div>
                  <div className="pl-12">└─ CellProvider</div>
                </div>
              </div>
              <div className="bg-zinc-50 border border-border rounded-sm p-4">
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-2">Context Hooks</h4>
                <div className="font-mono text-xs text-zinc-600 space-y-1">
                  <div>useDataGridContext()</div>
                  <div>useBodyContext()</div>
                  <div>useRowContext()</div>
                  <div>useCellContext()</div>
                </div>
              </div>
            </div>
          </StyleSection>

          {/* Component State */}
          <StyleSection title="Component-Scoped State" icon={<Layers size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              All state is scoped to table instance, enabling multiple tables on same page without conflicts.
            </p>

            <CodeBlock title="Table-Level State" code={`// Table dimensions & scroll
tableWidth: number;
rowCount: number;
isInitialLoading: boolean;
isScrolledVertically: boolean;
isScrolledHorizontally: boolean;

// Focus state
isCellFocusActive: boolean;
isRowFocusActive: boolean;
focusedRowIndex: number | null;
activeRowIndex: number | null;  // hover state
cellFocusPosition: { row: number; column: number } | null;
hoverPosition: { row: number; column: number } | null;
editModePosition: { row: number; column: number } | null;

// Column resize
resizingColumnId: string | null;
resizeOffset: number;
isResizeActive: boolean;`} />

            <CodeBlock title="Row-Level State (Family State)" code={`// Keyed by recordId - each row has its own state
isRowSelected: Map<string, boolean>;
isRowFocused: Map<number, boolean>;  // keyed by rowIndex
isRowActive: Map<number, boolean>;   // keyed by rowIndex

// Selection tracking
lastSelectedRowIndex: number | null;
hasUserSelectedAll: boolean;

// Computed selectors
selectionStatus: 'none' | 'some' | 'all';
isAnyRowSelected: boolean;
selectedRowIds: string[];`} />

            <CodeBlock title="Virtualization State" code={`// Scroll & pagination
lastScrollPosition: number;
totalRowsToVirtualize: number;
loadedPageIndexes: Set<number>;

// Virtual → Real index mapping
virtualToRealIndex: Map<number, number>;
realIndexToRecordId: Map<number, string>;

// Loading states per row
loadingStatusByIndex: Map<number, 'loading' | 'loaded' | 'error'>;

// Performance mode
lowDetailsModeActive: boolean;`} />
          </StyleSection>

          {/* State Flow Diagram */}
          <StyleSection title="State Flow" icon={<Share2 size={18} />}>
            <Mermaid chart={`flowchart TD
  subgraph UserActions["User Actions"]
    Click["Click"]
    Keyboard["Keyboard"]
    DragDrop["Drag & Drop"]
  end
  subgraph Hooks["Hook Layer"]
    FocusHook["useFocusedCell"]
    SelectHook["useRowSelection"]
    EditHook["useOpenCell"]
  end
  subgraph State["State Store"]
    FocusState["Focus State"]
    SelectState["Selection State"]
    EditState["Edit State"]
  end
  subgraph UI["UI Layer"]
    Row["Row Component"]
    Cell["Cell Component"]
    Edit["Edit Portal"]
  end
  Click --> FocusHook
  Keyboard --> FocusHook
  Keyboard --> SelectHook
  Click --> SelectHook
  Click --> EditHook
  FocusHook --> FocusState
  SelectHook --> SelectState
  EditHook --> EditState
  FocusState --> Row
  FocusState --> Cell
  SelectState --> Row
  EditState --> Edit`} />
          </StyleSection>

          {/* Instance Context */}
          <StyleSection title="Multi-Instance Support" icon={<Table2 size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Each table instance gets its own scoped state using instance context.
            </p>

            <CodeBlock code={`// Instance context for multi-table support
const DataGridInstanceContext = createContext<string>('');

// Provider wraps each table with unique ID
<DataGridInstanceContext.Provider value={tableId}>
  <DataGrid {...props} />
</DataGridInstanceContext.Provider>

// State hooks use instance ID for scoping
function useTableState<T>(atom: Atom<T>) {
  const tableId = useContext(DataGridInstanceContext);
  const scopedAtom = useMemo(
    () => getScopedAtom(atom, tableId),
    [atom, tableId]
  );
  return useAtom(scopedAtom);
}

// Multiple tables on same page
<DataGridProvider tableId="contacts-table" ...>
  <DataGrid />
</DataGridProvider>

<DataGridProvider tableId="deals-table" ...>
  <DataGrid />
</DataGridProvider>`} />
          </StyleSection>
        </>
      )
    },

    features: {
      title: "Advanced Features",
      content: (
        <>
          <div className="mb-8 p-6 bg-white border border-border rounded-sm">
            <p className="text-base text-zinc-700 leading-relaxed font-sans">
              Advanced features for enterprise CRM applications including record groups, aggregations, bulk actions, context menus, and keyboard accessibility.
            </p>
          </div>

          {/* Record Groups */}
          <StyleSection title="Record Groups (Kanban-Style Grouping)" icon={<Layers size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Group records by any field (e.g., Status, Owner, Stage) with collapsible sections and per-group aggregates.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Group Features</h4>
                <FeatureList items={[
                  "Group by any field type",
                  "Collapsible sections (toggle open/closed)",
                  "Per-group row count",
                  "Per-group aggregations",
                  "Drag rows between groups",
                  "Add new record within group",
                  "Load more pagination per group",
                ]} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Group States</h4>
                <FeatureList items={[
                  "isGroupExpanded: per-group toggle state",
                  "groupId: unique identifier",
                  "isFirstRowOfGroup: special styling",
                  "groupRecordCount: rows in group",
                  "hasMoreRecords: pagination flag",
                ]} />
              </div>
            </div>

            <CodeBlock title="Record Groups Usage" code={`<DataGridProvider
  tableId="deals"
  columns={columns}
  data={deals}
  // Enable grouping
  enableGrouping
  groupBy="stage"  // Field to group by
  groupOrder={['lead', 'qualified', 'proposal', 'closed']}
>
  <DataGrid
    enableGrouping
    // Group collapse state
    defaultExpandedGroups={['lead', 'qualified']}
    onGroupToggle={(groupId, isExpanded) => {
      saveUserPreference(\`group-\${groupId}\`, isExpanded);
    }}
    // Per-group actions
    renderGroupHeader={({ groupId, recordCount, isExpanded }) => (
      <GroupHeader
        title={getStageLabel(groupId)}
        count={recordCount}
        isExpanded={isExpanded}
      />
    )}
    // Drag between groups
    onRowDropInGroup={(rowId, fromGroup, toGroup, newIndex) => {
      await updateDealStage(rowId, toGroup);
    }}
  />
</DataGridProvider>`} />
          </StyleSection>

          {/* Aggregations */}
          <StyleSection title="Aggregations & Calculations" icon={<BarChart3 size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Footer row with aggregate calculations per column. Supports standard operations and custom aggregations.
            </p>

            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm border border-border rounded-sm">
                <thead className="bg-zinc-50">
                  <tr>
                    <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Operation</th>
                    <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Field Types</th>
                    <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Description</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <tr><td className="p-3 border-b border-border font-mono">COUNT</td><td className="p-3 border-b border-border">All</td><td className="p-3 border-b border-border">Total number of rows</td></tr>
                  <tr><td className="p-3 border-b border-border font-mono">COUNT_EMPTY</td><td className="p-3 border-b border-border">All</td><td className="p-3 border-b border-border">Rows with empty value</td></tr>
                  <tr><td className="p-3 border-b border-border font-mono">COUNT_NOT_EMPTY</td><td className="p-3 border-b border-border">All</td><td className="p-3 border-b border-border">Rows with value</td></tr>
                  <tr><td className="p-3 border-b border-border font-mono">SUM</td><td className="p-3 border-b border-border">Number, Currency</td><td className="p-3 border-b border-border">Sum of all values</td></tr>
                  <tr><td className="p-3 border-b border-border font-mono">AVG</td><td className="p-3 border-b border-border">Number, Currency</td><td className="p-3 border-b border-border">Average value</td></tr>
                  <tr><td className="p-3 border-b border-border font-mono">MIN</td><td className="p-3 border-b border-border">Number, Currency, Date</td><td className="p-3 border-b border-border">Minimum value</td></tr>
                  <tr><td className="p-3 border-b border-border font-mono">MAX</td><td className="p-3 border-b border-border">Number, Currency, Date</td><td className="p-3 border-b border-border">Maximum value</td></tr>
                  <tr><td className="p-3 font-mono">EARLIEST / LATEST</td><td className="p-3">Date</td><td className="p-3">First/last date</td></tr>
                </tbody>
              </table>
            </div>

            <CodeBlock title="Aggregate Footer" code={`<DataGrid
  enableAggregateFooter
  aggregations={{
    revenue: { operation: 'SUM', format: 'currency' },
    age: { operation: 'AVG', format: 'number', decimals: 1 },
    createdAt: { operation: 'EARLIEST', format: 'date' },
    email: { operation: 'COUNT_NOT_EMPTY' },
  }}
  // Custom aggregate renderer
  renderAggregateCell={({ columnId, value, operation }) => (
    <div className="font-mono text-xs">
      <span className="text-zinc-500">{operation}:</span>
      <span className="font-bold ml-1">{formatValue(value)}</span>
    </div>
  )}
/>`} />
          </StyleSection>

          {/* Bulk Actions */}
          <StyleSection title="Bulk Actions & Selection" icon={<CheckSquare size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Select multiple rows and perform bulk operations. Supports single, multi, and range selection.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Selection Methods</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span>Click checkbox</span>
                    <span className="font-mono text-zinc-600">Single select</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span>Shift + Click</span>
                    <span className="font-mono text-zinc-600">Range select</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span>Ctrl/Cmd + Click</span>
                    <span className="font-mono text-zinc-600">Toggle individual</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span>Ctrl/Cmd + A</span>
                    <span className="font-mono text-zinc-600">Select all</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span>Click + Drag</span>
                    <span className="font-mono text-zinc-600">Drag select</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span>x key (row focused)</span>
                    <span className="font-mono text-zinc-600">Toggle current</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Bulk Operations</h4>
                <FeatureList items={[
                  "Delete selected rows",
                  "Update field for all selected",
                  "Export selected to CSV/Excel",
                  "Move to different group/status",
                  "Assign to user/team",
                  "Add/remove tags",
                  "Send bulk email",
                  "Create workflow trigger",
                ]} />
              </div>
            </div>

            <CodeBlock title="Bulk Actions Toolbar" code={`function BulkActionsToolbar() {
  const { selectedRowIds, selectionStatus, clearSelection } = useRowSelection();

  if (selectedRowIds.length === 0) return null;

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-zinc-900 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-4">
      <span className="text-sm">
        {selectedRowIds.length} selected
      </span>

      <button onClick={() => bulkDelete(selectedRowIds)}>
        <TrashIcon /> Delete
      </button>

      <button onClick={() => openBulkEditModal(selectedRowIds)}>
        <EditIcon /> Edit
      </button>

      <button onClick={() => exportRows(selectedRowIds)}>
        <ExportIcon /> Export
      </button>

      <button onClick={clearSelection}>
        <XIcon /> Cancel
      </button>
    </div>
  );
}`} />
          </StyleSection>

          {/* Context Menu */}
          <StyleSection title="Context Menu (Right-Click)" icon={<MousePointer size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Right-click context menu for quick row actions. Position calculated from cursor.
            </p>

            <CodeBlock title="Context Menu Implementation" code={`// In DataGridBodyProvider
const [contextMenu, setContextMenu] = useState<{
  x: number;
  y: number;
  recordId: string;
} | null>(null);

const handleContextMenu = (event: MouseEvent, recordId: string) => {
  event.preventDefault();
  setContextMenu({
    x: event.clientX,
    y: event.clientY,
    recordId,
  });
};

// Context menu component
{contextMenu && (
  <ContextMenu
    x={contextMenu.x}
    y={contextMenu.y}
    onClose={() => setContextMenu(null)}
  >
    <MenuItem onClick={() => openRecord(contextMenu.recordId)}>
      Open
    </MenuItem>
    <MenuItem onClick={() => editRecord(contextMenu.recordId)}>
      Edit
    </MenuItem>
    <MenuItem onClick={() => duplicateRecord(contextMenu.recordId)}>
      Duplicate
    </MenuItem>
    <MenuDivider />
    <MenuItem onClick={() => deleteRecord(contextMenu.recordId)} danger>
      Delete
    </MenuItem>
  </ContextMenu>
)}`} />
          </StyleSection>

          {/* Keyboard Accessibility */}
          <StyleSection title="Full Keyboard Accessibility" icon={<Keyboard size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Complete keyboard navigation and screen reader support for accessibility compliance.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Navigation Keys</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">↑ ↓ ← →</span>
                    <span className="text-zinc-600">Move focus</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">j / k / h / l</span>
                    <span className="text-zinc-600">Vim-style navigation</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Home / End</span>
                    <span className="text-zinc-600">First/last cell in row</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Ctrl + Home/End</span>
                    <span className="text-zinc-600">First/last row</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Page Up/Down</span>
                    <span className="text-zinc-600">Jump by viewport</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Action Keys</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Enter</span>
                    <span className="text-zinc-600">Edit cell / Enter row</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Escape</span>
                    <span className="text-zinc-600">Cancel / Exit</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Tab / Shift+Tab</span>
                    <span className="text-zinc-600">Next/prev cell (edit mode)</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Space / x</span>
                    <span className="text-zinc-600">Toggle selection</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Delete</span>
                    <span className="text-zinc-600">Delete row (with selection)</span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock title="ARIA Attributes" code={`// Row element
<div
  role="row"
  aria-rowindex={rowIndex + 1}
  aria-selected={isSelected}
  data-row-id={recordId}
  data-active={isActive}
  data-focused={isFocused}
>
  // Cell element
  <div
    role="gridcell"
    aria-colindex={columnIndex + 1}
    aria-readonly={isReadOnly}
    aria-describedby={fieldLabel}
    id={\`cell-\${rowIndex}-\${columnIndex}\`}
  >
    {content}
  </div>
</div>

// Focus management
<FocusScope contain restoreFocus autoFocus>
  <EditPortal>
    <input
      aria-label={fieldLabel}
      aria-invalid={hasError}
      aria-errormessage={errorId}
    />
  </EditPortal>
</FocusScope>`} />
          </StyleSection>

          {/* Empty Row for New Records */}
          <StyleSection title="Empty Row (Add New Record)" icon={<Edit3 size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Last row in table is an empty row for quick record creation. Typing in any cell creates a new record.
            </p>

            <CodeBlock title="Empty Row Implementation" code={`function EmptyRowCell({ columnIndex, field }: EmptyRowCellProps) {
  const { createNewRecord } = useCreateNewRecord();
  const [value, setValue] = useState('');

  const handleBlur = () => {
    if (value.trim()) {
      createNewRecord({
        [field.name]: value,
        // Apply any active filters as defaults
        ...getDefaultValuesFromFilters(),
      });
      setValue('');
    }
  };

  return (
    <div className="table-cell opacity-50 hover:opacity-100">
      <input
        placeholder={\`Add \${field.label}...\`}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={(e) => {
          if (e.key === 'Enter') handleBlur();
        }}
      />
    </div>
  );
}

// Apply active filters to new record
function getDefaultValuesFromFilters() {
  const filters = useActiveFilters();
  return filters.reduce((acc, filter) => {
    if (filter.operator === 'equals') {
      acc[filter.field] = filter.value;
    }
    return acc;
  }, {});
}`} />
          </StyleSection>

          {/* Focus Stack */}
          <StyleSection title="Focus Stack (Modality Management)" icon={<Layers size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Focus stack manages nested focus states: Table → Row → Cell → Edit Field.
              Escape key restores previous focus level.
            </p>

            <CodeBlock title="Focus Stack" code={`// Focus hierarchy
type FocusLevel = 'table' | 'row' | 'cell' | 'edit';

interface FocusStackItem {
  id: string;
  level: FocusLevel;
  position?: CellPosition;
}

// Push focus item when entering new level
function enterEditMode(cellPosition: CellPosition) {
  pushFocusItem({
    id: getFocusId('edit', cellPosition),
    level: 'edit',
    position: cellPosition,
  });
}

// Pop focus item when leaving level
function exitEditMode() {
  popFocusItem(); // Returns to cell focus
}

// Escape key handler
useHotkeys('escape', () => {
  const currentFocus = getCurrentFocusItem();

  switch (currentFocus?.level) {
    case 'edit':
      closeEditMode();
      popFocusItem();
      break;
    case 'cell':
      unfocusCell();
      popFocusItem();
      break;
    case 'row':
      unfocusRow();
      clearSelection();
      popFocusItem();
      break;
  }
});`} />
          </StyleSection>

          {/* Constants */}
          <StyleSection title="Key Constants & Dimensions" icon={<Table2 size={18} />}>
            <CodeBlock title="constants.ts" code={`// Dimensions
export const ROW_HEIGHT = 32;
export const COLUMN_MIN_WIDTH = 104;
export const CHECKBOX_COLUMN_WIDTH = 32;
export const DRAG_HANDLE_WIDTH = 32;
export const ADD_COLUMN_BUTTON_WIDTH = 32;
export const MOBILE_LABEL_COLUMN_WIDTH = 160;
export const MOBILE_BREAKPOINT = 768;

// Z-Index Layers
export const Z_INDEX = {
  cell: { default: 3, sticky: 12, editMode: 30 },
  header: { normal: 10, sticky: 14 },
  columnGrip: 200,
  footer: { default: 10, sticky: 12 },
  overlay: { dropdown: 40, modal: 50 },
};

// Click Outside Listener IDs
export const CLICK_OUTSIDE_ID = 'data-grid';
export const FOCUS_CLICK_OUTSIDE_ID = 'data-grid-focus';

// CSS Variable Names
export const getColumnWidthVar = (index: number) =>
  \`--dg-col-\${index}-width\`;

// Focus IDs
export const getRowFocusId = (tableId: string, rowIndex: number) =>
  \`\${tableId}-row-\${rowIndex}\`;

export const getCellFocusId = (tableId: string, row: number, col: number) =>
  \`\${tableId}-cell-\${row}-\${col}\`;`} />
          </StyleSection>
        </>
      )
    },

    styles: {
      title: "UI Implementation & Styles",
      content: (
        <>
          {/* Introduction */}
          <div className="mb-8 p-6 bg-white border border-border rounded-sm">
            <p className="text-base text-zinc-700 leading-relaxed font-sans">
              This section covers the complete UI implementation guide based on <strong className="font-mono text-zinc-900">Twenty CRM's</strong> production patterns.
              It includes Tailwind CSS configuration, design tokens, component styling, and UX interaction patterns for building CRM-grade data tables.
            </p>
          </div>

          {/* Design Tokens & Color System */}
          <StyleSection title="Design Tokens & Color System" icon={<Palette size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              The design system uses a carefully crafted grayscale palette with accent colors for selection states.
              Colors are defined using Display-P3 color space for modern browsers with sRGB fallbacks.
            </p>

            {/* Grayscale Palette */}
            <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Grayscale Palette (Light Theme)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2 mb-6">
              <ColorSwatch name="gray-1" value="#ffffff" token="background.primary" />
              <ColorSwatch name="gray-2" value="#fcfcfc" token="background.secondary" />
              <ColorSwatch name="gray-3" value="#f9f9f9" token="background.tertiary" />
              <ColorSwatch name="gray-4" value="#f1f1f1" token="border.light" />
              <ColorSwatch name="gray-5" value="#ebebeb" token="border.medium" />
              <ColorSwatch name="gray-6" value="#d6d6d6" token="border.strong" />
              <ColorSwatch name="gray-7" value="#cccccc" token="font.extraLight" />
              <ColorSwatch name="gray-8" value="#b3b3b3" token="font.light" />
              <ColorSwatch name="gray-9" value="#999999" token="font.tertiary" />
              <ColorSwatch name="gray-10" value="#838383" token="--" />
              <ColorSwatch name="gray-11" value="#666666" token="font.secondary" />
              <ColorSwatch name="gray-12" value="#333333" token="font.primary" />
            </div>

            {/* Accent Colors */}
            <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Accent Colors (Selection States)</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6">
              <ColorSwatch name="accent.quaternary" value="#e8f4fc" token="Selected row bg" className="border-blue-200" />
              <ColorSwatch name="accent.tertiary" value="#c9e4f8" token="Hover accent" className="border-blue-300" />
              <ColorSwatch name="accent.secondary" value="#3b82f6" token="Active state" className="border-blue-400" />
              <ColorSwatch name="accent.primary" value="#2563eb" token="Primary action" className="border-blue-500" />
            </div>

            <CodeBlock title="tailwind.config.ts" code={`// @quivly/data-grid Tailwind Configuration
const config = {
  theme: {
    extend: {
      colors: {
        // Grayscale (mapped from Twenty CRM)
        gray: {
          1: '#ffffff',
          2: '#fcfcfc',
          3: '#f9f9f9',
          4: '#f1f1f1',   // border.light
          5: '#ebebeb',   // border.medium
          6: '#d6d6d6',   // border.strong
          7: '#cccccc',   // font.extraLight
          8: '#b3b3b3',   // font.light
          9: '#999999',   // font.tertiary
          10: '#838383',
          11: '#666666',  // font.secondary
          12: '#333333',  // font.primary
        },
        // Semantic aliases
        background: {
          primary: 'var(--bg-primary, #ffffff)',
          secondary: 'var(--bg-secondary, #fcfcfc)',
          tertiary: 'var(--bg-tertiary, #f1f1f1)',
        },
        border: {
          light: 'var(--border-light, #f1f1f1)',
          medium: 'var(--border-medium, #ebebeb)',
          strong: 'var(--border-strong, #d6d6d6)',
        },
        accent: {
          quaternary: '#e8f4fc',  // Selected row background
          tertiary: '#c9e4f8',    // Hover on selected
          secondary: '#3b82f6',   // Focus ring
          primary: '#2563eb',     // Primary actions
        }
      },
      spacing: {
        // Based on 4px base unit
        'cell-padding': '8px',      // 2 * 4px
        'row-height': '32px',       // 8 * 4px
        'checkbox-width': '32px',   // 8 * 4px
        'min-column': '104px',
      },
      fontSize: {
        'xxs': '0.625rem',   // 10px
        'xs': '0.85rem',     // 13.6px
        'sm': '0.92rem',     // 14.72px
      },
      fontWeight: {
        regular: '400',
        medium: '500',
        semibold: '600',
      },
      borderRadius: {
        xs: '2px',
        sm: '4px',
        md: '8px',
      },
      boxShadow: {
        'cell-hover': '0px 2px 4px 0px rgba(0,0,0,0.08)',
        'dropdown': '0px 4px 16px 0px rgba(0,0,0,0.12)',
        'scroll': '0px 2px 4px 0px rgba(0,0,0,0.05)',
      }
    }
  }
};`} />
          </StyleSection>

          {/* Table Dimensions & Constants */}
          <StyleSection title="Table Dimensions & Constants" icon={<Table2 size={18} />}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Core Dimensions</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">ROW_HEIGHT</span>
                    <span className="font-mono font-bold text-zinc-900">32px</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">COLUMN_MIN_WIDTH</span>
                    <span className="font-mono font-bold text-zinc-900">104px</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">CHECKBOX_WIDTH</span>
                    <span className="font-mono font-bold text-zinc-900">32px</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">CELL_PADDING</span>
                    <span className="font-mono font-bold text-zinc-900">8px</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">MOBILE_BREAKPOINT</span>
                    <span className="font-mono font-bold text-zinc-900">768px</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Z-Index Layers</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">cell.default</span>
                    <span className="font-mono font-bold text-zinc-900">3</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">header.normal</span>
                    <span className="font-mono font-bold text-zinc-900">10</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">cell.sticky</span>
                    <span className="font-mono font-bold text-zinc-900">12</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">header.sticky</span>
                    <span className="font-mono font-bold text-zinc-900">14</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono text-zinc-600">cell.editMode</span>
                    <span className="font-mono font-bold text-zinc-900">30</span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock title="constants.ts" code={`// Table dimension constants
export const RECORD_TABLE_ROW_HEIGHT = 32;
export const RECORD_TABLE_COLUMN_MIN_WIDTH = 104;
export const RECORD_TABLE_COLUMN_CHECKBOX_WIDTH = 32;
export const RECORD_TABLE_COLUMN_DRAG_WIDTH = 32;
export const RECORD_TABLE_CELL_PADDING = 8;
export const MOBILE_VIEWPORT = 768;

// Z-index management
export const TABLE_Z_INDEX = {
  cell: { default: 3, sticky: 12, editMode: 30 },
  header: { normal: 10, sticky: 14 },
  overlay: { dropdown: 40, modal: 50 }
};

// CSS Variables for dynamic column widths
export const getColumnCssVar = (index: number) =>
  \`--data-grid-column-\${index}-width\`;`} />
          </StyleSection>

          {/* Cell States & Interactions */}
          <StyleSection title="Cell States & Interactions" icon={<MousePointer size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Cells have multiple visual states that provide feedback for user interactions. Each state is carefully designed for clarity and accessibility.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* State Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-border rounded-sm">
                  <thead className="bg-zinc-50">
                    <tr>
                      <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">State</th>
                      <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Background</th>
                      <th className="text-left p-3 font-mono font-bold text-zinc-900 border-b border-border">Border</th>
                    </tr>
                  </thead>
                  <tbody className="text-xs">
                    <tr>
                      <td className="p-3 border-b border-border font-mono">default</td>
                      <td className="p-3 border-b border-border"><code>bg.primary</code> (#fff)</td>
                      <td className="p-3 border-b border-border"><code>border.light</code></td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-border font-mono">hover</td>
                      <td className="p-3 border-b border-border"><code>bg.secondary</code></td>
                      <td className="p-3 border-b border-border"><code>border.medium</code></td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-border font-mono">selected</td>
                      <td className="p-3 border-b border-border"><code className="text-blue-600">accent.quaternary</code></td>
                      <td className="p-3 border-b border-border"><code>border.light</code></td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-border font-mono">focused</td>
                      <td className="p-3 border-b border-border"><code>bg.tertiary</code></td>
                      <td className="p-3 border-b border-border"><code>border.medium</code> + radius</td>
                    </tr>
                    <tr>
                      <td className="p-3 border-b border-border font-mono">editing</td>
                      <td className="p-3 border-b border-border"><code>bg.primary</code></td>
                      <td className="p-3 border-b border-border"><code className="text-blue-600">accent.secondary</code> ring</td>
                    </tr>
                    <tr>
                      <td className="p-3 font-mono">dragging</td>
                      <td className="p-3"><code>transparent</code></td>
                      <td className="p-3"><code>border.medium</code></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              {/* Visual Demo */}
              <div className="space-y-3">
                <div className="p-3 bg-white border border-zinc-200 rounded-sm flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Default Cell</span>
                  <Badge variant="outline">idle</Badge>
                </div>
                <div className="p-3 bg-zinc-50 border border-zinc-300 rounded-sm flex items-center justify-between">
                  <span className="text-sm text-zinc-600">Hovered Cell</span>
                  <Badge variant="outline">:hover</Badge>
                </div>
                <div className="p-3 bg-blue-50 border border-zinc-200 rounded-sm flex items-center justify-between">
                  <span className="text-sm text-blue-700">Selected Cell</span>
                  <Badge variant="success">selected</Badge>
                </div>
                <div className="p-3 bg-zinc-100 border border-zinc-400 rounded flex items-center justify-between">
                  <span className="text-sm text-zinc-900 font-medium">Focused Row</span>
                  <Badge variant="warning">focused</Badge>
                </div>
                <div className="p-3 bg-white border-2 border-blue-500 rounded-sm flex items-center justify-between ring-2 ring-blue-200">
                  <span className="text-sm text-zinc-900">Editing Cell</span>
                  <Badge>editing</Badge>
                </div>
              </div>
            </div>

            <CodeBlock title="TableCell.tsx (Tailwind)" code={`// Cell styling with Tailwind classes
interface CellProps {
  isSelected: boolean;
  isFocused: boolean;
  isEditing: boolean;
  isDragging: boolean;
  isReadOnly: boolean;
}

export function TableCell({
  isSelected, isFocused, isEditing, isDragging, isReadOnly, children
}: CellProps) {
  return (
    <div
      className={cn(
        // Base styles
        "h-8 flex items-center px-2 border-b border-r border-border-light",
        "text-sm text-font-primary transition-colors",

        // State variants
        !isDragging && {
          "bg-background-primary": !isSelected && !isFocused,
          "bg-accent-quaternary": isSelected && !isFocused,
          "bg-background-tertiary": isFocused,
          "hover:bg-background-secondary": !isSelected && !isFocused && !isReadOnly,
        },

        // Dragging state
        isDragging && "bg-transparent border-transparent",

        // Focus ring for edit mode
        isEditing && "ring-2 ring-accent-secondary ring-inset z-30",

        // Cursor
        isReadOnly ? "cursor-default" : "cursor-pointer",

        // User select
        "select-none"
      )}
    >
      {children}
    </div>
  );
}`} />
          </StyleSection>

          {/* Row Styling & Active States */}
          <StyleSection title="Row Styling & Active States" icon={<Layers size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Rows use data attributes for state management, enabling CSS-based styling without prop drilling.
              The active row receives special border treatment with rounded corners.
            </p>

            <CodeBlock title="TableRow.tsx" code={`// Row container with data attributes for styling
interface RowProps {
  rowId: string;
  isActive: boolean;
  isFocused: boolean;
  isDragging: boolean;
  isSelected: boolean;
}

export function TableRow({
  rowId, isActive, isFocused, isDragging, isSelected, children
}: RowProps) {
  return (
    <div
      data-row-id={rowId}
      data-active={isActive}
      data-focused={isFocused && !isActive}
      data-dragging={isDragging}
      data-selected={isSelected}
      className={cn(
        "flex flex-row",

        // Active row styling (keyboard/mouse focus)
        "data-[active=true]:bg-background-tertiary",

        // Active row border treatment
        "[&[data-active=true]_.table-cell]:border-b-border-medium",
        "[&[data-active=true]_.table-cell:first-child]:border-l",
        "[&[data-active=true]_.table-cell:first-child]:border-l-border-medium",
        "[&[data-active=true]_.table-cell:first-child]:rounded-l-sm",
        "[&[data-active=true]_.table-cell:last-child]:border-r",
        "[&[data-active=true]_.table-cell:last-child]:border-r-border-medium",
        "[&[data-active=true]_.table-cell:last-child]:rounded-r-sm",

        // Dragging opacity
        "data-[dragging=true]:opacity-50",

        // Selection background
        "data-[selected=true]:bg-accent-quaternary"
      )}
    >
      {children}
    </div>
  );
}

// CSS for row hover effect (in global styles)
const rowHoverStyles = \`
  .table-row:not([data-active="true"]):hover .table-cell {
    background-color: var(--bg-secondary);
  }
\`;`} />
          </StyleSection>

          {/* Header Cell Styling */}
          <StyleSection title="Header Cell Styling" icon={<Box size={18} />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Header Features</h4>
                <FeatureList items={[
                  "Sticky positioning with z-index layering",
                  "Tertiary text color for labels",
                  "Hover state with secondary background",
                  "Column resize cursor on hover",
                  "Sort indicator on sortable columns",
                  "User-select: none to prevent text selection"
                ]} />
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Resize Handle</h4>
                <FeatureList items={[
                  "4px wide invisible hit area",
                  "Cursor changes to col-resize",
                  "Visual indicator on hover (1px line)",
                  "Absolute positioned on right edge",
                  "Higher z-index than cell content"
                ]} />
              </div>
            </div>

            <CodeBlock title="HeaderCell.tsx" code={`// Header cell with resize handle
export function HeaderCell({
  column,
  isResizing,
  onResizeStart
}: HeaderCellProps) {
  return (
    <div
      className={cn(
        // Base styles
        "sticky top-0 h-8 px-2",
        "flex items-center justify-between",
        "bg-background-primary border-b border-r border-border-light",
        "text-font-tertiary text-sm font-medium",
        "select-none",

        // Z-index for sticky header
        "z-10",

        // Hover state
        !isResizing && "hover:bg-background-secondary",

        // Cursor
        isResizing ? "cursor-col-resize" : "cursor-pointer"
      )}
    >
      <span className="truncate">{column.header}</span>

      {/* Sort indicator */}
      {column.isSorted && (
        <SortIcon direction={column.sortDirection} />
      )}

      {/* Resize handle */}
      <div
        onMouseDown={onResizeStart}
        className={cn(
          "absolute right-0 top-0 h-full w-1",
          "cursor-col-resize",
          "hover:bg-accent-secondary",
          "z-20"
        )}
      />
    </div>
  );
}`} />
          </StyleSection>

          {/* Inline Edit Portal */}
          <StyleSection title="Inline Edit Portal & Positioning" icon={<Edit3 size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Edit mode uses Floating UI for intelligent positioning. The edit overlay appears below the cell
              by default but flips upward if there's insufficient space.
            </p>

            <div className="bg-amber-50 border border-amber-200 p-4 rounded-sm mb-6">
              <h4 className="font-mono font-bold text-sm text-amber-800 mb-2">UX Considerations</h4>
              <ul className="text-sm text-amber-700 space-y-1">
                <li>• Offset: -33px vertical, -3px horizontal (overlaps cell exactly)</li>
                <li>• Auto-flip when near viewport edge</li>
                <li>• Click-outside detection to commit/cancel</li>
                <li>• Escape key to cancel, Enter to commit</li>
                <li>• Auto-focus input on open</li>
              </ul>
            </div>

            <CodeBlock title="CellEditPortal.tsx" code={`import { useFloating, offset, flip, shift } from '@floating-ui/react';

export function CellEditPortal({
  cell,
  isOpen,
  onClose,
  onCommit
}: EditPortalProps) {
  const { refs, floatingStyles, placement } = useFloating({
    open: isOpen,
    placement: 'bottom-start',
    middleware: [
      offset({ mainAxis: -33, crossAxis: -3 }),  // Overlap cell
      flip({ fallbackPlacements: ['top-start'] }),
      shift({ padding: 8 })
    ]
  });

  // Click outside handler
  useClickOutside(refs.floating, () => {
    onCommit();
    onClose();
  });

  // Keyboard handlers
  useHotkeys('escape', onClose, { enableOnFormTags: true });
  useHotkeys('enter', () => { onCommit(); onClose(); }, { enableOnFormTags: true });

  if (!isOpen) return null;

  return (
    <Portal>
      <div
        ref={refs.setFloating}
        style={floatingStyles}
        className={cn(
          // Container styles
          "bg-background-primary rounded-sm",
          "shadow-dropdown border border-border-medium",
          "z-30",

          // Width matches cell
          "min-w-[var(--cell-width)]",

          // Danger border for validation errors
          cell.hasError && "border-red-500"
        )}
        data-placement={placement}
      >
        <FieldEditComponent
          field={cell.field}
          value={cell.value}
          onChange={cell.onChange}
          autoFocus
        />
      </div>
    </Portal>
  );
}`} />
          </StyleSection>

          {/* Scroll Shadows */}
          <StyleSection title="Scroll Shadows & Visual Feedback" icon={<Eye size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Scroll shadows provide visual feedback when content is scrollable. They use CSS pseudo-elements
              and clip-path for clean edges.
            </p>

            <CodeBlock title="scroll-shadows.css" code={`/* Vertical scroll shadow (appears below sticky header) */
.table-header::before {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 4px;
  box-shadow:
    0px 2px 4px 0px rgba(0, 0, 0, 0.05),
    0px 0px 4px 0px rgba(0, 0, 0, 0.03);
  clip-path: inset(0px 0px -4px 0px);
  visibility: var(--vertical-scroll-shadow, hidden);
  pointer-events: none;
}

/* Horizontal scroll shadow (appears on sticky first column) */
.sticky-column::after {
  content: '';
  position: absolute;
  top: -1px;
  right: -4px;
  height: calc(100% + 2px);
  width: 4px;
  box-shadow:
    2px 0px 4px 0px rgba(0, 0, 0, 0.05),
    0px 0px 4px 0px rgba(0, 0, 0, 0.03);
  clip-path: inset(0px -4px 0px 0px);
  visibility: var(--horizontal-scroll-shadow, hidden);
  pointer-events: none;
}

/* JavaScript toggles visibility via CSS variables */
const updateScrollShadows = (scrollTop: number, scrollLeft: number) => {
  const root = document.documentElement;
  root.style.setProperty(
    '--vertical-scroll-shadow',
    scrollTop > 0 ? 'visible' : 'hidden'
  );
  root.style.setProperty(
    '--horizontal-scroll-shadow',
    scrollLeft > 0 ? 'visible' : 'hidden'
  );
};`} />
          </StyleSection>

          {/* Keyboard Navigation Visual Feedback */}
          <StyleSection title="Keyboard Navigation & Focus Management" icon={<Keyboard size={18} />}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Navigation Keys</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">↑ ↓ ← →</span>
                    <span className="text-zinc-600">Move focus</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">j / k</span>
                    <span className="text-zinc-600">Vim-style up/down</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Enter</span>
                    <span className="text-zinc-600">Enter edit mode</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Escape</span>
                    <span className="text-zinc-600">Exit edit / clear selection</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Tab</span>
                    <span className="text-zinc-600">Next cell (in edit mode)</span>
                  </div>
                </div>
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Selection Keys</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Space</span>
                    <span className="text-zinc-600">Toggle row selection</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Ctrl/Cmd + A</span>
                    <span className="text-zinc-600">Select all rows</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Shift + ↑/↓</span>
                    <span className="text-zinc-600">Extend selection</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Shift + Click</span>
                    <span className="text-zinc-600">Range select</span>
                  </div>
                  <div className="flex justify-between p-2 bg-zinc-50 border border-border rounded-sm">
                    <span className="font-mono">Ctrl + Click</span>
                    <span className="text-zinc-600">Toggle individual</span>
                  </div>
                </div>
              </div>
            </div>

            <CodeBlock title="useKeyboardNavigation.ts" code={`import { useHotkeys } from 'react-hotkeys-hook';

export function useKeyboardNavigation({
  rowCount,
  columnCount,
  onFocusChange,
  onEditStart
}: NavOptions) {
  const [focusedCell, setFocusedCell] = useState({ row: 0, col: 0 });

  // Arrow key navigation
  useHotkeys('up, k', () => {
    setFocusedCell(prev => ({
      ...prev,
      row: Math.max(0, prev.row - 1)
    }));
  }, { preventDefault: true });

  useHotkeys('down, j', () => {
    setFocusedCell(prev => ({
      ...prev,
      row: Math.min(rowCount - 1, prev.row + 1)
    }));
  }, { preventDefault: true });

  useHotkeys('left, h', () => {
    setFocusedCell(prev => ({
      ...prev,
      col: Math.max(0, prev.col - 1)
    }));
  }, { preventDefault: true });

  useHotkeys('right, l', () => {
    setFocusedCell(prev => ({
      ...prev,
      col: Math.min(columnCount - 1, prev.col + 1)
    }));
  }, { preventDefault: true });

  // Enter edit mode
  useHotkeys('enter', () => {
    onEditStart(focusedCell);
  }, { preventDefault: true });

  // Scroll focused row into view
  useEffect(() => {
    onFocusChange(focusedCell);
    scrollToRow(focusedCell.row);
  }, [focusedCell]);

  return { focusedCell, setFocusedCell };
}`} />
          </StyleSection>

          {/* Virtualization Styling */}
          <StyleSection title="Virtualization & Performance Styling" icon={<Zap size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              TanStack Virtual uses absolute positioning with transforms for efficient rendering.
              Only visible rows are rendered in the DOM.
            </p>

            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm mb-6">
              <h4 className="font-mono font-bold text-sm text-emerald-800 mb-2">Performance Tips</h4>
              <ul className="text-sm text-emerald-700 space-y-1">
                <li>• Use <code>will-change: transform</code> on row containers</li>
                <li>• Avoid layout thrashing - batch DOM reads/writes</li>
                <li>• Use CSS containment: <code>contain: strict</code></li>
                <li>• Set explicit heights to prevent reflows</li>
                <li>• Use <code>content-visibility: auto</code> for off-screen content</li>
              </ul>
            </div>

            <CodeBlock title="VirtualizedBody.tsx" code={`import { useVirtualizer } from '@tanstack/react-virtual';

export function VirtualizedBody({ rows, rowHeight = 32, overscan = 10 }) {
  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan,
  });

  const virtualRows = virtualizer.getVirtualItems();
  const totalHeight = virtualizer.getTotalSize();

  return (
    <div
      ref={parentRef}
      className="overflow-auto relative"
      style={{ height: '100%' }}
    >
      {/* Spacer div for scroll height */}
      <div
        style={{ height: totalHeight }}
        className="relative w-full"
      >
        {/* Render only visible rows */}
        {virtualRows.map(virtualRow => {
          const row = rows[virtualRow.index];
          return (
            <div
              key={row.id}
              data-index={virtualRow.index}
              ref={virtualizer.measureElement}
              className="absolute left-0 w-full flex"
              style={{
                height: rowHeight,
                transform: \`translateY(\${virtualRow.start}px)\`,
                // Performance optimizations
                willChange: 'transform',
                contain: 'strict',
              }}
            >
              <TableRow row={row} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* Performance CSS */
const virtualStyles = \`
  .virtual-row {
    will-change: transform;
    contain: strict;
    content-visibility: auto;
    contain-intrinsic-size: 0 32px;
  }
\`;`} />
          </StyleSection>

          {/* Theming with CSS Variables */}
          <StyleSection title="Theming with CSS Variables" icon={<Paintbrush size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              The data grid supports light and dark themes through CSS custom properties.
              Themes can be applied at the component level or globally.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Light Theme</h4>
                <div className="bg-white border border-zinc-200 rounded-sm p-4 space-y-2">
                  <div className="h-8 bg-white border-b border-zinc-200 flex items-center px-2 text-sm text-zinc-400">Header</div>
                  <div className="h-8 bg-white border-b border-zinc-100 flex items-center px-2 text-sm">Row 1</div>
                  <div className="h-8 bg-blue-50 border-b border-zinc-100 flex items-center px-2 text-sm text-blue-700">Selected</div>
                  <div className="h-8 bg-white border-b border-zinc-100 flex items-center px-2 text-sm">Row 3</div>
                </div>
              </div>
              <div>
                <h4 className="font-mono font-bold text-sm text-zinc-900 mb-3">Dark Theme</h4>
                <div className="bg-zinc-900 border border-zinc-700 rounded-sm p-4 space-y-2">
                  <div className="h-8 bg-zinc-900 border-b border-zinc-700 flex items-center px-2 text-sm text-zinc-400">Header</div>
                  <div className="h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 text-sm text-zinc-200">Row 1</div>
                  <div className="h-8 bg-blue-900/30 border-b border-zinc-800 flex items-center px-2 text-sm text-blue-300">Selected</div>
                  <div className="h-8 bg-zinc-900 border-b border-zinc-800 flex items-center px-2 text-sm text-zinc-200">Row 3</div>
                </div>
              </div>
            </div>

            <CodeBlock title="theme.css" code={`/* Light Theme (default) */
:root,
[data-theme="light"] {
  /* Backgrounds */
  --dg-bg-primary: #ffffff;
  --dg-bg-secondary: #fcfcfc;
  --dg-bg-tertiary: #f1f1f1;

  /* Borders */
  --dg-border-light: #f1f1f1;
  --dg-border-medium: #ebebeb;
  --dg-border-strong: #d6d6d6;

  /* Text */
  --dg-font-primary: #333333;
  --dg-font-secondary: #666666;
  --dg-font-tertiary: #999999;

  /* Accent (selection) */
  --dg-accent-bg: #e8f4fc;
  --dg-accent-border: #3b82f6;
  --dg-accent-text: #1d4ed8;

  /* Shadows */
  --dg-shadow-color: rgba(0, 0, 0, 0.08);
}

/* Dark Theme */
[data-theme="dark"] {
  /* Backgrounds */
  --dg-bg-primary: #18181b;
  --dg-bg-secondary: #27272a;
  --dg-bg-tertiary: #3f3f46;

  /* Borders */
  --dg-border-light: #27272a;
  --dg-border-medium: #3f3f46;
  --dg-border-strong: #52525b;

  /* Text */
  --dg-font-primary: #fafafa;
  --dg-font-secondary: #a1a1aa;
  --dg-font-tertiary: #71717a;

  /* Accent (selection) */
  --dg-accent-bg: rgba(59, 130, 246, 0.2);
  --dg-accent-border: #60a5fa;
  --dg-accent-text: #93c5fd;

  /* Shadows */
  --dg-shadow-color: rgba(0, 0, 0, 0.4);
}

/* Component usage */
.data-grid {
  background: var(--dg-bg-primary);
  color: var(--dg-font-primary);
}

.data-grid-cell {
  border-color: var(--dg-border-light);
}

.data-grid-cell[data-selected="true"] {
  background: var(--dg-accent-bg);
}`} />
          </StyleSection>

          {/* Complete Component Example */}
          <StyleSection title="Complete Styled Component Example" icon={<Code size={18} />}>
            <p className="text-sm text-zinc-600 mb-4">
              Here's a complete example showing all styling patterns working together with TanStack Table and Virtual.
            </p>

            <CodeBlock title="DataGrid.tsx (Complete)" code={`import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { useVirtualizer } from '@tanstack/react-virtual';
import { cn } from '@/lib/utils';

export function DataGrid<TData>({
  data,
  columns,
  theme = 'light',
  rowHeight = 32,
  enableSelection = true,
  enableVirtualization = true,
}: DataGridProps<TData>) {
  const parentRef = useRef<HTMLDivElement>(null);
  const [rowSelection, setRowSelection] = useState({});
  const [focusedRow, setFocusedRow] = useState<number | null>(null);

  // TanStack Table instance
  const table = useReactTable({
    data,
    columns,
    state: { rowSelection },
    onRowSelectionChange: setRowSelection,
    getCoreRowModel: getCoreRowModel(),
    enableRowSelection,
  });

  const { rows } = table.getRowModel();

  // TanStack Virtual
  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => rowHeight,
    overscan: 10,
  });

  const virtualRows = enableVirtualization
    ? virtualizer.getVirtualItems()
    : rows.map((_, i) => ({ index: i, start: i * rowHeight, size: rowHeight }));

  return (
    <div
      className="data-grid w-full h-full flex flex-col"
      data-theme={theme}
    >
      {/* Header */}
      <div className="flex sticky top-0 z-10 bg-[var(--dg-bg-primary)]">
        {table.getHeaderGroups().map(headerGroup => (
          <div key={headerGroup.id} className="flex">
            {enableSelection && (
              <div className="w-8 h-8 flex items-center justify-center border-b border-r border-[var(--dg-border-light)]">
                <input
                  type="checkbox"
                  checked={table.getIsAllRowsSelected()}
                  onChange={table.getToggleAllRowsSelectedHandler()}
                />
              </div>
            )}
            {headerGroup.headers.map(header => (
              <div
                key={header.id}
                className={cn(
                  "h-8 px-2 flex items-center",
                  "border-b border-r border-[var(--dg-border-light)]",
                  "text-[var(--dg-font-tertiary)] text-sm font-medium",
                  "select-none cursor-pointer",
                  "hover:bg-[var(--dg-bg-secondary)]"
                )}
                style={{ width: header.getSize() }}
              >
                {flexRender(header.column.columnDef.header, header.getContext())}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Body */}
      <div
        ref={parentRef}
        className="flex-1 overflow-auto relative"
      >
        <div style={{ height: virtualizer.getTotalSize() }} className="relative">
          {virtualRows.map(virtualRow => {
            const row = rows[virtualRow.index];
            const isSelected = row.getIsSelected();
            const isFocused = focusedRow === virtualRow.index;

            return (
              <div
                key={row.id}
                data-index={virtualRow.index}
                data-selected={isSelected}
                data-focused={isFocused}
                className={cn(
                  "absolute left-0 w-full flex",
                  "transition-colors",
                  isSelected && "bg-[var(--dg-accent-bg)]",
                  isFocused && "bg-[var(--dg-bg-tertiary)]",
                  !isSelected && !isFocused && "hover:bg-[var(--dg-bg-secondary)]"
                )}
                style={{
                  height: rowHeight,
                  transform: \`translateY(\${virtualRow.start}px)\`,
                  willChange: 'transform',
                }}
                onClick={() => setFocusedRow(virtualRow.index)}
              >
                {enableSelection && (
                  <div className="w-8 h-8 flex items-center justify-center border-b border-r border-[var(--dg-border-light)]">
                    <input
                      type="checkbox"
                      checked={isSelected}
                      onChange={row.getToggleSelectedHandler()}
                    />
                  </div>
                )}
                {row.getVisibleCells().map(cell => (
                  <div
                    key={cell.id}
                    className={cn(
                      "h-8 px-2 flex items-center",
                      "border-b border-r border-[var(--dg-border-light)]",
                      "text-[var(--dg-font-primary)] text-sm",
                      "truncate"
                    )}
                    style={{ width: cell.column.getSize() }}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </div>
                ))}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}`} />
          </StyleSection>
        </>
      )
    }
  }
};
