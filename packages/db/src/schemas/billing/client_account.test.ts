import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import {
  ClientAccountInsertSchema,
  ClientAccountSchema,
  ClientAccountUpdateSchema,
} from './client_account'

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

describe('BillingClientAccountSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          availableCredit: 10000000,
          clientId: '123e4567-e89b-12d3-a456-426614174003',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          creditLimit: 10000000,
          currency: 'USD',
          isCreditApproved: true,
          lastPaymentDate: new Date('2023-01-01T09:00:00Z'),
          paymentTermsDays: 365,
          updatedAt: new Date('2023-01-01T11:00:00Z'),
          walletBalance: 10000000,
        },
      },
      {
        name: 'availableCredit at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          clientId: '123e4567-e89b-12d3-a456-426614174005',
          availableCredit: 0,
        },
      },
      {
        name: 'availableCredit at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          clientId: '123e4567-e89b-12d3-a456-426614174007',
          availableCredit: 10000000,
        },
      },
      {
        name: 'creditLimit at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          clientId: '123e4567-e89b-12d3-a456-426614174009',
          creditLimit: 0,
        },
      },
      {
        name: 'creditLimit at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          clientId: '123e4567-e89b-12d3-a456-426614174011',
          creditLimit: 10000000,
        },
      },
      {
        name: 'currency with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174012',
          clientId: '123e4567-e89b-12d3-a456-426614174013',
          currency: 'C'.repeat(8),
        },
      },
      {
        name: 'paymentTermsDays at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174014',
          clientId: '123e4567-e89b-12d3-a456-426614174015',
          paymentTermsDays: 0,
        },
      },
      {
        name: 'paymentTermsDays at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174016',
          clientId: '123e4567-e89b-12d3-a456-426614174017',
          paymentTermsDays: 365,
        },
      },
      {
        name: 'walletBalance at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174018',
          clientId: '123e4567-e89b-12d3-a456-426614174019',
          walletBalance: 0,
        },
      },
      {
        name: 'walletBalance at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174020',
          clientId: '123e4567-e89b-12d3-a456-426614174021',
          walletBalance: 10000000,
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174022',
          clientId: '123e4567-e89b-12d3-a456-426614174023',
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => ClientAccountSchema.parse(input)).not.toThrow()
      const result = ClientAccountSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          clientId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'availableCredit less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          availableCredit: -0.01,
        },
        expectedError: 'Available credit must be at least 0',
      },
      {
        name: 'availableCredit greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          availableCredit: 10000000.01,
        },
        expectedError: 'Available credit must be at most 10,000,000',
      },
      {
        name: 'availableCredit wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          availableCredit: 'abc',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing clientId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid clientId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'creditLimit less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          creditLimit: -0.01,
        },
        expectedError: 'Credit limit must be at least 0',
      },
      {
        name: 'creditLimit greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          creditLimit: 10000000.01,
        },
        expectedError: 'Credit limit must be at most 10,000,000',
      },
      {
        name: 'currency too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          currency: '',
        },
        expectedError: 'Currency is required',
      },
      {
        name: 'currency too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          currency: 'C'.repeat(9),
        },
        expectedError: 'Currency must be at most 8 characters',
      },
      {
        name: 'isCreditApproved wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          isCreditApproved: 'true',
        },
        expectedError: 'Invalid input: expected boolean, received string',
      },
      {
        name: 'lastPaymentDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          lastPaymentDate: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'paymentTermsDays less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          paymentTermsDays: -1,
        },
        expectedError: 'Payment terms days must be at least 0',
      },
      {
        name: 'paymentTermsDays greater than 365',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          paymentTermsDays: 366,
        },
        expectedError: 'Payment terms days must be at most 365',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'walletBalance less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          walletBalance: -0.01,
        },
        expectedError: 'Wallet balance must be at least 0',
      },
      {
        name: 'walletBalance greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          walletBalance: 10000000.01,
        },
        expectedError: 'Wallet balance must be at most 10,000,000',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        ClientAccountSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for ClientAccountSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        clientId: '123e4567-e89b-12d3-a456-426614174001',
      }
      const result = ClientAccountSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        clientId: '123e4567-e89b-12d3-a456-426614174001',
      }
      const result = ClientAccountSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingClientAccountInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          clientId: '123e4567-e89b-12d3-a456-426614174000',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          availableCredit: 10000000,
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          creditLimit: 10000000,
          currency: 'EUR',
          isCreditApproved: false,
          lastPaymentDate: new Date('2023-01-02T09:00:00Z'),
          paymentTermsDays: 30,
          walletBalance: 5000000,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => ClientAccountInsertSchema.parse(input)).not.toThrow()
      const result = ClientAccountInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing clientId',
        input: {},
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'availableCredit less than 0',
        input: {
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          availableCredit: -1,
        },
        expectedError: 'Available credit must be at least 0',
      },
      {
        name: 'currency too long',
        input: {
          clientId: '123e4567-e89b-12d3-a456-426614174001',
          currency: 'C'.repeat(9),
        },
        expectedError: 'Currency must be at most 8 characters',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        ClientAccountInsertSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for ClientAccountInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        clientId: '123e4567-e89b-12d3-a456-426614174000',
      }
      const result = ClientAccountInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        clientId: '123e4567-e89b-12d3-a456-426614174001',
        availableCredit: -1,
      }
      const result = ClientAccountInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingClientAccountUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only availableCredit',
        input: {
          availableCredit: 5000000,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          availableCredit: 10000000,
          creditLimit: 10000000,
          currency: 'GBP',
          isCreditApproved: true,
          lastPaymentDate: new Date('2023-01-03T09:00:00Z'),
          paymentTermsDays: 60,
          walletBalance: 7000000,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => ClientAccountUpdateSchema.parse(input)).not.toThrow()
      const result = ClientAccountUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'availableCredit less than 0',
        input: {
          availableCredit: -1,
        },
        expectedError: 'Available credit must be at least 0',
      },
      {
        name: 'creditLimit greater than 10,000,000',
        input: {
          creditLimit: 10000000.01,
        },
        expectedError: 'Credit limit must be at most 10,000,000',
      },
      {
        name: 'currency too short',
        input: {
          currency: '',
        },
        expectedError: 'Currency is required',
      },
      {
        name: 'paymentTermsDays greater than 365',
        input: {
          paymentTermsDays: 366,
        },
        expectedError: 'Payment terms days must be at most 365',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        ClientAccountUpdateSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for ClientAccountUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        availableCredit: 100.5,
      }
      const result = ClientAccountUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        availableCredit: -1,
      }
      const result = ClientAccountUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
