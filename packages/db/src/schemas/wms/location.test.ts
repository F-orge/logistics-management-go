import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  LocationSchema,
  LocationInsertSchema,
  LocationUpdateSchema
} from './location';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('LocationSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [
      {
        name: 'minimal location with required fields',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location A',
          type: 'PICK_BIN'
        }
      },
      {
        name: 'location with all field types',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Main Storage',
          type: 'BULK_STORAGE',
          barcode: 'LOC-001',
          hazmatApproved: true,
          isActive: true,
          isPickable: true,
          isReceivable: true,
          level: 5,
          maxPallets: 10,
          maxVolume: 1000,
          maxWeight: 5000,
          parentLocationId: '123e4567-e89b-12d3-a456-426614174002',
          path: '/warehouse/main/storage',
          temperatureControlled: true,
          xCoordinate: 10.5,
          yCoordinate: 20.5,
          zCoordinate: 30.5,
          createdAt: new Date('2024-01-01'),
          updatedAt: new Date('2024-01-02')
        }
      },
      {
        name: 'location with different enum values',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          warehouseId: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Receiving',
          type: 'RECEIVING_DOCK'
        }
      },
      {
        name: 'location with nullable optional fields as null',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          warehouseId: '123e4567-e89b-12d3-a456-426614174006',
          name: 'Loc',
          type: 'STAGING_AREA',
          barcode: null,
          hazmatApproved: null,
          isActive: null,
          isPickable: null,
          isReceivable: null,
          level: null,
          maxPallets: null,
          maxVolume: null,
          maxWeight: null,
          parentLocationId: null,
          path: null,
          temperatureControlled: null,
          xCoordinate: null,
          yCoordinate: null,
          zCoordinate: null
        }
      },
      {
        name: 'location with level 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          warehouseId: '123e4567-e89b-12d3-a456-426614174008',
          name: 'Ground Level',
          type: 'PACKING_STATION',
          level: 0
        }
      },
      {
        name: 'location with max level',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          warehouseId: '123e4567-e89b-12d3-a456-426614174010',
          name: 'Top Level',
          type: 'RESERVE_STORAGE',
          level: 10
        }
      },
      {
        name: 'location with max values',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          warehouseId: '123e4567-e89b-12d3-a456-426614174012',
          name: 'A'.repeat(127),
          type: 'QUALITY_CONTROL',
          barcode: 'B'.repeat(255),
          maxPallets: 1000,
          maxVolume: 100000,
          maxWeight: 100000,
          path: 'C'.repeat(1024)
        }
      }
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => LocationSchema.parse(input)).not.toThrow();
      const result = LocationSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [
      {
        name: 'missing required id field',
        input: {
          warehouseId: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Location',
          type: 'PICK_BIN'
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'missing required warehouseId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Location',
          type: 'PICK_BIN'
        },
        expectedError: 'Invalid UUID'
      },
      {
        name: 'missing required name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          type: 'PICK_BIN'
        },
        expectedError: 'string'
      },
      {
        name: 'missing required type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location'
        },
        expectedError: 'Invalid location type'
      },
      {
        name: 'invalid type enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'INVALID_TYPE'
        },
        expectedError: 'Invalid location type'
      },
      {
        name: 'name is empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: '',
          type: 'PICK_BIN'
        },
        expectedError: 'required'
      },
      {
        name: 'name exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'A'.repeat(128),
          type: 'PICK_BIN'
        },
        expectedError: 'at most'
      },
      {
        name: 'barcode exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          barcode: 'B'.repeat(256)
        },
        expectedError: 'at most'
      },
      {
        name: 'level is negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          level: -1
        },
        expectedError: 'at least'
      },
      {
        name: 'level exceeds max',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          level: 11
        },
        expectedError: 'at most'
      },
      {
        name: 'maxPallets is negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          maxPallets: -1
        },
        expectedError: 'at least'
      },
      {
        name: 'maxVolume is negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          maxVolume: -1
        },
        expectedError: 'at least'
      },
      {
        name: 'maxWeight exceeds max',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          maxWeight: 100001
        },
        expectedError: 'at most'
      },
      {
        name: 'hazmatApproved is not a boolean',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          hazmatApproved: 'yes'
        },
        expectedError: 'boolean'
      },
      {
        name: 'path exceeds max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          warehouseId: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Location',
          type: 'PICK_BIN',
          path: 'P'.repeat(1025)
        },
        expectedError: 'at most'
      }
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          LocationSchema.parse(input);
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
