import React, { useEffect, useRef, useState } from 'react';
import mermaid from 'mermaid';

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
  const [svg, setSvg] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

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

  if (error) {
    return (
      <div className="p-4 my-6 text-red-600 font-mono text-xs border border-red-200 bg-red-50 rounded-sm">
        <strong>Mermaid Error:</strong> {error}
        <pre className="mt-2 text-[10px] opacity-75 whitespace-pre-wrap">{chart}</pre>
      </div>
    );
  }

  return (
    <div 
      className="mermaid-container bg-white border border-border p-6 my-6 overflow-x-auto flex justify-center rounded-sm min-h-[100px]"
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: svg }}
    />
  );
};
