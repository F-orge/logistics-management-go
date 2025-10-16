import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { BillingTransactionTypeEnum } from '../../db.types'
import {
  AccountTransactionInsertSchema,
  AccountTransactionSchema,
  AccountTransactionUpdateSchema,
} from './account_transaction'

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

describe('BillingAccountTransactionSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100.5,
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          amount: 10000000,
          clientAccountId: 'client-456',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          description: 'Complete transaction description ' + 'a'.repeat(991),
          processedByUserId: 'user-789',
          referenceNumber: 'REF-001-' + 'b'.repeat(55),
          runningBalance: 99999999,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174002',
          sourceRecordType: 'invoice-' + 'c'.repeat(56),
          transactionDate: new Date('2023-01-01T09:00:00Z'),
          type: BillingTransactionTypeEnum.Debit,
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'amount at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          amount: 0,
          clientAccountId: 'client-min-amount',
          type: BillingTransactionTypeEnum.Fee,
        },
      },
      {
        name: 'amount at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          amount: 10000000,
          clientAccountId: 'client-max-amount',
          type: BillingTransactionTypeEnum.Adjustment,
        },
      },
      {
        name: 'clientAccountId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          amount: 500,
          clientAccountId: 'C'.repeat(255),
          type: BillingTransactionTypeEnum.Refund,
        },
      },
      {
        name: 'description with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          amount: 500,
          clientAccountId: 'client-desc-max',
          description: 'D'.repeat(1024),
          type: BillingTransactionTypeEnum.TopUp,
        },
      },
      {
        name: 'processedByUserId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          amount: 500,
          clientAccountId: 'client-proc-user-max',
          processedByUserId: 'P'.repeat(255),
          type: BillingTransactionTypeEnum.Credit,
        },
      },
      {
        name: 'referenceNumber with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          amount: 500,
          clientAccountId: 'client-ref-num-max',
          referenceNumber: 'R'.repeat(64),
          type: BillingTransactionTypeEnum.Debit,
        },
      },
      {
        name: 'runningBalance at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          amount: 500,
          clientAccountId: 'client-min-rb',
          runningBalance: 0,
          type: BillingTransactionTypeEnum.Fee,
        },
      },
      {
        name: 'runningBalance at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          amount: 500,
          clientAccountId: 'client-max-rb',
          runningBalance: 100000000,
          type: BillingTransactionTypeEnum.Adjustment,
        },
      },
      {
        name: 'sourceRecordType with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          amount: 500,
          clientAccountId: 'client-srt-max',
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174012',
          sourceRecordType: 'S'.repeat(64),
          type: BillingTransactionTypeEnum.Refund,
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174013',
          amount: 1.0,
          clientAccountId: 'client-no-optionals',
          type: BillingTransactionTypeEnum.TopUp,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => AccountTransactionSchema.parse(input)).not.toThrow()
      const result = AccountTransactionSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          amount: 100,
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          amount: 100,
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing amount',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'amount less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: -0.01,
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'amount greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10000000.01,
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Amount must be at most 10,000,000',
      },
      {
        name: 'amount wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 'abc',
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing clientAccountId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'clientAccountId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: '',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Client account ID is required',
      },
      {
        name: 'clientAccountId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'C'.repeat(256),
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Client account ID must be at most 255 characters',
      },
      {
        name: 'clientAccountId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 123,
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected string, received number',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          createdAt: 'not-a-date',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'description too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          description: '',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Description is required',
      },
      {
        name: 'description too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          description: 'D'.repeat(1025),
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'processedByUserId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          processedByUserId: '',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Processed by user ID is required',
      },
      {
        name: 'processedByUserId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          processedByUserId: 'P'.repeat(256),
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Processed by user ID must be at most 255 characters',
      },
      {
        name: 'referenceNumber too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          referenceNumber: '',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Reference number is required',
      },
      {
        name: 'referenceNumber too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          referenceNumber: 'R'.repeat(65),
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Reference number must be at most 64 characters',
      },
      {
        name: 'runningBalance less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          runningBalance: -0.01,
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Running balance must be at least 0',
      },
      {
        name: 'runningBalance greater than 100,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          runningBalance: 100000000.01,
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Running balance must be at most 100,000,000',
      },
      {
        name: 'sourceRecordId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          sourceRecordId: 'invalid-uuid',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'sourceRecordType too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          sourceRecordType: '',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Source record type is required',
      },
      {
        name: 'sourceRecordType too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          sourceRecordType: 'S'.repeat(65),
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Source record type must be at most 64 characters',
      },
      {
        name: 'transactionDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          transactionDate: 'not-a-date',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'missing type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
        },
        expectedError:
          'Invalid option: expected one of "adjustment"|"credit"|"debit"|"fee"|"refund"|"top-up"',
      },
      {
        name: 'invalid type enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          clientAccountId: 'client-123',
          updatedAt: 'not-a-date',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        AccountTransactionSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for AccountTransactionSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: 100.5,
        clientAccountId: 'client-123',
        type: BillingTransactionTypeEnum.Credit,
      }
      const result = AccountTransactionSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        amount: 100,
        clientAccountId: 'client-123',
        type: BillingTransactionTypeEnum.Credit,
      }
      const result = AccountTransactionSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingAccountTransactionInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          amount: 100.5,
          clientAccountId: 'client-insert-123',
          type: BillingTransactionTypeEnum.Credit,
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          amount: 10000000,
          clientAccountId: 'client-insert-456',
          description: 'Insert transaction description ' + 'a'.repeat(991),
          processedByUserId: 'user-insert-789',
          referenceNumber: 'REF-INS-001-' + 'b'.repeat(52),
          runningBalance: 99999999,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174000',
          sourceRecordType: 'invoice-insert-' + 'c'.repeat(48),
          transactionDate: new Date('2023-01-01T09:00:00Z'),
          type: BillingTransactionTypeEnum.Debit,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => AccountTransactionInsertSchema.parse(input)).not.toThrow()
      const result = AccountTransactionInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing amount',
        input: {
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'amount less than 0',
        input: {
          amount: -0.01,
          clientAccountId: 'client-123',
          type: BillingTransactionTypeEnum.Credit,
        },
        expectedError: 'Amount must be at least 0',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        AccountTransactionInsertSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for AccountTransactionInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        amount: 100.5,
        clientAccountId: 'client-insert-123',
        type: BillingTransactionTypeEnum.Credit,
      }
      const result = AccountTransactionInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        amount: -1, // Invalid amount
        clientAccountId: 'client-123',
        type: BillingTransactionTypeEnum.Credit,
      }
      const result = AccountTransactionInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingAccountTransactionUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only amount',
        input: {
          amount: 200.75,
        },
      },
      {
        name: 'partial update: only description',
        input: {
          description: 'Updated description',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          amount: 5000000,
          clientAccountId: 'client-update-789',
          description: 'Updated transaction description ' + 'd'.repeat(991),
          processedByUserId: 'user-update-101',
          referenceNumber: 'REF-UPD-002-' + 'e'.repeat(52),
          runningBalance: 50000000,
          sourceRecordId: '123e4567-e89b-12d3-a456-426614174003',
          sourceRecordType: 'payment-update-' + 'f'.repeat(48),
          transactionDate: new Date('2023-01-02T12:00:00Z'),
          type: BillingTransactionTypeEnum.Refund,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => AccountTransactionUpdateSchema.parse(input)).not.toThrow()
      const result = AccountTransactionUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'amount less than 0',
        input: {
          amount: -1,
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'clientAccountId too long',
        input: {
          clientAccountId: 'C'.repeat(256),
        },
        expectedError: 'Client account ID must be at most 255 characters',
      },
      {
        name: 'invalid type enum value',
        input: {
          type: 'invalid-type-update',
        },
        expectedError:
          'Invalid option: expected one of "adjustment"|"credit"|"debit"|"fee"|"refund"|"top-up"',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        AccountTransactionUpdateSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for AccountTransactionUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        amount: 100.5,
      }
      const result = AccountTransactionUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        amount: -1, // Invalid amount
      }
      const result = AccountTransactionUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
