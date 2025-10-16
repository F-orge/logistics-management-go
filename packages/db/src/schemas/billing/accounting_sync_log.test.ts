import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { BillingSyncStatusEnum } from '../../db.types'
import {
  AccountingSyncLogInsertSchema,
  AccountingSyncLogSchema,
  AccountingSyncLogUpdateSchema,
} from './accounting_sync_log'

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

describe('BillingAccountingSyncLogSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          errorMessage: 'Error message detail ' + 'a'.repeat(999),
          externalId: '123e4567-e89b-12d3-a456-426614174003',
          externalSystem: 'Xero-' + 'b'.repeat(59),
          lastSyncAt: new Date('2023-01-01T11:00:00Z'),
          nextRetryAt: new Date('2023-01-01T12:00:00Z'),
          recordId: '123e4567-e89b-12d3-a456-426614174004',
          recordType: 'Payment-' + 'c'.repeat(56),
          requestPayload: 'Request data ' + 'd'.repeat(2035),
          responsePayload: 'Response data ' + 'e'.repeat(2034),
          retryCount: 5,
          status: BillingSyncStatusEnum.Failed,
          updatedAt: new Date('2023-01-01T13:00:00Z'),
        },
      },
      {
        name: 'errorMessage with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          externalSystem: 'SystemA',
          recordId: '123e4567-e89b-12d3-a456-426614174006',
          recordType: 'Order',
          errorMessage: 'E'.repeat(1024),
        },
      },
      {
        name: 'externalSystem with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          externalSystem: 'S'.repeat(64),
          recordId: '123e4567-e89b-12d3-a456-426614174008',
          recordType: 'User',
        },
      },
      {
        name: 'recordType with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          externalSystem: 'SystemB',
          recordId: '123e4567-e89b-12d3-a456-426614174010',
          recordType: 'R'.repeat(64),
        },
      },
      {
        name: 'requestPayload with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          externalSystem: 'SystemC',
          recordId: '123e4567-e89b-12d3-a456-426614174012',
          recordType: 'Product',
          requestPayload: 'P'.repeat(2048),
        },
      },
      {
        name: 'responsePayload with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174013',
          externalSystem: 'SystemD',
          recordId: '123e4567-e89b-12d3-a456-426614174014',
          recordType: 'Client',
          responsePayload: 'O'.repeat(2048),
        },
      },
      {
        name: 'retryCount at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174015',
          externalSystem: 'SystemE',
          recordId: '123e4567-e89b-12d3-a456-426614174016',
          recordType: 'Log',
          retryCount: 0,
        },
      },
      {
        name: 'retryCount at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174017',
          externalSystem: 'SystemF',
          recordId: '123e4567-e89b-12d3-a456-426614174018',
          recordType: 'Event',
          retryCount: 100,
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174019',
          externalSystem: 'SystemG',
          recordId: '123e4567-e89b-12d3-a456-426614174020',
          recordType: 'Report',
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => AccountingSyncLogSchema.parse(input)).not.toThrow()
      const result = AccountingSyncLogSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'errorMessage too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          errorMessage: '',
        },
        expectedError: 'Error message is required',
      },
      {
        name: 'errorMessage too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          errorMessage: 'E'.repeat(1025),
        },
        expectedError: 'Error message must be at most 1024 characters',
      },
      {
        name: 'externalId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          externalId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing externalSystem',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'externalSystem too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: '',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
        },
        expectedError: 'External system is required',
      },
      {
        name: 'externalSystem too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'E'.repeat(65),
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
        },
        expectedError: 'External system must be at most 64 characters',
      },
      {
        name: 'lastSyncAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          lastSyncAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'nextRetryAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          nextRetryAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'missing recordId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordType: 'Invoice',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid recordId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: 'invalid-uuid',
          recordType: 'Invoice',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing recordType',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'recordType too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: '',
        },
        expectedError: 'Record type is required',
      },
      {
        name: 'recordType too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'R'.repeat(65),
        },
        expectedError: 'Record type must be at most 64 characters',
      },
      {
        name: 'requestPayload too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          requestPayload: '',
        },
        expectedError: 'Request payload is required',
      },
      {
        name: 'requestPayload too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          requestPayload: 'P'.repeat(2049),
        },
        expectedError: 'Request payload must be at most 2048 characters',
      },
      {
        name: 'responsePayload too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          responsePayload: '',
        },
        expectedError: 'Response payload is required',
      },
      {
        name: 'responsePayload too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          responsePayload: 'O'.repeat(2049),
        },
        expectedError: 'Response payload must be at most 2048 characters',
      },
      {
        name: 'retryCount less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          retryCount: -1,
        },
        expectedError: 'Retry count must be at least 0',
      },
      {
        name: 'retryCount greater than 100',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          retryCount: 101,
        },
        expectedError: 'Retry count must be at most 100',
      },
      {
        name: 'status invalid enum value',
        expectedError: 'Invalid input',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'QuickBooks',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Invoice',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        AccountingSyncLogSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for AccountingSyncLogSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        externalSystem: 'QuickBooks',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: 'Invoice',
      }
      const result = AccountingSyncLogSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        externalSystem: 'QuickBooks',
        recordId: '123e4567-e89b-12d3-a456-426614174001',
        recordType: 'Invoice',
      }
      const result = AccountingSyncLogSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingAccountingSyncLogInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          externalSystem: 'Xero',
          recordId: '123e4567-e89b-12d3-a456-426614174000',
          recordType: 'Bill',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          errorMessage: 'Insert error message ' + 'a'.repeat(999),
          externalId: '123e4567-e89b-12d3-a456-426614174001',
          externalSystem: 'Sage-' + 'b'.repeat(59),
          lastSyncAt: new Date('2023-01-02T10:00:00Z'),
          nextRetryAt: new Date('2023-01-02T11:00:00Z'),
          recordId: '123e4567-e89b-12d3-a456-426614174002',
          recordType: 'Journal-' + 'c'.repeat(56),
          requestPayload: 'Insert request data ' + 'd'.repeat(2028),
          responsePayload: 'Insert response data ' + 'e'.repeat(2027),
          retryCount: 10,
          status: BillingSyncStatusEnum.InProgress,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => AccountingSyncLogInsertSchema.parse(input)).not.toThrow()
      const result = AccountingSyncLogInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing externalSystem',
        input: {
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Bill',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing recordId',
        input: {
          externalSystem: 'Xero',
          recordType: 'Bill',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing recordType',
        input: {
          externalSystem: 'Xero',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'errorMessage too long',
        input: {
          externalSystem: 'Xero',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Bill',
          errorMessage: 'E'.repeat(1025),
        },
        expectedError: 'Error message must be at most 1024 characters',
      },
      {
        name: 'retryCount greater than 100',
        input: {
          externalSystem: 'Xero',
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'Bill',
          retryCount: 101,
        },
        expectedError: 'Retry count must be at most 100',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        AccountingSyncLogInsertSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for AccountingSyncLogInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        externalSystem: 'Xero',
        recordId: '123e4567-e89b-12d3-a456-426614174000',
        recordType: 'Bill',
      }
      const result = AccountingSyncLogInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        retryCount: -1,
      }
      const result = AccountingSyncLogInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingAccountingSyncLogUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only errorMessage',
        input: {
          errorMessage: 'Updated error message',
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          errorMessage: 'Updated error message ' + 'f'.repeat(999),
          externalId: '123e4567-e89b-12d3-a456-426614174000',
          externalSystem: 'UpdatedSystem-' + 'g'.repeat(49),
          lastSyncAt: new Date('2023-01-03T10:00:00Z'),
          nextRetryAt: new Date('2023-01-03T11:00:00Z'),
          recordId: '123e4567-e89b-12d3-a456-426614174001',
          recordType: 'UpdatedRecord-' + 'h'.repeat(48),
          requestPayload: 'Updated request data ' + 'i'.repeat(2027),
          responsePayload: 'Updated response data ' + 'j'.repeat(2026),
          retryCount: 50,
          status: BillingSyncStatusEnum.Success,
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => AccountingSyncLogUpdateSchema.parse(input)).not.toThrow()
      const result = AccountingSyncLogUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'errorMessage too long',
        input: {
          errorMessage: 'E'.repeat(1025),
        },
        expectedError: 'Error message must be at most 1024 characters',
      },
      {
        name: 'externalSystem too long',
        input: {
          externalSystem: 'E'.repeat(65),
        },
        expectedError: 'External system must be at most 64 characters',
      },
      {
        name: 'recordType too long',
        input: {
          recordType: 'R'.repeat(65),
        },
        expectedError: 'Record type must be at most 64 characters',
      },
      {
        name: 'requestPayload too long',
        input: {
          requestPayload: 'P'.repeat(2049),
        },
        expectedError: 'Request payload must be at most 2048 characters',
      },
      {
        name: 'responsePayload too long',
        input: {
          responsePayload: 'O'.repeat(2049),
        },
        expectedError: 'Response payload must be at most 2048 characters',
      },
      {
        name: 'retryCount greater than 100',
        input: {
          retryCount: 101,
        },
        expectedError: 'Retry count must be at most 100',
      },
      {
        name: 'status invalid enum value',
        input: {
          status: 'invalid-status',
        },
        expectedError:
          'Invalid option: expected one of "failed"|"in-progress"|"pending"|"retry"|"success"',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        AccountingSyncLogUpdateSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for AccountingSyncLogUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        errorMessage: 'Valid update',
      }
      const result = AccountingSyncLogUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        retryCount: -1,
      }
      const result = AccountingSyncLogUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
