import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  NotificationSchema,
} from './notifications';

describe('CrmNotificationSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test notification message.',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          userId: 'user-456',
          message: 'Long notification message: ' + 'L'.repeat(997), // 27 + 997 = 1024 chars
          link: 'https://example.com/notification/1',
          isRead: true,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          userId: 'user-789',
          message: 'Another notification.',
        },
      },
      {
        name: 'message with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          userId: 'user-abc',
          message: 'M'.repeat(1024),
        },
      },
      {
        name: 'link with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          userId: 'user-def',
          message: 'Link test.',
          link: 'https://example.com/' + 'L'.repeat(999), // 19 + 999 = 1018 chars
        },
      },
      {
        name: 'isRead is false',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          userId: 'user-ghi',
          message: 'Unread notification.',
          isRead: false,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => NotificationSchema.parse(input)).not.toThrow();
      const result = NotificationSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          userId: 'user-123',
          message: 'Test notification message.',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          userId: 'user-123',
          message: 'Test notification message.',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing userId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          message: 'Test notification message.',
        },
        expectedError: 'User ID must be a string',
      },
      {
        name: 'userId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: '',
          message: 'Test notification message.',
        },
        expectedError: 'User ID is required',
      },
      {
        name: 'userId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'U'.repeat(256),
          message: 'Test notification message.',
        },
        expectedError: 'User ID must be at most 255 characters',
      },
      {
        name: 'userId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 123,
          message: 'Test notification message.',
        },
        expectedError: 'User ID must be a string',
      },
      {
        name: 'missing message',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
        },
        expectedError: 'Message must be a string',
      },
      {
        name: 'message too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: '',
        },
        expectedError: 'Message is required',
      },
      {
        name: 'message too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'M'.repeat(1025),
        },
        expectedError: 'Message must be at most 1024 characters',
      },
      {
        name: 'message wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 123,
        },
        expectedError: 'Message must be a string',
      },
      {
        name: 'link invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          link: 'not-a-url',
        },
        expectedError: 'Invalid URL format for link',
      },
      {
        name: 'link too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          link: '',
        },
        expectedError: 'Link is required',
      },
      {
        name: 'link too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          link: 'https://example.com/' + 'L'.repeat(1006), // 19 + 1006 = 1025 chars
        },
        expectedError: 'Link must be at most 1024 characters',
      },
      {
        name: 'link wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          link: 123,
        },
        expectedError: 'Link must be a string',
      },
      {
        name: 'isRead wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          isRead: 'true',
        },
        expectedError: 'Is read must be a boolean',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
      {
        name: 'unrecognized field',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          userId: 'user-123',
          message: 'Test message.',
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
          NotificationSchema.parse(input);
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

  describe('SafeParse Tests for NotificationSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        userId: 'user-valid',
        message: 'Valid notification.',
      };
      const result = NotificationSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        userId: 'user-invalid',
        message: 'Invalid notification.',
      };
      const result = NotificationSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

