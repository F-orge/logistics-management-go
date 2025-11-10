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
import FormDialog from "@/components/ui/autoform/components/helpers/FormDialog";
import { Collections } from "@/lib/pb.types";
import { ${schemaImportName} } from "${schemaPath}";

export const Create${name} = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  return (
    <FormDialog
      title="Create ${name}"
      description="Fill in the details to create a new ${tableName}."
      open={searchQuery.action === "create"}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={${schemaImportName}}
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
    />
  );
};

export const Update${name} = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.${collectionEnum}, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.${collectionEnum})
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "update" && !!searchQuery.id,
  });

  return (
    <FormDialog
      title="Update ${name}"
      description="Modify the details of the ${tableName}."
      defaultValues={record || undefined}
      open={searchQuery.action === "update" && !!searchQuery.id}
      onOpenChange={() =>
        navigate({ search: (prev) => ({ ...prev, action: undefined }) })
      }
      schema={${schemaImportName}.partial()}
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
    />
  );
};

export const Delete${name} = () => {
  const searchQuery = useSearch({ from: "/dashboard/$schema/$collection" });
  const navigate = useNavigate({ from: "/dashboard/$schema/$collection" });
  const { pocketbase } = useRouteContext({
    from: "/dashboard/$schema/$collection",
  });

  const { data: record } = useQuery({
    queryKey: [Collections.${collectionEnum}, searchQuery.id],
    queryFn: async () =>
      pocketbase
        .collection(Collections.${collectionEnum})
        .getOne(searchQuery.id!),
    enabled: searchQuery.action === "delete" && !!searchQuery.id,
  });

  const handleDelete = async () => {
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
      navigate({ search: (prev) => ({ ...prev, action: undefined }) });
    }
  };

  return (
    <AlertDialog open={searchQuery.action === "delete" && !!searchQuery.id}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete the
            ${tableName} and remove all associated data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel
            onClick={() =>
              navigate({ search: (prev) => ({ ...prev, action: undefined }) })
            }
          >
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default [
  <Create${name} key={"action-create"} />,
  <Update${name} key={"action-update"} />,
  <Delete${name} key={"action-delete"} />,
];
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

      const outputFile = path.join(
        config.outputDir,
        `${config.schemaName}.tsx`
      );
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
