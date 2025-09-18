# CRM Domain Permissions

## companies

- create: admin, sales manager, sales rep
- read: admin, sales manager, sales rep, account manager, customer support agent
- update: admin, sales manager, sales rep (owner)
- delete: admin, sales manager

## contacts

- create: admin, sales manager, sales rep
- read: admin, sales manager, sales rep, account manager, customer support agent
- update: admin, sales manager, sales rep (owner)
- delete: admin, sales manager

## interactions

- create: sales rep, customer support agent
- read: admin, sales manager, sales rep, customer support agent
- update: sales rep (owner), customer support agent (owner)
- delete: admin, sales manager

## campaigns

- create: admin, marketing manager
- read: admin, marketing manager, sales manager
- update: admin, marketing manager
- delete: admin, marketing manager

## leads

- create: admin, sales manager, SDR
- read: admin, sales manager, sales rep, SDR, marketing manager
- update: admin, sales manager, SDR (owner)
- delete: admin, sales manager

## opportunities

- create: admin, sales manager, sales rep
- read: admin, sales manager, sales rep, account manager
- update: admin, sales manager, sales rep (owner)
- delete: admin, sales manager

## products

- create: admin, sales manager
- read: admin, sales manager, sales rep
- update: admin, sales manager
- delete: admin, sales manager

## opportunity_products

- create: admin, sales manager, sales rep
- read: admin, sales manager, sales rep
- update: admin, sales manager, sales rep
- delete: admin, sales manager, sales rep

## cases

- create: customer support agent, sales rep
- read: admin, customer support agent, sales rep, sales manager
- update: customer support agent (owner), sales rep (owner)
- delete: admin, customer support agent

## invoices

- create: admin, account manager
- read: admin, account manager, sales manager
- update: admin, account manager
- delete: admin, account manager

## invoice_items

- create: admin, account manager
- read: admin, account manager
- update: admin, account manager
- delete: admin, account manager

## notifications

- create: system, admin
- read: user (self), admin
- update: user (self), admin
- delete: user (self), admin

## attachments

- create: admin, sales rep, customer support agent
- read: admin, sales rep, customer support agent, account manager
- update: admin, sales rep (owner), customer support agent (owner)
- delete: admin, sales rep (owner), customer support agent (owner)

## tags

- create: admin, sales manager
- read: admin, sales manager, sales rep
- update: admin, sales manager
- delete: admin, sales manager

## taggings

- create: admin, sales manager, sales rep
- read: admin, sales manager, sales rep
- update: admin, sales manager, sales rep
- delete: admin, sales manager, sales rep

_Note: "(owner)" means the user can perform the action on records they own.
"system" refers to automated system actions (e.g., notifications)._
