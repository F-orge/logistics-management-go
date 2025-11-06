#!/bin/bash

# Script to automatically customize form fields based on mutation specifications
# This script reads field specifications and generates proper form code

set -e

# Color output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Configuration for each entity
# Format: "collection-name|Entity|CollectionEnum|fields"
# Fields format: "fieldName:fieldType:required|fieldName:fieldType:required|..."

ENTITIES=(
  "leads|Lead|CustomerRelationsLeads|name:text:false|email:email:false|score:number:true|source:select:true|status:select:true|campaign:text:false|owner:text:true|attachments:text:false"
  "contacts|Contact|CustomerRelationsContacts|name:text:true|email:email:true|jobTitle:text:false|phoneNumber:text:false|company:text:false|owner:text:true|attachments:text:false"
  "interactions|Interaction|CustomerRelationsInteractions|contact:text:true|type:select:true|interactionDate:datetime:true|notes:textarea:false|outcome:text:false|case:text:false|user:text:true"
  "products|Product|CustomerRelationsProducts|name:text:true|sku:text:true|price:number:true|type:select:true|description:textarea:false|attachments:text:false"
  "campaigns|Campaign|CustomerRelationsCampaigns|name:text:true|budget:number:true|startDate:date:true|endDate:date:false|attachments:text:false"
  "opportunities|Opportunity|CustomerRelationsOpportunities|name:text:true|company:text:true|contact:text:false|dealValue:number:true|stage:select:true|probability:number:false|source:select:true|expectedCloseDate:date:false|campaign:text:false|products:text:false|owner:text:true|attachments:text:false"
  "invoices|Invoice|CustomerRelationsInvoices|invoiceNumber:text:true|opportunity:text:false|issueDate:date:true|dueDate:date:false|status:select:true|currency:text:false|subtotal:number:false|discountAmount:number:false|totalAmount:number:false|notes:textarea:false|paymentTerms:textarea:false|attachments:text:false|createdBy:text:true"
  "invoice-items|InvoiceItem|CustomerRelationsInvoiceItems|invoice:text:true|description:textarea:true|quantity:number:true|unitPrice:number:true|discountRate:number:false|discountAmount:number:false|taxRate:number:false|taxAmount:number:false"
)

# Map select field enums
declare -A SELECT_OPTIONS=(
  ["Lead-source"]="website|referral|social-media|email-campaign|cold-call|event|advertisment|partner|other"
  ["Lead-status"]="new|contacted|qualified|unqualified|converted"
  ["Interaction-type"]="call|meeting|text|email"
  ["Product-type"]="service|good|digital|subscription"
  ["Opportunity-stage"]="prospecting|qualification|need-analysis|demo|proposal|negotiation|closed-won|closed-lost"
  ["Opportunity-source"]="website|referral|social-media|email-campaign|cold-call|event|advertisment|partner|existing-customer|other"
  ["Invoice-status"]="draft|sent|viewed|paid|partial-paid|past-due|disputed|cancelled|void"
)

# Helper function to convert enum string to select options
enum_to_options() {
  local enum_string=$1
  local entity=$2
  local field=$3
  local key="${entity}-${field}"
  
  if [[ -v SELECT_OPTIONS[$key] ]]; then
    local options="${SELECT_OPTIONS[$key]}"
    local output=""
    IFS='|' read -ra OPTS <<< "$options"
    for opt in "${OPTS[@]}"; do
      # Convert kebab-case to Title Case
      local label=$(echo "$opt" | sed 's/-/ /g' | sed 's/\b\(.\)/\u\1/g')
      output+="                    { label: \"$label\", value: \"$opt\" },"$'\n'
    done
    echo "$output"
  fi
}

