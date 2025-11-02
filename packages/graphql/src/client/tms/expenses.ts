import { graphql } from "../generated/gql";

export const CreateExpenseMutation = graphql(`
  mutation CreateExpense($expense: CreateExpenseInput!) {
    tms {
      createExpense(value: $expense) {
        id
        type
        amount
        currency
        status
        description
        expenseDate
        receiptUrl
        fuelQuantity
        odometerReading
        driver {
          id
          user {
            id
            name
          }
        }
        trip {
          id
          status
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export const UpdateExpenseMutation = graphql(`
  mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {
    tms {
      updateExpense(id: $id, value: $expense) {
        id
        type
        amount
        currency
        status
        description
        expenseDate
        receiptUrl
        fuelQuantity
        odometerReading
        driver {
          id
          user {
            id
            name
          }
        }
        trip {
          id
          status
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export const RemoveExpenseMutation = graphql(`
  mutation RemoveExpense($id: ID!) {
    tms {
      removeExpense(id: $id) {
        success
        numDeletedRows
      }
    }
  }
`);

export const TableExpenseQuery = graphql(`
  query TableExpense(
    $page: Int
    $perPage: Int
    $search: String
    $status: ExpenseStatus
    $type: ExpenseType
    $currency: Currency
  ) {
    tms {
      expenses(
        page: $page
        perPage: $perPage
        search: $search
        status: $status
        type: $type
        currency: $currency
      ) {
        amount
        createdAt
        currency
        description
        driver {
          user {
            email
            id
            image
            name
          }
          licenseNumber
          contactPhone
          status
        }
        expenseDate
        fuelQuantity
        id
        odometerReading
        receiptUrl
        status
        type
        updatedAt
        trip {
          createdAt
          endLocation
          startLocation
          status
          startTime
          endTime
          vehicle {
            vin
            year
            model
            make
            id
            registrationNumber
          }
        }
      }
    }
  }
`);

export const SearchExpensesQuery = graphql(`
  query SearchExpenses($search: String!) {
    tms {
      expenses(search: $search, page: 1, perPage: 10) {
        value: id
        label: description
      }
    }
  }
`);

export const AnalyticsExpensesQuery = graphql(`
  query AnalyticsExpenses($from: Date, $to: Date) {
    tms {
      expenses(from: $from, to: $to) {
        amount
        type
        status
      }
    }
  }
`);
