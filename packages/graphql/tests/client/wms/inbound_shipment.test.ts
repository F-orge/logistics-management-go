import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateInboundShipmentMutation as CreateInboundShipmentMutationType,
	CreateInboundShipmentMutationVariables,
	UpdateInboundShipmentMutation as UpdateInboundShipmentMutationType,
	UpdateInboundShipmentMutationVariables,
	RemoveInboundShipmentMutation as RemoveInboundShipmentMutationType,
	RemoveInboundShipmentMutationVariables,
	TableInboundShipmentQuery as TableInboundShipmentQueryType,
	TableInboundShipmentQueryVariables,
	AnalyticsInboundShipmentsQuery as AnalyticsInboundShipmentsQueryType,
	AnalyticsInboundShipmentsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateInboundShipmentInput,
	UpdateInboundShipmentInput,
} from "../../../src/client/generated/graphql";
import {
	CreateInboundShipmentMutation,
	UpdateInboundShipmentMutation,
	RemoveInboundShipmentMutation,
	TableInboundShipmentQuery,
	AnalyticsInboundShipmentsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";
// ============================================
// Type Definitions
// ============================================

type CreateInboundShipmentTestCase = GraphQLTestCase<
	CreateInboundShipmentMutationVariables,
	CreateInboundShipmentMutationType
>;

type UpdateInboundShipmentTestCase = GraphQLTestCase<
	UpdateInboundShipmentMutationVariables,
	UpdateInboundShipmentMutationType
> & {
	createData: CreateInboundShipmentInput;
	updateData: UpdateInboundShipmentInput;
	validate?: (response: UpdateInboundShipmentMutationType, createdInboundShipment: any) => void;
};

type RemoveInboundShipmentTestCase = GraphQLTestCase<
	RemoveInboundShipmentMutationVariables,
	RemoveInboundShipmentMutationType
> & {
	createData: CreateInboundShipmentInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveInboundShipmentMutationType) => void;
};

type TableInboundShipmentTestCase = GraphQLTestCase<
	TableInboundShipmentQueryVariables,
	TableInboundShipmentQueryType
> & {
	validate: (response: TableInboundShipmentQueryType) => void;
};

type AnalyticsInboundShipmentsTestCase = GraphQLTestCase<
	AnalyticsInboundShipmentsQueryVariables,
	AnalyticsInboundShipmentsQueryType
> & {
	validate: (response: AnalyticsInboundShipmentsQueryType) => void;
};
// ============================================
// Test Suite: Create InboundShipment
// ============================================

describe("Graphql Create InboundShipment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateInboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateInboundShipmentMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createInboundShipment).toBeDefined();
			expect(response.data?.wms?.createInboundShipment?.id).toBeDefined();
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
// Test Suite: Update InboundShipment
// ============================================

describe("Graphql Update InboundShipment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateInboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial InboundShipment
		const createResponse = await executor(CreateInboundShipmentMutation, {
			inboundShipment: testCase.createData,
		});

		expect(createResponse.data?.wms?.createInboundShipment?.id).toBeDefined();
		const inboundShipmentId = createResponse.data!.wms!.createInboundShipment!.id!;
		const createdInboundShipment = createResponse.data!.wms!.createInboundShipment!;

		// Update InboundShipment
		const updateResponse = await executor(UpdateInboundShipmentMutation, {
			id: testCase.variables.id,
			inboundShipment: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateInboundShipment).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateInboundShipmentMutationType,
					createdInboundShipment,
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

// ============================================
// Test Suite: Remove InboundShipment
// ============================================

describe("Graphql Remove InboundShipment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveInboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let inboundShipmentId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateInboundShipmentMutation, {
				inboundShipment: {
					// Add minimal required fields
				} as unknown as CreateInboundShipmentInput,
			});
			inboundShipmentId = createResponse.data!.wms!.createInboundShipment!.id!;
		} else {
			inboundShipmentId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveInboundShipmentMutation, {
			id: inboundShipmentId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeInboundShipment).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeInboundShipment?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveInboundShipmentMutationType);
		}
	});
});

// ============================================
// Test Suite: Table InboundShipments Query
// ============================================

describe("Graphql Table InboundShipments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableInboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableInboundShipmentQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inboundShipments).toBeDefined();
			testCase.validate(response.data as TableInboundShipmentQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics InboundShipments Query
// ============================================

describe("Graphql Analytics InboundShipments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsInboundShipmentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(AnalyticsInboundShipmentsQuery, testCase.variables);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.inboundShipments).toBeDefined();
			testCase.validate(response.data as AnalyticsInboundShipmentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
