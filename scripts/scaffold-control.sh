#!/bin/bash

# Scaffold a new control component
# Usage: ./scaffold-control.sh <schema> <table> [--force]
# Example: ./scaffold-control.sh customer-relations companies
# Example: ./scaffold-control.sh customer-relations companies --force

set -e

# Color codes for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Validate arguments
if [ $# -lt 2 ]; then
    echo -e "${RED}Error: Invalid number of arguments${NC}"
    echo "Usage: $0 <schema> <table> [--force]"
    echo "Example: $0 customer-relations companies"
    exit 1
fi

SCHEMA="$1"
TABLE="$2"
FORCE="${3:-}"

# Convert to singular form
# e.g., "companies" -> "company", "opportunities" -> "opportunity"
toSingular() {
    local word="$1"
    # Handle "ies" -> "y" (e.g., opportunities -> opportunity)
    if [[ "$word" =~ ies$ ]]; then
        echo "${word%ies}y"
    # Handle "ves" -> "f" or "fe" (e.g., leaves -> leaf, wives -> wife)
    elif [[ "$word" =~ ves$ ]]; then
        echo "${word%ves}f"
    # Handle "es" -> "" (e.g., boxes -> box, buses -> bus)
    elif [[ "$word" =~ [sxz]es$ ]] || [[ "$word" =~ ches$ ]] || [[ "$word" =~ shes$ ]]; then
        echo "${word%es}"
    # Handle simple "s" -> "" (e.g., companies -> company via ies, tasks -> task)
    elif [[ "$word" =~ s$ ]]; then
        echo "${word%s}"
    else
        echo "$word"
    fi
}

# Convert table name to PascalCase for component name
# e.g., "companies" -> "Companies", "customer-relations" -> "CustomerRelations"
toPascalCase() {
    echo "$1" | sed -r 's/(^|-)([a-z])/\U\2/g'
}

SINGULAR_TABLE="$(toSingular "$TABLE")"
COMPONENT_NAME="$(toPascalCase "$SINGULAR_TABLE")"
CONTROL_DIR="src/components/controls/${SCHEMA}"
FILE_PATH="${CONTROL_DIR}/${TABLE}.tsx"

# Check if file already exists
if [ -f "$FILE_PATH" ]; then
    if [ "$FORCE" != "--force" ]; then
        echo -e "${YELLOW}Warning: File already exists at ${FILE_PATH}${NC}"
        read -p "Overwrite? (y/N) " -n 1 -r
        echo
        if [[ ! $REPLY =~ ^[Yy]$ ]]; then
            echo "Aborted."
            exit 1
        fi
    fi
fi

# Create directory if it doesn't exist
mkdir -p "$CONTROL_DIR"

# Generate the component file
cat > "$FILE_PATH" << EOF
import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import React from "react";

const ${COMPONENT_NAME}Controls = () => {
  const navigate = useNavigate({ from: "/dashboard/\$schema/\$collection" });

  return (
    <section className="col-span-full flex justify-end">
      <Button
        onClick={() =>
          navigate({ search: (prev) => ({ ...prev, action: "create${COMPONENT_NAME}" }) })
        }
      >
        Create
      </Button>
    </section>
  );
};

export default ${COMPONENT_NAME}Controls;
EOF

echo -e "${GREEN}✓ Component created: ${FILE_PATH}${NC}"
echo -e "${GREEN}✓ Component name: ${COMPONENT_NAME}Controls${NC}"
