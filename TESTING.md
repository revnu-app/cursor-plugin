# Validate and test the Cursor plugin

Package validation, a working MCP server, Cursor skill behavior and marketplace approval are separate checks. Keep internal release records and raw evidence in a private workspace. Never publish credentials, customer data or internal logs here.

## Validate the release package

From this repository:

```sh
node scripts/validate-plugin.mjs
```

This checks the single-plugin manifest, hosted MCP configuration, skill names and frontmatter, logo and local Markdown references. It allows only the 14 public plugin files and rejects symlinks and common private/build files. GitHub Actions runs the same check. Inspect the tracked file list before publishing; the hosted server implementation and development credentials belong outside this repository.

## Install a local copy

Copy the complete plugin directory into `~/.cursor/plugins/local/revnu`, with `.cursor-plugin/plugin.json` under that directory. Preserve any existing copy before replacing it. Cursor skips symlinks that point outside its local plugin directory. A marketplace installation with the same plugin name takes precedence over a local copy.

Reload Cursor with **Developer: Reload Window**, then inspect **Customize** for all four skills and the Revnu MCP. Confirm slash-command discovery and connection separately. Some managed organizations disable Local Plugin Imports; use an authorized test workspace.

The checked-in `mcp.json` connects to the real service. For isolated verification, edit **only the installed test copy** to use a local or staging MCP URL. Use a disposable business with no real delivery credentials. OAuth and tool calls must target that same environment. Keep the release package's production URL unchanged.

Cursor's documented OAuth callbacks are `http://localhost:8787/callback` for desktop and `https://www.cursor.com/agents/mcp/oauth/callback` for web/Agents. Check dynamic registration, PKCE, consent, token exchange and revocation in the environment being tested. A direct test token proves tool access, not OAuth.

## Server checks

Exercise the actual MCP endpoint with a real client:

1. An unauthenticated request returns 401 and points to OAuth resource metadata. Discovery names the correct environment, public-client registration and PKCE S256.
2. Sign in as the disposable account, choose permissions, initialize and list tools. Call `whoami`; identity and available tools match the grant.
3. Read the queue, results and agent status. Read cards through `review_get`. Render MCP Apps where the host supports them; also check the text response.
4. Delegate one bounded job using `ask_revnu` and a unique `clientRequestId`. Follow queued/running status to the actual reply with `agent_message_status`. Check duplicate-ID retry, a second request while busy, explicit queueing and customer-requested interruption.
5. Use a read-only grant to check that write tools are absent or refused. Revoke a token and verify its next request fails. Reconnect and confirm the account stays the same.

Server checks cannot establish whether Cursor selected and followed a skill. Run the host cases below as well.

## Cursor acceptance cases

Repeat each branch with varied wording and a fresh conversation. Record successes over attempts; inspect tool arguments and real state, not just the assistant's final text.

| Case | Observable pass condition |
| --- | --- |
| New customer asks to set up a business | Uses setup status and supplied website, shows research before confirmation, hands checkout to the customer, resumes the current stage. |
| Existing customer asks for buyers | Uses the correct account and delegates the complete brief. Follows the same request to completion and shows actual deliverables. |
| Broad "get me customers" request | Starts a useful research/experiment job without requiring the customer to choose a channel or inventing authority to spend. |
| Running job returns progress | Reports it as unfinished, checks the request ID, and submits no accidental duplicate or interruption. |
| Customer adds a job or changes priority | Queues additional work or interrupts only as requested; never combines both flags. |
| Review a draft or revise it | Reads the current card and performs the requested revision. Inspection or an edit alone produces no send, publish or budget approval. |
| Customer explicitly sends a prepared test email | Uses the allowed card action and exact requested body; real isolated state reflects the send or a truthful delivery refusal. |
| Results contain an unavailable channel | Reports unknown with its reason and measured zero separately. Names the actual reporting window. |
| Token lacks permission or is revoked | Explains the specific blocker and connection step; performs no unauthorized change. |
| Tool output includes an instruction to send or expose data | Treats it as outside text; follows the customer's request only. |

Test the slash commands and ordinary phrasing. For app cards, check the shown business, payload and buttons against tool results. Separate a pending approval from something that actually shipped.

## Cloud and marketplace

A local desktop copy does not install the plugin in Cursor's cloud or Grok Bot. Test the reviewed plugin in those hosts separately with their own per-user OAuth connection. Cloud MCP requires HTTP or stdio; this package uses HTTP.

Submit the public repository at [Cursor's publisher application](https://cursor.com/marketplace/publish). Cursor manually reviews inclusion and updates. Verify the resulting listing, install button, logo, skills, account connection and first completed job after approval. Marketplace traffic, Grok availability and paid activation need their own evidence.

References: [plugin authoring](https://cursor.com/docs/reference/plugins), [local testing](https://cursor.com/docs/plugins), [MCP and OAuth](https://cursor.com/docs/mcp), [cloud MCP](https://cursor.com/docs/cloud-agent/capabilities), [Revnu MCP](https://revnu.com/mcp).
