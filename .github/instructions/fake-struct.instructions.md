# Fake Data Implementation for Rust Structs

This document provides comprehensive guidelines for implementing fake data generation in Rust structs using the `fake` crate, specifically for GraphQL Insert structs in this project.

## Overview

The `fake` crate provides powerful fake data generation capabilities for Rust applications. This guide covers proper implementation patterns, common pitfalls, and field-specific faker recommendations.

## Prerequisites

Ensure your `Cargo.toml` includes the fake crate with appropriate features:

```toml
[dependencies]
fake = { version = "4", features = ["derive", "rust_decimal", "uuid", "chrono"] }
```

## Basic Implementation Pattern

### Required Imports

```rust
use fake::Dummy;
use fake::locales::EN;
```

### Struct Definition

```rust
#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertEntity {
    #[dummy(faker = "appropriate_faker")]
    pub field_name: FieldType,
    
    #[dummy(default)]
    pub optional_field: Option<Type>,
}
```

## Field-Specific Faker Guidelines

### String Fields

Choose fakers based on the semantic meaning of the field:

```rust
// Names and titles
#[dummy(faker = "Name(EN)")]
pub name: String,

#[dummy(faker = "CompanyName(EN)")]
pub company_name: String,

#[dummy(faker = "Title(EN)")]
pub job_title: Option<String>,

// Text content
#[dummy(faker = "Word(EN)")]
pub single_word: String,

#[dummy(faker = "Sentence(EN, 3..8)")]
pub description: Option<String>,

#[dummy(faker = "Paragraph(EN, 2..5)")]
pub long_text: Option<String>,

// Contact information
#[dummy(faker = "SafeEmail(EN)")]
pub email: String,

#[dummy(faker = "PhoneNumber(EN)")]
pub phone: Option<String>,

#[dummy(faker = "CellNumber(EN)")]
pub mobile: Option<String>,

// Web and URLs
#[dummy(faker = "DomainSuffix(EN)")]
pub website: Option<String>,

#[dummy(faker = "Username(EN)")]
pub username: String,

// Addresses
#[dummy(faker = "StreetName(EN)")]
pub street: Option<String>,

#[dummy(faker = "CityName(EN)")]
pub city: Option<String>,

#[dummy(faker = "StateName(EN)")]
pub state: Option<String>,

#[dummy(faker = "PostCode(EN)")]
pub postal_code: Option<String>,

#[dummy(faker = "CountryName(EN)")]
pub country: Option<String>,

// File system
#[dummy(faker = "FileName(EN)")]
pub file_name: String,

#[dummy(faker = "FilePath(EN)")]
pub file_path: String,

#[dummy(faker = "MimeType(EN)")]
pub mime_type: Option<String>,
```

### Numeric Fields

```rust
// Integer ranges
#[dummy(faker = "1..100")]
pub score: i32,

#[dummy(faker = "1..10")]
pub quantity: i32,

// Float ranges
#[dummy(faker = "0.0..1.0")]
pub probability: f32,

#[dummy(faker = "0.0..100.0")]
pub percentage: f64,

// Formatted numbers
#[dummy(faker = "NumberWithFormat(EN, \"###-##-####\")")]
pub ssn: String,

#[dummy(faker = "NumberWithFormat(EN, \"CASE-#####\")")]
pub case_number: String,

#[dummy(faker = "NumberWithFormat(EN, \"SKU-#####\")")]
pub sku: Option<String>,
```

### Decimal Fields (rust_decimal::Decimal)

**Important**: Never use float ranges with Decimal types. Use specific decimal fakers:

```rust
use fake::decimal::{PositiveDecimal, NegativeDecimal, Decimal as FakeDecimal};

// Positive monetary values
#[dummy(faker = "PositiveDecimal")]
pub price: Decimal,

#[dummy(faker = "PositiveDecimal")]
pub total: Option<Decimal>,

#[dummy(faker = "PositiveDecimal")]
pub annual_revenue: Option<Decimal>,

// Any decimal value
#[dummy(faker = "FakeDecimal")]
pub balance: Decimal,

// Negative values (rare)
#[dummy(faker = "NegativeDecimal")]
pub debt: Option<Decimal>,
```

