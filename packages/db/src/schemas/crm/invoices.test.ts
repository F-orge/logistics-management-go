import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { CrmInvoiceStatus, CrmPaymentMethod } from '../../db.types'
import { InvoiceSchema } from './invoices'

describe('CrmInvoiceSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          issueDate: new Date('2023-01-01T10:00:00Z'),
          dueDate: new Date('2023-01-31T10:00:00Z'),
          paidAt: new Date('2023-01-15T10:00:00Z'),
          sentAt: new Date('2023-01-02T10:00:00Z'),
          opportunityId: '123e4567-e89b-12d3-a456-426614174002',
          paymentMethod: CrmPaymentMethod.CreditCard,
          status: CrmInvoiceStatus.Paid,
          total: 150.75,
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
        },
      },
      {
        name: 'different invoice status (Draft)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          status: CrmInvoiceStatus.Draft,
        },
      },
      {
        name: 'different payment method (BankTransfer)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          paymentMethod: CrmPaymentMethod.BankTransfer,
        },
      },
      {
        name: 'total as integer',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          total: 200,
        },
      },
      {
        name: 'total as string number',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          total: 250.5, // Expect number after coercion
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InvoiceSchema.parse(input)).not.toThrow()
      const result = InvoiceSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {},
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'issueDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          issueDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for issue date',
      },
      {
        name: 'dueDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          dueDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for due date',
      },
      {
        name: 'paidAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          paidAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for paid at date',
      },
      {
        name: 'sentAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          sentAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for sent at date',
      },
      {
        name: 'opportunityId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for opportunity ID',
      },
      {
        name: 'invalid payment method',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: 'invalid-method',
        },
        expectedError: 'Invalid payment method',
      },
      {
        name: 'invalid invoice status',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          status: 'invalid-status',
        },
        expectedError: 'Invalid invoice status',
      },
      {
        name: 'total wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          total: 'not-a-number',
        },
        expectedError: 'Total must be a number',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          extraField: 'someValue',
        },
        expectedError: 'Unrecognized key: "extraField"',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        InvoiceSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeDefined()
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues.some((issue) => issue.message.includes(expectedError))).toBe(true)
    })
  })

  describe('SafeParse Tests for InvoiceSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        status: CrmInvoiceStatus.Sent,
      }
      const result = InvoiceSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
      }
      const result = InvoiceSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
