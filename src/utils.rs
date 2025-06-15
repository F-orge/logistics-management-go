use axum::{extract::FromRequestParts, http::StatusCode};
use chrono::{DateTime, Duration, Utc};
use entity::users;
use hmac::{Hmac, Mac};
use jwt::{SignWithKey, VerifyWithKey};
use serde::{Deserialize, Serialize};
use sha2::Sha256;
use uuid::Uuid;

use crate::api::error::{APIError, APIErrorResponse};

#[derive(Debug, Deserialize, Serialize)]
pub struct JWTClaims {
    #[serde(rename = "sub")]
    pub subject: Uuid,
    #[serde(rename = "exp")]
    pub expiry: DateTime<Utc>,
    #[serde(rename = "iss")]
    pub issuer: String,
    #[serde(rename = "aud")]
    pub audience: String,
    #[serde(rename = "nbf")]
    pub not_before_time: DateTime<Utc>,
    #[serde(rename = "iat")]
    pub issued_at: DateTime<Utc>,
    #[serde(rename = "jti")]
    pub jwt_id: Uuid,
    pub record: users::Model,
}

impl JWTClaims {
    pub fn new(record: users::Model, exp_duration: Duration, issuer: &str, audience: &str) -> Self {
        let now = Utc::now();
        Self {
            subject: record.id.clone(),
            expiry: now + exp_duration,
            issuer: issuer.into(),
            audience: audience.into(),
            not_before_time: now + Duration::milliseconds(250),
            issued_at: now,
            jwt_id: Uuid::new_v4(),
            record,
        }
    }

    pub fn sign(&self, token_key: &str) -> Result<String, anyhow::Error> {
        let key: Hmac<Sha256> = Hmac::new_from_slice(token_key.as_bytes())?;
        let token = self.sign_with_key(&key)?;
        Ok(token)
    }

    pub fn verify(
        token: &str,
        token_key: &str,
        issuer: &str,
        audience: &str,
    ) -> Result<Self, anyhow::Error> {
        let key: Hmac<Sha256> = Hmac::new_from_slice(token_key.as_bytes())?;
        let claims: Self = token.verify_with_key(&key)?;

        let now = Utc::now();

        if claims.expiry < now {
            return Err(anyhow::anyhow!(
                "Token expired at {}, current time is {}",
                claims.expiry,
                now
            ));
        }

        if claims.not_before_time > now {
            return Err(anyhow::anyhow!(
                "Token cannot be used before {}, current time is {}",
                claims.not_before_time,
                now
            ));
        }

        if claims.issuer != issuer {
            return Err(anyhow::anyhow!(
                "Invalid issuer: expected '{}', found '{}'",
                issuer,
                claims.issuer
            ));
        }

        if claims.audience != audience {
            return Err(anyhow::anyhow!(
                "Invalid audience: expected '{}', found '{}'",
                audience,
                claims.audience
            ));
        }

        Ok(claims)
    }
}

impl<S> FromRequestParts<S> for JWTClaims
where
    S: Send + Sync,
{
    type Rejection = APIError;

    async fn from_request_parts(
        parts: &mut axum::http::request::Parts,
        _: &S,
    ) -> Result<Self, Self::Rejection> {
        let auth_header = parts
            .headers
            .get("Authorization")
            .ok_or(APIError::StatusCode((
                StatusCode::FORBIDDEN,
                "`Authorization` header required".into(),
            )))?;

        let parts = auth_header
            .to_str()
            .map_err(|_| {
                APIError::StatusCode((StatusCode::FORBIDDEN, "Invalid Auth header".into()))
            })?
            .split(" ")
            .collect::<Vec<_>>();

        if parts.len() != 2 {
            return Err(APIError::StatusCode((
                StatusCode::FORBIDDEN,
                "Invalid Auth header".into(),
            )));
        }

        let (format, token) = (parts[0], parts[1]);

        if format.to_lowercase() != "bearer" {
            return Err(APIError::StatusCode((
                StatusCode::FORBIDDEN,
                "Invalid Auth header format".into(),
            )));
        }

        let claims = Self::verify(
            token,
            "secret-key",
            "staging-lms.marahuyo.dev",
            "staging-lms.marahuyo.dev",
        )
        .map_err(|err| APIError::StatusCode((StatusCode::FORBIDDEN, err.to_string())))?;

        Ok(claims)
    }
}
