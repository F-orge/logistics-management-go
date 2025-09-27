import { graphql } from "@/lib/graphql/client";

export const createContact = graphql(`
  mutation CreateContact($payload: CreateContactInput!) {
    crm {
      createContact(payload: $payload) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactName = graphql(`
  mutation UpdateContactName($id: UUID!, $name: String!) {
    crm {
      updateContactName(id: $id, name: $name) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactEmail = graphql(`
  mutation UpdateContactEmail($id: UUID!, $email: String!) {
    crm {
      updateContactEmail(id: $id, email: $email) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactPhoneNumber = graphql(`
  mutation UpdateContactPhoneNumber($id: UUID!, $phoneNumber: String) {
    crm {
      updateContactPhoneNumber(id: $id, phoneNumber: $phoneNumber) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactJobTitle = graphql(`
  mutation UpdateContactJobTitle($id: UUID!, $jobTitle: String) {
    crm {
      updateContactJobTitle(id: $id, jobTitle: $jobTitle) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactCompanyId = graphql(`
  mutation UpdateContactCompanyId($id: UUID!, $companyId: UUID) {
    crm {
      updateContactCompanyId(id: $id, companyId: $companyId) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
    }
  }
`);

export const updateContactOwnerId = graphql(`
  mutation UpdateContactOwnerId($id: UUID!, $ownerId: UUID!) {
    crm {
      updateContactOwnerId(id: $id, ownerId: $ownerId) {
        id
        name
        email
        jobTitle
        phoneNumber
        createdAt
        updatedAt
        ownerId
        owner {
          id
          name
        }
        companyId
        company {
          id
          name
        }
      }
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
