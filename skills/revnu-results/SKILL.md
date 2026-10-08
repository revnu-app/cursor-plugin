---
name: revnu-results
description: Check Revnu's growth results and ongoing work. Use when the customer asks what shipped, whether growth is working, which channel got replies or customers, what Revnu is doing, or what to change next.
---

# Check growth results

Before any other Revnu tool in a new conversation, call `whoami` and confirm the business matches the request. Read [account and job handling](../../references/account-and-jobs.md). Call `results_get` for the requested window. Its `since` is epoch milliseconds, clamped to the last seven days, with a default of 24 hours. For a longer period, tell the customer that limit and ask Revnu for a report through `ask_revnu` rather than presenting seven days as a month.

Read each channel's `available`, `data` and `reason`. Missing data is unknown; a measured zero is zero. Report the returned window, actual shipped work, spend and outcome counts where supplied. Distinguish activity, replies, meetings, conversions and revenue. A reply is not a meeting, customer or conversion. Do not report period replies divided by period sends as a conversion rate unless the service ties both counts to the same cohort. Attribute a result to a channel only where the data supports it. Include sources or artifact links returned by the service.

For "what is running?", use `agent_status` and `workflows_list`, then `workflow_runs` for a relevant workflow. Use `agent_message_status` for a known request. A quiet sandbox is not proof work is finished, and this connection's `agent_thread` does not include the customer's separate dashboard or Slack conversations.

For a recommendation, explain what the available evidence supports and which gap matters. If the customer requests the next experiment or a change, hand the concrete job to `ask_revnu` and follow it to completion. A request for a report alone leaves campaigns, spend, workflows and approvals unchanged.

End with the useful answer: what happened, what remains in progress or awaiting approval, and the next decision supported by the numbers.