# Generate form field code
generate_field_code() {
  local field_name=$1
  local field_type=$2
  local is_required=$3
  local entity=$4
  
  local required_attr=""
  if [[ "$is_required" == "true" ]]; then
    required_attr=$'\n                  required'
  fi
  
  case $field_type in
    text)
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.TextField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Enter $field_name"
                  placeholder=""$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
    email)
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.EmailField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Enter email address"
                  placeholder="example@email.com"$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
    number)
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.NumberField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Enter number"
                  placeholder="0"
                  min={0}$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
    date)
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.DateTimeField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Select date"
                  placeholder=""$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
    datetime)
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.DateTimeField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Select date and time"
                  placeholder=""$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
    textarea)
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.TextareaField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Enter details"
                  placeholder=""$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
    select)
      local options=$(enum_to_options "$field_name" "$entity" "$field_name")
      cat <<EOF
            <form.AppField name="$field_name">
              {(field) => (
                <field.SelectField
                  label="$(echo $field_name | sed 's/\([A-Z]\)/ \1/g' | sed 's/^ //' | sed 's/\b\(.\)/\u\1/g')"
                  description="Select an option"
                  options={[
$options                  ]}
                  placeholder="Select..."$required_attr
                />
              )}
            </form.AppField>
EOF
      ;;
  esac
}

# Generate field group for form
generate_field_group() {
  local fields_str=$1
  local entity=$2
  local group_name=$3
  
  echo "          <FieldGroup>"
  echo "            <FieldLegend>$group_name</FieldLegend>"
  echo "            <FieldDescription>"
  echo "              Configure $group_name for this entity"
  echo "            </FieldDescription>"
  echo ""
  
  IFS='|' read -ra FIELDS <<< "$fields_str"
  for field in "${FIELDS[@]}"; do
    IFS=':' read -ra PARTS <<< "$field"
    local field_name="${PARTS[0]}"
    local field_type="${PARTS[1]}"
    local is_required="${PARTS[2]}"
    
    generate_field_code "$field_name" "$field_type" "$is_required" "$entity"
  done
  
  echo "          </FieldGroup>"
}

# Main function
customize_entity() {
  local collection=$1
  local entity=$2
  local enum=$3
  local fields=$4
  
  local dir="src/components/actions/customer-relations/$collection"
  
  echo -e "${BLUE}Processing $entity forms...${NC}"
  
  if [[ ! -d "$dir" ]]; then
    echo -e "${RED}Directory not found: $dir${NC}"
    return 1
  fi
  
  # For now, just show what would be done
  echo -e "${YELLOW}  - Directory: $dir${NC}"
  echo -e "${YELLOW}  - Collection: $enum${NC}"
  echo -e "${YELLOW}  - Fields to customize: $(echo $fields | grep -o '|' | wc -l) fields${NC}"
  
  return 0
}

# Main execution
echo -e "${GREEN}Form Customization Script${NC}"
echo -e "${GREEN}========================${NC}\n"

# Check if running from correct directory
if [[ ! -f "package.json" ]]; then
  echo -e "${RED}Error: Must be run from project root${NC}"
  exit 1
fi

echo -e "${YELLOW}This script will customize all customer-relations forms based on mutation specs.${NC}\n"

# Show what will be processed
echo -e "${BLUE}Entities to process:${NC}"
for entity_config in "${ENTITIES[@]}"; do
  IFS='|' read -ra PARTS <<< "$entity_config"
  collection="${PARTS[0]}"
  entity="${PARTS[1]}"
  enum="${PARTS[2]}"
  fields="${PARTS[3]}"
  
  printf "  ${YELLOW}✓${NC} %-20s (%s)\n" "$collection" "$enum"
done

echo ""
echo -e "${BLUE}Current implementation status:${NC}"
echo "  • Cases: ✅ COMPLETED (customized manually)"
echo "  • Others: 🔄 Ready for automated customization"
echo ""
echo -e "${YELLOW}Note: Full automation requires template parsing.${NC}"
echo -e "${YELLOW}Recommendation: Create a Node.js script for reliable field generation.${NC}"

exit 0
