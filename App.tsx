import React, { useState } from 'react';
import { 
  Menu, X, Box, Layers, Zap, Database, Code, 
  Layout, Cpu, Share2, GitBranch, Terminal, 
  ChevronRight, Search, FileText, Activity, AlertCircle, CheckCircle2
} from 'lucide-react';
import { DocStatus, PackageMeta, PackageDocs } from './types';
import { PACKAGES, DOCS_MAP } from './data/content';

// --- Components ---

const StatusBadge = ({ status }: { status: DocStatus }) => {
  const styles = {
    prod: "bg-emerald-100 text-emerald-800 border-emerald-200",
    proposed: "bg-amber-100 text-amber-800 border-amber-200",
    deprecated: "bg-red-100 text-red-800 border-red-200"
  };

  return (
    <span className={`px-2 py-0.5 text-[10px] font-mono font-bold uppercase tracking-wider border rounded-sm flex items-center gap-1 w-fit ${styles[status]}`}>
      {status === 'prod' && <CheckCircle2 size={10} />}
      {status === 'proposed' && <Activity size={10} />}
      {status === 'deprecated' && <AlertCircle size={10} />}
      {status}
    </span>
  );
};

// Placeholder for other packages
const EMPTY_DOCS: PackageDocs = {
  overview: { title: "Documentation Unavailable", content: <EmptyState /> },
  architecture: { title: "Architecture", content: <EmptyState /> },
  api: { title: "API Reference", content: <EmptyState /> },
  plan: { title: "Implementation Plan", content: <EmptyState /> },
};

function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center h-64 text-zinc-400 border border-dashed border-zinc-300 rounded-sm bg-zinc-50">
      <FileText size={32} className="mb-2 opacity-50" />
      <p className="font-mono text-sm">Content not yet generated.</p>
    </div>
  );
}

// --- Layout Components ---

const SidebarItem = ({ 
  active, 
  pkg,
  onClick 
}: { 
  active?: boolean, 
  pkg: PackageMeta, 
  onClick: () => void 
}) => {
  const isProposed = pkg.status === 'proposed';
  
  return (
    <button 
      onClick={onClick}
      className={`
        w-full flex items-center justify-between px-3 py-2 rounded-sm text-sm transition-all duration-200 group
        ${active 
          ? 'bg-zinc-900 text-white' 
          : 'text-zinc-600 hover:bg-zinc-100'}
      `}
    >
      <div className="flex items-center gap-3">
        {pkg.status === 'prod' ? <Box size={14} /> : <GitBranch size={14} />}
        <span className="font-mono text-xs">{pkg.name}</span>
      </div>
      {isProposed && <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />}
    </button>
  );
};

