import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  crmCampaignInsertSchema,
  crmCampaignSchema,
  crmCampaignUpdateSchema,
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
      expect(() => crmCampaignSchema.parse(input)).not.toThrow();
      const result = crmCampaignSchema.parse(input);
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
          crmCampaignSchema.parse(input);
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

  describe('SafeParse Tests for crmCampaignSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Campaign',
      };
      const result = crmCampaignSchema.safeParse(validData);

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
      const result = crmCampaignSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmCampaignInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'New Campaign',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'Another New Campaign',
          budget: 500.0,
          startDate: new Date('2024-01-01T00:00:00Z'),
          endDate: new Date('2024-01-31T23:59:59Z'),
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmCampaignInsertSchema.parse(input)).not.toThrow();
      const result = crmCampaignInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Campaign Name',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Campaign Name',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Campaign Name',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing name',
        input: {},
        expectedError: 'Campaign name must be a string', // Custom message
      },
      {
        name: 'budget negative',
        input: {
          name: 'Campaign Name',
          budget: -10,
        },
        expectedError: 'Budget must be at least 0',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmCampaignInsertSchema.parse(input);
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

  describe('SafeParse Tests for crmCampaignInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Insert Campaign',
      };
      const result = crmCampaignInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Insert Campaign',
      };
      const result = crmCampaignInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmCampaignUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only name',
        input: {
          name: 'Updated Campaign Name',
        },
      },
      {
        name: 'partial update: only budget',
        input: {
          budget: 2000.0,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          name: 'Fully Updated Campaign',
          budget: 3000.5,
          startDate: new Date('2025-02-01T00:00:00Z'),
          endDate: new Date('2025-02-28T23:59:59Z'),
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmCampaignUpdateSchema.parse(input)).not.toThrow();
      const result = crmCampaignUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Updated Campaign Name',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Updated Campaign Name',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Updated Campaign Name',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'budget negative',
        input: {
          name: 'Updated Campaign Name',
          budget: -50,
        },
        expectedError: 'Budget must be at least 0',
      },
      {
        name: 'name wrong type',
        input: {
          name: 123,
        },
        expectedError: 'Campaign name must be a string',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmCampaignUpdateSchema.parse(input);
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

  describe('SafeParse Tests for crmCampaignUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Update Campaign',
      };
      const result = crmCampaignUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Update Campaign',
      };
      const result = crmCampaignUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
