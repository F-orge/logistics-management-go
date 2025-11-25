import { mkdir, readdir, writeFile } from "node:fs/promises";
import path from "node:path";

interface SchemaConfig {
  name: string;
  schemaName: string;
  schemaPath: string;
  collectionEnum: string;
  schemaImportName: string;
  outputDir: string;
  category: string;
}

/**
 * Extracts schema configurations from schema files
 */
async function extractSchemaConfigs(): Promise<SchemaConfig[]> {
  const schemasDir = "./src/pocketbase/schemas";
  const configs: SchemaConfig[] = [];

  try {
    const subdirs = await readdir(schemasDir, { withFileTypes: true });

    for (const subdir of subdirs) {
      if (!subdir.isDirectory()) continue;

      const schemaSubDir = path.join(schemasDir, subdir.name);
      const files = await readdir(schemaSubDir);

      for (const file of files) {
        if (!file.endsWith(".ts") || file === "index.ts") continue;

        const schemaName = file.replace(".ts", "");
        const pascalName = schemaName
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("");

        // Convert schema name to collection enum (e.g., companies -> CustomerRelationsCompanies)
        const schemaParts = subdir.name
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("");
        const collectionName = schemaName
          .split("-")
          .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
          .join("");

        configs.push({
          name: pascalName,
          schemaName: schemaName,
          schemaPath: `@/pocketbase/schemas/${subdir.name}/${schemaName}`,
          collectionEnum: `${schemaParts}${collectionName}`,
          schemaImportName: `${pascalName}Schema`,
          outputDir: `./src/components/actions/${subdir.name}`,
          category: subdir.name,
        });
      }
    }
  } catch (error) {
    console.error("Error extracting schema configs:", error);
  }

  return configs;
}

/**
 * Generates mutation component code
 */
function generateMutationCode(config: SchemaConfig): string {
  const { name, schemaPath, collectionEnum, schemaImportName } = config;
  const tableName = name
    .replace(/([A-Z])/g, "-$1")
    .toLowerCase()
    .slice(1);
  const pluralName = `${tableName}s`;

  return `import { useQuery } from "@tanstack/react-query";
import {
  useNavigate,
  useRouteContext,
  useSearch,
} from "@tanstack/react-router";
import { ClientResponseError } from "pocketbase";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import AutoForm from "@/components/ui/autoform-tanstack/auto-form";
import { Collections } from "@/lib/pb.types";
import { ${schemaImportName} } from "${schemaPath}";

const ${name}FormSchema = ${schemaImportName}.omit({
  id: true,
  created: true,
  updated: true,
});

export const ${name}Actions = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data } = useQuery({
    queryKey: ["${pluralName}", searchQuery.id],
    enabled:
      !!searchQuery.id &&
      (searchQuery.action === "update" || searchQuery.action === "delete"),
    queryFn: async () => {
      const record = await pocketbase
        .collection(Collections.${collectionEnum})
        .getOne(searchQuery.id!);
      return record;
    },
  });

  if (searchQuery.action === "create") {
    return (
      <AutoForm<typeof ${name}FormSchema>
        title="Create ${name}"
        description="Fill in the details to create a new ${tableName}."
        open={searchQuery.action === "create"}
        onOpenChange={() =>
          navigate({ search: (prev) => ({ ...prev, action: undefined }) })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.${collectionEnum})
              .create(data);
            toast.success("${name} created successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                \`Failed to create ${tableName}: \${error.message} (\${error.status})\`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={${name}FormSchema}
      />
    );
  }

  if (searchQuery.action === "update" && data) {
    return (
      <AutoForm<typeof ${name}FormSchema>
        title="Update ${name}"
        description="Update the ${tableName} details."
        open={searchQuery.action === "update"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
        onSubmit={async (data) => {
          try {
            await pocketbase
              .collection(Collections.${collectionEnum})
              .update(searchQuery.id!, data);
            toast.success("${name} updated successfully!");
          } catch (error) {
            if (error instanceof ClientResponseError) {
              toast.error(
                \`Failed to update ${tableName}: \${error.message} (\${error.status})\`
              );
            }
          } finally {
            navigate({ search: (prev) => ({ ...prev, action: undefined }) });
          }
        }}
        schema={${name}FormSchema}
        defaultValues={data as any}
      />
    );
  }

  if (searchQuery.action === "delete" && data) {
    return (
      <AlertDialog
        open={searchQuery.action === "delete"}
        onOpenChange={() =>
          navigate({
            search: (prev) => ({ ...prev, action: undefined, id: undefined }),
          })
        }
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete ${name}</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this ${tableName}? This action
              cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={async () => {
                try {
                  await pocketbase
                    .collection(Collections.${collectionEnum})
                    .delete(searchQuery.id!);
                  toast.success("${name} deleted successfully!");
                } catch (error) {
                  if (error instanceof ClientResponseError) {
                    toast.error(
                      \`Failed to delete ${tableName}: \${error.message} (\${error.status})\`
                    );
                  }
                } finally {
                  navigate({
                    search: (prev) => ({
                      ...prev,
                      action: undefined,
                      id: undefined,
                    }),
                  });
                }
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  }
};

export default ${name}Actions;
`;
}

/**
 * Main function to generate all mutations
 */
async function generateMutations() {
  try {
    console.log("📝 Generating PocketBase mutations...");

    const configs = await extractSchemaConfigs();
    console.log(`Found ${configs.length} schemas to process.`);

    for (const config of configs) {
      // Create output directory if it doesn't exist
      try {
        await mkdir(config.outputDir, { recursive: true });
      } catch (_err) {
        // Directory might already exist
      }

      const outputFile = path.join(config.outputDir, `${config.schemaName}.tsx`);
      const code = generateMutationCode(config);
      const relativePath = path.relative(".", outputFile);

      await writeFile(outputFile, code, "utf-8");
      console.log(`✅ Generated: ${relativePath}`);
    }

    console.log("\n✨ All mutations generated successfully!");
  } catch (error) {
    console.error("❌ Error generating mutations:", error);
    process.exit(1);
  }
}

generateMutations();
