import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";
import type { CodegenConfig } from "@graphql-codegen/cli";
import lodash from "lodash";

const config: CodegenConfig = {
	schema: "**/schema.graphql",
	documents: ["src/client/**/*.ts"],
	ignoreNoDocuments: true,
	generates: {
		"src/schema": defineConfig({
			typesPluginsConfig: {
				contextType: "../context#GraphQLContext",
				maybeValue: "T | undefined",
			},
			scalarsOverrides: {
				File: { type: "File" },
				Date: { type: "Date" },
				ID: { type: "string" },
			},
		}),
		"src/schema/graphql.schema.json": {
			plugins: ["introspection"],
		},
		"src/zod.schema.ts": {
			plugins: ["typescript", "typescript-validation-schema"],
			config: {
				schema: "zodv4",
				strictScalars: true,
				scalars: {
					File: "File",
					Date: "Date",
				},
				scalarSchemas: {
					File: "z.file()",
					Date: "z.coerce.date()",
				},
				enumsAsTypes: true,
				maybeValue: "T | undefined",
				directives: {
					// String length constraints
					constraint: {
						minLength: "min",
						maxLength: "max",
						length: "length",
						// String pattern constraints
						pattern: ["regex", "/^$1/"],
						startsWith: ["startsWith", "$1"],
						endsWith: ["endsWith", "$1"],
						includes: ["includes", "$1"],
						// Number constraints
						min: "min",
						max: "max",
						gt: "gt",
						gte: "gte",
						lt: "lt",
						lte: "lte",
						multipleOf: "multipleOf",
						// Format constraints
						format: {
							email: "email",
							url: "url",
							uuid: "uuid",
							uuidv4: "uuidv4",
							ipv4: "ipv4",
							ipv6: "ipv6",
							hostname: "hostname",
							base64: "base64",
							base64url: "base64url",
							hex: "hex",
							jwt: "jwt",
							cuid: "cuid",
							ulid: "ulid",
							nanoid: "nanoid",
							date: ["regex", "/^\\d{4}-\\d{2}-\\d{2}$/"],
							datetime: [
								"regex",
								"/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?(Z|[+-]\\d{2}:\\d{2})?$/",
							],
							time: ["regex", "/^\\d{2}:\\d{2}:\\d{2}$/"],
							iso8601: [
								"regex",
								"/^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d{3})?(Z|[+-]\\d{2}:\\d{2})?$/",
							],
							emoji: ["regex", "/^\\p{Emoji}$/u"],
						},
					},
					// Required constraint with custom message
					required: {
						msg: "required",
					},
					// String transformations
					trim: "trim",
					lowercase: "toLowerCase",
					uppercase: "toUpperCase",
					normalize: "normalize",
					// Array constraints
					arrayConstraint: {
						minItems: "min",
						maxItems: "max",
					},
				},
			},
		},
		"./src/client/generated/": {
			preset: "client",
			config: {
				documentMode: "string",
			},
		},
	},
};
export default config;
