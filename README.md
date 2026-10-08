# Revnu for Cursor

Build your product in Cursor. Hand customer acquisition to Revnu.

Revnu is your growth hire. It runs ongoing work across outbound, ads, SEO and other connected channels, remembers what it learns about your business, and reports what shipped and what worked. This plugin connects Cursor to your own Revnu agent through the hosted OAuth MCP server.

## Connect

Install the Revnu plugin in Cursor, connect its MCP server and sign in to Revnu. Choose the permissions you want Cursor to have. Connecting can create an account; your assistant then walks you through business research, confirmation and checkout. Revnu is a paid service. Any trial and subscription terms are shown during setup.

Until the marketplace listing is approved, use [Revnu's direct Cursor connection](https://revnu.com/mcp) for the MCP server, or [install this plugin locally](TESTING.md). The direct connection supplies tools; the plugin also supplies the skills below.

## Start a job

Try these in Cursor:

- "Set me up with Revnu for https://my-business.example."
- "Ask Revnu to research 20 potential buyers for this product and prepare outreach for my review."
- "What's waiting for my approval in Revnu?"
- "What did Revnu ship this week, and what results did it get?"

| Skill | What it does |
| --- | --- |
| `/revnu-get-started` | Connect and set up your business with Revnu. |
| `/revnu-grow` | Hand a growth job to your continuing Revnu agent and follow its progress. |
| `/revnu-review` | Inspect prepared work and carry out your approval, revision or send decision. |
| `/revnu-results` | Read measured outcomes and ongoing work. |

Cursor can also select the relevant skill from your request. Jobs can take several minutes. The plugin checks the request's status so progress is not mistaken for completion. Revnu continues its own work after the Cursor conversation ends.

## Account access

The MCP server is `https://revnu.com/api/mcp`. OAuth signs you in; no API key, local binary or additional runtime is required. Revnu's account permissions and approval rules apply. Sends, approvals, workflow edits and other writes change your real account. The skills act on your requested decisions; reading a queue or report does not authorize publishing, sending or spending.

Revoke Cursor's connection in Revnu under **Settings → API Tokens**. Each connected app has its own permissions and token. Reconnect if the token is revoked or expires. When a permission is missing, the assistant explains what is blocked.

This repository contains the plugin configuration and instructions. Revnu's hosted server and customer data are outside the package. See [privacy](https://revnu.com/privacy), [terms](https://revnu.com/terms) and [MCP documentation](https://revnu.com/docs/mcp).

## Development

See [TESTING.md](TESTING.md) for package validation, isolated MCP checks and real Cursor acceptance steps. Validation permits only the 14 public plugin files. Keep internal reports, credentials, customer data and backend code outside this repository. Run the package validator with Node 22 or later:

```sh
node scripts/validate-plugin.mjs
```

The plugin is MIT licensed. The license does not grant rights to Revnu's name or logo, or access to the hosted service.
