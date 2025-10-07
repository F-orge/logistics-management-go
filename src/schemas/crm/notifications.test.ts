import { describe, test, expect } from "bun:test";
import { ZodError } from "zod";
import {
  crmNotificationSchema,
  crmNotificationInsertSchema,
  crmNotificationUpdateSchema,
} from "./notifications";

describe("CrmNotificationSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test notification message.",
        },
      },
      {
        name: "complete valid data",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174001",
          userId: "user-456",
          message: "Long notification message: " + "L".repeat(997), // 27 + 997 = 1024 chars
          link: "https://example.com/notification/1",
          isRead: true,
          createdAt: new Date("2023-01-01T10:00:00Z"),
          updatedAt: new Date("2023-01-01T11:00:00Z"),
        },
      },
      {
        name: "all optional fields absent",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174002",
          userId: "user-789",
          message: "Another notification.",
        },
      },
      {
        name: "message with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174003",
          userId: "user-abc",
          message: "M".repeat(1024),
        },
      },
      {
        name: "link with max length",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174004",
          userId: "user-def",
          message: "Link test.",
          link: "https://example.com/" + "L".repeat(999), // 19 + 999 = 1018 chars
        },
      },
      {
        name: "isRead is false",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174005",
          userId: "user-ghi",
          message: "Unread notification.",
          isRead: false,
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmNotificationSchema.parse(input)).not.toThrow();
      const result = crmNotificationSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "missing id",
        input: {
          userId: "user-123",
          message: "Test notification message.",
        },
        expectedError: "Invalid UUID format for ID",
      },
      {
        name: "invalid id format",
        input: {
          id: "invalid-uuid",
          userId: "user-123",
          message: "Test notification message.",
        },
        expectedError: "Invalid UUID format for ID",
      },
      {
        name: "missing userId",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          message: "Test notification message.",
        },
        expectedError: "User ID must be a string",
      },
      {
        name: "userId too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "",
          message: "Test notification message.",
        },
        expectedError: "User ID is required",
      },
      {
        name: "userId too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "U".repeat(256),
          message: "Test notification message.",
        },
        expectedError: "User ID must be at most 255 characters",
      },
      {
        name: "userId wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: 123,
          message: "Test notification message.",
        },
        expectedError: "User ID must be a string",
      },
      {
        name: "missing message",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
        },
        expectedError: "Message must be a string",
      },
      {
        name: "message too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "",
        },
        expectedError: "Message is required",
      },
      {
        name: "message too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "M".repeat(1025),
        },
        expectedError: "Message must be at most 1024 characters",
      },
      {
        name: "message wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: 123,
        },
        expectedError: "Message must be a string",
      },
      {
        name: "link invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          link: "not-a-url",
        },
        expectedError: "Invalid URL format for link",
      },
      {
        name: "link too short",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          link: "",
        },
        expectedError: "Link is required",
      },
      {
        name: "link too long",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          link: "https://example.com/" + "L".repeat(1006), // 19 + 1006 = 1025 chars
        },
        expectedError: "Link must be at most 1024 characters",
      },
      {
        name: "link wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          link: 123,
        },
        expectedError: "Link must be a string",
      },
      {
        name: "isRead wrong type",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          isRead: "true",
        },
        expectedError: "Is read must be a boolean",
      },
      {
        name: "createdAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          createdAt: "not-a-date",
        },
        expectedError: "Invalid ISO datetime format for creation date",
      },
      {
        name: "updatedAt invalid format",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
          updatedAt: "not-a-date",
        },
        expectedError: "Invalid ISO datetime format for update date",
      },
      {
        name: "unrecognized field",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-123",
          message: "Test message.",
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
          crmNotificationSchema.parse(input);
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

  describe("SafeParse Tests for crmNotificationSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "user-valid",
        message: "Valid notification.",
      };
      const result = crmNotificationSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "invalid-uuid",
        userId: "user-invalid",
        message: "Invalid notification.",
      };
      const result = crmNotificationSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("CrmNotificationInsertSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "minimum valid data (no id, createdAt, updatedAt)",
        input: {
          userId: "user-insert",
          message: "New notification.",
        },
      },
      {
        name: "complete valid data (no id, createdAt, updatedAt)",
        input: {
          userId: "user-insert-full",
          message: "Full new notification: " + "F".repeat(1000),
          link: "https://example.com/new-notification/1",
          isRead: false,
        },
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmNotificationInsertSchema.parse(input)).not.toThrow();
      const result = crmNotificationInsertSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          userId: "user-insert",
          message: "Notification with ID.",
        },
        expectedError: "Unrecognized key: \"id\"",
      },
      {
        name: "should reject with createdAt present",
        input: {
          userId: "user-insert",
          message: "Notification with createdAt.",
          createdAt: new Date(),
        },
        expectedError: "Unrecognized key: \"createdAt\"",
      },
      {
        name: "should reject with updatedAt present",
        input: {
          userId: "user-insert",
          message: "Notification with updatedAt.",
          updatedAt: new Date(),
        },
        expectedError: "Unrecognized key: \"updatedAt\"",
      },
      {
        name: "missing userId",
        input: {
          message: "Missing user ID.",
        },
        expectedError: "User ID must be a string",
      },
      {
        name: "missing message",
        input: {
          userId: "user-insert",
        },
        expectedError: "Message must be a string",
      },
      {
        name: "link invalid format",
        input: {
          userId: "user-insert",
          message: "Invalid link.",
          link: "not-a-url",
        },
        expectedError: "Invalid URL format for link",
      },
    ];

    test.each(invalidTestCases)(
      "should reject: $name",
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmNotificationInsertSchema.parse(input);
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

  describe("SafeParse Tests for crmNotificationInsertSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        userId: "user-valid-insert",
        message: "Valid insert notification.",
      };
      const result = crmNotificationInsertSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        userId: "user-invalid-insert",
        message: "Invalid insert notification.",
      };
      const result = crmNotificationInsertSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});

