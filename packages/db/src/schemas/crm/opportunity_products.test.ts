import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { OpportunityProductSchema } from './opportunity_products'

describe('CrmOpportunityProductSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          opportunityId: '123e4567-e89b-12d3-a456-426614174004',
          productId: '123e4567-e89b-12d3-a456-426614174005',
          quantity: 10000,
        },
      },
      {
        name: 'quantity at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          opportunityId: '123e4567-e89b-12d3-a456-426614174007',
          productId: '123e4567-e89b-12d3-a456-426614174008',
          quantity: 1,
        },
      },
      {
        name: 'quantity at maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          opportunityId: '123e4567-e89b-12d3-a456-426614174010',
          productId: '123e4567-e89b-12d3-a456-426614174011',
          quantity: 10000,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => OpportunityProductSchema.parse(input)).not.toThrow()
      const result = OpportunityProductSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing opportunityId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for opportunity ID',
      },
      {
        name: 'invalid opportunityId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: 'invalid-uuid',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for opportunity ID',
      },
      {
        name: 'missing productId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for product ID',
      },
      {
        name: 'invalid productId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: 'invalid-uuid',
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for product ID',
      },
      {
        name: 'missing quantity',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Quantity must be a number',
      },
      {
        name: 'quantity wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 'one',
        },
        expectedError: 'Quantity must be a number',
      },
      {
        name: 'quantity not an integer',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1.5,
        },
        expectedError: 'Quantity must be an integer',
      },
      {
        name: 'quantity below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 0,
        },
        expectedError: 'Quantity must be at least 1',
      },
      {
        name: 'quantity above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 10001,
        },
        expectedError: 'Quantity must be at most 10,000',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          opportunityId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
          extraField: 'someValue',
        },
        expectedError: 'Unrecognized key: "extraField"',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        OpportunityProductSchema.parse(input)
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

  describe('SafeParse Tests for OpportunityProductSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        opportunityId: '123e4567-e89b-12d3-a456-426614174001',
        productId: '123e4567-e89b-12d3-a456-426614174002',
        quantity: 5,
      }
      const result = OpportunityProductSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        opportunityId: '123e4567-e89b-12d3-a456-426614174001',
        productId: '123e4567-e89b-12d3-a456-426614174002',
        quantity: 5,
      }
      const result = OpportunityProductSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
