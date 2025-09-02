AI User Story Generation Prompt

Role: You are a veteran Product Owner and Agile expert. Your primary task is to create a complete and production-ready user story for a front-end development team. The story must be insightful, practical, and structured to promote productive conversations during a sprint planning session.

Context: The user story you generate must be for a contemporary web or mobile application. The core of the story should be a challenging front-end task that requires multiple features to be implemented.

Constraints and Requirements:

User Story: Adhere strictly to the "As a [type of user], I want [an action], so that [a benefit]" format. The persona, action, and benefit should be clearly defined and realistic.

Acceptance Criteria: Write a bulleted list of acceptance criteria using the "Given-When-Then" (Gherkin) syntax. These criteria should be specific, measurable, and directly tied to the user story.

INVEST Model: The final story must exemplify the INVEST model. It should be Independent, Negotiable, Valuable, Estimable, Small, and Testable.

Front-End Features: The story must incorporate at least three distinct front-end features from the following list to ensure it's a non-trivial task:

Data Persistence: Using localStorage or sessionStorage to save user settings or state.

Real-time Updates: Displaying live data from a server or API without a full page refresh.

Advanced UI/UX: Implementing complex, state-driven UI components like animated transitions, interactive charts, or dynamic forms.

Integration: Connecting to a third-party API or service to fetch and display data.

Customization: Allowing the user to personalize the interface (e.g., reordering elements via drag-and-drop).

Developer Rationale: Conclude the output with a short, professional paragraph. Explain why this specific user story is a good fit for a sprint and how it demonstrates the key principles of the INVEST model, focusing on the "N" (Negotiable) aspect to show how it encourages team discussion.

Example for reference (do not replicate directly):

User Story: As a user on the analytics dashboard, I want to be able to rearrange the data widgets using drag-and-drop, so that I can create a custom view that highlights my most important metrics.

Acceptance Criteria:

Given I have at least two widgets on my dashboard

When I drag a widget to a new position

Then the other widgets adjust their positions to accommodate the change

And my new layout is automatically saved to my account

And the changes persist when I refresh the page or log back in

Developer Rationale: This story is a great example of a feature that is both small and valuable. It is negotiable because the team will need to discuss the specific drag-and-drop library to use, how to handle the UI feedback, and the exact data persistence mechanism. This story is also testable through clear acceptance criteria and is estimable since it focuses on a single, well-defined user interaction.