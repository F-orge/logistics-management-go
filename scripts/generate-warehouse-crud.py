#!/usr/bin/env python3
"""
Warehouse-Management CRUD Boilerplate Generator

This script generates complete CRUD implementations for all warehouse-management entities.
It converts monolithic .tsx files into a 4-file folder structure (create, update, delete, index).

Usage: python3 generate-warehouse-crud.py
"""

import os
import re
from pathlib import Path

# Base paths
BASE_PATH = "/home/robeckk/marahuyo/logistics-management-go/src/components/actions"
WM_PATH = os.path.join(BASE_PATH, "warehouse-management")
SCHEMAS_PATH = "/home/robeckk/marahuyo/logistics-management-go/src/pocketbase/schemas/warehouse-management"

# All warehouse-management entities (kebab-case, CollectionEnum, PascalCaseSchema)
ENTITIES = [
    ("bin-threshold", "WarehouseManagementBinThreshold", "BinThreshold"),
    ("inbound-shipment-items", "WarehouseManagementInboundShipmentItems", "InboundShipmentItems"),
    ("inbound-shipments", "WarehouseManagementInboundShipments", "InboundShipments"),
    ("inventory-adjustment", "WarehouseManagementInventoryAdjustment", "InventoryAdjustment"),
    ("inventory-batches", "WarehouseManagementInventoryBatches", "InventoryBatches"),
    ("inventory-stock", "WarehouseManagementInventoryStock", "InventoryStock"),
    ("locations", "WarehouseManagementLocations", "Locations"),
    ("outbound-shipment-items", "WarehouseManagementOutboundShipmentItems", "OutboundShipmentItems"),
    ("outbound-shipments", "WarehouseManagementOutboundShipments", "OutboundShipments"),
    ("package-items", "WarehouseManagementPackageItems", "PackageItems"),
    ("packages", "WarehouseManagementPackages", "Packages"),
    ("pick-batch-items", "WarehouseManagementPickBatchItems", "PickBatchItems"),
    ("pick-batches", "WarehouseManagementPickBatches", "PickBatches"),
    ("products", "WarehouseManagementProducts", "Products"),
    ("putaway-rules", "WarehouseManagementPutawayRules", "PutawayRules"),
    ("reorder-points", "WarehouseManagementReorderPoints", "ReorderPoints"),
    ("return-items", "WarehouseManagementReturnItems", "ReturnItems"),
    ("returns", "WarehouseManagementReturns", "Returns"),
    ("sales-order-items", "WarehouseManagementSalesOrderItems", "SalesOrderItems"),
    ("sales-orders", "WarehouseManagementSalesOrders", "SalesOrders"),
    ("stock-transfer", "WarehouseManagementStockTransfer", "StockTransfer"),
    ("suppliers", "WarehouseManagementSuppliers", "Suppliers"),
    ("task-items", "WarehouseManagementTaskItems", "TaskItems"),
    ("tasks", "WarehouseManagementTasks", "Tasks"),
    ("warehouses", "WarehouseManagementWarehouses", "Warehouses"),
]

def to_camel_case(s):
    """Convert kebab-case to camelCase."""
    parts = s.split('-')
    return parts[0] + ''.join(p.capitalize() for p in parts[1:])

def to_display_name(s):
    """Convert kebab-case to Title Case."""
    return ' '.join(word.capitalize() for word in s.split('-'))

def to_pascal_case(s):
    """Convert kebab-case to PascalCase."""
    return ''.join(word.capitalize() for word in s.split('-'))

def generate_create_tsx(kebab, collection, schema):
    """Generate create.tsx with empty schema object."""
    camel = to_camel_case(kebab)
    display = to_display_name(kebab)
    
    return f'''import {{ formOptions }} from "@tanstack/react-form";
import {{
  UseNavigateResult,
  useNavigate,
  useRouteContext,
}} from "@tanstack/react-router";
import {{ ClientResponseError }} from "pocketbase";
import {{ toast }} from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {{
  fieldRegistry,
  toAutoFormFieldSet,
}} from "@/components/ui/autoform-tanstack/types";
import {{ DialogFooter }} from "@/components/ui/dialog";
import {{ useAppForm }} from "@/components/ui/forms";
import {{
  Collections,
  TypedPocketBase,
}} from "@/lib/pb.types";
import {{ {schema}Schema }} from "@/pocketbase/schemas/warehouse-management/{kebab}";

export const CreateSchema = z.object({{}});

const FormOption = formOptions({{
  defaultValues: {{}} as z.infer<typeof CreateSchema>,
  validators: {{
    onSubmit: CreateSchema,
  }},
  onSubmitMeta: {{}} as {{
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  }},
  onSubmit: async ({{ value, meta }}) => {{
    try {{
      await meta.pocketbase.collection(Collections.{collection}).create(value);
      toast.success("{display} created successfully!");
    }} catch (error) {{
      if (error instanceof ClientResponseError) {{
        toast.error(
          `Failed to create {kebab}: ${{error.message}} (${{error.status}})`
        );
      }}
    }} finally {{
      meta.navigate!({{ search: (prev) => ({{ ...prev, action: undefined }}) }});
    }}
  }},
}});

const CreateForm = () => {{
  const navigate = useNavigate({{ from: "/dashboard/$schema/$collection" }});
  const {{ pocketbase }} = useRouteContext({{
    from: "/dashboard/$schema/$collection",
  }});

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={{(e) => {{
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({{ navigate, pocketbase }});
      }}}}
    >
      <form.AppForm>
        <AutoFieldSet form={{form as any}} {{...toAutoFormFieldSet(CreateSchema)}} />
        <DialogFooter>
          <form.SubmitButton>Create {display}</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
}};

export default CreateForm;
'''

