#!/bin/bash

# Script to quickly scaffold form trios (create/update/delete) for PocketBase collections
# Usage: ./scripts/create-forms.sh <schema-name> <collection-kebab-case> <Entity-PascalCase> <CollectionEnum>

SCHEMA_NAME=$1
COLLECTION_KEBAB=$2
ENTITY_PASCAL=$3
COLLECTION_ENUM=$4

if [ -z "$SCHEMA_NAME" ] || [ -z "$COLLECTION_KEBAB" ] || [ -z "$ENTITY_PASCAL" ] || [ -z "$COLLECTION_ENUM" ]; then
  echo "Usage: $0 <schema-name> <collection-kebab-case> <Entity-PascalCase> <CollectionEnum>"
  echo ""
  echo "Example:"
  echo "  $0 customer-relations leads Lead CustomerRelationsLeads"
  echo "  $0 customer-relations contacts Contact CustomerRelationsContacts"
  echo "  $0 billing-management invoices Invoice BillingManagementInvoices"
  exit 1
fi

# Convert PascalCase to camelCase for search params
ENTITY_CAMEL=$(echo "$ENTITY_PASCAL" | sed 's/\([A-Z]\)/\L\1/g' | sed 's/^./\U&/')

# Directory paths
COMPONENTS_DIR="src/components/actions/$SCHEMA_NAME/$COLLECTION_KEBAB"
TEMPLATE_DIR="src/components/actions/customer-relations/companies"

echo "Creating form scaffolding for $ENTITY_PASCAL..."
echo "  Schema: $SCHEMA_NAME"
echo "  Collection: $COLLECTION_KEBAB"
echo "  Entity: $ENTITY_PASCAL (camelCase: $ENTITY_CAMEL)"
echo "  Enum: $COLLECTION_ENUM"
echo ""

# Create directory if it doesn't exist
mkdir -p "$COMPONENTS_DIR"

# Copy and replace create.tsx
echo "Creating create.tsx..."
sed -e "s/Company/$ENTITY_PASCAL/g" \
    -e "s/company/$ENTITY_CAMEL/g" \
    -e "s/companies/$COLLECTION_KEBAB/g" \
    -e "s/CustomerRelationsCompanies/$COLLECTION_ENUM/g" \
    -e "s/createCompany/create$ENTITY_PASCAL/g" \
    "$TEMPLATE_DIR/create.tsx" > "$COMPONENTS_DIR/create.tsx"

# Copy and replace update.tsx
echo "Creating update.tsx..."
sed -e "s/Company/$ENTITY_PASCAL/g" \
    -e "s/company/$ENTITY_CAMEL/g" \
    -e "s/companies/$COLLECTION_KEBAB/g" \
    -e "s/CustomerRelationsCompanies/$COLLECTION_ENUM/g" \
    -e "s/updateCompany/update$ENTITY_PASCAL/g" \
    "$TEMPLATE_DIR/update.tsx" > "$COMPONENTS_DIR/update.tsx"

# Copy and replace delete.tsx
echo "Creating delete.tsx..."
sed -e "s/Company/$ENTITY_PASCAL/g" \
    -e "s/company/$ENTITY_CAMEL/g" \
    -e "s/companies/$COLLECTION_KEBAB/g" \
    -e "s/CustomerRelationsCompanies/$COLLECTION_ENUM/g" \
    -e "s/deleteCompany/delete$ENTITY_PASCAL/g" \
    "$TEMPLATE_DIR/delete.tsx" > "$COMPONENTS_DIR/delete.tsx"

# Create index.tsx barrel export
echo "Creating index.tsx..."
cat > "$COMPONENTS_DIR/index.tsx" << EOF
import React from "react";
import Create${ENTITY_PASCAL}FormDialog from "./create";
import Update${ENTITY_PASCAL}FormDialog from "./update";
import Delete${ENTITY_PASCAL}FormDialog from "./delete";

export default [
  <Create${ENTITY_PASCAL}FormDialog />,
  <Update${ENTITY_PASCAL}FormDialog />,
  <Delete${ENTITY_PASCAL}FormDialog />,
] satisfies React.ReactNode;
EOF

echo ""
echo "✅ Successfully created form scaffolding for $ENTITY_PASCAL at:"
echo "   $COMPONENTS_DIR/"
echo ""
echo "📝 Next steps:"
echo "   1. Edit $COMPONENTS_DIR/create.tsx to customize fields"
echo "   2. Edit $COMPONENTS_DIR/update.tsx to match create.tsx fields"
echo "   3. Edit $COMPONENTS_DIR/delete.tsx if needed (update identifier field)"
echo ""
echo "🔍 Don't forget to:"
echo "   - Update field names and groups per your schema specification"
echo "   - Adjust field types (TextField, NumberField, SelectField, etc.)"
echo "   - Add collection-specific validations"
echo "   - Update dialog titles and descriptions"
