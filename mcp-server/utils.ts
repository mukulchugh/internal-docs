import { PACKAGES, DOCS_MAP } from '../data/content.js';
import { PackageDocs } from '../types.js';

/**
 * Extract text content from React elements
 */
export function extractTextFromContent(element: any): string {
  if (!element) return '';

  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  }

  if (Array.isArray(element)) {
    return element.map(extractTextFromContent).join('\n');
  }

  if (typeof element === 'object') {
    if (element.props) {
      const texts: string[] = [];

      // Extract from children
      if (element.props.children) {
        texts.push(extractTextFromContent(element.props.children));
      }

      // Extract from common text props
      const textProps = ['label', 'title', 'description', 'placeholder', 'value', 'content'];
      for (const prop of textProps) {
        if (element.props[prop]) {
          texts.push(extractTextFromContent(element.props[prop]));
        }
      }

      return texts.filter(Boolean).join('\n');
    }
  }

  return '';
}

/**
 * List all available packages
 */
export function listPackages() {
  return PACKAGES.map(pkg => ({
    id: pkg.id,
    name: pkg.name,
    version: pkg.version,
    status: pkg.status,
    description: pkg.description,
    availableSections: Object.keys(DOCS_MAP[pkg.id] || {}),
  }));
}

/**
 * Get documentation for a specific package and section
 */
export function getDocumentation(packageId: string, section?: string): string | null {
  const docs = DOCS_MAP[packageId];
  if (!docs) return null;

  const pkg = PACKAGES.find(p => p.id === packageId);
  if (!pkg) return null;

  let result = `# ${pkg.name} Documentation\n\n`;
  result += `**Version:** ${pkg.version}\n`;
  result += `**Status:** ${pkg.status}\n`;
  result += `**Description:** ${pkg.description}\n\n`;
  result += `---\n\n`;

  if (section) {
    // Get specific section
    const sectionData = docs[section as keyof PackageDocs];
    if (!sectionData) return null;

    result += `## ${sectionData.title}\n\n`;
    result += extractTextFromContent(sectionData.content);
  } else {
    // Get all sections
    const sections = Object.entries(docs) as [keyof PackageDocs, { title: string; content: any }][];
    for (const [key, sectionData] of sections) {
      result += `## ${sectionData.title}\n\n`;
      result += extractTextFromContent(sectionData.content);
      result += `\n\n---\n\n`;
    }
  }

  return result;
}

/**
 * Search across all documentation
 */
export function searchDocs(query: string, limit: number = 10) {
  if (!query || query.trim().length < 2) {
    return { results: [], error: 'Query must be at least 2 characters' };
  }

  const lowerQuery = query.toLowerCase();
  const results: Array<{
    packageId: string;
    packageName: string;
    section: string;
    sectionTitle: string;
    snippet: string;
    matchCount: number;
  }> = [];

  for (const pkg of PACKAGES) {
    const docs = DOCS_MAP[pkg.id];
    if (!docs) continue;

    const sections = Object.entries(docs) as [keyof PackageDocs, { title: string; content: any }][];

    for (const [sectionKey, sectionData] of sections) {
      const text = extractTextFromContent(sectionData.content);
      const lowerText = text.toLowerCase();

      if (lowerText.includes(lowerQuery)) {
        const matchCount = (lowerText.match(new RegExp(lowerQuery, 'gi')) || []).length;
        const matchIndex = lowerText.indexOf(lowerQuery);
        const snippetStart = Math.max(0, matchIndex - 100);
        const snippetEnd = Math.min(text.length, matchIndex + query.length + 100);
        let snippet = text.substring(snippetStart, snippetEnd).trim();
        snippet = snippet.replace(/\s+/g, ' ');
        if (snippetStart > 0) snippet = '...' + snippet;
        if (snippetEnd < text.length) snippet = snippet + '...';

        results.push({
          packageId: pkg.id,
          packageName: pkg.name,
          section: sectionKey,
          sectionTitle: sectionData.title,
          snippet,
          matchCount,
        });
      }
    }
  }

  // Sort by relevance (match count)
  results.sort((a, b) => b.matchCount - a.matchCount);

  return {
    query,
    totalResults: results.length,
    results: results.slice(0, limit),
  };
}
