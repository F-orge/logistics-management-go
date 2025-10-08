import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { CrmRecordType } from '@/db/types';
import {
  crmTaggingInsertSchema,
  crmTaggingSchema,
  crmTaggingUpdateSchema,
} from './tagging';

describe('CrmTaggingSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
      },
      {
        name: 'different record type (Opportunities)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          recordId: '123e4567-e89b-12d3-a456-426614174004',
          recordType: CrmRecordType.Opportunities,
          tagId: '123e4567-e89b-12d3-a456-426614174005',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmTaggingSchema.parse(input)).not.toThrow();
      const result = crmTaggingSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing recordId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid UUID format for record ID',
      },
      {
        name: 'invalid recordId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: 'invalid-uuid',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid UUID format for record ID',
      },
      {
        name: 'missing recordType',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid CRM record type',
      },
      {
        name: 'invalid recordType',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'unknown-type',
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid CRM record type',
      },
      {
        name: 'missing tagId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
        },
        expectedError: 'Invalid UUID format for tag ID',
      },
      {
        name: 'invalid tagId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for tag ID',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
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
          crmTaggingSchema.parse(input);
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

  describe('SafeParse Tests for crmTaggingSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: CrmRecordType.Contacts,
        tagId: '123e4567-e89b-12d3-a456-426614174002',
      };
      const result = crmTaggingSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: CrmRecordType.Contacts,
        tagId: '123e4567-e89b-12d3-a456-426614174002',
      };
      const result = crmTaggingSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmTaggingInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id)',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
      },
      {
        name: 'different record type (Leads)',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174003',
          recordType: CrmRecordType.Leads,
          tagId: '123e4567-e89b-12d3-a456-426614174004',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmTaggingInsertSchema.parse(input)).not.toThrow();
      const result = crmTaggingInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'missing recordId',
        input: {
          recordType: CrmRecordType.Contacts,
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid UUID format for record ID',
      },
      {
        name: 'missing recordType',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          tagId: '123e4567-e89b-12d3-a456-426614174002',
        },
        expectedError: 'Invalid CRM record type',
      },
      {
        name: 'missing tagId',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: CrmRecordType.Contacts,
        },
        expectedError: 'Invalid UUID format for tag ID',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmTaggingInsertSchema.parse(input);
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

  describe('SafeParse Tests for crmTaggingInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: CrmRecordType.Contacts,
        tagId: '123e4567-e89b-12d3-a456-426614174002',
      };
      const result = crmTaggingInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: CrmRecordType.Contacts,
        tagId: '123e4567-e89b-12d3-a456-426614174002',
      };
      const result = crmTaggingInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmTaggingUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only recordId',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174006',
        },
      },
      {
        name: 'partial update: only recordType',
        input: {
          recordType: CrmRecordType.Campaigns,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174007',
          recordType: CrmRecordType.Companies,
          tagId: '123e4567-e89b-12d3-a456-426614174008',
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmTaggingUpdateSchema.parse(input)).not.toThrow();
      const result = crmTaggingUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'recordId invalid format',
        input: {
          recordId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for record ID',
      },
      {
        name: 'recordType invalid',
        input: {
          recordType: 'unknown-type',
        },
        expectedError: 'Invalid CRM record type',
      },
      {
        name: 'tagId invalid format',
        input: {
          tagId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for tag ID',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmTaggingUpdateSchema.parse(input);
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

  describe('SafeParse Tests for crmTaggingUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: CrmRecordType.Contacts,
      };
      const result = crmTaggingUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
      };
      const result = crmTaggingUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
