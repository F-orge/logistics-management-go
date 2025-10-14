import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { CrmLeadSource, CrmLeadStatus } from '@/db.types';
import {
  LeadSchema,
} from './leads';

describe('CrmLeadSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Jane Smith',
          email: 'jane.smith@company.org',
          ownerId: 'user-456',
          campaignId: '123e4567-e89b-12d3-a456-426614174002',
          convertedAt: new Date('2023-01-01T10:00:00Z'),
          convertedCompanyId: '123e4567-e89b-12d3-a456-426614174003',
          convertedContactId: '123e4567-e89b-12d3-a456-426614174004',
          convertedOpportunityId: '123e4567-e89b-12d3-a456-426614174005',
          leadScore: 75,
          leadSource: CrmLeadSource.Website,
          status: CrmLeadStatus.Qualified,
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          name: 'No Optional',
          email: 'no.optional@example.com',
          ownerId: 'user-789',
        },
      },
      {
        name: 'leadScore at minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          name: 'Min Score',
          email: 'min.score@example.com',
          ownerId: 'user-abc',
          leadScore: 0,
        },
      },
      {
        name: 'leadScore at maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          name: 'Max Score',
          email: 'max.score@example.com',
          ownerId: 'user-def',
          leadScore: 100,
        },
      },
      {
        name: 'converted IDs are null',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          name: 'Null Converted',
          email: 'null.converted@example.com',
          ownerId: 'user-ghi',
          convertedCompanyId: null,
          convertedContactId: null,
          convertedOpportunityId: null,
        },
      },
      {
        name: 'different lead source (SocialMedia)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          name: 'Social Lead',
          email: 'social.lead@example.com',
          ownerId: 'user-jkl',
          leadSource: CrmLeadSource.SocialMedia,
        },
      },
      {
        name: 'different lead status (New)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          name: 'New Lead',
          email: 'new.lead@example.com',
          ownerId: 'user-mno',
          status: CrmLeadStatus.New,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => LeadSchema.parse(input)).not.toThrow();
      const result = LeadSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Lead name must be a string',
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Lead name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'N'.repeat(256),
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Lead name must be at most 255 characters',
      },
      {
        name: 'name wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123,
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Lead name must be a string',
      },
      {
        name: 'missing email',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          ownerId: 'user-123',
        },
        expectedError: 'Email must be a string',
      },
      {
        name: 'email too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: '',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid email format',
      },
      {
        name: 'email too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'e'.repeat(244) + '@example.com', // 244 + 12 = 256 chars
          ownerId: 'user-123',
        },
        expectedError: 'Email must be at most 255 characters',
      },
      {
        name: 'email invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'invalid-email',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid email format',
      },
      {
        name: 'email wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 123,
          ownerId: 'user-123',
        },
        expectedError: 'Email must be a string',
      },
      {
        name: 'missing ownerId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'ownerId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: '',
        },
        expectedError: 'Owner ID is required',
      },
      {
        name: 'ownerId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'O'.repeat(256),
        },
        expectedError: 'Owner ID must be at most 255 characters',
      },
      {
        name: 'ownerId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 123,
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'campaignId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          campaignId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for campaign ID',
      },
      {
        name: 'convertedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          convertedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for conversion date',
      },
      {
        name: 'convertedCompanyId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          convertedCompanyId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for converted company ID',
      },
      {
        name: 'convertedContactId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          convertedContactId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for converted contact ID',
      },
      {
        name: 'convertedOpportunityId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          convertedOpportunityId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for converted opportunity ID',
      },
      {
        name: 'leadScore wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          leadScore: 'fifty',
        },
        expectedError: 'Lead score must be a number',
      },
      {
        name: 'leadScore not an integer',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          leadScore: 50.5,
        },
        expectedError: 'Lead score must be an integer',
      },
      {
        name: 'leadScore below minimum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          leadScore: -1,
        },
        expectedError: 'Lead score must be at least 0',
      },
      {
        name: 'leadScore above maximum',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          leadScore: 101,
        },
        expectedError: 'Lead score must be at most 100',
      },
      {
        name: 'invalid lead source',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          leadSource: 'unknown-source',
        },
        expectedError: 'Invalid lead source',
      },
      {
        name: 'invalid lead status',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          status: 'unknown-status',
        },
        expectedError: 'Invalid lead status',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
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
          LeadSchema.parse(input);
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

  describe('SafeParse Tests for LeadSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Lead',
        email: 'valid.lead@example.com',
        ownerId: 'user-valid',
      };
      const result = LeadSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        name: 'Invalid Lead',
        email: 'invalid.lead@example.com',
        ownerId: 'user-invalid',
      };
      const result = LeadSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

