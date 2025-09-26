import { graphql } from "@/lib/graphql/client";

export const createCampaign = graphql(`
  mutation CreateCampaign($payload: CreateCampaignInput!) {
    crm {
      createCampaign(payload: $payload) {
        id
        name
        budget
        endDate
        startDate
        createdAt
        updatedAt
      }
    }
  }
`);

export const createCase = graphql(`
  mutation CreateCase($payload: CreateCaseInput!) {
    crm {
      createCase(payload: $payload) {
        id
        caseNumber
        contact {
          company {
            name
            industry
            website
            phoneNumber
          }
          email
          name
          jobTitle
          phoneNumber
        }
        description
        owner {
          email
          name
          image
          role
        }
        priority
        status
        type
        createdAt
        updatedAt
      }
    }
  }
`);

export const createCompany = graphql(`
  mutation CreateCompany($payload: CreateCompanyInput!) {
    crm {
      createCompany(payload: $payload) {
        id
        annualRevenue
        state
        street
        updatedAt
        website
        city
        country
        industry
        name
        owner {
          name
          email
          image
          role
        }
        createdAt
        phoneNumber
        postalCode
      }
    }
  }
`);

export const createContact = graphql(`
  mutation CreateContact($payload: CreateContactInput!) {
    crm {
      createContact(payload: $payload) {
        id
        company {
          name
          industry
          website
          phoneNumber
        }
        email
        jobTitle
        name 
        owner {
          name
          email
          image
          role
        }
        phoneNumber
        createdAt
        updatedAt
      }
    }
  }
`);

export const createInteraction = graphql(`
  mutation CreateInteraction($payload: CreateInteractionInput!) {
    crm {
      createInteraction(payload: $payload) {
        id
        case {
          caseNumber
          contact {
            company {
              name
              industry
              website
              phoneNumber
            }
          }
        }
        contact {
          name
          jobTitle
          email
          phoneNumber
        }
        interactionDate
        notes
        outcome
        type
        user {
          name
          email
          image
          role
        }
      }
    }
  }
`);

export const createInvoice = graphql(`
  mutation CreateInvoice($payload: CreateInvoiceInput!) {
    crm {
      createInvoice(payload: $payload) {
        id
        status
        total
        dueDate
        issueDate
        items(page: 0,limit: 20) {
          price
          product {
            name
            sku
            description
          }
          quantity
          createdAt
          updatedAt
        }
        opportunity {
          campaign {
            name
            startDate
            endDate
          }
          stage
          source
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export const createLead = graphql(`
  mutation CreateLead($payload: CreateLeadInput!) {
    crm {
      createLead(payload: $payload) {
        id
        name
        campaign {
          name
          startDate
          endDate
        }
        status
        owner {
          name
          email
          image
          role
        }
        convertedAt
        convertedContact {
          name
          email
          jobTitle
          phoneNumber
          company {
            name
            industry
            website
            phoneNumber
          }
        }
        convertedOpportunity {
          products(page: 0,limit: 20) {
            id
            name
            description
            price
            sku
            type
          }
        }
        email
        leadScore
        leadSource
        createdAt
        updatedAt
      }
    }
  }
`);

export const createNotification = graphql(`
  mutation CreateNotification($payload: CreateNotificationInput!) {
    crm {
      createNotification(payload: $payload) {
        id
        isRead
        link
        message
        user {
          email
          name
          image
          role
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export const createOpportunity = graphql(`
  mutation CreateOpportunity($payload: CreateOpportunityInput!) {
    crm {
      createOpportunity(payload: $payload) {
        id
        campaign {
          name
          budget
          startDate
          endDate
        }
        probability
        products(page: 0,limit: 10) {
          name
          price
          sku
          type
          description
        }
        source
        stage
        company {
          name
          industry
          phoneNumber
          website
        }
        contact {
          name
          phoneNumber
          jobTitle
          email
        }
        dealValue
        expectedCloseDate
        lostReason
        name
        owner {
          name
          email
          image
          role
        }
        createdAt
        updatedAt
      }
    }
  }
`);

export const createProduct = graphql(`
  mutation CreateProduct($payload: CreateProductInput!) {
    crm {
      createProduct(payload: $payload) {
        id
        name
        price
        description
        sku
        type
        createdAt
        updatedAt
      }
    }
  }
`);

export const createTag = graphql(`
  mutation CreateTag($payload: CreateTagInput!) {
    crm {
      createTag(payload: $payload) {
        id
        name
      }
    }
  }
`);

export const removeCampaign = graphql(`
  mutation RemoveCampaign($id: UUID!) {
    crm {
      removeCampaign(id: $id)
    }
  }
`);

export const removeCase = graphql(`
  mutation RemoveCase($id: UUID!) {
    crm {
      removeCase(id: $id)
    }
  }
`);

export const removeCompany = graphql(`
  mutation RemoveCompany($id: UUID!) {
    crm {
      removeCompany(id: $id)
    }
  }
`);

export const removeContact = graphql(`
  mutation RemoveContact($id: UUID!) {
    crm {
      removeContact(id: $id)
    }
  }
`);

export const removeInteraction = graphql(`
  mutation RemoveInteraction($id: UUID!) {
    crm {
      removeInteraction(id: $id)
    }
  }
`);

export const removeInvoice = graphql(`
  mutation RemoveInvoice($id: UUID!) {
    crm {
      removeInvoice(id: $id)
    }
  }
`);

export const removeLead = graphql(`
  mutation RemoveLead($id: UUID!) {
    crm {
      removeLead(id: $id)
    }
  }
`);

export const removeNotification = graphql(`
  mutation RemoveNotification($id: UUID!) {
    crm {
      removeNotification(id: $id)
    }
  }
`);

export const removeOpportunity = graphql(`
  mutation RemoveOpportunity($id: UUID!) {
    crm {
      removeOpportunity(id: $id)
    }
  }
`);

export const removeProduct = graphql(`
  mutation RemoveProduct($id: UUID!) {
    crm {
      removeProduct(id: $id)
    }
  }
`);

export const removeTag = graphql(`
  mutation RemoveTag($id: UUID!) {
    crm {
      removeTag(id: $id)
    }
  }
`);

export const addInvoiceItem = graphql(`
  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {
    crm {
      addInvoiceItem(id: $id,payload: $payload) {
        id
        status
        dueDate
        issueDate
        total
        items(page: 0,limit: 30) {
          product {
            name
            price
            type
            sku
            description
          }
        }
        opportunity {
          dealValue
          contact {
            name 
            phoneNumber
            email
            company {
              name
              industry
              website
              phoneNumber
            }
          }
          source
          stage
          company {
            name
            industry
            website
            phoneNumber
          }
        }
        paidAt
        paymentMethod
        sentAt
        createdAt
        updatedAt
      }
    }
  }  
`);
