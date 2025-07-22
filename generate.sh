
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

if [[ $(uname) == "Darwin" ]]; then
  find . -type f -name "*.rs" -print0 | xargs -0 sed -i '' "s${DELIMITER}${ESCAPED_OLD_DERIVE_MACRO}${DELIMITER}${NEW_DERIVE_MACRO}${DELIMITER}g"
else
  find . -type f -name "*.rs" -print0 | xargs -0 sed -i "s${DELIMITER}${ESCAPED_OLD_DERIVE_MACRO}${DELIMITER}${NEW_DERIVE_MACRO}${DELIMITER}g"
fi

echo "✅ Script finished successfully. Derive macros have been updated."