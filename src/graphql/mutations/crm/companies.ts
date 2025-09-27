import { graphql } from "@/lib/graphql/client";

export const createCompany = graphql(`
  mutation CreateCompany($payload: CreateCompanyInput!) {
    crm {
      createCompany(payload: $payload) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyName = graphql(`
  mutation UpdateCompanyName($id: UUID!, $name: String!) {
    crm {
      updateCompanyName(id: $id, name: $name) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyStreet = graphql(`
  mutation UpdateCompanyStreet($id: UUID!, $street: String) {
    crm {
      updateCompanyStreet(id: $id, street: $street) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyCity = graphql(`
  mutation UpdateCompanyCity($id: UUID!, $city: String) {
    crm {
      updateCompanyCity(id: $id, city: $city) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyState = graphql(`
  mutation UpdateCompanyState($id: UUID!, $state: String) {
    crm {
      updateCompanyState(id: $id, state: $state) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyPostalCode = graphql(`
  mutation UpdateCompanyPostalCode($id: UUID!, $postalCode: String) {
    crm {
      updateCompanyPostalCode(id: $id, postalCode: $postalCode) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyCountry = graphql(`
  mutation UpdateCompanyCountry($id: UUID!, $country: String) {
    crm {
      updateCompanyCountry(id: $id, country: $country) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyPhoneNumber = graphql(`
  mutation UpdateCompanyPhoneNumber($id: UUID!, $phoneNumber: String) {
    crm {
      updateCompanyPhoneNumber(id: $id, phoneNumber: $phoneNumber) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyIndustry = graphql(`
  mutation UpdateCompanyIndustry($id: UUID!, $industry: String) {
    crm {
      updateCompanyIndustry(id: $id, industry: $industry) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyWebsite = graphql(`
  mutation UpdateCompanyWebsite($id: UUID!, $website: String) {
    crm {
      updateCompanyWebsite(id: $id, website: $website) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyAnnualRevenue = graphql(`
  mutation UpdateCompanyAnnualRevenue($id: UUID!, $annualRevenue: Decimal) {
    crm {
      updateCompanyAnnualRevenue(id: $id, annualRevenue: $annualRevenue) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
    }
  }
`);

export const updateCompanyOwnerId = graphql(`
  mutation UpdateCompanyOwnerId($id: UUID!, $ownerId: UUID) {
    crm {
      updateCompanyOwnerId(id: $id, ownerId: $ownerId) {
        id
        name
        industry
        annualRevenue
        phoneNumber
        website
        street
        city
        state
        postalCode
        country
        createdAt
        updatedAt
        owner {
          id
          name
        }
      }
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
