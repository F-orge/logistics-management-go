import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	CreateGeofenceEventMutation,
	UpdateGeofenceEventMutation,
} from "../../../src/client";
import type {
	CreateGeofenceEventInput,
	CreateGeofenceEventMutation as CreateGeofenceEventMutationType,
	CreateGeofenceEventMutationVariables,
	UpdateGeofenceEventInput,
	UpdateGeofenceEventMutation as UpdateGeofenceEventMutationType,
	UpdateGeofenceEventMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateGeofenceEventTestCase = GraphQLTestCase<
	CreateGeofenceEventMutationVariables,
	CreateGeofenceEventMutationType
>;

type UpdateGeofenceEventTestCase = GraphQLTestCase<
	UpdateGeofenceEventMutationVariables,
	UpdateGeofenceEventMutationType
> & {
	createData: CreateGeofenceEventInput;
	updateData: UpdateGeofenceEventInput;
	validate?: (
		response: UpdateGeofenceEventMutationType,
		createdGeofenceEvent: any,
	) => void;
};

// ============================================
// Test Suite: Create Geofence Event
// ============================================

describe("Graphql TMS Create Geofence Event", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateGeofenceEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateGeofenceEventMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.tms?.createGeofenceEvent).toBeDefined();
			expect(response.data?.tms?.createGeofenceEvent?.id).toBeDefined();
		} else {
			expect(response.errors).toBeDefined();
			expect(Array.isArray(response.errors)).toBe(true);
			expect(response.errors!.length).toBeGreaterThan(0);

			if (testCase.expectedError) {
				const errorMessage = response.errors![0]?.message || "";

				if (testCase.expectedError.messagePattern instanceof RegExp) {
					expect(errorMessage).toMatch(testCase.expectedError.messagePattern);
				} else {
					expect(errorMessage).toContain(testCase.expectedError.messagePattern);
				}
			}
		}
	});
});

// ============================================
// Test Suite: Update Geofence Event
// ============================================

describe("Graphql TMS Update Geofence Event", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateGeofenceEventTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial geofence event
		const createResponse = await executor(CreateGeofenceEventMutation, {
			geofenceEvent: testCase.createData,
		});

		expect(createResponse.data?.tms?.createGeofenceEvent?.id).toBeDefined();
		const geofenceEventId = createResponse.data!.tms!.createGeofenceEvent!.id!;
		const createdGeofenceEvent = createResponse.data!.tms!.createGeofenceEvent!;

		// Update geofence event
		const updateResponse = await executor(UpdateGeofenceEventMutation, {
			id: geofenceEventId,
			geofenceEvent: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.tms?.updateGeofenceEvent).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateGeofenceEventMutationType,
					createdGeofenceEvent,
				);
			}
		} else {
			expect(updateResponse.errors).toBeDefined();
			expect(updateResponse.errors!.length).toBeGreaterThan(0);

			if (testCase.expectedError) {
				const errorMessage = updateResponse.errors![0]?.message || "";
				if (testCase.expectedError.messagePattern instanceof RegExp) {
					expect(errorMessage).toMatch(testCase.expectedError.messagePattern);
				} else {
					expect(errorMessage).toContain(testCase.expectedError.messagePattern);
				}
			}
		}
	});
});
