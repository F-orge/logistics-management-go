import { describe, expect, test } from 'bun:test'
import { ZodError } from 'zod'
import { BillingPaymentMethodEnum, BillingPaymentStatusEnum } from '@/db.types'
import { PaymentInsertSchema, PaymentSchema, PaymentUpdateSchema } from './payment'

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-5][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/

describe('BillingPaymentSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100.5,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          amount: 10000000,
          createdAt: new Date('2023-01-01T10:00:00Z'),
          currency: 'PHP',
          exchangeRate: 1000,
          fees: 100000,
          gatewayReference: 'GW-REF-123-' + 'a'.repeat(235),
          invoiceId: '123e4567-e89b-12d3-a456-426614174003',
          netAmount: 10000000,
          notes: 'Payment notes ' + 'b'.repeat(1009),
          paymentDate: new Date('2023-01-01T09:00:00Z'),
          paymentMethod: BillingPaymentMethodEnum.BankTransfer,
          processedAt: new Date('2023-01-01T11:00:00Z'),
          processedByUserId: 'user-proc-123-' + 'c'.repeat(235),
          status: BillingPaymentStatusEnum.Successful,
          transactionId: '123e4567-e89b-12d3-a456-426614174004',
          updatedAt: new Date('2023-01-01T12:00:00Z'),
        },
      },
      {
        name: 'amount at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174005',
          amount: 0,
          invoiceId: '123e4567-e89b-12d3-a456-426614174006',
          paymentMethod: BillingPaymentMethodEnum.Cash,
        },
      },
      {
        name: 'amount at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174007',
          amount: 10000000,
          invoiceId: '123e4567-e89b-12d3-a456-426614174008',
          paymentMethod: BillingPaymentMethodEnum.Check,
        },
      },
      {
        name: 'currency with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174009',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174010',
          paymentMethod: BillingPaymentMethodEnum.ClientCredit,
          currency: 'C'.repeat(8),
        },
      },
      {
        name: 'exchangeRate at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174011',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174012',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          exchangeRate: 0,
        },
      },
      {
        name: 'exchangeRate at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174013',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174014',
          paymentMethod: BillingPaymentMethodEnum.DebitCard,
          exchangeRate: 1000,
        },
      },
      {
        name: 'fees at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174015',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174016',
          paymentMethod: BillingPaymentMethodEnum.QrPh,
          fees: 0,
        },
      },
      {
        name: 'fees at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174017',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174018',
          paymentMethod: BillingPaymentMethodEnum.Wallet,
          fees: 100000,
        },
      },
      {
        name: 'gatewayReference with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174019',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174020',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          gatewayReference: 'G'.repeat(255),
        },
      },
      {
        name: 'netAmount at minimum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174021',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174022',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          netAmount: 0,
        },
      },
      {
        name: 'netAmount at maximum boundary',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174023',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174024',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          netAmount: 10000000,
        },
      },
      {
        name: 'notes with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174025',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174026',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          notes: 'N'.repeat(1024),
        },
      },
      {
        name: 'processedByUserId with max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174027',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174028',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          processedByUserId: 'U'.repeat(255),
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174029',
          amount: 1.0,
          invoiceId: '123e4567-e89b-12d3-a456-426614174030',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => PaymentSchema.parse(input)).not.toThrow()
      const result = PaymentSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing amount',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'amount less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: -0.01,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'amount greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 10000000.01,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Amount must be at most 10,000,000',
      },
      {
        name: 'createdAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'currency too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          currency: '',
        },
        expectedError: 'Currency is required',
      },
      {
        name: 'currency too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          currency: 'C'.repeat(9),
        },
        expectedError: 'Currency must be at most 8 characters',
      },
      {
        name: 'exchangeRate less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          exchangeRate: -0.01,
        },
        expectedError: 'Exchange rate must be at least 0',
      },
      {
        name: 'exchangeRate greater than 1000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          exchangeRate: 1000.01,
        },
        expectedError: 'Exchange rate must be at most 1000',
      },
      {
        name: 'fees less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          fees: -0.01,
        },
        expectedError: 'Fees must be at least 0',
      },
      {
        name: 'fees greater than 100,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          fees: 100000.01,
        },
        expectedError: 'Fees must be at most 100,000',
      },
      {
        name: 'gatewayReference too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          gatewayReference: '',
        },
        expectedError: 'Gateway reference is required',
      },
      {
        name: 'gatewayReference too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          gatewayReference: 'G'.repeat(256),
        },
        expectedError: 'Gateway reference must be at most 255 characters',
      },
      {
        name: 'missing invoiceId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid invoiceId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: 'invalid-uuid',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'netAmount less than 0',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          netAmount: -0.01,
        },
        expectedError: 'Net amount must be at least 0',
      },
      {
        name: 'netAmount greater than 10,000,000',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          netAmount: 10000000.01,
        },
        expectedError: 'Net amount must be at most 10,000,000',
      },
      {
        name: 'notes too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          notes: '',
        },
        expectedError: 'Notes are required',
      },
      {
        name: 'notes too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          notes: 'N'.repeat(1025),
        },
        expectedError: 'Notes must be at most 1024 characters',
      },
      {
        name: 'paymentDate invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          paymentDate: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'missing paymentMethod',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError:
          'Invalid option: expected one of "bank-transfer"|"cash"|"check"|"client-credit"|"credit-card"|"debit-card"|"qr-ph"|"wallet"',
      },
      {
        name: 'invalid paymentMethod enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: 'invalid-method',
        },
        expectedError:
          'Invalid option: expected one of "bank-transfer"|"cash"|"check"|"client-credit"|"credit-card"|"debit-card"|"qr-ph"|"wallet"',
      },
      {
        name: 'processedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          processedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'processedByUserId too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          processedByUserId: '',
        },
        expectedError: 'Processed by user ID is required',
      },
      {
        name: 'processedByUserId too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          processedByUserId: 'U'.repeat(256),
        },
        expectedError: 'Processed by user ID must be at most 255 characters',
      },
      {
        name: 'status invalid enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          status: 'invalid-status',
        },
        expectedError:
          'Invalid option: expected one of "cancelled"|"failed"|"pending"|"processing"|"refunded"|"successful"',
      },
      {
        name: 'transactionId invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          transactionId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'updatedAt invalid format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          updatedAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        PaymentSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for PaymentSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        amount: 100.5,
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        paymentMethod: BillingPaymentMethodEnum.CreditCard,
      }
      const result = PaymentSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        amount: 100,
        invoiceId: '123e4567-e89b-12d3-a456-426614174001',
        paymentMethod: BillingPaymentMethodEnum.CreditCard,
      }
      const result = PaymentSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingPaymentInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          amount: 100.5,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.DebitCard,
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          amount: 5000000,
          currency: 'EUR',
          exchangeRate: 500,
          fees: 50000,
          gatewayReference: 'GW-INS-REF-123-' + 'd'.repeat(229),
          invoiceId: '123e4567-e89b-12d3-a456-426614174001',
          netAmount: 4950000,
          notes: 'Insert payment notes ' + 'e'.repeat(1000),
          paymentDate: new Date('2023-01-02T09:00:00Z'),
          paymentMethod: BillingPaymentMethodEnum.QrPh,
          processedAt: new Date('2023-01-02T11:00:00Z'),
          processedByUserId: 'user-insert-proc-123-' + 'f'.repeat(220),
          status: BillingPaymentStatusEnum.Pending,
          transactionId: '123e4567-e89b-12d3-a456-426614174002',
        },
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => PaymentInsertSchema.parse(input)).not.toThrow()
      const result = PaymentInsertSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing amount',
        input: {
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing invoiceId',
        input: {
          amount: 100,
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing paymentMethod',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
        },
        expectedError:
          'Invalid option: expected one of "bank-transfer"|"cash"|"check"|"client-credit"|"credit-card"|"debit-card"|"qr-ph"|"wallet"',
      },
      {
        name: 'amount less than 0',
        input: {
          amount: -1,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'currency too long',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          currency: 'C'.repeat(9),
        },
        expectedError: 'Currency must be at most 8 characters',
      },
      {
        name: 'exchangeRate greater than 1000',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          exchangeRate: 1000.01,
        },
        expectedError: 'Exchange rate must be at most 1000',
      },
      {
        name: 'fees greater than 100,000',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          fees: 100000.01,
        },
        expectedError: 'Fees must be at most 100,000',
      },
      {
        name: 'gatewayReference too long',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          gatewayReference: 'G'.repeat(256),
        },
        expectedError: 'Gateway reference must be at most 255 characters',
      },
      {
        name: 'netAmount greater than 10,000,000',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          netAmount: 10000000.01,
        },
        expectedError: 'Net amount must be at most 10,000,000',
      },
      {
        name: 'notes too long',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          notes: 'N'.repeat(1025),
        },
        expectedError: 'Notes must be at most 1024 characters',
      },
      {
        name: 'paymentMethod invalid enum value',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: 'invalid-method',
          transactionId: '123e4567-e89b-12d3-a456-426614174000',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'processedByUserId too long',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          processedByUserId: 'U'.repeat(256),
        },
        expectedError: 'Processed by user ID must be at most 255 characters',
      },
      {
        name: 'status invalid enum value',
        input: {
          amount: 100,
          invoiceId: '123e4567-e89b-12d3-a456-426614174000',
          paymentMethod: BillingPaymentMethodEnum.CreditCard,
          status: 'invalid-status',
        },
        expectedError:
          'Invalid option: expected one of "cancelled"|"failed"|"pending"|"processing"|"refunded"|"successful"',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        PaymentInsertSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      expect(error?.issues[0]?.message).toContain(expectedError)
    })
  })

  describe('SafeParse Tests for PaymentInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        amount: 100.5,
        invoiceId: '123e4567-e89b-12d3-a456-426614174000',
        paymentMethod: BillingPaymentMethodEnum.DebitCard,
      }
      const result = PaymentInsertSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        amount: -1, // Invalid amount
        invoiceId: '123e4567-e89b-12d3-a456-426614174000',
        paymentMethod: BillingPaymentMethodEnum.CreditCard,
      }
      const result = PaymentInsertSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})