### UUID Fields

Use `#[dummy(default)]` for UUID fields that should be auto-generated:

```rust
#[dummy(default)]
pub id: Uuid,

#[dummy(default)]
pub owner_id: Option<Uuid>,

#[dummy(default)]
pub parent_id: Option<Uuid>,
```

### Enum Fields

Use `#[dummy(default)]` for enum fields to get random variants:

```rust
#[dummy(default)]
pub status: Option<EntityStatus>,

#[dummy(default)]
pub priority: Option<Priority>,

#[dummy(default)]
pub r#type: Option<EntityType>,
```

### Date and Time Fields

Use `#[dummy(default)]` for date/time fields:

```rust
#[dummy(default)]
pub created_at: Option<DateTimeWithTimeZone>,

#[dummy(default)]
pub updated_at: Option<DateTimeWithTimeZone>,

#[dummy(default)]
pub due_date: Option<Date>,

#[dummy(default)]
pub start_date: Option<Date>,
```

### Boolean Fields

```rust
// Random true/false
#[dummy(default)]
pub is_active: bool,

#[dummy(default)]
pub is_verified: Option<bool>,

// Weighted boolean (30% chance of true)
#[dummy(faker = "Boolean(30)")]
pub is_premium: bool,
```

## Common Patterns by Domain

### CRM Entities

```rust
// Company
#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertCompany {
    #[dummy(faker = "CompanyName(EN)")]
    pub name: String,
    
    #[dummy(faker = "StreetName(EN)")]
    pub street: Option<String>,
    
    #[dummy(faker = "CityName(EN)")]
    pub city: Option<String>,
    
    #[dummy(faker = "Industry(EN)")]
    pub industry: Option<String>,
    
    #[dummy(faker = "PositiveDecimal")]
    pub annual_revenue: Option<Decimal>,
}

// Contact
#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertContact {
    #[dummy(faker = "Name(EN)")]
    pub name: String,
    
    #[dummy(faker = "SafeEmail(EN)")]
    pub email: String,
    
    #[dummy(faker = "PhoneNumber(EN)")]
    pub phone_number: Option<String>,
    
    #[dummy(faker = "Title(EN)")]
    pub job_title: Option<String>,
}

// Product
#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertProduct {
    #[dummy(faker = "Word(EN)")]
    pub name: String,
    
    #[dummy(faker = "NumberWithFormat(EN, \"SKU-#####\")")]
    pub sku: Option<String>,
    
    #[dummy(faker = "PositiveDecimal")]
    pub price: Decimal,
    
    #[dummy(faker = "Sentence(EN, 2..6)")]
    pub description: Option<String>,
}
```

### Financial Entities

```rust
#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInvoice {
    #[dummy(faker = "PositiveDecimal")]
    pub total: Option<Decimal>,
    
    #[dummy(default)]
    pub issue_date: Option<Date>,
    
    #[dummy(default)]
    pub due_date: Option<Date>,
    
    #[dummy(default)]
    pub status: Option<InvoiceStatus>,
}

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertInvoiceItem {
    #[dummy(faker = "1..10")]
    pub quantity: i32,
    
    #[dummy(faker = "PositiveDecimal")]
    pub price: Decimal,
}
```

### Content Entities

```rust
#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertNotification {
    #[dummy(faker = "Sentence(EN, 3..8)")]
    pub message: String,
    
    #[dummy(faker = "DomainSuffix(EN)")]
    pub link: Option<String>,
    
    #[dummy(default)]
    pub is_read: Option<bool>,
}

#[derive(Debug, Clone, InputObject, Dummy)]
pub struct InsertAttachment {
    #[dummy(faker = "FileName(EN)")]
    pub file_name: String,
    
    #[dummy(faker = "FilePath(EN)")]
    pub file_path: String,
    
    #[dummy(faker = "MimeType(EN)")]
    pub mime_type: Option<String>,
}
```

