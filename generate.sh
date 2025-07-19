
sea-orm-cli generate entity -o src/entities/auth/_generated -s auth --with-serde deserialize --model-extra-derives 'async_graphql::SimpleObject' --expanded-format --serde-skip-hidden-column --serde-skip-deserializing-primary-key --enum-extra-derives 'async_graphql::Enum' --with-copy-enums

echo "pub use super::*;" >> src/entities/auth/_generated/mod.rs

sea-orm-cli generate entity  -o src/entities/org/_generated  -s org --with-serde deserialize --model-extra-derives 'async_graphql::SimpleObject' --expanded-format  --serde-skip-hidden-column  --serde-skip-deserializing-primary-key   --enum-extra-derives 'async_graphql::Enum'  --with-copy-enums

echo "pub use super::*;" >> src/entities/org/_generated/mod.rs

sea-orm-cli generate entity  -o src/entities/crm/_generated  -s crm --with-serde deserialize --model-extra-derives 'async_graphql::SimpleObject' --expanded-format  --serde-skip-hidden-column  --serde-skip-deserializing-primary-key   --enum-extra-derives 'async_graphql::Enum'  --with-copy-enums

echo "pub use super::*;" >> src/entities/crm/_generated/mod.rs

sea-orm-cli generate entity  -o src/entities/lms/_generated  -s lms --with-serde deserialize --model-extra-derives 'async_graphql::SimpleObject' --expanded-format  --serde-skip-hidden-column  --serde-skip-deserializing-primary-key   --enum-extra-derives 'async_graphql::Enum'  --with-copy-enums

echo "pub use super::*;" >> src/entities/lms/_generated/mod.rs