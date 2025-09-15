import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
  overwrite: true,
  schema: 'http://localhost:8000',
  documents: 'src/graphql/**/*.{ts,tsx}',
  ignoreNoDocuments: true,
  generates: {
    'src/lib/graphql/client/': {
      preset: 'client',
      plugins: ['typescript', 'typescript-operations'],
      config: {
        documentMode: 'string',
      },
    },
    './src/lib/graphql/schema.graphql': {
      plugins: ['schema-ast'],
      config: {
        includeDirectives: true,
      },
    },
  },
};

export default config;
