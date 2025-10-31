import { describe, it, expect } from "bun:test";
import { PickBatchSchema } from "./pick_batch";

describe("PickBatchSchema Validation", () => {
  describe("Valid Cases", () => {
    it("should validate: minimal pick batch", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate: pick batch with all optional fields", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "ZONE_PICKING",
        status: "OPEN",
        assignedUserId: "550e8400-e29b-41d4-a716-446655440002",
        priority: 100,
        totalItems: 50,
        completedItems: 25,
        estimatedDuration: 300,
        actualDuration: 280,
        startedAt: new Date(),
        completedAt: new Date(),
        waveId: "550e8400-e29b-41d4-a716-446655440003",
        zoneRestrictions: ["ZONE-A", "ZONE-B"],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate: pick batch with max batch number", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "A".repeat(64),
        strategy: "CLUSTER_PICKING",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate: pick batch with max priority", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        priority: 1000,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate: pick batch with max items", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "ZONE_PICKING",
        totalItems: 100000,
        completedItems: 100000,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate: pick batch with max duration", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        estimatedDuration: 10000,
        actualDuration: 10000,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });

    it("should validate: pick batch with null optional fields", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "CLUSTER_PICKING",
        status: null,
        assignedUserId: null,
        priority: null,
        totalItems: null,
        completedItems: null,
        estimatedDuration: null,
        actualDuration: null,
        startedAt: null,
        completedAt: null,
        waveId: null,
        zoneRestrictions: null,
        createdAt: null,
        updatedAt: null,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(true);
    });
  });

  describe("Invalid Cases", () => {
    it("should reject: missing required id", () => {
      const data = {
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: invalid id UUID format", () => {
      const data = {
        id: "invalid-uuid",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: invalid warehouseId UUID format", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "not-a-uuid",
        batchNumber: "BATCH-001",
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: missing batchNumber", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: empty batchNumber", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "",
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: batchNumber exceeds max length", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "A".repeat(65),
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: missing strategy", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: invalid strategy", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "FASTEST",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: invalid status enum", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        status: "INVALID_STATUS",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: invalid assignedUserId UUID format", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        assignedUserId: "not-a-uuid",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: priority is negative", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        priority: -1,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: priority exceeds max", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        priority: 1001,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: priority is not an integer", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        priority: 100.5,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: totalItems is negative", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        totalItems: -1,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: totalItems exceeds max", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        totalItems: 100001,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: completedItems is negative", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        completedItems: -1,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: estimatedDuration exceeds max", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        estimatedDuration: 10001,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: actualDuration exceeds max", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        actualDuration: 10001,
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: startedAt is not a date", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        startedAt: "2024-01-01",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: completedAt is not a date", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        completedAt: "2024-01-01",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: invalid waveId UUID format", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        waveId: "invalid-uuid",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: zoneRestrictions contains empty string", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        zoneRestrictions: ["ZONE-A", ""],
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: zoneRestrictions item exceeds max length", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        zoneRestrictions: ["A".repeat(65)],
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: createdAt is not a date", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        createdAt: "2024-01-01",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });

    it("should reject: updatedAt is not a date", () => {
      const data = {
        id: "550e8400-e29b-41d4-a716-446655440000",
        warehouseId: "550e8400-e29b-41d4-a716-446655440001",
        batchNumber: "BATCH-001",
        strategy: "BATCH_PICKING",
        updatedAt: "2024-01-01",
      };
      const result = PickBatchSchema.safeParse(data);
      expect(result.success).toBe(false);
    });
  });
});
