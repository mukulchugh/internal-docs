import React from 'react';
import { Layout, Cpu, Terminal, Share2, Zap, Database, Code, Box, GitBranch, Edit3, Keyboard, MousePointer, Layers, Move, BarChart3, Palette, Server, Table2, CheckSquare } from 'lucide-react';
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

const PhaseItem = ({ phase, title, desc, duration }: { phase: string, title: string, desc: string, duration?: string }) => (
  <div className="flex gap-4 items-start p-4 border border-border bg-zinc-50/50 rounded-sm">
    <div className="w-6 h-6 border border-zinc-900 bg-white text-zinc-900 flex items-center justify-center font-bold font-mono text-xs shrink-0">
      {phase}
    </div>
    <div className="flex-1">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-zinc-900 text-sm font-mono">{title}</h4>
        {duration && <span className="text-[10px] font-mono text-zinc-400 bg-zinc-100 px-2 py-0.5 rounded">{duration}</span>}
      </div>
      <p className="text-xs text-zinc-600 mt-1">{desc}</p>
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

const DATA_GRID_GANTT = `gantt
  title @quivly/data-grid Implementation
  dateFormat YYYY-MM-DD
  axisFormat %W
  section Phase 1
  Project Setup          :done, p1, 2024-01-01, 7d
  TanStack Integration   :active, p2, after p1, 7d
  section Phase 2
  Virtualization         :p3, after p2, 7d
  Basic Components       :p4, after p3, 5d
  section Phase 3
  Selection System       :p5, after p4, 5d
  Keyboard Navigation    :p6, after p5, 5d
  section Phase 4
  Inline Editing         :p8, after p6, 7d
  Field Types            :p10, after p8, 10d
  section Phase 5
  Advanced Features      :p11, after p10, 12d
  section Phase 6
  Polish & Release       :p14, after p11, 12d`;

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

    plan: {
      title: "Implementation Plan",
      content: (
        <>
          {/* Gantt Chart */}
          <div className="bg-white border border-border p-1 rounded-sm mb-8">
            <Mermaid chart={DATA_GRID_GANTT} />
          </div>

          {/* Total Timeline */}
          <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-sm mb-8">
            <div className="flex items-center gap-3">
              <Badge variant="success">Total Timeline</Badge>
              <span className="text-lg font-bold text-emerald-800 font-mono">~14 weeks</span>
            </div>
            <p className="text-sm text-emerald-700 mt-2">
              Production-ready package with all CRM-grade features, fully independent and reusable.
            </p>
          </div>

          {/* Phases */}
          <div className="space-y-3">
            <PhaseItem
              phase="1"
              title="Foundation"
              duration="2 weeks"
              desc="Monorepo setup with npm workspaces, TypeScript configuration, TanStack Table integration, core context and provider, basic table rendering."
            />
            <PhaseItem
              phase="2"
              title="Virtualization & Components"
              duration="2 weeks"
              desc="TanStack Virtual integration, virtualized body component, header/row/cell components, scroll management, empty and loading states."
            />
            <PhaseItem
              phase="3"
              title="Selection & Navigation"
              duration="2 weeks"
              desc="Row selection (single, multi, range with Shift+Click), keyboard navigation (arrows, vim keys j/k), focus management, hotkeys (Ctrl+A, Escape, Enter), scroll-to-row on focus."
            />
            <PhaseItem
              phase="4"
              title="Inline Editing & Fields"
              duration="3 weeks"
              desc="Cell edit mode with Floating UI portal, click-outside detection, field registry system, 20+ field type implementations (text, number, date, select, relation, etc.)."
            />
            <PhaseItem
              phase="5"
              title="Advanced Features"
              duration="2.5 weeks"
              desc="Column resize and reorder, drag-and-drop rows with @hello-pangea/dnd, grouping with collapse/expand, aggregate footer (sum, avg, count), sorting and filtering."
            />
            <PhaseItem
              phase="6"
              title="Polish & Release"
              duration="2.5 weeks"
              desc="CSS variables theming, light/dark themes, unit and integration tests, performance benchmarks (10K rows @ 60fps), documentation and examples, npm publish."
            />
          </div>

          {/* Key Deliverables */}
          <h3 className="text-lg font-bold text-zinc-900 font-mono mt-8 mb-4 flex items-center gap-2">
            <Box size={18} /> Key Deliverables
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white p-4 border border-border rounded-sm">
              <h4 className="font-bold text-zinc-900 text-sm font-mono mb-2">@quivly/data-grid</h4>
              <FeatureList items={[
                "DataGridProvider component",
                "DataGrid main component",
                "8+ feature hooks",
                "Field registry interface",
                "DataSource interface",
                "CSS variables theming",
              ]} />
            </div>
            <div className="bg-white p-4 border border-border rounded-sm">
              <h4 className="font-bold text-zinc-900 text-sm font-mono mb-2">@quivly/data-grid-fields</h4>
              <FeatureList items={[
                "20+ field type implementations",
                "Display components for each type",
                "Edit components with validation",
                "Default registry export",
                "Field registry factory",
                "Type-safe field definitions",
              ]} />
            </div>
          </div>
        </>
      )
    }
  }
};
