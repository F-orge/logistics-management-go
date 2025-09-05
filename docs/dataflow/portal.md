## Portal Data Flow Explanation

This document outlines the data flows for the client-facing Self-Service Portal.
The portal acts as a unified interface, aggregating data from various backend
systems and allowing clients to manage their logistics operations and account
information.

### User Authentication & Authorization Flow

This flow describes how a client user securely logs into the portal and how the
system determines what they are allowed to see and do.

```mermaid
graph TD
    subgraph "Login Process"
        Client[Client User] -- Enters Credentials --> LoginPage[Portal Login Page]
        LoginPage -- Sends Credentials to --> AuthBackend{Authentication Backend}
    end

    subgraph "Verification & Authorization"
        AuthBackend -- Verifies against --> PortalUsers[(portal_users)]
        AuthBackend -- On Success, Fetches --> UserRoles[(portal_user_roles)]
        UserRoles -- Links to --> Roles[(portal_roles)]
        Roles -- Links to --> RolePermissions[(portal_role_permissions)]
        RolePermissions -- Defines Access via --> Permissions[(portal_permissions)]
    end

    subgraph "Session & Access"
        AuthBackend -- Grants Access & Creates --> UserSession[User Session]
        UserSession -- Determines what is visible in --> PortalUI[Portal Interface]
        UserSession -- Is Logged in --> AuditLog[(portal_audit_log)]
    end
```

- **Login**: A **Client User** enters their credentials. The system verifies
  their identity against the `portal_users` table.
- **Authorization**: Upon successful login, the system checks the user's
  assigned **Roles** and the **Permissions** associated with those roles. This
  determines their access rights (e.g., view invoices, create shipments).
- **Session**: A secure session is created, and all actions taken by the user
  during this session are recorded in the **Audit Log** for security and
  compliance. The user interface is tailored to show only the features they have
  permission to access.

### Dashboard Data Aggregation Flow

This flow illustrates how the main portal dashboard acts as a central hub,
pulling in and displaying summary data from multiple, distinct backend domains.

```mermaid
graph TD
    subgraph "Backend Data Sources"
        IMS[Inventory Mgmt. System]
        TMS[Transportation Mgmt. System]
        Billing[Billing System]
    end

    subgraph "Portal Backend"
        PortalBE[Portal Backend] -- Requests Inventory Summary --> IMS
        PortalBE -- Requests In-Transit Status --> TMS
        PortalBE -- Requests Invoice Summary --> Billing
    end

    subgraph "Portal Frontend"
        Client[Client User] -- Views --> Dashboard[Portal Dashboard]
        Dashboard -- Displays Data From --> PortalBE
    end
```

- **Data Aggregation**: When the **Client User** logs in and views their
  dashboard, the **Portal Backend** makes real-time requests to the other
  microservices.
- **Data Sources**:
  - It fetches current inventory levels from the **Inventory Management System
    (IMS)**.
  - It gets the status of in-transit shipments from the **Transportation
    Management System (TMS)**.
  - It retrieves a summary of outstanding invoices from the **Billing System**.
- **Presentation**: This aggregated data is then presented to the user in a
  unified **Dashboard**, providing a complete, high-level overview of their
  account at a glance.

### Self-Service Action Flows

This flow shows how a client uses the portal to perform actions that trigger
processes in the underlying logistics systems. The portal acts as a
user-friendly gateway to the specialized backend domains.

```mermaid
graph TD
    subgraph "Client Actions in Portal"
        Client[Client User] -- Navigates to 'Inventory' --> CreateASN[Creates Inbound Shipment - ASN]
        Client -- Navigates to 'Shipments' --> TrackShipment[Tracks Shipments]
        Client -- Navigates to 'Billing' --> PayInvoice[Pays Invoice]
    end

    subgraph "Backend System Interactions"
        CreateASN -- Triggers Process in --> IMS[Inventory Mgmt. System]
        TrackShipment -- Reads Data from --> TMS[Transportation Mgmt. System]
        PayInvoice -- Triggers Process in --> Billing[Billing System]
    end
```

- **Inventory Management**: The client can navigate to an "Inventory" section to
  view detailed stock levels (reading data from the **IMS**) and can create a
  new Advance Shipping Notice (ASN), which initiates an inbound workflow within
  the **IMS**.
- **Shipment Tracking**: In the "Shipments" section, the client can view the
  real-time status and history of their shipments. This feature reads and
  displays data directly from the **TMS**.
- **Billing & Payments**: In the "Billing" section, the client can view their
  invoices and make payments. Clicking "Pay" initiates a payment workflow
  managed by the **Billing System**.

### User Settings & Profile Management Flow

This flow details how a user manages their personal settings and how those
preferences are stored and applied.

