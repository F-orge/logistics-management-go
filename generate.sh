
sea-orm-cli generate entity -o src/entities/_generated --with-serde deserialize --model-extra-derives 'async_graphql::SimpleObject' --expanded-format --serde-skip-hidden-column --serde-skip-deserializing-primary-key --enum-extra-derives 'async_graphql::Enum' --with-copy-enums

echo "pub use super::*;" >> src/entities/mod.rs