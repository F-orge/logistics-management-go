import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  crmAttachmentInsertSchema,
  crmAttachmentSchema,
  crmAttachmentUpdateSchema,
} from './attachments';

// Define CrmRecordType for testing purposes, mirroring the original enum
enum CrmRecordType {
  Campaigns = 'campaigns',
  Cases = 'cases',
  Companies = 'companies',
  Contacts = 'contacts',
  Interactions = 'interactions',
  Invoices = 'invoices',
  Leads = 'leads',
  Opportunities = 'opportunities',
  Products = 'products',
}

describe('CrmAttachmentSchema Validation', () => {
  const UUID_REGEX =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          fileName: 'image.png',
          filePath: '/uploads/images/image.png',
          mimeType: 'image/png',
          recordId: 'rec_123',
          recordType: CrmRecordType.Companies,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'file name with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          fileName: 'a'.repeat(255),
          filePath: '/uploads/long/file/name/' + 'b'.repeat(900) + '.txt',
        },
      },
      {
        name: 'file path with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          fileName: 'short.txt',
          filePath: '/path/to/very/long/file/path/' + 'c'.repeat(950) + '.doc',
        },
      },
      {
        name: 'mime type with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          fileName: 'test.xml',
          filePath: '/uploads/test.xml',
          mimeType: 'application/' + 'x'.repeat(111) + '+xml', // Corrected to 127 chars
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          fileName: 'another.txt',
          filePath: '/files/another.txt',
        },
      },
      {
        name: 'recordId and recordType present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          fileName: 'report.xlsx',
          filePath: '/reports/report.xlsx',
          recordId: 'opp_456',
          recordType: CrmRecordType.Opportunities,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmAttachmentSchema.parse(input)).not.toThrow();
      const result = crmAttachmentSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
        },
        expectedError: 'Invalid UUID format for ID', // Zod's message for missing UUID
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing fileName',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          filePath: '/uploads/document.pdf',
        },
        expectedError: 'File name must be a string', // Custom message
      },
      {
        name: 'fileName too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: '',
          filePath: '/uploads/document.pdf',
        },
        expectedError: 'File name is required',
      },
      {
        name: 'fileName too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'a'.repeat(256),
          filePath: '/uploads/document.pdf',
        },
        expectedError: 'File name must be at most 255 characters',
      },
      {
        name: 'fileName wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 123,
          filePath: '/uploads/document.pdf',
        },
        expectedError: 'File name must be a string', // Custom message
      },
      {
        name: 'missing filePath',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
        },
        expectedError: 'File path must be a string', // Custom message
      },
      {
        name: 'filePath too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: '',
        },
        expectedError: 'File path is required',
      },
      {
        name: 'filePath too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: 'c'.repeat(1025), // Simplified to ensure 1025 characters
        },
        expectedError: 'File path must be at most 1024 characters',
      },
      {
        name: 'filePath wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: 123,
        },
        expectedError: 'File path must be a string', // Custom message
      },
      {
        name: 'mimeType too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'test.xml',
          filePath: '/uploads/test.xml',
          mimeType: 'application/' + 'x'.repeat(113) + '+xml', // Corrected to 128 chars
        },
        expectedError: 'MIME type must be at most 127 characters',
      },
      {
        name: 'mimeType wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'test.xml',
          filePath: '/uploads/test.xml',
          mimeType: 123,
        },
        expectedError: 'MIME type must be a string', // Custom message
      },
      {
        name: 'recordId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
          recordId: 123,
        },
        expectedError: 'Record ID must be a string', // Custom message
      },
      {
        name: 'recordType invalid enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
          recordType: 'invalid_type',
        },
        expectedError: 'Invalid CRM record type', // Custom message
      },
      {
        name: 'createdAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
          createdAt: 'invalid-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'document.pdf',
          filePath: '/uploads/document.pdf',
          updatedAt: 'invalid-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          // Add console.log to debug filePath length

          crmAttachmentSchema.parse(input);
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

  describe('SafeParse Tests for crmAttachmentSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        fileName: 'document.pdf',
        filePath: '/uploads/document.pdf',
      };
      const result = crmAttachmentSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        fileName: 'document.pdf',
        filePath: '/uploads/document.pdf',
      };
      const result = crmAttachmentSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmAttachmentInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          fileName: 'new_doc.docx',
          filePath: '/new_uploads/new_doc.docx',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          fileName: 'new_image.jpeg',
          filePath: '/new_uploads/images/new_image.jpeg',
          mimeType: 'image/jpeg',
          recordId: 'lead_789',
          recordType: CrmRecordType.Leads,
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmAttachmentInsertSchema.parse(input)).not.toThrow();
      const result = crmAttachmentInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'new_doc.docx',
          filePath: '/new_uploads/new_doc.docx',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          fileName: 'new_doc.docx',
          filePath: '/new_uploads/new_doc.docx',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          fileName: 'new_doc.docx',
          filePath: '/new_uploads/new_doc.docx',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing fileName',
        input: {
          filePath: '/new_uploads/new_doc.docx',
        },
        expectedError: 'File name must be a string', // Custom message
      },
      {
        name: 'missing filePath',
        input: {
          fileName: 'new_doc.docx',
        },
        expectedError: 'File path must be a string', // Custom message
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmAttachmentInsertSchema.parse(input);
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

  describe('SafeParse Tests for crmAttachmentInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        fileName: 'new_doc.docx',
        filePath: '/new_uploads/new_doc.docx',
      };
      const result = crmAttachmentInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        fileName: 'new_doc.docx',
        filePath: '/new_uploads/new_doc.docx',
      };
      const result = crmAttachmentInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('CrmAttachmentUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only fileName',
        input: {
          fileName: 'updated_name.pdf',
        },
      },
      {
        name: 'partial update: only filePath',
        input: {
          filePath: '/updated_paths/updated.pdf',
        },
      },
      {
        name: 'partial update: mimeType and recordId',
        input: {
          mimeType: 'application/json',
          recordId: 'comp_101',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          fileName: 'all_fields.txt',
          filePath: '/all_paths/all.txt',
          mimeType: 'text/plain',
          recordId: 'case_202',
          recordType: CrmRecordType.Cases,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => crmAttachmentUpdateSchema.parse(input)).not.toThrow();
      const result = crmAttachmentUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'updated_name.pdf',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          fileName: 'updated_name.pdf',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          fileName: 'updated_name.pdf',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'fileName wrong type',
        input: {
          fileName: 123,
        },
        expectedError: 'File name must be a string',
      },
      {
        name: 'filePath wrong type',
        input: {
          filePath: 123,
        },
        expectedError: 'File path must be a string',
      },
      {
        name: 'recordType invalid enum value',
        input: {
          recordType: 'invalid_type',
        },
        expectedError: 'Invalid CRM record type',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmAttachmentUpdateSchema.parse(input);
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

  describe('SafeParse Tests for crmAttachmentUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        fileName: 'updated_name.pdf',
      };
      const result = crmAttachmentUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
      };
      const result = crmAttachmentUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
