import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  CampaignSchema,
} from './campaigns';

describe('CrmCampaignSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Summer Sale Campaign',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Holiday Promotion 2024',
          budget: 1500.75,
          startDate: new Date('2024-11-01T00:00:00Z'),
          endDate: new Date('2024-12-31T23:59:59Z'),
          createdAt: new Date('2024-10-01T10:00:00Z'),
          updatedAt: new Date('2024-10-01T11:00:00Z'),
        },
      },
      {
        name: 'campaign name with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'a'.repeat(255),
        },
      },
      {
        name: 'budget is zero',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          name: 'Zero Budget Campaign',
          budget: 0,
        },
      },
      {
        name: 'only optional dates present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Event Campaign',
          startDate: new Date('2025-01-15T09:00:00Z'),
          endDate: new Date('2025-01-15T17:00:00Z'),
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => CampaignSchema.parse(input)).not.toThrow();
      const result = CampaignSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          name: 'Campaign Name',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          name: 'Campaign Name',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
        },
        expectedError: 'Campaign name must be a string', // Custom message
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '',
        },
        expectedError: 'Campaign name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'a'.repeat(256),
        },
        expectedError: 'Campaign name must be at most 255 characters',
      },
      {
        name: 'name wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123,
        },
        expectedError: 'Campaign name must be a string',
      },
      {
        name: 'budget negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
          budget: -100,
        },
        expectedError: 'Budget must be at least 0',
      },
      {
        name: 'budget wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
          budget: 'abc',
        },
        expectedError: 'Budget must be a number',
      },
      {
        name: 'startDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
          startDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for start date',
      },
      {
        name: 'endDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
          endDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for end date',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          CampaignSchema.parse(input);
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

  describe('SafeParse Tests for CampaignSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Campaign',
      };
      const result = CampaignSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        name: 'Invalid Campaign',
      };
      const result = CampaignSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});