import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  CompanyInsertSchema,
  CompanySchema,
  CompanyUpdateSchema,
} from './companies';

describe('CrmCompanySchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Acme Corp',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          name: 'Globex Corporation',
          ownerId: 'user-123',
          annualRevenue: 1000000.5,
          city: 'Springfield',
          country: 'USA',
          industry: 'Technology',
          phoneNumber: '+15551234567',
          postalCode: '90210',
          state: 'CA',
          street: '123 Main St',
          website: 'https://www.globex.com',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'name with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          name: 'A'.repeat(255),
        },
      },
      {
        name: 'ownerId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          name: 'Company B',
          ownerId: 'B'.repeat(255),
        },
      },
      {
        name: 'annualRevenue is zero',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          name: 'Company C',
          annualRevenue: 0,
        },
      },
      {
        name: 'city, country, industry, state with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          name: 'Company D',
          city: 'C'.repeat(127),
          country: 'D'.repeat(127),
          industry: 'E'.repeat(127),
          state: 'F'.repeat(127),
        },
      },
      {
        name: 'phoneNumber with max length (valid E.164)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          name: 'Company E',
          phoneNumber: '+123456789012345', // Valid E.164, 16 chars
        },
      },
      {
        name: 'postalCode with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          name: 'Company F',
          postalCode: 'P'.repeat(32),
        },
      },
      {
        name: 'street with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          name: 'Company G',
          street: 'S'.repeat(255),
        },
      },
      {
        name: 'website with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          name: 'Company H',
          website: 'https://' + 'w'.repeat(243) + '.com', // 8 + 243 + 4 = 255 chars
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          name: 'Company I',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => CompanySchema.parse(input)).not.toThrow();
      const result = CompanySchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          name: 'Acme Corp',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          name: 'Acme Corp',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing name',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
        },
        expectedError: 'Company name must be a string',
      },
      {
        name: 'name too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: '',
        },
        expectedError: 'Company name is required',
      },
      {
        name: 'name too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'A'.repeat(256),
        },
        expectedError: 'Company name must be at most 255 characters',
      },
      {
        name: 'name wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 123,
        },
        expectedError: 'Company name must be a string',
      },
      {
        name: 'ownerId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company B',
          ownerId: 'B'.repeat(256),
        },
        expectedError: 'Owner ID must be at most 255 characters',
      },
      {
        name: 'ownerId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company B',
          ownerId: 123,
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'annualRevenue negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company C',
          annualRevenue: -100,
        },
        expectedError: 'Annual revenue must be at least 0',
      },
      {
        name: 'annualRevenue wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company C',
          annualRevenue: 'abc',
        },
        expectedError: 'Annual revenue must be a number',
      },
      {
        name: 'city too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company D',
          city: 'C'.repeat(128),
        },
        expectedError: 'City must be at most 127 characters',
      },
      {
        name: 'city wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company D',
          city: 123,
        },
        expectedError: 'City must be a string',
      },
      {
        name: 'country too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company E',
          country: 'D'.repeat(128),
        },
        expectedError: 'Country must be at most 127 characters',
      },
      {
        name: 'country wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company E',
          country: 123,
        },
        expectedError: 'Country must be a string',
      },
      {
        name: 'industry too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company F',
          industry: 'E'.repeat(128),
        },
        expectedError: 'Industry must be at most 127 characters',
      },
      {
        name: 'industry wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company F',
          industry: 123,
        },
        expectedError: 'Industry must be a string',
      },
      {
        name: 'phoneNumber too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company G',
          phoneNumber: '+12345678901234567890123456789012', // 33 chars
        },
        expectedError: 'Invalid phone number format', // e164 fails first
      },
      {
        name: 'phoneNumber invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company G',
          phoneNumber: 'invalid-phone',
        },
        expectedError: 'Invalid phone number format',
      },
      {
        name: 'phoneNumber wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company G',
          phoneNumber: 123,
        },
        expectedError: 'Invalid phone number format', // Custom message from e164
      },
      {
        name: 'postalCode too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company H',
          postalCode: 'P'.repeat(33),
        },
        expectedError: 'Postal code must be at most 32 characters',
      },
      {
        name: 'postalCode wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company H',
          postalCode: 123,
        },
        expectedError: 'Postal code must be a string',
      },
      {
        name: 'state too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company I',
          state: 'F'.repeat(128),
        },
        expectedError: 'State must be at most 127 characters',
      },
      {
        name: 'state wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company I',
          state: 123,
        },
        expectedError: 'State must be a string',
      },
      {
        name: 'street too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company J',
          street: 'S'.repeat(256),
        },
        expectedError: 'Street must be at most 255 characters',
      },
      {
        name: 'street wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company J',
          street: 123,
        },
        expectedError: 'Street must be a string',
      },
      {
        name: 'website too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company K',
          website: 'https://' + 'w'.repeat(244) + '.com', // 8 + 244 + 4 = 256 chars
        },
        expectedError: 'Website must be at most 255 characters',
      },
      {
        name: 'website invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company K',
          website: 'invalid-url',
        },
        expectedError: 'Invalid URL format for website',
      },
      {
        name: 'website wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company K',
          website: 123,
        },
        expectedError: 'Invalid URL format for website', // Custom message from url
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company L',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          name: 'Company M',
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
          CompanySchema.parse(input);
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

  describe('SafeParse Tests for CompanySchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Valid Company',
      };
      const result = CompanySchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        name: 'Invalid Company',
      };
      const result = CompanySchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmCompanyInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'New Company',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          name: 'Another New Company',
          ownerId: 'user-insert',
          annualRevenue: 50000.0,
          city: 'New City',
          country: 'New Country',
          industry: 'New Industry',
          phoneNumber: '+12345678901',
          postalCode: '12345',
          state: 'NS',
          street: '456 New St',
          website: 'https://www.newcompany.com',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => CompanyInsertSchema.parse(input)).not.toThrow();
      const result = CompanyInsertSchema.parse(input);
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
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          name: 'Insert Fail',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Insert Fail',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing name',
        input: {},
        expectedError: 'Company name must be a string',
      },
      {
        name: 'annualRevenue negative',
        input: {
          name: 'Insert Fail',
          annualRevenue: -1,
        },
        expectedError: 'Annual revenue must be at least 0',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          CompanyInsertSchema.parse(input);
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

  describe('SafeParse Tests for CompanyInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Insert Company',
      };
      const result = CompanyInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Insert Company',
      };
      const result = CompanyInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmCompanyUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only name',
        input: {
          name: 'Updated Company Name',
        },
      },
      {
        name: 'partial update: only annualRevenue',
        input: {
          annualRevenue: 500000.0,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          name: 'Fully Updated Campaign',
          ownerId: 'user-update',
          annualRevenue: 1234567.89,
          city: 'Updated City',
          country: 'Updated Country',
          industry: 'Updated Industry',
          phoneNumber: '+19876543210',
          postalCode: '54321',
          state: 'UP',
          street: '456 Updated St',
          website: 'https://www.updated.com',
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => CompanyUpdateSchema.parse(input)).not.toThrow();
      const result = CompanyUpdateSchema.parse(input);
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
          name: 'Update Fail',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          name: 'Update Fail',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'annualRevenue negative',
        input: {
          name: 'Update Fail',
          annualRevenue: -10,
        },
        expectedError: 'Annual revenue must be at least 0',
      },
      {
        name: 'name wrong type',
        input: {
          name: 123,
        },
        expectedError: 'Company name must be a string',
      },
      {
        name: 'phoneNumber invalid format',
        input: {
          phoneNumber: 'invalid-phone',
        },
        expectedError: 'Invalid phone number format',
      },
      {
        name: 'website invalid format',
        input: {
          website: 'invalid-url',
        },
        expectedError: 'Invalid URL format for website',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          CompanyUpdateSchema.parse(input);
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

  describe('SafeParse Tests for CompanyUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        name: 'Valid Update Company',
      };
      const result = CompanyUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        name: 'Invalid Update Company',
      };
      const result = CompanyUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
