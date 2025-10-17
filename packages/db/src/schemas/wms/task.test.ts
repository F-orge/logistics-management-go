import { describe, expect, test } from 'bun:test';
import { ZodError } from 'zod';
import {
  TaskSchema,
  TaskInsertSchema,
  TaskUpdateSchema
} from './task';

interface ValidCase {
  name:string,
  input:any,
}

interface InvalidCase {
  name:string,
  input:any,
  expectedError:string;
}

describe('TaskSchema Validation', () => {
  describe('Valid Cases', () => {
    const validTestCases:ValidCase[] = [];

    test.each(validTestCases)('should validate: $name', ({ input }) => {
      expect(() => TaskSchema.parse(input)).not.toThrow();
      const result = TaskSchema.parse(input);
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
          TaskSchema.parse(input);
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
