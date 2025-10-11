# To-Do List

- [ ] Move `document.ts` contract from `src/orpc/contracts/billing/document.ts` to `src/orpc/contracts/crm/documents.ts`.
- [ ] Update `src/orpc/handlers/billing/document.ts` to reflect the new contract location and rename it to `src/orpc/handlers/crm/documents.ts`.
- [ ] Adjust contract names in `src/orpc/contracts/crm/documents.ts` to reflect `CrmDocument` instead of `Document`.
- [ ] Adjust schema imports in `src/orpc/contracts/crm/documents.ts` to reflect `crmDocumentSchema` instead of `billingDocumentSchema`.
- [ ] Adjust `billingDocumentInsertSchema` and `billingDocumentUpdateSchema` to `crmDocumentInsertSchema` and `crmDocumentUpdateSchema` respectively.
- [ ] Adjust `billingDocumentSchema` to `crmDocumentSchema`.
- [ ] Adjust `DocumentRepository` to `CrmDocumentRepository`.
- [ ] Adjust `billingContracts` to `crmContracts`.
- [ ] Adjust `paginateDocument` to `paginateCrmDocument`.
- [ ] Adjust `rangeDocument` to `rangeCrmDocument`.
- [ ] Adjust `inDocument` to `inCrmDocument`.
- [ ] Adjust `createDocument` to `createCrmDocument`.
- [ ] Adjust `updateDocument` to `updateCrmDocument`.
- [ ] Adjust `deleteDocument` to `deleteCrmDocument`.
- [ ] Create `src/schemas/crm/document.ts` and move relevant schemas.
- [ ] Delete `src/schemas/billing/document.ts`.
- [ ] Create `src/repositories/crm/documents.ts` and move `DocumentRepository`.
- [ ] Delete `src/repositories/billing/documents.ts`.