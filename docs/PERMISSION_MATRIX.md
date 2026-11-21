# Permission matrix

`allow` means the server may run the action after the resource check. `own` means the actor's user id must match the resource. `org` means the actor's memberships must include `resource.organizationId`. `assigned` means the actor is a project member. A suspended, deactivated, or unverified account is denied every row except reading and updating their own profile.

The implementation is `authorize` in `src/services/authorization.ts`. Database policies repeat the tenant and ownership rules.

| Action | Contributor | Client owner | Client member | Project manager | Reviewer | Talent ops | Finance | Engineer | Admin | Super admin |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Read own profile | own | own | own | own | own | own | own | own | own | own |
| Update own profile | own | own | own | own | own | own | own | own | own | own |
| Read contributor applications | | | | | | allow | | | allow | allow |
| Set qualification | | | | | | allow | | | | allow |
| Read own submission | own | | | | | | | | | allow |
| Submit assigned task | own | | | | | | | | | |
| Review a submission | | | | | if not author | | | | | allow |
| Read internal notes | | | | assigned | assigned | | | assigned | allow | allow |
| Read client project | | org | org | assigned | assigned | | | assigned | allow | allow |
| Manage project delivery | | | | assigned | | | | | | allow |
| Invite client member | | org | | | | | | | | allow |
| Read org invoices | | org | | | | | allow | | | allow |
| Approve earnings | | | | | | | allow | | | allow |
| Initiate or confirm payout | | | | | | | allow | | | allow |
| Call model gateway | | | | | | | | assigned | | allow |
| Export approved dataset | | | | assigned | | | | assigned | | allow |
| Read operational analytics | | | | allow | | allow | allow | | allow | allow |
| Change account status | | | | | | | | | allow | allow |
| Cross-organization read | | | | | | | | | | allow |

Client member invoice access is denied on purpose. The owner is the billing contact.

A reviewer who is the submission author is denied even if their role would otherwise allow review.

Cross-organization reads by a super administrator write an audit event in the repository layer. The pure authorizer only answers whether the role may try.

## Negative cases covered by tests

- Client of organization A cannot read a project in organization B.
- Contributor cannot read another contributor's submission.
- Client owner cannot read internal notes.
- Reviewer cannot review their own submission.
- Engineer cannot approve earnings.
- Contributor cannot approve earnings.
- Suspended user cannot submit a task.
- Unverified user cannot submit a task.