## Common Mistakes and Solutions

### ❌ Wrong: Using float ranges with Decimal
```rust
#[dummy(faker = "100.0..1000.0")]  // Compilation error!
pub price: Decimal,
```

### ✅ Correct: Using decimal-specific fakers
```rust
#[dummy(faker = "PositiveDecimal")]
pub price: Decimal,
```

### ❌ Wrong: Generic fakers for semantic fields
```rust
#[dummy(faker = "Word(EN)")]  // Too generic
pub email: String,

#[dummy(faker = "SafeEmail(EN)")]  // Wrong for URL
pub website_url: Option<String>,
```

### ✅ Correct: Semantic-specific fakers
```rust
#[dummy(faker = "SafeEmail(EN)")]
pub email: String,

#[dummy(faker = "DomainSuffix(EN)")]
pub website_url: Option<String>,
```

### ❌ Wrong: Missing required imports
```rust
// Missing faker imports will cause compilation errors
#[dummy(faker = "CompanyName(EN)")]  // Error: CompanyName not in scope
```

### ✅ Correct: Proper imports
```rust
use fake::faker::company::raw::CompanyName;
use fake::locales::EN;

#[dummy(faker = "CompanyName(EN)")]
pub name: String,
```

## Required Imports Reference

```rust
// Basic
use fake::Dummy;
use fake::locales::EN;

// Names and people
use fake::faker::name::raw::{Name, FirstName, LastName, Title};

// Contact
use fake::faker::internet::raw::{SafeEmail, DomainSuffix, Username};
use fake::faker::phone_number::raw::{PhoneNumber, CellNumber};

// Company
use fake::faker::company::raw::{CompanyName, Industry};

// Address
use fake::faker::address::raw::{
    StreetName, CityName, StateName, CountryName, PostCode
};

// Text content
use fake::faker::lorem::raw::{Word, Sentence, Paragraph};

// Numbers and formatting
use fake::faker::number::raw::NumberWithFormat;

// File system
use fake::faker::filesystem::raw::{FileName, FilePath, MimeType};

// Decimals
use fake::decimal::{PositiveDecimal, NegativeDecimal, Decimal as FakeDecimal};

// Job and profession
use fake::faker::job::raw::{Title as JobTitle, Field, Position};

// Boolean
use fake::faker::boolean::raw::Boolean;
```

## Testing Fake Data Generation

After implementing fake data, verify it works:

```rust
#[cfg(test)]
mod tests {
    use super::*;
    use fake::{Fake, Faker};

    #[test]
    fn test_fake_data_generation() {
        let fake_entity: InsertEntity = Faker.fake();
        
        // Verify fields are populated appropriately
        assert!(!fake_entity.name.is_empty());
        assert!(fake_entity.email.contains('@'));
        
        println!("Generated fake entity: {:?}", fake_entity);
    }
}
```

## Best Practices

1. **Semantic Appropriateness**: Choose fakers that match the real-world meaning of your fields
2. **Locale Consistency**: Use consistent locales (typically `EN`) across your application
3. **Range Appropriateness**: Use realistic ranges for numeric fields
4. **Type Safety**: Always use type-appropriate fakers (especially for Decimal types)
5. **Import Organization**: Group faker imports logically and only import what you need
6. **Documentation**: Document any non-obvious faker choices in comments
7. **Testing**: Always test that fake data generation works as expected

## Compilation Issues

If you encounter compilation errors:

1. **Check imports**: Ensure all required faker types are imported
2. **Verify feature flags**: Make sure your `Cargo.toml` includes necessary features
3. **Type compatibility**: Ensure faker types match field types (especially Decimal)
4. **Syntax**: Verify faker syntax matches the crate documentation

## Extending This Guide

When adding new entity types or encountering new field patterns:

1. Document the new pattern in this file
2. Include both wrong and correct examples
3. Add necessary imports to the reference section
4. Test the pattern thoroughly before documenting