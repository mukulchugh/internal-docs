# Quivly Documentation MCP Server

A Model Context Protocol (MCP) server that provides AI assistants access to Quivly's internal package documentation.

## What is this?

This MCP server allows AI assistants (like Claude) to:
- List all available Quivly packages
- Fetch documentation for specific packages and sections
- Search across all documentation content
- Get complete package documentation

## Installation

The MCP server is already set up in this project. To use it with Claude Desktop or other MCP clients:

### For Claude Desktop

1. Add to your Claude Desktop configuration file:
   - **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
   - **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`

2. Add this configuration:

```json
{
  "mcpServers": {
    "quivly-docs": {
      "command": "pnpm",
      "args": ["mcp"],
      "cwd": "/Users/mukulchugh/Quivly/Resources/Docs/internal-docs"
    }
  }
}
```

3. Restart Claude Desktop

## Available Tools

### 1. `list_packages`
Lists all available Quivly packages with metadata.

**Example:**
```
Can you list all available Quivly packages?
```

**Response includes:**
- Package ID
- Package name
- Version
- Status (prod/proposed)
- Description
- Available documentation sections

### 2. `get_package_docs`
Get documentation for a specific package and optional section.

**Parameters:**
- `packageId` (required): Package ID (e.g., "data-grid", "ui-kit", "flow", "dashboard-widgets")
- `section` (optional): Specific section (overview, architecture, api, hooks, state, features, styles)

**Examples:**
```
Show me the overview for @quivly/data-grid
Get the API documentation for the data-grid package
Show me all docs for @quivly/ui-kit
```

### 3. `get_all_package_docs`
Get all documentation sections for a package in one response.

**Parameters:**
- `packageId` (required): Package ID

**Example:**
```
Get all documentation for the data-grid package
```

### 4. `search_docs`
Search across all documentation content.

**Parameters:**
- `query` (required): Search query string
- `limit` (optional): Max results to return (default: 10)

**Example:**
```
Search the docs for "virtualization"
Find all mentions of "TanStack Table"
```

**Response includes:**
- Package name
- Section name
- Text snippet around match
- Number of matches
- Results sorted by relevance

## Usage Examples

Once configured in Claude Desktop, you can ask:

- "What packages are available in Quivly?"
- "Show me the architecture docs for the data-grid"
- "Search for information about hooks in the documentation"
- "Get the complete documentation for @quivly/dashboard-widgets"
- "Find all references to inline editing"

## Running the Server Manually

For testing or development:

```bash
pnpm mcp
```

This will start the MCP server on stdio (standard input/output), ready to receive MCP protocol messages.

## How It Works

1. The server reads documentation from `data/content.tsx`
2. Extracts text content from React JSX components
3. Provides tools via the MCP protocol
4. AI assistants can query the documentation without web scraping or file access

## Benefits

- **Fast**: Direct access to documentation without parsing HTML
- **Accurate**: Uses the same source as the web app
- **Searchable**: Full-text search across all content
- **Structured**: Returns organized, markdown-formatted documentation
- **Secure**: Read-only access, no file system exposure

## Development

To modify or extend the MCP server:

1. Edit `mcp-server/index.ts` - Main server implementation
2. Edit `mcp-server/utils.ts` - Documentation extraction utilities
3. Test with: `pnpm mcp`
4. Restart Claude Desktop to see changes
