use async_graphql::{Context, Object, Upload};
use uuid::Uuid;

use crate::models::{attachments, enums::RecordType};

#[derive(Debug, Clone, Default)]
pub struct Mutation;

#[Object(name = "CrmAttachmentMutations")]
impl Mutation {
    async fn upload_attachment(
        &self,
        ctx: &Context<'_>,
        file: Upload,
        record_id: Uuid,
        record_type: RecordType,
    ) -> async_graphql::Result<attachments::Model> {
        let value = file.value(ctx)?;

        // todo: save this to a s3 bucket or in the vps file system
        // note: if file system. make sure traversal attack is handled properly

        todo!()
    }
    async fn remove_attachment(
        &self,
        ctx: &Context<'_>,
        id: Uuid,
    ) -> async_graphql::Result<String> {
        // todo: remove the attachment metadata in the database and remove the file binary to the object storage or file system.
        todo!()
    }
}