```mermaid
graph TD
    subgraph "User Action"
        Client[Client User] -- Navigates to --> SettingsPage[Profile & Settings Page]
        SettingsPage -- Modifies Preferences --> SaveChanges[Saves Changes]
    end

    subgraph "Backend Process"
        SaveChanges -- Sends Update Request to --> PortalBE{Portal Backend}
        PortalBE -- Validates & Persists Data in --> UserSettings[(portal_user_settings)]
        PortalBE -- Logs the change in --> AuditLog[(portal_audit_log)]
    end

    subgraph "Application of Settings"
        UserSettings -- Influences --> Notifications[Notification Delivery]
        UserSettings -- Customizes --> Dashboard[Dashboard Layout]
    end
```

- **Modification**: The **Client User** accesses their **Profile & Settings
  Page** to change preferences, such as their notification settings or dashboard
  layout.
- **Persistence**: When changes are saved, the **Portal Backend** updates the
  `portal_user_settings` table for that specific user. The action is recorded in
  the `portal_audit_log`.
- **Application**: These saved settings are then used by the system to customize
  the user's experience, for example, by determining which **Notifications** to
  send or how to arrange the **Dashboard**.

### Notification Flow

This flow shows how events from other systems trigger notifications that are
delivered to the user within the portal.

```mermaid
graph TD
    subgraph "Event Triggers from Backend Systems"
        TMS[TMS: Shipment Delivered] -- Sends Event --> EventBus{Event Bus / Message Queue}
        IMS[IMS: Stock Low] -- Sends Event --> EventBus
        Billing[Billing: Invoice Overdue] -- Sends Event --> EventBus
    end

    subgraph "Portal Notification Service"
        NotificationService[Notification Service] -- Listens for Events --> EventBus
        NotificationService -- Identifies Target User & Checks Prefs from --> UserSettings[(portal_user_settings)]
        NotificationService -- Creates Notification in --> PortalNotifications[(portal_notifications)]
    end

    subgraph "User Experience"
        Client[Client User] -- Sees Alert in --> PortalUI[Portal Interface]
        PortalUI -- Fetches and Displays --> PortalNotifications
        Client -- Clicks Notification --> RelevantPage[Navigates to Relevant Page]
    end
```

- **Event Trigger**: An important business event occurs in a backend system
  (e.g., a shipment is delivered in the **TMS**). The system publishes an event
  to a central **Event Bus**.
- **Processing**: A dedicated **Notification Service** within the portal's
  backend listens for these events. It identifies the relevant user, checks
  their preferences in `portal_user_settings` to see if they want this type of
  alert, and then creates a new record in the `portal_notifications` table.
- **Delivery**: The new notification appears in the **Portal UI**. The user can
  click on it to be taken directly to the relevant page for more details (e.g.,
  the delivered shipment's tracking page).

### Client-Side User & Role Management Flow

This flow describes how a designated client administrator manages user accounts
and their permissions for their own organization within the portal.

```mermaid
graph TD
    subgraph "Admin Actions"
        Admin[Client Administrator] -- Navigates to --> UserMgmtPage[User Management Dashboard]
        UserMgmtPage -- Invites --> InviteUser[Invites New User]
        UserMgmtPage -- Assigns/Changes Role --> AssignRole[Assigns Role to User]
        UserMgmtPage -- Deactivates --> DeactivateUser[Deactivates User]
    end

    subgraph "Backend Processing"
        InviteUser -- Creates --> CRMContact[(crm_contacts)]
        InviteUser -- Also Creates --> PortalUser[(portal_users)]
        InviteUser -- Sends --> InvitationEmail[Invitation Email]

        AssignRole -- Creates/Updates --> UserRoleLink[(portal_user_roles)]

        DeactivateUser -- Sets 'is_active=false' on --> PortalUser
    end

    subgraph "Security & Logging"
        Admin -- All Actions Logged in --> AuditLog[(portal_audit_log)]
    end
```

- **Initiation**: A **Client Administrator**, who has special permissions,
  accesses the **User Management Dashboard**.
- **User Invitation**: The admin can invite a new user by providing their email.
  The backend creates a corresponding record in `crm_contacts` (if one doesn't
  exist) and a new, inactive `portal_users` record. An **Invitation Email** is
  sent to the new user to set up their account.
- **Role Assignment**: The admin can assign or change roles for users within
  their organization. This action creates or updates records in the
  `portal_user_roles` table, linking a user to a specific role (e.g., "Billing
  Viewer").
- **Deactivation**: If an employee leaves, the admin can deactivate their
  account, which sets the `is_active` flag to `false` in the `portal_users`
  table, immediately revoking their access.
- **Auditing**: All administrative actions are logged in the `portal_audit_log`
  to maintain a clear record of who made what changes and when.
