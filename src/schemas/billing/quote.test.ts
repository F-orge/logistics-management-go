import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { BillingQuoteStatusEnum } from '@/db/types';
import {
  billingQuoteInsertSchema,
  billingQuoteSchema,
  billingQuoteUpdateSchema,
} from './quote';

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe('BillingQuoteSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          clientId: '123e4567-e89b-12d3-a456-426614174002',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          createdByUserId: 'user-123',
          destinationDetails: '789 Pine Ln, Somewhere, USA',
          expiresAt: new Date('2023-01-31T10:00:00Z'),
          height: 100,
          length: 200,
          notes: 'Fragile items, handle with care.',
          originDetails: '101 Maple Rd, Anywhere, USA',
          quotedPrice: 1500.75,
          quoteNumber: 'Q-001-2023',
          serviceLevel: 'Express',
          status: BillingQuoteStatusEnum.Pending,
          updatedAt: new Date('2023-01-02T11:00:00Z'),
          volume: 5000,
          weight: 500,
          width: 150,
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          destinationDetails: 'Destination A',
          originDetails: 'Origin A',
          quotedPrice: 50.0,
        },
      },
      {
        name: 'destinationDetails max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          destinationDetails: 'D'.repeat(255),
          originDetails: 'Origin B',
          quotedPrice: 10.0,
        },
      },
      {
        name: 'originDetails max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          destinationDetails: 'Destination C',
          originDetails: 'O'.repeat(255),
          quotedPrice: 20.0,
        },
      },
      {
        name: 'createdByUserId max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          createdByUserId: 'U'.repeat(255),
          destinationDetails: 'Destination D',
          originDetails: 'Origin D',
          quotedPrice: 30.0,
        },
      },
      {
        name: 'notes max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          notes: 'N'.repeat(1024),
          destinationDetails: 'Destination E',
          originDetails: 'Origin E',
          quotedPrice: 40.0,
        },
      },
      {
        name: 'quoteNumber max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          quoteNumber: 'QN'.repeat(32), // 64 chars
          destinationDetails: 'Destination F',
          originDetails: 'Origin F',
          quotedPrice: 50.0,
        },
      },
      {
        name: 'serviceLevel max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          serviceLevel: 'SL'.repeat(32), // 64 chars
          destinationDetails: 'Destination G',
          originDetails: 'Origin G',
          quotedPrice: 60.0,
        },
      },
      {
        name: 'quotedPrice zero',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          destinationDetails: 'Destination H',
          originDetails: 'Origin H',
          quotedPrice: 0,
        },
      },
      {
        name: 'quotedPrice max value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          destinationDetails: 'Destination I',
          originDetails: 'Origin I',
          quotedPrice: 10000000,
        },
      },
      {
        name: 'height, length, width max value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174012',
          destinationDetails: 'Destination J',
          originDetails: 'Origin J',
          quotedPrice: 100,
          height: 10000,
          length: 10000,
          width: 10000,
        },
      },
      {
        name: 'volume, weight max value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174013',
          destinationDetails: 'Destination K',
          originDetails: 'Origin K',
          quotedPrice: 100,
          volume: 100000,
          weight: 100000,
        },
      },
      {
        name: 'status accepted',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174014',
          destinationDetails: 'Destination L',
          originDetails: 'Origin L',
          quotedPrice: 100,
          status: BillingQuoteStatusEnum.Accepted,
        },
      },
      {
        name: 'status cancelled',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174015',
          destinationDetails: 'Destination M',
          originDetails: 'Origin M',
          quotedPrice: 100,
          status: BillingQuoteStatusEnum.Cancelled,
        },
      },
      {
        name: 'status converted',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174016',
          destinationDetails: 'Destination N',
          originDetails: 'Origin N',
          quotedPrice: 100,
          status: BillingQuoteStatusEnum.Converted,
        },
      },
      {
        name: 'status expired',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174017',
          destinationDetails: 'Destination O',
          originDetails: 'Origin O',
          quotedPrice: 100,
          status: BillingQuoteStatusEnum.Expired,
        },
      },
      {
        name: 'status pending',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174018',
          destinationDetails: 'Destination P',
          originDetails: 'Origin P',
          quotedPrice: 100,
          status: BillingQuoteStatusEnum.Pending,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingQuoteSchema.parse(input)).not.toThrow();
      const result = billingQuoteSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Required',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Invalid uuid',
      },
      {
        name: 'missing destinationDetails',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Required',
      },
      {
        name: 'destinationDetails empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Destination details are required',
      },
      {
        name: 'destinationDetails too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'D'.repeat(256),
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Destination details must be at most 255 characters',
      },
      {
        name: 'destinationDetails wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 123,
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'missing originDetails',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          quotedPrice: 100.5,
        },
        expectedError: 'Required',
      },
      {
        name: 'originDetails empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '',
          quotedPrice: 100.5,
        },
        expectedError: 'Origin details are required',
      },
      {
        name: 'originDetails too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: 'O'.repeat(256),
          quotedPrice: 100.5,
        },
        expectedError: 'Origin details must be at most 255 characters',
      },
      {
        name: 'originDetails wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: 123,
          quotedPrice: 100.5,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'missing quotedPrice',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
        },
        expectedError: 'Required',
      },
      {
        name: 'quotedPrice negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: -10.0,
        },
        expectedError: 'Quoted price must be at least 0',
      },
      {
        name: 'quotedPrice too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 10000000.01,
        },
        expectedError: 'Quoted price must be at most 10,000,000',
      },
      {
        name: 'quotedPrice wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: '123 Main St, Anytown, USA',
          originDetails: '456 Oak Ave, Otherville, USA',
          quotedPrice: 'abc',
        },
        expectedError: 'Invalid input',
      },
      {
        name: 'createdByUserId empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          createdByUserId: '',
          destinationDetails: 'Destination D',
          originDetails: 'Origin D',
          quotedPrice: 30.0,
        },
        expectedError: 'Created by user ID is required',
      },
      {
        name: 'createdByUserId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          createdByUserId: 'U'.repeat(256),
          destinationDetails: 'Destination D',
          originDetails: 'Origin D',
          quotedPrice: 30.0,
        },
        expectedError: 'Created by user ID must be at most 255 characters',
      },
      {
        name: 'createdByUserId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          createdByUserId: 123,
          destinationDetails: 'Destination D',
          originDetails: 'Origin D',
          quotedPrice: 30.0,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'expiresAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination E',
          originDetails: 'Origin E',
          quotedPrice: 40.0,
          expiresAt: 'not-a-date',
        },
        expectedError: 'Invalid date',
      },
      {
        name: 'expiresAt wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination E',
          originDetails: 'Origin E',
          quotedPrice: 40.0,
          expiresAt: 12345,
        },
        expectedError: 'Expected date, received number',
      },
      {
        name: 'height negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination F',
          originDetails: 'Origin F',
          quotedPrice: 50.0,
          height: -1,
        },
        expectedError: 'Height must be at least 0',
      },
      {
        name: 'height too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination F',
          originDetails: 'Origin F',
          quotedPrice: 50.0,
          height: 10001,
        },
        expectedError: 'Height must be at most 10,000',
      },
      {
        name: 'height wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination F',
          originDetails: 'Origin F',
          quotedPrice: 50.0,
          height: 'abc',
        },
        expectedError: 'Invalid input',
      },
      {
        name: 'length negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination G',
          originDetails: 'Origin G',
          quotedPrice: 60.0,
          length: -1,
        },
        expectedError: 'Length must be at least 0',
      },
      {
        name: 'length too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination G',
          originDetails: 'Origin G',
          quotedPrice: 60.0,
          length: 10001,
        },
        expectedError: 'Length must be at most 10,000',
      },
      {
        name: 'length wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination G',
          originDetails: 'Origin G',
          quotedPrice: 60.0,
          length: 'abc',
        },
        expectedError: 'Invalid input',
      },
      {
        name: 'notes empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          notes: '',
          destinationDetails: 'Destination H',
          originDetails: 'Origin H',
          quotedPrice: 70.0,
        },
        expectedError: 'Notes are required',
      },
      {
        name: 'notes too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          notes: 'N'.repeat(1025),
          destinationDetails: 'Destination H',
          originDetails: 'Origin H',
          quotedPrice: 70.0,
        },
        expectedError: 'Notes must be at most 1024 characters',
      },
      {
        name: 'notes wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          notes: 123,
          destinationDetails: 'Destination H',
          originDetails: 'Origin H',
          quotedPrice: 70.0,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'quoteNumber empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          quoteNumber: '',
          destinationDetails: 'Destination I',
          originDetails: 'Origin I',
          quotedPrice: 80.0,
        },
        expectedError: 'Quote number is required',
      },
      {
        name: 'quoteNumber too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          quoteNumber: 'QN'.repeat(33), // 66 chars
          destinationDetails: 'Destination I',
          originDetails: 'Origin I',
          quotedPrice: 80.0,
        },
        expectedError: 'Quote number must be at most 64 characters',
      },
      {
        name: 'quoteNumber wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          quoteNumber: 123,
          destinationDetails: 'Destination I',
          originDetails: 'Origin I',
          quotedPrice: 80.0,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'serviceLevel empty string',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          serviceLevel: '',
          destinationDetails: 'Destination J',
          originDetails: 'Origin J',
          quotedPrice: 90.0,
        },
        expectedError: 'Service level is required',
      },
      {
        name: 'serviceLevel too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          serviceLevel: 'SL'.repeat(33), // 66 chars
          destinationDetails: 'Destination J',
          originDetails: 'Origin J',
          quotedPrice: 90.0,
        },
        expectedError: 'Service level must be at most 64 characters',
      },
      {
        name: 'serviceLevel wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          serviceLevel: 123,
          destinationDetails: 'Destination J',
          originDetails: 'Origin J',
          quotedPrice: 90.0,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'status invalid enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination K',
          originDetails: 'Origin K',
          quotedPrice: 100,
          status: 'invalid-status',
        },
        expectedError:
          "Invalid enum value. Expected 'accepted' | 'cancelled' | 'converted' | 'expired' | 'pending', received 'invalid-status'",
      },
      {
        name: 'status wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination K',
          originDetails: 'Origin K',
          quotedPrice: 100,
          status: 123,
        },
        expectedError: 'Expected string, received number',
      },
      {
        name: 'createdAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination L',
          originDetails: 'Origin L',
          quotedPrice: 110.0,
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid date',
      },
      {
        name: 'createdAt wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination L',
          originDetails: 'Origin L',
          quotedPrice: 110.0,
          createdAt: 12345,
        },
        expectedError: 'Expected date, received number',
      },
      {
        name: 'updatedAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination M',
          originDetails: 'Origin M',
          quotedPrice: 120.0,
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid date',
      },
      {
        name: 'updatedAt wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination M',
          originDetails: 'Origin M',
          quotedPrice: 120.0,
          updatedAt: 12345,
        },
        expectedError: 'Expected date, received number',
      },
      {
        name: 'volume negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination N',
          originDetails: 'Origin N',
          quotedPrice: 130.0,
          volume: -1,
        },
        expectedError: 'Volume must be at least 0',
      },
      {
        name: 'volume too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination N',
          originDetails: 'Origin N',
          quotedPrice: 130.0,
          volume: 100001,
        },
        expectedError: 'Volume must be at most 100,000',
      },
      {
        name: 'volume wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination N',
          originDetails: 'Origin N',
          quotedPrice: 130.0,
          volume: 'abc',
        },
        expectedError: 'Invalid input',
      },
      {
        name: 'weight negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination O',
          originDetails: 'Origin O',
          quotedPrice: 140.0,
          weight: -1,
        },
        expectedError: 'Weight must be at least 0',
      },
      {
        name: 'weight too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination O',
          originDetails: 'Origin O',
          quotedPrice: 140.0,
          weight: 100001,
        },
        expectedError: 'Weight must be at most 100,000',
      },
      {
        name: 'weight wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination O',
          originDetails: 'Origin O',
          quotedPrice: 140.0,
          weight: 'abc',
        },
        expectedError: 'Invalid input',
      },
      {
        name: 'width negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination P',
          originDetails: 'Origin P',
          quotedPrice: 150.0,
          width: -1,
        },
        expectedError: 'Width must be at least 0',
      },
      {
        name: 'width too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination P',
          originDetails: 'Origin P',
          quotedPrice: 150.0,
          width: 10001,
        },
        expectedError: 'Width must be at most 10,000',
      },
      {
        name: 'width wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Destination P',
          originDetails: 'Origin P',
          quotedPrice: 150.0,
          width: 'abc',
        },
        expectedError: 'Invalid input',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        expect(() => billingQuoteSchema.parse(input)).toThrow(ZodError);
      },
    );
  });

  describe('SafeParse Tests for billingQuoteSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        destinationDetails: 'Valid Destination',
        originDetails: 'Valid Origin',
        quotedPrice: 100.0,
      };
      const result = billingQuoteSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        destinationDetails: 'Valid Destination',
        originDetails: 'Valid Origin',
        quotedPrice: 100.0,
      };
      const result = billingQuoteSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('BillingQuoteInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          destinationDetails: 'New Destination',
          originDetails: 'New Origin',
          quotedPrice: 200.0,
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          clientId: '123e4567-e89b-12d3-a456-426614174000',
          createdByUserId: 'insert-user',
          destinationDetails: 'Complete New Destination',
          expiresAt: new Date('2024-01-01T12:00:00Z'),
          height: 50,
          length: 100,
          notes: 'Insert notes here.',
          originDetails: 'Complete New Origin',
          quotedPrice: 2500.0,
          quoteNumber: 'INSERT-Q-001',
          serviceLevel: 'Standard',
          status: BillingQuoteStatusEnum.Pending,
          volume: 2500,
          weight: 250,
          width: 75,
        },
      },
      {
        name: 'all optional fields absent (excluding id, createdAt, updatedAt)',
        input: {
          destinationDetails: 'Minimal Destination',
          originDetails: 'Minimal Origin',
          quotedPrice: 10.0,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingQuoteInsertSchema.parse(input)).not.toThrow();
      const result = billingQuoteInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          destinationDetails: 'Invalid Insert',
          originDetails: 'Invalid Insert',
          quotedPrice: 1.0,
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          createdAt: new Date(),
          destinationDetails: 'Invalid Insert',
          originDetails: 'Invalid Insert',
          quotedPrice: 1.0,
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          updatedAt: new Date(),
          destinationDetails: 'Invalid Insert',
          originDetails: 'Invalid Insert',
          quotedPrice: 1.0,
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing destinationDetails',
        input: {
          originDetails: 'New Origin',
          quotedPrice: 200.0,
        },
        expectedError: 'Required',
      },
      {
        name: 'quotedPrice negative',
        input: {
          destinationDetails: 'New Destination',
          originDetails: 'New Origin',
          quotedPrice: -5.0,
        },
        expectedError: 'Quoted price must be at least 0',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        expect(() => billingQuoteInsertSchema.parse(input)).toThrow(ZodError);
      },
    );
  });

  describe('SafeParse Tests for billingQuoteInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        destinationDetails: 'Valid Insert Destination',
        originDetails: 'Valid Insert Origin',
        quotedPrice: 300.0,
      };
      const result = billingQuoteInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        destinationDetails: 'Invalid Insert Destination',
        originDetails: 'Invalid Insert Origin',
        quotedPrice: 300.0,
      };
      const result = billingQuoteInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('BillingQuoteUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'empty object (no changes)',
        input: {},
      },
      {
        name: 'partial update: only notes',
        input: {
          notes: 'Updated notes for the quote.',
        },
      },
      {
        name: 'partial update: only serviceLevel',
        input: {
          serviceLevel: 'Premium',
        },
      },
      {
        name: 'partial update: multiple fields',
        input: {
          destinationDetails: 'Updated Destination',
          quotedPrice: 500.0,
          status: BillingQuoteStatusEnum.Accepted,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          clientId: '123e4567-e89b-12d3-a456-426614174000',
          createdByUserId: 'update-user',
          destinationDetails: 'Updated Destination Details',
          expiresAt: new Date('2024-02-01T12:00:00Z'),
          height: 60,
          length: 110,
          notes: 'All updated notes.',
          originDetails: 'Updated Origin Details',
          quotedPrice: 3000.0,
          quoteNumber: 'UPDATE-Q-001',
          serviceLevel: 'Expedited',
          status: BillingQuoteStatusEnum.Converted,
          volume: 3000,
          weight: 300,
          width: 80,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingQuoteUpdateSchema.parse(input)).not.toThrow();
      const result = billingQuoteUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          notes: 'Invalid Update',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          createdAt: new Date(),
          notes: 'Invalid Update',
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          updatedAt: new Date(),
          notes: 'Invalid Update',
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'quotedPrice negative',
        input: {
          quotedPrice: -100.0,
        },
        expectedError: 'Quoted price must be at least 0',
      },
      {
        name: 'destinationDetails too long',
        input: {
          destinationDetails: 'D'.repeat(256),
        },
        expectedError: 'Destination details must be at most 255 characters',
      },
      {
        name: 'status invalid enum value',
        input: {
          status: 'non-existent-status',
        },
        expectedError:
          "Invalid enum value. Expected 'accepted' | 'cancelled' | 'converted' | 'expired' | 'pending', received 'non-existent-status'",
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        expect(() => billingQuoteUpdateSchema.parse(input)).toThrow(ZodError);
      },
    );
  });

  describe('SafeParse Tests for billingQuoteUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        notes: 'Valid Update Notes',
      };
      const result = billingQuoteUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        notes: 'Invalid Update Notes',
      };
      const result = billingQuoteUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
