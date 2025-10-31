import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  InventoryStockSchema,
  InventoryStockInsertSchema,
  InventoryStockUpdateSchema,
  InventoryStockResponseSchema,
  InventoryStockAdjustmentSchema
} from './inventory_stock';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('InventoryStockSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [
      {
        name: 'minimal inventory stock with required fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 0,
          reservedQuantity: 0
        }
      },
      {
        name: 'inventory stock with all fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: 50,
          availableQuantity: 50,
          batchId: '123e4567-e89b-12d3-a456-426614174003',
          status: 'AVAILABLE',
          lastCountedAt: new Date('2024-01-01'),
          lastMovementAt: new Date('2024-01-02'),
          createdAt: new Date('2024-01-03'),
          updatedAt: new Date('2024-01-04')
        }
      },
      {
        name: 'inventory stock with status ALLOCATED',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          productId: '123e4567-e89b-12d3-a456-426614174005',
          locationId: '123e4567-e89b-12d3-a456-426614174006',
          quantity: 200,
          reservedQuantity: 100,
          status: 'ALLOCATED'
        }
      },
      {
        name: 'inventory stock with nullable fields as null',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          productId: '123e4567-e89b-12d3-a456-426614174008',
          locationId: '123e4567-e89b-12d3-a456-426614174009',
          quantity: 50,
          reservedQuantity: 25,
          availableQuantity: null,
          batchId: null,
          status: null,
          lastCountedAt: null
        }
      },
      {
        name: 'inventory stock with max quantities',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          productId: '123e4567-e89b-12d3-a456-426614174011',
          locationId: '123e4567-e89b-12d3-a456-426614174012',
          quantity: 1000000,
          reservedQuantity: 1000000,
          availableQuantity: 1000000
        }
      },
      {
        name: 'inventory stock with status QUARANTINE',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174013',
          productId: '123e4567-e89b-12d3-a456-426614174014',
          locationId: '123e4567-e89b-12d3-a456-426614174015',
          quantity: 500,
          reservedQuantity: 200,
          status: 'QUARANTINE'
        }
      }
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InventoryStockSchema.parse(input)).not.toThrow();
      const result = InventoryStockSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [
      {
        name: 'missing required id',
        input: {
          productId: '123e4567-e89b-12d3-a456-426614174000',
          locationId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 100,
          reservedQuantity: 50
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'invalid id UUID format',
        input: {
          id: 'not-a-uuid',
          productId: '123e4567-e89b-12d3-a456-426614174000',
          locationId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 100,
          reservedQuantity: 50
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'invalid productId UUID format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: 'invalid-uuid',
          locationId: '123e4567-e89b-12d3-a456-426614174001',
          quantity: 100,
          reservedQuantity: 50
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'quantity is negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: -1,
          reservedQuantity: 0
        },
        expectedError: 'at least'
      },
      {
        name: 'quantity exceeds max',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1000001,
          reservedQuantity: 0
        },
        expectedError: 'at most'
      },
      {
        name: 'quantity is not an integer',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100.5,
          reservedQuantity: 0
        },
        expectedError: 'integer'
      },
      {
        name: 'reservedQuantity exceeds quantity',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: 101
        },
        expectedError: 'cannot exceed'
      },
      {
        name: 'reservedQuantity is negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: -1
        },
        expectedError: 'at least'
      },
      {
        name: 'availableQuantity exceeds max',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: 50,
          availableQuantity: 1000001
        },
        expectedError: 'at most'
      },
      {
        name: 'invalid status enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: 50,
          status: 'INVALID_STATUS'
        },
        expectedError: 'Invalid inventory stock status'
      },
      {
        name: 'lastCountedAt is not a date',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: 50,
          lastCountedAt: 'not-a-date'
        },
        expectedError: 'date'
      },
      {
        name: 'lastCountedAt is in the future',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 100,
          reservedQuantity: 50,
          lastCountedAt: new Date(Date.now() + 86400000) // +1 day
        },
        expectedError: 'cannot be in the future'
      },
      {
        name: 'quantity is not a number',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174001',
          locationId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 'not-a-number',
          reservedQuantity: 50
        },
        expectedError: 'number'
      }
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          InventoryStockSchema.parse(input);
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