describe('BillingPaymentUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only amount',
        input: {
          amount: 200.75,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          amount: 5000000,
          currency: 'GBP',
          exchangeRate: 500,
          fees: 50000,
          gatewayReference: 'GW-UPD-REF-123-' + 'g'.repeat(229),
          invoiceId: '123e4567-e89b-12d3-a456-426614174003',
          netAmount: 4950000,
          notes: 'Update payment notes ' + 'h'.repeat(1000),
          paymentDate: new Date('2023-01-03T09:00:00Z'),
          paymentMethod: BillingPaymentMethodEnum.Wallet,
          processedAt: new Date('2023-01-03T11:00:00Z'),
          processedByUserId: 'user-update-proc-123-' + 'i'.repeat(220),
          status: BillingPaymentStatusEnum.Successful,
          transactionId: '123e4567-e89b-12d3-a456-426614174004',
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ]

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => PaymentUpdateSchema.parse(input)).not.toThrow()
      const result = PaymentUpdateSchema.parse(input)
      expect(result).toEqual(expect.objectContaining(input))
    })
  })

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'amount less than 0',
        input: {
          amount: -1,
        },
        expectedError: 'Amount must be at least 0',
      },
      {
        name: 'currency too long',
        input: {
          currency: 'C'.repeat(9),
        },
        expectedError: 'Currency must be at most 8 characters',
      },
      {
        name: 'exchangeRate greater than 1000',
        input: {
          exchangeRate: 1000.01,
        },
        expectedError: 'Exchange rate must be at most 1000',
      },
      {
        name: 'fees greater than 100,000',
        input: {
          fees: 100000.01,
        },
        expectedError: 'Fees must be at most 100,000',
      },
      {
        name: 'gatewayReference too long',
        input: {
          gatewayReference: 'G'.repeat(256),
        },
        expectedError: 'Gateway reference must be at most 255 characters',
      },
      {
        name: 'netAmount greater than 10,000,000',
        input: {
          netAmount: 10000000.01,
        },
        expectedError: 'Net amount must be at most 10,000,000',
      },
      {
        name: 'notes too long',
        input: {
          notes: 'N'.repeat(1025),
        },
        expectedError: 'Notes must be at most 1024 characters',
      },
      {
        name: 'paymentMethod invalid enum value',
        input: {
          paymentMethod: 'invalid-method',
        },
        expectedError:
          'Invalid option: expected one of "bank-transfer"|"cash"|"check"|"client-credit"|"credit-card"|"debit-card"|"qr-ph"|"wallet"',
      },
      {
        name: 'processedByUserId too long',
        input: {
          processedByUserId: 'U'.repeat(256),
        },
        expectedError: 'Processed by user ID must be at most 255 characters',
      },
      {
        name: 'status invalid enum value',
        input: {
          status: 'invalid-status',
        },
        expectedError:
          'Invalid option: expected one of "cancelled"|"failed"|"pending"|"processing"|"refunded"|"successful"',
      },
      {
        name: 'transactionId invalid format',
        input: {
          transactionId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID',
      },
    ]

    test.each(invalidTestCases)('should reject: $name', ({ input, expectedError }) => {
      let error: ZodError | undefined
      try {
        PaymentUpdateSchema.parse(input)
      } catch (e) {
        if (e instanceof ZodError) {
          error = e
        }
      }
      expect(error).toBeInstanceOf(ZodError)
      for (const issue of error?.issues || []) {
        expect(issue.message).toContain(expectedError)
      }
    })
  })

  describe('SafeParse Tests for PaymentUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        amount: 100.5,
      }
      const result = PaymentUpdateSchema.safeParse(validData)

      expect(result.success).toBe(true)
      if (result.success) {
        expect(result.data).toEqual(validData)
      }
    })

    test('should return error for invalid data', () => {
      const invalidData = {
        amount: -1, // Invalid amount
      }
      const result = PaymentUpdateSchema.safeParse(invalidData)

      expect(result.success).toBe(false)
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError)
        expect(result.error.issues.length).toBeGreaterThan(0)
      }
    })
  })
})
