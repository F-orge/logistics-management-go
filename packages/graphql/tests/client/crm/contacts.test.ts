import { describe, expect, it, beforeAll } from "bun:test";
import "../../setup";
import { graphQLQueryExecutor } from "../../helpers";
import type {
	CreateContactMutation as CreateContactMutationType,
	CreateContactMutationVariables,
	UpdateContactMutation as UpdateContactMutationType,
	UpdateContactMutationVariables,
	RemoveContactMutation as RemoveContactMutationType,
	RemoveContactMutationVariables,
	TableContactQuery as TableContactQueryType,
	TableContactQueryVariables,
	SearchContactsQuery as SearchContactsQueryType,
	SearchContactsQueryVariables,
} from "../../../src/client/generated/graphql";
import type {
	CreateContactInput,
	UpdateContactInput,
} from "../../../src/client/generated/graphql";
import {
	CreateContactMutation,
	UpdateContactMutation,
	RemoveContactMutation,
	TableContactQuery,
	SearchContactsQuery,
} from "../../../src/client";
import type { GraphQLTestCase } from "../../inputs/helpers";

// ============================================
// Type Definitions
// ============================================

type CreateContactTestCase = GraphQLTestCase<
	CreateContactMutationVariables,
	CreateContactMutationType
>;

type UpdateContactTestCase = GraphQLTestCase<
	UpdateContactMutationVariables,
	UpdateContactMutationType
> & {
	createData: CreateContactInput;
	updateData: UpdateContactInput;
	validate?: (response: UpdateContactMutationType, createdContact: any) => void;
};

type RemoveContactTestCase = GraphQLTestCase<
	RemoveContactMutationVariables,
	RemoveContactMutationType
> & {
	shouldCreate: boolean;
	validate?: (response: RemoveContactMutationType) => void;
};

type TableContactTestCase = GraphQLTestCase<
	TableContactQueryVariables,
	TableContactQueryType
> & {
	validate: (response: TableContactQueryType) => void;
};

type SearchContactTestCase = GraphQLTestCase<
	SearchContactsQueryVariables,
	SearchContactsQueryType
> & {
	validate: (response: SearchContactsQueryType) => void;
};

// ============================================
// Helper Functions
// ============================================

const generateUniqueEmail = () =>
	`contact-${Date.now()}-${Math.random().toString(36).substr(2, 9)}@test.com`;

const generateUniquePhone = () => `+1${Math.random().toString().slice(2, 11)}`;

// ============================================
// Test Suite: Create Contact
// ============================================

describe("Graphql CRM Create Contact", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: CreateContactTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(CreateContactMutation, testCase.variables);

		if (testCase.success) {
			expect(response).toHaveProperty("data");
			expect(response.errors).toBeUndefined();
			expect(response.data?.crm?.createContact).toBeDefined();
			expect(response.data?.crm?.createContact?.id).toBeDefined();
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
// Test Suite: Update Contact
// ============================================

describe("Graphql CRM Update Contact", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: UpdateContactTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		// Create initial contact
		const createResponse = await executor(CreateContactMutation, {
			contact: testCase.createData,
		});

		expect(createResponse.data?.crm?.createContact?.id).toBeDefined();
		const contactId = createResponse.data!.crm!.createContact!.id!;
		const createdContact = createResponse.data!.crm!.createContact!;

		// Update contact
		const updateResponse = await executor(UpdateContactMutation, {
			id: contactId,
			contact: testCase.updateData,
		});

		if (testCase.success) {
			expect(updateResponse.errors).toBeUndefined();
			expect(updateResponse.data?.crm?.updateContact).toBeDefined();
			if (testCase.validate) {
				testCase.validate(
					updateResponse.data as UpdateContactMutationType,
					createdContact,
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
// Test Suite: Remove Contact
// ============================================

describe("Graphql CRM Remove Contact", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	beforeAll(() => {
		executor = graphQLQueryExecutor({ enableJWT: false });
	});

	const cases: RemoveContactTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		let contactId: string;

		if (testCase.shouldCreate) {
			const createResponse = await executor(CreateContactMutation, {
				contact: {
					name: "Contact to delete",
					email: generateUniqueEmail(),
					phoneNumber: generateUniquePhone(),
					jobTitle: "Temporary",
					companyId: "",
					ownerId: "",
				} as unknown as CreateContactInput,
			});
			contactId = createResponse.data!.crm!.createContact!.id!;
		} else {
			contactId = "00000000-0000-0000-0000-000000000000";
		}

		const deleteResponse = await executor(RemoveContactMutation, {
			id: contactId,
		});

		if (testCase.success) {
			expect(deleteResponse.errors).toBeUndefined();
			expect(deleteResponse.data?.crm?.removeContact).toBeDefined();
		} else {
			if (deleteResponse.errors) {
				expect(Array.isArray(deleteResponse.errors)).toBe(true);
			} else {
				expect(deleteResponse.data?.crm?.removeContact?.success).toBe(false);
			}
		}

		if (testCase.validate) {
			testCase.validate(deleteResponse.data as RemoveContactMutationType);
		}
	});
});

// ============================================
// Test Suite: Table Contact Query
// ============================================

describe("Graphql CRM Table Contact Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdContacts: Array<{
		id: string;
		name: string;
	}> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		const contactNames = [
			"Alice Johnson",
			"Bob Smith",
			"Carol Davis",
			"David Wilson",
			"Eve Brown",
		];

		for (const name of contactNames) {
			const response = await executor(CreateContactMutation, {
				contact: {
					name,
					email: generateUniqueEmail(),
					phoneNumber: generateUniquePhone(),
					jobTitle: `Job Title for ${name}`,
					companyId: "",
					ownerId: "",
				} as unknown as CreateContactInput,
			});

			if (response.data?.crm?.createContact?.id) {
				createdContacts.push({
					id: response.data.crm.createContact.id,
					name,
				});
			}
		}
	});

	const cases: TableContactTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(TableContactQuery, testCase.variables);
		testCase.validate(response.data as TableContactQueryType);
	});
});

// ============================================
// Test Suite: Search Contacts Query
// ============================================

describe("Graphql CRM Search Contacts Query", () => {
	let executor: ReturnType<typeof graphQLQueryExecutor>;

	let createdContacts: Array<{ id: string; name: string }> = [];

	beforeAll(async () => {
		executor = graphQLQueryExecutor({ enableJWT: false });
		const contactNames = [
			"Premium Developer",
			"Premium Manager",
			"Budget Analyst",
			"Professional Designer",
			"Professional Analyst",
		];

		for (const name of contactNames) {
			const response = await executor(CreateContactMutation, {
				contact: {
					name,
					email: generateUniqueEmail(),
					phoneNumber: generateUniquePhone(),
					jobTitle: name,
					companyId: "",
					ownerId: "",
				} as unknown as CreateContactInput,
			});

			if (response.data?.crm?.createContact?.id) {
				createdContacts.push({
					id: response.data.crm.createContact.id,
					name,
				});
			}
		}
	});

	const cases: SearchContactTestCase[] = [];

	it.each(cases)("$name", async (testCase) => {
		const response = await executor(SearchContactsQuery, testCase.variables);
		testCase.validate(response.data as SearchContactsQueryType);
	});
});
