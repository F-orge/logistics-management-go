import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";
import lodash from "lodash";

const config: CodegenConfig = {
  schema: "**/schema.graphql",
  generates: {
    "src/schema": defineConfig({
      typesPluginsConfig: {
        contextType: "../context#GraphQLContext",
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: (string: string) => `"${lodash.kebabCase(string)}"`,
        },
      },
    }),
    "src/zod.schema.ts": {
      plugins: ["typescript", "typescript-validation-schema"],
      config: {
        schema: "zodv4",
        scalarSchemas: {
          File: "z.file()",
        },
        namingConvention: {
          typeNames: "change-case-all#pascalCase",
          enumValues: (string: string) => `"${lodash.kebabCase(string)}"`,
        },
      },
    },
  },
};
export default config;