describe("CrmNotificationUpdateSchema Validation", () => {
  describe("Valid Cases", () => {
    const validTestCases = [
      {
        name: "partial update: only message",
        input: {
          message: "Updated notification message.",
        },
      },
      {
        name: "partial update: only isRead",
        input: {
          isRead: true,
        },
      },
      {
        name: "partial update: all allowed fields",
        input: {
          userId: "user-update-full",
          message: "Fully updated notification: " + "U".repeat(996), // 28 + 996 = 1024 chars
          link: "https://example.com/updated-notification/1",
          isRead: true,
        },
      },
      {
        name: "empty object (no changes)",
        input: {},
      },
    ];

    test.each(validTestCases)("should validate: $name", ({ input }) => {
      expect(() => crmNotificationUpdateSchema.parse(input)).not.toThrow();
      const result = crmNotificationUpdateSchema.parse(input);
      expect(result).toEqual(expect.objectContaining(input));
    });
  });

  describe("Invalid Cases", () => {
    const invalidTestCases = [
      {
        name: "should reject with id present",
        input: {
          id: "123e4567-e89b-12d3-a456-426614174000",
          message: "Update with ID.",
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
        name: "userId wrong type",
        input: {
          userId: 123,
        },
        expectedError: "User ID must be a string",
      },
      {
        name: "message too long",
        input: {
          message: "M".repeat(1025),
        },
        expectedError: "Message must be at most 1024 characters",
      },
      {
        name: "link invalid format",
        input: {
          link: "not-a-url",
        },
        expectedError: "Invalid URL format for link",
      },
      {
        name: "isRead wrong type",
        input: {
          isRead: "false",
        },
        expectedError: "Is read must be a boolean",
      },
    ];

    test.each(invalidTestCases)(
      "should reject: $name",
      ({ input, expectedError }) => {
        let error: ZodError | undefined;
        try {
          crmNotificationUpdateSchema.parse(input);
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

  describe("SafeParse Tests for crmNotificationUpdateSchema", () => {
    test("should return success for valid data", () => {
      const validData = {
        message: "Valid update.",
      };
      const result = crmNotificationUpdateSchema.safeParse(validData);

      expect(result.success).toBe(true);
      if (result.success) {
        expect(result.data).toEqual(validData);
      }
    });

    test("should return error for invalid data", () => {
      const invalidData = {
        id: "123e4567-e89b-12d3-a456-426614174000",
        message: "Invalid update.",
      };
      const result = crmNotificationUpdateSchema.safeParse(invalidData);

      expect(result.success).toBe(false);
      if (!result.success) {
        expect(result.error).toBeInstanceOf(ZodError);
        expect(result.error.issues.length).toBeGreaterThan(0);
      }
    });
  });
});
