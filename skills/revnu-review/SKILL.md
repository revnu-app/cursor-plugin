---
name: revnu-review
description: Review work prepared by Revnu and carry out the customer's decisions. Use when they ask what needs approval, want to inspect or revise a draft, approve a proposal, send a prepared email, snooze or dismiss a review card.
---

# Review and act on prepared work

Read [account and job handling](../../references/account-and-jobs.md). Call `review_list`, then `review_get` for the card being discussed. Read its current `status`, `actions`, payload and primary label. Use actual returned IDs and verbs.

Show enough detail for the decision: recipient and text for email, destination and content for a post, current and proposed spend for a budget, or the question and choices for a setup decision. If Cursor renders the Revnu MCP App, its cards can supply that view; otherwise present the same information in chat. Resolve an ambiguous reference before taking action.

Carry out the customer's explicit decision:

- Gmail draft or reply: `review_send`. Pass `body` only when they requested an edit. This sends real email.
- Other approval: `review_answer` with `action: "approve"`, only if the card's `actions` allows it. Approval can publish content or change spend.
- Question: `review_answer` with `action: "answer"` and their answer in `text`.
- Choice: `review_answer` with `action: "choose"` and the one allowed `optionValues` entry they selected.
- Revision: `review_request_changes` with their feedback. A requested edit does not authorize sending the revision.
- Snooze: `review_snooze` with the requested future time in epoch milliseconds.
- Decline: `review_dismiss` with their reason when supplied.

Inspect the result and confirm the actual outcome. A failed or conflicting write did not ship; re-read the card before deciding whether to retry. Follow any revised work through its new review state. An empty queue means nothing is awaiting review, not that Revnu has stopped working.
