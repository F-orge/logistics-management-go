You are an expert at creating data tables using the TanStack Table library. Your task is to generate the necessary components and code for a new data table, following the patterns and conventions established in the existing codebase.

**1. Analyze Existing Implementations:**

*   **File Structure:** Examine the directory structure for existing tables, typically found in `src/routes/dashboard/crm/{module}/-components/table.tsx`.
*   **Component Breakdown:**
    *   `index.tsx`: The main route component that fetches data, handles state management (search, pagination, filtering), and renders the `DataTable` component.
    *   `-components/table.tsx`: Defines the table columns using `ColumnDef` from `@tanstack/react-table`. It maps data fields to specific cell components.
    *   `-components/new.tsx`: A dialog component for creating new records, typically using `useAppForm` for form management.
    *   `-components/view.tsx`: A dialog component for displaying detailed information about a selected record.
    *   `components/table/cells/**`: Reusable cell components for different data types (e.g., `StringCell`, `DateCell`, `NumberCell`).

**2. Define Table Columns:**

*   In the `table.tsx` file, create an array of `ColumnDef` objects.
*   Each object represents a column and should have:
    *   `accessorKey`: The key of the data object to display in the column.
    *   `header`: The text to display in the column header.
    *   `cell`: A function that renders the cell content, typically using one of the reusable cell components from `src/components/table/cells/**`.

**3. Implement the Main Route Component:**

*   **Data Fetching:** Use `createFileRoute` to define the route and its loader. Fetch data using `context.queryClient.fetchQuery` and the appropriate query function.
*   **State Management:**
    *   Use `useSearch` and `useNavigate` from `@tanstack/react-router` to manage search parameters like pagination, sorting, and filtering.
    *   Use `useState` for local component state, such as the current search term.
*   **Render the `DataTable` Component:**
    *   Pass the fetched `data`, `columns`, and pagination handlers (`onNextPage`, `onPreviousPage`) to the `DataTable` component.
    *   Implement the context menu for row actions (View, Edit, Delete), using `ContextMenuItem` and navigating to the appropriate dialogs.

**4. Create Dialog Components:**

*   **New/Edit Dialog:**
    *   Use the `useAppForm` hook for form state management and validation.
    *   Use `useMutation` to handle the create or update operations.
    *   Render form fields using the `form.AppField` component and the appropriate field types (e.g., `TextField`, `NumberField`, `DateField`).
*   **View Dialog:**
    *   Fetch the selected record's data using `useLoaderData`.
    *   Display the data in a read-only format using the `Field` and `FieldDescription` components.
*   **Delete Dialog:**
    *   Use the `DeleteRecordDialog` component to confirm the deletion.
    *   Use `useMutation` to handle the delete operation.

**5. Utilize Reusable Cell Components:**

*   Browse the `src/components/table/cells` directory to find suitable components for each data type.
*   If a specific cell type is not available, create a new reusable component following the existing pattern. Each cell component should handle its own state for inline editing.

**Example Checklist:**

*   [ ] Create `src/routes/dashboard/crm/{new-module}/index.tsx`
*   [ ] Create `src/routes/dashboard/crm/{new-module}/-components/table.tsx`
*   [ ] Create `src/routes/dashboard/crm/{new-module}/-components/new.tsx`
*   [ ] Create `src/routes/dashboard/crm/{new-module}/-components/view.tsx`
*   [ ] Define `ColumnDef` in `table.tsx`
*   [ ] Implement data fetching and state management in `index.tsx`
*   [ ] Implement `New`, `View`, and `Delete` dialogs
*   [ ] Use appropriate cell components from `src/components/table/cells`
*   [ ] Add the new route to the navigation/sidebar if necessary

By following these steps and adhering to the existing patterns, you will create a consistent and maintainable data table that integrates seamlessly with the rest of the application.