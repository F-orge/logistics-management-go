#!/bin/bash

# Create controls for all tables in the dashboard
# This script scans src/components/tables and creates corresponding controls

# Color codes
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

TABLES_DIR="src/components/tables"
CONTROLS_DIR="src/components/controls"
SCAFFOLD_SCRIPT="./scripts/scaffold-control.sh"

# Check if scaffold script exists
if [ ! -f "$SCAFFOLD_SCRIPT" ]; then
    echo -e "${RED}Error: $SCAFFOLD_SCRIPT not found${NC}"
    exit 1
fi

echo -e "${BLUE}========================================${NC}"
echo -e "${BLUE}Creating controls for all dashboard routes${NC}"
echo -e "${BLUE}========================================${NC}"
echo

created=0
skipped=0
errors=0

# Process each schema directory
for schema_path in "$TABLES_DIR"/*; do
    [ ! -d "$schema_path" ] && continue
    
    schema=$(basename "$schema_path")
    echo -e "${BLUE}Processing schema: ${schema}${NC}"

    # Process each .tsx file
    for table_file in "$schema_path"/*.tsx; do
        [ ! -f "$table_file" ] && continue
        
        basename_file=$(basename "$table_file")
        
        # Skip index files
        if [[ "$basename_file" == "index.ts" ]] || [[ "$basename_file" == "index.tsx" ]]; then
            continue
        fi

        # Extract table name
        table="${basename_file%.tsx}"

        # Check if control already exists
        control_path="${CONTROLS_DIR}/${schema}/${table}.tsx"
        if [ -f "$control_path" ]; then
            echo -e "  ${YELLOW}⊘ ${table}${NC} (updating)"
            ((skipped++))
        fi
        
        # Create the control (with force flag to overwrite)
        if bash "$SCAFFOLD_SCRIPT" "$schema" "$table" --force > /dev/null 2>&1; then
            echo -e "  ${GREEN}✓ ${table}${NC}"
            ((created++))
        else
            echo -e "  ${RED}✗ ${table}${NC} (error)"
            ((errors++))
        fi
    done

    echo
done

# Summary
echo -e "${BLUE}========================================${NC}"
echo -e "${GREEN}Created: ${created}${NC}"
echo -e "${YELLOW}Skipped: ${skipped}${NC}"
echo -e "${RED}Errors: ${errors}${NC}"
echo -e "${BLUE}========================================${NC}"
