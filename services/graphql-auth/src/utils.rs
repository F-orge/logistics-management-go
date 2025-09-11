use chrono::Utc;
use rstest::fixture;
use uuid::Uuid;

use crate::entities::{
    account::InsertAccountInput, session::InsertSessionInput, user::InsertUserInput,
    verification::InsertVerificationInput,
};

#[fixture]
pub fn dummy_user() -> InsertUserInput {
    InsertUserInput {
        name: "john doe".into(),
        email: "johndoe@email.com".into(),
        email_verified: false,
        image: None,
        role: None,
        banned: false,
        ban_reason: None,
        ban_expires: None,
    }
}

#[fixture]
pub fn dummy_account() -> InsertAccountInput {
    InsertAccountInput {
        account_id: "acc_123".to_string(),
        provider_id: "provider_abc".to_string(),
        user_id: Uuid::new_v4(),
        access_token: Some("access_token_value".to_string()),
        refresh_token: Some("refresh_token_value".to_string()),
        id_token: Some("id_token_value".to_string()),
        access_token_expires_at: Some(Utc::now() + chrono::Duration::days(1)),
        refresh_token_expires_at: Some(Utc::now() + chrono::Duration::days(2)),
        scope: Some("read write".to_string()),
        password: Some("supersecretpassword".to_string()),
    }
}

#[fixture]
pub fn dummy_session() -> InsertSessionInput {
    InsertSessionInput {
        expires_at: Utc::now(),
        token: "sessiontoken123".to_string(),
        ip_address: Some("127.0.0.1".to_string()),
        user_agent: Some("Mozilla/5.0".to_string()),
        user_id: Uuid::new_v4(),
        impersonated_by: None,
    }
}

#[fixture]
pub fn dummy_verification() -> InsertVerificationInput {
    InsertVerificationInput {
        identifier: "dummy@email.com".to_string(),
        value: "dummytoken".to_string(),
        expires_at: Utc::now() + chrono::Duration::hours(1),
    }
}
