# AI Instruction Guidelines for Creating Mermaid Diagrams and Domain Explanations

This document provides guidelines for generating mermaid diagrams and accompanying domain explanations. These instructions were derived by analyzing the CRM diagram in `docs/diagrams/crm.md` and relevant discussions. Follow these guidelines to ensure consistency and completeness when creating similar documentation.

## 1. Mermaid Diagram Creation

- **Structure**: Start with a mermaid code block containing an `erDiagram` declaration. Each entity should be declared with a block listing its fields. For example:
  
  ```mermaid
  erDiagram
      users {
          string id PK
          string name
          string email
          // ...other fields...
      }
  ```

- **Field Annotations**: For clarity, annotate fields as needed (e.g., `FK`, comments). Do not modify the key structural fields (`id`, `created_at`, `updated_at`) unless specified.

## 2. Domain Explanation Guidelines

- **Overview**: Provide an overall explanation of what the domain is about. Include:
  - A description of the domain's purpose (e.g., managing customer relationships, tracking interactions, and streamlining sales activity).
  - How this domain fits within the broader logistics management system (e.g., integration with invoicing, lead conversion, support case management).
  - An explanation of the actors (e.g., sales managers, marketing managers, support agents, account managers, sales development representatives, administrators) involved in the domain.

- **Entity and Field Descriptions**: For each entity in the mermaid diagram, provide a detailed explanation:
  - Start with the entity name as a level-3 markdown header (`### EntityName`).
  - Add a brief, one-sentence description of the entity's purpose and role within the domain.
  - Below the description, provide a bulleted list explaining each meaningful field.
  - Exclude redundant fields like `id`, `created_at`, and `updated_at` to focus on the core data.
  - Example for the `users` entity:
    ### Users
    Represents system users, including sales reps, managers, and support agents, who interact with the CRM.
    - `name`: Full name of the user.
    - `email`: Email address for communication.
    - `phone_number`: Contact number.
    - `status`: Indicates if the user's account is active or inactive.
    - `last_login_at`: Timestamp of the last login.
    - `role_id`: References the user's role within the system.
    - `manager_id`: Self-referencing field to indicate the user's manager.

- **Linking Domains**: If the domain explanation references another domain, add a markdown link to that domain's documentation file for easy navigation (e.g., `[CRM](./crm.md)`).

## 3. Referencing User Stories

- **User Stories Integration**: Use the stories documented in `docs/stories/crm.md` to inform the explanation. This ensures that the domain explanation reflects realistic user scenarios such as:
  - Interactive Sales Pipeline Dashboard
  - Marketing Campaign Performance
  - Customer Support Case Management
  - Invoice Generation, Lead Capture, and Conversion
  - Role-Based Access Control
  - Advanced Data Filtering and Reporting

- **Actionable Details**: Highlight how each user story influences the design of entities and interactions, e.g., how the interactive sales dashboard may rely on real-time updates from the `opportunities` entity.

## 4. Formatting and Consistency

- **Markdown and Code Blocks**: Clearly separate the mermaid code block from the explanatory text. Use markdown headings to organize the content (e.g., `## CRM Domain Explanation`).

- **Conciseness**: Avoid repeating existing code unnecessarily in explanations. Use ellipses (`...existing code...`) to denote unchanged parts if referencing previous patterns.

- **Clarity**: Ensure that every explanation is clear, concise, and directly answers key questions such as:
  - What is the domain all about?
  - How does it relate to the overall logistics management system?
  - Who are the primary actors using this domain?

By adhering to these guidelines, the generated diagrams and explanations will be consistent, comprehensive, and aligned with user requirements as seen in `docs/diagrams/crm.md` and the associated user stories.