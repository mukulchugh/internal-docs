import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';
import { ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';

interface MermaidProps {
  chart: string;
}

mermaid.initialize({
  startOnLoad: false,
  theme: 'base',
  themeVariables: {
    primaryColor: '#ffffff',
    primaryTextColor: '#18181b', // zinc-950
    primaryBorderColor: '#18181b',
    lineColor: '#71717a', // zinc-500
    secondaryColor: '#f4f4f5', // zinc-100
    tertiaryColor: '#ffffff',
    mainBkg: '#ffffff',
    nodeBorder: '#18181b',
    clusterBkg: '#fafafa', // zinc-50
    clusterBorder: '#e4e4e7', // zinc-200
    titleColor: '#18181b',
    edgeLabelBackground: '#ffffff',
    fontFamily: '"JetBrains Mono", monospace'
  },
  flowchart: {
    curve: 'step',
    padding: 15
  }
});

export const Mermaid: React.FC<MermaidProps> = ({ chart }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const diagramRef = useRef<HTMLDivElement>(null);
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Inline zoom and pan state
  const [zoom, setZoom] = useState<number>(1);
  const [isPanning, setIsPanning] = useState<boolean>(false);
  const [panStart, setPanStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const renderChart = async () => {
      if (containerRef.current && chart) {
        try {
          // Generate unique ID
          const id = `mermaid-${Math.random().toString(36).substr(2, 9)}`;
          // Clean the chart string: trim whitespace to prevent syntax errors
          const cleanChart = chart.trim();

          // Render returns an object with svg property in v10+
          const { svg } = await mermaid.render(id, cleanChart);
          setSvg(svg);
          setError(null);
        } catch (err: any) {
          console.error('Mermaid render error:', err);
          setError(err.message || 'Syntax error in Mermaid diagram');
        }
      }
    };

    renderChart();
  }, [chart]);

  // Zoom controls
  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 0.25, 3));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 0.25, 0.5));
  };

  const handleReset = () => {
    setZoom(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Pan handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    if (e.button === 0) { // Left mouse button
      setIsPanning(true);
      setPanStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning) {
      setPanOffset({
        x: e.clientX - panStart.x,
        y: e.clientY - panStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  // Wheel zoom in diagram
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const delta = -Math.sign(e.deltaY) * 0.1;
      setZoom(prev => Math.max(0.5, Math.min(3, prev + delta)));
    };

    const diagramEl = diagramRef.current;
    if (diagramEl) {
      diagramEl.addEventListener('wheel', handleWheel, { passive: false });
      return () => diagramEl.removeEventListener('wheel', handleWheel);
    }
  }, []);

  if (error) {
    return (
      <div className="p-4 my-6 text-red-600 font-mono text-xs border border-red-200 bg-red-50 rounded-sm">
        <strong>Mermaid Error:</strong> {error}
        <pre className="mt-2 text-[10px] opacity-75 whitespace-pre-wrap">{chart}</pre>
      </div>
    );
  }

  return (
    <div className="relative my-6 group">
      {/* Zoom Controls */}
      <div className="absolute top-2 right-2 z-10 flex gap-1 bg-white/90 backdrop-blur-sm border border-border rounded-sm shadow-sm p-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={handleZoomOut}
          disabled={zoom <= 0.5}
          className="p-1.5 hover:bg-zinc-100 rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Zoom Out (Scroll)"
        >
          <ZoomOut size={14} className="text-zinc-700" />
        </button>

        <div className="px-2 py-1.5 text-[10px] font-mono text-zinc-700 text-center min-w-[45px] font-bold">
          {Math.round(zoom * 100)}%
        </div>

        <button
          onClick={handleZoomIn}
          disabled={zoom >= 3}
          className="p-1.5 hover:bg-zinc-100 rounded-sm transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
          title="Zoom In (Scroll)"
        >
          <ZoomIn size={14} className="text-zinc-700" />
        </button>

        <div className="h-6 w-px bg-border mx-0.5" />

        <button
          onClick={handleReset}
          className="p-1.5 hover:bg-zinc-100 rounded-sm transition-colors"
          title="Reset Zoom & Pan"
        >
          <RotateCcw size={12} className="text-zinc-700" />
        </button>
      </div>

      {/* Diagram Container */}
      <div
        ref={diagramRef}
        className={`mermaid-container bg-white border border-border rounded-sm overflow-hidden relative ${isPanning ? 'cursor-grabbing' : 'cursor-grab'}`}
        style={{ minHeight: '200px' }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          ref={containerRef}
          className="p-6 flex justify-center transition-transform"
          style={{
            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
            transformOrigin: 'center center'
          }}
          dangerouslySetInnerHTML={{ __html: svg }}
        />
      </div>

      {/* Instructions hint */}
      <div className="text-[10px] text-zinc-400 font-mono mt-2 text-center opacity-0 group-hover:opacity-100 transition-opacity">
        Scroll to zoom • Drag to pan
      </div>
    </div>
  );
};