const NavSection = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <div className="mb-6">
    <h3 className="px-3 text-[10px] font-bold text-zinc-400 uppercase tracking-widest mb-2 font-mono">
      {title}
    </h3>
    <div className="space-y-0.5">
      {children}
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [activePkgId, setActivePkgId] = useState<string>('data-grid');
  const [activeTab, setActiveTab] = useState<keyof PackageDocs>('overview');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const activePkg = PACKAGES.find(p => p.id === activePkgId) || PACKAGES[0];
  
  // Resolve content
  const pkgDocs = DOCS_MAP[activePkgId] || EMPTY_DOCS;
  const activeContent = pkgDocs[activeTab] || { title: "Not Found", content: "Section not found" };

  const prodPackages = PACKAGES.filter(p => p.status === 'prod');
  const proposedPackages = PACKAGES.filter(p => p.status === 'proposed');

  return (
    <div className="flex h-screen overflow-hidden bg-white text-zinc-900 font-sans">
      
      {/* Sidebar */}
      <aside className={`
        fixed md:relative z-50 w-72 h-full bg-zinc-50 border-r border-border
        flex flex-col transition-transform duration-300 md:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Header */}
        <div className="p-5 border-b border-border bg-white">
          <div className="flex items-center gap-3 mb-1">
            <div className="w-8 h-8 bg-zinc-900 text-white flex items-center justify-center font-bold font-mono text-sm rounded-sm">
              Q
            </div>
            <div>
              <h1 className="text-sm font-bold text-zinc-900 leading-tight">Quivly Engineering</h1>
              <span className="text-[10px] text-zinc-500 font-mono">v.2024.04</span>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="px-4 pt-4">
           <div className="relative group">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 group-hover:text-zinc-600 transition-colors" size={14} />
            <input 
              type="text" 
              placeholder="Search packages..." 
              className="w-full bg-white border border-border rounded-sm py-2 pl-9 pr-4 text-xs font-medium placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-all font-mono"
            />
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 overflow-y-auto px-4 py-6 scrollbar-hide">
          <NavSection title="Production">
             {prodPackages.map(pkg => (
               <SidebarItem 
                 key={pkg.id}
                 active={activePkgId === pkg.id} 
                 pkg={pkg}
                 onClick={() => {
                   setActivePkgId(pkg.id);
                   setMobileMenuOpen(false);
                 }} 
               />
             ))}
          </NavSection>

          <NavSection title="Proposed / RFC">
            {proposedPackages.map(pkg => (
               <SidebarItem 
                 key={pkg.id}
                 active={activePkgId === pkg.id} 
                 pkg={pkg}
                 onClick={() => {
                   setActivePkgId(pkg.id);
                   setMobileMenuOpen(false);
                 }} 
               />
             ))}
          </NavSection>

          {/* Only show TOC if docs exist */}
          {DOCS_MAP[activePkgId] && (
            <div className="mt-8 pt-6 border-t border-border">
              <NavSection title="Table of Contents">
                {[
                  { id: 'overview', label: 'Overview', icon: Layout },
                  { id: 'architecture', label: 'Architecture', icon: Cpu },
                  { id: 'api', label: 'API Reference', icon: Terminal },
                  { id: 'plan', label: 'Implementation', icon: Share2 },
                ].map(item => (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id as keyof PackageDocs)}
                    className={`
                      w-full flex items-center gap-3 px-3 py-2 rounded-sm text-sm transition-all duration-200
                      ${activeTab === item.id 
                        ? 'text-zinc-900 font-bold bg-zinc-200/50' 
                        : 'text-zinc-500 hover:text-zinc-900'}
                    `}
                  >
                    <item.icon size={14} />
                    <span>{item.label}</span>
                  </button>
                ))}
              </NavSection>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border bg-white text-xs text-zinc-400 font-mono">
           Internal Documentation
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 relative overflow-hidden flex flex-col bg-white">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid z-0 pointer-events-none opacity-[0.4]"></div>

        {/* Top Bar (Mobile) */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-border bg-white z-40 relative">
           <span className="font-bold text-zinc-900 font-mono">Quivly</span>
           <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 border border-border rounded-sm">
             {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
           </button>
        </div>

        {/* Content Scroll Area */}
        <div className="flex-1 overflow-y-auto relative z-10 p-6 md:p-12 scroll-smooth">
          <div className="max-w-4xl mx-auto">
            
            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 mb-8 border-b border-border pb-4">
              <span>Packages</span>
              <ChevronRight size={12} />
              <span className={activePkg.status === 'proposed' ? 'text-amber-600' : 'text-zinc-900'}>
                {activePkg.name}
              </span>
              <ChevronRight size={12} />
              <span className="text-zinc-400">{activeContent.title}</span>
            </div>

            {/* Header */}
            <header className="mb-10">
              <div className="flex items-center gap-4 mb-4">
                <h1 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
                  {activeContent.title}
                </h1>
                <StatusBadge status={activePkg.status} />
              </div>
              <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed">
                {activePkg.description}
              </p>
            </header>

            {/* Dynamic Content */}
            <div className="animate-fade-in">
              {activeContent.content}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
