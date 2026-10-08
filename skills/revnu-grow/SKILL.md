---
name: revnu-grow
description: Hand customer acquisition work to Revnu. Use when the customer asks Revnu to get customers, launch or market a product, find buyers, prepare outreach, create content, improve ads or run a growth experiment.
---

# Hand growth work to Revnu

Before any other Revnu tool in a new conversation, call `whoami` and confirm the business matches the request. Read [account and job handling](../../references/account-and-jobs.md). Revnu runs the growth work and keeps the business's memory. Cursor supplies the product context and the customer's request.

1. Identify the requested outcome and constraints. Reuse the website, audience and product facts already supplied. Ask only for missing information that changes the job, such as which business to use or a required budget. A broad request to get customers can start with Revnu researching the business and choosing an experiment; it does not require the customer to choose a channel.
2. For a product in this workspace, read the relevant README or public product description when requested. Summarize what it does, who it helps and its public URL. Confirm material uncertainty; keep secrets and private source code out of the delegation.
3. Call `ask_revnu` with a complete, concrete brief and a retry-safe `clientRequestId`. State the requested deliverable and actual authorization. For example, a first launch job can research suitable buyers and prepare sourced outreach for review, with no sending or ad spend.
4. Follow that request through its terminal status using the shared reference. Inspect any cards it creates with `review_list` and `review_get`. Use `revnu-review` for the customer's decisions.
5. Report what Revnu actually completed, link to artifacts or cards when provided, name anything awaiting approval, and explain how the outcome will be measured. A researched list or draft is a deliverable; replies, meetings and customers require measured evidence. Check measured claims in an agent reply against `results_get` for the same supported window before presenting them as results. If the sources disagree or the window is unclear, show the disagreement and its limits; do not label the reply's numbers as verified.

When recommending from results, follow [measurement limits](../revnu-results/SKILL.md). Replies do not prove meetings, customers or revenue. Period reply and send totals do not establish a cohort reply rate.

For continuing work, Revnu owns follow-ups and learning across channels. Check existing workflows before proposing a duplicate recurring job. A new channel, connection or budget can be a next step without blocking work Revnu can already do.
