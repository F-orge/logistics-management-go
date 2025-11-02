import { beforeAll, describe, expect, it } from "bun:test";
import "../../setup";
import {
	AnalyticsOutboundShipmentsQuery,
	CreateOutboundShipmentMutation,
	RemoveOutboundShipmentMutation,
	SearchOutboundShipmentsQuery,
	TableOutboundShipmentQuery,
	UpdateOutboundShipmentMutation,
} from "../../../src/client";
import type {
	AnalyticsOutboundShipmentsQuery as AnalyticsOutboundShipmentsQueryType,
	AnalyticsOutboundShipmentsQueryVariables,
	CreateOutboundShipmentInput,
	CreateOutboundShipmentMutation as CreateOutboundShipmentMutationType,
	CreateOutboundShipmentMutationVariables,
	RemoveOutboundShipmentMutation as RemoveOutboundShipmentMutationType,
	RemoveOutboundShipmentMutationVariables,
	SearchOutboundShipmentsQuery as SearchOutboundShipmentsQueryType,
	SearchOutboundShipmentsQueryVariables,
	TableOutboundShipmentQuery as TableOutboundShipmentQueryType,
	TableOutboundShipmentQueryVariables,
	UpdateOutboundShipmentInput,
	UpdateOutboundShipmentMutation as UpdateOutboundShipmentMutationType,
	UpdateOutboundShipmentMutationVariables,
} from "../../../src/client/generated/graphql";
import { graphQLQueryExecutor } from "../../helpers";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateOutboundShipmentTestCase = GraphQLTestCase<
	CreateOutboundShipmentMutationVariables,
	CreateOutboundShipmentMutationType
>;

type UpdateOutboundShipmentTestCase = GraphQLTestCase<
	UpdateOutboundShipmentMutationVariables,
	UpdateOutboundShipmentMutationType
> & {
	createData: CreateOutboundShipmentInput;
	updateData: UpdateOutboundShipmentInput;
	validate?: (
		response: UpdateOutboundShipmentMutationType,
		createdOutboundShipment: any,
	) => void;
};

type RemoveOutboundShipmentTestCase = GraphQLTestCase<
	RemoveOutboundShipmentMutationVariables,
	RemoveOutboundShipmentMutationType
> & {
	createData: CreateOutboundShipmentInput;
	shouldCreate?: boolean;
	validate?: (response: RemoveOutboundShipmentMutationType) => void;
};

type TableOutboundShipmentTestCase = GraphQLTestCase<
	TableOutboundShipmentQueryVariables,
	TableOutboundShipmentQueryType
> & {
	validate: (response: TableOutboundShipmentQueryType) => void;
};

type SearchOutboundShipmentsTestCase = GraphQLTestCase<
	SearchOutboundShipmentsQueryVariables,
	SearchOutboundShipmentsQueryType
> & {
	validate: (response: SearchOutboundShipmentsQueryType) => void;
};

type AnalyticsOutboundShipmentsTestCase = GraphQLTestCase<
	AnalyticsOutboundShipmentsQueryVariables,
	AnalyticsOutboundShipmentsQueryType
> & {
	validate: (response: AnalyticsOutboundShipmentsQueryType) => void;
};
// ============================================
// Test Suite: Create OutboundShipment
// ============================================

describe("Graphql Create OutboundShipment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateOutboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			CreateOutboundShipmentMutation,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.createOutboundShipment).toBeDefined();
			expect(response.data?.wms?.createOutboundShipment?.id).toBeDefined();
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
// Test Suite: Update OutboundShipment
// ============================================

describe("Graphql Update OutboundShipment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateOutboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial OutboundShipment
		const createResponse = await executor(CreateOutboundShipmentMutation, {
			outboundShipment: testCase.createData,
		});

		expect(createResponse.data?.wms?.createOutboundShipment?.id).toBeDefined();
		const outboundShipmentId =
			createResponse.data!.wms!.createOutboundShipment!.id!;
		const createdOutboundShipment =
			createResponse.data!.wms!.createOutboundShipment!;

		// Update OutboundShipment
		const updateResponse = await executor(UpdateOutboundShipmentMutation, {
			id: testCase.variables.id,
			outboundShipment: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.wms?.updateOutboundShipment).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateOutboundShipmentMutationType,
					createdOutboundShipment,
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
// Test Suite: Remove OutboundShipment
// ============================================

describe("Graphql Remove OutboundShipment", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveOutboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let outboundShipmentId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateOutboundShipmentMutation, {
				outboundShipment: {
					// Add minimal required fields
				} as unknown as CreateOutboundShipmentInput,
			});
			outboundShipmentId =
				createResponse.data!.wms!.createOutboundShipment!.id!;
		} else {
			outboundShipmentId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveOutboundShipmentMutation, {
			id: outboundShipmentId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.wms?.removeOutboundShipment).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.wms?.removeOutboundShipment?.success).toBe(
					false,
				);
			}
		}

		if (testCase.validate) {
			testCase.validate(
				deleteResponse.data as RemoveOutboundShipmentMutationType,
			);
		}
	});
});

// ============================================
// Test Suite: Table OutboundShipments Query
// ============================================

describe("Graphql Table OutboundShipments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: TableOutboundShipmentTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			TableOutboundShipmentQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.outboundShipments).toBeDefined();
			testCase.validate(response.data as TableOutboundShipmentQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Search OutboundShipments Query
// ============================================

describe("Graphql Search OutboundShipments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: SearchOutboundShipmentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			SearchOutboundShipmentsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.outboundShipments).toBeDefined();
			testCase.validate(response.data as SearchOutboundShipmentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});

// ============================================
// Test Suite: Analytics OutboundShipments Query
// ============================================

describe("Graphql Analytics OutboundShipments Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: AnalyticsOutboundShipmentsTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(
			AnalyticsOutboundShipmentsQuery,
			testCase.variables,
		);

		if (testCase.success) {
			expect(response.errors).toBeUndefined();
			expect(response.data?.wms?.outboundShipments).toBeDefined();
			testCase.validate(response.data as AnalyticsOutboundShipmentsQueryType);
		} else {
			expect(response.errors).toBeDefined();
		}
	});
});
