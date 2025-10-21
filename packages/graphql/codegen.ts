import type { CodegenConfig } from "@graphql-codegen/cli";
import { defineConfig } from "@eddeee888/gcg-typescript-resolver-files";

const config: CodegenConfig = {
  schema: "**/schema.graphql",
  generates: {
    "src/schema": defineConfig({
      typesPluginsConfig: {
        contextType: "../context#GraphQLContext",
      },
    }),
    "src/zod.schema.ts": {
      plugins: ["typescript", "typescript-validation-schema"],
      config: {
        schema: "zodv4",
      },
    },
  },
};
export default config;
