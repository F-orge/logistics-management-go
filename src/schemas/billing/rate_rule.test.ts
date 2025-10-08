import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import { BillingPricingModelEnum } from '@/db/types';
import {
  billingRateRuleInsertSchema,
  billingRateRuleSchema,
  billingRateRuleUpdateSchema,
} from './rate_rule';

const UUID_REGEX =
  /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;

describe('BillingRateRuleSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
      },
      {
        name: 'complete valid data',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174002',
          condition: 'volume_lt',
          createdAt: new Date('2023-01-01T10:00:00Z'),
          isActive: true,
          maxValue: 1000.0,
          minValue: 10.0,
          price: 25.75,
          pricingModel: BillingPricingModelEnum.PerCubicMeter,
          priority: 10,
          rateCardId: '123e4567-e89b-12d3-a456-426614174003',
          updatedAt: new Date('2023-01-01T11:00:00Z'),
          value: '50cbm',
        },
      },
      {
        name: 'all optional fields absent',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174004',
          condition: 'zone_eq',
          price: 5.0,
          pricingModel: BillingPricingModelEnum.PerZone,
          rateCardId: '123e4567-e89b-12d3-a456-426614174005',
          value: 'Zone A',
        },
      },
      {
        name: 'condition max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174006',
          condition: 'C'.repeat(255),
          price: 1.0,
          pricingModel: BillingPricingModelEnum.PerItem,
          rateCardId: '123e4567-e89b-12d3-a456-426614174007',
          value: 'item',
        },
      },
      {
        name: 'value max length',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174008',
          condition: 'item_type',
          price: 2.0,
          pricingModel: BillingPricingModelEnum.PerItem,
          rateCardId: '123e4567-e89b-12d3-a456-426614174009',
          value: 'V'.repeat(255),
        },
      },
      {
        name: 'price at min and max values',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174100',
          condition: 'test_price_min',
          price: 0,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174101',
          value: 'min_price',
        },
      },
      {
        name: 'price at max value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174102',
          condition: 'test_price_max',
          price: 10000000,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174103',
          value: 'max_price',
        },
      },
      {
        name: 'minValue and maxValue at boundaries',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174104',
          condition: 'range_test',
          minValue: 0,
          maxValue: 10000000,
          price: 50.0,
          pricingModel: BillingPricingModelEnum.Percentage,
          rateCardId: '123e4567-e89b-12d3-a456-426614174105',
          value: 'range',
        },
      },
      {
        name: 'priority at boundaries',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174106',
          condition: 'priority_test',
          price: 10.0,
          pricingModel: BillingPricingModelEnum.Tiered,
          priority: 0,
          rateCardId: '123e4567-e89b-12d3-a456-426614174107',
          value: 'priority_min',
        },
      },
      {
        name: 'priority at max value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174108',
          condition: 'priority_test_max',
          price: 10.0,
          pricingModel: BillingPricingModelEnum.Tiered,
          priority: 1000,
          rateCardId: '123e4567-e89b-12d3-a456-426614174109',
          value: 'priority_max',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingRateRuleSchema.parse(input)).not.toThrow();
      const result = billingRateRuleSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'missing id',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid id format',
        input: {
          id: 'invalid-uuid',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing condition',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'condition too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: '',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Condition is required',
      },
      {
        name: 'condition too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'C'.repeat(256),
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Condition must be at most 255 characters',
      },
      {
        name: 'missing price',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'price negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: -1.0,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Price must be at least 0',
      },
      {
        name: 'price too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10000000.01,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Price must be at most 10,000,000',
      },
      {
        name: 'price wrong type (not coercible)',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 'abc',
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing pricingModel',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'invalid pricingModel enum value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: 'invalid-model',
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'missing rateCardId',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          value: '10kg',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'invalid rateCardId format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: 'invalid-uuid',
          value: '10kg',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'missing value',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'value too short',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '',
        },
        expectedError: 'Value is required',
      },
      {
        name: 'value too long',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: 'V'.repeat(256),
        },
        expectedError: 'Value must be at most 255 characters',
      },
      {
        name: 'maxValue negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'range_test',
          maxValue: -1,
          price: 50.0,
          pricingModel: BillingPricingModelEnum.Percentage,
          rateCardId: '123e4567-e89b-12d3-a456-426614174105',
          value: 'range',
        },
        expectedError: 'Max value must be at least 0',
      },
      {
        name: 'maxValue too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'range_test',
          maxValue: 10000000.01,
          price: 50.0,
          pricingModel: BillingPricingModelEnum.Percentage,
          rateCardId: '123e4567-e89b-12d3-a456-426614174105',
          value: 'range',
        },
        expectedError: 'Max value must be at most 10,000,000',
      },
      {
        name: 'minValue negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'range_test',
          minValue: -1,
          price: 50.0,
          pricingModel: BillingPricingModelEnum.Percentage,
          rateCardId: '123e4567-e89b-12d3-a456-426614174105',
          value: 'range',
        },
        expectedError: 'Min value must be at least 0',
      },
      {
        name: 'minValue too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'range_test',
          minValue: 10000000.01,
          price: 50.0,
          pricingModel: BillingPricingModelEnum.Percentage,
          rateCardId: '123e4567-e89b-12d3-a456-426614174105',
          value: 'range',
        },
        expectedError: 'Min value must be at most 10,000,000',
      },
      {
        name: 'priority negative',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'priority_test',
          price: 10.0,
          pricingModel: BillingPricingModelEnum.Tiered,
          priority: -1,
          rateCardId: '123e4567-e89b-12d3-a456-426614174107',
          value: 'priority_min',
        },
        expectedError: 'Priority must be at least 0',
      },
      {
        name: 'priority too large',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'priority_test',
          price: 10.0,
          pricingModel: BillingPricingModelEnum.Tiered,
          priority: 1001,
          rateCardId: '123e4567-e89b-12d3-a456-426614174107',
          value: 'priority_min',
        },
        expectedError: 'Priority must be at most 1000',
      },
      {
        name: 'invalid createdAt date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'test',
          price: 1.0,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: 'test',
          createdAt: 'not-a-date',
        },
        expectedError: 'Invalid input: expected date, received string',
      },
      {
        name: 'invalid updatedAt date format',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'test',
          price: 1.0,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: 'test',
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
          billingRateRuleSchema.parse(input);
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

  describe('SafeParse Tests for billingRateRuleSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        condition: 'weight_gt',
        price: 10.5,
        pricingModel: BillingPricingModelEnum.FlatRate,
        rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        value: '10kg',
      };
      const result = billingRateRuleSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: 'invalid-uuid',
        condition: 'weight_gt',
        price: 10.5,
        pricingModel: BillingPricingModelEnum.FlatRate,
        rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        value: '10kg',
      };
      const result = billingRateRuleSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('BillingRateRuleInsertSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'minimum valid data (no id, createdAt, updatedAt)',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
      },
      {
        name: 'complete valid data (no id, createdAt, updatedAt)',
        input: {
          condition: 'volume_lt',
          isActive: true,
          maxValue: 1000.0,
          minValue: 10.0,
          price: 25.75,
          pricingModel: BillingPricingModelEnum.PerCubicMeter,
          priority: 10,
          rateCardId: '123e4567-e89b-12d3-a456-426614174003',
          value: '50cbm',
        },
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingRateRuleInsertSchema.parse(input)).not.toThrow();
      const result = billingRateRuleInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'missing condition',
        input: {
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing price',
        input: {
          condition: 'weight_gt',
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid input: expected number, received NaN',
      },
      {
        name: 'missing pricingModel',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'missing rateCardId',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          value: '10kg',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
      {
        name: 'missing value',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        },
        expectedError: 'Invalid input: expected string, received undefined',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          billingRateRuleInsertSchema.parse(input);
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

  describe('SafeParse Tests for billingRateRuleInsertSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        condition: 'weight_gt',
        price: 10.5,
        pricingModel: BillingPricingModelEnum.FlatRate,
        rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        value: '10kg',
      };
      const result = billingRateRuleInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        condition: 'weight_gt',
        price: 10.5,
        pricingModel: BillingPricingModelEnum.FlatRate,
        rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        value: '10kg',
      };
      const result = billingRateRuleInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe('BillingRateRuleUpdateSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases = [
      {
        name: 'partial update: only condition',
        input: {
          condition: 'weight_lt',
        },
      },
      {
        name: 'partial update: only price',
        input: {
          price: 20.0,
        },
      },
      {
        name: 'partial update: all allowed fields',
        input: {
          condition: 'volume_eq',
          isActive: false,
          maxValue: 500.0,
          minValue: 50.0,
          price: 30.0,
          pricingModel: BillingPricingModelEnum.PerKg,
          priority: 50,
          rateCardId: '123e4567-e89b-12d3-a456-426614174000',
          value: '20kg',
        },
      },
      {
        name: 'empty object (no changes)',
        input: {},
      },
    ];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => billingRateRuleUpdateSchema.parse(input)).not.toThrow();
      const result = billingRateRuleUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases = [
      {
        name: 'should reject with id present',
        input: {
          id: '123e4567-e89b-12d3-a456-426614174000',
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
        },
        expectedError: 'Unrecognized key: "id"',
      },
      {
        name: 'should reject with createdAt present',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
          createdAt: new Date(),
        },
        expectedError: 'Unrecognized key: "createdAt"',
      },
      {
        name: 'should reject with updatedAt present',
        input: {
          condition: 'weight_gt',
          price: 10.5,
          pricingModel: BillingPricingModelEnum.FlatRate,
          rateCardId: '123e4567-e89b-12d3-a456-426614174001',
          value: '10kg',
          updatedAt: new Date(),
        },
        expectedError: 'Unrecognized key: "updatedAt"',
      },
      {
        name: 'condition too long',
        input: {
          condition: 'C'.repeat(256),
        },
        expectedError: 'Condition must be at most 255 characters',
      },
      {
        name: 'price negative',
        input: {
          price: -1.0,
        },
        expectedError: 'Price must be at least 0',
      },
      {
        name: 'invalid pricingModel enum value',
        input: {
          pricingModel: 'invalid-model',
        },
        expectedError: 'Invalid option',
      },
      {
        name: 'invalid rateCardId format',
        input: {
          rateCardId: 'invalid-uuid',
        },
        expectedError: 'Invalid UUID',
      },
      {
        name: 'value too long',
        input: {
          value: 'V'.repeat(256),
        },
        expectedError: 'Value must be at most 255 characters',
      },
      {
        name: 'maxValue negative',
        input: {
          maxValue: -1,
        },
        expectedError: 'Max value must be at least 0',
      },
      {
        name: 'minValue too large',
        input: {
          minValue: 10000000.01,
        },
        expectedError: 'Min value must be at most 10,000,000',
      },
      {
        name: 'priority too large',
        input: {
          priority: 1001,
        },
        expectedError: 'Priority must be at most 1000',
      },
    ];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          billingRateRuleUpdateSchema.parse(input);
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

  describe('SafeParse Tests for billingRateRuleUpdateSchema', () => {
    test('should return success for valid data', () => {
      const validData = {
        condition: 'weight_lt',
        price: 20.0,
        pricingModel: BillingPricingModelEnum.FlatRate,
        rateCardId: '123e4567-e89b-12d3-a456-426614174000',
        value: '10kg',
      };
      const result = billingRateRuleUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test('should return error for invalid data', () => {
      const invalidData = {
        id: '123e4567-e89b-12d3-a456-426614174000',
        condition: 'weight_gt',
        price: 10.5,
        pricingModel: BillingPricingModelEnum.FlatRate,
        rateCardId: '123e4567-e89b-12d3-a456-426614174001',
        value: '10kg',
      };
      const result = billingRateRuleUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
