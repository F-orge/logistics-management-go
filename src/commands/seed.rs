use fake::{Fake, Faker};
use graphql_auth::entities::{_generated::user, user::InsertUserInput};
use graphql_crm::entities::{
    _generated::{
        attachments, campaigns, cases, companies, contacts, interactions, invoice_items, invoices,
        leads, notifications, opportunities, opportunity_products, products, taggings, tags,
    },
    attachments::InsertAttachment,
    campaigns::InsertCampaign,
    cases::InsertCase,
    companies::InsertCompany,
    contacts::InsertContact,
    interactions::InsertInteraction,
    invoice_items::InsertInvoiceItem,
    invoices::InsertInvoice,
    leads::InsertLead,
    notifications::InsertNotification,
    opportunities::InsertOpportunity,
    opportunity_products::InsertOpportunityProduct,
    products::InsertProduct,
    taggings::InsertTagging,
    tags::InsertTag,
};
use rand::Rng;
use rand::{rng, seq::IndexedRandom};
use sea_orm::ActiveModelTrait;
use sea_orm::{Database, EntityTrait, IntoActiveModel, sea_query::OnConflict};

use crate::SeedArgs;

pub async fn execute(args: SeedArgs) -> anyhow::Result<()> {
    let db = Database::connect(args.database_url).await?;

    let mut rng = rng();

    // auth
    let users = fake::vec![InsertUserInput; 0..100]
        .into_iter()
        .map(|u| u.into_active_model())
        .collect::<Vec<_>>();

    let mut user_vec = vec![];

    for user in users {
        if let Ok(model) = user.insert(&db).await {
            user_vec.push(model);
        }
    }

    let users = user_vec;

    let tags = fake::vec![InsertTag; 0..30]
        .into_iter()
        .map(|t| t.into_active_model())
        .collect::<Vec<_>>();

    let tags = tags::Entity::insert_many(tags)
        .exec_with_returning_many(&db)
        .await?;

    // products
    let products = fake::vec![InsertProduct; 0..30]
        .into_iter()
        .map(|p| p.into_active_model())
        .collect::<Vec<_>>();

    let products = products::Entity::insert_many(products)
        .exec_with_returning_many(&db)
        .await?;

    // campaigns
    let campaigns = fake::vec![InsertCampaign; 0..30]
        .into_iter()
        .map(|c| c.into_active_model())
        .collect::<Vec<_>>();

    let campaigns = campaigns::Entity::insert_many(campaigns)
        .exec_with_returning_many(&db)
        .await?;

    // companies
    let mut companies = fake::vec![InsertCompany; 0..100];

    for company in &mut companies {
        if let Some(user) = users.choose(&mut rng) {
            company.owner_id = Some(user.id.clone());
        }
    }

    let companies = companies
        .into_iter()
        .map(|u| u.into_active_model())
        .collect::<Vec<_>>();

    let companies = companies::Entity::insert_many(companies)
        .exec_with_returning_many(&db)
        .await?;

    // contacts
    let mut contacts = fake::vec![InsertContact; 0..200];

    for contact in &mut contacts {
        if let Some(company) = companies.choose(&mut rng) {
            contact.company_id = Some(company.id);
        }
        if let Some(user) = users.choose(&mut rng) {
            contact.owner_id = user.id;
        }
    }

    let contacts = contacts
        .into_iter()
        .map(|c| c.into_active_model())
        .collect::<Vec<_>>();

    let contacts = contacts::Entity::insert_many(contacts)
        .exec_with_returning_many(&db)
        .await?;

    // opportunities
    let mut opportunities = fake::vec![InsertOpportunity; 0..150];

    for opportunity in &mut opportunities {
        if let Some(company) = companies.choose(&mut rng) {
            opportunity.company_id = Some(company.id);
        }
        if let Some(contact) = contacts.choose(&mut rng) {
            opportunity.contact_id = Some(contact.id);
        }
        if let Some(campaign) = campaigns.choose(&mut rng) {
            opportunity.campaign_id = Some(campaign.id);
        }
        if let Some(user) = users.choose(&mut rng) {
            opportunity.owner_id = user.id;
        }
    }

    let opportunities = opportunities
        .into_iter()
        .map(|o| o.into_active_model())
        .collect::<Vec<_>>();

    let opportunities = opportunities::Entity::insert_many(opportunities)
        .exec_with_returning_many(&db)
        .await?;

    // leads
    let mut leads = fake::vec![InsertLead; 0..120];
    for lead in &mut leads {
        if let Some(campaign) = campaigns.choose(&mut rng) {
            lead.campaign_id = Some(campaign.id);
        }
        if let Some(user) = users.choose(&mut rng) {
            lead.owner_id = user.id;
        }
        // Conversion fields left as None/null for now
    }
    let leads = leads
        .into_iter()
        .map(|l| l.into_active_model())
        .collect::<Vec<_>>();
    let leads = leads::Entity::insert_many(leads)
        .exec_with_returning_many(&db)
        .await?;

    // cases
    let mut cases = fake::vec![InsertCase; 0..80];
    for case in &mut cases {
        if let Some(contact) = contacts.choose(&mut rng) {
            case.contact_id = Some(contact.id);
        }
        if let Some(user) = users.choose(&mut rng) {
            case.owner_id = user.id;
        }
    }
    let cases = cases
        .into_iter()
        .map(|c| c.into_active_model())
        .collect::<Vec<_>>();
    let cases = cases::Entity::insert_many(cases)
        .exec_with_returning_many(&db)
        .await?;

    // interactions
    let mut interactions = fake::vec![InsertInteraction; 0..300];
    for interaction in &mut interactions {
        if let Some(contact) = contacts.choose(&mut rng) {
            interaction.contact_id = contact.id;
        }
        if let Some(user) = users.choose(&mut rng) {
            interaction.user_id = user.id;
        }
        if let Some(case) = cases.choose(&mut rng) {
            interaction.case_id = Some(case.id);
        }
    }
    let interactions = interactions
        .into_iter()
        .map(|i| i.into_active_model())
        .collect::<Vec<_>>();
    let interactions = interactions::Entity::insert_many(interactions)
        .exec_with_returning_many(&db)
        .await?;

    // opportunity_products
    let mut opportunity_products = Vec::new();
    for opportunity in &opportunities {
        for _ in 0..rng.random_range(1..=3) {
            if let Some(product) = products.choose(&mut rng) {
                opportunity_products.push(InsertOpportunityProduct {
                    opportunity_id: opportunity.id,
                    product_id: product.id,
                    quantity: rng.random_range(1..=10),
                });
            }
        }
    }
    let opportunity_products = opportunity_products
        .into_iter()
        .map(|op| op.into_active_model())
        .collect::<Vec<_>>();
    let opportunity_products = opportunity_products::Entity::insert_many(opportunity_products)
        .exec_with_returning_many(&db)
        .await?;

    // invoices
    let mut invoices = Vec::new();
    for opportunity in &opportunities {
        let mut invoice: InsertInvoice = Faker.fake();
        invoice.opportunity_id = Some(opportunity.id);
        invoices.push(invoice);
    }
    let invoices = invoices
        .into_iter()
        .map(|inv| inv.into_active_model())
        .collect::<Vec<_>>();
    let invoices = invoices::Entity::insert_many(invoices)
        .exec_with_returning_many(&db)
        .await?;

    // invoice_items
    let mut invoice_items = Vec::new();
    for invoice in &invoices {
        for _ in 0..rng.random_range(1..=3) {
            if let Some(product) = products.choose(&mut rng) {
                let mut item: InsertInvoiceItem = Faker.fake();
                item.invoice_id = invoice.id;
                item.product_id = product.id;
                item.price = product.price;
                invoice_items.push(item);
            }
        }
    }

    let invoice_items = invoice_items
        .into_iter()
        .map(|ii| ii.into_active_model())
        .collect::<Vec<_>>();

    let invoice_items = invoice_items::Entity::insert_many(invoice_items)
        .exec_with_returning_many(&db)
        .await?;

    // notifications
    let notifications = (0..100)
        .map(|_| {
            let user = users.choose(&mut rng).unwrap();
            let mut notif: InsertNotification = Faker.fake();
            notif.user_id = user.id;
            notif
        })
        .map(|n| n.into_active_model())
        .collect::<Vec<_>>();
    let notifications = notifications::Entity::insert_many(notifications)
        .exec_with_returning_many(&db)
        .await?;

    // attachments (polymorphic, assign to random contacts, opportunities, or cases)
    use graphql_crm::entities::_generated::sea_orm_active_enums::RecordType;
    let mut attachments = Vec::new();
    for _ in 0..60 {
        let (record_id, record_type) = match rng.random_range(0..3) {
            0 => (contacts.choose(&mut rng).unwrap().id, RecordType::Contacts),
            1 => (
                opportunities.choose(&mut rng).unwrap().id,
                RecordType::Opportunities,
            ),
            _ => (cases.choose(&mut rng).unwrap().id, RecordType::Cases),
        };
        let mut attachment: InsertAttachment = Faker.fake();
        attachment.record_id = Some(record_id);
        attachment.record_type = Some(record_type);
        attachments.push(attachment);
    }
    let attachments = attachments
        .into_iter()
        .map(|a| a.into_active_model())
        .collect::<Vec<_>>();
    let attachments = attachments::Entity::insert_many(attachments)
        .exec_with_returning_many(&db)
        .await?;

    // taggings (assign tags to random contacts, opportunities, or cases)
    let mut taggings = Vec::new();
    for _ in 0..100 {
        let tag = tags.choose(&mut rng).unwrap();
        let (record_id, record_type) = match rng.random_range(0..3) {
            0 => (contacts.choose(&mut rng).unwrap().id, RecordType::Contacts),
            1 => (
                opportunities.choose(&mut rng).unwrap().id,
                RecordType::Opportunities,
            ),
            _ => (cases.choose(&mut rng).unwrap().id, RecordType::Cases),
        };
        taggings.push(InsertTagging {
            tag_id: tag.id,
            record_id,
            record_type,
        });
    }
    let taggings = taggings
        .into_iter()
        .map(|t| t.into_active_model())
        .collect::<Vec<_>>();
    let _ = taggings::Entity::insert_many(taggings)
        .exec_with_returning_many(&db)
        .await?;

    Ok(())
}
