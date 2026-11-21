# Americantriangle — User Personas

Status: Draft for review with [PRD.md](PRD.md).

These are design personas. They are not customers, employees, testimonials, or evidence of traction. Names are labels for requirements. Do not publish them as real people.

## How to read a persona

Each persona has a goal, what they can see, and what the product must not imply. Authorization is still the role and the resource, checked on the server. A persona description is not a permission grant.

## Customers

### Riley Chen — Model evaluation lead

Riley leads evaluation for an organization that already trains or selects models elsewhere. Riley buys human preference feedback, response evaluation, and benchmark reports.

Riley needs criteria, reviewer agreement, and an export that names the dataset version. Riley does not need Americantriangle to train the model. A score without the rubric and the version is not useful.

Riley sees their organization’s projects, deliverables, and invoices. Riley does not see contributor home addresses, other clients, or internal staffing notes.

### Sam Okonkwo — Data operations lead

Sam needs labeled records, classifications, prompts, or supervised examples prepared for a training stack Sam already operates. Sam cares about schema validity, duplicates, reviewer disagreement, and the difference between raw and approved files.

Sam will reject a delivery that mixes unreviewed rows into an approved export. Sam is not buying “model training” as a synonym for annotation.

### Elena Vasquez — Engineering director

Elena buys an LLM application, a RAG system, an agent, or an integration. Elena expects milestones, a named project manager, client approval on deliverables, and a support path after release.

If the engagement also needs human evaluation data, Elena still sees that data work as a defined service with its own acceptance rules. Elena’s developers may call model APIs from the system Americantriangle builds. Those calls use the client’s approved provider setup for that project.

### Chris Dalton — Transformation sponsor

Chris is the economic buyer for strategy and a follow-on build. Chris asks for a consultation, reads a proposal, and checks whether the work is moving. Chris does not manage tasks or rubrics.

Chris needs plain status: qualified or not, proposed, in delivery, waiting on approval, delivered. Chris should not see draft internal estimates that were never issued.

## Contributors

Contributors share one account type and one qualification model. The four personas below differ by expertise and by the evidence a reviewer needs. Expertise categories for the product are software engineering, mathematics, physics, science, AI and machine learning, data science, writing and linguistics, finance, business, legal, and healthcare and life sciences.

### Alex Rivera — Software contributor

Alex wants paid coding and code-evaluation tasks after a coding assessment. Alex needs a clear spec, a draft save, one exclusive assignment, and a review that points at the requirement they missed.

Alex must not see other contributors’ solutions before submission. Passing the assessment does not promise a volume of work.

### Priya Shah — Mathematics and science contributor

Priya takes written mathematics, physics, or scientific reasoning work. Some items can be scored by a key. Others need a human reviewer. Priya needs attempt limits and a stored version of the assessment they actually took.

Priya must not see the answer key or the scoring notes beforehand.

### Jordan Blake — Writing and linguistics contributor

Jordan writes prompts, judges style and instruction-following, and ranks model responses. Jordan needs the rubric in the task instructions and a way to say that two outputs are tied when the task allows it.

Jordan’s preference is a human judgment. It is not, by itself, a training run.

### Morgan Ellis — Regulated-domain contributor

Morgan works in finance, legal, business, or healthcare and life sciences. Tasks may include documents. Morgan needs a stated purpose for the upload, a limit on who inside Americantriangle can open the file, and a project rule for any external model call.

Morgan does not become an employee by qualifying. Country or language limits apply only when the project records a legal reason.

### Contributor states

Registered, Profile Incomplete, Pending Assessment, Under Review, Qualified, Rejected, Suspended.

A suspended or deactivated account cannot start tasks. Rejection is a real outcome. The interface says that qualification is a decision, not a job offer.

## Client organization roles

### Client owner

The owner creates the organization, invites members, and can see that organization’s invoices and membership. The owner is the default billing contact until finance records another one. The owner cannot read any other organization, including one they guess by URL.

### Client member

A member works on inquiries, documents, messages, and approvals they were granted. A member does not administer billing unless the owner’s invitation grants that access. The permission matrix in Step 3 will name the exact grants. Until then, billing visibility defaults to the owner.

## Internal employees

Employees receive an invitation. The public registration forms cannot create these roles.

### Project manager — “Avery”

Avery owns the path from new inquiry through support. Avery writes internal notes and a separate client-visible update. Avery assigns engineers and, when the project includes data work, coordinates with talent and review. Avery cannot approve their own financial override. Finance approves earnings and invoices.

### Reviewer — “Noah”

Noah works a queue, applies the published criteria, and leaves a score and a comment. Noah cannot pick up their own contributor submission. If Noah is also a contributor on another project, those identities still cannot cross on the same submission. Disputes and escalations go to a second authorized person.

### Talent operations — “Renee”

Renee reads applications, assessment results, and the profile fields required to decide qualification. Renee does not need payment instruments or client contract drafts. Renee records the qualification state and the reason.

### Finance operations — “Parker”

Parker issues invoices, reconciles provider events, approves earnings, and records payouts. Parker needs idempotent webhook handling and an append-only ledger. Parker must not mark earnings approved because a client invoice was created. Parker does not need contributor portfolios beyond what a payout dispute requires, and that access is audited.

### Engineer — “Quinn”

Quinn delivers enterprise systems and may use the internal model gateway. Quinn’s provider keys stay on the server. Quinn sees project requirements and technical notes for assigned projects, not every client’s files.

### Administrator — “Taylor”

Taylor handles account status, support escalations, and configuration inside the powers granted to administrators. Taylor’s sensitive actions are audited. Taylor is not automatically a super administrator.

### Super administrator — “Reese”

Reese can act across organizations when operations require it. Every cross-organization read or write of customer or contributor personal data is audited. Reese’s daily work still uses the narrower role when that role is enough. A shared super-administrator password is not an acceptable setup. Reese has a named account.

## Anonymous visitor

A visitor can read the public pages and submit a lead form. A visitor has no project, task, invoice, or contributor profile until they create the relevant account. Public pages do not show private records “for demo.”

## Journey map

| Persona | Journey in the PRD |
| --- | --- |
| Visitor | 1. Visitor inquiry |
| Alex, Priya, Jordan, Morgan | 2, 3, 4. Qualification, assignment, task |
| Noah | 5. Review |
| Parker and the contributor | 6. Earnings |
| Riley, Sam, Elena, Chris, client owner | 7. Client project |
| Avery, Quinn | 8. Delivery |
| Sam, Avery | 9. Dataset export |
| Any account | 10. Recovery and denial |
