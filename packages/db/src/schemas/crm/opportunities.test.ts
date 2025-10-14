import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { CrmOpportunitySource, CrmOpportunityStage } from '@/db.types';
import {
  OpportunityInsertSchema,
  OpportunitySchema,
  OpportunityUpdateSchema,
} from './opportunities';
import { OpportunityProductInsertSchema } from './opportunity_products'; // Import for nested schema

describe('CrmOpportunitySchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Big Deal Opportunity',
          ownerId: 'user-456',
          campaignId: '123e4567-e89b-12d3-a456-426614174002',
          companyId: '123e4567-e89b-12d3-a456-426614174003',
          contactId: '123e4567-e89b-12d3-a456-426614174004',
          dealValue: 1000000.5,
          expectedCloseDate: new Date('2023-12-31T17:00:00Z'),
          lostReason: 'Competitor offered lower price. ' + 'L'.repeat(990),
          probability: 99,
          source: CrmOpportunitySource.Referral,
          stage: CrmOpportunityStage.Negotiation,
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          name: 'Simple Opportunity',
          ownerId: 'user-789',
        },
      },
      {
        name: 'dealValue at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          name: 'Min Value',
          ownerId: 'user-abc',
          dealValue: 0,
        },
      },
      {
        name: 'dealValue at maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          name: 'Max Value',
          ownerId: 'user-def',
          dealValue: 100000000,
        },
      },
      {
        name: 'probability at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          name: 'Min Probability',
          ownerId: 'user-ghi',
          probability: 0,
        },
      },
      {
        name: 'probability at maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          name: 'Max Probability',
          ownerId: 'user-jkl',
          probability: 100,
        },
      },
      {
        name: 'lostReason with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          name: 'Long Lost Reason',
          ownerId: 'user-mno',
          lostReason: 'R'.repeat(1024),
        },
      },
      {
        name: 'dealValue as string number',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          name: 'String Deal Value',
          ownerId: 'user-pqr',
          dealValue: 50000.75, // Expect number after coercion
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => OpportunitySchema.parse(input)).not.toThrow();
      const result = OpportunitySchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          name: 'New Opportunity',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          name: 'New Opportunity',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          ownerId: 'user-123',
        },
        expectedError: 'Opportunity name must be a string',
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '',
          ownerId: 'user-123',
        },
        expectedError: 'Opportunity name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'N'.repeat(256),
          ownerId: 'user-123',
        },
        expectedError: 'Opportunity name must be at most 255 characters',
      },
      {
        name: 'name wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123,
          ownerId: 'user-123',
        },
        expectedError: 'Opportunity name must be a string',
      },
      {
        name: 'missing ownerId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'ownerId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: '',
        },
        expectedError: 'Owner ID is required',
      },
      {
        name: 'ownerId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'O'.repeat(256),
        },
        expectedError: 'Owner ID must be at most 255 characters',
      },
      {
        name: 'ownerId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 123,
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'campaignId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          campaignId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for campaign ID',
      },
      {
        name: 'companyId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          companyId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for company ID',
      },
      {
        name: 'contactId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          contactId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for contact ID',
      },
      {
        name: 'dealValue wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          dealValue: 'one hundred',
        },
        expectedError: 'Deal value must be a number',
      },
      {
        name: 'dealValue below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          dealValue: -0.01,
        },
        expectedError: 'Deal value must be at least 0',
      },
      {
        name: 'dealValue above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          dealValue: 100000000.01,
        },
        expectedError: 'Deal value must be at most 100,000,000',
      },
      {
        name: 'expectedCloseDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          expectedCloseDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for expected close date',
      },
      {
        name: 'lostReason too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          lostReason: '',
        },
        expectedError: 'Lost reason is required',
      },
      {
        name: 'lostReason too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          lostReason: 'R'.repeat(1025),
        },
        expectedError: 'Lost reason must be at most 1024 characters',
      },
      {
        name: 'lostReason wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          lostReason: 123,
        },
        expectedError: 'Lost reason must be a string',
      },
      {
        name: 'probability wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          probability: 'fifty',
        },
        expectedError: 'Probability must be a number',
      },
      {
        name: 'probability below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          probability: -0.01,
        },
        expectedError: 'Probability must be at least 0',
      },
      {
        name: 'probability above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          probability: 100.01,
        },
        expectedError: 'Probability must be at most 100',
      },
      {
        name: 'invalid source',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          source: 'unknown-source',
        },
        expectedError: 'Invalid opportunity source',
      },
      {
        name: 'invalid stage',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          stage: 'unknown-stage',
        },
        expectedError: 'Invalid opportunity stage',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'New Opportunity',
          ownerId: 'user-123',
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
          OpportunitySchema.parse(input);
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

  describe('SafeParse Tests for OpportunitySchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Opportunity',
        ownerId: 'user-valid',
      };
      const result = OpportunitySchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        name: 'Invalid Opportunity',
        ownerId: 'user-invalid',
      };
      const result = OpportunitySchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmOpportunityInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'New Insert Opportunity',
          ownerId: 'user-insert',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'Full Insert Opportunity',
          ownerId: 'user-insert-full',
          campaignId: '123e4567-e89b-12d3-a456-426614174002',
          companyId: '123e4567-e89b-12d3-a456-426614174003',
          contactId: '123e4567-e89b-12d3-a456-426614174004',
          dealValue: 50000.0,
          expectedCloseDate: new Date('2023-11-30T17:00:00Z'),
          lostReason: 'Client went with another vendor.',
          probability: 70,
          source: CrmOpportunitySource.EmailCampaign,
          stage: CrmOpportunityStage.Proposal,
        },
      },
      {
        name: 'empty products array',
        input: {
          name: 'Empty Products Opp',
          ownerId: 'user-empty',
          products: [],
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => OpportunityInsertSchema.parse(input)).not.toThrow();
      const result = OpportunityInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Insert Fail',
          ownerId: 'user-fail',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Insert Fail',
          ownerId: 'user-fail',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Insert Fail',
          ownerId: 'user-fail',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing name',
        input: {
          ownerId: 'user-fail',
        },
        expectedError: 'Opportunity name must be a string',
      },
      {
        name: 'missing ownerId',
        input: {
          name: 'Insert Fail',
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'products array with invalid item',
        input: {
          name: 'Invalid Products Opp',
          ownerId: 'user-invalid',
          products: [
            {
              productId: 'invalid-uuid', // Invalid product ID
              quantity: 1,
            },
          ],
        },
        expectedError: 'Invalid UUID format for product ID',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          OpportunityInsertSchema.parse(input);
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

  describe('SafeParse Tests for OpportunityInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Insert Opp',
        ownerId: 'user-valid-insert',
      };
      const result = OpportunityInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Insert Opp',
        ownerId: 'user-invalid-insert',
      };
      const result = OpportunityInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmOpportunityUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only name',
        input: {
          name: 'Updated Opportunity Name',
        },
      },
      {
        name: 'partial update: only stage',
        input: {
          stage: CrmOpportunityStage.ClosedWon,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          name: 'Fully Updated Opp',
          ownerId: 'user-update-full',
          campaignId: '123e4567-e89b-12d3-a456-426614174006',
          companyId: '123e4567-e89b-12d3-a456-426614174007',
          contactId: '123e4567-e89b-12d3-a456-426614174008',
          dealValue: 75000.0,
          expectedCloseDate: new Date('2024-01-15T17:00:00Z'),
          lostReason: 'Customer changed mind.',
          probability: 85,
          source: CrmOpportunitySource.Partner,
          stage: CrmOpportunityStage.Proposal,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => OpportunityUpdateSchema.parse(input)).not.toThrow();
      const result = OpportunityUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Update Fail',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'name too long',
        input: {
          name: 'N'.repeat(256),
        },
        expectedError: 'Opportunity name must be at most 255 characters',
      },
      {
        name: 'ownerId wrong type',
        input: {
          ownerId: 123,
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'campaignId invalid format',
        input: {
          campaignId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for campaign ID',
      },
      {
        name: 'dealValue below minimum',
        input: {
          dealValue: -1,
        },
        expectedError: 'Deal value must be at least 0',
      },
      {
        name: 'lostReason too long',
        input: {
          lostReason: 'R'.repeat(1025),
        },
        expectedError: 'Lost reason must be at most 1024 characters',
      },
      {
        name: 'probability above maximum',
        input: {
          probability: 101,
        },
        expectedError: 'Probability must be at most 100',
      },
      {
        name: 'invalid source',
        input: {
          source: 'unknown-source',
        },
        expectedError: 'Invalid opportunity source',
      },
      {
        name: 'invalid stage',
        input: {
          stage: 'unknown-stage',
        },
        expectedError: 'Invalid opportunity stage',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          OpportunityUpdateSchema.parse(input);
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

  describe('SafeParse Tests for OpportunityUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Update Opp',
        dealValue: 1000,
      };
      const result = OpportunityUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Update Opp',
      };
      const result = OpportunityUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
