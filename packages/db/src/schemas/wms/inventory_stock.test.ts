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
    const validTestCases:ValidCase[] = [];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InventoryStockSchema.parse(input)).not.toThrow();
      const result = InventoryStockSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [];

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
