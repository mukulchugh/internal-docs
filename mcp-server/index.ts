#!/usr/bin/env node
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { extractTextFromContent, getDocumentation, listPackages, searchDocs } from './utils.js';

const server = new Server(
  {
    name: 'quivly-docs',
    version: '1.0.0',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'list_packages',
        description: 'List all available Quivly packages with their metadata',
        inputSchema: {
          type: 'object',
          properties: {},
        },
      },
      {
        name: 'get_package_docs',
        description: 'Get documentation for a specific package and section',
        inputSchema: {
          type: 'object',
          properties: {
            packageId: {
              type: 'string',
              description: 'Package ID (e.g., data-grid, ui-kit, flow, dashboard-widgets)',
            },
            section: {
              type: 'string',
              description: 'Documentation section (overview, architecture, api, hooks, state, features, styles)',
              enum: ['overview', 'architecture', 'api', 'hooks', 'state', 'features', 'styles'],
            },
          },
          required: ['packageId'],
        },
      },
      {
        name: 'search_docs',
        description: 'Search across all documentation content',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query string',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results to return (default: 10)',
              default: 10,
            },
          },
          required: ['query'],
        },
      },
      {
        name: 'get_all_package_docs',
        description: 'Get all documentation sections for a specific package',
        inputSchema: {
          type: 'object',
          properties: {
            packageId: {
              type: 'string',
              description: 'Package ID (e.g., data-grid, ui-kit, flow, dashboard-widgets)',
            },
          },
          required: ['packageId'],
        },
      },
    ],
  };
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'list_packages': {
        const packages = listPackages();
        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(packages, null, 2),
            },
          ],
        };
      }

      case 'get_package_docs': {
        const { packageId, section } = args as { packageId: string; section?: string };
        const docs = getDocumentation(packageId, section);

        if (!docs) {
          return {
            content: [
              {
                type: 'text',
                text: `Package "${packageId}" not found or section "${section}" does not exist.`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: docs,
            },
          ],
        };
      }

      case 'get_all_package_docs': {
        const { packageId } = args as { packageId: string };
        const allDocs = getDocumentation(packageId);

        if (!allDocs) {
          return {
            content: [
              {
                type: 'text',
                text: `Package "${packageId}" not found.`,
              },
            ],
            isError: true,
          };
        }

        return {
          content: [
            {
              type: 'text',
              text: allDocs,
            },
          ],
        };
      }

      case 'search_docs': {
        const { query, limit = 10 } = args as { query: string; limit?: number };
        const results = searchDocs(query, limit);

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify(results, null, 2),
            },
          ],
        };
      }

      default:
        return {
          content: [
            {
              type: 'text',
              text: `Unknown tool: ${name}`,
            },
          ],
          isError: true,
        };
    }
  } catch (error) {
    return {
      content: [
        {
          type: 'text',
          text: `Error: ${error instanceof Error ? error.message : String(error)}`,
        },
      ],
      isError: true,
    };
  }
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Quivly Docs MCP Server running on stdio');
}

main().catch((error) => {
  console.error('Server error:', error);
  process.exit(1);
});
