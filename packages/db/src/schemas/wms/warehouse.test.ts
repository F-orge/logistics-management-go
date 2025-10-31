import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  WarehouseSchema,
  WarehouseInsertSchema,
  WarehouseUpdateSchema
} from './warehouse';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('WarehouseSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [
      {
        name: 'minimal warehouse with required fields only',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse A'
        }
      },
      {
        name: 'complete warehouse with all fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Main Warehouse',
          address: '123 Main St',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          contactPerson: 'John Doe',
          contactEmail: 'john@example.com',
          contactPhone: '+1-555-0123',
          timezone: 'America/New_York',
          isActive: true,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02')
        }
      },
      {
        name: 'warehouse with minimal address fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'Warehouse B',
          address: 'A',
          city: 'X',
          state: 'S',
          postalCode: '1',
          country: 'C'
        }
      },
      {
        name: 'warehouse with nullable fields as null',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          name: 'Warehouse C',
          address: null,
          city: null,
          state: null,
          postalCode: null,
          country: null,
          contactPerson: null,
          contactEmail: null,
          contactPhone: null,
          timezone: null,
          isActive: null
        }
      },
      {
        name: 'warehouse with isActive false',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Inactive Warehouse',
          isActive: false
        }
      },
      {
        name: 'warehouse with max length strings',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          name: 'A'.repeat(127),
          address: 'B'.repeat(255),
          city: 'C'.repeat(127),
          state: 'D'.repeat(127),
          postalCode: 'E'.repeat(20),
          country: 'F'.repeat(127),
          contactPerson: 'G'.repeat(255),
          contactEmail: 'h@' + 'i'.repeat(248) + '.com',
          contactPhone: 'P'.repeat(32),
          timezone: 'T'.repeat(64)
        }
      }
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => WarehouseSchema.parse(input)).not.toThrow();
      const result = WarehouseSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [
      {
        name: 'missing required id field',
        input: {
          name: 'Warehouse'
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'missing required name field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000'
        },
        expectedError: 'string'
      },
      {
        name: 'invalid UUID format for id',
        input: {
          id: 'not-a-uuid',
          name: 'Warehouse'
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'name is empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: ''
        },
        expectedError: 'required'
      },
      {
        name: 'name exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'A'.repeat(128)
        },
        expectedError: 'at most'
      },
      {
        name: 'address is empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          address: ''
        },
        expectedError: 'cannot be empty'
      },
      {
        name: 'address exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          address: 'A'.repeat(256)
        },
        expectedError: 'at most'
      },
      {
        name: 'city is empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          city: ''
        },
        expectedError: 'cannot be empty'
      },
      {
        name: 'contact email is invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          contactEmail: 'invalid-email'
        },
        expectedError: 'email'
      },
      {
        name: 'contactPhone exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          contactPhone: 'P'.repeat(33)
        },
        expectedError: 'at most'
      },
      {
        name: 'isActive is not a boolean',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          isActive: 'yes'
        },
        expectedError: 'boolean'
      },
      {
        name: 'createdAt is invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Warehouse',
          createdAt: 'not-a-date'
        },
        expectedError: 'date'
      },
      {
        name: 'name is not a string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123
        },
        expectedError: 'string'
      }
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          WarehouseSchema.parse(input);
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
