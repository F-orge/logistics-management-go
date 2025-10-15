import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { CaseSchema } from './cases'

// Define enums for testing purposes, mirroring the original enums from @/db.types
enum CrmCasePriority {
  Critical = 'critical',
  High = 'high',
  Low = 'low',
  Medium = 'medium',
}

enum CrmCaseStatus {
  Cancelled = 'cancelled',
  Closed = 'closed',
  Escalated = 'escalated',
  InProgress = 'in-progress',
  New = 'new',
  Resolved = 'resolved',
  WaitingForCustomer = 'waiting-for-customer',
  WaitingForInternal = 'waiting-for-internal',
}

enum CrmCaseType {
  BugReport = 'bug-report',
  Complaint = 'complaint',
  FeatureRequest = 'feature-request',
  Problem = 'problem',
  Question = 'question',
  TechnicalSupport = 'technical-support',
}

describe('CrmCaseSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174001',
          caseNumber: 'CASE-002',
          contactId: '123e4567-e89b-12d3-a456-426614174002',
          description: 'Customer reported a bug in the system.',
          ownerId: 'user-456',
          priority: CrmCasePriority.High,
          status: CrmCaseStatus.InProgress,
          type: CrmCaseType.BugReport,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          updatedAt: new Date('2023-01-01T11:00:00Z'),
        },
      },
      {
        name: 'case number with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174003',
          caseNumber: 'A'.repeat(127),
          ownerId: 'user-789',
        },
      },
      {
        name: 'description with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          caseNumber: 'CASE-004',
          description: 'D'.repeat(1024),
          ownerId: 'user-abc',
        },
      },
      {
        name: 'ownerId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          caseNumber: 'CASE-005',
          ownerId: 'O'.repeat(255),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          caseNumber: 'CASE-006',
          ownerId: 'user-xyz',
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => CaseSchema.parse(input)).not.toThrow()
      const result = CaseSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for ID',
      },
      {
        name: 'missing caseNumber',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          ownerId: 'user-123',
        },
        expectedError: 'Case number must be a string',
      },
      {
        name: 'caseNumber too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: '',
          ownerId: 'user-123',
        },
        expectedError: 'Case number is required',
      },
      {
        name: 'caseNumber too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'A'.repeat(128),
          ownerId: 'user-123',
        },
        expectedError: 'Case number must be at most 127 characters',
      },
      {
        name: 'caseNumber wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 123,
          ownerId: 'user-123',
        },
        expectedError: 'Case number must be a string',
      },
      {
        name: 'invalid contactId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          contactId: 'invalid-uuid',
          ownerId: 'user-123',
        },
        expectedError: 'Invalid UUID format for contact ID',
      },
      {
        name: 'description too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          description: '',
          ownerId: 'user-123',
        },
        expectedError: 'Description is required',
      },
      {
        name: 'description too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          description: 'D'.repeat(1025),
          ownerId: 'user-123',
        },
        expectedError: 'Description must be at most 1024 characters',
      },
      {
        name: 'description wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          description: 123,
          ownerId: 'user-123',
        },
        expectedError: 'Description must be a string',
      },
      {
        name: 'missing ownerId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'ownerId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: '',
        },
        expectedError: 'Owner ID is required',
      },
      {
        name: 'ownerId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'O'.repeat(256),
        },
        expectedError: 'Owner ID must be at most 255 characters',
      },
      {
        name: 'ownerId wrong type',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 123,
        },
        expectedError: 'Owner ID must be a string',
      },
      {
        name: 'priority invalid enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
          priority: 'invalid-priority',
        },
        expectedError: 'Invalid case priority',
      },
      {
        name: 'status invalid enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
          status: 'invalid-status',
        },
        expectedError: 'Invalid case status',
      },
      {
        name: 'type invalid enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
          type: 'invalid-type',
        },
        expectedError: 'Invalid case type',
      },
      {
        name: 'createdAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for creation date',
      },
      {
        name: 'updatedAt invalid date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          caseNumber: 'CASE-001',
          ownerId: 'user-123',
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid ISO datetime format for update date',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        CaseSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for CaseSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        caseNumber: 'CASE-VALID',
        ownerId: 'user-valid',
      }
      const result = CaseSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        caseNumber: 'CASE-INVALID',
        ownerId: 'user-invalid',
      }
      const result = CaseSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
