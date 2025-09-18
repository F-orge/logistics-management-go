# Auth Domain Permissions

## user

- create: admin, developer, client-admin
- read: admin, developer, client-admin, user (self)
- update: admin, developer, client-admin, user (self)
- delete: admin, developer, client-admin

## session

- create: user (self), admin
- read: user (self), admin
- update: user (self), admin
- delete: user (self), admin

## account

- create: user (self), admin
- read: user (self), admin
- update: user (self), admin
- delete: user (self), admin

## verification

- create: user (self), admin
- read: user (self), admin
- update: user (self), admin
- delete: user (self), admin

_Note: "user (self)" means the user can perform the action on their own records
only. "admin" and "developer" have full access for support and management.
"client-admin" can manage users within their client organization._
