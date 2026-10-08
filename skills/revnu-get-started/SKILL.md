---
name: revnu-get-started
description: Set up or connect Revnu to grow a business from Cursor. Use when the customer asks to start with Revnu, connect their growth agent, or a Revnu tool returns setup_pending.
---

# Set up Revnu

Before any other Revnu tool in a new conversation, call `whoami` and confirm the business matches the request. Read [account and job handling](../../references/account-and-jobs.md), then call `whoami` and `setup_status`. Resume the returned stage instead of restarting setup. If the stage is `done`, confirm the connected business and move to the customer's job.

Follow `setup_status.next` using these stages:

- `website`: get the business's public website from the customer or their explicit request, then call `setup_website`. Include their IANA time zone if known. If the address fails, ask for a correction.
- `researching`: call `setup_status` with `waitSeconds` within its schema limit. Share the research progress while it runs.
- `review`: show the sourced findings and unanswered questions to the customer. Preserve row IDs. After their confirmation or corrections, call `setup_confirm` with their actual answers. Mark assumptions as unanswered rather than confirming them yourself.
- `payment`: call `setup_checkout` and give the returned link to the customer. Explain the actual plan, trial and payment details returned by Revnu. The customer completes Stripe checkout themselves; card details stay on Stripe. Check `setup_status` after they return.
- `start`: call `setup_finish` to start the first growth work, then read the returned state. Report what started and where the customer can review it.

Setup is complete when the server says `done`. If it waits on customer answers or checkout, name that next step. Then offer the requested first growth job through `revnu-grow`; avoid requiring a separate dashboard tour.