def generate_update_tsx(kebab, collection, schema):
    """Generate update.tsx."""
    camel = to_camel_case(kebab)
    display = to_display_name(kebab)
    
    return f'''import {{ formOptions }} from "@tanstack/react-form";
import {{ useQuery }} from "@tanstack/react-query";
import {{
  UseNavigateResult,
  useNavigate,
  useRouteContext,
  useSearch,
}} from "@tanstack/react-router";
import {{ ClientResponseError }} from "pocketbase";
import {{ toast }} from "sonner";
import z from "zod";
import AutoFieldSet from "@/components/ui/autoform-tanstack/auto-fieldset";
import {{
  fieldRegistry,
  toAutoFormFieldSet,
}} from "@/components/ui/autoform-tanstack/types";
import {{ DialogFooter }} from "@/components/ui/dialog";
import {{ useAppForm }} from "@/components/ui/forms";
import {{
  Collections,
  TypedPocketBase,
}} from "@/lib/pb.types";
import {{ CreateSchema }} from "./create";

export const UpdateSchema = z.object({{}});

const FormOption = formOptions({{
  defaultValues: {{}} as z.infer<typeof UpdateSchema>,
  validators: {{
    onSubmit: UpdateSchema,
  }},
  onSubmitMeta: {{}} as {{
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  }},
  onSubmit: async ({{ value, meta }}) => {{
    try {{
      await meta
        .pocketbase!.collection(Collections.{collection})
        .update(meta.id!, value);

      toast.success("{display} updated successfully!");
    }} catch (error) {{
      if (error instanceof ClientResponseError) {{
        toast.error(
          `Failed to update {kebab}: ${{error.message}} (${{error.status}})`
        );
      }}
    }} finally {{
      meta.navigate!({{ search: (prev) => ({{ ...prev, action: undefined, id: undefined }}) }});
    }}
  }},
}});

const UpdateForm = () => {{
  const navigate = useNavigate({{ from: "/dashboard/$schema/$collection" }});
  const {{ pocketbase }} = useRouteContext({{
    from: "/dashboard/$schema/$collection",
  }});
  const searchQuery = useSearch({{ from: "/dashboard/$schema/$collection" }});

  const {{ data }} = useQuery({{
    queryKey: ["{camel}", searchQuery.id],
    enabled: !!searchQuery.id,
    queryFn: async () => {{
      const record = await pocketbase
        .collection(Collections.{collection})
        .getOne(searchQuery.id!);
      return record;
    }},
  }});

  const form = useAppForm({{
    ...FormOption,
    defaultValues: data || {{}},
  }});

  return (
    <form
      onSubmit={{(e) => {{
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({{ navigate, pocketbase, id: searchQuery.id! }});
      }}}}
    >
      <form.AppForm>
        <AutoFieldSet
          form={{form as any}}
          {{...toAutoFormFieldSet(UpdateSchema)}}
        />
        <DialogFooter>
          <form.SubmitButton>Update {display}</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
}};

export default UpdateForm;
'''

def generate_delete_tsx(kebab, collection):
    """Generate delete.tsx."""
    display = to_display_name(kebab)
    
    return f'''import {{ formOptions }} from "@tanstack/react-form";
import {{
  UseNavigateResult,
  useNavigate,
  useRouteContext,
  useSearch,
}} from "@tanstack/react-router";
import {{ ClientResponseError }} from "pocketbase";
import {{ toast }} from "sonner";
import {{ DialogFooter }} from "@/components/ui/dialog";
import {{ useAppForm }} from "@/components/ui/forms";
import {{ Collections, TypedPocketBase }} from "@/lib/pb.types";

const FormOption = formOptions({{
  onSubmitMeta: {{}} as {{
    id: string;
    pocketbase: TypedPocketBase;
    navigate: UseNavigateResult<"/dashboard/$schema/$collection">;
  }},
  onSubmit: async ({{ meta }}) => {{
    try {{
      await meta
        .pocketbase!.collection(Collections.{collection})
        .delete(meta.id);
      toast.success("{display} deleted successfully!");
    }} catch (error) {{
      if (error instanceof ClientResponseError) {{
        toast.error(`Error: ${{error.message}}`);
      }}
    }} finally {{
      meta.navigate({{
        search: (prev) => ({{ ...prev, action: undefined, id: undefined }}),
      }});
    }}
  }},
}});

const DeleteForm = () => {{
  const navigate = useNavigate({{ from: "/dashboard/$schema/$collection" }});
  const {{ pocketbase }} = useRouteContext({{
    from: "/dashboard/$schema/$collection",
  }});
  const searchQuery = useSearch({{ from: "/dashboard/$schema/$collection" }});

  const form = useAppForm(FormOption);

  return (
    <form
      onSubmit={{(e) => {{
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit({{ id: searchQuery.id!, navigate, pocketbase }});
      }}}}
    >
      <form.AppForm>
        <p>
          Are you sure you want to delete this {kebab.replace('-', ' ')}? This action cannot be
          undone.
        </p>
        <DialogFooter>
          <form.SubmitButton>Delete {display}</form.SubmitButton>
        </DialogFooter>
      </form.AppForm>
    </form>
  );
}};

export default DeleteForm;
'''

