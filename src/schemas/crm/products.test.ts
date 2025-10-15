import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { CrmProductType } from '@/db/types'
import { crmProductInsertSchema, crmProductSchema, crmProductUpdateSchema } from './products'

describe('CrmProductSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Product B',
          description: 'A detailed description of Product B. ' + 'D'.repeat(987), // 33 + 987 = 1020 chars
          price: 999999.99,
          sku: 'SKU-123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567', // 127 chars
          type: CrmProductType.Good,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'Product C',
          price: 20,
        },
      },
      {
        name: 'price at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          name: 'Min Price',
          price: 0,
        },
      },
      {
        name: 'price at maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Max Price',
          price: 1000000,
        },
      },
      {
        name: 'name with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          name: 'N'.repeat(255),
          price: 50,
        },
      },
      {
        name: 'description with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          name: 'Long Description',
          description: 'D'.repeat(1024),
          price: 75,
        },
      },
      {
        name: 'sku with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          name: 'Long SKU',
          price: 100,
          sku: 'S'.repeat(127),
        },
      },
      {
        name: 'price as string number',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          name: 'String Price',
          price: 123.45, // Expect number after coercion
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmProductSchema.parse(input)).not.toThrow()
      const result = crmProductSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          name: 'Product A',
          price: 10.5,
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          name: 'Product A',
          price: 10.5,
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          price: 10.5,
        },
        expectedError: 'Product name must be a string',
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '',
          price: 10.5,
        },
        expectedError: 'Product name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'N'.repeat(256),
          price: 10.5,
        },
        expectedError: 'Product name must be at most 255 characters',
      },
      {
        name: 'name wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123,
          price: 10.5,
        },
        expectedError: 'Product name must be a string',
      },
      {
        name: 'description too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          description: '',
          price: 10.5,
        },
        expectedError: 'Description is required',
      },
      {
        name: 'description too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          description: 'D'.repeat(1025),
          price: 10.5,
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'description wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          description: 123,
          price: 10.5,
        },
        expectedError: 'Description must be a string',
      },
      {
        name: 'missing price',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
        },
        expectedError: 'Price must be a number',
      },
      {
        name: 'price wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 'ten',
        },
        expectedError: 'Price must be a number',
      },
      {
        name: 'price below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: -0.01,
        },
        expectedError: 'Price must be at least 0',
      },
      {
        name: 'price above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 1000000.01,
        },
        expectedError: 'Price must be at most 1,000,000',
      },
      {
        name: 'sku too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          sku: '',
        },
        expectedError: 'SKU is required',
      },
      {
        name: 'sku too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          sku: 'S'.repeat(128),
        },
        expectedError: 'SKU must be at most 127 characters',
      },
      {
        name: 'sku wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          sku: 123,
        },
        expectedError: 'SKU must be a string',
      },
      {
        name: 'invalid product type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          type: 'unknown-type',
        },
        expectedError: 'Invalid product type',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Product A',
          price: 10.5,
          extraField: 'someValue',
        },
        expectedError: 'Unrecognized key: "extraField"',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        crmProductSchema.parse(input)
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

  describe('SafeParse Tests for crmProductSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Product',
        price: 100,
      }
      const result = crmProductSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        name: 'Invalid Product',
        price: 100,
      }
      const result = crmProductSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('CrmProductInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'New Product',
          price: 15.75,
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'Full New Product',
          description: 'Full description. ' + 'F'.repeat(1000),
          price: 500000,
          sku: 'NEW-SKU-123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567', // 127 chars
          type: CrmProductType.Service,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmProductInsertSchema.parse(input)).not.toThrow()
      const result = crmProductInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Insert Fail',
          price: 10,
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Insert Fail',
          price: 10,
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Insert Fail',
          price: 10,
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing name',
        input: {
          price: 10,
        },
        expectedError: 'Product name must be a string',
      },
      {
        name: 'missing price',
        input: {
          name: 'Insert Fail',
        },
        expectedError: 'Price must be a number',
      },
      {
        name: 'description too long',
        input: {
          name: 'Insert Fail',
          price: 10,
          description: 'D'.repeat(1025),
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'sku too long',
        input: {
          name: 'Insert Fail',
          price: 10,
          sku: 'S'.repeat(128),
        },
        expectedError: 'SKU must be at most 127 characters',
      },
      {
        name: 'invalid product type',
        input: {
          name: 'Insert Fail',
          price: 10,
          type: 'unknown-type',
        },
        expectedError: 'Invalid product type',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        crmProductInsertSchema.parse(input)
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

  describe('SafeParse Tests for crmProductInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Insert Product',
        price: 50,
      }
      const result = crmProductInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Insert Product',
        price: 50,
      }
      const result = crmProductInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('CrmProductUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only name',
        input: {
          name: 'Updated Product Name',
        },
      },
      {
        name: 'partial update: only price',
        input: {
          price: 25.99,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          name: 'Fully Updated Product',
          description: 'Updated description. ' + 'U'.repeat(990),
          price: 750000,
          sku: 'UPDATED-SKU-' + 'S'.repeat(115), // 12 + 115 = 127 chars
          type: CrmProductType.Digital,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmProductUpdateSchema.parse(input)).not.toThrow()
      const result = crmProductUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Update Fail',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'name too long',
        input: {
          name: 'N'.repeat(256),
        },
        expectedError: 'Product name must be at most 255 characters',
      },
      {
        name: 'price below minimum',
        input: {
          price: -1,
        },
        expectedError: 'Price must be at least 0',
      },
      {
        name: 'description too long',
        input: {
          description: 'D'.repeat(1025),
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'sku too long',
        input: {
          sku: 'S'.repeat(128),
        },
        expectedError: 'SKU must be at most 127 characters',
      },
      {
        name: 'invalid product type',
        input: {
          type: 'unknown-type',
        },
        expectedError: 'Invalid product type',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        crmProductUpdateSchema.parse(input)
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

  describe('SafeParse Tests for crmProductUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Update Product',
        price: 100,
      }
      const result = crmProductUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Update Product',
        price: 100,
      }
      const result = crmProductUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
