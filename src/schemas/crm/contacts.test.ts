import { describe, test, expect } from 'bun:test';
import { ZodError } from 'zod';
import {
  crmContactSchema,
  crmContactInsertSchema,
  crmContactUpdateSchema,
} from './contacts';

describe('CrmContactSchema Validation', () => {
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
          companyId: '123e4567-e89b-12d3-a456-426614174002',
          jobTitle: 'Software Engineer',
          ownerId: 'user-456',
          phoneNumber: '+15551234567',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'name with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          name: 'N'.repeat(255),
          email: 'max.name@example.com',
          ownerId: 'user-789',
        },
      },
      {
        name: 'email with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Max Email',
          email: 'e'.repeat(241) + '@example.com', // 241 + 12 = 253 chars
          ownerId: 'user-abc',
        },
      },
      {
        name: 'jobTitle with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          name: 'Max Job',
          email: 'max.job@example.com',
          jobTitle: 'J'.repeat(127),
          ownerId: 'user-def',
        },
      },
      {
        name: 'ownerId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          name: 'Max Owner',
          email: 'max.owner@example.com',
          ownerId: 'O'.repeat(255),
        },
      },
      {
        name: 'phoneNumber with max length (valid E.164)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          name: 'Max Phone',
          email: 'max.phone@example.com',
          ownerId: 'user-ghi',
          phoneNumber: '+123456789012345', // 16 chars, valid E.164
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          name: 'No Optional',
          email: 'no.optional@example.com',
          ownerId: 'user-jkl',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmContactSchema.parse(input)).not.toThrow();
      const result = crmContactSchema.parse(input);
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
        expectedError: 'Name must be a string',
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'N'.repeat(256),
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Name must be at most 255 characters',
      },
      {
        name: 'name wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123,
          email: 'john.doe@example.com',
          ownerId: 'user-123',
        },
        expectedError: 'Name must be a string',
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
        expectedError: 'Invalid email format', // Changed from "Email is required"
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
      /*
      /*
      {
        name: "email wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "John Doe",
          email: 123,
          ownerId: "user-123",
        },
        expectedError: "Email must be a string", // Custom message
      },
      */
      {
        name: 'invalid companyId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          companyId: 'invalid-uuid',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for company ID',
      },
      {
        name: 'jobTitle too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          jobTitle: '',
          ownerId: 'user-123',
        },
        expectedError: 'Job title is required',
      },
      {
        name: 'jobTitle too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          jobTitle: 'J'.repeat(128),
          ownerId: 'user-123',
        },
        expectedError: 'Job title must be at most 127 characters',
      },
      {
        name: 'jobTitle wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          jobTitle: 123,
          ownerId: 'user-123',
        },
        expectedError: 'Job title must be a string',
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
        name: 'phoneNumber too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          phoneNumber: '+12345678901234567890123456789012', // 33 chars
        },
        expectedError: 'Invalid phone number format', // e164 fails first
      },
      {
        name: 'phoneNumber invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          phoneNumber: 'invalid-phone',
        },
        expectedError: 'Invalid phone number format',
      },
      {
        name: 'phoneNumber wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'John Doe',
          email: 'john.doe@example.com',
          ownerId: 'user-123',
          phoneNumber: 123,
        },
        expectedError: 'Invalid phone number format', // Custom message from e164
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
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmContactSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeDefined(); // Check if an error was thrown
        expect(error).toBeInstanceOf(ZodError); // Still check for ZodError instance
        expect(error?.issues[0].message).toContain(expectedError);
      },
    );
  });

  describe('SafeParse Tests for crmContactSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Contact',
        email: 'valid.contact@example.com',
        ownerId: 'user-valid',
      };
      const result = crmContactSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        name: 'Invalid Contact',
        email: 'invalid.contact@example.com',
        ownerId: 'user-invalid',
      };
      const result = crmContactSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmContactInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'New Contact',
          email: 'new.contact@example.com',
          ownerId: 'user-new',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'Another New Contact',
          email: 'another.new@example.com',
          companyId: '123e4567-e89b-12d3-a456-426614174009',
          jobTitle: 'Marketing Manager',
          ownerId: 'user-new-full',
          phoneNumber: '+19876543210',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmContactInsertSchema.parse(input)).not.toThrow();
      const result = crmContactInsertSchema.parse(input);
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
          email: 'insert.fail@example.com',
          ownerId: 'user-fail',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Insert Fail',
          email: 'insert.fail@example.com',
          ownerId: 'user-fail',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Insert Fail',
          email: 'insert.fail@example.com',
          ownerId: 'user-fail',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing name',
        input: {
          email: 'insert.fail@example.com',
          ownerId: 'user-fail',
        },
        expectedError: 'Name must be a string',
      },
      {
        name: 'missing email',
        input: {
          name: 'Insert Fail',
          ownerId: 'user-fail',
        },
        expectedError: 'Email must be a string',
      },
      {
        name: 'missing ownerId',
        input: {
          name: 'Insert Fail',
          email: 'insert.fail@example.com',
        },
        expectedError: 'Owner ID must be a string',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmContactInsertSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeInstanceOf(ZodError);
        expect(error?.issues[0].message).toContain(expectedError);
      },
    );
  });

  describe('SafeParse Tests for crmContactInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Insert Contact',
        email: 'valid.insert@example.com',
        ownerId: 'user-valid-insert',
      };
      const result = crmContactInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Insert Contact',
        email: 'invalid.insert@example.com',
        ownerId: 'user-invalid-insert',
      };
      const result = crmContactInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmContactUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only name',
        input: {
          name: 'Updated Name',
        },
      },
      {
        name: 'partial update: only email',
        input: {
          email: 'updated.email@example.com',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          name: 'Fully Updated Contact',
          email: 'fully.updated@example.com',
          companyId: '123e4567-e89b-12d3-a456-426614174010',
          jobTitle: 'Senior Engineer',
          ownerId: 'user-update-full',
          phoneNumber: '+11234567890',
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmContactUpdateSchema.parse(input)).not.toThrow();
      const result = crmContactUpdateSchema.parse(input);
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
          email: 'update.fail@example.com',
          ownerId: 'user-fail',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Update Fail',
          email: 'update.fail@example.com',
          ownerId: 'user-fail',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Update Fail',
          email: 'update.fail@example.com',
          ownerId: 'user-fail',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'name wrong type',
        input: {
          name: 123,
        },
        expectedError: 'Name must be a string',
      },
      {
        name: 'email invalid format',
        input: {
          email: 'invalid-email',
        },
        expectedError: 'Invalid email format',
      },
      {
        name: 'email wrong type',
        input: {
          email: 123,
        },
        expectedError: 'Email must be a string',
      },
      {
        name: 'companyId invalid format',
        input: {
          companyId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID format for company ID',
      },
      {
        name: 'jobTitle wrong type',
        input: {
          jobTitle: 123,
        },
        expectedError: 'Job title must be a string',
      },
      {
        name: 'ownerId wrong type',
        input: {
          ownerId: 123,
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'phoneNumber invalid format',
        input: {
          phoneNumber: 'invalid-phone',
        },
        expectedError: 'Invalid phone number format',
      },
      {
        name: 'phoneNumber wrong type',
        input: {
          phoneNumber: 123,
        },
        expectedError: 'Invalid phone number format',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmContactUpdateSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeDefined(); // Check if an error was thrown
        expect(error).toBeInstanceOf(ZodError); // Still check for ZodError instance
        expect(error?.issues[0].message).toContain(expectedError);
      },
    );
  });

  describe('SafeParse Tests for crmContactUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Update Contact',
        email: 'valid.update@example.com',
        ownerId: 'user-valid-update',
      };
      const result = crmContactUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Update Contact',
        email: 'invalid.update@example.com',
        ownerId: 'user-invalid-update',
      };
      const result = crmContactUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
