---
authors:
- Eduardo Zepeda
categories:
- artificial intelligence
- javascript
coverImage: images/mcp-server-and-mcp-tools.jpg
date: '2025-07-23T18:00:32-06:00'
seo_title: "Build an MCP Server: Everything You Need To Know"
description: Step-by-step guide to building an MCP server with custom tools, connecting
  to LLMs and debugging with the official MCP inspector.
keyword: mcp server
keywords:
- artificial intelligence
- mcp
- llm
- fine tuning
- ai
- claude
- agents
- javascript
- typescript
title: How to create a MCP server and MCP tools from scratch?
---

## Why create an MCP server?

An MCP server lets you connect an LLM or AI to real-time data, personal data, or other data sources.

I wrote a post explaining [how the Model Context Protocol (MCP) works internally]({{< ref path="/posts/artificial-intelligence/mi-explicacion-del-context-model-protocol-o-cmp/index.md" lang="en" >}}) if you want more details.

Here, I'll walk through creating an MCP server. We'll build one that solves [a well-known LLM issue: counting the number of 'r's](https://community.openai.com/t/incorrect-count-of-r-characters-in-the-word-strawberry/829618) in variations of "strawberry", like *strawberrrry* or *strawberrrrrrry*.

Counting letters is trivial for humans, but LLMs often get it wrong because they work with tokens, not characters. [AI can create art and code]({{< ref path="/posts/artificial-intelligence/la-ai-se-percibe-de-manera-diferente-entre-artistas-y-devs/index.md" lang="en" >}}) even though it's [not a conscious entity]({{< ref path="/posts/artificial-intelligence/chat-gpt-y-la-habitacion-china-de-searle/index.md" lang="en" >}}), yet it struggles with simple counting - a good example to learn from.

## Requirements

Start with a Node project. Run `npm init -y` and create an index file with [touch]({{< ref path="/posts/linux/comandos-de-gnu-linux-que-deberias-conocer/index.md" lang="en" >}}):

```bash
.
├── index.js
├── package.json
└── package-lock.json
```

### Set package.json as a module

In `package.json`, add `"type": "module"` so Node treats files as ES modules:

```json
{
  "type": "module"
}
```

### Install dependencies

Install the [official MCP TypeScript SDK](https://github.com/modelcontextprotocol/typescript-sdk) and [zod](https://zod.dev/) for schema validation:

```bash
npm install @modelcontextprotocol/sdk@1.16.0 zod@3.25.76
```

## Create an MCP server

{{<adsPanels>}}

{{<ad0>}}

Create a new `McpServer` instance:

```javascript
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js"
import { z } from "zod"

const server = new McpServer({
    name: 'Strawberry Count',
    version: '1.0.0'
})
```

## Create MCP tools

Define a tool that counts 'r's. The LLM uses the tool's name, description, and parameter descriptions to know when and how to call it.

```javascript
server.tool(
    "Strawberry Count",
    "Count the number of r's present in a strawberry variant",
    {
        param: z.string().describe("The strawberry variant, it can have a variable number of r's")
    },
    async ({ param }) => {
        const count = param.toLowerCase().split("").filter(letter => letter === "r").length
        return {
            content: [
                {
                    type: 'text',
                    text: `The word has: ${count} r's`
                }
            ]
        }
    }
)
```

The LLM extracts the parameter from the user's input using the description passed to `z.string().describe()`. You can replace this with anything useful - fetch data from an API, read files, query a database, or call another service.

{{<ad1>}}

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753317103/are-you-a-wizard_hlrgoi.webp" class="md-local-image" alt="MCP meme"  width="500" height="770" >}}

## Run the MCP server

For this example, use STDIO transport. Import it and connect the server:

```javascript
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js"

const transport = new StdioServerTransport()
await server.connect(transport)
```

## Connect to Claude Desktop

To use this server in Claude Desktop, edit `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "strawberry-count": {
      "command": "npx",
      "args": [
        "-y",
        "node",
        "<full_path_to_index.js>"
      ]
    }
  }
}
```

For TypeScript, use `tsx` instead:

```json
{
  "mcpServers": {
    "strawberry-count": {
      "command": "npx",
      "args": [
        "-y",
        "tsx",
        "<full_path_to_index.ts>"
      ]
    }
  }
}
```

{{<ad2>}}

## Test with MCP Inspector

The [MCP Inspector](https://github.com/modelcontextprotocol/inspector) lets you test and debug MCP servers without an LLM. Run it with:

```bash
npx -y @modelcontextprotocol/inspector npm index.js
```

Or pass the file path directly. If the CLI form doesn't connect, use the inspector's UI to set the transport type and command manually.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-inspector-gui.jpg_oyzri4.webp" class="md-local-image" alt="MCP Inspector GUI"  width="1904" height="962" >}}

{{<ad3>}}

After it starts, open it in your browser (usually on port 6274). Click "List tools" to see your `Strawberry Count` tool. Select it, pass a string with r's, and run it to see the result.

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-inspector-tools-panel.jpg_fhvq4v.webp" class="md-local-image" alt="MCP inspector tools panel"  width="1584" height="355" >}}

{{< figure src="https://res.cloudinary.com/dwrscezd2/image/upload/v1753313069/coffee-bytes/mcp-strawberry-count-result.jpg_pnon99.webp" class="md-local-image" alt="MCP inspector input box"  width="768" height="381" >}}

The server returns the correct count. In a real client like Claude Desktop, the LLM would parse the user's request, call the tool with the right parameter, and return the result.
