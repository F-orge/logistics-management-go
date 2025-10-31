import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  ReorderPointSchema,
  ReorderPointInsertSchema,
  ReorderPointUpdateSchema
} from './reorder_point';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('ReorderPointSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [
      {
        name: 'minimal reorder point with required fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: 0
        }
      },
      {
        name: 'reorder point with all fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: 100,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02')
        }
      },
      {
        name: 'reorder point with max threshold',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          productId: '123e4567-e89b-12d3-a456-426614174004',
          warehouseId: '123e4567-e89b-12d3-a456-426614174005',
          threshold: 1000000
        }
      }
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => ReorderPointSchema.parse(input)).not.toThrow();
      const result = ReorderPointSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [
      {
        name: 'missing required id',
        input: {
          productId: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          threshold: 100
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'invalid id UUID format',
        input: {
          id: 'not-a-uuid',
          productId: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          threshold: 100
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'threshold is negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: -1
        },
        expectedError: 'at least'
      },
      {
        name: 'threshold exceeds max',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: 1000001
        },
        expectedError: 'at most'
      },
      {
        name: 'threshold is not an integer',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: 100.5
        },
        expectedError: 'integer'
      },
      {
        name: 'threshold is not a number',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: 'not-a-number'
        },
        expectedError: 'number'
      },
      {
        name: 'createdAt is not a date',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          warehouseId: '123e4567-e89b-12d3-a456-426614174002',
          threshold: 100,
          createdAt: 'not-a-date'
        },
        expectedError: 'date'
      }
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          ReorderPointSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeInstanceOf(ZodError);
        expect(error?.issues[0]?.message).toContain(expectedError);
      },
    );
  });
});
