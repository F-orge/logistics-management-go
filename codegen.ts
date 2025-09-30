import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "src/lib/graphql/schema.graphql",
  documents: "src/graphql/**/*.{ts,tsx}",
  ignoreNoDocuments: true,
  generates: {
    "src/lib/graphql/client/": {
      preset: "client",
      plugins: ["typescript", "typescript-operations"],
      config: {
        documentMode: "string",
      },
    },
    "./src/lib/graphql/schema.graphql": {
      plugins: ["schema-ast"],
      config: {
        includeDirectives: true,
      },
    },
    "apps/auth-service/graphql/resolver-types.ts": {
      config: {
        useIndexSignature: true,
      },
      plugins: ["typescript", "typescript-resolvers"],
    },
  },
};

export default config;
