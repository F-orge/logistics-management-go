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
    "\n  mutation CreateAccountTransaction(\n    $accountTransaction: CreateAccountTransactionInput!\n  ) {\n    billing {\n      createAccountTransaction(value: $accountTransaction) {\n        id\n      }\n    }\n  }\n": typeof types.CreateAccountTransactionDocument,
    "\n  mutation UpdateAccountTransaction(\n    $id: ID!\n    $accountTransaction: UpdateAccountTransactionInput!\n  ) {\n    billing {\n      updateAccountTransaction(id: $id, value: $accountTransaction) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateAccountTransactionDocument,
    "\n  mutation RemoveAccountTransaction($id: ID!) {\n    billing {\n      removeAccountTransaction(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveAccountTransactionDocument,
    "\n  query AccountTransactions(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: TransactionType\n  ) {\n    billing {\n      accountTransactions(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        amount\n        createdAt\n        description\n        id\n        referenceNumber\n        runningBalance\n        sourceRecordId\n        sourceRecordType\n        transactionDate\n        type\n        processedByUser {\n          name\n          image\n          email\n          id\n        }\n        updatedAt\n        clientAccount {\n          availableCredit\n          paymentTermsDays\n          updatedAt\n          walletBalance\n          createdAt\n          client {\n            annualRevenue\n            id\n            industry\n            name\n            phoneNumber\n          }\n        }\n      }\n    }\n  }\n": typeof types.AccountTransactionsDocument,
    "\n  mutation CreateAccountingSyncLog(\n    $accountingSyncLog: CreateAccountingSyncLogInput!\n  ) {\n    billing {\n      createAccountingSyncLog(value: $accountingSyncLog) {\n        id\n      }\n    }\n  }\n": typeof types.CreateAccountingSyncLogDocument,
    "\n  mutation UpdateAccountingSyncLog(\n    $id: ID!\n    $accountingSyncLog: UpdateAccountingSyncLogInput!\n  ) {\n    billing {\n      updateAccountingSyncLog(id: $id, value: $accountingSyncLog) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateAccountingSyncLogDocument,
    "\n  mutation RemoveAccountingSyncLog($id: ID!) {\n    billing {\n      removeAccountingSyncLog(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveAccountingSyncLogDocument,
    "\n  query AccountingSyncLogs(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: SyncStatus\n  ) {\n    billing {\n      accountingSyncLogs(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        errorMessage\n        externalId\n        externalSystem\n        id\n        lastSyncAt\n        nextRetryAt\n        recordId\n        recordType\n        requestPayload\n        responsePayload\n        retryCount\n        status\n        updatedAt\n      }\n    }\n  }\n": typeof types.AccountingSyncLogsDocument,
    "\n  mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {\n    billing {\n      createClientAccount(value: $clientAccount) {\n        id\n      }\n    }\n  }\n": typeof types.CreateClientAccountDocument,
    "\n  mutation UpdateClientAccount(\n    $id: ID!\n    $clientAccount: UpdateClientAccountInput!\n  ) {\n    billing {\n      updateClientAccount(id: $id, value: $clientAccount) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateClientAccountDocument,
    "\n  mutation RemoveClientAccount($id: ID!) {\n    billing {\n      removeClientAccount(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveClientAccountDocument,
    "\n  query TableClientAccount($page: Int, $perPage: Int, $search: String) {\n    billing {\n      clientAccounts(page: $page, perPage: $perPage, search: $search) {\n        availableCredit\n        client {\n          annualRevenue\n          country\n          industry\n          name\n          phoneNumber\n          updatedAt\n          website\n        }\n        creditLimit\n        currency\n        isCreditApproved\n        lastPaymentDate\n        paymentTermsDays\n        updatedAt\n        walletBalance\n        id\n        transactions {\n          amount\n          description\n          id\n          referenceNumber\n          runningBalance\n          sourceRecordId\n          sourceRecordType\n          transactionDate\n          type\n        }\n      }\n    }\n  }\n": typeof types.TableClientAccountDocument,
    "\n  mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {\n    billing {\n      createCreditNote(value: $creditNote) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCreditNoteDocument,
    "\n  mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {\n    billing {\n      updateCreditNote(id: $id, value: $creditNote) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCreditNoteDocument,
    "\n  mutation RemoveCreditNote($id: ID!) {\n    billing {\n      removeCreditNote(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCreditNoteDocument,
    "\n  query TableCreditNote($page: Int, $perPage: Int, $search: String) {\n    billing {\n      creditNotes(page: $page, perPage: $perPage, search: $search) {\n        appliedAt\n        amount\n        createdAt\n        createdByUser {\n          email\n          id\n          image\n          name\n        }\n        creditNoteNumber\n        currency\n        id\n        issueDate\n        notes\n        reason\n        updatedAt\n        invoice {\n          amountPaid\n          invoiceNumber\n          issueDate\n          paidAt\n          notes\n          sentAt\n          status\n          subtotal\n          taxAmount\n          totalAmount\n          updatedAt\n          paymentTerms\n          discountAmount\n          dueDate\n          currency\n        }\n        dispute {\n          disputedAmount\n          id\n          reason\n          resolutionNotes\n          resolvedAt\n          status\n          submittedAt\n        }\n      }\n    }\n  }\n": typeof types.TableCreditNoteDocument,
    "\n  mutation CreateDispute($dispute: CreateDisputeInput!) {\n    billing {\n      createDispute(value: $dispute) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDisputeDocument,
    "\n  mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {\n    billing {\n      updateDispute(id: $id, value: $dispute) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDisputeDocument,
    "\n  mutation RemoveDispute($id: ID!) {\n    billing {\n      removeDispute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDisputeDocument,
    "\n  query TableDispute(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DisputeStatus\n  ) {\n    billing {\n      disputes(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        client {\n          annualRevenue\n          city\n          id\n          industry\n          name\n          website\n          phoneNumber\n        }\n        disputedAmount\n        id\n        reason\n        resolutionNotes\n        resolvedAt\n        status\n        submittedAt\n        updatedAt\n        resolvedByUser {\n          email\n          id\n          image\n          name\n        }\n        lineItem {\n          discountAmount\n          discountRate\n          description\n          id\n          lineTotal\n          quantity\n          sourceRecordId\n          sourceRecordType\n          taxAmount\n          taxRate\n          totalPrice\n          unitPrice\n          updatedAt\n          invoice {\n            amountPaid\n            currency\n            discountAmount\n            dueDate\n            id\n            invoiceNumber\n            issueDate\n            notes\n            paidAt\n            paymentTerms\n            sentAt\n            status\n            subtotal\n            taxAmount\n            totalAmount\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableDisputeDocument,
    "\n  mutation CreateInvoiceLineItem(\n    $invoiceLineItem: CreateInvoiceLineItemInput!\n  ) {\n    billing {\n      createInvoiceLineItem(value: $invoiceLineItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInvoiceLineItemDocument,
    "\n  mutation UpdateInvoiceLineItem(\n    $id: ID!\n    $invoiceLineItem: UpdateInvoiceLineItemInput!\n  ) {\n    billing {\n      updateInvoiceLineItem(id: $id, value: $invoiceLineItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInvoiceLineItemDocument,
    "\n  mutation RemoveInvoiceLineItem($id: ID!) {\n    billing {\n      removeInvoiceLineItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInvoiceLineItemDocument,
    "\n  mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {\n    billing {\n      createBillingInvoice(value: $billingInvoice) {\n        id\n      }\n    }\n  }\n": typeof types.CreateBillingInvoiceDocument,
    "\n  mutation UpdateBillingInvoice(\n    $id: ID!\n    $billingInvoice: UpdateBillingInvoiceInput!\n  ) {\n    billing {\n      updateBillingInvoice(id: $id, value: $billingInvoice) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateBillingInvoiceDocument,
    "\n  mutation RemoveBillingInvoice($id: ID!) {\n    billing {\n      removeBillingInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveBillingInvoiceDocument,
    "\n  query TableBillingInvoice(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: BillingInvoiceStatus\n  ) {\n    billing {\n      billingInvoices(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        amountOutstanding\n        amountPaid\n        createdAt\n        currency\n        discountAmount\n        dueDate\n        id\n        invoiceNumber\n        issueDate\n        notes\n        paidAt\n        paymentTerms\n        sentAt\n        status\n        subtotal\n        taxAmount\n        totalAmount\n        updatedAt\n        lineItems {\n          description\n          discountAmount\n          discountRate\n          id\n          quantity\n          taxAmount\n          lineTotal\n          sourceRecordId\n          sourceRecordType\n          taxRate\n          totalPrice\n          unitPrice\n          updatedAt\n        }\n      }\n    }\n  }\n": typeof types.TableBillingInvoiceDocument,
    "\n  mutation CreatePayment($payment: CreatePaymentInput!) {\n    billing {\n      createPayment(value: $payment) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePaymentDocument,
    "\n  mutation UpdatePayment($id: ID!, $payment: UpdatePaymentInput!) {\n    billing {\n      updatePayment(id: $id, value: $payment) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePaymentDocument,
    "\n  mutation RemovePayment($id: ID!) {\n    billing {\n      removePayment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePaymentDocument,
    "\n  query TablePayment(\n    $page: Int\n    $paymentMethod: PaymentMethod\n    $perPage: Int\n    $search: String\n    $status: PaymentStatus\n  ) {\n    billing {\n      payments(\n        page: $page\n        paymentMethod: $paymentMethod\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        amount\n        createdAt\n        currency\n        exchangeRate\n        fees\n        gatewayReference\n        id\n        invoice {\n          invoiceNumber\n          id\n          issueDate\n          paidAt\n          paymentTerms\n          sentAt\n          status\n          discountAmount\n          amountPaid\n          amountOutstanding\n        }\n        processedByUser {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n": typeof types.TablePaymentDocument,
    "\n  mutation CreateQuote($quote: CreateQuoteInput!) {\n    billing {\n      createQuote(value: $quote) {\n        id\n      }\n    }\n  }\n": typeof types.CreateQuoteDocument,
    "\n  mutation UpdateQuote($id: ID!, $quote: UpdateQuoteInput!) {\n    billing {\n      updateQuote(id: $id, value: $quote) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateQuoteDocument,
    "\n  mutation RemoveQuote($id: ID!) {\n    billing {\n      removeQuote(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveQuoteDocument,
    "\n  query TableQuote(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: QuoteStatus\n  ) {\n    billing {\n      quotes(page: $page, perPage: $perPage, search: $search, status: $status) {\n        createdAt\n        destinationDetails\n        expiresAt\n        height\n        id\n        length\n        notes\n        originDetails\n        quoteNumber\n        quotedPrice\n        serviceLevel\n        status\n        updatedAt\n        volume\n        weight\n        width\n        createdByUser {\n          email\n          id\n          image\n          name\n        }\n        client {\n          city\n          country\n          id\n          industry\n          name\n          phoneNumber\n          website\n          billingInvoices {\n            amountOutstanding\n            amountPaid\n            currency\n            discountAmount\n            dueDate\n            invoiceNumber\n            issueDate\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableQuoteDocument,
    "\n  mutation CreateRateCard($rateCard: CreateRateCardInput!) {\n    billing {\n      createRateCard(value: $rateCard) {\n        id\n      }\n    }\n  }\n": typeof types.CreateRateCardDocument,
    "\n  mutation UpdateRateCard($id: ID!, $rateCard: UpdateRateCardInput!) {\n    billing {\n      updateRateCard(id: $id, value: $rateCard) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateRateCardDocument,
    "\n  mutation RemoveRateCard($id: ID!) {\n    billing {\n      removeRateCard(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveRateCardDocument,
    "\n  query TableRateCard(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $serviceType: ServiceType\n  ) {\n    billing {\n      rateCards(\n        page: $page\n        perPage: $perPage\n        search: $search\n        serviceType: $serviceType\n      ) {\n        createdAt\n        description\n        id\n        isActive\n        name\n        serviceType\n        updatedAt\n        validFrom\n        validTo\n        createdByUser {\n          email\n          emailVerified\n          image\n          name\n        }\n        rules {\n          condition\n          id\n          isActive\n          maxValue\n          minValue\n          price\n          pricingModel\n          priority\n          value\n        }\n      }\n    }\n  }\n": typeof types.TableRateCardDocument,
    "\n  mutation CreateRateRule($rateRule: CreateRateRuleInput!) {\n    billing {\n      createRateRule(value: $rateRule) {\n        id\n      }\n    }\n  }\n": typeof types.CreateRateRuleDocument,
    "\n  mutation UpdateRateRule($id: ID!, $rateRule: UpdateRateRuleInput!) {\n    billing {\n      updateRateRule(id: $id, value: $rateRule) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateRateRuleDocument,
    "\n  mutation RemoveRateRule($id: ID!) {\n    billing {\n      removeRateRule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveRateRuleDocument,
    "\n  query TableRateRule(\n    $page: Int\n    $perPage: Int\n    $pricingModel: PricingModel\n    $search: String\n  ) {\n    billing {\n      rateRules(\n        page: $page\n        perPage: $perPage\n        pricingModel: $pricingModel\n        search: $search\n      ) {\n        condition\n        createdAt\n        id\n        isActive\n        maxValue\n        minValue\n        price\n        pricingModel\n        priority\n        updatedAt\n        value\n        rateCard {\n          createdAt\n          createdByUser {\n            email\n            id\n            image\n            name\n          }\n          description\n          id\n          isActive\n          name\n          serviceType\n          updatedAt\n          validFrom\n          validTo\n        }\n      }\n    }\n  }\n": typeof types.TableRateRuleDocument,
    "\n  mutation CreateSurcharge($surcharge: CreateSurchargeInput!) {\n    billing {\n      createSurcharge(value: $surcharge) {\n        id\n      }\n    }\n  }\n": typeof types.CreateSurchargeDocument,
    "\n  mutation UpdateSurcharge($id: ID!, $surcharge: UpdateSurchargeInput!) {\n    billing {\n      updateSurcharge(id: $id, value: $surcharge) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateSurchargeDocument,
    "\n  mutation RemoveSurcharge($id: ID!) {\n    billing {\n      removeSurcharge(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveSurchargeDocument,
    "\n  query TableSurcharge(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $calculationMethod: SurchargeCalculationMethod\n  ) {\n    billing {\n      surcharges(\n        page: $page\n        perPage: $perPage\n        search: $search\n        calculationMethod: $calculationMethod\n      ) {\n        amount\n        calculationMethod\n        createdAt\n        description\n        id\n        isActive\n        name\n        type\n        updatedAt\n        validFrom\n        validTo\n      }\n    }\n  }\n": typeof types.TableSurchargeDocument,
    "\n  mutation CreateCampaign($campaign: CreateCampaignInput!) {\n    crm {\n      createCampaign(value: $campaign) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCampaignDocument,
    "\n  mutation UpdateCampaign($id: ID!, $campaign: UpdateCampaignInput!) {\n    crm {\n      updateCampaign(id: $id, value: $campaign) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCampaignDocument,
    "\n  mutation RemoveCampaign($id: ID!) {\n    crm {\n      removeCampaign(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCampaignDocument,
    "\n  query TableCampaign($page: Int, $perPage: Int, $search: String) {\n    crm {\n      campaigns(page: $page, perPage: $perPage, search: $search) {\n        budget\n        createdAt\n        endDate\n        id\n        name\n        startDate\n        updatedAt\n      }\n    }\n  }\n": typeof types.TableCampaignDocument,
    "\n  query SearchCampaigns($search: String!) {\n    crm {\n      campaigns(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchCampaignsDocument,
    "\n  mutation CreateCase($case: CreateCaseInput!) {\n    crm {\n      createCase(value: $case) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCaseDocument,
    "\n  mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {\n    crm {\n      updateCase(id: $id, value: $case) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCaseDocument,
    "\n  mutation RemoveCase($id: ID!) {\n    crm {\n      removeCase(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCaseDocument,
    "\n  query TableCase(\n    $page: Int\n    $perPage: Int\n    $priority: CasePriority\n    $status: CaseStatus\n    $type: CaseType\n  ) {\n    crm {\n      cases(\n        perPage: $page\n        page: $perPage\n        priority: $priority\n        status: $status\n        type: $type\n      ) {\n        caseNumber\n        createdAt\n        description\n        id\n        priority\n        status\n        type\n        updatedAt\n        contact {\n          id\n          email\n          name\n          phoneNumber\n          jobTitle\n        }\n        owner {\n          id\n          email\n          image\n          name\n        }\n      }\n    }\n  }\n": typeof types.TableCaseDocument,
    "\n  query SearchCases($search: String!) {\n    crm {\n      cases(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: caseNumber\n      }\n    }\n  }\n": typeof types.SearchCasesDocument,
    "\n  mutation CreateCompany($company: CreateCompanyInput!) {\n    crm {\n      createCompany(value: $company) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCompanyDocument,
    "\n  mutation UpdateCompany($id: ID!, $company: UpdateCompanyInput!) {\n    crm {\n      updateCompany(id: $id, value: $company) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCompanyDocument,
    "\n  mutation RemoveCompany($id: ID!) {\n    crm {\n      removeCompany(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCompanyDocument,
    "\n  query TableCompanyQuery($page: Int, $perPage: Int, $search: String) {\n    crm {\n      companies(page: $page, perPage: $perPage, search: $search) {\n        name\n        owner {\n          email\n          image\n          name\n        }\n        annualRevenue\n        phoneNumber\n        postalCode\n        state\n        street\n        updatedAt\n        website\n        city\n        clientAccount {\n          walletBalance\n          creditLimit\n          currency\n        }\n        country\n        createdAt\n        id\n        industry\n      }\n    }\n  }\n": typeof types.TableCompanyQueryDocument,
    "\n  query SearchCompanies($search: String!) {\n    crm {\n      companies(page: 1, perPage: 10,search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchCompaniesDocument,
    "\n  mutation CreateContact($contact: CreateContactInput!) {\n    crm {\n      createContact(value: $contact) {\n        id\n      }\n    }\n  }\n": typeof types.CreateContactDocument,
    "\n  mutation UpdateContact($id: ID!, $contact: UpdateContactInput!) {\n    crm {\n      updateContact(id: $id, value: $contact) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateContactDocument,
    "\n  mutation RemoveContact($id: ID!) {\n    crm {\n      removeContact(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveContactDocument,
    "\n  query TableContact($page: Int, $perPage: Int, $search: String) {\n    crm {\n      contacts(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        email\n        id\n        jobTitle\n        name\n        phoneNumber\n        updatedAt\n        owner {\n          id\n          email\n          image\n          name\n        }\n        company {\n          id\n          phoneNumber\n          name\n          industry\n          website\n        }\n      }\n    }\n  }\n": typeof types.TableContactDocument,
    "\n  query SearchContacts($search: String!) {\n    crm {\n      contacts(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchContactsDocument,
    "\n  mutation CreateInteraction($interaction: CreateInteractionInput!) {\n    crm {\n      createInteraction(value: $interaction) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInteractionDocument,
    "\n  mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {\n    crm {\n      updateInteraction(id: $id, value: $interaction) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInteractionDocument,
    "\n  mutation RemoveInteraction($id: ID!) {\n    crm {\n      removeInteraction(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInteractionDocument,
    "\n  query TableInteraction(\n    $page: Int\n    $perPage: Int\n    $interactionType: InteractionType\n    $search: String\n  ) {\n    crm {\n      interactions(\n        interactionType: $interactionType\n        page: $page\n        perPage: $perPage\n        search: $search\n      ) {\n        createdAt\n        id\n        interactionDate\n        notes\n        outcome\n        type\n        updatedAt\n        user {\n          id\n          email\n          image\n          name\n        }\n        case {\n          id\n          caseNumber\n          priority\n          status\n          type\n        }\n        contact {\n          id\n          name\n          email\n          jobTitle\n          phoneNumber\n        }\n      }\n    }\n  }\n": typeof types.TableInteractionDocument,
    "\n  mutation CreateInvoiceItem($invoiceItem: CreateInvoiceItemInput!) {\n    crm {\n      createInvoiceItem(value: $invoiceItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInvoiceItemDocument,
    "\n  mutation UpdateInvoiceItem($id: ID!, $invoiceItem: UpdateInvoiceItemInput!) {\n    crm {\n      updateInvoiceItem(id: $id, value: $invoiceItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInvoiceItemDocument,
    "\n  mutation RemoveInvoiceItem($id: ID!) {\n    crm {\n      removeInvoiceItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInvoiceItemDocument,
    "\n  mutation CreateInvoice($invoice: CreateInvoiceInput!) {\n    crm {\n      createInvoice(value: $invoice) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInvoiceDocument,
    "\n  mutation UpdateInvoice($id: ID!, $invoice: UpdateInvoiceInput!) {\n    crm {\n      updateInvoice(id: $id, value: $invoice) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInvoiceDocument,
    "\n  mutation RemoveInvoice($id: ID!) {\n    crm {\n      removeInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInvoiceDocument,
    "\n  query TableInvoice(\n    $page: Int\n    $perPage: Int\n    $paymentMethod: CrmInvoicePaymentMethod\n    $status: InvoiceStatus\n    $search: String\n  ) {\n    crm {\n      invoices(\n        page: $page\n        paymentMethod: $paymentMethod\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        dueDate\n        id\n        issueDate\n        paidAt\n        paymentMethod\n        sentAt\n        status\n        total\n        updatedAt\n        items {\n          price\n          quantity\n          updatedAt\n          id\n          createdAt\n          product {\n            name\n            price\n            type\n            sku\n            id\n            description\n          }\n        }\n        opportunity {\n          name\n          stage\n          id\n          expectedCloseDate\n          dealValue\n        }\n      }\n    }\n  }\n": typeof types.TableInvoiceDocument,
    "\n  mutation CreateLead($lead: CreateLeadInput!) {\n    crm {\n      createLead(value: $lead) {\n        id\n      }\n    }\n  }\n": typeof types.CreateLeadDocument,
    "\n  mutation UpdateLead($id: ID!, $lead: UpdateLeadInput!) {\n    crm {\n      updateLead(id: $id, value: $lead) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateLeadDocument,
    "\n  mutation RemoveLead($id: ID!) {\n    crm {\n      removeLead(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveLeadDocument,
    "\n  query TableLead(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: LeadStatus\n    $source: LeadSource\n  ) {\n    crm {\n      leads(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        leadSource: $source\n      ) {\n        convertedAt\n        createdAt\n        email\n        leadScore\n        leadSource\n        name\n        id\n        status\n        updatedAt\n        owner {\n          id\n          email\n          image\n          name\n        }\n        campaign {\n          name\n          endDate\n          startDate\n          budget\n        }\n        convertedCompany {\n          name\n          industry\n          phoneNumber\n          website\n          id\n        }\n        convertedContact {\n          email\n          id\n          jobTitle\n          name\n          phoneNumber\n          updatedAt\n          company {\n            name\n            industry\n            id\n          }\n        }\n        convertedOpportunity {\n          name\n          dealValue\n          source\n          stage\n        }\n      }\n    }\n  }\n": typeof types.TableLeadDocument,
    "\n  query SearchLeads($search: String!) {\n    crm {\n      leads(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchLeadsDocument,
    "\n  mutation CreateNotification($notification: CreateNotificationInput!) {\n    crm {\n      createNotification(value: $notification) {\n        id\n      }\n    }\n  }\n": typeof types.CreateNotificationDocument,
    "\n  mutation UpdateNotification(\n    $id: ID!\n    $notification: UpdateNotificationInput!\n  ) {\n    crm {\n      updateNotification(id: $id, value: $notification) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateNotificationDocument,
    "\n  mutation RemoveNotification($id: ID!) {\n    crm {\n      removeNotification(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveNotificationDocument,
    "\n  query TableNotification($page: Int, $perPage: Int, $search: String) {\n    crm {\n      notifications(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        id\n        isRead\n        link\n        message\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n": typeof types.TableNotificationDocument,
    "\n  query SearchNotifications($search: String!) {\n    crm {\n      notifications(page: 1, perPage: 10,search: $search) {\n        value: id\n        label: message\n      }\n    }\n  }\n": typeof types.SearchNotificationsDocument,
    "\n  mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {\n    crm {\n      createOpportunity(value: $opportunity) {\n        id\n      }\n    }\n  }\n": typeof types.CreateOpportunityDocument,
    "\n  mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {\n    crm {\n      updateOpportunity(id: $id, value: $opportunity) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateOpportunityDocument,
    "\n  mutation RemoveOpportunity($id: ID!) {\n    crm {\n      removeOpportunity(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveOpportunityDocument,
    "\n  query TableOpportunity(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $source: OpportunitySource\n    $stage: OpportunityStage\n  ) {\n    crm {\n      opportunities(\n        page: $page\n        perPage: $perPage\n        search: $search\n        source: $source\n        stage: $stage\n      ) {\n        createdAt\n        dealValue\n        expectedCloseDate\n        id\n        lostReason\n        name\n        probability\n        source\n        stage\n        updatedAt\n        company {\n          name\n          industry\n          id\n          country\n          phoneNumber\n        }\n        contact {\n          email\n          id\n          jobTitle\n          name\n          phoneNumber\n          updatedAt\n          company {\n            name\n            phoneNumber\n            industry\n            country\n          }\n        }\n        owner {\n          email\n          id\n          image\n          name\n        }\n        products {\n          quantity\n          product {\n            id\n            name\n            price\n            sku\n            type\n            description\n          }\n        }\n        campaign {\n          name\n          budget\n          endDate\n          startDate\n          id\n        }\n      }\n    }\n  }\n": typeof types.TableOpportunityDocument,
    "\n  query SearchOpportunities($search: String!) {\n    crm {\n      opportunities(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchOpportunitiesDocument,
    "\n  mutation CreateOpportunityProduct(\n    $opportunityProduct: CreateOpportunityProductInput!\n  ) {\n    crm {\n      createOpportunityProduct(value: $opportunityProduct) {\n        opportunity {\n          id\n        }\n        product {\n          id\n        }\n      }\n    }\n  }\n": typeof types.CreateOpportunityProductDocument,
    "\n  mutation UpdateOpportunityProduct(\n    $opportunityId: ID!\n    $productId: ID!\n    $opportunityProduct: UpdateOpportunityProductInput!\n  ) {\n    crm {\n      updateOpportunityProduct(\n        opportunityId: $opportunityId\n        productId: $productId\n        value: $opportunityProduct\n      ) {\n        opportunity {\n          id\n        }\n        product {\n          id\n        }\n      }\n    }\n  }\n": typeof types.UpdateOpportunityProductDocument,
    "\n  mutation RemoveOpportunityProduct($opportunityId: ID!, $productId: ID!) {\n    crm {\n      removeOpportunityProduct(\n        opportunityId: $opportunityId\n        productId: $productId\n      ) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveOpportunityProductDocument,
    "\n  mutation CreateProduct($product: CreateProductInput!) {\n    crm {\n      createProduct(value: $product) {\n        id\n      }\n    }\n  }\n": typeof types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {\n    crm {\n      updateProduct(id: $id, value: $product) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateProductDocument,
    "\n  mutation RemoveProduct($id: ID!) {\n    crm {\n      removeProduct(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveProductDocument,
    "\n  query TableProduct(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProductType\n  ) {\n    crm {\n      products(page: $page, perPage: $perPage, search: $search, type: $type) {\n        createdAt\n        description\n        id\n        name\n        price\n        sku\n        type\n        updatedAt\n      }\n    }\n  }\n": typeof types.TableProductDocument,
    "\n  query SearchProducts($search: String!) {\n    crm {\n      products(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchProductsDocument,
    "\n  mutation CreateCustomerTrackingLink(\n    $customerTrackingLink: CreateCustomerTrackingLinkInput!\n  ) {\n    dms {\n      createCustomerTrackingLink(value: $customerTrackingLink) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCustomerTrackingLinkDocument,
    "\n  mutation UpdateCustomerTrackingLink(\n    $id: ID!\n    $customerTrackingLink: UpdateCustomerTrackingLinkInput!\n  ) {\n    dms {\n      updateCustomerTrackingLink(id: $id, value: $customerTrackingLink) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCustomerTrackingLinkDocument,
    "\n  mutation RemoveCustomerTrackingLink($id: ID!) {\n    dms {\n      removeCustomerTrackingLink(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCustomerTrackingLinkDocument,
    "\n  query TableCustomerTrackingLink($page: Int, $perPage: Int, $search: String) {\n    dms {\n      customerTrackingLinks(page: $page, perPage: $perPage, search: $search) {\n        accessCount\n        createdAt\n        expiresAt\n        id\n        isActive\n        lastAccessedAt\n        trackingToken\n        updatedAt\n      }\n    }\n  }\n": typeof types.TableCustomerTrackingLinkDocument,
    "\n  query SearchCustomerTrackingLinks($search: String!) {\n    dms {\n      customerTrackingLinks(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: trackingToken\n      }\n    }\n  }\n": typeof types.SearchCustomerTrackingLinksDocument,
    "\n  mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {\n    dms {\n      createDeliveryRoute(value: $deliveryRoute) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDeliveryRouteDocument,
    "\n  mutation UpdateDeliveryRoute(\n    $id: ID!\n    $deliveryRoute: UpdateDeliveryRouteInput!\n  ) {\n    dms {\n      updateDeliveryRoute(id: $id, value: $deliveryRoute) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDeliveryRouteDocument,
    "\n  mutation RemoveDeliveryRoute($id: ID!) {\n    dms {\n      removeDeliveryRoute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDeliveryRouteDocument,
    "\n  query TableDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DeliveryRouteStatus\n  ) {\n    dms {\n      deliveryRoutes(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        actualDurationMinutes\n        completedAt\n        createdAt\n        estimatedDurationMinutes\n        id\n        optimizedRouteData\n        routeDate\n        startedAt\n        status\n        totalDistanceKm\n        updatedAt\n        driver {\n          id\n          user {\n            email\n            id\n            image\n            name\n          }\n          status\n          licenseNumber\n          contactPhone\n        }\n      }\n    }\n  }\n": typeof types.TableDeliveryDocument,
    "\n  query SearchDeliveryRoutes($search: String!) {\n    dms {\n      deliveryRoutes(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: routeDate\n      }\n    }\n  }\n": typeof types.SearchDeliveryRoutesDocument,
    "\n  mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {\n    dms {\n      createDeliveryTask(value: $deliveryTask) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDeliveryTaskDocument,
    "\n  mutation UpdateDeliveryTask(\n    $id: ID!\n    $deliveryTask: UpdateDeliveryTaskInput!\n  ) {\n    dms {\n      updateDeliveryTask(id: $id, value: $deliveryTask) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDeliveryTaskDocument,
    "\n  mutation RemoveDeliveryTask($id: ID!) {\n    dms {\n      removeDeliveryTask(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDeliveryTaskDocument,
    "\n  query TableDeliveryTask(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DeliveryTaskStatus\n    $failureReason: DeliveryFailureReason\n  ) {\n    dms {\n      deliveryTasks(\n        failureReason: $failureReason\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        actualArrivalTime\n        attemptCount\n        createdAt\n        deliveryAddress\n        deliveryInstructions\n        deliveryTime\n        estimatedArrivalTime\n        failureReason\n        id\n        recipientName\n        recipientPhone\n        routeSequence\n        status\n        updatedAt\n        deliveryRoute {\n          id\n          totalDistanceKm\n          optimizedRouteData\n          status\n          driver {\n            id\n            user {\n              email\n              id\n              image\n              name\n            }\n            licenseNumber\n            status\n            contactPhone\n          }\n        }\n        package {\n          id\n          carrier\n          packageNumber\n          trackingNumber\n          warehouse {\n            id\n            address\n            country\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableDeliveryTaskDocument,
    "\n  query SearchDeliveryTasks($search: String!) {\n    dms {\n      deliveryTasks(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: recipientName\n      }\n    }\n  }\n": typeof types.SearchDeliveryTasksDocument,
    "\n  mutation CreateDriverLocation($driverLocation: CreateDriverLocationInput!) {\n    dms {\n      createDriverLocation(value: $driverLocation) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDriverLocationDocument,
    "\n  mutation UpdateDriverLocation(\n    $id: ID!\n    $driverLocation: UpdateDriverLocationInput!\n  ) {\n    dms {\n      updateDriverLocation(id: $id, value: $driverLocation) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDriverLocationDocument,
    "\n  mutation RemoveDriverLocation($id: ID!) {\n    dms {\n      removeDriverLocation(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDriverLocationDocument,
    "\n  query TableDriverLocation($page: Int, $perPage: Int) {\n    dms {\n      driverLocations(page: $page, perPage: $perPage) {\n        accuracy\n        altitude\n        createdAt\n        heading\n        id\n        latitude\n        longitude\n        speedKmh\n        timestamp\n        updatedAt\n        driver {\n          id\n          contactPhone\n          licenseExpiryDate\n          licenseNumber\n          user {\n            email\n            id\n            image\n            name\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableDriverLocationDocument,
    "\n  mutation CreateDmsProofOfDelivery(\n    $dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!\n  ) {\n    dms {\n      createDmsProofOfDelivery(value: $dmsProofOfDelivery) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDmsProofOfDeliveryDocument,
    "\n  mutation UpdateDmsProofOfDelivery(\n    $id: ID!\n    $dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput!\n  ) {\n    dms {\n      updateDmsProofOfDelivery(id: $id, value: $dmsProofOfDelivery) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDmsProofOfDeliveryDocument,
    "\n  mutation RemoveDmsProofOfDelivery($id: ID!) {\n    dms {\n      removeDmsProofOfDelivery(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDmsProofOfDeliveryDocument,
    "\n  query TableProofOfDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProofOfDeliveryType\n  ) {\n    dms {\n      dmsProofOfDeliveries(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        createdAt\n        filePath\n        id\n        latitude\n        longitude\n        recipientName\n        signatureData\n        timestamp\n        type\n        updatedAt\n        verificationCode\n        deliveryTask {\n          package {\n            id\n            packageNumber\n            packageType\n            requiresSignature\n            trackingNumber\n            warehouse {\n              id\n              address\n              city\n              country\n            }\n          }\n          actualArrivalTime\n          deliveryInstructions\n          deliveryAddress\n          failureReason\n          recipientName\n          recipientPhone\n          status\n        }\n      }\n    }\n  }\n": typeof types.TableProofOfDeliveryDocument,
    "\n  query SearchDmsProofOfDeliveries($search: String!) {\n    dms {\n      dmsProofOfDeliveries(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: recipientName\n      }\n    }\n  }\n": typeof types.SearchDmsProofOfDeliveriesDocument,
    "\n  mutation CreateTaskEvent($taskEvent: CreateTaskEventInput!) {\n    dms {\n      createTaskEvent(value: $taskEvent) {\n        id\n      }\n    }\n  }\n": typeof types.CreateTaskEventDocument,
    "\n  mutation UpdateTaskEvent($id: ID!, $taskEvent: UpdateTaskEventInput!) {\n    dms {\n      updateTaskEvent(id: $id, value: $taskEvent) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateTaskEventDocument,
    "\n  mutation RemoveTaskEvent($id: ID!) {\n    dms {\n      removeTaskEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveTaskEventDocument,
    "\n  query TableTaskEvent(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TaskEventStatus\n  ) {\n    dms {\n      taskEvents(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        latitude\n        longitude\n        notes\n        reason\n        status\n        timestamp\n        updatedAt\n        deliveryTask {\n          id\n          recipientName\n          recipientPhone\n          deliveryInstructions\n          deliveryAddress\n          status\n          package {\n            id\n            trackingNumber\n            packageNumber\n            packageType\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableTaskEventDocument,
    "\n  query SearchTaskEvents($search: String!) {\n    dms {\n      taskEvents(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: reason\n      }\n    }\n  }\n": typeof types.SearchTaskEventsDocument,
    "\n  mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {\n    tms {\n      createCarrierRate(value: $carrierRate) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCarrierRateDocument,
    "\n  mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {\n    tms {\n      updateCarrierRate(id: $id, value: $carrierRate) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCarrierRateDocument,
    "\n  mutation RemoveCarrierRate($id: ID!) {\n    tms {\n      removeCarrierRate(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCarrierRateDocument,
    "\n  mutation CreateCarrier($carrier: CreateCarrierInput!) {\n    tms {\n      createCarrier(value: $carrier) {\n        id\n      }\n    }\n  }\n": typeof types.CreateCarrierDocument,
    "\n  mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {\n    tms {\n      updateCarrier(id: $id, value: $carrier) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateCarrierDocument,
    "\n  mutation RemoveCarrier($id: ID!) {\n    tms {\n      removeCarrier(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveCarrierDocument,
    "\n  query TableCarrierQuery($page: Int, $perPage: Int, $search: String) {\n    tms {\n      carriers(page: $page, perPage: $perPage, search: $search) {\n        contactEmail\n        contactPerson\n        contactPhone\n        createdAt\n        id\n        name\n        servicesOffered\n        updatedAt\n        partnerInvoices {\n          invoiceNumber\n          invoiceDate\n          status\n          totalAmount\n          items {\n            amount\n            id\n            shipmentLeg {\n              status\n              shipment {\n                trackingNumber\n                carrier\n                createdAt\n                id\n                status\n                warehouseId\n              }\n            }\n          }\n        }\n        rates {\n          destination\n          id\n          origin\n          rate\n          serviceType\n          unit\n        }\n      }\n    }\n  }\n": typeof types.TableCarrierQueryDocument,
    "\n  query SearchCarriers($search: String!) {\n    tms {\n      carriers(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchCarriersDocument,
    "\n  mutation CreateDriverSchedule($driverSchedule: CreateDriverScheduleInput!) {\n    tms {\n      createDriverSchedule(value: $driverSchedule) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDriverScheduleDocument,
    "\n  mutation UpdateDriverSchedule(\n    $id: ID!\n    $driverSchedule: UpdateDriverScheduleInput!\n  ) {\n    tms {\n      updateDriverSchedule(id: $id, value: $driverSchedule) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDriverScheduleDocument,
    "\n  mutation RemoveDriverSchedule($id: ID!) {\n    tms {\n      removeDriverSchedule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDriverScheduleDocument,
    "\n  mutation CreateDriver($driver: CreateDriverInput!) {\n    tms {\n      createDriver(value: $driver) {\n        id\n      }\n    }\n  }\n": typeof types.CreateDriverDocument,
    "\n  mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {\n    tms {\n      updateDriver(id: $id, value: $driver) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateDriverDocument,
    "\n  mutation RemoveDriver($id: ID!) {\n    tms {\n      removeDriver(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveDriverDocument,
    "\n  query TableDriver(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DriverStatus\n  ) {\n    tms {\n      drivers(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        contactPhone\n        createdAt\n        id\n        licenseExpiryDate\n        licenseNumber\n        status\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n": typeof types.TableDriverDocument,
    "\n  query SearchDrivers($search: String!) {\n    tms {\n      drivers(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: licenseNumber\n      }\n    }\n  }\n": typeof types.SearchDriversDocument,
    "\n  mutation CreateExpense($expense: CreateExpenseInput!) {\n    tms {\n      createExpense(value: $expense) {\n        id\n      }\n    }\n  }\n": typeof types.CreateExpenseDocument,
    "\n  mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {\n    tms {\n      updateExpense(id: $id, value: $expense) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateExpenseDocument,
    "\n  mutation RemoveExpense($id: ID!) {\n    tms {\n      removeExpense(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveExpenseDocument,
    "\n  query TableExpense(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ExpenseStatus\n    $type: ExpenseType\n    $currency: Currency\n  ) {\n    tms {\n      expenses(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        type: $type\n        currency: $currency\n      ) {\n        amount\n        createdAt\n        currency\n        description\n        driver {\n          user {\n            email\n            id\n            image\n            name\n          }\n          licenseNumber\n          contactPhone\n          status\n        }\n        expenseDate\n        fuelQuantity\n        id\n        odometerReading\n        receiptUrl\n        status\n        type\n        updatedAt\n        trip {\n          createdAt\n          endLocation\n          startLocation\n          status\n          startTime\n          endTime\n          vehicle {\n            vin\n            year\n            model\n            make\n            id\n            registrationNumber\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableExpenseDocument,
    "\n  query SearchExpenses($search: String!) {\n    tms {\n      expenses(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: description\n      }\n    }\n  }\n": typeof types.SearchExpensesDocument,
    "\n  mutation CreateGeofenceEvent($geofenceEvent: CreateGeofenceEventInput!) {\n    tms {\n      createGeofenceEvent(value: $geofenceEvent) {\n        id\n      }\n    }\n  }\n": typeof types.CreateGeofenceEventDocument,
    "\n  mutation UpdateGeofenceEvent(\n    $id: ID!\n    $geofenceEvent: UpdateGeofenceEventInput!\n  ) {\n    tms {\n      updateGeofenceEvent(id: $id, value: $geofenceEvent) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateGeofenceEventDocument,
    "\n  mutation RemoveGeofenceEvent($id: ID!) {\n    tms {\n      removeGeofenceEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveGeofenceEventDocument,
    "\n  mutation CreateGeofence($geofence: CreateGeofenceInput!) {\n    tms {\n      createGeofence(value: $geofence) {\n        id\n      }\n    }\n  }\n": typeof types.CreateGeofenceDocument,
    "\n  mutation UpdateGeofence($id: ID!, $geofence: UpdateGeofenceInput!) {\n    tms {\n      updateGeofence(id: $id, value: $geofence) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateGeofenceDocument,
    "\n  mutation RemoveGeofence($id: ID!) {\n    tms {\n      removeGeofence(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveGeofenceDocument,
    "\n  query TableGeofence($page: Int, $perPage: Int, $search: String) {\n    tms {\n      geofences(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        id\n        latitude\n        longitude\n        name\n        updatedAt\n        events {\n          eventType\n          id\n          timestamp\n          vehicle {\n            model\n            vin\n            year\n            registrationNumber\n            make\n            id\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableGeofenceDocument,
    "\n  query SearchGeofences($search: String!) {\n    tms {\n      geofences(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: name\n      }\n    }\n  }\n": typeof types.SearchGeofencesDocument,
    "\n  mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {\n    tms {\n      createGpsPing(value: $gpsPing) {\n        id\n      }\n    }\n  }\n": typeof types.CreateGpsPingDocument,
    "\n  mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {\n    tms {\n      updateGpsPing(id: $id, value: $gpsPing) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateGpsPingDocument,
    "\n  mutation RemoveGpsPing($id: ID!) {\n    tms {\n      removeGpsPing(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveGpsPingDocument,
    "\n  query TableGpsPing($page: Int, $perPage: Int) {\n    tms {\n      gpsPings(page: $page, perPage: $perPage) {\n        id\n        latitude\n        longitude\n        timestamp\n        vehicle {\n          year\n          vin\n          registrationNumber\n          model\n          make\n          status\n          id\n        }\n      }\n    }\n  }\n": typeof types.TableGpsPingDocument,
    "\n  mutation CreatePartnerInvoiceItem(\n    $partnerInvoiceItem: CreatePartnerInvoiceItemInput!\n  ) {\n    tms {\n      createPartnerInvoiceItem(value: $partnerInvoiceItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePartnerInvoiceItemDocument,
    "\n  mutation UpdatePartnerInvoiceItem(\n    $id: ID!\n    $partnerInvoiceItem: UpdatePartnerInvoiceItemInput!\n  ) {\n    tms {\n      updatePartnerInvoiceItem(id: $id, value: $partnerInvoiceItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePartnerInvoiceItemDocument,
    "\n  mutation RemovePartnerInvoiceItem($id: ID!) {\n    tms {\n      removePartnerInvoiceItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePartnerInvoiceItemDocument,
    "\n  mutation CreatePartnerInvoice($partnerInvoice: CreatePartnerInvoiceInput!) {\n    tms {\n      createPartnerInvoice(value: $partnerInvoice) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePartnerInvoiceDocument,
    "\n  mutation UpdatePartnerInvoice(\n    $id: ID!\n    $partnerInvoice: UpdatePartnerInvoiceInput!\n  ) {\n    tms {\n      updatePartnerInvoice(id: $id, value: $partnerInvoice) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePartnerInvoiceDocument,
    "\n  mutation RemovePartnerInvoice($id: ID!) {\n    tms {\n      removePartnerInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePartnerInvoiceDocument,
    "\n  query TablePartnerInvoice(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: PartnerInvoiceStatus\n  ) {\n    tms {\n      partnerInvoices(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        invoiceDate\n        invoiceNumber\n        status\n        totalAmount\n        updatedAt\n        items {\n          amount\n          id\n          shipmentLeg {\n            startLocation\n            endLocation\n            shipment {\n              trackingNumber\n              carrier\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.TablePartnerInvoiceDocument,
    "\n  query SearchPartnerInvoices($search: String!) {\n    tms {\n      partnerInvoices(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: invoiceNumber\n      }\n    }\n  }\n": typeof types.SearchPartnerInvoicesDocument,
    "\n  mutation CreateProofOfDelivery(\n    $proofOfDelivery: CreateProofOfDeliveryInput!\n  ) {\n    tms {\n      createProofOfDelivery(value: $proofOfDelivery) {\n        id\n      }\n    }\n  }\n": typeof types.CreateProofOfDeliveryDocument,
    "\n  mutation UpdateProofOfDelivery(\n    $id: ID!\n    $proofOfDelivery: UpdateProofOfDeliveryInput!\n  ) {\n    tms {\n      updateProofOfDelivery(id: $id, value: $proofOfDelivery) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateProofOfDeliveryDocument,
    "\n  mutation RemoveProofOfDelivery($id: ID!) {\n    tms {\n      removeProofOfDelivery(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveProofOfDeliveryDocument,
    "\n  query TableTmsProofOfDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProofType\n  ) {\n    tms {\n      proofOfDeliveries(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        createdAt\n        filePath\n        id\n        latitude\n        longitude\n        timestamp\n        type\n        updatedAt\n        tripStop {\n          actualArrivalTime\n          actualDepartureTime\n          address\n          status\n          id\n          shipment {\n            trackingNumber\n            status\n            carrier\n            id\n          }\n          trip {\n            endLocation\n            startLocation\n            status\n            vehicle {\n              registrationNumber\n              vin\n              year\n              make\n              model\n              gpsPings {\n                latitude\n                longitude\n                timestamp\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableTmsProofOfDeliveryDocument,
    "\n  query SearchProofOfDeliveries($search: String!) {\n    tms {\n      proofOfDeliveries(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: filePath\n      }\n    }\n  }\n": typeof types.SearchProofOfDeliveriesDocument,
    "\n  mutation CreateRoute($route: CreateRouteInput!) {\n    tms {\n      createRoute(value: $route) {\n        id\n      }\n    }\n  }\n": typeof types.CreateRouteDocument,
    "\n  mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {\n    tms {\n      updateRoute(id: $id, value: $route) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateRouteDocument,
    "\n  mutation RemoveRoute($id: ID!) {\n    tms {\n      removeRoute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveRouteDocument,
    "\n  query TableRoute($page: Int, $perPage: Int, $search: String) {\n    tms {\n      routes(page: $page, perPage: $perPage, search: $search) {\n        optimizedRouteData\n        totalDistance\n        totalDuration\n        id\n        trip {\n          startLocation\n          endTime\n          endLocation\n          createdAt\n          startTime\n          status\n          updatedAt\n          driver {\n            user {\n              email\n              id\n              image\n              name\n            }\n            licenseNumber\n            contactPhone\n            id\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableRouteDocument,
    "\n  mutation CreateShipmentLegEvent(\n    $shipmentLegEvent: CreateShipmentLegEventInput!\n  ) {\n    tms {\n      createShipmentLegEvent(value: $shipmentLegEvent) {\n        id\n      }\n    }\n  }\n": typeof types.CreateShipmentLegEventDocument,
    "\n  mutation UpdateShipmentLegEvent(\n    $id: ID!\n    $shipmentLegEvent: UpdateShipmentLegEventInput!\n  ) {\n    tms {\n      updateShipmentLegEvent(id: $id, value: $shipmentLegEvent) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateShipmentLegEventDocument,
    "\n  mutation RemoveShipmentLegEvent($id: ID!) {\n    tms {\n      removeShipmentLegEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveShipmentLegEventDocument,
    "\n  mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {\n    tms {\n      createShipmentLeg(value: $shipmentLeg) {\n        id\n      }\n    }\n  }\n": typeof types.CreateShipmentLegDocument,
    "\n  mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {\n    tms {\n      updateShipmentLeg(id: $id, value: $shipmentLeg) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateShipmentLegDocument,
    "\n  mutation RemoveShipmentLeg($id: ID!) {\n    tms {\n      removeShipmentLeg(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveShipmentLegDocument,
    "\n  query TableShipmentLegQuery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ShipmentLegStatus\n  ) {\n    tms {\n      shipmentLegs(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        endLocation\n        id\n        legSequence\n        startLocation\n        status\n        updatedAt\n        shipment {\n          trackingNumber\n          carrier\n          status\n        }\n        partnerInvoiceItems {\n          amount\n          id\n        }\n        events {\n          location\n          statusMessage\n          eventTimestamp\n          id\n        }\n      }\n    }\n  }\n": typeof types.TableShipmentLegQueryDocument,
    "\n  query SearchShipmentLegs($search: String!) {\n    tms {\n      shipmentLegs(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: startLocation\n      }\n    }\n  }\n": typeof types.SearchShipmentLegsDocument,
    "\n  mutation CreateTripStop($tripStop: CreateTripStopInput!) {\n    tms {\n      createTripStop(value: $tripStop) {\n        id\n      }\n    }\n  }\n": typeof types.CreateTripStopDocument,
    "\n  mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {\n    tms {\n      updateTripStop(id: $id, value: $tripStop) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateTripStopDocument,
    "\n  mutation RemoveTripStop($id: ID!) {\n    tms {\n      removeTripStop(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveTripStopDocument,
    "\n  mutation CreateTrip($trip: CreateTripInput!) {\n    tms {\n      createTrip(value: $trip) {\n        id\n      }\n    }\n  }\n": typeof types.CreateTripDocument,
    "\n  mutation UpdateTrip($id: ID!, $trip: UpdateTripInput!) {\n    tms {\n      updateTrip(id: $id, value: $trip) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateTripDocument,
    "\n  mutation RemoveTrip($id: ID!) {\n    tms {\n      removeTrip(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveTripDocument,
    "\n  query TableTrip(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TripStatus\n  ) {\n    tms {\n      trips(page: $page, perPage: $perPage, search: $search, status: $status) {\n        createdAt\n        endLocation\n        endTime\n        id\n        startLocation\n        startTime\n        status\n        updatedAt\n        driver {\n          user {\n            email\n            id\n            image\n            name\n          }\n          licenseNumber\n          contactPhone\n          status\n        }\n        vehicle {\n          vin\n          year\n          registrationNumber\n          model\n          make\n          status\n        }\n      }\n    }\n  }\n": typeof types.TableTripDocument,
    "\n  query SearchTrips($search: String!) {\n    tms {\n      trips(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: startLocation\n      }\n    }\n  }\n": typeof types.SearchTripsDocument,
    "\n  mutation CreateVehicleMaintenance(\n    $vehicleMaintenance: CreateVehicleMaintenanceInput!\n  ) {\n    tms {\n      createVehicleMaintenance(value: $vehicleMaintenance) {\n        id\n      }\n    }\n  }\n": typeof types.CreateVehicleMaintenanceDocument,
    "\n  mutation UpdateVehicleMaintenance(\n    $id: ID!\n    $vehicleMaintenance: UpdateVehicleMaintenanceInput!\n  ) {\n    tms {\n      updateVehicleMaintenance(id: $id, value: $vehicleMaintenance) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateVehicleMaintenanceDocument,
    "\n  mutation RemoveVehicleMaintenance($id: ID!) {\n    tms {\n      removeVehicleMaintenance(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveVehicleMaintenanceDocument,
    "\n  mutation CreateVehicle($vehicle: CreateVehicleInput!) {\n    tms {\n      createVehicle(value: $vehicle) {\n        id\n      }\n    }\n  }\n": typeof types.CreateVehicleDocument,
    "\n  mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {\n    tms {\n      updateVehicle(id: $id, value: $vehicle) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateVehicleDocument,
    "\n  mutation RemoveVehicle($id: ID!) {\n    tms {\n      removeVehicle(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveVehicleDocument,
    "\n  query TableVehicle(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: VehicleStatus\n  ) {\n    tms {\n      vehicles(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        capacityVolume\n        capacityWeight\n        createdAt\n        currentMileage\n        id\n        lastMaintenanceDate\n        make\n        model\n        registrationNumber\n        status\n        updatedAt\n        vin\n        year\n        maintenances {\n          cost\n          createdAt\n          id\n          notes\n          serviceDate\n          serviceType\n          updatedAt\n        }\n      }\n    }\n  }\n": typeof types.TableVehicleDocument,
    "\n  query SearchVehicles($search: String!) {\n    tms {\n      vehicles(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: registrationNumber\n      }\n    }\n  }\n": typeof types.SearchVehiclesDocument,
    "\n  mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {\n    wms {\n      createBinThreshold(value: $binThreshold) {\n        id\n      }\n    }\n  }\n": typeof types.CreateBinThresholdDocument,
    "\n  mutation UpdateBinThreshold(\n    $id: ID!\n    $binThreshold: UpdateBinThresholdInput!\n  ) {\n    wms {\n      updateBinThreshold(id: $id, value: $binThreshold) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateBinThresholdDocument,
    "\n  mutation RemoveBinThreshold($id: ID!) {\n    wms {\n      removeBinThreshold(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveBinThresholdDocument,
    "\n  query TableBinThreshold($page: Int, $perPage: Int) {\n    wms {\n      binThresholds(page: $page, perPage: $perPage) {\n        alertThreshold\n        createdAt\n        id\n        isActive\n        maxQuantity\n        minQuantity\n        reorderQuantity\n        updatedAt\n        product {\n          name\n          description\n          id\n          sku\n          status\n          barcode\n        }\n      }\n    }\n  }\n": typeof types.TableBinThresholdDocument,
    "\n  mutation CreateInboundShipmentItem(\n    $inboundShipmentItem: CreateInboundShipmentItemInput!\n  ) {\n    wms {\n      createInboundShipmentItem(value: $inboundShipmentItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInboundShipmentItemDocument,
    "\n  mutation UpdateInboundShipmentItem(\n    $id: ID!\n    $inboundShipmentItem: UpdateInboundShipmentItemInput!\n  ) {\n    wms {\n      updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInboundShipmentItemDocument,
    "\n  mutation RemoveInboundShipmentItem($id: ID!) {\n    wms {\n      removeInboundShipmentItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInboundShipmentItemDocument,
    "\n  mutation CreateInboundShipment(\n    $inboundShipment: CreateInboundShipmentInput!\n  ) {\n    wms {\n      createInboundShipment(value: $inboundShipment) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInboundShipmentDocument,
    "\n  mutation UpdateInboundShipment(\n    $id: ID!\n    $inboundShipment: UpdateInboundShipmentInput!\n  ) {\n    wms {\n      updateInboundShipment(id: $id, value: $inboundShipment) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInboundShipmentDocument,
    "\n  mutation RemoveInboundShipment($id: ID!) {\n    wms {\n      removeInboundShipment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInboundShipmentDocument,
    "\n  query TableInboundShipment(\n    $page: Int\n    $perPage: Int\n    $status: InboundShipmentStatus\n  ) {\n    wms {\n      inboundShipments(page: $page, perPage: $perPage, status: $status) {\n        actualArrivalDate\n        createdAt\n        expectedArrivalDate\n        id\n        status\n        updatedAt\n        client {\n          name\n          industry\n          phoneNumber\n          country\n          website\n        }\n      }\n    }\n  }\n": typeof types.TableInboundShipmentDocument,
    "\n  mutation CreateInventoryAdjustment(\n    $inventoryAdjustment: CreateInventoryAdjustmentInput!\n  ) {\n    wms {\n      createInventoryAdjustment(value: $inventoryAdjustment) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInventoryAdjustmentDocument,
    "\n  mutation UpdateInventoryAdjustment(\n    $id: ID!\n    $inventoryAdjustment: UpdateInventoryAdjustmentInput!\n  ) {\n    wms {\n      updateInventoryAdjustment(id: $id, value: $inventoryAdjustment) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInventoryAdjustmentDocument,
    "\n  mutation RemoveInventoryAdjustment($id: ID!) {\n    wms {\n      removeInventoryAdjustment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInventoryAdjustmentDocument,
    "\n  query TableInventoryAdjustment(\n    $page: Int\n    $perPage: Int\n    $reason: InventoryAdjustmentReason\n    $search: String\n  ) {\n    wms {\n      inventoryAdjustments(\n        page: $page\n        perPage: $perPage\n        reason: $reason\n        search: $search\n      ) {\n        createdAt\n        id\n        notes\n        quantityChange\n        reason\n        updatedAt\n        warehouseId\n        user {\n          email\n          id\n          image\n          name\n        }\n        product {\n          barcode\n          description\n          id\n          name\n          sku\n          status\n        }\n      }\n    }\n  }\n": typeof types.TableInventoryAdjustmentDocument,
    "\n  query SearchInventoryAdjustments($search: String!) {\n    wms {\n      inventoryAdjustments(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: notes\n      }\n    }\n  }\n": typeof types.SearchInventoryAdjustmentsDocument,
    "\n  mutation CreateInventoryBatch($inventoryBatch: CreateInventoryBatchInput!) {\n    wms {\n      createInventoryBatch(value: $inventoryBatch) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInventoryBatchDocument,
    "\n  mutation UpdateInventoryBatch(\n    $id: ID!\n    $inventoryBatch: UpdateInventoryBatchInput!\n  ) {\n    wms {\n      updateInventoryBatch(id: $id, value: $inventoryBatch) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInventoryBatchDocument,
    "\n  mutation RemoveInventoryBatch($id: ID!) {\n    wms {\n      removeInventoryBatch(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInventoryBatchDocument,
    "\n  query TableInventoryBatch($page: Int, $perPage: Int, $search: String) {\n    wms {\n      inventoryBatches(page: $page, perPage: $perPage, search: $search) {\n        batchNumber\n        createdAt\n        expirationDate\n        id\n        updatedAt\n        inventoryStock {\n          availableQuantity\n          product {\n            barcode\n            name\n            sku\n            status\n            description\n            id\n            costPrice\n          }\n          quantity\n          reservedQuantity\n          status\n        }\n      }\n    }\n  }\n": typeof types.TableInventoryBatchDocument,
    "\n  mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {\n    wms {\n      createInventoryStock(value: $inventoryStock) {\n        id\n      }\n    }\n  }\n": typeof types.CreateInventoryStockDocument,
    "\n  mutation UpdateInventoryStock(\n    $id: ID!\n    $inventoryStock: UpdateInventoryStockInput!\n  ) {\n    wms {\n      updateInventoryStock(id: $id, value: $inventoryStock) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateInventoryStockDocument,
    "\n  mutation RemoveInventoryStock($id: ID!) {\n    wms {\n      removeInventoryStock(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveInventoryStockDocument,
    "\n  query TableInventoryStock(\n    $page: Int\n    $perPage: Int\n    $status: InventoryStockStatus\n  ) {\n    wms {\n      inventoryStocks(page: $page, perPage: $perPage, status: $status) {\n        availableQuantity\n        createdAt\n        id\n        lastCountedAt\n        lastMovementAt\n        quantity\n        reservedQuantity\n        status\n        updatedAt\n        product {\n          barcode\n          costPrice\n          description\n          id\n          name\n          status\n          sku\n          volume\n          weight\n          width\n        }\n        location {\n          id\n          barcode\n          isActive\n          isPickable\n          isReceivable\n          level\n          name\n        }\n      }\n    }\n  }\n": typeof types.TableInventoryStockDocument,
    "\n  mutation CreateLocation($location: CreateLocationInput!) {\n    wms {\n      createLocation(value: $location) {\n        id\n      }\n    }\n  }\n": typeof types.CreateLocationDocument,
    "\n  mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {\n    wms {\n      updateLocation(id: $id, value: $location) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateLocationDocument,
    "\n  mutation RemoveLocation($id: ID!) {\n    wms {\n      removeLocation(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveLocationDocument,
    "\n  query TableLocation(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: LocationType\n  ) {\n    wms {\n      locations(page: $page, perPage: $perPage, search: $search, type: $type) {\n        barcode\n        createdAt\n        isActive\n        isPickable\n        isReceivable\n        id\n        hazmatApproved\n        level\n        maxPallets\n        maxVolume\n        maxWeight\n        name\n        path\n        temperatureControlled\n        type\n        updatedAt\n        xCoordinate\n        yCoordinate\n        zCoordinate\n        parentLocation {\n          id\n          name\n          path\n        }\n        warehouse {\n          address\n          city\n          name\n          id\n          isActive\n        }\n      }\n    }\n  }\n": typeof types.TableLocationDocument,
    "\n  mutation CreateOutboundShipmentItem(\n    $outboundShipmentItem: CreateOutboundShipmentItemInput!\n  ) {\n    wms {\n      createOutboundShipmentItem(value: $outboundShipmentItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateOutboundShipmentItemDocument,
    "\n  mutation UpdateOutboundShipmentItem(\n    $id: ID!\n    $outboundShipmentItem: UpdateOutboundShipmentItemInput!\n  ) {\n    wms {\n      updateOutboundShipmentItem(id: $id, value: $outboundShipmentItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateOutboundShipmentItemDocument,
    "\n  mutation RemoveOutboundShipmentItem($id: ID!) {\n    wms {\n      removeOutboundShipmentItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveOutboundShipmentItemDocument,
    "\n  mutation CreateOutboundShipment(\n    $outboundShipment: CreateOutboundShipmentInput!\n  ) {\n    wms {\n      createOutboundShipment(value: $outboundShipment) {\n        id\n      }\n    }\n  }\n": typeof types.CreateOutboundShipmentDocument,
    "\n  mutation UpdateOutboundShipment(\n    $id: ID!\n    $outboundShipment: UpdateOutboundShipmentInput!\n  ) {\n    wms {\n      updateOutboundShipment(id: $id, value: $outboundShipment) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateOutboundShipmentDocument,
    "\n  mutation RemoveOutboundShipment($id: ID!) {\n    wms {\n      removeOutboundShipment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveOutboundShipmentDocument,
    "\n  query TableOutboundShipment(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: OutboundShipmentStatus\n  ) {\n    wms {\n      outboundShipments(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        carrier\n        createdAt\n        id\n        status\n        trackingNumber\n        updatedAt\n        warehouseId\n        salesOrder {\n          id\n          orderNumber\n          shippingAddress\n          status\n        }\n      }\n    }\n  }\n": typeof types.TableOutboundShipmentDocument,
    "\n  mutation CreatePackageItem($packageItem: CreatePackageItemInput!) {\n    wms {\n      createPackageItem(value: $packageItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePackageItemDocument,
    "\n  mutation UpdatePackageItem($id: ID!, $packageItem: UpdatePackageItemInput!) {\n    wms {\n      updatePackageItem(id: $id, value: $packageItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePackageItemDocument,
    "\n  mutation RemovePackageItem($id: ID!) {\n    wms {\n      removePackageItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePackageItemDocument,
    "\n  mutation CreatePackage($package: CreatePackageInput!) {\n    wms {\n      createPackage(value: $package) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePackageDocument,
    "\n  mutation UpdatePackage($id: ID!, $package: UpdatePackageInput!) {\n    wms {\n      updatePackage(id: $id, value: $package) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePackageDocument,
    "\n  mutation RemovePackage($id: ID!) {\n    wms {\n      removePackage(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePackageDocument,
    "\n  query TablePackage($page: Int, $perPage: Int, $search: String) {\n    wms {\n      packages(page: $page, perPage: $perPage, search: $search) {\n        carrier\n        createdAt\n        height\n        id\n        insuranceValue\n        isFragile\n        isHazmat\n        length\n        packageNumber\n        packageType\n        packedAt\n        requiresSignature\n        serviceLevel\n        shippedAt\n        trackingNumber\n        updatedAt\n        volume\n        weight\n        width\n        items {\n          lotNumber\n          quantity\n          product {\n            barcode\n            costPrice\n            name\n            sku\n            status\n          }\n          serialNumbers\n          totalWeight\n          unitWeight\n        }\n      }\n    }\n  }\n": typeof types.TablePackageDocument,
    "\n  mutation CreatePickBatchItem($pickBatchItem: CreatePickBatchItemInput!) {\n    wms {\n      createPickBatchItem(value: $pickBatchItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePickBatchItemDocument,
    "\n  mutation UpdatePickBatchItem(\n    $id: ID!\n    $pickBatchItem: UpdatePickBatchItemInput!\n  ) {\n    wms {\n      updatePickBatchItem(id: $id, value: $pickBatchItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePickBatchItemDocument,
    "\n  mutation RemovePickBatchItem($id: ID!) {\n    wms {\n      removePickBatchItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePickBatchItemDocument,
    "\n  mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {\n    wms {\n      createPickBatch(value: $pickBatch) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePickBatchDocument,
    "\n  mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {\n    wms {\n      updatePickBatch(id: $id, value: $pickBatch) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePickBatchDocument,
    "\n  mutation RemovePickBatch($id: ID!) {\n    wms {\n      removePickBatch(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePickBatchDocument,
    "\n  query TablePickBatch(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: PickBatchStatus\n    $strategy: PickStrategy\n  ) {\n    wms {\n      pickBatches(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        strategy: $strategy\n      ) {\n        actualDuration\n        batchNumber\n        completedAt\n        completedItems\n        createdAt\n        estimatedDuration\n        id\n        priority\n        startedAt\n        status\n        strategy\n        totalItems\n        updatedAt\n        waveId\n        zoneRestrictions\n        items {\n          id\n          estimatedPickTime\n          actualPickTime\n          orderPriority\n          salesOrder {\n            status\n            shippingAddress\n            orderNumber\n          }\n        }\n      }\n    }\n  }\n": typeof types.TablePickBatchDocument,
    "\n  mutation CreateWmsProduct($wmsProduct: CreateWmsProductInput!) {\n    wms {\n      createWmsProduct(value: $wmsProduct) {\n        id\n      }\n    }\n  }\n": typeof types.CreateWmsProductDocument,
    "\n  mutation UpdateWmsProduct($id: ID!, $wmsProduct: UpdateWmsProductInput!) {\n    wms {\n      updateWmsProduct(id: $id, value: $wmsProduct) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateWmsProductDocument,
    "\n  mutation RemoveWmsProduct($id: ID!) {\n    wms {\n      removeWmsProduct(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveWmsProductDocument,
    "\n  query TableWmsProduct(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ProductStatus\n  ) {\n    wms {\n      wmsProducts(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        barcode\n        costPrice\n        createdAt\n        height\n        description\n        id\n        length\n        name\n        sku\n        status\n        updatedAt\n        volume\n        weight\n        width\n        supplier {\n          contactPerson\n          email\n          name\n          phoneNumber\n        }\n      }\n    }\n  }\n": typeof types.TableWmsProductDocument,
    "\n  mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {\n    wms {\n      createPutawayRule(value: $putawayRule) {\n        id\n      }\n    }\n  }\n": typeof types.CreatePutawayRuleDocument,
    "\n  mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {\n    wms {\n      updatePutawayRule(id: $id, value: $putawayRule) {\n        id\n      }\n    }\n  }\n": typeof types.UpdatePutawayRuleDocument,
    "\n  mutation RemovePutawayRule($id: ID!) {\n    wms {\n      removePutawayRule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemovePutawayRuleDocument,
    "\n  query TablePutawayRule(\n    $page: Int\n    $perPage: Int\n    $locationType: LocationType\n  ) {\n    wms {\n      putawayRules(\n        locationType: $locationType\n        page: $page\n        perPage: $perPage\n      ) {\n        createdAt\n        isActive\n        id\n        locationType\n        maxQuantity\n        minQuantity\n        priority\n        requiresHazmatApproval\n        requiresTemperatureControl\n        updatedAt\n        volumeThreshold\n        weightThreshold\n        client {\n          name\n          industry\n          country\n          city\n          website\n          phoneNumber\n        }\n        product {\n          barcode\n          id\n          costPrice\n          description\n          name\n          sku\n          status\n        }\n        warehouse {\n          address\n          city\n          country\n          name\n          isActive\n        }\n      }\n    }\n  }\n": typeof types.TablePutawayRuleDocument,
    "\n  mutation CreateReorderPoint($reorderPoint: CreateReorderPointInput!) {\n    wms {\n      createReorderPoint(value: $reorderPoint) {\n        id\n      }\n    }\n  }\n": typeof types.CreateReorderPointDocument,
    "\n  mutation UpdateReorderPoint(\n    $id: ID!\n    $reorderPoint: UpdateReorderPointInput!\n  ) {\n    wms {\n      updateReorderPoint(id: $id, value: $reorderPoint) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateReorderPointDocument,
    "\n  mutation RemoveReorderPoint($id: ID!) {\n    wms {\n      removeReorderPoint(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveReorderPointDocument,
    "\n  query TableReorderPoint($page: Int, $perPage: Int) {\n    wms {\n      reorderPoints(page: $page, perPage: $perPage) {\n        createdAt\n        id\n        threshold\n        updatedAt\n        product {\n          barcode\n          description\n          costPrice\n          id\n          name\n          sku\n          status\n        }\n        warehouse {\n          address\n          city\n          country\n          id\n          name\n        }\n      }\n    }\n  }\n": typeof types.TableReorderPointDocument,
    "\n  mutation CreateReturnItem($returnItem: CreateReturnItemInput!) {\n    wms {\n      createReturnItem(value: $returnItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateReturnItemDocument,
    "\n  mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {\n    wms {\n      updateReturnItem(id: $id, value: $returnItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateReturnItemDocument,
    "\n  mutation RemoveReturnItem($id: ID!) {\n    wms {\n      removeReturnItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveReturnItemDocument,
    "\n  mutation CreateReturn($return: CreateReturnInput!) {\n    wms {\n      createReturn(value: $return) {\n        id\n      }\n    }\n  }\n": typeof types.CreateReturnDocument,
    "\n  mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {\n    wms {\n      updateReturn(id: $id, value: $return) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateReturnDocument,
    "\n  mutation RemoveReturn($id: ID!) {\n    wms {\n      removeReturn(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveReturnDocument,
    "\n  query TableReturnQuery(\n    $page: Int\n    $perPage: Int\n    $status: ReturnStatus\n    $search: String\n  ) {\n    wms {\n      returns(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        reason\n        returnNumber\n        status\n        updatedAt\n        client {\n          name\n          phoneNumber\n          industry\n          country\n          city\n          website\n        }\n        salesOrder {\n          orderNumber\n          shippingAddress\n          status\n          updatedAt\n          id\n        }\n        items {\n          condition\n          id\n          quantityExpected\n          quantityReceived\n          quantityVariance\n          product {\n            barcode\n            costPrice\n            description\n            id\n            name\n            sku\n            status\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableReturnQueryDocument,
    "\n  mutation CreateSalesOrderItem($salesOrderItem: CreateSalesOrderItemInput!) {\n    wms {\n      createSalesOrderItem(value: $salesOrderItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateSalesOrderItemDocument,
    "\n  mutation UpdateSalesOrderItem(\n    $id: ID!\n    $salesOrderItem: UpdateSalesOrderItemInput!\n  ) {\n    wms {\n      updateSalesOrderItem(id: $id, value: $salesOrderItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateSalesOrderItemDocument,
    "\n  mutation RemoveSalesOrderItem($id: ID!) {\n    wms {\n      removeSalesOrderItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveSalesOrderItemDocument,
    "\n  mutation CreateSalesOrder($salesOrder: CreateSalesOrderInput!) {\n    wms {\n      createSalesOrder(value: $salesOrder) {\n        id\n      }\n    }\n  }\n": typeof types.CreateSalesOrderDocument,
    "\n  mutation UpdateSalesOrder($id: ID!, $salesOrder: UpdateSalesOrderInput!) {\n    wms {\n      updateSalesOrder(id: $id, value: $salesOrder) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateSalesOrderDocument,
    "\n  mutation RemoveSalesOrder($id: ID!) {\n    wms {\n      removeSalesOrder(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveSalesOrderDocument,
    "\n  query TableSalesOrder(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: SalesOrderStatus\n  ) {\n    wms {\n      salesOrders(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        orderNumber\n        shippingAddress\n        status\n        updatedAt\n        items {\n          id\n          quantityOrdered\n          updatedAt\n          product {\n            barcode\n            id\n            description\n            name\n            sku\n            status\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableSalesOrderDocument,
    "\n  mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {\n    wms {\n      createStockTransfer(value: $stockTransfer) {\n        id\n      }\n    }\n  }\n": typeof types.CreateStockTransferDocument,
    "\n  mutation UpdateStockTransfer(\n    $id: ID!\n    $stockTransfer: UpdateStockTransferInput!\n  ) {\n    wms {\n      updateStockTransfer(id: $id, value: $stockTransfer) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateStockTransferDocument,
    "\n  mutation RemoveStockTransfer($id: ID!) {\n    wms {\n      removeStockTransfer(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveStockTransferDocument,
    "\n  query TableStockTransfer(\n    $page: Int\n    $perPage: Int\n    $status: StockTransferStatus\n  ) {\n    wms {\n      stockTransfers(page: $page, perPage: $perPage, status: $status) {\n        createdAt\n        id\n        quantity\n        status\n        updatedAt\n        destinationWarehouse {\n          address\n          city\n          country\n          id\n          name\n          timezone\n          isActive\n        }\n        product {\n          barcode\n          costPrice\n          name\n          height\n          sku\n          status\n        }\n        sourceWarehouse {\n          address\n          country\n          isActive\n          name\n          city\n          id\n          timezone\n        }\n      }\n    }\n  }\n": typeof types.TableStockTransferDocument,
    "\n  mutation CreateSupplier($supplier: CreateSupplierInput!) {\n    wms {\n      createSupplier(value: $supplier) {\n        id\n      }\n    }\n  }\n": typeof types.CreateSupplierDocument,
    "\n  mutation UpdateSupplier($id: ID!, $supplier: UpdateSupplierInput!) {\n    wms {\n      updateSupplier(id: $id, value: $supplier) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateSupplierDocument,
    "\n  mutation RemoveSupplier($id: ID!) {\n    wms {\n      removeSupplier(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveSupplierDocument,
    "\n  query TableSupplier($page: Int, $perPage: Int, $search: String) {\n    wms {\n      suppliers(page: $page, perPage: $perPage, search: $search) {\n        contactPerson\n        createdAt\n        email\n        id\n        name\n        phoneNumber\n        updatedAt\n        products {\n          barcode\n          id\n          costPrice\n          description\n          name\n          sku\n          status\n        }\n      }\n    }\n  }\n": typeof types.TableSupplierDocument,
    "\n  mutation CreateTaskItem($taskItem: CreateTaskItemInput!) {\n    wms {\n      createTaskItem(value: $taskItem) {\n        id\n      }\n    }\n  }\n": typeof types.CreateTaskItemDocument,
    "\n  mutation UpdateTaskItem($id: ID!, $taskItem: UpdateTaskItemInput!) {\n    wms {\n      updateTaskItem(id: $id, value: $taskItem) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateTaskItemDocument,
    "\n  mutation RemoveTaskItem($id: ID!) {\n    wms {\n      removeTaskItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveTaskItemDocument,
    "\n  mutation CreateTask($task: CreateTaskInput!) {\n    wms {\n      createTask(value: $task) {\n        id\n      }\n    }\n  }\n": typeof types.CreateTaskDocument,
    "\n  mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {\n    wms {\n      updateTask(id: $id, value: $task) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateTaskDocument,
    "\n  mutation RemoveTask($id: ID!) {\n    wms {\n      removeTask(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveTaskDocument,
    "\n  query TableTask(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TaskStatus\n    $type: TaskType\n  ) {\n    wms {\n      tasks(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        type: $type\n      ) {\n        actualDuration\n        createdAt\n        durationSeconds\n        endTime\n        estimatedDuration\n        id\n        instructions\n        notes\n        priority\n        sourceEntityId\n        sourceEntityType\n        startTime\n        status\n        taskNumber\n        type\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n        warehouse {\n          address\n          city\n          country\n          id\n          isActive\n          name\n          timezone\n        }\n        items {\n          completedAt\n          createdAt\n          expiryDate\n          id\n          lotNumber\n          notes\n          quantityCompleted\n          quantityRemaining\n          quantityRequired\n          serialNumbers\n          status\n          updatedAt\n          product {\n            barcode\n            costPrice\n            description\n            id\n            name\n            sku\n            status\n          }\n          sourceLocation {\n            barcode\n            hazmatApproved\n            id\n            path\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableTaskDocument,
    "\n  mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {\n    wms {\n      createWarehouse(value: $warehouse) {\n        id\n      }\n    }\n  }\n": typeof types.CreateWarehouseDocument,
    "\n  mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {\n    wms {\n      updateWarehouse(id: $id, value: $warehouse) {\n        id\n      }\n    }\n  }\n": typeof types.UpdateWarehouseDocument,
    "\n  mutation RemoveWarehouse($id: ID!) {\n    wms {\n      removeWarehouse(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": typeof types.RemoveWarehouseDocument,
    "\n  query TableWarehouse($page: Int, $perPage: Int, $search: String) {\n    wms {\n      warehouses(page: $page, perPage: $perPage, search: $search) {\n        address\n        city\n        contactEmail\n        contactPerson\n        contactPhone\n        country\n        createdAt\n        id\n        isActive\n        name\n        postalCode\n        state\n        timezone\n        updatedAt\n        tasks {\n          instructions\n          id\n          notes\n          priority\n          taskNumber\n          type\n          user {\n            email\n            id\n            image\n            name\n          }\n        }\n        locations {\n          barcode\n          id\n          isActive\n          isPickable\n          isReceivable\n          level\n          maxPallets\n          maxVolume\n          maxWeight\n          name\n          path\n          type\n          xCoordinate\n          yCoordinate\n          zCoordinate\n          hazmatApproved\n        }\n        inboundShipments {\n          status\n          updatedAt\n          warehouseId\n          items {\n            discrepancyNotes\n            discrepancyQuantity\n            expectedQuantity\n            id\n            createdAt\n            receivedQuantity\n            updatedAt\n            product {\n              barcode\n              costPrice\n              description\n              id\n              name\n              sku\n              status\n            }\n            inboundShipment {\n              status\n              id\n              expectedArrivalDate\n              updatedAt\n              actualArrivalDate\n              client {\n                city\n                country\n                id\n                industry\n                name\n                phoneNumber\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": typeof types.TableWarehouseDocument,
};
const documents: Documents = {
    "\n  mutation CreateAccountTransaction(\n    $accountTransaction: CreateAccountTransactionInput!\n  ) {\n    billing {\n      createAccountTransaction(value: $accountTransaction) {\n        id\n      }\n    }\n  }\n": types.CreateAccountTransactionDocument,
    "\n  mutation UpdateAccountTransaction(\n    $id: ID!\n    $accountTransaction: UpdateAccountTransactionInput!\n  ) {\n    billing {\n      updateAccountTransaction(id: $id, value: $accountTransaction) {\n        id\n      }\n    }\n  }\n": types.UpdateAccountTransactionDocument,
    "\n  mutation RemoveAccountTransaction($id: ID!) {\n    billing {\n      removeAccountTransaction(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveAccountTransactionDocument,
    "\n  query AccountTransactions(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: TransactionType\n  ) {\n    billing {\n      accountTransactions(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        amount\n        createdAt\n        description\n        id\n        referenceNumber\n        runningBalance\n        sourceRecordId\n        sourceRecordType\n        transactionDate\n        type\n        processedByUser {\n          name\n          image\n          email\n          id\n        }\n        updatedAt\n        clientAccount {\n          availableCredit\n          paymentTermsDays\n          updatedAt\n          walletBalance\n          createdAt\n          client {\n            annualRevenue\n            id\n            industry\n            name\n            phoneNumber\n          }\n        }\n      }\n    }\n  }\n": types.AccountTransactionsDocument,
    "\n  mutation CreateAccountingSyncLog(\n    $accountingSyncLog: CreateAccountingSyncLogInput!\n  ) {\n    billing {\n      createAccountingSyncLog(value: $accountingSyncLog) {\n        id\n      }\n    }\n  }\n": types.CreateAccountingSyncLogDocument,
    "\n  mutation UpdateAccountingSyncLog(\n    $id: ID!\n    $accountingSyncLog: UpdateAccountingSyncLogInput!\n  ) {\n    billing {\n      updateAccountingSyncLog(id: $id, value: $accountingSyncLog) {\n        id\n      }\n    }\n  }\n": types.UpdateAccountingSyncLogDocument,
    "\n  mutation RemoveAccountingSyncLog($id: ID!) {\n    billing {\n      removeAccountingSyncLog(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveAccountingSyncLogDocument,
    "\n  query AccountingSyncLogs(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: SyncStatus\n  ) {\n    billing {\n      accountingSyncLogs(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        errorMessage\n        externalId\n        externalSystem\n        id\n        lastSyncAt\n        nextRetryAt\n        recordId\n        recordType\n        requestPayload\n        responsePayload\n        retryCount\n        status\n        updatedAt\n      }\n    }\n  }\n": types.AccountingSyncLogsDocument,
    "\n  mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {\n    billing {\n      createClientAccount(value: $clientAccount) {\n        id\n      }\n    }\n  }\n": types.CreateClientAccountDocument,
    "\n  mutation UpdateClientAccount(\n    $id: ID!\n    $clientAccount: UpdateClientAccountInput!\n  ) {\n    billing {\n      updateClientAccount(id: $id, value: $clientAccount) {\n        id\n      }\n    }\n  }\n": types.UpdateClientAccountDocument,
    "\n  mutation RemoveClientAccount($id: ID!) {\n    billing {\n      removeClientAccount(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveClientAccountDocument,
    "\n  query TableClientAccount($page: Int, $perPage: Int, $search: String) {\n    billing {\n      clientAccounts(page: $page, perPage: $perPage, search: $search) {\n        availableCredit\n        client {\n          annualRevenue\n          country\n          industry\n          name\n          phoneNumber\n          updatedAt\n          website\n        }\n        creditLimit\n        currency\n        isCreditApproved\n        lastPaymentDate\n        paymentTermsDays\n        updatedAt\n        walletBalance\n        id\n        transactions {\n          amount\n          description\n          id\n          referenceNumber\n          runningBalance\n          sourceRecordId\n          sourceRecordType\n          transactionDate\n          type\n        }\n      }\n    }\n  }\n": types.TableClientAccountDocument,
    "\n  mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {\n    billing {\n      createCreditNote(value: $creditNote) {\n        id\n      }\n    }\n  }\n": types.CreateCreditNoteDocument,
    "\n  mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {\n    billing {\n      updateCreditNote(id: $id, value: $creditNote) {\n        id\n      }\n    }\n  }\n": types.UpdateCreditNoteDocument,
    "\n  mutation RemoveCreditNote($id: ID!) {\n    billing {\n      removeCreditNote(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCreditNoteDocument,
    "\n  query TableCreditNote($page: Int, $perPage: Int, $search: String) {\n    billing {\n      creditNotes(page: $page, perPage: $perPage, search: $search) {\n        appliedAt\n        amount\n        createdAt\n        createdByUser {\n          email\n          id\n          image\n          name\n        }\n        creditNoteNumber\n        currency\n        id\n        issueDate\n        notes\n        reason\n        updatedAt\n        invoice {\n          amountPaid\n          invoiceNumber\n          issueDate\n          paidAt\n          notes\n          sentAt\n          status\n          subtotal\n          taxAmount\n          totalAmount\n          updatedAt\n          paymentTerms\n          discountAmount\n          dueDate\n          currency\n        }\n        dispute {\n          disputedAmount\n          id\n          reason\n          resolutionNotes\n          resolvedAt\n          status\n          submittedAt\n        }\n      }\n    }\n  }\n": types.TableCreditNoteDocument,
    "\n  mutation CreateDispute($dispute: CreateDisputeInput!) {\n    billing {\n      createDispute(value: $dispute) {\n        id\n      }\n    }\n  }\n": types.CreateDisputeDocument,
    "\n  mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {\n    billing {\n      updateDispute(id: $id, value: $dispute) {\n        id\n      }\n    }\n  }\n": types.UpdateDisputeDocument,
    "\n  mutation RemoveDispute($id: ID!) {\n    billing {\n      removeDispute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDisputeDocument,
    "\n  query TableDispute(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DisputeStatus\n  ) {\n    billing {\n      disputes(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        client {\n          annualRevenue\n          city\n          id\n          industry\n          name\n          website\n          phoneNumber\n        }\n        disputedAmount\n        id\n        reason\n        resolutionNotes\n        resolvedAt\n        status\n        submittedAt\n        updatedAt\n        resolvedByUser {\n          email\n          id\n          image\n          name\n        }\n        lineItem {\n          discountAmount\n          discountRate\n          description\n          id\n          lineTotal\n          quantity\n          sourceRecordId\n          sourceRecordType\n          taxAmount\n          taxRate\n          totalPrice\n          unitPrice\n          updatedAt\n          invoice {\n            amountPaid\n            currency\n            discountAmount\n            dueDate\n            id\n            invoiceNumber\n            issueDate\n            notes\n            paidAt\n            paymentTerms\n            sentAt\n            status\n            subtotal\n            taxAmount\n            totalAmount\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n": types.TableDisputeDocument,
    "\n  mutation CreateInvoiceLineItem(\n    $invoiceLineItem: CreateInvoiceLineItemInput!\n  ) {\n    billing {\n      createInvoiceLineItem(value: $invoiceLineItem) {\n        id\n      }\n    }\n  }\n": types.CreateInvoiceLineItemDocument,
    "\n  mutation UpdateInvoiceLineItem(\n    $id: ID!\n    $invoiceLineItem: UpdateInvoiceLineItemInput!\n  ) {\n    billing {\n      updateInvoiceLineItem(id: $id, value: $invoiceLineItem) {\n        id\n      }\n    }\n  }\n": types.UpdateInvoiceLineItemDocument,
    "\n  mutation RemoveInvoiceLineItem($id: ID!) {\n    billing {\n      removeInvoiceLineItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInvoiceLineItemDocument,
    "\n  mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {\n    billing {\n      createBillingInvoice(value: $billingInvoice) {\n        id\n      }\n    }\n  }\n": types.CreateBillingInvoiceDocument,
    "\n  mutation UpdateBillingInvoice(\n    $id: ID!\n    $billingInvoice: UpdateBillingInvoiceInput!\n  ) {\n    billing {\n      updateBillingInvoice(id: $id, value: $billingInvoice) {\n        id\n      }\n    }\n  }\n": types.UpdateBillingInvoiceDocument,
    "\n  mutation RemoveBillingInvoice($id: ID!) {\n    billing {\n      removeBillingInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveBillingInvoiceDocument,
    "\n  query TableBillingInvoice(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: BillingInvoiceStatus\n  ) {\n    billing {\n      billingInvoices(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        amountOutstanding\n        amountPaid\n        createdAt\n        currency\n        discountAmount\n        dueDate\n        id\n        invoiceNumber\n        issueDate\n        notes\n        paidAt\n        paymentTerms\n        sentAt\n        status\n        subtotal\n        taxAmount\n        totalAmount\n        updatedAt\n        lineItems {\n          description\n          discountAmount\n          discountRate\n          id\n          quantity\n          taxAmount\n          lineTotal\n          sourceRecordId\n          sourceRecordType\n          taxRate\n          totalPrice\n          unitPrice\n          updatedAt\n        }\n      }\n    }\n  }\n": types.TableBillingInvoiceDocument,
    "\n  mutation CreatePayment($payment: CreatePaymentInput!) {\n    billing {\n      createPayment(value: $payment) {\n        id\n      }\n    }\n  }\n": types.CreatePaymentDocument,
    "\n  mutation UpdatePayment($id: ID!, $payment: UpdatePaymentInput!) {\n    billing {\n      updatePayment(id: $id, value: $payment) {\n        id\n      }\n    }\n  }\n": types.UpdatePaymentDocument,
    "\n  mutation RemovePayment($id: ID!) {\n    billing {\n      removePayment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePaymentDocument,
    "\n  query TablePayment(\n    $page: Int\n    $paymentMethod: PaymentMethod\n    $perPage: Int\n    $search: String\n    $status: PaymentStatus\n  ) {\n    billing {\n      payments(\n        page: $page\n        paymentMethod: $paymentMethod\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        amount\n        createdAt\n        currency\n        exchangeRate\n        fees\n        gatewayReference\n        id\n        invoice {\n          invoiceNumber\n          id\n          issueDate\n          paidAt\n          paymentTerms\n          sentAt\n          status\n          discountAmount\n          amountPaid\n          amountOutstanding\n        }\n        processedByUser {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n": types.TablePaymentDocument,
    "\n  mutation CreateQuote($quote: CreateQuoteInput!) {\n    billing {\n      createQuote(value: $quote) {\n        id\n      }\n    }\n  }\n": types.CreateQuoteDocument,
    "\n  mutation UpdateQuote($id: ID!, $quote: UpdateQuoteInput!) {\n    billing {\n      updateQuote(id: $id, value: $quote) {\n        id\n      }\n    }\n  }\n": types.UpdateQuoteDocument,
    "\n  mutation RemoveQuote($id: ID!) {\n    billing {\n      removeQuote(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveQuoteDocument,
    "\n  query TableQuote(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: QuoteStatus\n  ) {\n    billing {\n      quotes(page: $page, perPage: $perPage, search: $search, status: $status) {\n        createdAt\n        destinationDetails\n        expiresAt\n        height\n        id\n        length\n        notes\n        originDetails\n        quoteNumber\n        quotedPrice\n        serviceLevel\n        status\n        updatedAt\n        volume\n        weight\n        width\n        createdByUser {\n          email\n          id\n          image\n          name\n        }\n        client {\n          city\n          country\n          id\n          industry\n          name\n          phoneNumber\n          website\n          billingInvoices {\n            amountOutstanding\n            amountPaid\n            currency\n            discountAmount\n            dueDate\n            invoiceNumber\n            issueDate\n          }\n        }\n      }\n    }\n  }\n": types.TableQuoteDocument,
    "\n  mutation CreateRateCard($rateCard: CreateRateCardInput!) {\n    billing {\n      createRateCard(value: $rateCard) {\n        id\n      }\n    }\n  }\n": types.CreateRateCardDocument,
    "\n  mutation UpdateRateCard($id: ID!, $rateCard: UpdateRateCardInput!) {\n    billing {\n      updateRateCard(id: $id, value: $rateCard) {\n        id\n      }\n    }\n  }\n": types.UpdateRateCardDocument,
    "\n  mutation RemoveRateCard($id: ID!) {\n    billing {\n      removeRateCard(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveRateCardDocument,
    "\n  query TableRateCard(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $serviceType: ServiceType\n  ) {\n    billing {\n      rateCards(\n        page: $page\n        perPage: $perPage\n        search: $search\n        serviceType: $serviceType\n      ) {\n        createdAt\n        description\n        id\n        isActive\n        name\n        serviceType\n        updatedAt\n        validFrom\n        validTo\n        createdByUser {\n          email\n          emailVerified\n          image\n          name\n        }\n        rules {\n          condition\n          id\n          isActive\n          maxValue\n          minValue\n          price\n          pricingModel\n          priority\n          value\n        }\n      }\n    }\n  }\n": types.TableRateCardDocument,
    "\n  mutation CreateRateRule($rateRule: CreateRateRuleInput!) {\n    billing {\n      createRateRule(value: $rateRule) {\n        id\n      }\n    }\n  }\n": types.CreateRateRuleDocument,
    "\n  mutation UpdateRateRule($id: ID!, $rateRule: UpdateRateRuleInput!) {\n    billing {\n      updateRateRule(id: $id, value: $rateRule) {\n        id\n      }\n    }\n  }\n": types.UpdateRateRuleDocument,
    "\n  mutation RemoveRateRule($id: ID!) {\n    billing {\n      removeRateRule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveRateRuleDocument,
    "\n  query TableRateRule(\n    $page: Int\n    $perPage: Int\n    $pricingModel: PricingModel\n    $search: String\n  ) {\n    billing {\n      rateRules(\n        page: $page\n        perPage: $perPage\n        pricingModel: $pricingModel\n        search: $search\n      ) {\n        condition\n        createdAt\n        id\n        isActive\n        maxValue\n        minValue\n        price\n        pricingModel\n        priority\n        updatedAt\n        value\n        rateCard {\n          createdAt\n          createdByUser {\n            email\n            id\n            image\n            name\n          }\n          description\n          id\n          isActive\n          name\n          serviceType\n          updatedAt\n          validFrom\n          validTo\n        }\n      }\n    }\n  }\n": types.TableRateRuleDocument,
    "\n  mutation CreateSurcharge($surcharge: CreateSurchargeInput!) {\n    billing {\n      createSurcharge(value: $surcharge) {\n        id\n      }\n    }\n  }\n": types.CreateSurchargeDocument,
    "\n  mutation UpdateSurcharge($id: ID!, $surcharge: UpdateSurchargeInput!) {\n    billing {\n      updateSurcharge(id: $id, value: $surcharge) {\n        id\n      }\n    }\n  }\n": types.UpdateSurchargeDocument,
    "\n  mutation RemoveSurcharge($id: ID!) {\n    billing {\n      removeSurcharge(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveSurchargeDocument,
    "\n  query TableSurcharge(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $calculationMethod: SurchargeCalculationMethod\n  ) {\n    billing {\n      surcharges(\n        page: $page\n        perPage: $perPage\n        search: $search\n        calculationMethod: $calculationMethod\n      ) {\n        amount\n        calculationMethod\n        createdAt\n        description\n        id\n        isActive\n        name\n        type\n        updatedAt\n        validFrom\n        validTo\n      }\n    }\n  }\n": types.TableSurchargeDocument,
    "\n  mutation CreateCampaign($campaign: CreateCampaignInput!) {\n    crm {\n      createCampaign(value: $campaign) {\n        id\n      }\n    }\n  }\n": types.CreateCampaignDocument,
    "\n  mutation UpdateCampaign($id: ID!, $campaign: UpdateCampaignInput!) {\n    crm {\n      updateCampaign(id: $id, value: $campaign) {\n        id\n      }\n    }\n  }\n": types.UpdateCampaignDocument,
    "\n  mutation RemoveCampaign($id: ID!) {\n    crm {\n      removeCampaign(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCampaignDocument,
    "\n  query TableCampaign($page: Int, $perPage: Int, $search: String) {\n    crm {\n      campaigns(page: $page, perPage: $perPage, search: $search) {\n        budget\n        createdAt\n        endDate\n        id\n        name\n        startDate\n        updatedAt\n      }\n    }\n  }\n": types.TableCampaignDocument,
    "\n  query SearchCampaigns($search: String!) {\n    crm {\n      campaigns(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchCampaignsDocument,
    "\n  mutation CreateCase($case: CreateCaseInput!) {\n    crm {\n      createCase(value: $case) {\n        id\n      }\n    }\n  }\n": types.CreateCaseDocument,
    "\n  mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {\n    crm {\n      updateCase(id: $id, value: $case) {\n        id\n      }\n    }\n  }\n": types.UpdateCaseDocument,
    "\n  mutation RemoveCase($id: ID!) {\n    crm {\n      removeCase(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCaseDocument,
    "\n  query TableCase(\n    $page: Int\n    $perPage: Int\n    $priority: CasePriority\n    $status: CaseStatus\n    $type: CaseType\n  ) {\n    crm {\n      cases(\n        perPage: $page\n        page: $perPage\n        priority: $priority\n        status: $status\n        type: $type\n      ) {\n        caseNumber\n        createdAt\n        description\n        id\n        priority\n        status\n        type\n        updatedAt\n        contact {\n          id\n          email\n          name\n          phoneNumber\n          jobTitle\n        }\n        owner {\n          id\n          email\n          image\n          name\n        }\n      }\n    }\n  }\n": types.TableCaseDocument,
    "\n  query SearchCases($search: String!) {\n    crm {\n      cases(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: caseNumber\n      }\n    }\n  }\n": types.SearchCasesDocument,
    "\n  mutation CreateCompany($company: CreateCompanyInput!) {\n    crm {\n      createCompany(value: $company) {\n        id\n      }\n    }\n  }\n": types.CreateCompanyDocument,
    "\n  mutation UpdateCompany($id: ID!, $company: UpdateCompanyInput!) {\n    crm {\n      updateCompany(id: $id, value: $company) {\n        id\n      }\n    }\n  }\n": types.UpdateCompanyDocument,
    "\n  mutation RemoveCompany($id: ID!) {\n    crm {\n      removeCompany(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCompanyDocument,
    "\n  query TableCompanyQuery($page: Int, $perPage: Int, $search: String) {\n    crm {\n      companies(page: $page, perPage: $perPage, search: $search) {\n        name\n        owner {\n          email\n          image\n          name\n        }\n        annualRevenue\n        phoneNumber\n        postalCode\n        state\n        street\n        updatedAt\n        website\n        city\n        clientAccount {\n          walletBalance\n          creditLimit\n          currency\n        }\n        country\n        createdAt\n        id\n        industry\n      }\n    }\n  }\n": types.TableCompanyQueryDocument,
    "\n  query SearchCompanies($search: String!) {\n    crm {\n      companies(page: 1, perPage: 10,search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchCompaniesDocument,
    "\n  mutation CreateContact($contact: CreateContactInput!) {\n    crm {\n      createContact(value: $contact) {\n        id\n      }\n    }\n  }\n": types.CreateContactDocument,
    "\n  mutation UpdateContact($id: ID!, $contact: UpdateContactInput!) {\n    crm {\n      updateContact(id: $id, value: $contact) {\n        id\n      }\n    }\n  }\n": types.UpdateContactDocument,
    "\n  mutation RemoveContact($id: ID!) {\n    crm {\n      removeContact(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveContactDocument,
    "\n  query TableContact($page: Int, $perPage: Int, $search: String) {\n    crm {\n      contacts(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        email\n        id\n        jobTitle\n        name\n        phoneNumber\n        updatedAt\n        owner {\n          id\n          email\n          image\n          name\n        }\n        company {\n          id\n          phoneNumber\n          name\n          industry\n          website\n        }\n      }\n    }\n  }\n": types.TableContactDocument,
    "\n  query SearchContacts($search: String!) {\n    crm {\n      contacts(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchContactsDocument,
    "\n  mutation CreateInteraction($interaction: CreateInteractionInput!) {\n    crm {\n      createInteraction(value: $interaction) {\n        id\n      }\n    }\n  }\n": types.CreateInteractionDocument,
    "\n  mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {\n    crm {\n      updateInteraction(id: $id, value: $interaction) {\n        id\n      }\n    }\n  }\n": types.UpdateInteractionDocument,
    "\n  mutation RemoveInteraction($id: ID!) {\n    crm {\n      removeInteraction(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInteractionDocument,
    "\n  query TableInteraction(\n    $page: Int\n    $perPage: Int\n    $interactionType: InteractionType\n    $search: String\n  ) {\n    crm {\n      interactions(\n        interactionType: $interactionType\n        page: $page\n        perPage: $perPage\n        search: $search\n      ) {\n        createdAt\n        id\n        interactionDate\n        notes\n        outcome\n        type\n        updatedAt\n        user {\n          id\n          email\n          image\n          name\n        }\n        case {\n          id\n          caseNumber\n          priority\n          status\n          type\n        }\n        contact {\n          id\n          name\n          email\n          jobTitle\n          phoneNumber\n        }\n      }\n    }\n  }\n": types.TableInteractionDocument,
    "\n  mutation CreateInvoiceItem($invoiceItem: CreateInvoiceItemInput!) {\n    crm {\n      createInvoiceItem(value: $invoiceItem) {\n        id\n      }\n    }\n  }\n": types.CreateInvoiceItemDocument,
    "\n  mutation UpdateInvoiceItem($id: ID!, $invoiceItem: UpdateInvoiceItemInput!) {\n    crm {\n      updateInvoiceItem(id: $id, value: $invoiceItem) {\n        id\n      }\n    }\n  }\n": types.UpdateInvoiceItemDocument,
    "\n  mutation RemoveInvoiceItem($id: ID!) {\n    crm {\n      removeInvoiceItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInvoiceItemDocument,
    "\n  mutation CreateInvoice($invoice: CreateInvoiceInput!) {\n    crm {\n      createInvoice(value: $invoice) {\n        id\n      }\n    }\n  }\n": types.CreateInvoiceDocument,
    "\n  mutation UpdateInvoice($id: ID!, $invoice: UpdateInvoiceInput!) {\n    crm {\n      updateInvoice(id: $id, value: $invoice) {\n        id\n      }\n    }\n  }\n": types.UpdateInvoiceDocument,
    "\n  mutation RemoveInvoice($id: ID!) {\n    crm {\n      removeInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInvoiceDocument,
    "\n  query TableInvoice(\n    $page: Int\n    $perPage: Int\n    $paymentMethod: CrmInvoicePaymentMethod\n    $status: InvoiceStatus\n    $search: String\n  ) {\n    crm {\n      invoices(\n        page: $page\n        paymentMethod: $paymentMethod\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        dueDate\n        id\n        issueDate\n        paidAt\n        paymentMethod\n        sentAt\n        status\n        total\n        updatedAt\n        items {\n          price\n          quantity\n          updatedAt\n          id\n          createdAt\n          product {\n            name\n            price\n            type\n            sku\n            id\n            description\n          }\n        }\n        opportunity {\n          name\n          stage\n          id\n          expectedCloseDate\n          dealValue\n        }\n      }\n    }\n  }\n": types.TableInvoiceDocument,
    "\n  mutation CreateLead($lead: CreateLeadInput!) {\n    crm {\n      createLead(value: $lead) {\n        id\n      }\n    }\n  }\n": types.CreateLeadDocument,
    "\n  mutation UpdateLead($id: ID!, $lead: UpdateLeadInput!) {\n    crm {\n      updateLead(id: $id, value: $lead) {\n        id\n      }\n    }\n  }\n": types.UpdateLeadDocument,
    "\n  mutation RemoveLead($id: ID!) {\n    crm {\n      removeLead(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveLeadDocument,
    "\n  query TableLead(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: LeadStatus\n    $source: LeadSource\n  ) {\n    crm {\n      leads(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        leadSource: $source\n      ) {\n        convertedAt\n        createdAt\n        email\n        leadScore\n        leadSource\n        name\n        id\n        status\n        updatedAt\n        owner {\n          id\n          email\n          image\n          name\n        }\n        campaign {\n          name\n          endDate\n          startDate\n          budget\n        }\n        convertedCompany {\n          name\n          industry\n          phoneNumber\n          website\n          id\n        }\n        convertedContact {\n          email\n          id\n          jobTitle\n          name\n          phoneNumber\n          updatedAt\n          company {\n            name\n            industry\n            id\n          }\n        }\n        convertedOpportunity {\n          name\n          dealValue\n          source\n          stage\n        }\n      }\n    }\n  }\n": types.TableLeadDocument,
    "\n  query SearchLeads($search: String!) {\n    crm {\n      leads(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchLeadsDocument,
    "\n  mutation CreateNotification($notification: CreateNotificationInput!) {\n    crm {\n      createNotification(value: $notification) {\n        id\n      }\n    }\n  }\n": types.CreateNotificationDocument,
    "\n  mutation UpdateNotification(\n    $id: ID!\n    $notification: UpdateNotificationInput!\n  ) {\n    crm {\n      updateNotification(id: $id, value: $notification) {\n        id\n      }\n    }\n  }\n": types.UpdateNotificationDocument,
    "\n  mutation RemoveNotification($id: ID!) {\n    crm {\n      removeNotification(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveNotificationDocument,
    "\n  query TableNotification($page: Int, $perPage: Int, $search: String) {\n    crm {\n      notifications(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        id\n        isRead\n        link\n        message\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n": types.TableNotificationDocument,
    "\n  query SearchNotifications($search: String!) {\n    crm {\n      notifications(page: 1, perPage: 10,search: $search) {\n        value: id\n        label: message\n      }\n    }\n  }\n": types.SearchNotificationsDocument,
    "\n  mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {\n    crm {\n      createOpportunity(value: $opportunity) {\n        id\n      }\n    }\n  }\n": types.CreateOpportunityDocument,
    "\n  mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {\n    crm {\n      updateOpportunity(id: $id, value: $opportunity) {\n        id\n      }\n    }\n  }\n": types.UpdateOpportunityDocument,
    "\n  mutation RemoveOpportunity($id: ID!) {\n    crm {\n      removeOpportunity(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveOpportunityDocument,
    "\n  query TableOpportunity(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $source: OpportunitySource\n    $stage: OpportunityStage\n  ) {\n    crm {\n      opportunities(\n        page: $page\n        perPage: $perPage\n        search: $search\n        source: $source\n        stage: $stage\n      ) {\n        createdAt\n        dealValue\n        expectedCloseDate\n        id\n        lostReason\n        name\n        probability\n        source\n        stage\n        updatedAt\n        company {\n          name\n          industry\n          id\n          country\n          phoneNumber\n        }\n        contact {\n          email\n          id\n          jobTitle\n          name\n          phoneNumber\n          updatedAt\n          company {\n            name\n            phoneNumber\n            industry\n            country\n          }\n        }\n        owner {\n          email\n          id\n          image\n          name\n        }\n        products {\n          quantity\n          product {\n            id\n            name\n            price\n            sku\n            type\n            description\n          }\n        }\n        campaign {\n          name\n          budget\n          endDate\n          startDate\n          id\n        }\n      }\n    }\n  }\n": types.TableOpportunityDocument,
    "\n  query SearchOpportunities($search: String!) {\n    crm {\n      opportunities(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchOpportunitiesDocument,
    "\n  mutation CreateOpportunityProduct(\n    $opportunityProduct: CreateOpportunityProductInput!\n  ) {\n    crm {\n      createOpportunityProduct(value: $opportunityProduct) {\n        opportunity {\n          id\n        }\n        product {\n          id\n        }\n      }\n    }\n  }\n": types.CreateOpportunityProductDocument,
    "\n  mutation UpdateOpportunityProduct(\n    $opportunityId: ID!\n    $productId: ID!\n    $opportunityProduct: UpdateOpportunityProductInput!\n  ) {\n    crm {\n      updateOpportunityProduct(\n        opportunityId: $opportunityId\n        productId: $productId\n        value: $opportunityProduct\n      ) {\n        opportunity {\n          id\n        }\n        product {\n          id\n        }\n      }\n    }\n  }\n": types.UpdateOpportunityProductDocument,
    "\n  mutation RemoveOpportunityProduct($opportunityId: ID!, $productId: ID!) {\n    crm {\n      removeOpportunityProduct(\n        opportunityId: $opportunityId\n        productId: $productId\n      ) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveOpportunityProductDocument,
    "\n  mutation CreateProduct($product: CreateProductInput!) {\n    crm {\n      createProduct(value: $product) {\n        id\n      }\n    }\n  }\n": types.CreateProductDocument,
    "\n  mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {\n    crm {\n      updateProduct(id: $id, value: $product) {\n        id\n      }\n    }\n  }\n": types.UpdateProductDocument,
    "\n  mutation RemoveProduct($id: ID!) {\n    crm {\n      removeProduct(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveProductDocument,
    "\n  query TableProduct(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProductType\n  ) {\n    crm {\n      products(page: $page, perPage: $perPage, search: $search, type: $type) {\n        createdAt\n        description\n        id\n        name\n        price\n        sku\n        type\n        updatedAt\n      }\n    }\n  }\n": types.TableProductDocument,
    "\n  query SearchProducts($search: String!) {\n    crm {\n      products(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchProductsDocument,
    "\n  mutation CreateCustomerTrackingLink(\n    $customerTrackingLink: CreateCustomerTrackingLinkInput!\n  ) {\n    dms {\n      createCustomerTrackingLink(value: $customerTrackingLink) {\n        id\n      }\n    }\n  }\n": types.CreateCustomerTrackingLinkDocument,
    "\n  mutation UpdateCustomerTrackingLink(\n    $id: ID!\n    $customerTrackingLink: UpdateCustomerTrackingLinkInput!\n  ) {\n    dms {\n      updateCustomerTrackingLink(id: $id, value: $customerTrackingLink) {\n        id\n      }\n    }\n  }\n": types.UpdateCustomerTrackingLinkDocument,
    "\n  mutation RemoveCustomerTrackingLink($id: ID!) {\n    dms {\n      removeCustomerTrackingLink(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCustomerTrackingLinkDocument,
    "\n  query TableCustomerTrackingLink($page: Int, $perPage: Int, $search: String) {\n    dms {\n      customerTrackingLinks(page: $page, perPage: $perPage, search: $search) {\n        accessCount\n        createdAt\n        expiresAt\n        id\n        isActive\n        lastAccessedAt\n        trackingToken\n        updatedAt\n      }\n    }\n  }\n": types.TableCustomerTrackingLinkDocument,
    "\n  query SearchCustomerTrackingLinks($search: String!) {\n    dms {\n      customerTrackingLinks(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: trackingToken\n      }\n    }\n  }\n": types.SearchCustomerTrackingLinksDocument,
    "\n  mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {\n    dms {\n      createDeliveryRoute(value: $deliveryRoute) {\n        id\n      }\n    }\n  }\n": types.CreateDeliveryRouteDocument,
    "\n  mutation UpdateDeliveryRoute(\n    $id: ID!\n    $deliveryRoute: UpdateDeliveryRouteInput!\n  ) {\n    dms {\n      updateDeliveryRoute(id: $id, value: $deliveryRoute) {\n        id\n      }\n    }\n  }\n": types.UpdateDeliveryRouteDocument,
    "\n  mutation RemoveDeliveryRoute($id: ID!) {\n    dms {\n      removeDeliveryRoute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDeliveryRouteDocument,
    "\n  query TableDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DeliveryRouteStatus\n  ) {\n    dms {\n      deliveryRoutes(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        actualDurationMinutes\n        completedAt\n        createdAt\n        estimatedDurationMinutes\n        id\n        optimizedRouteData\n        routeDate\n        startedAt\n        status\n        totalDistanceKm\n        updatedAt\n        driver {\n          id\n          user {\n            email\n            id\n            image\n            name\n          }\n          status\n          licenseNumber\n          contactPhone\n        }\n      }\n    }\n  }\n": types.TableDeliveryDocument,
    "\n  query SearchDeliveryRoutes($search: String!) {\n    dms {\n      deliveryRoutes(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: routeDate\n      }\n    }\n  }\n": types.SearchDeliveryRoutesDocument,
    "\n  mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {\n    dms {\n      createDeliveryTask(value: $deliveryTask) {\n        id\n      }\n    }\n  }\n": types.CreateDeliveryTaskDocument,
    "\n  mutation UpdateDeliveryTask(\n    $id: ID!\n    $deliveryTask: UpdateDeliveryTaskInput!\n  ) {\n    dms {\n      updateDeliveryTask(id: $id, value: $deliveryTask) {\n        id\n      }\n    }\n  }\n": types.UpdateDeliveryTaskDocument,
    "\n  mutation RemoveDeliveryTask($id: ID!) {\n    dms {\n      removeDeliveryTask(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDeliveryTaskDocument,
    "\n  query TableDeliveryTask(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DeliveryTaskStatus\n    $failureReason: DeliveryFailureReason\n  ) {\n    dms {\n      deliveryTasks(\n        failureReason: $failureReason\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        actualArrivalTime\n        attemptCount\n        createdAt\n        deliveryAddress\n        deliveryInstructions\n        deliveryTime\n        estimatedArrivalTime\n        failureReason\n        id\n        recipientName\n        recipientPhone\n        routeSequence\n        status\n        updatedAt\n        deliveryRoute {\n          id\n          totalDistanceKm\n          optimizedRouteData\n          status\n          driver {\n            id\n            user {\n              email\n              id\n              image\n              name\n            }\n            licenseNumber\n            status\n            contactPhone\n          }\n        }\n        package {\n          id\n          carrier\n          packageNumber\n          trackingNumber\n          warehouse {\n            id\n            address\n            country\n          }\n        }\n      }\n    }\n  }\n": types.TableDeliveryTaskDocument,
    "\n  query SearchDeliveryTasks($search: String!) {\n    dms {\n      deliveryTasks(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: recipientName\n      }\n    }\n  }\n": types.SearchDeliveryTasksDocument,
    "\n  mutation CreateDriverLocation($driverLocation: CreateDriverLocationInput!) {\n    dms {\n      createDriverLocation(value: $driverLocation) {\n        id\n      }\n    }\n  }\n": types.CreateDriverLocationDocument,
    "\n  mutation UpdateDriverLocation(\n    $id: ID!\n    $driverLocation: UpdateDriverLocationInput!\n  ) {\n    dms {\n      updateDriverLocation(id: $id, value: $driverLocation) {\n        id\n      }\n    }\n  }\n": types.UpdateDriverLocationDocument,
    "\n  mutation RemoveDriverLocation($id: ID!) {\n    dms {\n      removeDriverLocation(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDriverLocationDocument,
    "\n  query TableDriverLocation($page: Int, $perPage: Int) {\n    dms {\n      driverLocations(page: $page, perPage: $perPage) {\n        accuracy\n        altitude\n        createdAt\n        heading\n        id\n        latitude\n        longitude\n        speedKmh\n        timestamp\n        updatedAt\n        driver {\n          id\n          contactPhone\n          licenseExpiryDate\n          licenseNumber\n          user {\n            email\n            id\n            image\n            name\n          }\n        }\n      }\n    }\n  }\n": types.TableDriverLocationDocument,
    "\n  mutation CreateDmsProofOfDelivery(\n    $dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!\n  ) {\n    dms {\n      createDmsProofOfDelivery(value: $dmsProofOfDelivery) {\n        id\n      }\n    }\n  }\n": types.CreateDmsProofOfDeliveryDocument,
    "\n  mutation UpdateDmsProofOfDelivery(\n    $id: ID!\n    $dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput!\n  ) {\n    dms {\n      updateDmsProofOfDelivery(id: $id, value: $dmsProofOfDelivery) {\n        id\n      }\n    }\n  }\n": types.UpdateDmsProofOfDeliveryDocument,
    "\n  mutation RemoveDmsProofOfDelivery($id: ID!) {\n    dms {\n      removeDmsProofOfDelivery(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDmsProofOfDeliveryDocument,
    "\n  query TableProofOfDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProofOfDeliveryType\n  ) {\n    dms {\n      dmsProofOfDeliveries(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        createdAt\n        filePath\n        id\n        latitude\n        longitude\n        recipientName\n        signatureData\n        timestamp\n        type\n        updatedAt\n        verificationCode\n        deliveryTask {\n          package {\n            id\n            packageNumber\n            packageType\n            requiresSignature\n            trackingNumber\n            warehouse {\n              id\n              address\n              city\n              country\n            }\n          }\n          actualArrivalTime\n          deliveryInstructions\n          deliveryAddress\n          failureReason\n          recipientName\n          recipientPhone\n          status\n        }\n      }\n    }\n  }\n": types.TableProofOfDeliveryDocument,
    "\n  query SearchDmsProofOfDeliveries($search: String!) {\n    dms {\n      dmsProofOfDeliveries(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: recipientName\n      }\n    }\n  }\n": types.SearchDmsProofOfDeliveriesDocument,
    "\n  mutation CreateTaskEvent($taskEvent: CreateTaskEventInput!) {\n    dms {\n      createTaskEvent(value: $taskEvent) {\n        id\n      }\n    }\n  }\n": types.CreateTaskEventDocument,
    "\n  mutation UpdateTaskEvent($id: ID!, $taskEvent: UpdateTaskEventInput!) {\n    dms {\n      updateTaskEvent(id: $id, value: $taskEvent) {\n        id\n      }\n    }\n  }\n": types.UpdateTaskEventDocument,
    "\n  mutation RemoveTaskEvent($id: ID!) {\n    dms {\n      removeTaskEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveTaskEventDocument,
    "\n  query TableTaskEvent(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TaskEventStatus\n  ) {\n    dms {\n      taskEvents(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        latitude\n        longitude\n        notes\n        reason\n        status\n        timestamp\n        updatedAt\n        deliveryTask {\n          id\n          recipientName\n          recipientPhone\n          deliveryInstructions\n          deliveryAddress\n          status\n          package {\n            id\n            trackingNumber\n            packageNumber\n            packageType\n          }\n        }\n      }\n    }\n  }\n": types.TableTaskEventDocument,
    "\n  query SearchTaskEvents($search: String!) {\n    dms {\n      taskEvents(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: reason\n      }\n    }\n  }\n": types.SearchTaskEventsDocument,
    "\n  mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {\n    tms {\n      createCarrierRate(value: $carrierRate) {\n        id\n      }\n    }\n  }\n": types.CreateCarrierRateDocument,
    "\n  mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {\n    tms {\n      updateCarrierRate(id: $id, value: $carrierRate) {\n        id\n      }\n    }\n  }\n": types.UpdateCarrierRateDocument,
    "\n  mutation RemoveCarrierRate($id: ID!) {\n    tms {\n      removeCarrierRate(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCarrierRateDocument,
    "\n  mutation CreateCarrier($carrier: CreateCarrierInput!) {\n    tms {\n      createCarrier(value: $carrier) {\n        id\n      }\n    }\n  }\n": types.CreateCarrierDocument,
    "\n  mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {\n    tms {\n      updateCarrier(id: $id, value: $carrier) {\n        id\n      }\n    }\n  }\n": types.UpdateCarrierDocument,
    "\n  mutation RemoveCarrier($id: ID!) {\n    tms {\n      removeCarrier(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveCarrierDocument,
    "\n  query TableCarrierQuery($page: Int, $perPage: Int, $search: String) {\n    tms {\n      carriers(page: $page, perPage: $perPage, search: $search) {\n        contactEmail\n        contactPerson\n        contactPhone\n        createdAt\n        id\n        name\n        servicesOffered\n        updatedAt\n        partnerInvoices {\n          invoiceNumber\n          invoiceDate\n          status\n          totalAmount\n          items {\n            amount\n            id\n            shipmentLeg {\n              status\n              shipment {\n                trackingNumber\n                carrier\n                createdAt\n                id\n                status\n                warehouseId\n              }\n            }\n          }\n        }\n        rates {\n          destination\n          id\n          origin\n          rate\n          serviceType\n          unit\n        }\n      }\n    }\n  }\n": types.TableCarrierQueryDocument,
    "\n  query SearchCarriers($search: String!) {\n    tms {\n      carriers(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchCarriersDocument,
    "\n  mutation CreateDriverSchedule($driverSchedule: CreateDriverScheduleInput!) {\n    tms {\n      createDriverSchedule(value: $driverSchedule) {\n        id\n      }\n    }\n  }\n": types.CreateDriverScheduleDocument,
    "\n  mutation UpdateDriverSchedule(\n    $id: ID!\n    $driverSchedule: UpdateDriverScheduleInput!\n  ) {\n    tms {\n      updateDriverSchedule(id: $id, value: $driverSchedule) {\n        id\n      }\n    }\n  }\n": types.UpdateDriverScheduleDocument,
    "\n  mutation RemoveDriverSchedule($id: ID!) {\n    tms {\n      removeDriverSchedule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDriverScheduleDocument,
    "\n  mutation CreateDriver($driver: CreateDriverInput!) {\n    tms {\n      createDriver(value: $driver) {\n        id\n      }\n    }\n  }\n": types.CreateDriverDocument,
    "\n  mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {\n    tms {\n      updateDriver(id: $id, value: $driver) {\n        id\n      }\n    }\n  }\n": types.UpdateDriverDocument,
    "\n  mutation RemoveDriver($id: ID!) {\n    tms {\n      removeDriver(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveDriverDocument,
    "\n  query TableDriver(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DriverStatus\n  ) {\n    tms {\n      drivers(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        contactPhone\n        createdAt\n        id\n        licenseExpiryDate\n        licenseNumber\n        status\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n": types.TableDriverDocument,
    "\n  query SearchDrivers($search: String!) {\n    tms {\n      drivers(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: licenseNumber\n      }\n    }\n  }\n": types.SearchDriversDocument,
    "\n  mutation CreateExpense($expense: CreateExpenseInput!) {\n    tms {\n      createExpense(value: $expense) {\n        id\n      }\n    }\n  }\n": types.CreateExpenseDocument,
    "\n  mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {\n    tms {\n      updateExpense(id: $id, value: $expense) {\n        id\n      }\n    }\n  }\n": types.UpdateExpenseDocument,
    "\n  mutation RemoveExpense($id: ID!) {\n    tms {\n      removeExpense(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveExpenseDocument,
    "\n  query TableExpense(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ExpenseStatus\n    $type: ExpenseType\n    $currency: Currency\n  ) {\n    tms {\n      expenses(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        type: $type\n        currency: $currency\n      ) {\n        amount\n        createdAt\n        currency\n        description\n        driver {\n          user {\n            email\n            id\n            image\n            name\n          }\n          licenseNumber\n          contactPhone\n          status\n        }\n        expenseDate\n        fuelQuantity\n        id\n        odometerReading\n        receiptUrl\n        status\n        type\n        updatedAt\n        trip {\n          createdAt\n          endLocation\n          startLocation\n          status\n          startTime\n          endTime\n          vehicle {\n            vin\n            year\n            model\n            make\n            id\n            registrationNumber\n          }\n        }\n      }\n    }\n  }\n": types.TableExpenseDocument,
    "\n  query SearchExpenses($search: String!) {\n    tms {\n      expenses(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: description\n      }\n    }\n  }\n": types.SearchExpensesDocument,
    "\n  mutation CreateGeofenceEvent($geofenceEvent: CreateGeofenceEventInput!) {\n    tms {\n      createGeofenceEvent(value: $geofenceEvent) {\n        id\n      }\n    }\n  }\n": types.CreateGeofenceEventDocument,
    "\n  mutation UpdateGeofenceEvent(\n    $id: ID!\n    $geofenceEvent: UpdateGeofenceEventInput!\n  ) {\n    tms {\n      updateGeofenceEvent(id: $id, value: $geofenceEvent) {\n        id\n      }\n    }\n  }\n": types.UpdateGeofenceEventDocument,
    "\n  mutation RemoveGeofenceEvent($id: ID!) {\n    tms {\n      removeGeofenceEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveGeofenceEventDocument,
    "\n  mutation CreateGeofence($geofence: CreateGeofenceInput!) {\n    tms {\n      createGeofence(value: $geofence) {\n        id\n      }\n    }\n  }\n": types.CreateGeofenceDocument,
    "\n  mutation UpdateGeofence($id: ID!, $geofence: UpdateGeofenceInput!) {\n    tms {\n      updateGeofence(id: $id, value: $geofence) {\n        id\n      }\n    }\n  }\n": types.UpdateGeofenceDocument,
    "\n  mutation RemoveGeofence($id: ID!) {\n    tms {\n      removeGeofence(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveGeofenceDocument,
    "\n  query TableGeofence($page: Int, $perPage: Int, $search: String) {\n    tms {\n      geofences(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        id\n        latitude\n        longitude\n        name\n        updatedAt\n        events {\n          eventType\n          id\n          timestamp\n          vehicle {\n            model\n            vin\n            year\n            registrationNumber\n            make\n            id\n          }\n        }\n      }\n    }\n  }\n": types.TableGeofenceDocument,
    "\n  query SearchGeofences($search: String!) {\n    tms {\n      geofences(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: name\n      }\n    }\n  }\n": types.SearchGeofencesDocument,
    "\n  mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {\n    tms {\n      createGpsPing(value: $gpsPing) {\n        id\n      }\n    }\n  }\n": types.CreateGpsPingDocument,
    "\n  mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {\n    tms {\n      updateGpsPing(id: $id, value: $gpsPing) {\n        id\n      }\n    }\n  }\n": types.UpdateGpsPingDocument,
    "\n  mutation RemoveGpsPing($id: ID!) {\n    tms {\n      removeGpsPing(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveGpsPingDocument,
    "\n  query TableGpsPing($page: Int, $perPage: Int) {\n    tms {\n      gpsPings(page: $page, perPage: $perPage) {\n        id\n        latitude\n        longitude\n        timestamp\n        vehicle {\n          year\n          vin\n          registrationNumber\n          model\n          make\n          status\n          id\n        }\n      }\n    }\n  }\n": types.TableGpsPingDocument,
    "\n  mutation CreatePartnerInvoiceItem(\n    $partnerInvoiceItem: CreatePartnerInvoiceItemInput!\n  ) {\n    tms {\n      createPartnerInvoiceItem(value: $partnerInvoiceItem) {\n        id\n      }\n    }\n  }\n": types.CreatePartnerInvoiceItemDocument,
    "\n  mutation UpdatePartnerInvoiceItem(\n    $id: ID!\n    $partnerInvoiceItem: UpdatePartnerInvoiceItemInput!\n  ) {\n    tms {\n      updatePartnerInvoiceItem(id: $id, value: $partnerInvoiceItem) {\n        id\n      }\n    }\n  }\n": types.UpdatePartnerInvoiceItemDocument,
    "\n  mutation RemovePartnerInvoiceItem($id: ID!) {\n    tms {\n      removePartnerInvoiceItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePartnerInvoiceItemDocument,
    "\n  mutation CreatePartnerInvoice($partnerInvoice: CreatePartnerInvoiceInput!) {\n    tms {\n      createPartnerInvoice(value: $partnerInvoice) {\n        id\n      }\n    }\n  }\n": types.CreatePartnerInvoiceDocument,
    "\n  mutation UpdatePartnerInvoice(\n    $id: ID!\n    $partnerInvoice: UpdatePartnerInvoiceInput!\n  ) {\n    tms {\n      updatePartnerInvoice(id: $id, value: $partnerInvoice) {\n        id\n      }\n    }\n  }\n": types.UpdatePartnerInvoiceDocument,
    "\n  mutation RemovePartnerInvoice($id: ID!) {\n    tms {\n      removePartnerInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePartnerInvoiceDocument,
    "\n  query TablePartnerInvoice(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: PartnerInvoiceStatus\n  ) {\n    tms {\n      partnerInvoices(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        invoiceDate\n        invoiceNumber\n        status\n        totalAmount\n        updatedAt\n        items {\n          amount\n          id\n          shipmentLeg {\n            startLocation\n            endLocation\n            shipment {\n              trackingNumber\n              carrier\n            }\n          }\n        }\n      }\n    }\n  }\n": types.TablePartnerInvoiceDocument,
    "\n  query SearchPartnerInvoices($search: String!) {\n    tms {\n      partnerInvoices(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: invoiceNumber\n      }\n    }\n  }\n": types.SearchPartnerInvoicesDocument,
    "\n  mutation CreateProofOfDelivery(\n    $proofOfDelivery: CreateProofOfDeliveryInput!\n  ) {\n    tms {\n      createProofOfDelivery(value: $proofOfDelivery) {\n        id\n      }\n    }\n  }\n": types.CreateProofOfDeliveryDocument,
    "\n  mutation UpdateProofOfDelivery(\n    $id: ID!\n    $proofOfDelivery: UpdateProofOfDeliveryInput!\n  ) {\n    tms {\n      updateProofOfDelivery(id: $id, value: $proofOfDelivery) {\n        id\n      }\n    }\n  }\n": types.UpdateProofOfDeliveryDocument,
    "\n  mutation RemoveProofOfDelivery($id: ID!) {\n    tms {\n      removeProofOfDelivery(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveProofOfDeliveryDocument,
    "\n  query TableTmsProofOfDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProofType\n  ) {\n    tms {\n      proofOfDeliveries(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        createdAt\n        filePath\n        id\n        latitude\n        longitude\n        timestamp\n        type\n        updatedAt\n        tripStop {\n          actualArrivalTime\n          actualDepartureTime\n          address\n          status\n          id\n          shipment {\n            trackingNumber\n            status\n            carrier\n            id\n          }\n          trip {\n            endLocation\n            startLocation\n            status\n            vehicle {\n              registrationNumber\n              vin\n              year\n              make\n              model\n              gpsPings {\n                latitude\n                longitude\n                timestamp\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.TableTmsProofOfDeliveryDocument,
    "\n  query SearchProofOfDeliveries($search: String!) {\n    tms {\n      proofOfDeliveries(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: filePath\n      }\n    }\n  }\n": types.SearchProofOfDeliveriesDocument,
    "\n  mutation CreateRoute($route: CreateRouteInput!) {\n    tms {\n      createRoute(value: $route) {\n        id\n      }\n    }\n  }\n": types.CreateRouteDocument,
    "\n  mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {\n    tms {\n      updateRoute(id: $id, value: $route) {\n        id\n      }\n    }\n  }\n": types.UpdateRouteDocument,
    "\n  mutation RemoveRoute($id: ID!) {\n    tms {\n      removeRoute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveRouteDocument,
    "\n  query TableRoute($page: Int, $perPage: Int, $search: String) {\n    tms {\n      routes(page: $page, perPage: $perPage, search: $search) {\n        optimizedRouteData\n        totalDistance\n        totalDuration\n        id\n        trip {\n          startLocation\n          endTime\n          endLocation\n          createdAt\n          startTime\n          status\n          updatedAt\n          driver {\n            user {\n              email\n              id\n              image\n              name\n            }\n            licenseNumber\n            contactPhone\n            id\n          }\n        }\n      }\n    }\n  }\n": types.TableRouteDocument,
    "\n  mutation CreateShipmentLegEvent(\n    $shipmentLegEvent: CreateShipmentLegEventInput!\n  ) {\n    tms {\n      createShipmentLegEvent(value: $shipmentLegEvent) {\n        id\n      }\n    }\n  }\n": types.CreateShipmentLegEventDocument,
    "\n  mutation UpdateShipmentLegEvent(\n    $id: ID!\n    $shipmentLegEvent: UpdateShipmentLegEventInput!\n  ) {\n    tms {\n      updateShipmentLegEvent(id: $id, value: $shipmentLegEvent) {\n        id\n      }\n    }\n  }\n": types.UpdateShipmentLegEventDocument,
    "\n  mutation RemoveShipmentLegEvent($id: ID!) {\n    tms {\n      removeShipmentLegEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveShipmentLegEventDocument,
    "\n  mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {\n    tms {\n      createShipmentLeg(value: $shipmentLeg) {\n        id\n      }\n    }\n  }\n": types.CreateShipmentLegDocument,
    "\n  mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {\n    tms {\n      updateShipmentLeg(id: $id, value: $shipmentLeg) {\n        id\n      }\n    }\n  }\n": types.UpdateShipmentLegDocument,
    "\n  mutation RemoveShipmentLeg($id: ID!) {\n    tms {\n      removeShipmentLeg(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveShipmentLegDocument,
    "\n  query TableShipmentLegQuery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ShipmentLegStatus\n  ) {\n    tms {\n      shipmentLegs(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        endLocation\n        id\n        legSequence\n        startLocation\n        status\n        updatedAt\n        shipment {\n          trackingNumber\n          carrier\n          status\n        }\n        partnerInvoiceItems {\n          amount\n          id\n        }\n        events {\n          location\n          statusMessage\n          eventTimestamp\n          id\n        }\n      }\n    }\n  }\n": types.TableShipmentLegQueryDocument,
    "\n  query SearchShipmentLegs($search: String!) {\n    tms {\n      shipmentLegs(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: startLocation\n      }\n    }\n  }\n": types.SearchShipmentLegsDocument,
    "\n  mutation CreateTripStop($tripStop: CreateTripStopInput!) {\n    tms {\n      createTripStop(value: $tripStop) {\n        id\n      }\n    }\n  }\n": types.CreateTripStopDocument,
    "\n  mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {\n    tms {\n      updateTripStop(id: $id, value: $tripStop) {\n        id\n      }\n    }\n  }\n": types.UpdateTripStopDocument,
    "\n  mutation RemoveTripStop($id: ID!) {\n    tms {\n      removeTripStop(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveTripStopDocument,
    "\n  mutation CreateTrip($trip: CreateTripInput!) {\n    tms {\n      createTrip(value: $trip) {\n        id\n      }\n    }\n  }\n": types.CreateTripDocument,
    "\n  mutation UpdateTrip($id: ID!, $trip: UpdateTripInput!) {\n    tms {\n      updateTrip(id: $id, value: $trip) {\n        id\n      }\n    }\n  }\n": types.UpdateTripDocument,
    "\n  mutation RemoveTrip($id: ID!) {\n    tms {\n      removeTrip(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveTripDocument,
    "\n  query TableTrip(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TripStatus\n  ) {\n    tms {\n      trips(page: $page, perPage: $perPage, search: $search, status: $status) {\n        createdAt\n        endLocation\n        endTime\n        id\n        startLocation\n        startTime\n        status\n        updatedAt\n        driver {\n          user {\n            email\n            id\n            image\n            name\n          }\n          licenseNumber\n          contactPhone\n          status\n        }\n        vehicle {\n          vin\n          year\n          registrationNumber\n          model\n          make\n          status\n        }\n      }\n    }\n  }\n": types.TableTripDocument,
    "\n  query SearchTrips($search: String!) {\n    tms {\n      trips(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: startLocation\n      }\n    }\n  }\n": types.SearchTripsDocument,
    "\n  mutation CreateVehicleMaintenance(\n    $vehicleMaintenance: CreateVehicleMaintenanceInput!\n  ) {\n    tms {\n      createVehicleMaintenance(value: $vehicleMaintenance) {\n        id\n      }\n    }\n  }\n": types.CreateVehicleMaintenanceDocument,
    "\n  mutation UpdateVehicleMaintenance(\n    $id: ID!\n    $vehicleMaintenance: UpdateVehicleMaintenanceInput!\n  ) {\n    tms {\n      updateVehicleMaintenance(id: $id, value: $vehicleMaintenance) {\n        id\n      }\n    }\n  }\n": types.UpdateVehicleMaintenanceDocument,
    "\n  mutation RemoveVehicleMaintenance($id: ID!) {\n    tms {\n      removeVehicleMaintenance(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveVehicleMaintenanceDocument,
    "\n  mutation CreateVehicle($vehicle: CreateVehicleInput!) {\n    tms {\n      createVehicle(value: $vehicle) {\n        id\n      }\n    }\n  }\n": types.CreateVehicleDocument,
    "\n  mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {\n    tms {\n      updateVehicle(id: $id, value: $vehicle) {\n        id\n      }\n    }\n  }\n": types.UpdateVehicleDocument,
    "\n  mutation RemoveVehicle($id: ID!) {\n    tms {\n      removeVehicle(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveVehicleDocument,
    "\n  query TableVehicle(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: VehicleStatus\n  ) {\n    tms {\n      vehicles(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        capacityVolume\n        capacityWeight\n        createdAt\n        currentMileage\n        id\n        lastMaintenanceDate\n        make\n        model\n        registrationNumber\n        status\n        updatedAt\n        vin\n        year\n        maintenances {\n          cost\n          createdAt\n          id\n          notes\n          serviceDate\n          serviceType\n          updatedAt\n        }\n      }\n    }\n  }\n": types.TableVehicleDocument,
    "\n  query SearchVehicles($search: String!) {\n    tms {\n      vehicles(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: registrationNumber\n      }\n    }\n  }\n": types.SearchVehiclesDocument,
    "\n  mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {\n    wms {\n      createBinThreshold(value: $binThreshold) {\n        id\n      }\n    }\n  }\n": types.CreateBinThresholdDocument,
    "\n  mutation UpdateBinThreshold(\n    $id: ID!\n    $binThreshold: UpdateBinThresholdInput!\n  ) {\n    wms {\n      updateBinThreshold(id: $id, value: $binThreshold) {\n        id\n      }\n    }\n  }\n": types.UpdateBinThresholdDocument,
    "\n  mutation RemoveBinThreshold($id: ID!) {\n    wms {\n      removeBinThreshold(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveBinThresholdDocument,
    "\n  query TableBinThreshold($page: Int, $perPage: Int) {\n    wms {\n      binThresholds(page: $page, perPage: $perPage) {\n        alertThreshold\n        createdAt\n        id\n        isActive\n        maxQuantity\n        minQuantity\n        reorderQuantity\n        updatedAt\n        product {\n          name\n          description\n          id\n          sku\n          status\n          barcode\n        }\n      }\n    }\n  }\n": types.TableBinThresholdDocument,
    "\n  mutation CreateInboundShipmentItem(\n    $inboundShipmentItem: CreateInboundShipmentItemInput!\n  ) {\n    wms {\n      createInboundShipmentItem(value: $inboundShipmentItem) {\n        id\n      }\n    }\n  }\n": types.CreateInboundShipmentItemDocument,
    "\n  mutation UpdateInboundShipmentItem(\n    $id: ID!\n    $inboundShipmentItem: UpdateInboundShipmentItemInput!\n  ) {\n    wms {\n      updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {\n        id\n      }\n    }\n  }\n": types.UpdateInboundShipmentItemDocument,
    "\n  mutation RemoveInboundShipmentItem($id: ID!) {\n    wms {\n      removeInboundShipmentItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInboundShipmentItemDocument,
    "\n  mutation CreateInboundShipment(\n    $inboundShipment: CreateInboundShipmentInput!\n  ) {\n    wms {\n      createInboundShipment(value: $inboundShipment) {\n        id\n      }\n    }\n  }\n": types.CreateInboundShipmentDocument,
    "\n  mutation UpdateInboundShipment(\n    $id: ID!\n    $inboundShipment: UpdateInboundShipmentInput!\n  ) {\n    wms {\n      updateInboundShipment(id: $id, value: $inboundShipment) {\n        id\n      }\n    }\n  }\n": types.UpdateInboundShipmentDocument,
    "\n  mutation RemoveInboundShipment($id: ID!) {\n    wms {\n      removeInboundShipment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInboundShipmentDocument,
    "\n  query TableInboundShipment(\n    $page: Int\n    $perPage: Int\n    $status: InboundShipmentStatus\n  ) {\n    wms {\n      inboundShipments(page: $page, perPage: $perPage, status: $status) {\n        actualArrivalDate\n        createdAt\n        expectedArrivalDate\n        id\n        status\n        updatedAt\n        client {\n          name\n          industry\n          phoneNumber\n          country\n          website\n        }\n      }\n    }\n  }\n": types.TableInboundShipmentDocument,
    "\n  mutation CreateInventoryAdjustment(\n    $inventoryAdjustment: CreateInventoryAdjustmentInput!\n  ) {\n    wms {\n      createInventoryAdjustment(value: $inventoryAdjustment) {\n        id\n      }\n    }\n  }\n": types.CreateInventoryAdjustmentDocument,
    "\n  mutation UpdateInventoryAdjustment(\n    $id: ID!\n    $inventoryAdjustment: UpdateInventoryAdjustmentInput!\n  ) {\n    wms {\n      updateInventoryAdjustment(id: $id, value: $inventoryAdjustment) {\n        id\n      }\n    }\n  }\n": types.UpdateInventoryAdjustmentDocument,
    "\n  mutation RemoveInventoryAdjustment($id: ID!) {\n    wms {\n      removeInventoryAdjustment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInventoryAdjustmentDocument,
    "\n  query TableInventoryAdjustment(\n    $page: Int\n    $perPage: Int\n    $reason: InventoryAdjustmentReason\n    $search: String\n  ) {\n    wms {\n      inventoryAdjustments(\n        page: $page\n        perPage: $perPage\n        reason: $reason\n        search: $search\n      ) {\n        createdAt\n        id\n        notes\n        quantityChange\n        reason\n        updatedAt\n        warehouseId\n        user {\n          email\n          id\n          image\n          name\n        }\n        product {\n          barcode\n          description\n          id\n          name\n          sku\n          status\n        }\n      }\n    }\n  }\n": types.TableInventoryAdjustmentDocument,
    "\n  query SearchInventoryAdjustments($search: String!) {\n    wms {\n      inventoryAdjustments(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: notes\n      }\n    }\n  }\n": types.SearchInventoryAdjustmentsDocument,
    "\n  mutation CreateInventoryBatch($inventoryBatch: CreateInventoryBatchInput!) {\n    wms {\n      createInventoryBatch(value: $inventoryBatch) {\n        id\n      }\n    }\n  }\n": types.CreateInventoryBatchDocument,
    "\n  mutation UpdateInventoryBatch(\n    $id: ID!\n    $inventoryBatch: UpdateInventoryBatchInput!\n  ) {\n    wms {\n      updateInventoryBatch(id: $id, value: $inventoryBatch) {\n        id\n      }\n    }\n  }\n": types.UpdateInventoryBatchDocument,
    "\n  mutation RemoveInventoryBatch($id: ID!) {\n    wms {\n      removeInventoryBatch(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInventoryBatchDocument,
    "\n  query TableInventoryBatch($page: Int, $perPage: Int, $search: String) {\n    wms {\n      inventoryBatches(page: $page, perPage: $perPage, search: $search) {\n        batchNumber\n        createdAt\n        expirationDate\n        id\n        updatedAt\n        inventoryStock {\n          availableQuantity\n          product {\n            barcode\n            name\n            sku\n            status\n            description\n            id\n            costPrice\n          }\n          quantity\n          reservedQuantity\n          status\n        }\n      }\n    }\n  }\n": types.TableInventoryBatchDocument,
    "\n  mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {\n    wms {\n      createInventoryStock(value: $inventoryStock) {\n        id\n      }\n    }\n  }\n": types.CreateInventoryStockDocument,
    "\n  mutation UpdateInventoryStock(\n    $id: ID!\n    $inventoryStock: UpdateInventoryStockInput!\n  ) {\n    wms {\n      updateInventoryStock(id: $id, value: $inventoryStock) {\n        id\n      }\n    }\n  }\n": types.UpdateInventoryStockDocument,
    "\n  mutation RemoveInventoryStock($id: ID!) {\n    wms {\n      removeInventoryStock(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveInventoryStockDocument,
    "\n  query TableInventoryStock(\n    $page: Int\n    $perPage: Int\n    $status: InventoryStockStatus\n  ) {\n    wms {\n      inventoryStocks(page: $page, perPage: $perPage, status: $status) {\n        availableQuantity\n        createdAt\n        id\n        lastCountedAt\n        lastMovementAt\n        quantity\n        reservedQuantity\n        status\n        updatedAt\n        product {\n          barcode\n          costPrice\n          description\n          id\n          name\n          status\n          sku\n          volume\n          weight\n          width\n        }\n        location {\n          id\n          barcode\n          isActive\n          isPickable\n          isReceivable\n          level\n          name\n        }\n      }\n    }\n  }\n": types.TableInventoryStockDocument,
    "\n  mutation CreateLocation($location: CreateLocationInput!) {\n    wms {\n      createLocation(value: $location) {\n        id\n      }\n    }\n  }\n": types.CreateLocationDocument,
    "\n  mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {\n    wms {\n      updateLocation(id: $id, value: $location) {\n        id\n      }\n    }\n  }\n": types.UpdateLocationDocument,
    "\n  mutation RemoveLocation($id: ID!) {\n    wms {\n      removeLocation(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveLocationDocument,
    "\n  query TableLocation(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: LocationType\n  ) {\n    wms {\n      locations(page: $page, perPage: $perPage, search: $search, type: $type) {\n        barcode\n        createdAt\n        isActive\n        isPickable\n        isReceivable\n        id\n        hazmatApproved\n        level\n        maxPallets\n        maxVolume\n        maxWeight\n        name\n        path\n        temperatureControlled\n        type\n        updatedAt\n        xCoordinate\n        yCoordinate\n        zCoordinate\n        parentLocation {\n          id\n          name\n          path\n        }\n        warehouse {\n          address\n          city\n          name\n          id\n          isActive\n        }\n      }\n    }\n  }\n": types.TableLocationDocument,
    "\n  mutation CreateOutboundShipmentItem(\n    $outboundShipmentItem: CreateOutboundShipmentItemInput!\n  ) {\n    wms {\n      createOutboundShipmentItem(value: $outboundShipmentItem) {\n        id\n      }\n    }\n  }\n": types.CreateOutboundShipmentItemDocument,
    "\n  mutation UpdateOutboundShipmentItem(\n    $id: ID!\n    $outboundShipmentItem: UpdateOutboundShipmentItemInput!\n  ) {\n    wms {\n      updateOutboundShipmentItem(id: $id, value: $outboundShipmentItem) {\n        id\n      }\n    }\n  }\n": types.UpdateOutboundShipmentItemDocument,
    "\n  mutation RemoveOutboundShipmentItem($id: ID!) {\n    wms {\n      removeOutboundShipmentItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveOutboundShipmentItemDocument,
    "\n  mutation CreateOutboundShipment(\n    $outboundShipment: CreateOutboundShipmentInput!\n  ) {\n    wms {\n      createOutboundShipment(value: $outboundShipment) {\n        id\n      }\n    }\n  }\n": types.CreateOutboundShipmentDocument,
    "\n  mutation UpdateOutboundShipment(\n    $id: ID!\n    $outboundShipment: UpdateOutboundShipmentInput!\n  ) {\n    wms {\n      updateOutboundShipment(id: $id, value: $outboundShipment) {\n        id\n      }\n    }\n  }\n": types.UpdateOutboundShipmentDocument,
    "\n  mutation RemoveOutboundShipment($id: ID!) {\n    wms {\n      removeOutboundShipment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveOutboundShipmentDocument,
    "\n  query TableOutboundShipment(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: OutboundShipmentStatus\n  ) {\n    wms {\n      outboundShipments(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        carrier\n        createdAt\n        id\n        status\n        trackingNumber\n        updatedAt\n        warehouseId\n        salesOrder {\n          id\n          orderNumber\n          shippingAddress\n          status\n        }\n      }\n    }\n  }\n": types.TableOutboundShipmentDocument,
    "\n  mutation CreatePackageItem($packageItem: CreatePackageItemInput!) {\n    wms {\n      createPackageItem(value: $packageItem) {\n        id\n      }\n    }\n  }\n": types.CreatePackageItemDocument,
    "\n  mutation UpdatePackageItem($id: ID!, $packageItem: UpdatePackageItemInput!) {\n    wms {\n      updatePackageItem(id: $id, value: $packageItem) {\n        id\n      }\n    }\n  }\n": types.UpdatePackageItemDocument,
    "\n  mutation RemovePackageItem($id: ID!) {\n    wms {\n      removePackageItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePackageItemDocument,
    "\n  mutation CreatePackage($package: CreatePackageInput!) {\n    wms {\n      createPackage(value: $package) {\n        id\n      }\n    }\n  }\n": types.CreatePackageDocument,
    "\n  mutation UpdatePackage($id: ID!, $package: UpdatePackageInput!) {\n    wms {\n      updatePackage(id: $id, value: $package) {\n        id\n      }\n    }\n  }\n": types.UpdatePackageDocument,
    "\n  mutation RemovePackage($id: ID!) {\n    wms {\n      removePackage(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePackageDocument,
    "\n  query TablePackage($page: Int, $perPage: Int, $search: String) {\n    wms {\n      packages(page: $page, perPage: $perPage, search: $search) {\n        carrier\n        createdAt\n        height\n        id\n        insuranceValue\n        isFragile\n        isHazmat\n        length\n        packageNumber\n        packageType\n        packedAt\n        requiresSignature\n        serviceLevel\n        shippedAt\n        trackingNumber\n        updatedAt\n        volume\n        weight\n        width\n        items {\n          lotNumber\n          quantity\n          product {\n            barcode\n            costPrice\n            name\n            sku\n            status\n          }\n          serialNumbers\n          totalWeight\n          unitWeight\n        }\n      }\n    }\n  }\n": types.TablePackageDocument,
    "\n  mutation CreatePickBatchItem($pickBatchItem: CreatePickBatchItemInput!) {\n    wms {\n      createPickBatchItem(value: $pickBatchItem) {\n        id\n      }\n    }\n  }\n": types.CreatePickBatchItemDocument,
    "\n  mutation UpdatePickBatchItem(\n    $id: ID!\n    $pickBatchItem: UpdatePickBatchItemInput!\n  ) {\n    wms {\n      updatePickBatchItem(id: $id, value: $pickBatchItem) {\n        id\n      }\n    }\n  }\n": types.UpdatePickBatchItemDocument,
    "\n  mutation RemovePickBatchItem($id: ID!) {\n    wms {\n      removePickBatchItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePickBatchItemDocument,
    "\n  mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {\n    wms {\n      createPickBatch(value: $pickBatch) {\n        id\n      }\n    }\n  }\n": types.CreatePickBatchDocument,
    "\n  mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {\n    wms {\n      updatePickBatch(id: $id, value: $pickBatch) {\n        id\n      }\n    }\n  }\n": types.UpdatePickBatchDocument,
    "\n  mutation RemovePickBatch($id: ID!) {\n    wms {\n      removePickBatch(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePickBatchDocument,
    "\n  query TablePickBatch(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: PickBatchStatus\n    $strategy: PickStrategy\n  ) {\n    wms {\n      pickBatches(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        strategy: $strategy\n      ) {\n        actualDuration\n        batchNumber\n        completedAt\n        completedItems\n        createdAt\n        estimatedDuration\n        id\n        priority\n        startedAt\n        status\n        strategy\n        totalItems\n        updatedAt\n        waveId\n        zoneRestrictions\n        items {\n          id\n          estimatedPickTime\n          actualPickTime\n          orderPriority\n          salesOrder {\n            status\n            shippingAddress\n            orderNumber\n          }\n        }\n      }\n    }\n  }\n": types.TablePickBatchDocument,
    "\n  mutation CreateWmsProduct($wmsProduct: CreateWmsProductInput!) {\n    wms {\n      createWmsProduct(value: $wmsProduct) {\n        id\n      }\n    }\n  }\n": types.CreateWmsProductDocument,
    "\n  mutation UpdateWmsProduct($id: ID!, $wmsProduct: UpdateWmsProductInput!) {\n    wms {\n      updateWmsProduct(id: $id, value: $wmsProduct) {\n        id\n      }\n    }\n  }\n": types.UpdateWmsProductDocument,
    "\n  mutation RemoveWmsProduct($id: ID!) {\n    wms {\n      removeWmsProduct(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveWmsProductDocument,
    "\n  query TableWmsProduct(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ProductStatus\n  ) {\n    wms {\n      wmsProducts(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        barcode\n        costPrice\n        createdAt\n        height\n        description\n        id\n        length\n        name\n        sku\n        status\n        updatedAt\n        volume\n        weight\n        width\n        supplier {\n          contactPerson\n          email\n          name\n          phoneNumber\n        }\n      }\n    }\n  }\n": types.TableWmsProductDocument,
    "\n  mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {\n    wms {\n      createPutawayRule(value: $putawayRule) {\n        id\n      }\n    }\n  }\n": types.CreatePutawayRuleDocument,
    "\n  mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {\n    wms {\n      updatePutawayRule(id: $id, value: $putawayRule) {\n        id\n      }\n    }\n  }\n": types.UpdatePutawayRuleDocument,
    "\n  mutation RemovePutawayRule($id: ID!) {\n    wms {\n      removePutawayRule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemovePutawayRuleDocument,
    "\n  query TablePutawayRule(\n    $page: Int\n    $perPage: Int\n    $locationType: LocationType\n  ) {\n    wms {\n      putawayRules(\n        locationType: $locationType\n        page: $page\n        perPage: $perPage\n      ) {\n        createdAt\n        isActive\n        id\n        locationType\n        maxQuantity\n        minQuantity\n        priority\n        requiresHazmatApproval\n        requiresTemperatureControl\n        updatedAt\n        volumeThreshold\n        weightThreshold\n        client {\n          name\n          industry\n          country\n          city\n          website\n          phoneNumber\n        }\n        product {\n          barcode\n          id\n          costPrice\n          description\n          name\n          sku\n          status\n        }\n        warehouse {\n          address\n          city\n          country\n          name\n          isActive\n        }\n      }\n    }\n  }\n": types.TablePutawayRuleDocument,
    "\n  mutation CreateReorderPoint($reorderPoint: CreateReorderPointInput!) {\n    wms {\n      createReorderPoint(value: $reorderPoint) {\n        id\n      }\n    }\n  }\n": types.CreateReorderPointDocument,
    "\n  mutation UpdateReorderPoint(\n    $id: ID!\n    $reorderPoint: UpdateReorderPointInput!\n  ) {\n    wms {\n      updateReorderPoint(id: $id, value: $reorderPoint) {\n        id\n      }\n    }\n  }\n": types.UpdateReorderPointDocument,
    "\n  mutation RemoveReorderPoint($id: ID!) {\n    wms {\n      removeReorderPoint(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveReorderPointDocument,
    "\n  query TableReorderPoint($page: Int, $perPage: Int) {\n    wms {\n      reorderPoints(page: $page, perPage: $perPage) {\n        createdAt\n        id\n        threshold\n        updatedAt\n        product {\n          barcode\n          description\n          costPrice\n          id\n          name\n          sku\n          status\n        }\n        warehouse {\n          address\n          city\n          country\n          id\n          name\n        }\n      }\n    }\n  }\n": types.TableReorderPointDocument,
    "\n  mutation CreateReturnItem($returnItem: CreateReturnItemInput!) {\n    wms {\n      createReturnItem(value: $returnItem) {\n        id\n      }\n    }\n  }\n": types.CreateReturnItemDocument,
    "\n  mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {\n    wms {\n      updateReturnItem(id: $id, value: $returnItem) {\n        id\n      }\n    }\n  }\n": types.UpdateReturnItemDocument,
    "\n  mutation RemoveReturnItem($id: ID!) {\n    wms {\n      removeReturnItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveReturnItemDocument,
    "\n  mutation CreateReturn($return: CreateReturnInput!) {\n    wms {\n      createReturn(value: $return) {\n        id\n      }\n    }\n  }\n": types.CreateReturnDocument,
    "\n  mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {\n    wms {\n      updateReturn(id: $id, value: $return) {\n        id\n      }\n    }\n  }\n": types.UpdateReturnDocument,
    "\n  mutation RemoveReturn($id: ID!) {\n    wms {\n      removeReturn(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveReturnDocument,
    "\n  query TableReturnQuery(\n    $page: Int\n    $perPage: Int\n    $status: ReturnStatus\n    $search: String\n  ) {\n    wms {\n      returns(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        reason\n        returnNumber\n        status\n        updatedAt\n        client {\n          name\n          phoneNumber\n          industry\n          country\n          city\n          website\n        }\n        salesOrder {\n          orderNumber\n          shippingAddress\n          status\n          updatedAt\n          id\n        }\n        items {\n          condition\n          id\n          quantityExpected\n          quantityReceived\n          quantityVariance\n          product {\n            barcode\n            costPrice\n            description\n            id\n            name\n            sku\n            status\n          }\n        }\n      }\n    }\n  }\n": types.TableReturnQueryDocument,
    "\n  mutation CreateSalesOrderItem($salesOrderItem: CreateSalesOrderItemInput!) {\n    wms {\n      createSalesOrderItem(value: $salesOrderItem) {\n        id\n      }\n    }\n  }\n": types.CreateSalesOrderItemDocument,
    "\n  mutation UpdateSalesOrderItem(\n    $id: ID!\n    $salesOrderItem: UpdateSalesOrderItemInput!\n  ) {\n    wms {\n      updateSalesOrderItem(id: $id, value: $salesOrderItem) {\n        id\n      }\n    }\n  }\n": types.UpdateSalesOrderItemDocument,
    "\n  mutation RemoveSalesOrderItem($id: ID!) {\n    wms {\n      removeSalesOrderItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveSalesOrderItemDocument,
    "\n  mutation CreateSalesOrder($salesOrder: CreateSalesOrderInput!) {\n    wms {\n      createSalesOrder(value: $salesOrder) {\n        id\n      }\n    }\n  }\n": types.CreateSalesOrderDocument,
    "\n  mutation UpdateSalesOrder($id: ID!, $salesOrder: UpdateSalesOrderInput!) {\n    wms {\n      updateSalesOrder(id: $id, value: $salesOrder) {\n        id\n      }\n    }\n  }\n": types.UpdateSalesOrderDocument,
    "\n  mutation RemoveSalesOrder($id: ID!) {\n    wms {\n      removeSalesOrder(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveSalesOrderDocument,
    "\n  query TableSalesOrder(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: SalesOrderStatus\n  ) {\n    wms {\n      salesOrders(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        orderNumber\n        shippingAddress\n        status\n        updatedAt\n        items {\n          id\n          quantityOrdered\n          updatedAt\n          product {\n            barcode\n            id\n            description\n            name\n            sku\n            status\n          }\n        }\n      }\n    }\n  }\n": types.TableSalesOrderDocument,
    "\n  mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {\n    wms {\n      createStockTransfer(value: $stockTransfer) {\n        id\n      }\n    }\n  }\n": types.CreateStockTransferDocument,
    "\n  mutation UpdateStockTransfer(\n    $id: ID!\n    $stockTransfer: UpdateStockTransferInput!\n  ) {\n    wms {\n      updateStockTransfer(id: $id, value: $stockTransfer) {\n        id\n      }\n    }\n  }\n": types.UpdateStockTransferDocument,
    "\n  mutation RemoveStockTransfer($id: ID!) {\n    wms {\n      removeStockTransfer(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveStockTransferDocument,
    "\n  query TableStockTransfer(\n    $page: Int\n    $perPage: Int\n    $status: StockTransferStatus\n  ) {\n    wms {\n      stockTransfers(page: $page, perPage: $perPage, status: $status) {\n        createdAt\n        id\n        quantity\n        status\n        updatedAt\n        destinationWarehouse {\n          address\n          city\n          country\n          id\n          name\n          timezone\n          isActive\n        }\n        product {\n          barcode\n          costPrice\n          name\n          height\n          sku\n          status\n        }\n        sourceWarehouse {\n          address\n          country\n          isActive\n          name\n          city\n          id\n          timezone\n        }\n      }\n    }\n  }\n": types.TableStockTransferDocument,
    "\n  mutation CreateSupplier($supplier: CreateSupplierInput!) {\n    wms {\n      createSupplier(value: $supplier) {\n        id\n      }\n    }\n  }\n": types.CreateSupplierDocument,
    "\n  mutation UpdateSupplier($id: ID!, $supplier: UpdateSupplierInput!) {\n    wms {\n      updateSupplier(id: $id, value: $supplier) {\n        id\n      }\n    }\n  }\n": types.UpdateSupplierDocument,
    "\n  mutation RemoveSupplier($id: ID!) {\n    wms {\n      removeSupplier(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveSupplierDocument,
    "\n  query TableSupplier($page: Int, $perPage: Int, $search: String) {\n    wms {\n      suppliers(page: $page, perPage: $perPage, search: $search) {\n        contactPerson\n        createdAt\n        email\n        id\n        name\n        phoneNumber\n        updatedAt\n        products {\n          barcode\n          id\n          costPrice\n          description\n          name\n          sku\n          status\n        }\n      }\n    }\n  }\n": types.TableSupplierDocument,
    "\n  mutation CreateTaskItem($taskItem: CreateTaskItemInput!) {\n    wms {\n      createTaskItem(value: $taskItem) {\n        id\n      }\n    }\n  }\n": types.CreateTaskItemDocument,
    "\n  mutation UpdateTaskItem($id: ID!, $taskItem: UpdateTaskItemInput!) {\n    wms {\n      updateTaskItem(id: $id, value: $taskItem) {\n        id\n      }\n    }\n  }\n": types.UpdateTaskItemDocument,
    "\n  mutation RemoveTaskItem($id: ID!) {\n    wms {\n      removeTaskItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveTaskItemDocument,
    "\n  mutation CreateTask($task: CreateTaskInput!) {\n    wms {\n      createTask(value: $task) {\n        id\n      }\n    }\n  }\n": types.CreateTaskDocument,
    "\n  mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {\n    wms {\n      updateTask(id: $id, value: $task) {\n        id\n      }\n    }\n  }\n": types.UpdateTaskDocument,
    "\n  mutation RemoveTask($id: ID!) {\n    wms {\n      removeTask(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveTaskDocument,
    "\n  query TableTask(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TaskStatus\n    $type: TaskType\n  ) {\n    wms {\n      tasks(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        type: $type\n      ) {\n        actualDuration\n        createdAt\n        durationSeconds\n        endTime\n        estimatedDuration\n        id\n        instructions\n        notes\n        priority\n        sourceEntityId\n        sourceEntityType\n        startTime\n        status\n        taskNumber\n        type\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n        warehouse {\n          address\n          city\n          country\n          id\n          isActive\n          name\n          timezone\n        }\n        items {\n          completedAt\n          createdAt\n          expiryDate\n          id\n          lotNumber\n          notes\n          quantityCompleted\n          quantityRemaining\n          quantityRequired\n          serialNumbers\n          status\n          updatedAt\n          product {\n            barcode\n            costPrice\n            description\n            id\n            name\n            sku\n            status\n          }\n          sourceLocation {\n            barcode\n            hazmatApproved\n            id\n            path\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n": types.TableTaskDocument,
    "\n  mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {\n    wms {\n      createWarehouse(value: $warehouse) {\n        id\n      }\n    }\n  }\n": types.CreateWarehouseDocument,
    "\n  mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {\n    wms {\n      updateWarehouse(id: $id, value: $warehouse) {\n        id\n      }\n    }\n  }\n": types.UpdateWarehouseDocument,
    "\n  mutation RemoveWarehouse($id: ID!) {\n    wms {\n      removeWarehouse(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n": types.RemoveWarehouseDocument,
    "\n  query TableWarehouse($page: Int, $perPage: Int, $search: String) {\n    wms {\n      warehouses(page: $page, perPage: $perPage, search: $search) {\n        address\n        city\n        contactEmail\n        contactPerson\n        contactPhone\n        country\n        createdAt\n        id\n        isActive\n        name\n        postalCode\n        state\n        timezone\n        updatedAt\n        tasks {\n          instructions\n          id\n          notes\n          priority\n          taskNumber\n          type\n          user {\n            email\n            id\n            image\n            name\n          }\n        }\n        locations {\n          barcode\n          id\n          isActive\n          isPickable\n          isReceivable\n          level\n          maxPallets\n          maxVolume\n          maxWeight\n          name\n          path\n          type\n          xCoordinate\n          yCoordinate\n          zCoordinate\n          hazmatApproved\n        }\n        inboundShipments {\n          status\n          updatedAt\n          warehouseId\n          items {\n            discrepancyNotes\n            discrepancyQuantity\n            expectedQuantity\n            id\n            createdAt\n            receivedQuantity\n            updatedAt\n            product {\n              barcode\n              costPrice\n              description\n              id\n              name\n              sku\n              status\n            }\n            inboundShipment {\n              status\n              id\n              expectedArrivalDate\n              updatedAt\n              actualArrivalDate\n              client {\n                city\n                country\n                id\n                industry\n                name\n                phoneNumber\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n": types.TableWarehouseDocument,
};

/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAccountTransaction(\n    $accountTransaction: CreateAccountTransactionInput!\n  ) {\n    billing {\n      createAccountTransaction(value: $accountTransaction) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateAccountTransactionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAccountTransaction(\n    $id: ID!\n    $accountTransaction: UpdateAccountTransactionInput!\n  ) {\n    billing {\n      updateAccountTransaction(id: $id, value: $accountTransaction) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateAccountTransactionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveAccountTransaction($id: ID!) {\n    billing {\n      removeAccountTransaction(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveAccountTransactionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AccountTransactions(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: TransactionType\n  ) {\n    billing {\n      accountTransactions(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        amount\n        createdAt\n        description\n        id\n        referenceNumber\n        runningBalance\n        sourceRecordId\n        sourceRecordType\n        transactionDate\n        type\n        processedByUser {\n          name\n          image\n          email\n          id\n        }\n        updatedAt\n        clientAccount {\n          availableCredit\n          paymentTermsDays\n          updatedAt\n          walletBalance\n          createdAt\n          client {\n            annualRevenue\n            id\n            industry\n            name\n            phoneNumber\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').AccountTransactionsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateAccountingSyncLog(\n    $accountingSyncLog: CreateAccountingSyncLogInput!\n  ) {\n    billing {\n      createAccountingSyncLog(value: $accountingSyncLog) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateAccountingSyncLogDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateAccountingSyncLog(\n    $id: ID!\n    $accountingSyncLog: UpdateAccountingSyncLogInput!\n  ) {\n    billing {\n      updateAccountingSyncLog(id: $id, value: $accountingSyncLog) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateAccountingSyncLogDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveAccountingSyncLog($id: ID!) {\n    billing {\n      removeAccountingSyncLog(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveAccountingSyncLogDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query AccountingSyncLogs(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: SyncStatus\n  ) {\n    billing {\n      accountingSyncLogs(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        errorMessage\n        externalId\n        externalSystem\n        id\n        lastSyncAt\n        nextRetryAt\n        recordId\n        recordType\n        requestPayload\n        responsePayload\n        retryCount\n        status\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').AccountingSyncLogsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateClientAccount($clientAccount: CreateClientAccountInput!) {\n    billing {\n      createClientAccount(value: $clientAccount) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateClientAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateClientAccount(\n    $id: ID!\n    $clientAccount: UpdateClientAccountInput!\n  ) {\n    billing {\n      updateClientAccount(id: $id, value: $clientAccount) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateClientAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveClientAccount($id: ID!) {\n    billing {\n      removeClientAccount(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveClientAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableClientAccount($page: Int, $perPage: Int, $search: String) {\n    billing {\n      clientAccounts(page: $page, perPage: $perPage, search: $search) {\n        availableCredit\n        client {\n          annualRevenue\n          country\n          industry\n          name\n          phoneNumber\n          updatedAt\n          website\n        }\n        creditLimit\n        currency\n        isCreditApproved\n        lastPaymentDate\n        paymentTermsDays\n        updatedAt\n        walletBalance\n        id\n        transactions {\n          amount\n          description\n          id\n          referenceNumber\n          runningBalance\n          sourceRecordId\n          sourceRecordType\n          transactionDate\n          type\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableClientAccountDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCreditNote($creditNote: CreateCreditNoteInput!) {\n    billing {\n      createCreditNote(value: $creditNote) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCreditNoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCreditNote($id: ID!, $creditNote: UpdateCreditNoteInput!) {\n    billing {\n      updateCreditNote(id: $id, value: $creditNote) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCreditNoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCreditNote($id: ID!) {\n    billing {\n      removeCreditNote(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCreditNoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableCreditNote($page: Int, $perPage: Int, $search: String) {\n    billing {\n      creditNotes(page: $page, perPage: $perPage, search: $search) {\n        appliedAt\n        amount\n        createdAt\n        createdByUser {\n          email\n          id\n          image\n          name\n        }\n        creditNoteNumber\n        currency\n        id\n        issueDate\n        notes\n        reason\n        updatedAt\n        invoice {\n          amountPaid\n          invoiceNumber\n          issueDate\n          paidAt\n          notes\n          sentAt\n          status\n          subtotal\n          taxAmount\n          totalAmount\n          updatedAt\n          paymentTerms\n          discountAmount\n          dueDate\n          currency\n        }\n        dispute {\n          disputedAmount\n          id\n          reason\n          resolutionNotes\n          resolvedAt\n          status\n          submittedAt\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableCreditNoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDispute($dispute: CreateDisputeInput!) {\n    billing {\n      createDispute(value: $dispute) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDisputeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDispute($id: ID!, $dispute: UpdateDisputeInput!) {\n    billing {\n      updateDispute(id: $id, value: $dispute) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDisputeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDispute($id: ID!) {\n    billing {\n      removeDispute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDisputeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableDispute(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DisputeStatus\n  ) {\n    billing {\n      disputes(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        client {\n          annualRevenue\n          city\n          id\n          industry\n          name\n          website\n          phoneNumber\n        }\n        disputedAmount\n        id\n        reason\n        resolutionNotes\n        resolvedAt\n        status\n        submittedAt\n        updatedAt\n        resolvedByUser {\n          email\n          id\n          image\n          name\n        }\n        lineItem {\n          discountAmount\n          discountRate\n          description\n          id\n          lineTotal\n          quantity\n          sourceRecordId\n          sourceRecordType\n          taxAmount\n          taxRate\n          totalPrice\n          unitPrice\n          updatedAt\n          invoice {\n            amountPaid\n            currency\n            discountAmount\n            dueDate\n            id\n            invoiceNumber\n            issueDate\n            notes\n            paidAt\n            paymentTerms\n            sentAt\n            status\n            subtotal\n            taxAmount\n            totalAmount\n            updatedAt\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableDisputeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInvoiceLineItem(\n    $invoiceLineItem: CreateInvoiceLineItemInput!\n  ) {\n    billing {\n      createInvoiceLineItem(value: $invoiceLineItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInvoiceLineItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInvoiceLineItem(\n    $id: ID!\n    $invoiceLineItem: UpdateInvoiceLineItemInput!\n  ) {\n    billing {\n      updateInvoiceLineItem(id: $id, value: $invoiceLineItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInvoiceLineItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInvoiceLineItem($id: ID!) {\n    billing {\n      removeInvoiceLineItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInvoiceLineItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBillingInvoice($billingInvoice: CreateBillingInvoiceInput!) {\n    billing {\n      createBillingInvoice(value: $billingInvoice) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateBillingInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBillingInvoice(\n    $id: ID!\n    $billingInvoice: UpdateBillingInvoiceInput!\n  ) {\n    billing {\n      updateBillingInvoice(id: $id, value: $billingInvoice) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateBillingInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveBillingInvoice($id: ID!) {\n    billing {\n      removeBillingInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveBillingInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableBillingInvoice(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: BillingInvoiceStatus\n  ) {\n    billing {\n      billingInvoices(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        amountOutstanding\n        amountPaid\n        createdAt\n        currency\n        discountAmount\n        dueDate\n        id\n        invoiceNumber\n        issueDate\n        notes\n        paidAt\n        paymentTerms\n        sentAt\n        status\n        subtotal\n        taxAmount\n        totalAmount\n        updatedAt\n        lineItems {\n          description\n          discountAmount\n          discountRate\n          id\n          quantity\n          taxAmount\n          lineTotal\n          sourceRecordId\n          sourceRecordType\n          taxRate\n          totalPrice\n          unitPrice\n          updatedAt\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableBillingInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePayment($payment: CreatePaymentInput!) {\n    billing {\n      createPayment(value: $payment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePaymentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePayment($id: ID!, $payment: UpdatePaymentInput!) {\n    billing {\n      updatePayment(id: $id, value: $payment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePaymentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePayment($id: ID!) {\n    billing {\n      removePayment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePaymentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TablePayment(\n    $page: Int\n    $paymentMethod: PaymentMethod\n    $perPage: Int\n    $search: String\n    $status: PaymentStatus\n  ) {\n    billing {\n      payments(\n        page: $page\n        paymentMethod: $paymentMethod\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        amount\n        createdAt\n        currency\n        exchangeRate\n        fees\n        gatewayReference\n        id\n        invoice {\n          invoiceNumber\n          id\n          issueDate\n          paidAt\n          paymentTerms\n          sentAt\n          status\n          discountAmount\n          amountPaid\n          amountOutstanding\n        }\n        processedByUser {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TablePaymentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateQuote($quote: CreateQuoteInput!) {\n    billing {\n      createQuote(value: $quote) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateQuoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateQuote($id: ID!, $quote: UpdateQuoteInput!) {\n    billing {\n      updateQuote(id: $id, value: $quote) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateQuoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveQuote($id: ID!) {\n    billing {\n      removeQuote(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveQuoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableQuote(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: QuoteStatus\n  ) {\n    billing {\n      quotes(page: $page, perPage: $perPage, search: $search, status: $status) {\n        createdAt\n        destinationDetails\n        expiresAt\n        height\n        id\n        length\n        notes\n        originDetails\n        quoteNumber\n        quotedPrice\n        serviceLevel\n        status\n        updatedAt\n        volume\n        weight\n        width\n        createdByUser {\n          email\n          id\n          image\n          name\n        }\n        client {\n          city\n          country\n          id\n          industry\n          name\n          phoneNumber\n          website\n          billingInvoices {\n            amountOutstanding\n            amountPaid\n            currency\n            discountAmount\n            dueDate\n            invoiceNumber\n            issueDate\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableQuoteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRateCard($rateCard: CreateRateCardInput!) {\n    billing {\n      createRateCard(value: $rateCard) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateRateCardDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRateCard($id: ID!, $rateCard: UpdateRateCardInput!) {\n    billing {\n      updateRateCard(id: $id, value: $rateCard) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateRateCardDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRateCard($id: ID!) {\n    billing {\n      removeRateCard(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveRateCardDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableRateCard(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $serviceType: ServiceType\n  ) {\n    billing {\n      rateCards(\n        page: $page\n        perPage: $perPage\n        search: $search\n        serviceType: $serviceType\n      ) {\n        createdAt\n        description\n        id\n        isActive\n        name\n        serviceType\n        updatedAt\n        validFrom\n        validTo\n        createdByUser {\n          email\n          emailVerified\n          image\n          name\n        }\n        rules {\n          condition\n          id\n          isActive\n          maxValue\n          minValue\n          price\n          pricingModel\n          priority\n          value\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableRateCardDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRateRule($rateRule: CreateRateRuleInput!) {\n    billing {\n      createRateRule(value: $rateRule) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateRateRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRateRule($id: ID!, $rateRule: UpdateRateRuleInput!) {\n    billing {\n      updateRateRule(id: $id, value: $rateRule) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateRateRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRateRule($id: ID!) {\n    billing {\n      removeRateRule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveRateRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableRateRule(\n    $page: Int\n    $perPage: Int\n    $pricingModel: PricingModel\n    $search: String\n  ) {\n    billing {\n      rateRules(\n        page: $page\n        perPage: $perPage\n        pricingModel: $pricingModel\n        search: $search\n      ) {\n        condition\n        createdAt\n        id\n        isActive\n        maxValue\n        minValue\n        price\n        pricingModel\n        priority\n        updatedAt\n        value\n        rateCard {\n          createdAt\n          createdByUser {\n            email\n            id\n            image\n            name\n          }\n          description\n          id\n          isActive\n          name\n          serviceType\n          updatedAt\n          validFrom\n          validTo\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableRateRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSurcharge($surcharge: CreateSurchargeInput!) {\n    billing {\n      createSurcharge(value: $surcharge) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateSurchargeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSurcharge($id: ID!, $surcharge: UpdateSurchargeInput!) {\n    billing {\n      updateSurcharge(id: $id, value: $surcharge) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateSurchargeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveSurcharge($id: ID!) {\n    billing {\n      removeSurcharge(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveSurchargeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableSurcharge(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $calculationMethod: SurchargeCalculationMethod\n  ) {\n    billing {\n      surcharges(\n        page: $page\n        perPage: $perPage\n        search: $search\n        calculationMethod: $calculationMethod\n      ) {\n        amount\n        calculationMethod\n        createdAt\n        description\n        id\n        isActive\n        name\n        type\n        updatedAt\n        validFrom\n        validTo\n      }\n    }\n  }\n"): typeof import('./graphql').TableSurchargeDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCampaign($campaign: CreateCampaignInput!) {\n    crm {\n      createCampaign(value: $campaign) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCampaign($id: ID!, $campaign: UpdateCampaignInput!) {\n    crm {\n      updateCampaign(id: $id, value: $campaign) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCampaign($id: ID!) {\n    crm {\n      removeCampaign(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableCampaign($page: Int, $perPage: Int, $search: String) {\n    crm {\n      campaigns(page: $page, perPage: $perPage, search: $search) {\n        budget\n        createdAt\n        endDate\n        id\n        name\n        startDate\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').TableCampaignDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCampaigns($search: String!) {\n    crm {\n      campaigns(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchCampaignsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCase($case: CreateCaseInput!) {\n    crm {\n      createCase(value: $case) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCase($id: ID!, $case: UpdateCaseInput!) {\n    crm {\n      updateCase(id: $id, value: $case) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCase($id: ID!) {\n    crm {\n      removeCase(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableCase(\n    $page: Int\n    $perPage: Int\n    $priority: CasePriority\n    $status: CaseStatus\n    $type: CaseType\n  ) {\n    crm {\n      cases(\n        perPage: $page\n        page: $perPage\n        priority: $priority\n        status: $status\n        type: $type\n      ) {\n        caseNumber\n        createdAt\n        description\n        id\n        priority\n        status\n        type\n        updatedAt\n        contact {\n          id\n          email\n          name\n          phoneNumber\n          jobTitle\n        }\n        owner {\n          id\n          email\n          image\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableCaseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCases($search: String!) {\n    crm {\n      cases(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: caseNumber\n      }\n    }\n  }\n"): typeof import('./graphql').SearchCasesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCompany($company: CreateCompanyInput!) {\n    crm {\n      createCompany(value: $company) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCompanyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCompany($id: ID!, $company: UpdateCompanyInput!) {\n    crm {\n      updateCompany(id: $id, value: $company) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCompanyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCompany($id: ID!) {\n    crm {\n      removeCompany(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCompanyDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableCompanyQuery($page: Int, $perPage: Int, $search: String) {\n    crm {\n      companies(page: $page, perPage: $perPage, search: $search) {\n        name\n        owner {\n          email\n          image\n          name\n        }\n        annualRevenue\n        phoneNumber\n        postalCode\n        state\n        street\n        updatedAt\n        website\n        city\n        clientAccount {\n          walletBalance\n          creditLimit\n          currency\n        }\n        country\n        createdAt\n        id\n        industry\n      }\n    }\n  }\n"): typeof import('./graphql').TableCompanyQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCompanies($search: String!) {\n    crm {\n      companies(page: 1, perPage: 10,search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchCompaniesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateContact($contact: CreateContactInput!) {\n    crm {\n      createContact(value: $contact) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateContact($id: ID!, $contact: UpdateContactInput!) {\n    crm {\n      updateContact(id: $id, value: $contact) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveContact($id: ID!) {\n    crm {\n      removeContact(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableContact($page: Int, $perPage: Int, $search: String) {\n    crm {\n      contacts(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        email\n        id\n        jobTitle\n        name\n        phoneNumber\n        updatedAt\n        owner {\n          id\n          email\n          image\n          name\n        }\n        company {\n          id\n          phoneNumber\n          name\n          industry\n          website\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableContactDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchContacts($search: String!) {\n    crm {\n      contacts(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchContactsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInteraction($interaction: CreateInteractionInput!) {\n    crm {\n      createInteraction(value: $interaction) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInteraction($id: ID!, $interaction: UpdateInteractionInput!) {\n    crm {\n      updateInteraction(id: $id, value: $interaction) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInteraction($id: ID!) {\n    crm {\n      removeInteraction(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableInteraction(\n    $page: Int\n    $perPage: Int\n    $interactionType: InteractionType\n    $search: String\n  ) {\n    crm {\n      interactions(\n        interactionType: $interactionType\n        page: $page\n        perPage: $perPage\n        search: $search\n      ) {\n        createdAt\n        id\n        interactionDate\n        notes\n        outcome\n        type\n        updatedAt\n        user {\n          id\n          email\n          image\n          name\n        }\n        case {\n          id\n          caseNumber\n          priority\n          status\n          type\n        }\n        contact {\n          id\n          name\n          email\n          jobTitle\n          phoneNumber\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableInteractionDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInvoiceItem($invoiceItem: CreateInvoiceItemInput!) {\n    crm {\n      createInvoiceItem(value: $invoiceItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInvoiceItem($id: ID!, $invoiceItem: UpdateInvoiceItemInput!) {\n    crm {\n      updateInvoiceItem(id: $id, value: $invoiceItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInvoiceItem($id: ID!) {\n    crm {\n      removeInvoiceItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInvoice($invoice: CreateInvoiceInput!) {\n    crm {\n      createInvoice(value: $invoice) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInvoice($id: ID!, $invoice: UpdateInvoiceInput!) {\n    crm {\n      updateInvoice(id: $id, value: $invoice) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInvoice($id: ID!) {\n    crm {\n      removeInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableInvoice(\n    $page: Int\n    $perPage: Int\n    $paymentMethod: CrmInvoicePaymentMethod\n    $status: InvoiceStatus\n    $search: String\n  ) {\n    crm {\n      invoices(\n        page: $page\n        paymentMethod: $paymentMethod\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        dueDate\n        id\n        issueDate\n        paidAt\n        paymentMethod\n        sentAt\n        status\n        total\n        updatedAt\n        items {\n          price\n          quantity\n          updatedAt\n          id\n          createdAt\n          product {\n            name\n            price\n            type\n            sku\n            id\n            description\n          }\n        }\n        opportunity {\n          name\n          stage\n          id\n          expectedCloseDate\n          dealValue\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLead($lead: CreateLeadInput!) {\n    crm {\n      createLead(value: $lead) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLead($id: ID!, $lead: UpdateLeadInput!) {\n    crm {\n      updateLead(id: $id, value: $lead) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveLead($id: ID!) {\n    crm {\n      removeLead(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableLead(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: LeadStatus\n    $source: LeadSource\n  ) {\n    crm {\n      leads(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        leadSource: $source\n      ) {\n        convertedAt\n        createdAt\n        email\n        leadScore\n        leadSource\n        name\n        id\n        status\n        updatedAt\n        owner {\n          id\n          email\n          image\n          name\n        }\n        campaign {\n          name\n          endDate\n          startDate\n          budget\n        }\n        convertedCompany {\n          name\n          industry\n          phoneNumber\n          website\n          id\n        }\n        convertedContact {\n          email\n          id\n          jobTitle\n          name\n          phoneNumber\n          updatedAt\n          company {\n            name\n            industry\n            id\n          }\n        }\n        convertedOpportunity {\n          name\n          dealValue\n          source\n          stage\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableLeadDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchLeads($search: String!) {\n    crm {\n      leads(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchLeadsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateNotification($notification: CreateNotificationInput!) {\n    crm {\n      createNotification(value: $notification) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateNotification(\n    $id: ID!\n    $notification: UpdateNotificationInput!\n  ) {\n    crm {\n      updateNotification(id: $id, value: $notification) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveNotification($id: ID!) {\n    crm {\n      removeNotification(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableNotification($page: Int, $perPage: Int, $search: String) {\n    crm {\n      notifications(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        id\n        isRead\n        link\n        message\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableNotificationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchNotifications($search: String!) {\n    crm {\n      notifications(page: 1, perPage: 10,search: $search) {\n        value: id\n        label: message\n      }\n    }\n  }\n"): typeof import('./graphql').SearchNotificationsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOpportunity($opportunity: CreateOpportunityInput!) {\n    crm {\n      createOpportunity(value: $opportunity) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOpportunity($id: ID!, $opportunity: UpdateOpportunityInput!) {\n    crm {\n      updateOpportunity(id: $id, value: $opportunity) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOpportunity($id: ID!) {\n    crm {\n      removeOpportunity(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableOpportunity(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $source: OpportunitySource\n    $stage: OpportunityStage\n  ) {\n    crm {\n      opportunities(\n        page: $page\n        perPage: $perPage\n        search: $search\n        source: $source\n        stage: $stage\n      ) {\n        createdAt\n        dealValue\n        expectedCloseDate\n        id\n        lostReason\n        name\n        probability\n        source\n        stage\n        updatedAt\n        company {\n          name\n          industry\n          id\n          country\n          phoneNumber\n        }\n        contact {\n          email\n          id\n          jobTitle\n          name\n          phoneNumber\n          updatedAt\n          company {\n            name\n            phoneNumber\n            industry\n            country\n          }\n        }\n        owner {\n          email\n          id\n          image\n          name\n        }\n        products {\n          quantity\n          product {\n            id\n            name\n            price\n            sku\n            type\n            description\n          }\n        }\n        campaign {\n          name\n          budget\n          endDate\n          startDate\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableOpportunityDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchOpportunities($search: String!) {\n    crm {\n      opportunities(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchOpportunitiesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOpportunityProduct(\n    $opportunityProduct: CreateOpportunityProductInput!\n  ) {\n    crm {\n      createOpportunityProduct(value: $opportunityProduct) {\n        opportunity {\n          id\n        }\n        product {\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').CreateOpportunityProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOpportunityProduct(\n    $opportunityId: ID!\n    $productId: ID!\n    $opportunityProduct: UpdateOpportunityProductInput!\n  ) {\n    crm {\n      updateOpportunityProduct(\n        opportunityId: $opportunityId\n        productId: $productId\n        value: $opportunityProduct\n      ) {\n        opportunity {\n          id\n        }\n        product {\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateOpportunityProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOpportunityProduct($opportunityId: ID!, $productId: ID!) {\n    crm {\n      removeOpportunityProduct(\n        opportunityId: $opportunityId\n        productId: $productId\n      ) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveOpportunityProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProduct($product: CreateProductInput!) {\n    crm {\n      createProduct(value: $product) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProduct($id: ID!, $product: UpdateProductInput!) {\n    crm {\n      updateProduct(id: $id, value: $product) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveProduct($id: ID!) {\n    crm {\n      removeProduct(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableProduct(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProductType\n  ) {\n    crm {\n      products(page: $page, perPage: $perPage, search: $search, type: $type) {\n        createdAt\n        description\n        id\n        name\n        price\n        sku\n        type\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').TableProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchProducts($search: String!) {\n    crm {\n      products(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchProductsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCustomerTrackingLink(\n    $customerTrackingLink: CreateCustomerTrackingLinkInput!\n  ) {\n    dms {\n      createCustomerTrackingLink(value: $customerTrackingLink) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCustomerTrackingLinkDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCustomerTrackingLink(\n    $id: ID!\n    $customerTrackingLink: UpdateCustomerTrackingLinkInput!\n  ) {\n    dms {\n      updateCustomerTrackingLink(id: $id, value: $customerTrackingLink) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCustomerTrackingLinkDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCustomerTrackingLink($id: ID!) {\n    dms {\n      removeCustomerTrackingLink(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCustomerTrackingLinkDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableCustomerTrackingLink($page: Int, $perPage: Int, $search: String) {\n    dms {\n      customerTrackingLinks(page: $page, perPage: $perPage, search: $search) {\n        accessCount\n        createdAt\n        expiresAt\n        id\n        isActive\n        lastAccessedAt\n        trackingToken\n        updatedAt\n      }\n    }\n  }\n"): typeof import('./graphql').TableCustomerTrackingLinkDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCustomerTrackingLinks($search: String!) {\n    dms {\n      customerTrackingLinks(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: trackingToken\n      }\n    }\n  }\n"): typeof import('./graphql').SearchCustomerTrackingLinksDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDeliveryRoute($deliveryRoute: CreateDeliveryRouteInput!) {\n    dms {\n      createDeliveryRoute(value: $deliveryRoute) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDeliveryRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDeliveryRoute(\n    $id: ID!\n    $deliveryRoute: UpdateDeliveryRouteInput!\n  ) {\n    dms {\n      updateDeliveryRoute(id: $id, value: $deliveryRoute) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDeliveryRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDeliveryRoute($id: ID!) {\n    dms {\n      removeDeliveryRoute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDeliveryRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DeliveryRouteStatus\n  ) {\n    dms {\n      deliveryRoutes(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        actualDurationMinutes\n        completedAt\n        createdAt\n        estimatedDurationMinutes\n        id\n        optimizedRouteData\n        routeDate\n        startedAt\n        status\n        totalDistanceKm\n        updatedAt\n        driver {\n          id\n          user {\n            email\n            id\n            image\n            name\n          }\n          status\n          licenseNumber\n          contactPhone\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDeliveryRoutes($search: String!) {\n    dms {\n      deliveryRoutes(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: routeDate\n      }\n    }\n  }\n"): typeof import('./graphql').SearchDeliveryRoutesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDeliveryTask($deliveryTask: CreateDeliveryTaskInput!) {\n    dms {\n      createDeliveryTask(value: $deliveryTask) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDeliveryTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDeliveryTask(\n    $id: ID!\n    $deliveryTask: UpdateDeliveryTaskInput!\n  ) {\n    dms {\n      updateDeliveryTask(id: $id, value: $deliveryTask) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDeliveryTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDeliveryTask($id: ID!) {\n    dms {\n      removeDeliveryTask(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDeliveryTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableDeliveryTask(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DeliveryTaskStatus\n    $failureReason: DeliveryFailureReason\n  ) {\n    dms {\n      deliveryTasks(\n        failureReason: $failureReason\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        actualArrivalTime\n        attemptCount\n        createdAt\n        deliveryAddress\n        deliveryInstructions\n        deliveryTime\n        estimatedArrivalTime\n        failureReason\n        id\n        recipientName\n        recipientPhone\n        routeSequence\n        status\n        updatedAt\n        deliveryRoute {\n          id\n          totalDistanceKm\n          optimizedRouteData\n          status\n          driver {\n            id\n            user {\n              email\n              id\n              image\n              name\n            }\n            licenseNumber\n            status\n            contactPhone\n          }\n        }\n        package {\n          id\n          carrier\n          packageNumber\n          trackingNumber\n          warehouse {\n            id\n            address\n            country\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableDeliveryTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDeliveryTasks($search: String!) {\n    dms {\n      deliveryTasks(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: recipientName\n      }\n    }\n  }\n"): typeof import('./graphql').SearchDeliveryTasksDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDriverLocation($driverLocation: CreateDriverLocationInput!) {\n    dms {\n      createDriverLocation(value: $driverLocation) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDriverLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDriverLocation(\n    $id: ID!\n    $driverLocation: UpdateDriverLocationInput!\n  ) {\n    dms {\n      updateDriverLocation(id: $id, value: $driverLocation) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDriverLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDriverLocation($id: ID!) {\n    dms {\n      removeDriverLocation(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDriverLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableDriverLocation($page: Int, $perPage: Int) {\n    dms {\n      driverLocations(page: $page, perPage: $perPage) {\n        accuracy\n        altitude\n        createdAt\n        heading\n        id\n        latitude\n        longitude\n        speedKmh\n        timestamp\n        updatedAt\n        driver {\n          id\n          contactPhone\n          licenseExpiryDate\n          licenseNumber\n          user {\n            email\n            id\n            image\n            name\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableDriverLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDmsProofOfDelivery(\n    $dmsProofOfDelivery: CreateDmsProofOfDeliveryInput!\n  ) {\n    dms {\n      createDmsProofOfDelivery(value: $dmsProofOfDelivery) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDmsProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDmsProofOfDelivery(\n    $id: ID!\n    $dmsProofOfDelivery: UpdateDmsProofOfDeliveryInput!\n  ) {\n    dms {\n      updateDmsProofOfDelivery(id: $id, value: $dmsProofOfDelivery) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDmsProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDmsProofOfDelivery($id: ID!) {\n    dms {\n      removeDmsProofOfDelivery(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDmsProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableProofOfDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProofOfDeliveryType\n  ) {\n    dms {\n      dmsProofOfDeliveries(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        createdAt\n        filePath\n        id\n        latitude\n        longitude\n        recipientName\n        signatureData\n        timestamp\n        type\n        updatedAt\n        verificationCode\n        deliveryTask {\n          package {\n            id\n            packageNumber\n            packageType\n            requiresSignature\n            trackingNumber\n            warehouse {\n              id\n              address\n              city\n              country\n            }\n          }\n          actualArrivalTime\n          deliveryInstructions\n          deliveryAddress\n          failureReason\n          recipientName\n          recipientPhone\n          status\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDmsProofOfDeliveries($search: String!) {\n    dms {\n      dmsProofOfDeliveries(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: recipientName\n      }\n    }\n  }\n"): typeof import('./graphql').SearchDmsProofOfDeliveriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTaskEvent($taskEvent: CreateTaskEventInput!) {\n    dms {\n      createTaskEvent(value: $taskEvent) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateTaskEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTaskEvent($id: ID!, $taskEvent: UpdateTaskEventInput!) {\n    dms {\n      updateTaskEvent(id: $id, value: $taskEvent) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateTaskEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTaskEvent($id: ID!) {\n    dms {\n      removeTaskEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveTaskEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableTaskEvent(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TaskEventStatus\n  ) {\n    dms {\n      taskEvents(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        latitude\n        longitude\n        notes\n        reason\n        status\n        timestamp\n        updatedAt\n        deliveryTask {\n          id\n          recipientName\n          recipientPhone\n          deliveryInstructions\n          deliveryAddress\n          status\n          package {\n            id\n            trackingNumber\n            packageNumber\n            packageType\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableTaskEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchTaskEvents($search: String!) {\n    dms {\n      taskEvents(page: 1, perPage: 10, search: $search) {\n        value: id\n        label: reason\n      }\n    }\n  }\n"): typeof import('./graphql').SearchTaskEventsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCarrierRate($carrierRate: CreateCarrierRateInput!) {\n    tms {\n      createCarrierRate(value: $carrierRate) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCarrierRateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCarrierRate($id: ID!, $carrierRate: UpdateCarrierRateInput!) {\n    tms {\n      updateCarrierRate(id: $id, value: $carrierRate) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCarrierRateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCarrierRate($id: ID!) {\n    tms {\n      removeCarrierRate(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCarrierRateDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateCarrier($carrier: CreateCarrierInput!) {\n    tms {\n      createCarrier(value: $carrier) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateCarrierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateCarrier($id: ID!, $carrier: UpdateCarrierInput!) {\n    tms {\n      updateCarrier(id: $id, value: $carrier) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateCarrierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveCarrier($id: ID!) {\n    tms {\n      removeCarrier(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveCarrierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableCarrierQuery($page: Int, $perPage: Int, $search: String) {\n    tms {\n      carriers(page: $page, perPage: $perPage, search: $search) {\n        contactEmail\n        contactPerson\n        contactPhone\n        createdAt\n        id\n        name\n        servicesOffered\n        updatedAt\n        partnerInvoices {\n          invoiceNumber\n          invoiceDate\n          status\n          totalAmount\n          items {\n            amount\n            id\n            shipmentLeg {\n              status\n              shipment {\n                trackingNumber\n                carrier\n                createdAt\n                id\n                status\n                warehouseId\n              }\n            }\n          }\n        }\n        rates {\n          destination\n          id\n          origin\n          rate\n          serviceType\n          unit\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableCarrierQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchCarriers($search: String!) {\n    tms {\n      carriers(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchCarriersDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDriverSchedule($driverSchedule: CreateDriverScheduleInput!) {\n    tms {\n      createDriverSchedule(value: $driverSchedule) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDriverScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDriverSchedule(\n    $id: ID!\n    $driverSchedule: UpdateDriverScheduleInput!\n  ) {\n    tms {\n      updateDriverSchedule(id: $id, value: $driverSchedule) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDriverScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDriverSchedule($id: ID!) {\n    tms {\n      removeDriverSchedule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDriverScheduleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateDriver($driver: CreateDriverInput!) {\n    tms {\n      createDriver(value: $driver) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateDriverDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateDriver($id: ID!, $driver: UpdateDriverInput!) {\n    tms {\n      updateDriver(id: $id, value: $driver) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateDriverDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveDriver($id: ID!) {\n    tms {\n      removeDriver(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveDriverDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableDriver(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: DriverStatus\n  ) {\n    tms {\n      drivers(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        contactPhone\n        createdAt\n        id\n        licenseExpiryDate\n        licenseNumber\n        status\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableDriverDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchDrivers($search: String!) {\n    tms {\n      drivers(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: licenseNumber\n      }\n    }\n  }\n"): typeof import('./graphql').SearchDriversDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateExpense($expense: CreateExpenseInput!) {\n    tms {\n      createExpense(value: $expense) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateExpenseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateExpense($id: ID!, $expense: UpdateExpenseInput!) {\n    tms {\n      updateExpense(id: $id, value: $expense) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateExpenseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveExpense($id: ID!) {\n    tms {\n      removeExpense(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveExpenseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableExpense(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ExpenseStatus\n    $type: ExpenseType\n    $currency: Currency\n  ) {\n    tms {\n      expenses(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        type: $type\n        currency: $currency\n      ) {\n        amount\n        createdAt\n        currency\n        description\n        driver {\n          user {\n            email\n            id\n            image\n            name\n          }\n          licenseNumber\n          contactPhone\n          status\n        }\n        expenseDate\n        fuelQuantity\n        id\n        odometerReading\n        receiptUrl\n        status\n        type\n        updatedAt\n        trip {\n          createdAt\n          endLocation\n          startLocation\n          status\n          startTime\n          endTime\n          vehicle {\n            vin\n            year\n            model\n            make\n            id\n            registrationNumber\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableExpenseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchExpenses($search: String!) {\n    tms {\n      expenses(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: description\n      }\n    }\n  }\n"): typeof import('./graphql').SearchExpensesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGeofenceEvent($geofenceEvent: CreateGeofenceEventInput!) {\n    tms {\n      createGeofenceEvent(value: $geofenceEvent) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateGeofenceEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGeofenceEvent(\n    $id: ID!\n    $geofenceEvent: UpdateGeofenceEventInput!\n  ) {\n    tms {\n      updateGeofenceEvent(id: $id, value: $geofenceEvent) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateGeofenceEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveGeofenceEvent($id: ID!) {\n    tms {\n      removeGeofenceEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveGeofenceEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGeofence($geofence: CreateGeofenceInput!) {\n    tms {\n      createGeofence(value: $geofence) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateGeofenceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGeofence($id: ID!, $geofence: UpdateGeofenceInput!) {\n    tms {\n      updateGeofence(id: $id, value: $geofence) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateGeofenceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveGeofence($id: ID!) {\n    tms {\n      removeGeofence(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveGeofenceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableGeofence($page: Int, $perPage: Int, $search: String) {\n    tms {\n      geofences(page: $page, perPage: $perPage, search: $search) {\n        createdAt\n        id\n        latitude\n        longitude\n        name\n        updatedAt\n        events {\n          eventType\n          id\n          timestamp\n          vehicle {\n            model\n            vin\n            year\n            registrationNumber\n            make\n            id\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableGeofenceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchGeofences($search: String!) {\n    tms {\n      geofences(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: name\n      }\n    }\n  }\n"): typeof import('./graphql').SearchGeofencesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateGpsPing($gpsPing: CreateGpsPingInput!) {\n    tms {\n      createGpsPing(value: $gpsPing) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateGpsPingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateGpsPing($id: ID!, $gpsPing: UpdateGpsPingInput!) {\n    tms {\n      updateGpsPing(id: $id, value: $gpsPing) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateGpsPingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveGpsPing($id: ID!) {\n    tms {\n      removeGpsPing(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveGpsPingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableGpsPing($page: Int, $perPage: Int) {\n    tms {\n      gpsPings(page: $page, perPage: $perPage) {\n        id\n        latitude\n        longitude\n        timestamp\n        vehicle {\n          year\n          vin\n          registrationNumber\n          model\n          make\n          status\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableGpsPingDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePartnerInvoiceItem(\n    $partnerInvoiceItem: CreatePartnerInvoiceItemInput!\n  ) {\n    tms {\n      createPartnerInvoiceItem(value: $partnerInvoiceItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePartnerInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePartnerInvoiceItem(\n    $id: ID!\n    $partnerInvoiceItem: UpdatePartnerInvoiceItemInput!\n  ) {\n    tms {\n      updatePartnerInvoiceItem(id: $id, value: $partnerInvoiceItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePartnerInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePartnerInvoiceItem($id: ID!) {\n    tms {\n      removePartnerInvoiceItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePartnerInvoiceItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePartnerInvoice($partnerInvoice: CreatePartnerInvoiceInput!) {\n    tms {\n      createPartnerInvoice(value: $partnerInvoice) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePartnerInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePartnerInvoice(\n    $id: ID!\n    $partnerInvoice: UpdatePartnerInvoiceInput!\n  ) {\n    tms {\n      updatePartnerInvoice(id: $id, value: $partnerInvoice) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePartnerInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePartnerInvoice($id: ID!) {\n    tms {\n      removePartnerInvoice(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePartnerInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TablePartnerInvoice(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: PartnerInvoiceStatus\n  ) {\n    tms {\n      partnerInvoices(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        invoiceDate\n        invoiceNumber\n        status\n        totalAmount\n        updatedAt\n        items {\n          amount\n          id\n          shipmentLeg {\n            startLocation\n            endLocation\n            shipment {\n              trackingNumber\n              carrier\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TablePartnerInvoiceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchPartnerInvoices($search: String!) {\n    tms {\n      partnerInvoices(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: invoiceNumber\n      }\n    }\n  }\n"): typeof import('./graphql').SearchPartnerInvoicesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateProofOfDelivery(\n    $proofOfDelivery: CreateProofOfDeliveryInput!\n  ) {\n    tms {\n      createProofOfDelivery(value: $proofOfDelivery) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateProofOfDelivery(\n    $id: ID!\n    $proofOfDelivery: UpdateProofOfDeliveryInput!\n  ) {\n    tms {\n      updateProofOfDelivery(id: $id, value: $proofOfDelivery) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveProofOfDelivery($id: ID!) {\n    tms {\n      removeProofOfDelivery(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableTmsProofOfDelivery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: ProofType\n  ) {\n    tms {\n      proofOfDeliveries(\n        page: $page\n        perPage: $perPage\n        search: $search\n        type: $type\n      ) {\n        createdAt\n        filePath\n        id\n        latitude\n        longitude\n        timestamp\n        type\n        updatedAt\n        tripStop {\n          actualArrivalTime\n          actualDepartureTime\n          address\n          status\n          id\n          shipment {\n            trackingNumber\n            status\n            carrier\n            id\n          }\n          trip {\n            endLocation\n            startLocation\n            status\n            vehicle {\n              registrationNumber\n              vin\n              year\n              make\n              model\n              gpsPings {\n                latitude\n                longitude\n                timestamp\n                id\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableTmsProofOfDeliveryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchProofOfDeliveries($search: String!) {\n    tms {\n      proofOfDeliveries(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: filePath\n      }\n    }\n  }\n"): typeof import('./graphql').SearchProofOfDeliveriesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateRoute($route: CreateRouteInput!) {\n    tms {\n      createRoute(value: $route) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateRoute($id: ID!, $route: UpdateRouteInput!) {\n    tms {\n      updateRoute(id: $id, value: $route) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveRoute($id: ID!) {\n    tms {\n      removeRoute(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableRoute($page: Int, $perPage: Int, $search: String) {\n    tms {\n      routes(page: $page, perPage: $perPage, search: $search) {\n        optimizedRouteData\n        totalDistance\n        totalDuration\n        id\n        trip {\n          startLocation\n          endTime\n          endLocation\n          createdAt\n          startTime\n          status\n          updatedAt\n          driver {\n            user {\n              email\n              id\n              image\n              name\n            }\n            licenseNumber\n            contactPhone\n            id\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableRouteDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateShipmentLegEvent(\n    $shipmentLegEvent: CreateShipmentLegEventInput!\n  ) {\n    tms {\n      createShipmentLegEvent(value: $shipmentLegEvent) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateShipmentLegEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateShipmentLegEvent(\n    $id: ID!\n    $shipmentLegEvent: UpdateShipmentLegEventInput!\n  ) {\n    tms {\n      updateShipmentLegEvent(id: $id, value: $shipmentLegEvent) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateShipmentLegEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveShipmentLegEvent($id: ID!) {\n    tms {\n      removeShipmentLegEvent(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveShipmentLegEventDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateShipmentLeg($shipmentLeg: CreateShipmentLegInput!) {\n    tms {\n      createShipmentLeg(value: $shipmentLeg) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateShipmentLegDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateShipmentLeg($id: ID!, $shipmentLeg: UpdateShipmentLegInput!) {\n    tms {\n      updateShipmentLeg(id: $id, value: $shipmentLeg) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateShipmentLegDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveShipmentLeg($id: ID!) {\n    tms {\n      removeShipmentLeg(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveShipmentLegDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableShipmentLegQuery(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ShipmentLegStatus\n  ) {\n    tms {\n      shipmentLegs(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        endLocation\n        id\n        legSequence\n        startLocation\n        status\n        updatedAt\n        shipment {\n          trackingNumber\n          carrier\n          status\n        }\n        partnerInvoiceItems {\n          amount\n          id\n        }\n        events {\n          location\n          statusMessage\n          eventTimestamp\n          id\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableShipmentLegQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchShipmentLegs($search: String!) {\n    tms {\n      shipmentLegs(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: startLocation\n      }\n    }\n  }\n"): typeof import('./graphql').SearchShipmentLegsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTripStop($tripStop: CreateTripStopInput!) {\n    tms {\n      createTripStop(value: $tripStop) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateTripStopDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTripStop($id: ID!, $tripStop: UpdateTripStopInput!) {\n    tms {\n      updateTripStop(id: $id, value: $tripStop) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateTripStopDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTripStop($id: ID!) {\n    tms {\n      removeTripStop(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveTripStopDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTrip($trip: CreateTripInput!) {\n    tms {\n      createTrip(value: $trip) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateTripDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTrip($id: ID!, $trip: UpdateTripInput!) {\n    tms {\n      updateTrip(id: $id, value: $trip) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateTripDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTrip($id: ID!) {\n    tms {\n      removeTrip(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveTripDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableTrip(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TripStatus\n  ) {\n    tms {\n      trips(page: $page, perPage: $perPage, search: $search, status: $status) {\n        createdAt\n        endLocation\n        endTime\n        id\n        startLocation\n        startTime\n        status\n        updatedAt\n        driver {\n          user {\n            email\n            id\n            image\n            name\n          }\n          licenseNumber\n          contactPhone\n          status\n        }\n        vehicle {\n          vin\n          year\n          registrationNumber\n          model\n          make\n          status\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableTripDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchTrips($search: String!) {\n    tms {\n      trips(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: startLocation\n      }\n    }\n  }\n"): typeof import('./graphql').SearchTripsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateVehicleMaintenance(\n    $vehicleMaintenance: CreateVehicleMaintenanceInput!\n  ) {\n    tms {\n      createVehicleMaintenance(value: $vehicleMaintenance) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateVehicleMaintenanceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateVehicleMaintenance(\n    $id: ID!\n    $vehicleMaintenance: UpdateVehicleMaintenanceInput!\n  ) {\n    tms {\n      updateVehicleMaintenance(id: $id, value: $vehicleMaintenance) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateVehicleMaintenanceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveVehicleMaintenance($id: ID!) {\n    tms {\n      removeVehicleMaintenance(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveVehicleMaintenanceDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateVehicle($vehicle: CreateVehicleInput!) {\n    tms {\n      createVehicle(value: $vehicle) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateVehicleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateVehicle($id: ID!, $vehicle: UpdateVehicleInput!) {\n    tms {\n      updateVehicle(id: $id, value: $vehicle) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateVehicleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveVehicle($id: ID!) {\n    tms {\n      removeVehicle(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveVehicleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableVehicle(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: VehicleStatus\n  ) {\n    tms {\n      vehicles(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        capacityVolume\n        capacityWeight\n        createdAt\n        currentMileage\n        id\n        lastMaintenanceDate\n        make\n        model\n        registrationNumber\n        status\n        updatedAt\n        vin\n        year\n        maintenances {\n          cost\n          createdAt\n          id\n          notes\n          serviceDate\n          serviceType\n          updatedAt\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableVehicleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchVehicles($search: String!) {\n    tms {\n      vehicles(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: registrationNumber\n      }\n    }\n  }\n"): typeof import('./graphql').SearchVehiclesDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateBinThreshold($binThreshold: CreateBinThresholdInput!) {\n    wms {\n      createBinThreshold(value: $binThreshold) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateBinThresholdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateBinThreshold(\n    $id: ID!\n    $binThreshold: UpdateBinThresholdInput!\n  ) {\n    wms {\n      updateBinThreshold(id: $id, value: $binThreshold) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateBinThresholdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveBinThreshold($id: ID!) {\n    wms {\n      removeBinThreshold(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveBinThresholdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableBinThreshold($page: Int, $perPage: Int) {\n    wms {\n      binThresholds(page: $page, perPage: $perPage) {\n        alertThreshold\n        createdAt\n        id\n        isActive\n        maxQuantity\n        minQuantity\n        reorderQuantity\n        updatedAt\n        product {\n          name\n          description\n          id\n          sku\n          status\n          barcode\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableBinThresholdDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInboundShipmentItem(\n    $inboundShipmentItem: CreateInboundShipmentItemInput!\n  ) {\n    wms {\n      createInboundShipmentItem(value: $inboundShipmentItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInboundShipmentItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInboundShipmentItem(\n    $id: ID!\n    $inboundShipmentItem: UpdateInboundShipmentItemInput!\n  ) {\n    wms {\n      updateInboundShipmentItem(id: $id, value: $inboundShipmentItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInboundShipmentItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInboundShipmentItem($id: ID!) {\n    wms {\n      removeInboundShipmentItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInboundShipmentItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInboundShipment(\n    $inboundShipment: CreateInboundShipmentInput!\n  ) {\n    wms {\n      createInboundShipment(value: $inboundShipment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInboundShipment(\n    $id: ID!\n    $inboundShipment: UpdateInboundShipmentInput!\n  ) {\n    wms {\n      updateInboundShipment(id: $id, value: $inboundShipment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInboundShipment($id: ID!) {\n    wms {\n      removeInboundShipment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableInboundShipment(\n    $page: Int\n    $perPage: Int\n    $status: InboundShipmentStatus\n  ) {\n    wms {\n      inboundShipments(page: $page, perPage: $perPage, status: $status) {\n        actualArrivalDate\n        createdAt\n        expectedArrivalDate\n        id\n        status\n        updatedAt\n        client {\n          name\n          industry\n          phoneNumber\n          country\n          website\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableInboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInventoryAdjustment(\n    $inventoryAdjustment: CreateInventoryAdjustmentInput!\n  ) {\n    wms {\n      createInventoryAdjustment(value: $inventoryAdjustment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInventoryAdjustmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInventoryAdjustment(\n    $id: ID!\n    $inventoryAdjustment: UpdateInventoryAdjustmentInput!\n  ) {\n    wms {\n      updateInventoryAdjustment(id: $id, value: $inventoryAdjustment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInventoryAdjustmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInventoryAdjustment($id: ID!) {\n    wms {\n      removeInventoryAdjustment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInventoryAdjustmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableInventoryAdjustment(\n    $page: Int\n    $perPage: Int\n    $reason: InventoryAdjustmentReason\n    $search: String\n  ) {\n    wms {\n      inventoryAdjustments(\n        page: $page\n        perPage: $perPage\n        reason: $reason\n        search: $search\n      ) {\n        createdAt\n        id\n        notes\n        quantityChange\n        reason\n        updatedAt\n        warehouseId\n        user {\n          email\n          id\n          image\n          name\n        }\n        product {\n          barcode\n          description\n          id\n          name\n          sku\n          status\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableInventoryAdjustmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query SearchInventoryAdjustments($search: String!) {\n    wms {\n      inventoryAdjustments(search: $search, page: 1, perPage: 10) {\n        value: id\n        label: notes\n      }\n    }\n  }\n"): typeof import('./graphql').SearchInventoryAdjustmentsDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInventoryBatch($inventoryBatch: CreateInventoryBatchInput!) {\n    wms {\n      createInventoryBatch(value: $inventoryBatch) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInventoryBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInventoryBatch(\n    $id: ID!\n    $inventoryBatch: UpdateInventoryBatchInput!\n  ) {\n    wms {\n      updateInventoryBatch(id: $id, value: $inventoryBatch) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInventoryBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInventoryBatch($id: ID!) {\n    wms {\n      removeInventoryBatch(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInventoryBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableInventoryBatch($page: Int, $perPage: Int, $search: String) {\n    wms {\n      inventoryBatches(page: $page, perPage: $perPage, search: $search) {\n        batchNumber\n        createdAt\n        expirationDate\n        id\n        updatedAt\n        inventoryStock {\n          availableQuantity\n          product {\n            barcode\n            name\n            sku\n            status\n            description\n            id\n            costPrice\n          }\n          quantity\n          reservedQuantity\n          status\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableInventoryBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateInventoryStock($inventoryStock: CreateInventoryStockInput!) {\n    wms {\n      createInventoryStock(value: $inventoryStock) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateInventoryStockDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateInventoryStock(\n    $id: ID!\n    $inventoryStock: UpdateInventoryStockInput!\n  ) {\n    wms {\n      updateInventoryStock(id: $id, value: $inventoryStock) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateInventoryStockDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveInventoryStock($id: ID!) {\n    wms {\n      removeInventoryStock(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveInventoryStockDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableInventoryStock(\n    $page: Int\n    $perPage: Int\n    $status: InventoryStockStatus\n  ) {\n    wms {\n      inventoryStocks(page: $page, perPage: $perPage, status: $status) {\n        availableQuantity\n        createdAt\n        id\n        lastCountedAt\n        lastMovementAt\n        quantity\n        reservedQuantity\n        status\n        updatedAt\n        product {\n          barcode\n          costPrice\n          description\n          id\n          name\n          status\n          sku\n          volume\n          weight\n          width\n        }\n        location {\n          id\n          barcode\n          isActive\n          isPickable\n          isReceivable\n          level\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableInventoryStockDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateLocation($location: CreateLocationInput!) {\n    wms {\n      createLocation(value: $location) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateLocation($id: ID!, $location: UpdateLocationInput!) {\n    wms {\n      updateLocation(id: $id, value: $location) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveLocation($id: ID!) {\n    wms {\n      removeLocation(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableLocation(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $type: LocationType\n  ) {\n    wms {\n      locations(page: $page, perPage: $perPage, search: $search, type: $type) {\n        barcode\n        createdAt\n        isActive\n        isPickable\n        isReceivable\n        id\n        hazmatApproved\n        level\n        maxPallets\n        maxVolume\n        maxWeight\n        name\n        path\n        temperatureControlled\n        type\n        updatedAt\n        xCoordinate\n        yCoordinate\n        zCoordinate\n        parentLocation {\n          id\n          name\n          path\n        }\n        warehouse {\n          address\n          city\n          name\n          id\n          isActive\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableLocationDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOutboundShipmentItem(\n    $outboundShipmentItem: CreateOutboundShipmentItemInput!\n  ) {\n    wms {\n      createOutboundShipmentItem(value: $outboundShipmentItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateOutboundShipmentItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOutboundShipmentItem(\n    $id: ID!\n    $outboundShipmentItem: UpdateOutboundShipmentItemInput!\n  ) {\n    wms {\n      updateOutboundShipmentItem(id: $id, value: $outboundShipmentItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateOutboundShipmentItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOutboundShipmentItem($id: ID!) {\n    wms {\n      removeOutboundShipmentItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveOutboundShipmentItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateOutboundShipment(\n    $outboundShipment: CreateOutboundShipmentInput!\n  ) {\n    wms {\n      createOutboundShipment(value: $outboundShipment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateOutboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateOutboundShipment(\n    $id: ID!\n    $outboundShipment: UpdateOutboundShipmentInput!\n  ) {\n    wms {\n      updateOutboundShipment(id: $id, value: $outboundShipment) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateOutboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveOutboundShipment($id: ID!) {\n    wms {\n      removeOutboundShipment(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveOutboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableOutboundShipment(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: OutboundShipmentStatus\n  ) {\n    wms {\n      outboundShipments(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        carrier\n        createdAt\n        id\n        status\n        trackingNumber\n        updatedAt\n        warehouseId\n        salesOrder {\n          id\n          orderNumber\n          shippingAddress\n          status\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableOutboundShipmentDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePackageItem($packageItem: CreatePackageItemInput!) {\n    wms {\n      createPackageItem(value: $packageItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePackageItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePackageItem($id: ID!, $packageItem: UpdatePackageItemInput!) {\n    wms {\n      updatePackageItem(id: $id, value: $packageItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePackageItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePackageItem($id: ID!) {\n    wms {\n      removePackageItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePackageItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePackage($package: CreatePackageInput!) {\n    wms {\n      createPackage(value: $package) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePackageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePackage($id: ID!, $package: UpdatePackageInput!) {\n    wms {\n      updatePackage(id: $id, value: $package) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePackageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePackage($id: ID!) {\n    wms {\n      removePackage(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePackageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TablePackage($page: Int, $perPage: Int, $search: String) {\n    wms {\n      packages(page: $page, perPage: $perPage, search: $search) {\n        carrier\n        createdAt\n        height\n        id\n        insuranceValue\n        isFragile\n        isHazmat\n        length\n        packageNumber\n        packageType\n        packedAt\n        requiresSignature\n        serviceLevel\n        shippedAt\n        trackingNumber\n        updatedAt\n        volume\n        weight\n        width\n        items {\n          lotNumber\n          quantity\n          product {\n            barcode\n            costPrice\n            name\n            sku\n            status\n          }\n          serialNumbers\n          totalWeight\n          unitWeight\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TablePackageDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePickBatchItem($pickBatchItem: CreatePickBatchItemInput!) {\n    wms {\n      createPickBatchItem(value: $pickBatchItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePickBatchItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePickBatchItem(\n    $id: ID!\n    $pickBatchItem: UpdatePickBatchItemInput!\n  ) {\n    wms {\n      updatePickBatchItem(id: $id, value: $pickBatchItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePickBatchItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePickBatchItem($id: ID!) {\n    wms {\n      removePickBatchItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePickBatchItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePickBatch($pickBatch: CreatePickBatchInput!) {\n    wms {\n      createPickBatch(value: $pickBatch) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePickBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePickBatch($id: ID!, $pickBatch: UpdatePickBatchInput!) {\n    wms {\n      updatePickBatch(id: $id, value: $pickBatch) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePickBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePickBatch($id: ID!) {\n    wms {\n      removePickBatch(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePickBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TablePickBatch(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: PickBatchStatus\n    $strategy: PickStrategy\n  ) {\n    wms {\n      pickBatches(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        strategy: $strategy\n      ) {\n        actualDuration\n        batchNumber\n        completedAt\n        completedItems\n        createdAt\n        estimatedDuration\n        id\n        priority\n        startedAt\n        status\n        strategy\n        totalItems\n        updatedAt\n        waveId\n        zoneRestrictions\n        items {\n          id\n          estimatedPickTime\n          actualPickTime\n          orderPriority\n          salesOrder {\n            status\n            shippingAddress\n            orderNumber\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TablePickBatchDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWmsProduct($wmsProduct: CreateWmsProductInput!) {\n    wms {\n      createWmsProduct(value: $wmsProduct) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateWmsProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWmsProduct($id: ID!, $wmsProduct: UpdateWmsProductInput!) {\n    wms {\n      updateWmsProduct(id: $id, value: $wmsProduct) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateWmsProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveWmsProduct($id: ID!) {\n    wms {\n      removeWmsProduct(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveWmsProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableWmsProduct(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: ProductStatus\n  ) {\n    wms {\n      wmsProducts(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        barcode\n        costPrice\n        createdAt\n        height\n        description\n        id\n        length\n        name\n        sku\n        status\n        updatedAt\n        volume\n        weight\n        width\n        supplier {\n          contactPerson\n          email\n          name\n          phoneNumber\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableWmsProductDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreatePutawayRule($putawayRule: CreatePutawayRuleInput!) {\n    wms {\n      createPutawayRule(value: $putawayRule) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreatePutawayRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdatePutawayRule($id: ID!, $putawayRule: UpdatePutawayRuleInput!) {\n    wms {\n      updatePutawayRule(id: $id, value: $putawayRule) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdatePutawayRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemovePutawayRule($id: ID!) {\n    wms {\n      removePutawayRule(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemovePutawayRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TablePutawayRule(\n    $page: Int\n    $perPage: Int\n    $locationType: LocationType\n  ) {\n    wms {\n      putawayRules(\n        locationType: $locationType\n        page: $page\n        perPage: $perPage\n      ) {\n        createdAt\n        isActive\n        id\n        locationType\n        maxQuantity\n        minQuantity\n        priority\n        requiresHazmatApproval\n        requiresTemperatureControl\n        updatedAt\n        volumeThreshold\n        weightThreshold\n        client {\n          name\n          industry\n          country\n          city\n          website\n          phoneNumber\n        }\n        product {\n          barcode\n          id\n          costPrice\n          description\n          name\n          sku\n          status\n        }\n        warehouse {\n          address\n          city\n          country\n          name\n          isActive\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TablePutawayRuleDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReorderPoint($reorderPoint: CreateReorderPointInput!) {\n    wms {\n      createReorderPoint(value: $reorderPoint) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateReorderPointDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateReorderPoint(\n    $id: ID!\n    $reorderPoint: UpdateReorderPointInput!\n  ) {\n    wms {\n      updateReorderPoint(id: $id, value: $reorderPoint) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateReorderPointDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveReorderPoint($id: ID!) {\n    wms {\n      removeReorderPoint(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveReorderPointDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableReorderPoint($page: Int, $perPage: Int) {\n    wms {\n      reorderPoints(page: $page, perPage: $perPage) {\n        createdAt\n        id\n        threshold\n        updatedAt\n        product {\n          barcode\n          description\n          costPrice\n          id\n          name\n          sku\n          status\n        }\n        warehouse {\n          address\n          city\n          country\n          id\n          name\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableReorderPointDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReturnItem($returnItem: CreateReturnItemInput!) {\n    wms {\n      createReturnItem(value: $returnItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateReturnItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateReturnItem($id: ID!, $returnItem: UpdateReturnItemInput!) {\n    wms {\n      updateReturnItem(id: $id, value: $returnItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateReturnItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveReturnItem($id: ID!) {\n    wms {\n      removeReturnItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveReturnItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateReturn($return: CreateReturnInput!) {\n    wms {\n      createReturn(value: $return) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateReturnDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateReturn($id: ID!, $return: UpdateReturnInput!) {\n    wms {\n      updateReturn(id: $id, value: $return) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateReturnDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveReturn($id: ID!) {\n    wms {\n      removeReturn(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveReturnDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableReturnQuery(\n    $page: Int\n    $perPage: Int\n    $status: ReturnStatus\n    $search: String\n  ) {\n    wms {\n      returns(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        reason\n        returnNumber\n        status\n        updatedAt\n        client {\n          name\n          phoneNumber\n          industry\n          country\n          city\n          website\n        }\n        salesOrder {\n          orderNumber\n          shippingAddress\n          status\n          updatedAt\n          id\n        }\n        items {\n          condition\n          id\n          quantityExpected\n          quantityReceived\n          quantityVariance\n          product {\n            barcode\n            costPrice\n            description\n            id\n            name\n            sku\n            status\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableReturnQueryDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSalesOrderItem($salesOrderItem: CreateSalesOrderItemInput!) {\n    wms {\n      createSalesOrderItem(value: $salesOrderItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateSalesOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSalesOrderItem(\n    $id: ID!\n    $salesOrderItem: UpdateSalesOrderItemInput!\n  ) {\n    wms {\n      updateSalesOrderItem(id: $id, value: $salesOrderItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateSalesOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveSalesOrderItem($id: ID!) {\n    wms {\n      removeSalesOrderItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveSalesOrderItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSalesOrder($salesOrder: CreateSalesOrderInput!) {\n    wms {\n      createSalesOrder(value: $salesOrder) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateSalesOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSalesOrder($id: ID!, $salesOrder: UpdateSalesOrderInput!) {\n    wms {\n      updateSalesOrder(id: $id, value: $salesOrder) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateSalesOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveSalesOrder($id: ID!) {\n    wms {\n      removeSalesOrder(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveSalesOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableSalesOrder(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: SalesOrderStatus\n  ) {\n    wms {\n      salesOrders(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n      ) {\n        createdAt\n        id\n        orderNumber\n        shippingAddress\n        status\n        updatedAt\n        items {\n          id\n          quantityOrdered\n          updatedAt\n          product {\n            barcode\n            id\n            description\n            name\n            sku\n            status\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableSalesOrderDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateStockTransfer($stockTransfer: CreateStockTransferInput!) {\n    wms {\n      createStockTransfer(value: $stockTransfer) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateStockTransferDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateStockTransfer(\n    $id: ID!\n    $stockTransfer: UpdateStockTransferInput!\n  ) {\n    wms {\n      updateStockTransfer(id: $id, value: $stockTransfer) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateStockTransferDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveStockTransfer($id: ID!) {\n    wms {\n      removeStockTransfer(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveStockTransferDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableStockTransfer(\n    $page: Int\n    $perPage: Int\n    $status: StockTransferStatus\n  ) {\n    wms {\n      stockTransfers(page: $page, perPage: $perPage, status: $status) {\n        createdAt\n        id\n        quantity\n        status\n        updatedAt\n        destinationWarehouse {\n          address\n          city\n          country\n          id\n          name\n          timezone\n          isActive\n        }\n        product {\n          barcode\n          costPrice\n          name\n          height\n          sku\n          status\n        }\n        sourceWarehouse {\n          address\n          country\n          isActive\n          name\n          city\n          id\n          timezone\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableStockTransferDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateSupplier($supplier: CreateSupplierInput!) {\n    wms {\n      createSupplier(value: $supplier) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateSupplierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateSupplier($id: ID!, $supplier: UpdateSupplierInput!) {\n    wms {\n      updateSupplier(id: $id, value: $supplier) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateSupplierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveSupplier($id: ID!) {\n    wms {\n      removeSupplier(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveSupplierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableSupplier($page: Int, $perPage: Int, $search: String) {\n    wms {\n      suppliers(page: $page, perPage: $perPage, search: $search) {\n        contactPerson\n        createdAt\n        email\n        id\n        name\n        phoneNumber\n        updatedAt\n        products {\n          barcode\n          id\n          costPrice\n          description\n          name\n          sku\n          status\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableSupplierDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTaskItem($taskItem: CreateTaskItemInput!) {\n    wms {\n      createTaskItem(value: $taskItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateTaskItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTaskItem($id: ID!, $taskItem: UpdateTaskItemInput!) {\n    wms {\n      updateTaskItem(id: $id, value: $taskItem) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateTaskItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTaskItem($id: ID!) {\n    wms {\n      removeTaskItem(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveTaskItemDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateTask($task: CreateTaskInput!) {\n    wms {\n      createTask(value: $task) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateTask($id: ID!, $task: UpdateTaskInput!) {\n    wms {\n      updateTask(id: $id, value: $task) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveTask($id: ID!) {\n    wms {\n      removeTask(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableTask(\n    $page: Int\n    $perPage: Int\n    $search: String\n    $status: TaskStatus\n    $type: TaskType\n  ) {\n    wms {\n      tasks(\n        page: $page\n        perPage: $perPage\n        search: $search\n        status: $status\n        type: $type\n      ) {\n        actualDuration\n        createdAt\n        durationSeconds\n        endTime\n        estimatedDuration\n        id\n        instructions\n        notes\n        priority\n        sourceEntityId\n        sourceEntityType\n        startTime\n        status\n        taskNumber\n        type\n        updatedAt\n        user {\n          email\n          id\n          image\n          name\n        }\n        warehouse {\n          address\n          city\n          country\n          id\n          isActive\n          name\n          timezone\n        }\n        items {\n          completedAt\n          createdAt\n          expiryDate\n          id\n          lotNumber\n          notes\n          quantityCompleted\n          quantityRemaining\n          quantityRequired\n          serialNumbers\n          status\n          updatedAt\n          product {\n            barcode\n            costPrice\n            description\n            id\n            name\n            sku\n            status\n          }\n          sourceLocation {\n            barcode\n            hazmatApproved\n            id\n            path\n            name\n            type\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableTaskDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation CreateWarehouse($warehouse: CreateWarehouseInput!) {\n    wms {\n      createWarehouse(value: $warehouse) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').CreateWarehouseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation UpdateWarehouse($id: ID!, $warehouse: UpdateWarehouseInput!) {\n    wms {\n      updateWarehouse(id: $id, value: $warehouse) {\n        id\n      }\n    }\n  }\n"): typeof import('./graphql').UpdateWarehouseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  mutation RemoveWarehouse($id: ID!) {\n    wms {\n      removeWarehouse(id: $id) {\n        success\n        numDeletedRows\n      }\n    }\n  }\n"): typeof import('./graphql').RemoveWarehouseDocument;
/**
 * The graphql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function graphql(source: "\n  query TableWarehouse($page: Int, $perPage: Int, $search: String) {\n    wms {\n      warehouses(page: $page, perPage: $perPage, search: $search) {\n        address\n        city\n        contactEmail\n        contactPerson\n        contactPhone\n        country\n        createdAt\n        id\n        isActive\n        name\n        postalCode\n        state\n        timezone\n        updatedAt\n        tasks {\n          instructions\n          id\n          notes\n          priority\n          taskNumber\n          type\n          user {\n            email\n            id\n            image\n            name\n          }\n        }\n        locations {\n          barcode\n          id\n          isActive\n          isPickable\n          isReceivable\n          level\n          maxPallets\n          maxVolume\n          maxWeight\n          name\n          path\n          type\n          xCoordinate\n          yCoordinate\n          zCoordinate\n          hazmatApproved\n        }\n        inboundShipments {\n          status\n          updatedAt\n          warehouseId\n          items {\n            discrepancyNotes\n            discrepancyQuantity\n            expectedQuantity\n            id\n            createdAt\n            receivedQuantity\n            updatedAt\n            product {\n              barcode\n              costPrice\n              description\n              id\n              name\n              sku\n              status\n            }\n            inboundShipment {\n              status\n              id\n              expectedArrivalDate\n              updatedAt\n              actualArrivalDate\n              client {\n                city\n                country\n                id\n                industry\n                name\n                phoneNumber\n              }\n            }\n          }\n        }\n      }\n    }\n  }\n"): typeof import('./graphql').TableWarehouseDocument;


export function graphql(source: string) {
  return (documents as any)[source] ?? {};
}
