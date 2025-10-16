import * as z from 'zod'
import type React from 'react'

export interface TableColumnRegistryConfig<T = any> {
  // Editing configuration
  editable?: boolean // make the column editable: default true
  
  // Type override (if undefined will use the current zod type)
  type?: 'string' | 'number' | 'boolean' | 'date' | 'select' | 'relation' | 'object' | 'array'
  
  // Display configuration
  label?: string // custom column header label
  placeholder?: string // input placeholder text
  width?: number | string // column width
  minWidth?: number // minimum column width
  maxWidth?: number // maximum column width
  hidden?: boolean // hide column
  
  // Column behavior
  sortable?: boolean // enable sorting (default: true)
  filterable?: boolean // enable filtering (default: true)
  resizable?: boolean // enable resizing (default: true)
  
  // Select type options (for select and relation types)
  options?: Array<{ value: T; label: string }> // for select type
  
  // Relation type options
  relationConfig?: {
    // Function to load related data by ID/value for display
    loadData: (value: T) => Promise<{ id: string | number; label: string } | null>
    
    // Search configuration
    searchable?: boolean // Enable search functionality (default: true)
    searchOptions: (searchTerm: string) => Promise<Array<{ value: T; label: string }>>
    
    // Search behavior
    minSearchLength?: number // Minimum characters before search triggers (default: 1)
    searchDelay?: number // Debounce delay in ms (default: 300)
    maxResults?: number // Maximum search results to show (default: 50)
    
    // Initial load (when no search term)
    loadInitialOptions?: () => Promise<Array<{ value: T; label: string }>>
    
    // Display configuration
    displayField?: string // Display field when showing the relation (default: 'label')
    valueField?: string // Value field for the relation (default: 'id' or 'value')
    
    // UI text
    loadingText?: string // Loading placeholder text (default: "Searching...")
    errorText?: string // Error text when search fails (default: "Search failed")
    noResultsText?: string // Text when no results found (default: "No results found")
    searchPlaceholder?: string // Search input placeholder (default: "Search...")
    
    // Cache configuration
    cacheResults?: boolean // Cache search results (default: true)
    cacheTimeout?: number // Cache timeout in ms (default: 5 minutes)
  }
  
  // Number type options
  format?: 'currency' | 'percentage' | 'decimal' // for number type
  precision?: number // decimal places for numbers
  
  // Date type options
  dateFormat?: string // date display format
  includeTime?: boolean // include time picker for dates
  
  // Boolean type options
  trueLabel?: string // label for true value (default: "Yes")
  falseLabel?: string // label for false value (default: "No")
  
  // Custom renderers
  renderCell?: (value: T, rowData: any, context: CellRenderContext) => React.ReactNode // custom cell display
  renderEditCell?: (props: EditCellProps<T>) => React.ReactNode // custom edit cell
  renderHeader?: (column: ColumnHeaderProps) => React.ReactNode // custom header
  
  // Formatting
  formatValue?: (value: T) => string // custom value formatter
  
  // Event handlers - now type-safe!
  onRowEdit?: (value: T) => Promise<T> | T // if editable is true and onBlur on the component happens
  onValidate?: (value: T) => boolean | string // custom validation, return true or error message
}

// Supporting types for custom renderers
export interface CellRenderContext {
  columnId: string
  rowId: string
  isEditing?: boolean
  isSelected?: boolean
  isHovered?: boolean
}

export interface EditCellProps<T> {
  value: T
  onChange: (newValue: T) => void
  onCommit: () => void
  onCancel: () => void
  rowData: any
  columnId: string
  rowId: string
  placeholder?: string
  disabled?: boolean
  autoFocus?: boolean
}

export interface ColumnHeaderProps {
  label: string
  columnId: string
  sortDirection?: 'asc' | 'desc' | null
  onSort?: (direction: 'asc' | 'desc' | null) => void
  isFilterable?: boolean
  onFilter?: (filterValue: any) => void
  isResizing?: boolean
}

export const DataTableRegistry = z.registry<TableColumnRegistryConfig>()