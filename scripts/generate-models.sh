#!/bin/bash

# Script to generate Go model files based on schema.json collections

MODEL_DIR="./models"
SCHEMA_FILE="./scripts/schema.json"

# Ensure models directory exists
mkdir -p "$MODEL_DIR"

# Get all collection names from schema
collections=$(jq -r '.collections[].name' "$SCHEMA_FILE")

# Template for generating model files
generate_model() {
  local collection_name=$1
  
  # Convert snake_case to PascalCase
  # e.g., customer_relations_campaign -> CustomerRelationsCampaign
  local model_name=$(echo "$collection_name" | sed -r 's/(^|_)([a-z])/\U\2/g')
  
  # Create file path with snake_case
  local file_name="${collection_name}.go"
  local file_path="$MODEL_DIR/$file_name"
  
  # Only create if file doesn't exist
  if [ ! -f "$file_path" ]; then
    cat > "$file_path" << EOF
package models

import "github.com/pocketbase/pocketbase/core"

type ${model_name}Model struct {
	core.BaseRecordProxy
}
EOF
    echo "✓ Created $file_path"
  else
    echo "✗ Skipped $file_path (already exists)"
  fi
}

# Generate models for each collection
echo "Generating models from schema..."
while IFS= read -r collection; do
  if [ ! -z "$collection" ]; then
    generate_model "$collection"
  fi
done <<< "$collections"

echo "Done!"
