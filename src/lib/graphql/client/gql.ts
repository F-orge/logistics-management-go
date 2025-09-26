/* eslint-disable */
import * as types from './graphql';



/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 * Learn more about it here: https://the-guild.dev/graphql/codegen/plugins/presets/preset-client#reducing-bundle-size
 */
type Documents = {
    "\n  mutation SignUpEmail($payload:SignUpEmailInput!) {\n    auth {\n      signUpEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": typeof types.SignUpEmailDocument,
    "\n  mutation SignInEmail($payload:SignInEmailInput!) {\n    auth {\n      signInEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": typeof types.SignInEmailDocument,
    "\n  mutation RevokeSession($token:String!) {\n    auth {\n      revokeSession(token: $token) {\n        message\n        success\n      }\n    }\n  }  \n": typeof types.RevokeSessionDocument,
    "\n  mutation RefreshSession {\n    auth {\n      refreshSession {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  } \n": typeof types.RefreshSessionDocument,
    "\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    auth {\n      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) \n    }\n  }\n": typeof types.ChangePasswordDocument,
    "\n  mutation CreateCampaign($payload: CreateCampaignInput!) {\n    crm {\n      createCampaign(payload: $payload) {\n        id\n        name\n        budget\n        endDate\n        startDate\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateCampaignDocument,
    "\n  mutation CreateCase($payload: CreateCaseInput!) {\n    crm {\n      createCase(payload: $payload) {\n        id\n        caseNumber\n        contact {\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n          email\n          name\n          jobTitle\n          phoneNumber\n        }\n        description\n        owner {\n          email\n          name\n          image\n          role\n        }\n        priority\n        status\n        type\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateCaseDocument,
    "\n  mutation CreateCompany($payload: CreateCompanyInput!) {\n    crm {\n      createCompany(payload: $payload) {\n        id\n        annualRevenue\n        state\n        street\n        updatedAt\n        website\n        city\n        country\n        industry\n        name\n        owner {\n          name\n          email\n          image\n          role\n        }\n        createdAt\n        phoneNumber\n        postalCode\n      }\n    }\n  }\n": typeof types.CreateCompanyDocument,
    "\n  mutation CreateContact($payload: CreateContactInput!) {\n    crm {\n      createContact(payload: $payload) {\n        id\n        company {\n          name\n          industry\n          website\n          phoneNumber\n        }\n        email\n        jobTitle\n        name \n        owner {\n          name\n          email\n          image\n          role\n        }\n        phoneNumber\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateContactDocument,
    "\n  mutation CreateInteraction($payload: CreateInteractionInput!) {\n    crm {\n      createInteraction(payload: $payload) {\n        id\n        case {\n          caseNumber\n          contact {\n            company {\n              name\n              industry\n              website\n              phoneNumber\n            }\n          }\n        }\n        contact {\n          name\n          jobTitle\n          email\n          phoneNumber\n        }\n        interactionDate\n        notes\n        outcome\n        type\n        user {\n          name\n          email\n          image\n          role\n        }\n      }\n    }\n  }\n": typeof types.CreateInteractionDocument,
    "\n  mutation CreateInvoice($payload: CreateInvoiceInput!) {\n    crm {\n      createInvoice(payload: $payload) {\n        id\n        status\n        total\n        dueDate\n        issueDate\n        items(page: 0,limit: 20) {\n          price\n          product {\n            name\n            sku\n            description\n          }\n          quantity\n          createdAt\n          updatedAt\n        }\n        opportunity {\n          campaign {\n            name\n            startDate\n            endDate\n          }\n          stage\n          source\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateInvoiceDocument,
    "\n  mutation CreateLead($payload: CreateLeadInput!) {\n    crm {\n      createLead(payload: $payload) {\n        id\n        name\n        campaign {\n          name\n          startDate\n          endDate\n        }\n        status\n        owner {\n          name\n          email\n          image\n          role\n        }\n        convertedAt\n        convertedContact {\n          name\n          email\n          jobTitle\n          phoneNumber\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n        }\n        convertedOpportunity {\n          products(page: 0,limit: 20) {\n            id\n            name\n            description\n            price\n            sku\n            type\n          }\n        }\n        email\n        leadScore\n        leadSource\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateLeadDocument,
    "\n  mutation CreateNotification($payload: CreateNotificationInput!) {\n    crm {\n      createNotification(payload: $payload) {\n        id\n        isRead\n        link\n        message\n        user {\n          email\n          name\n          image\n          role\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateNotificationDocument,
    "\n  mutation CreateOpportunity($payload: CreateOpportunityInput!) {\n    crm {\n      createOpportunity(payload: $payload) {\n        id\n        campaign {\n          name\n          budget\n          startDate\n          endDate\n        }\n        probability\n        products(page: 0,limit: 10) {\n          name\n          price\n          sku\n          type\n          description\n        }\n        source\n        stage\n        company {\n          name\n          industry\n          phoneNumber\n          website\n        }\n        contact {\n          name\n          phoneNumber\n          jobTitle\n          email\n        }\n        dealValue\n        expectedCloseDate\n        lostReason\n        name\n        owner {\n          name\n          email\n          image\n          role\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateOpportunityDocument,
    "\n  mutation CreateProduct($payload: CreateProductInput!) {\n    crm {\n      createProduct(payload: $payload) {\n        id\n        name\n        price\n        description\n        sku\n        type\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": typeof types.CreateProductDocument,
    "\n  mutation CreateTag($payload: CreateTagInput!) {\n    crm {\n      createTag(payload: $payload) {\n        id\n        name\n      }\n    }\n  }\n": typeof types.CreateTagDocument,
    "\n  mutation RemoveCampaign($id: UUID!) {\n    crm {\n      removeCampaign(id: $id)\n    }\n  }\n": typeof types.RemoveCampaignDocument,
    "\n  mutation RemoveCase($id: UUID!) {\n    crm {\n      removeCase(id: $id)\n    }\n  }\n": typeof types.RemoveCaseDocument,
    "\n  mutation RemoveCompany($id: UUID!) {\n    crm {\n      removeCompany(id: $id)\n    }\n  }\n": typeof types.RemoveCompanyDocument,
    "\n  mutation RemoveContact($id: UUID!) {\n    crm {\n      removeContact(id: $id)\n    }\n  }\n": typeof types.RemoveContactDocument,
    "\n  mutation RemoveInteraction($id: UUID!) {\n    crm {\n      removeInteraction(id: $id)\n    }\n  }\n": typeof types.RemoveInteractionDocument,
    "\n  mutation RemoveInvoice($id: UUID!) {\n    crm {\n      removeInvoice(id: $id)\n    }\n  }\n": typeof types.RemoveInvoiceDocument,
    "\n  mutation RemoveLead($id: UUID!) {\n    crm {\n      removeLead(id: $id)\n    }\n  }\n": typeof types.RemoveLeadDocument,
    "\n  mutation RemoveNotification($id: UUID!) {\n    crm {\n      removeNotification(id: $id)\n    }\n  }\n": typeof types.RemoveNotificationDocument,
    "\n  mutation RemoveOpportunity($id: UUID!) {\n    crm {\n      removeOpportunity(id: $id)\n    }\n  }\n": typeof types.RemoveOpportunityDocument,
    "\n  mutation RemoveProduct($id: UUID!) {\n    crm {\n      removeProduct(id: $id)\n    }\n  }\n": typeof types.RemoveProductDocument,
    "\n  mutation RemoveTag($id: UUID!) {\n    crm {\n      removeTag(id: $id)\n    }\n  }\n": typeof types.RemoveTagDocument,
    "\n  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {\n    crm {\n      addInvoiceItem(id: $id,payload: $payload) {\n        id\n        status\n        dueDate\n        issueDate\n        total\n        items(page: 0,limit: 30) {\n          product {\n            name\n            price\n            type\n            sku\n            description\n          }\n        }\n        opportunity {\n          dealValue\n          contact {\n            name \n            phoneNumber\n            email\n            company {\n              name\n              industry\n              website\n              phoneNumber\n            }\n          }\n          source\n          stage\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n        }\n        paidAt\n        paymentMethod\n        sentAt\n        createdAt\n        updatedAt\n      }\n    }\n  }  \n": typeof types.AddInvoiceItemDocument,
    "\n  query CrmAttachment($id: UUID!) {\n    crm {\n      attachment(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmAttachmentDocument,
    "\n  query CrmAttachments($limit: Int!, $page: Int!) {\n    crm {\n      attachments(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmAttachmentsDocument,
    "\n  query CrmCampaign($id: UUID!) {\n    crm {\n      campaign(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmCampaignDocument,
    "\n  query CrmCampaigns($limit: Int!, $page: Int!) {\n    crm {\n      campaigns(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmCampaignsDocument,
    "\n  query CrmCase($id: UUID!) {\n    crm {\n      case(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmCaseDocument,
    "\n  query CrmCases($limit: Int!, $page: Int!) {\n    crm {\n      cases(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmCasesDocument,
    "\n  query CrmCompanies($limit: Int!, $page: Int!) {\n    crm {\n      companies(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmCompaniesDocument,
    "\n  query CrmCompany($id: UUID!) {\n    crm {\n      company(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmCompanyDocument,
    "\n  query CrmContact($id: UUID!) {\n    crm {\n      contact(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmContactDocument,
    "\n  query CrmContacts($limit: Int!, $page: Int!) {\n    crm {\n      contacts(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmContactsDocument,
    "\n  query CrmInteraction($id: UUID!) {\n    crm {\n      interaction(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmInteractionDocument,
    "\n  query CrmInteractions($limit: Int!, $page: Int!) {\n    crm {\n      interactions(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmInteractionsDocument,
    "\n  query CrmInvoice($id: UUID!) {\n    crm {\n      invoice(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmInvoiceDocument,
    "\n  query CrmInvoices($limit: Int!, $page: Int!) {\n    crm {\n      invoices(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmInvoicesDocument,
    "\n  query CrmLead($id: UUID!) {\n    crm {\n      lead(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmLeadDocument,
    "\n  query CrmLeads($limit: Int!, $page: Int!) {\n    crm {\n      leads(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmLeadsDocument,
    "\n  query CrmNotification($id: UUID!) {\n    crm {\n      notification(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmNotificationDocument,
    "\n  query CrmNotifications($limit: Int!, $page: Int!) {\n    crm {\n      notifications(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmNotificationsDocument,
    "\n  query CrmOpportunities($limit: Int!, $page: Int!) {\n    crm {\n      opportunities(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmOpportunitiesDocument,
    "\n  query CrmOpportunity($id: UUID!) {\n    crm {\n      opportunity(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmOpportunityDocument,
    "\n  query CrmProduct($id: UUID!) {\n    crm {\n      product(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmProductDocument,
    "\n  query CrmProducts($limit: Int!, $page: Int!) {\n    crm {\n      products(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmProductsDocument,
    "\n  query CrmTag($id: UUID!) {\n    crm {\n      tag(id: $id) {\n        id\n      }\n    }\n  }\n": typeof types.CrmTagDocument,
    "\n  query CrmTags($limit: Int!, $page: Int!) {\n    crm {\n      tags(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": typeof types.CrmTagsDocument,
};
const documents: Documents = {
    "\n  mutation SignUpEmail($payload:SignUpEmailInput!) {\n    auth {\n      signUpEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": types.SignUpEmailDocument,
    "\n  mutation SignInEmail($payload:SignInEmailInput!) {\n    auth {\n      signInEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n": types.SignInEmailDocument,
    "\n  mutation RevokeSession($token:String!) {\n    auth {\n      revokeSession(token: $token) {\n        message\n        success\n      }\n    }\n  }  \n": types.RevokeSessionDocument,
    "\n  mutation RefreshSession {\n    auth {\n      refreshSession {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  } \n": types.RefreshSessionDocument,
    "\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    auth {\n      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) \n    }\n  }\n": types.ChangePasswordDocument,
    "\n  mutation CreateCampaign($payload: CreateCampaignInput!) {\n    crm {\n      createCampaign(payload: $payload) {\n        id\n        name\n        budget\n        endDate\n        startDate\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateCampaignDocument,
    "\n  mutation CreateCase($payload: CreateCaseInput!) {\n    crm {\n      createCase(payload: $payload) {\n        id\n        caseNumber\n        contact {\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n          email\n          name\n          jobTitle\n          phoneNumber\n        }\n        description\n        owner {\n          email\n          name\n          image\n          role\n        }\n        priority\n        status\n        type\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateCaseDocument,
    "\n  mutation CreateCompany($payload: CreateCompanyInput!) {\n    crm {\n      createCompany(payload: $payload) {\n        id\n        annualRevenue\n        state\n        street\n        updatedAt\n        website\n        city\n        country\n        industry\n        name\n        owner {\n          name\n          email\n          image\n          role\n        }\n        createdAt\n        phoneNumber\n        postalCode\n      }\n    }\n  }\n": types.CreateCompanyDocument,
    "\n  mutation CreateContact($payload: CreateContactInput!) {\n    crm {\n      createContact(payload: $payload) {\n        id\n        company {\n          name\n          industry\n          website\n          phoneNumber\n        }\n        email\n        jobTitle\n        name \n        owner {\n          name\n          email\n          image\n          role\n        }\n        phoneNumber\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateContactDocument,
    "\n  mutation CreateInteraction($payload: CreateInteractionInput!) {\n    crm {\n      createInteraction(payload: $payload) {\n        id\n        case {\n          caseNumber\n          contact {\n            company {\n              name\n              industry\n              website\n              phoneNumber\n            }\n          }\n        }\n        contact {\n          name\n          jobTitle\n          email\n          phoneNumber\n        }\n        interactionDate\n        notes\n        outcome\n        type\n        user {\n          name\n          email\n          image\n          role\n        }\n      }\n    }\n  }\n": types.CreateInteractionDocument,
    "\n  mutation CreateInvoice($payload: CreateInvoiceInput!) {\n    crm {\n      createInvoice(payload: $payload) {\n        id\n        status\n        total\n        dueDate\n        issueDate\n        items(page: 0,limit: 20) {\n          price\n          product {\n            name\n            sku\n            description\n          }\n          quantity\n          createdAt\n          updatedAt\n        }\n        opportunity {\n          campaign {\n            name\n            startDate\n            endDate\n          }\n          stage\n          source\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateInvoiceDocument,
    "\n  mutation CreateLead($payload: CreateLeadInput!) {\n    crm {\n      createLead(payload: $payload) {\n        id\n        name\n        campaign {\n          name\n          startDate\n          endDate\n        }\n        status\n        owner {\n          name\n          email\n          image\n          role\n        }\n        convertedAt\n        convertedContact {\n          name\n          email\n          jobTitle\n          phoneNumber\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n        }\n        convertedOpportunity {\n          products(page: 0,limit: 20) {\n            id\n            name\n            description\n            price\n            sku\n            type\n          }\n        }\n        email\n        leadScore\n        leadSource\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateLeadDocument,
    "\n  mutation CreateNotification($payload: CreateNotificationInput!) {\n    crm {\n      createNotification(payload: $payload) {\n        id\n        isRead\n        link\n        message\n        user {\n          email\n          name\n          image\n          role\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateNotificationDocument,
    "\n  mutation CreateOpportunity($payload: CreateOpportunityInput!) {\n    crm {\n      createOpportunity(payload: $payload) {\n        id\n        campaign {\n          name\n          budget\n          startDate\n          endDate\n        }\n        probability\n        products(page: 0,limit: 10) {\n          name\n          price\n          sku\n          type\n          description\n        }\n        source\n        stage\n        company {\n          name\n          industry\n          phoneNumber\n          website\n        }\n        contact {\n          name\n          phoneNumber\n          jobTitle\n          email\n        }\n        dealValue\n        expectedCloseDate\n        lostReason\n        name\n        owner {\n          name\n          email\n          image\n          role\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateOpportunityDocument,
    "\n  mutation CreateProduct($payload: CreateProductInput!) {\n    crm {\n      createProduct(payload: $payload) {\n        id\n        name\n        price\n        description\n        sku\n        type\n        createdAt\n        updatedAt\n      }\n    }\n  }\n": types.CreateProductDocument,
    "\n  mutation CreateTag($payload: CreateTagInput!) {\n    crm {\n      createTag(payload: $payload) {\n        id\n        name\n      }\n    }\n  }\n": types.CreateTagDocument,
    "\n  mutation RemoveCampaign($id: UUID!) {\n    crm {\n      removeCampaign(id: $id)\n    }\n  }\n": types.RemoveCampaignDocument,
    "\n  mutation RemoveCase($id: UUID!) {\n    crm {\n      removeCase(id: $id)\n    }\n  }\n": types.RemoveCaseDocument,
    "\n  mutation RemoveCompany($id: UUID!) {\n    crm {\n      removeCompany(id: $id)\n    }\n  }\n": types.RemoveCompanyDocument,
    "\n  mutation RemoveContact($id: UUID!) {\n    crm {\n      removeContact(id: $id)\n    }\n  }\n": types.RemoveContactDocument,
    "\n  mutation RemoveInteraction($id: UUID!) {\n    crm {\n      removeInteraction(id: $id)\n    }\n  }\n": types.RemoveInteractionDocument,
    "\n  mutation RemoveInvoice($id: UUID!) {\n    crm {\n      removeInvoice(id: $id)\n    }\n  }\n": types.RemoveInvoiceDocument,
    "\n  mutation RemoveLead($id: UUID!) {\n    crm {\n      removeLead(id: $id)\n    }\n  }\n": types.RemoveLeadDocument,
    "\n  mutation RemoveNotification($id: UUID!) {\n    crm {\n      removeNotification(id: $id)\n    }\n  }\n": types.RemoveNotificationDocument,
    "\n  mutation RemoveOpportunity($id: UUID!) {\n    crm {\n      removeOpportunity(id: $id)\n    }\n  }\n": types.RemoveOpportunityDocument,
    "\n  mutation RemoveProduct($id: UUID!) {\n    crm {\n      removeProduct(id: $id)\n    }\n  }\n": types.RemoveProductDocument,
    "\n  mutation RemoveTag($id: UUID!) {\n    crm {\n      removeTag(id: $id)\n    }\n  }\n": types.RemoveTagDocument,
    "\n  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {\n    crm {\n      addInvoiceItem(id: $id,payload: $payload) {\n        id\n        status\n        dueDate\n        issueDate\n        total\n        items(page: 0,limit: 30) {\n          product {\n            name\n            price\n            type\n            sku\n            description\n          }\n        }\n        opportunity {\n          dealValue\n          contact {\n            name \n            phoneNumber\n            email\n            company {\n              name\n              industry\n              website\n              phoneNumber\n            }\n          }\n          source\n          stage\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n        }\n        paidAt\n        paymentMethod\n        sentAt\n        createdAt\n        updatedAt\n      }\n    }\n  }  \n": types.AddInvoiceItemDocument,
    "\n  query CrmAttachment($id: UUID!) {\n    crm {\n      attachment(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmAttachmentDocument,
    "\n  query CrmAttachments($limit: Int!, $page: Int!) {\n    crm {\n      attachments(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmAttachmentsDocument,
    "\n  query CrmCampaign($id: UUID!) {\n    crm {\n      campaign(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmCampaignDocument,
    "\n  query CrmCampaigns($limit: Int!, $page: Int!) {\n    crm {\n      campaigns(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmCampaignsDocument,
    "\n  query CrmCase($id: UUID!) {\n    crm {\n      case(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmCaseDocument,
    "\n  query CrmCases($limit: Int!, $page: Int!) {\n    crm {\n      cases(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmCasesDocument,
    "\n  query CrmCompanies($limit: Int!, $page: Int!) {\n    crm {\n      companies(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmCompaniesDocument,
    "\n  query CrmCompany($id: UUID!) {\n    crm {\n      company(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmCompanyDocument,
    "\n  query CrmContact($id: UUID!) {\n    crm {\n      contact(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmContactDocument,
    "\n  query CrmContacts($limit: Int!, $page: Int!) {\n    crm {\n      contacts(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmContactsDocument,
    "\n  query CrmInteraction($id: UUID!) {\n    crm {\n      interaction(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmInteractionDocument,
    "\n  query CrmInteractions($limit: Int!, $page: Int!) {\n    crm {\n      interactions(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmInteractionsDocument,
    "\n  query CrmInvoice($id: UUID!) {\n    crm {\n      invoice(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmInvoiceDocument,
    "\n  query CrmInvoices($limit: Int!, $page: Int!) {\n    crm {\n      invoices(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmInvoicesDocument,
    "\n  query CrmLead($id: UUID!) {\n    crm {\n      lead(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmLeadDocument,
    "\n  query CrmLeads($limit: Int!, $page: Int!) {\n    crm {\n      leads(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmLeadsDocument,
    "\n  query CrmNotification($id: UUID!) {\n    crm {\n      notification(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmNotificationDocument,
    "\n  query CrmNotifications($limit: Int!, $page: Int!) {\n    crm {\n      notifications(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmNotificationsDocument,
    "\n  query CrmOpportunities($limit: Int!, $page: Int!) {\n    crm {\n      opportunities(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmOpportunitiesDocument,
    "\n  query CrmOpportunity($id: UUID!) {\n    crm {\n      opportunity(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmOpportunityDocument,
    "\n  query CrmProduct($id: UUID!) {\n    crm {\n      product(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmProductDocument,
    "\n  query CrmProducts($limit: Int!, $page: Int!) {\n    crm {\n      products(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmProductsDocument,
    "\n  query CrmTag($id: UUID!) {\n    crm {\n      tag(id: $id) {\n        id\n      }\n    }\n  }\n": types.CrmTagDocument,
    "\n  query CrmTags($limit: Int!, $page: Int!) {\n    crm {\n      tags(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n": types.CrmTagsDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignUpEmail($payload:SignUpEmailInput!) {\n    auth {\n      signUpEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n"): typeof import('./graphql').SignUpEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation SignInEmail($payload:SignInEmailInput!) {\n    auth {\n      signInEmail(payload:$payload) {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  }  \n"): typeof import('./graphql').SignInEmailDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RevokeSession($token:String!) {\n    auth {\n      revokeSession(token: $token) {\n        message\n        success\n      }\n    }\n  }  \n"): typeof import('./graphql').RevokeSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RefreshSession {\n    auth {\n      refreshSession {\n        token\n        user {\n          name\n          email\n          emailVerified\n          image\n          role\n        }\n      }\n    }\n  } \n"): typeof import('./graphql').RefreshSessionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation ChangePassword($newPassword: String!, $oldPassword: String!) {\n    auth {\n      changePassword(oldPassword: $oldPassword,newPassword: $newPassword) \n    }\n  }\n"): typeof import('./graphql').ChangePasswordDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCampaign($payload: CreateCampaignInput!) {\n    crm {\n      createCampaign(payload: $payload) {\n        id\n        name\n        budget\n        endDate\n        startDate\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCase($payload: CreateCaseInput!) {\n    crm {\n      createCase(payload: $payload) {\n        id\n        caseNumber\n        contact {\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n          email\n          name\n          jobTitle\n          phoneNumber\n        }\n        description\n        owner {\n          email\n          name\n          image\n          role\n        }\n        priority\n        status\n        type\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCompany($payload: CreateCompanyInput!) {\n    crm {\n      createCompany(payload: $payload) {\n        id\n        annualRevenue\n        state\n        street\n        updatedAt\n        website\n        city\n        country\n        industry\n        name\n        owner {\n          name\n          email\n          image\n          role\n        }\n        createdAt\n        phoneNumber\n        postalCode\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCompanyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateContact($payload: CreateContactInput!) {\n    crm {\n      createContact(payload: $payload) {\n        id\n        company {\n          name\n          industry\n          website\n          phoneNumber\n        }\n        email\n        jobTitle\n        name \n        owner {\n          name\n          email\n          image\n          role\n        }\n        phoneNumber\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInteraction($payload: CreateInteractionInput!) {\n    crm {\n      createInteraction(payload: $payload) {\n        id\n        case {\n          caseNumber\n          contact {\n            company {\n              name\n              industry\n              website\n              phoneNumber\n            }\n          }\n        }\n        contact {\n          name\n          jobTitle\n          email\n          phoneNumber\n        }\n        interactionDate\n        notes\n        outcome\n        type\n        user {\n          name\n          email\n          image\n          role\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInvoice($payload: CreateInvoiceInput!) {\n    crm {\n      createInvoice(payload: $payload) {\n        id\n        status\n        total\n        dueDate\n        issueDate\n        items(page: 0,limit: 20) {\n          price\n          product {\n            name\n            sku\n            description\n          }\n          quantity\n          createdAt\n          updatedAt\n        }\n        opportunity {\n          campaign {\n            name\n            startDate\n            endDate\n          }\n          stage\n          source\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLead($payload: CreateLeadInput!) {\n    crm {\n      createLead(payload: $payload) {\n        id\n        name\n        campaign {\n          name\n          startDate\n          endDate\n        }\n        status\n        owner {\n          name\n          email\n          image\n          role\n        }\n        convertedAt\n        convertedContact {\n          name\n          email\n          jobTitle\n          phoneNumber\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n        }\n        convertedOpportunity {\n          products(page: 0,limit: 20) {\n            id\n            name\n            description\n            price\n            sku\n            type\n          }\n        }\n        email\n        leadScore\n        leadSource\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateNotification($payload: CreateNotificationInput!) {\n    crm {\n      createNotification(payload: $payload) {\n        id\n        isRead\n        link\n        message\n        user {\n          email\n          name\n          image\n          role\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOpportunity($payload: CreateOpportunityInput!) {\n    crm {\n      createOpportunity(payload: $payload) {\n        id\n        campaign {\n          name\n          budget\n          startDate\n          endDate\n        }\n        probability\n        products(page: 0,limit: 10) {\n          name\n          price\n          sku\n          type\n          description\n        }\n        source\n        stage\n        company {\n          name\n          industry\n          phoneNumber\n          website\n        }\n        contact {\n          name\n          phoneNumber\n          jobTitle\n          email\n        }\n        dealValue\n        expectedCloseDate\n        lostReason\n        name\n        owner {\n          name\n          email\n          image\n          role\n        }\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($payload: CreateProductInput!) {\n    crm {\n      createProduct(payload: $payload) {\n        id\n        name\n        price\n        description\n        sku\n        type\n        createdAt\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').CreateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTag($payload: CreateTagInput!) {\n    crm {\n      createTag(payload: $payload) {\n        id\n        name\n      }\n    }\n  }\n"): typeof import('./graphql').CreateTagDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCampaign($id: UUID!) {\n    crm {\n      removeCampaign(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCase($id: UUID!) {\n    crm {\n      removeCase(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCompany($id: UUID!) {\n    crm {\n      removeCompany(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveCompanyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveContact($id: UUID!) {\n    crm {\n      removeContact(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInteraction($id: UUID!) {\n    crm {\n      removeInteraction(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInvoice($id: UUID!) {\n    crm {\n      removeInvoice(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveLead($id: UUID!) {\n    crm {\n      removeLead(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveNotification($id: UUID!) {\n    crm {\n      removeNotification(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOpportunity($id: UUID!) {\n    crm {\n      removeOpportunity(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveProduct($id: UUID!) {\n    crm {\n      removeProduct(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTag($id: UUID!) {\n    crm {\n      removeTag(id: $id)\n    }\n  }\n"): typeof import('./graphql').RemoveTagDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation AddInvoiceItem($id:UUID!,$payload:CreateInvoiceItemInput!) {\n    crm {\n      addInvoiceItem(id: $id,payload: $payload) {\n        id\n        status\n        dueDate\n        issueDate\n        total\n        items(page: 0,limit: 30) {\n          product {\n            name\n            price\n            type\n            sku\n            description\n          }\n        }\n        opportunity {\n          dealValue\n          contact {\n            name \n            phoneNumber\n            email\n            company {\n              name\n              industry\n              website\n              phoneNumber\n            }\n          }\n          source\n          stage\n          company {\n            name\n            industry\n            website\n            phoneNumber\n          }\n        }\n        paidAt\n        paymentMethod\n        sentAt\n        createdAt\n        updatedAt\n      }\n    }\n  }  \n"): typeof import('./graphql').AddInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmAttachment($id: UUID!) {\n    crm {\n      attachment(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmAttachmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmAttachments($limit: Int!, $page: Int!) {\n    crm {\n      attachments(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmAttachmentsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCampaign($id: UUID!) {\n    crm {\n      campaign(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCampaigns($limit: Int!, $page: Int!) {\n    crm {\n      campaigns(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCampaignsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCase($id: UUID!) {\n    crm {\n      case(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCases($limit: Int!, $page: Int!) {\n    crm {\n      cases(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCasesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCompanies($limit: Int!, $page: Int!) {\n    crm {\n      companies(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCompaniesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmCompany($id: UUID!) {\n    crm {\n      company(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmCompanyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmContact($id: UUID!) {\n    crm {\n      contact(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmContacts($limit: Int!, $page: Int!) {\n    crm {\n      contacts(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmContactsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmInteraction($id: UUID!) {\n    crm {\n      interaction(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmInteractions($limit: Int!, $page: Int!) {\n    crm {\n      interactions(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmInteractionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmInvoice($id: UUID!) {\n    crm {\n      invoice(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmInvoices($limit: Int!, $page: Int!) {\n    crm {\n      invoices(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmInvoicesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmLead($id: UUID!) {\n    crm {\n      lead(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmLeads($limit: Int!, $page: Int!) {\n    crm {\n      leads(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmLeadsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmNotification($id: UUID!) {\n    crm {\n      notification(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmNotifications($limit: Int!, $page: Int!) {\n    crm {\n      notifications(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmNotificationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmOpportunities($limit: Int!, $page: Int!) {\n    crm {\n      opportunities(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmOpportunitiesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmOpportunity($id: UUID!) {\n    crm {\n      opportunity(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmProduct($id: UUID!) {\n    crm {\n      product(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmProducts($limit: Int!, $page: Int!) {\n    crm {\n      products(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmTag($id: UUID!) {\n    crm {\n      tag(id: $id) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmTagDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query CrmTags($limit: Int!, $page: Int!) {\n    crm {\n      tags(limit: $limit, page: $page) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CrmTagsDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
