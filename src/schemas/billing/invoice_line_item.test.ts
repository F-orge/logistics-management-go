import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import {
  billingInvoiceLineItemInsertSchema,
  billingInvoiceLineItemSchema,
  billingInvoiceLineItemUpdateSchema,
} from './invoice_line_item'

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

describe('BillingInvoiceLineItemSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          description: 'Consulting services for Q1 ' + 'a'.repeat(225),
          discountAmount: 1000000,
          discountRate: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174003',
          lineTotal: 10000000,
          quantity: 100000,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174004',
          sourceRecordType: 'Project-' + 'b'.repeat(56),
          taxAmount: 1000000,
          taxRate: 100,
          totalPrice: 10000000,
          unitPrice: 1000000,
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'description with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          description: 'D'.repeat(255),
          invoiceId: '123e4567-e89b-12d3-a456-426614174006',
          quantity: 1,
          unitPrice: 10.0,
        },
      },
      {
        name: 'discountAmount at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          description: 'Discounted Item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174008',
          quantity: 1,
          unitPrice: 100.0,
          discountAmount: 0,
        },
      },
      {
        name: 'discountAmount at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          description: 'Discounted Item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174010',
          quantity: 1,
          unitPrice: 100.0,
          discountAmount: 1000000,
        },
      },
      {
        name: 'discountRate at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          description: 'Discounted Item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174012',
          quantity: 1,
          unitPrice: 100.0,
          discountRate: 0,
        },
      },
      {
        name: 'discountRate at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174013',
          description: 'Discounted Item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174014',
          quantity: 1,
          unitPrice: 100.0,
          discountRate: 100,
        },
      },
      {
        name: 'lineTotal at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174015',
          description: 'Item with line total',
          invoiceId: '123e4567-e89b-12d3-a456-426614174016',
          quantity: 1,
          unitPrice: 0,
          lineTotal: 0,
        },
      },
      {
        name: 'lineTotal at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174017',
          description: 'Item with line total',
          invoiceId: '123e4567-e89b-12d3-a456-426614174018',
          quantity: 1,
          unitPrice: 1000000,
          lineTotal: 10000000,
        },
      },
      {
        name: 'quantity at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174019',
          description: 'Single item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174020',
          quantity: 1,
          unitPrice: 1.0,
        },
      },
      {
        name: 'quantity at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174021',
          description: 'Bulk items',
          invoiceId: '123e4567-e89b-12d3-a456-426614174022',
          quantity: 100000,
          unitPrice: 1.0,
        },
      },
      {
        name: 'sourceRecordType with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174023',
          description: 'Source record',
          invoiceId: '123e4567-e89b-12d3-a456-426614174024',
          quantity: 1,
          unitPrice: 1.0,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174025',
          sourceRecordType: 'S'.repeat(64),
        },
      },
      {
        name: 'taxAmount at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174026',
          description: 'Taxed item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174027',
          quantity: 1,
          unitPrice: 100.0,
          taxAmount: 0,
        },
      },
      {
        name: 'taxAmount at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174028',
          description: 'Taxed item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174029',
          quantity: 1,
          unitPrice: 100.0,
          taxAmount: 1000000,
        },
      },
      {
        name: 'taxRate at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174030',
          description: 'Taxed item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174031',
          quantity: 1,
          unitPrice: 100.0,
          taxRate: 0,
        },
      },
      {
        name: 'taxRate at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174032',
          description: 'Taxed item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174033',
          quantity: 1,
          unitPrice: 100.0,
          taxRate: 100,
        },
      },
      {
        name: 'totalPrice at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174034',
          description: 'Total price item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174035',
          quantity: 1,
          unitPrice: 0,
          totalPrice: 0,
        },
      },
      {
        name: 'totalPrice at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174036',
          description: 'Total price item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174037',
          quantity: 1,
          unitPrice: 1000000,
          totalPrice: 10000000,
        },
      },
      {
        name: 'unitPrice at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174038',
          description: 'Free item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174039',
          quantity: 1,
          unitPrice: 0,
        },
      },
      {
        name: 'unitPrice at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174040',
          description: 'Expensive item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174041',
          quantity: 1,
          unitPrice: 1000000,
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174042',
          description: 'Basic item',
          invoiceId: '123e4567-e89b-12d3-a456-426614174043',
          quantity: 1,
          unitPrice: 1.0,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingInvoiceLineItemSchema.parse(input)).not.toThrow()
      const result = billingInvoiceLineItemSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing description',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'description too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: '',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Description is required',
      },
      {
        name: 'description too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'D'.repeat(256),
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Description must be at most 255 characters',
      },
      {
        name: 'discountAmount less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          discountAmount: -0.01,
        },
        expectedError: 'Discount amount must be at least 0',
      },
      {
        name: 'discountAmount greater than 1,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          discountAmount: 1000000.01,
        },
        expectedError: 'Discount amount must be at most 1,000,000',
      },
      {
        name: 'discountRate less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          discountRate: -0.01,
        },
        expectedError: 'Discount rate must be at least 0',
      },
      {
        name: 'discountRate greater than 100',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          discountRate: 100.01,
        },
        expectedError: 'Discount rate must be at most 100',
      },
      {
        name: 'missing invoiceId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid invoiceId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: 'invalid-uuid',
          quantity: 1,
          unitPrice: 100.0,
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'lineTotal less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          lineTotal: -0.01,
        },
        expectedError: 'Line total must be at least 0',
      },
      {
        name: 'lineTotal greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          lineTotal: 10000000.01,
        },
        expectedError: 'Line total must be at most 10,000,000',
      },
      {
        name: 'missing quantity',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          unitPrice: 100.0,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'quantity less than 1',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 0,
          unitPrice: 100.0,
        },
        expectedError: 'Quantity must be at least 1',
      },
      {
        name: 'quantity greater than 100,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 100001,
          unitPrice: 100.0,
        },
        expectedError: 'Quantity must be at most 100,000',
      },
      {
        name: 'sourceRecordId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          sourceRecordId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'sourceRecordType too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          sourceRecordType: '',
        },
        expectedError: 'Source record type is required',
      },
      {
        name: 'sourceRecordType too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          sourceRecordType: 'S'.repeat(65),
        },
        expectedError: 'Source record type must be at most 64 characters',
      },
      {
        name: 'taxAmount less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          taxAmount: -0.01,
        },
        expectedError: 'Tax amount must be at least 0',
      },
      {
        name: 'taxAmount greater than 1,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          taxAmount: 1000000.01,
        },
        expectedError: 'Tax amount must be at most 1,000,000',
      },
      {
        name: 'taxRate less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          taxRate: -0.01,
        },
        expectedError: 'Tax rate must be at least 0',
      },
      {
        name: 'taxRate greater than 100',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          taxRate: 100.01,
        },
        expectedError: 'Tax rate must be at most 100',
      },
      {
        name: 'totalPrice less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          totalPrice: -0.01,
        },
        expectedError: 'Total price must be at least 0',
      },
      {
        name: 'totalPrice greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          totalPrice: 10000000.01,
        },
        expectedError: 'Total price must be at most 10,000,000',
      },
      {
        name: 'missing unitPrice',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'unitPrice less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: -0.01,
        },
        expectedError: 'Unit price must be at least 0',
      },
      {
        name: 'unitPrice greater than 1,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 1000000.01,
        },
        expectedError: 'Unit price must be at most 1,000,000',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          description: 'Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
          unitPrice: 100.0,
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        billingInvoiceLineItemSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0].message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for billingInvoiceLineItemSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        description: 'Service Fee',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        quantity: 1,
        unitPrice: 100.0,
      }
      const result = billingInvoiceLineItemSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        description: 'Service Fee',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        quantity: 1,
        unitPrice: 100.0,
      }
      const result = billingInvoiceLineItemSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingInvoiceLineItemInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          description: 'New Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
          unitPrice: 50.0,
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          description: 'New Consulting services for Q2 ' + 'c'.repeat(220),
          discountAmount: 500000,
          discountRate: 50,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          lineTotal: 5000000,
          quantity: 50000,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174002',
          sourceRecordType: 'NewProject-' + 'd'.repeat(52),
          taxAmount: 500000,
          taxRate: 50,
          totalPrice: 5000000,
          unitPrice: 500000,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingInvoiceLineItemInsertSchema.parse(input)).not.toThrow()
      const result = billingInvoiceLineItemInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing description',
        input: {
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
          unitPrice: 50.0,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing invoiceId',
        input: {
          description: 'New Service Fee',
          quantity: 1,
          unitPrice: 50.0,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing quantity',
        input: {
          description: 'New Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          unitPrice: 50.0,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing unitPrice',
        input: {
          description: 'New Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'quantity less than 1',
        input: {
          description: 'New Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 0,
          unitPrice: 50.0,
        },
        expectedError: 'Quantity must be at least 1',
      },
      {
        name: 'unitPrice less than 0',
        input: {
          description: 'New Service Fee',
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          quantity: 1,
          unitPrice: -0.01,
        },
        expectedError: 'Unit price must be at least 0',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        billingInvoiceLineItemInsertSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0].message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for billingInvoiceLineItemInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        description: 'New Service Fee',
        invoiceId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 1,
        unitPrice: 50.0,
      }
      const result = billingInvoiceLineItemInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        description: 'New Service Fee',
        invoiceId: '123e4567-e89b-12d3-a456-426614174000',
        quantity: 0, // Invalid quantity
        unitPrice: 50.0,
      }
      const result = billingInvoiceLineItemInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingInvoiceLineItemUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only description',
        input: {
          description: 'Updated Service Fee',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          description: 'Updated Consulting services for Q3 ' + 'e'.repeat(215),
          discountAmount: 750000,
          discountRate: 75,
          lineTotal: 7500000,
          quantity: 75000,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174003',
          sourceRecordType: 'UpdatedProject-' + 'f'.repeat(48),
          taxAmount: 750000,
          taxRate: 75,
          totalPrice: 7500000,
          unitPrice: 750000,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingInvoiceLineItemUpdateSchema.parse(input)).not.toThrow()
      const result = billingInvoiceLineItemUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'description too long',
        input: {
          description: 'D'.repeat(256),
        },
        expectedError: 'Description must be at most 255 characters',
      },
      {
        name: 'discountAmount greater than 1,000,000',
        input: {
          discountAmount: 1000000.01,
        },
        expectedError: 'Discount amount must be at most 1,000,000',
      },
      {
        name: 'discountRate greater than 100',
        input: {
          discountRate: 100.01,
        },
        expectedError: 'Discount rate must be at most 100',
      },
      {
        name: 'lineTotal greater than 10,000,000',
        input: {
          lineTotal: 10000000.01,
        },
        expectedError: 'Line total must be at most 10,000,000',
      },
      {
        name: 'quantity greater than 100,000',
        input: {
          quantity: 100001,
        },
        expectedError: 'Quantity must be at most 100,000',
      },
      {
        name: 'sourceRecordType too long',
        input: {
          sourceRecordType: 'S'.repeat(65),
        },
        expectedError: 'Source record type must be at most 64 characters',
      },
      {
        name: 'taxAmount greater than 1,000,000',
        input: {
          taxAmount: 1000000.01,
        },
        expectedError: 'Tax amount must be at most 1,000,000',
      },
      {
        name: 'taxRate greater than 100',
        input: {
          taxRate: 100.01,
        },
        expectedError: 'Tax rate must be at most 100',
      },
      {
        name: 'totalPrice greater than 10,000,000',
        input: {
          totalPrice: 10000000.01,
        },
        expectedError: 'Total price must be at most 10,000,000',
      },
      {
        name: 'unitPrice greater than 1,000,000',
        input: {
          unitPrice: 1000000.01,
        },
        expectedError: 'Unit price must be at most 1,000,000',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        billingInvoiceLineItemUpdateSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0].message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for billingInvoiceLineItemUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        description: 'Updated Service Fee',
      }
      const result = billingInvoiceLineItemUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        quantity: 0, // Invalid quantity
      }
      const result = billingInvoiceLineItemUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
