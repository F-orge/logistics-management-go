import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";
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
          Date: "z.date()",
        },
        enumsAsTypes: true,
        maybeValue: "T | undefined",
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
