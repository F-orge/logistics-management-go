import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { BillingDocumentTypeEnum } from '@/db.types';
import {
  DocumentInsertSchema,
  DocumentSchema,
  DocumentUpdateSchema,
} from './document';

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

describe('BillingDocumentSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          documentType: BillingDocumentTypeEnum.CommercialInvoice,
          fileName: 'commercial_invoice_' + 'a'.repeat(230) + '.pdf',
          filePath:
            '/path/to/invoices/commercial_invoice_' + 'b'.repeat(970) + '.pdf',
          fileSize: 100000000,
          mimeType: 'application/pdf-' + 'c'.repeat(108),
          recordId: '123e4567-e89b-12d3-a456-426614174003',
          recordType: 'Invoice-' + 'd'.repeat(56),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
          uploadedByUserId: 'user-upload-123-' + 'e'.repeat(235),
        },
      },
      {
        name: 'fileName with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          documentType: BillingDocumentTypeEnum.Bol,
          fileName: 'F'.repeat(255),
          filePath: '/path/to/file.txt',
          recordId: '123e4567-e89b-12d3-a456-426614174005',
          recordType: 'Shipment',
        },
      },
      {
        name: 'filePath with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          documentType: BillingDocumentTypeEnum.CustomsDeclaration,
          fileName: 'customs.xml',
          filePath: '/P'.repeat(512),
          recordId: '123e4567-e89b-12d3-a456-426614174007',
          recordType: 'Customs',
        },
      },
      {
        name: 'fileSize at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          documentType: BillingDocumentTypeEnum.PackingList,
          fileName: 'packing.doc',
          filePath: '/path/to/packing.doc',
          fileSize: 0,
          recordId: '123e4567-e89b-12d3-a456-426614174009',
          recordType: 'Packing',
        },
      },
      {
        name: 'fileSize at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174010',
          documentType: BillingDocumentTypeEnum.ProofOfDelivery,
          fileName: 'pod.jpg',
          filePath: '/path/to/pod.jpg',
          fileSize: 100000000,
          recordId: '123e4567-e89b-12d3-a456-426614174011',
          recordType: 'Delivery',
        },
      },
      {
        name: 'mimeType with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174012',
          documentType: BillingDocumentTypeEnum.ShippingLabel,
          fileName: 'label.png',
          filePath: '/path/to/label.png',
          mimeType: 'M'.repeat(127),
          recordId: '123e4567-e89b-12d3-a456-426614174013',
          recordType: 'Label',
        },
      },
      {
        name: 'recordType with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174014',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'report.pdf',
          filePath: '/path/to/report.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174015',
          recordType: 'R'.repeat(64),
        },
      },
      {
        name: 'uploadedByUserId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174016',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'user_doc.txt',
          filePath: '/path/to/user_doc.txt',
          recordId: '123e4567-e89b-12d3-a456-426614174017',
          recordType: 'UserDoc',
          uploadedByUserId: 'U'.repeat(255),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174018',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'minimal.txt',
          filePath: '/path/to/minimal.txt',
          recordId: '123e4567-e89b-12d3-a456-426614174019',
          recordType: 'Minimal',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => DocumentSchema.parse(input)).not.toThrow();
      const result = DocumentSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing documentType',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError:
          'Invalid option: expected one of "bol"|"commercial-invoice"|"credit-note"|"customs-declaration"|"packing-list"|"proof-of-delivery"|"receipt"|"shipping-label"',
      },
      {
        name: 'invalid documentType enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: 'invalid-type',
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError:
          'Invalid option: expected one of "bol"|"commercial-invoice"|"credit-note"|"customs-declaration"|"packing-list"|"proof-of-delivery"|"receipt"|"shipping-label"',
      },
      {
        name: 'missing fileName',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'fileName too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: '',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'File name is required',
      },
      {
        name: 'fileName too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'F'.repeat(256),
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'File name must be at most 255 characters',
      },
      {
        name: 'missing filePath',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'filePath too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'File path is required',
      },
      {
        name: 'filePath too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/P'.repeat(513),
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
        },
        expectedError: 'File path must be at most 1024 characters',
      },
      {
        name: 'fileSize less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          fileSize: -1,
        },
        expectedError: 'File size must be at least 0',
      },
      {
        name: 'fileSize greater than 100,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          fileSize: 100000001,
        },
        expectedError: 'File size must be at most 100,000,000',
      },
      {
        name: 'mimeType too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          mimeType: '',
        },
        expectedError: 'MIME type is required',
      },
      {
        name: 'mimeType too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          mimeType: 'M'.repeat(128),
        },
        expectedError: 'MIME type must be at most 127 characters',
      },
      {
        name: 'missing recordId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordType: 'Payment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid recordId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: 'invalid-uuid',
          recordType: 'Payment',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing recordType',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'recordType too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: '',
        },
        expectedError: 'Record type is required',
      },
      {
        name: 'recordType too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'R'.repeat(65),
        },
        expectedError: 'Record type must be at most 64 characters',
      },
      {
        name: 'uploadedByUserId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          uploadedByUserId: '',
        },
        expectedError: 'Uploaded by user ID is required',
      },
      {
        name: 'uploadedByUserId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          uploadedByUserId: 'U'.repeat(256),
        },
        expectedError: 'Uploaded by user ID must be at most 255 characters',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'receipt.pdf',
          filePath: '/path/to/receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Payment',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          DocumentSchema.parse(input);
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

  describe('SafeParse Tests for DocumentSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        documentType: BillingDocumentTypeEnum.Receipt,
        fileName: 'receipt.pdf',
        filePath: '/path/to/receipt.pdf',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: 'Payment',
      };
      const result = DocumentSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        documentType: BillingDocumentTypeEnum.Receipt,
        fileName: 'receipt.pdf',
        filePath: '/path/to/receipt.pdf',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: 'Payment',
      };
      const result = DocumentSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('BillingDocumentInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          documentType: BillingDocumentTypeEnum.CommercialInvoice,
          fileName: 'new_commercial_invoice_' + 'f'.repeat(220) + '.pdf',
          filePath:
            '/path/to/new_invoices/commercial_invoice_' +
            'g'.repeat(960) +
            '.pdf',
          fileSize: 50000000,
          mimeType: 'application/json-' + 'h'.repeat(109),
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'NewInvoice-' + 'i'.repeat(52),
          uploadedByUserId: 'new-user-upload-123-' + 'j'.repeat(220),
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => DocumentInsertSchema.parse(input)).not.toThrow();
      const result = DocumentInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing documentType',
        input: {
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
        },
        expectedError:
          'Invalid option: expected one of "bol"|"commercial-invoice"|"credit-note"|"customs-declaration"|"packing-list"|"proof-of-delivery"|"receipt"|"shipping-label"',
      },
      {
        name: 'missing fileName',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing filePath',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing recordId',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordType: 'NewPayment',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing recordType',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'fileName too long',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'F'.repeat(256),
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
        },
        expectedError: 'File name must be at most 255 characters',
      },
      {
        name: 'filePath too long',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/P'.repeat(513),
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
        },
        expectedError: 'File path must be at most 1024 characters',
      },
      {
        name: 'fileSize less than 0',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
          fileSize: -1,
        },
        expectedError: 'File size must be at least 0',
      },
      {
        name: 'mimeType too long',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
          mimeType: 'M'.repeat(128),
        },
        expectedError: 'MIME type must be at most 127 characters',
      },
      {
        name: 'uploadedByUserId too long',
        input: {
          documentType: BillingDocumentTypeEnum.Receipt,
          fileName: 'new_receipt.pdf',
          filePath: '/path/to/new_receipt.pdf',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'NewPayment',
          uploadedByUserId: 'U'.repeat(256),
        },
        expectedError: 'Uploaded by user ID must be at most 255 characters',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          DocumentInsertSchema.parse(input);
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

  describe('SafeParse Tests for DocumentInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        documentType: BillingDocumentTypeEnum.Receipt,
        fileName: 'new_receipt.pdf',
        filePath: '/path/to/new_receipt.pdf',
        recordId: '123e4567-e89b-12d3-a456-426614174000',
        recordType: 'NewPayment',
      };
      const result = DocumentInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        documentType: BillingDocumentTypeEnum.Receipt,
        fileName: 'new_receipt.pdf',
        filePath: '/path/to/new_receipt.pdf',
        recordId: '123e4567-e89b-12d3-a456-426614174000',
        recordType: 'NewPayment',
        fileSize: -1,
      };
      const result = DocumentInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('BillingDocumentUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only fileName',
        input: {
          fileName: 'updated_file.pdf',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          documentType: BillingDocumentTypeEnum.CustomsDeclaration,
          fileName: 'updated_commercial_invoice_' + 'k'.repeat(210) + '.pdf',
          filePath:
            '/path/to/updated_invoices/commercial_invoice_' +
            'l'.repeat(950) +
            '.pdf',
          fileSize: 10000000,
          mimeType: 'image/jpeg-' + 'm'.repeat(110),
          recordId: '123e4567-e89b-12d3-a456-426614174004',
          recordType: 'UpdatedInvoice-' + 'n'.repeat(45),
          uploadedByUserId: 'updated-user-upload-123-' + 'o'.repeat(210),
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => DocumentUpdateSchema.parse(input)).not.toThrow();
      const result = DocumentUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'documentType invalid enum value',
        input: {
          documentType: 'invalid-type',
        },
        expectedError:
          'Invalid option: expected one of "bol"|"commercial-invoice"|"credit-note"|"customs-declaration"|"packing-list"|"proof-of-delivery"|"receipt"|"shipping-label"',
      },
      {
        name: 'fileName too long',
        input: {
          fileName: 'F'.repeat(256),
        },
        expectedError: 'File name must be at most 255 characters',
      },
      {
        name: 'filePath too long',
        input: {
          filePath: '/P'.repeat(513),
        },
        expectedError: 'File path must be at most 1024 characters',
      },
      {
        name: 'fileSize greater than 100,000,000',
        input: {
          fileSize: 100000001,
        },
        expectedError: 'File size must be at most 100,000,000',
      },
      {
        name: 'mimeType too long',
        input: {
          mimeType: 'M'.repeat(128),
        },
        expectedError: 'MIME type must be at most 127 characters',
      },
      {
        name: 'recordType too long',
        input: {
          recordType: 'R'.repeat(65),
        },
        expectedError: 'Record type must be at most 64 characters',
      },
      {
        name: 'uploadedByUserId too long',
        input: {
          uploadedByUserId: 'U'.repeat(256),
        },
        expectedError: 'Uploaded by user ID must be at most 255 characters',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          DocumentUpdateSchema.parse(input);
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

  describe('SafeParse Tests for DocumentUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        fileName: 'updated_file.pdf',
      };
      const result = DocumentUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        fileSize: -1,
      };
      const result = DocumentUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
