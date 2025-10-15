import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { BillingSurchargeCalculationMethodEnum } from '@/db.types'
import { SurchargeInsertSchema, SurchargeSchema, SurchargeUpdateSchema } from './surcharge'

const UUID_REGEX = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/

describe('BillingSurchargeSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          amount: 25.75,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Percentage,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          description: 'Seasonal peak demand surcharge for Q4.',
          isActive: true,
          name: 'Peak Season Surcharge',
          type: 'seasonal',
          updatedAt: new Date('2023-01-01T11:00:00Z'),
          validFrom: new Date('2023-10-01T00:00:00Z'),
          validTo: new Date('2023-12-31T23:59:59Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          amount: 5.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.PerUnit,
          name: 'Handling Fee',
          type: 'handling',
        },
      },
      {
        name: 'amount at min and max values',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          amount: 0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Zero Surcharge',
          type: 'test',
        },
      },
      {
        name: 'amount at max value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          amount: 100000,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Max Surcharge',
          type: 'test',
        },
      },
      {
        name: 'name max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'N'.repeat(255),
          type: 'test',
        },
      },
      {
        name: 'type max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Type Test',
          type: 'T'.repeat(64),
        },
      },
      {
        name: 'description max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Description Test',
          type: 'test',
          description: 'D'.repeat(1024),
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => SurchargeSchema.parse(input)).not.toThrow()
      const result = SurchargeSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing amount',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'amount negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: -1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'amount too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100000.01,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Amount must be at most 100,000',
      },
      {
        name: 'amount wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 'abc',
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing calculationMethod',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'invalid calculationMethod enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: 'invalid-method',
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'missing name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          type: 'fuel',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: '',
          type: 'fuel',
        },
        expectedError: 'Name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'N'.repeat(256),
          type: 'fuel',
        },
        expectedError: 'Name must be at most 255 characters',
      },
      {
        name: 'missing type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'type too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: '',
        },
        expectedError: 'Type is required',
      },
      {
        name: 'type too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'T'.repeat(65),
        },
        expectedError: 'Type must be at most 64 characters',
      },
      {
        name: 'description too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Description Test',
          type: 'test',
          description: 'D'.repeat(1025),
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'invalid createdAt date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Test Surcharge',
          type: 'test',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'invalid updatedAt date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Test Surcharge',
          type: 'test',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'invalid validFrom date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Test Surcharge',
          type: 'test',
          validFrom: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'invalid validTo date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 1.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Test Surcharge',
          type: 'test',
          validTo: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        SurchargeSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for SurchargeSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: 10.5,
        calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
        name: 'Fuel Surcharge',
        type: 'fuel',
      }
      const result = SurchargeSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        amount: 10.5,
        calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
        name: 'Fuel Surcharge',
        type: 'fuel',
      }
      const result = SurchargeSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingSurchargeInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          amount: 25.75,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Percentage,
          description: 'Seasonal peak demand surcharge for Q4.',
          isActive: true,
          name: 'Peak Season Surcharge',
          type: 'seasonal',
          validFrom: new Date('2023-10-01T00:00:00Z'),
          validTo: new Date('2023-12-31T23:59:59Z'),
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => SurchargeInsertSchema.parse(input)).not.toThrow()
      const result = SurchargeInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing amount',
        input: {
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing calculationMethod',
        input: {
          amount: 10.5,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'missing name',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          type: 'fuel',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing type',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        SurchargeInsertSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for SurchargeInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        amount: 10.5,
        calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
        name: 'Fuel Surcharge',
        type: 'fuel',
      }
      const result = SurchargeInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: 10.5,
        calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
        name: 'Fuel Surcharge',
        type: 'fuel',
      }
      const result = SurchargeInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingSurchargeUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only amount',
        input: {
          amount: 15.0,
        },
      },
      {
        name: 'partial update: only name',
        input: {
          name: 'Updated Surcharge Name',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          amount: 30.0,
          calculationMethod: BillingSurchargeCalculationMethodEnum.SlidingScale,
          description: 'Updated description for the surcharge.',
          isActive: false,
          name: 'Updated Surcharge',
          type: 'updated-type',
          validFrom: new Date('2023-02-01T00:00:00Z'),
          validTo: new Date('2024-11-30T23:59:59Z'),
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => SurchargeUpdateSchema.parse(input)).not.toThrow()
      const result = SurchargeUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          amount: 10.5,
          calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
          name: 'Fuel Surcharge',
          type: 'fuel',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'amount negative',
        input: {
          amount: -1.0,
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'amount too large',
        input: {
          amount: 100000.01,
        },
        expectedError: 'Amount must be at most 100,000',
      },
      {
        name: 'invalid calculationMethod enum value',
        input: {
          calculationMethod: 'invalid-method',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'name too long',
        input: {
          name: 'N'.repeat(256),
        },
        expectedError: 'Name must be at most 255 characters',
      },
      {
        name: 'type too long',
        input: {
          type: 'T'.repeat(65),
        },
        expectedError: 'Type must be at most 64 characters',
      },
      {
        name: 'description too long',
        input: {
          description: 'D'.repeat(1025),
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'invalid validFrom date format',
        input: {
          validFrom: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'invalid validTo date format',
        input: {
          validTo: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        SurchargeUpdateSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for SurchargeUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        amount: 15.0,
        calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
        name: 'Updated Surcharge Name',
        type: 'updated-type',
      }
      const result = SurchargeUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: 10.5,
        calculationMethod: BillingSurchargeCalculationMethodEnum.Fixed,
        name: 'Fuel Surcharge',
        type: 'fuel',
      }
      const result = SurchargeUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
