import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  InventoryBatchSchema,
  InventoryBatchInsertSchema,
  InventoryBatchUpdateSchema
} from './inventory_batch';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('InventoryBatchSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [
      {
        name: 'minimal batch with required fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: 'BATCH-001'
        }
      },
      {
        name: 'batch with all fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: 'BATCH-002',
          expirationDate: new Date('2025-12-31'),
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02')
        }
      },
      {
        name: 'batch with nullable fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: 'BATCH-003',
          expirationDate: null,
          createdAt: null,
          updatedAt: null
        }
      },
      {
        name: 'batch with max batch number length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: 'B'.repeat(64)
        }
      }
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InventoryBatchSchema.parse(input)).not.toThrow();
      const result = InventoryBatchSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [
      {
        name: 'missing required id',
        input: {
          productId: '123e4567-e89b-12d3-a456-426614174000',
          batchNumber: 'BATCH-001'
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'invalid id UUID format',
        input: {
          id: 'not-a-uuid',
          productId: '123e4567-e89b-12d3-a456-426614174000',
          batchNumber: 'BATCH-001'
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'batchNumber is empty',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: ''
        },
        expectedError: 'required'
      },
      {
        name: 'batchNumber exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: 'B'.repeat(65)
        },
        expectedError: 'at most'
      },
      {
        name: 'expirationDate is not a date',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          batchNumber: 'BATCH-004',
          expirationDate: 'not-a-date'
        },
        expectedError: 'date'
      }
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          InventoryBatchSchema.parse(input);
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