def generate_index_tsx(kebab, collection):
    """Generate index.tsx."""
    display = to_display_name(kebab)
    pascal = to_pascal_case(kebab)
    
    return f'''import {{
  useNavigate,
  useSearch,
}} from "@tanstack/react-router";
import {{
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
}} from "@/components/ui/dialog";
import CreateForm from "./create";
import DeleteForm from "./delete";
import UpdateForm from "./update";

const {pascal}Actions = () => {{
  const searchQuery = useSearch({{ from: "/dashboard/$schema/$collection" }});
  const navigate = useNavigate({{ from: "/dashboard/$schema/$collection" }});

  let Component:
    | {{
        title: string;
        description?: string;
        Element: React.ReactNode;
      }}
    | undefined = undefined;

  if (searchQuery.action === "create") {{
    Component = {{
      title: "Create {display}",
      description: "Fill out the form to create a new {kebab.replace('-', ' ')}.",
      Element: <CreateForm />,
    }};
  }}

  if (searchQuery.action === "update" && searchQuery.id) {{
    Component = {{
      title: "Update {display}",
      description: "Modify the {kebab.replace('-', ' ')} details below.",
      Element: <UpdateForm />,
    }};
  }}

  if (searchQuery.action === "delete" && searchQuery.id) {{
    Component = {{
      title: "Delete {display}",
      description: "Are you sure you want to delete this {kebab.replace('-', ' ')}?",
      Element: <DeleteForm />,
    }};
  }}

  if (Component) {{
    return (
      <Dialog
        open={{!!searchQuery.action}}
        onOpenChange={{(open) => {{
          if (!open) {{
            navigate({{
              search: (prev) => ({{ ...prev, action: undefined, id: undefined }}),
            }});
          }}
        }}}}
      >
        <DialogContent className="max-h-3/4 overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{{Component.title}}</DialogTitle>
            <DialogDescription>{{Component.description}}</DialogDescription>
          </DialogHeader>
          {{Component.Element}}
        </DialogContent>
      </Dialog>
    );
  }}
}};

export default {pascal}Actions;
'''

def main():
    """Generate all warehouse-management CRUD files."""
    print("🏭 Warehouse-Management CRUD Boilerplate Generator")
    print("=" * 60)
    
    # Step 1: Create folders for each entity
    print("\n📁 Creating entity folders...")
    for kebab, _, _ in ENTITIES:
        entity_path = os.path.join(WM_PATH, kebab)
        os.makedirs(entity_path, exist_ok=True)
        print(f"  ✓ Created {kebab}/")
    
    # Step 2: Generate CRUD files
    print("\n📝 Generating CRUD files...")
    for kebab, collection, schema in ENTITIES:
        entity_path = os.path.join(WM_PATH, kebab)
        
        # Create files
        with open(os.path.join(entity_path, "create.tsx"), "w") as f:
            f.write(generate_create_tsx(kebab, collection, schema))
        
        with open(os.path.join(entity_path, "update.tsx"), "w") as f:
            f.write(generate_update_tsx(kebab, collection, schema))
        
        with open(os.path.join(entity_path, "delete.tsx"), "w") as f:
            f.write(generate_delete_tsx(kebab, collection))
        
        with open(os.path.join(entity_path, "index.tsx"), "w") as f:
            f.write(generate_index_tsx(kebab, collection))
        
        print(f"  ✓ Generated {kebab} (4 files)")
    
    # Step 3: Delete old monolithic files
    print("\n🗑️  Deleting old monolithic files...")
    for kebab, _, _ in ENTITIES:
        old_file = os.path.join(WM_PATH, f"{kebab}.tsx")
        if os.path.exists(old_file):
            os.remove(old_file)
            print(f"  ✓ Deleted {kebab}.tsx")
    
    # Summary
    print("\n" + "=" * 60)
    print("✅ SUCCESS!")
    print(f"   Generated {len(ENTITIES)} entities with 4 files each")
    print(f"   Total files created: {len(ENTITIES) * 4}")
    print(f"   Old monolithic files deleted: {len(ENTITIES)}")
    print("\n💡 Next steps:")
    print("   1. Run: just check (format with Biome)")
    print("   2. Add specific field definitions to create.tsx for each entity")
    print("   3. Test the dynamic routing at /routes/dashboard/$schema.$collection.tsx")

if __name__ == "__main__":
    main()
