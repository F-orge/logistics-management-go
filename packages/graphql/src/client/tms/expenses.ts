import { graphql } from "../generated/gql";

export const CreateExpenseMutation = graphql(`
  mutation CreateExpense($expense: CreateExpenseInput!) {
    tms {
      createExpense(value: $expense) {
        id
      }
    }
  }
`);

export const UpdateExpenseMutation = graphql(`
  mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {
    tms {
      updateExpense(id: $id, value: $expense) {
        id
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
