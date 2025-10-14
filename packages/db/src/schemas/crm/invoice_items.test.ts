import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  InvoiceItemSchema,
} from './invoice_items';

describe('CrmInvoiceItemSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          invoiceId: '123e4567-e89b-12d3-a456-426614174004',
          productId: '123e4567-e89b-12d3-a456-426614174005',
          price: 999999.99,
          quantity: 10000,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'price at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          invoiceId: '123e4567-e89b-12d3-a456-426614174007',
          productId: '123e4567-e89b-12d3-a456-426614174008',
          price: 0,
          quantity: 5,
        },
      },
      {
        name: 'quantity at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          invoiceId: '123e4567-e89b-12d3-a456-426614174010',
          productId: '123e4567-e89b-12d3-a456-426614174011',
          price: 50,
          quantity: 1,
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174012',
          invoiceId: '123e4567-e89b-12d3-a456-426614174013',
          productId: '123e4567-e89b-12d3-a456-426614174014',
          price: 25,
          quantity: 2,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InvoiceItemSchema.parse(input)).not.toThrow();
      const result = InvoiceItemSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing invoiceId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for invoice ID',
      },
      {
        name: 'invalid invoiceId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: 'invalid-uuid',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for invoice ID',
      },
      {
        name: 'missing productId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          price: 10.5,
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for product ID',
      },
      {
        name: 'invalid productId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: 'invalid-uuid',
          price: 10.5,
          quantity: 1,
        },
        expectedError: 'Invalid UUID format for product ID',
      },
      {
        name: 'missing price',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          quantity: 1,
        },
        expectedError: 'Price must be a number',
      },
      {
        name: 'price wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 'ten',
          quantity: 1,
        },
        expectedError: 'Price must be a number',
      },
      {
        name: 'price below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: -0.01,
          quantity: 1,
        },
        expectedError: 'Price must be at least 0',
      },
      {
        name: 'price above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 1000000.01,
          quantity: 1,
        },
        expectedError: 'Price must be at most 1,000,000',
      },
      {
        name: 'missing quantity',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
        },
        expectedError: 'Quantity must be a number',
      },
      {
        name: 'quantity wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 'one',
        },
        expectedError: 'Quantity must be a number',
      },
      {
        name: 'quantity not an integer',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1.5,
        },
        expectedError: 'Quantity must be an integer',
      },
      {
        name: 'quantity below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-1-d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 0,
        },
        expectedError: 'Quantity must be at least 1',
      },
      {
        name: 'quantity above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 10001,
        },
        expectedError: 'Quantity must be at most 10,000',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-1-d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          productId: '123e4567-e89b-12d3-a456-426614174002',
          price: 10.5,
          quantity: 1,
          extraField: 'someValue',
        },
        expectedError: 'Unrecognized key: "extraField"',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          InvoiceItemSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(ZodError);
        expect(
          error?.issues.some((issue) => issue.message.includes(expectedError)),
        ).toBe(true);
      },
    );
  });

  describe('SafeParse Tests for InvoiceItemSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        productId: '123e4567-e89b-12d3-a456-426614174002',
        price: 100,
        quantity: 5,
      };
      const result = InvoiceItemSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        productId: '123e4567-e89b-12d3-a456-426614174002',
        price: 100,
        quantity: 5,
      };
      const result = InvoiceItemSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

