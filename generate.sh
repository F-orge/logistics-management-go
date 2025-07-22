
sea-orm-cli generate entity -o src/entities/_generated --with-serde deserialize --model-extra-derives 'async_graphql::SimpleObject' --expanded-format --serde-skip-hidden-column --serde-skip-deserializing-primary-key --enum-extra-derives 'async_graphql::Enum' --with-copy-enums

TARGET_DIR="src/entities/_generated"

OLD_DERIVE_MACRO='#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn)]'

NEW_DERIVE_MACRO='#[derive(Copy, Clone, Debug, EnumIter, DeriveColumn, PartialEq, Eq, async_graphql::Enum)]'

set -e

echo "Starting derive macro update script..."

echo "Changing directory to '$TARGET_DIR'..."

cd "$TARGET_DIR"

ESCAPED_OLD_DERIVE_MACRO=$(printf '%s\n' "$OLD_DERIVE_MACRO" | sed -e 's/[]\/$*.^[]/\\&/g')
DELIMITER='|'

echo "Searching for files and performing replacement in '$(pwd)'..."

find . -type f -name "*.rs" | while read -r file; do
    # Get the base filename without the .rs extension (e.g., "./my_file" -> "my_file")
    base_filename=$(basename "$file" .rs)

    # Convert snake_case filename to PascalCase for the graphql macro name.
    pascal_case_name=$(echo "$base_filename" | perl -pe 's/(^|_)([a-z])/\u$2/g')

    # --- Task 1: Update the `enum Column` ---
    enum_graphql_macro="#[graphql(name = \"${pascal_case_name}Column\")]"

    # Check if the enum is already updated.
    if grep -qF "$enum_graphql_macro" "$file"; then
        echo "  ⚪️ Skipped Enum (already updated): $(basename "$file")"
    else
        echo "  ⏳ Updating Enum in: $(basename "$file")"
        # Use awk to replace the old macro and insert the new one.
        awk -v old="$OLD_DERIVE_MACRO" \
            -v new="$NEW_DERIVE_MACRO" \
            -v gql="$enum_graphql_macro" \
            '
            $0 == old {
                print new
                print gql
                next
            }
            { print }
            ' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
        echo "  ✅ Updated Enum in: $(basename "$file")"
    fi

    # --- Task 2: Update the `struct Model` ---
    model_graphql_macro="#[graphql(name = \"${pascal_case_name}Model\")]"

    # Check if the struct is already updated.
    if grep -qF "$model_graphql_macro" "$file"; then
        echo "  ⚪️ Skipped Model (already updated): $(basename "$file")"
    else
        echo "  ⏳ Updating Model in: $(basename "$file")"
        # Use awk to insert the new macro before `pub struct Model {`
        awk -v gql_model="$model_graphql_macro" '
        /^\s*pub struct Model \{/ {
            print gql_model
        }
        { print }
        ' "$file" > "${file}.tmp" && mv "${file}.tmp" "$file"
        echo "  ✅ Updated Model in: $(basename "$file")"
    fi
done

echo "✅ Script finished successfully."