import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  VehicleSchema,
  VehicleInsertSchema,
  VehicleUpdateSchema
} from './vehicle';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('VehicleSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => VehicleSchema.parse(input)).not.toThrow();
      const result = VehicleSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe('Invalid Cases', () => {
    const invalidTestCases:InvalidCase[] = [];

    test.each(invalidTestCases)(
      'should reject: $name',
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          VehicleSchema.parse(input);
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
});
