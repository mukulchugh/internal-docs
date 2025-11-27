import { ReactElement } from 'react';
import { PackageMeta, PackageDocs } from '../types';

export interface SearchResult {
  packageId: string;
  packageName: string;
  sectionKey: keyof PackageDocs;
  sectionTitle: string;
  snippet: string;
  matchCount: number;
}

/**
 * Recursively extract text content from React elements
 */
function extractTextFromReactElement(element: any): string {
  if (!element) return '';

  // Handle string/number primitives
  if (typeof element === 'string' || typeof element === 'number') {
    return String(element);
  }

  // Handle arrays
  if (Array.isArray(element)) {
    return element.map(extractTextFromReactElement).join(' ');
  }

  // Handle React elements
  if (typeof element === 'object') {
    if (element.props) {
      // Extract text from children
      if (element.props.children) {
        return extractTextFromReactElement(element.props.children);
      }
      // Extract text from common text props
      const textProps = ['label', 'title', 'description', 'placeholder', 'value'];
      const texts = textProps
        .map(prop => element.props[prop])
        .filter(Boolean)
        .map(extractTextFromReactElement);
      return texts.join(' ');
    }
  }

  return '';
}

/**
 * Search content across all documentation
 */
export function searchDocumentation(
  query: string,
  packages: PackageMeta[],
  docsMap: Record<string, PackageDocs>
): SearchResult[] {
  if (!query || query.trim().length < 2) return [];

  const lowerQuery = query.toLowerCase();
  const results: SearchResult[] = [];

  for (const pkg of packages) {
    const docs = docsMap[pkg.id];
    if (!docs) continue;

    // Search each section
    const sections = Object.entries(docs) as [keyof PackageDocs, { title: string; content: any }][];

    for (const [sectionKey, section] of sections) {
      const sectionText = extractTextFromReactElement(section.content);
      const lowerSectionText = sectionText.toLowerCase();

      // Check if query matches
      if (lowerSectionText.includes(lowerQuery)) {
        // Count occurrences
        const matchCount = (lowerSectionText.match(new RegExp(lowerQuery, 'gi')) || []).length;

        // Extract snippet around first match
        const matchIndex = lowerSectionText.indexOf(lowerQuery);
        const snippetStart = Math.max(0, matchIndex - 60);
        const snippetEnd = Math.min(sectionText.length, matchIndex + query.length + 60);
        let snippet = sectionText.substring(snippetStart, snippetEnd).trim();

        // Clean up snippet
        snippet = snippet.replace(/\s+/g, ' ');
        if (snippetStart > 0) snippet = '...' + snippet;
        if (snippetEnd < sectionText.length) snippet = snippet + '...';

        results.push({
          packageId: pkg.id,
          packageName: pkg.name,
          sectionKey,
          sectionTitle: section.title,
          snippet,
          matchCount,
        });
      }
    }
  }

  // Sort by match count (most relevant first)
  return results.sort((a, b) => b.matchCount - a.matchCount);
}
