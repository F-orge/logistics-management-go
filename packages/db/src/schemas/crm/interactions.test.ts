import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { CrmInteractionType } from '@/db.types';
import {
  InteractionInsertSchema,
  InteractionSchema,
  InteractionUpdateSchema,
} from './interactions';

describe('CrmInteractionSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          contactId: '123e4567-e89b-12d3-a456-426614174003',
          caseId: '123e4567-e89b-12d3-a456-426614174004',
          userId: 'user-456',
          type: CrmInteractionType.Meeting,
          interactionDate: new Date('2023-01-01T10:00:00Z'),
          notes: 'Discussed project requirements and next steps.',
          outcome: 'Meeting scheduled for next week.',
          createdAt: new Date('2023-01-01T09:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          contactId: '123e4567-e89b-12d3-a456-426614174006',
          userId: 'user-789',
        },
      },
      {
        name: 'notes with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          contactId: '123e4567-e89b-12d3-a456-426614174008',
          userId: 'user-abc',
          notes: 'N'.repeat(1024),
        },
      },
      {
        name: 'outcome with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          contactId: '123e4567-e89b-12d3-a456-426614174010',
          userId: 'user-def',
          outcome: 'O'.repeat(255),
        },
      },
      {
        name: 'different interaction type (Call)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          contactId: '123e4567-e89b-12d3-a456-426614174012',
          userId: 'user-ghi',
          type: CrmInteractionType.Call,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InteractionSchema.parse(input)).not.toThrow();
      const result = InteractionSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing contactId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
        },
        expectedError: 'Invalid UUID format for contact ID',
      },
      {
        name: 'invalid contactId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: 'invalid-contact-uuid',
          userId: 'user-123',
        },
        expectedError: 'Invalid UUID format for contact ID',
      },
      {
        name: 'invalid caseId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          caseId: 'invalid-case-uuid',
          userId: 'user-123',
        },
        expectedError: 'Invalid UUID format for case ID',
      },
      {
        name: 'missing userId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'User ID must be a string',
      },
      {
        name: 'userId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: '',
        },
        expectedError: 'User ID is required',
      },
      {
        name: 'userId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'U'.repeat(256),
        },
        expectedError: 'User ID must be at most 255 characters',
      },
      {
        name: 'userId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 123,
        },
        expectedError: 'User ID must be a string',
      },
      /*
      {
        name: "invalid interaction type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          contactId: "123e4567-e89b-12d3-a456-426614174001",
          userId: "user-123",
          type: "invalid-type",
        },
        expectedError: "Invalid interaction type",
      },
      */
      {
        name: 'interactionDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          interactionDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for interaction date',
      },
      {
        name: 'notes too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          notes: '',
        },
        expectedError: 'Notes are required',
      },
      {
        name: 'notes too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          notes: 'N'.repeat(1025),
        },
        expectedError: 'Notes must be at most 1024 characters',
      },
      {
        name: 'notes wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          notes: 123,
        },
        expectedError: 'Notes must be a string',
      },
      {
        name: 'outcome too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          outcome: '',
        },
        expectedError: 'Outcome is required',
      },
      {
        name: 'outcome too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          outcome: 'O'.repeat(256),
        },
        expectedError: 'Outcome must be at most 255 characters',
      },
      {
        name: 'outcome wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          outcome: 123,
        },
        expectedError: 'Outcome must be a string',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-123',
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
          InteractionSchema.parse(input);
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

  describe('SafeParse Tests for InteractionSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        contactId: '123e4567-e89b-12d3-a456-426614174001',
        userId: 'user-valid',
      };
      const result = InteractionSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        contactId: '123e4567-e89b-12d3-a456-426614174001',
        userId: 'user-invalid',
      };
      const result = InteractionSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmInteractionInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-insert',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174003',
          caseId: '123e4567-e89b-12d3-a456-426614174004',
          userId: 'user-insert-full',
          type: CrmInteractionType.Email,
          interactionDate: new Date('2023-01-01T10:00:00Z'),
          notes: 'Followed up on previous meeting.',
          outcome: 'Awaiting client response.',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InteractionInsertSchema.parse(input)).not.toThrow();
      const result = InteractionInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-insert',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-insert',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-insert',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing contactId',
        input: {
          userId: 'user-insert',
        },
        expectedError: 'Invalid UUID format for contact ID',
      },
      {
        name: 'missing userId',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'User ID must be a string',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          InteractionInsertSchema.parse(input);
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

  describe('SafeParse Tests for InteractionInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        contactId: '123e4567-e89b-12d3-a456-426614174001',
        userId: 'user-valid-insert',
      };
      const result = InteractionInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        contactId: '123e4567-e89b-12d3-a456-426614174001',
        userId: 'user-invalid-insert',
      };
      const result = InteractionInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmInteractionUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only notes',
        input: {
          notes: 'Updated notes for interaction.',
        },
      },
      {
        name: 'partial update: only type',
        input: {
          type: CrmInteractionType.Text,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          contactId: '123e4567-e89b-12d3-a456-426614174001',
          caseId: '123e4567-e89b-12d3-a456-426614174004',
          userId: 'user-update-full',
          type: CrmInteractionType.Call,
          interactionDate: new Date('2023-01-02T10:00:00Z'),
          notes: 'Follow up call completed.',
          outcome: 'Resolved issue.',
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => InteractionUpdateSchema.parse(input)).not.toThrow();
      const result = InteractionUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          notes: 'Attempt to update ID.',
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
        name: 'contactId invalid format',
        input: {
          contactId: 'invalid-contact-uuid',
        },
        expectedError: 'Invalid UUID format for contact ID',
      },
      {
        name: 'caseId invalid format',
        input: {
          caseId: 'invalid-case-uuid',
        },
        expectedError: 'Invalid UUID format for case ID',
      },
      {
        name: 'userId wrong type',
        input: {
          userId: 123,
        },
        expectedError: 'User ID must be a string',
      },
      {
        name: 'invalid interaction type',
        input: {
          type: 'invalid-type',
        },
        expectedError: 'Invalid interaction type',
      },
      {
        name: 'interactionDate invalid format',
        input: {
          interactionDate: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for interaction date',
      },
      {
        name: 'notes too long',
        input: {
          notes: 'N'.repeat(1025),
        },
        expectedError: 'Notes must be at most 1024 characters',
      },
      {
        name: 'outcome too long',
        input: {
          outcome: 'O'.repeat(256),
        },
        expectedError: 'Outcome must be at most 255 characters',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          InteractionUpdateSchema.parse(input);
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

  describe('SafeParse Tests for InteractionUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        notes: 'Valid update notes.',
      };
      const result = InteractionUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        notes: 'Invalid update notes.',
      };
      const result = InteractionUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
