import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import { crmTagSchema, crmTagInsertSchema, crmTagUpdateSchema } from "./tags";

describe("CrmTagSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Tag A",
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174001",
          name: "Long Tag Name " + "L".repeat(112), // 14 + 112 = 126 chars
          createdAt: new Date("2023-01-01T10:00:00Z"),
          updatedAt: new Date("2023-01-01T11:00:00Z"),
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174002",
          name: "Tag C",
        },
      },
      {
        name: "name with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          name: "N".repeat(127),
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmTagSchema.parse(input)).not.toThrow();
      const result = crmTagSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          name: "Tag A",
        },
        expectedError: "Invalid UUID format for ID",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          name: "Tag A",
        },
        expectedError: "Invalid UUID format for ID",
      },
      {
        name: "missing name",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
        },
        expectedError: "Tag name must be a string",
      },
      {
        name: "name too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "",
        },
        expectedError: "Tag name is required",
      },
      {
        name: "name too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "N".repeat(128),
        },
        expectedError: "Tag name must be at most 127 characters",
      },
      {
        name: "name wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: 123,
        },
        expectedError: "Tag name must be a string",
      },
      {
        name: "createdAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Tag A",
          createdAt: "not-a-date",
        },
        expectedError: "Invalid ISO datetime format for creation date",
      },
      {
        name: "updatedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Tag A",
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid ISO datetime format for update date",
      },
      {
        name: "unrecognized field",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Tag A",
          extraField: "someValue",
        },
        expectedError: "Unrecognized key: \"extraField\"",
      },
    ];

    test.each(invalidTestCases)(
      "should reject: $name",
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmTagSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(ZodError);
        expect(error?.issues.some(issue => issue.message.includes(expectedError))).toBe(true);
      },
    );
  });

  describe("SafeParse Tests for crmTagSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Valid Tag",
      };
      const result = crmTagSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        name: "Invalid Tag",
      };
      const result = crmTagSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("CrmTagInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          name: "New Tag",
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          name: "Another New Tag " + "A".repeat(109), // 16 + 109 = 125 chars
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmTagInsertSchema.parse(input)).not.toThrow();
      const result = crmTagInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Insert Fail",
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          name: "Insert Fail",
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",
      },
      {
        name: "should reject with updatedAt present",
        input: {
          name: "Insert Fail",
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",
      },
      {
        name: "missing name",
        input: {
          name: "",
        },
        expectedError: "Tag name is required",
      },
      {
        name: "name too long",
        input: {
          name: "N".repeat(128),
        },
        expectedError: "Tag name must be at most 127 characters",
      },
    ];

    test.each(invalidTestCases)(
      "should reject: $name",
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmTagInsertSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(ZodError);
        expect(error?.issues.some(issue => issue.message.includes(expectedError))).toBe(true);
      },
    );
  });

  describe("SafeParse Tests for crmTagInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        name: "Valid Insert Tag",
      };
      const result = crmTagInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Invalid Insert Tag",
      };
      const result = crmTagInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("CrmTagUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only name",
        input: {
          name: "Updated Tag Name",
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmTagUpdateSchema.parse(input)).not.toThrow();
      const result = crmTagUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          name: "Update Fail",
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",
      },
      {
        name: "should reject with updatedAt present",
        input: {
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",
      },
      {
        name: "name too long",
        input: {
          name: "N".repeat(128),
        },
        expectedError: "Tag name must be at most 127 characters",
      },
    ];

    test.each(invalidTestCases)(
      "should reject: $name",
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmTagUpdateSchema.parse(input);
        } catch (e) {
          if (e instanceof ZodError) {
            error = e;
          }
        }
        expect(error).toBeDefined();
        expect(error).toBeInstanceOf(ZodError);
        expect(error?.issues.some(issue => issue.message.includes(expectedError))).toBe(true);
      },
    );
  });

  describe("SafeParse Tests for crmTagUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        name: "Valid Update Tag",
      };
      const result = crmTagUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        name: "Invalid Update Tag",
      };
      const result = crmTagUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
