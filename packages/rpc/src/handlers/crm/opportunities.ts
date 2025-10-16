import { implement } from "@orpc/server";
import {
  CampaignRepository,
  CompanyRepository,
  ContactRepository,
  OpportunityProductRepository,
  OpportunityRepository,
  ProductRepository,
} from "@packages/db/repositories/crm";
import { UserRepository } from "@packages/db/repositories/auth";
import * as contracts from "@/contracts/crm/opportunities";
import type { ORPCContext } from "@/index";
import { nonEmpty } from "@packages/db/utils";

export const PaginateOpportunity = implement(
  contracts.PaginateOpportunityContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityRepo.paginate(input);

    // children
    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        {
          column: "opportunityId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    const ownerPromises = userRepo.any(result.map((row) => row.ownerId));
    const campaignPromises = campaignRepo.any(
      result.map((row) => row.campaignId).filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      result.map((row) => row.companyId).filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      result.map((row) => row.contactId).filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      campaign: campaigns.find((subRow) => subRow.id === row.campaignId),
      company: companies.find((subRow) => subRow.id === row.companyId),
      contact: contacts.find((subRow) => subRow.id === row.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === row.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        )
        .filter(nonEmpty),
    }));
  });

export const RangeOpportunity = implement(contracts.RangeOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityRepo.range(input);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        {
          column: "opportunityId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    const ownerPromises = userRepo.any(result.map((row) => row.ownerId));
    const campaignPromises = campaignRepo.any(
      result.map((row) => row.campaignId).filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      result.map((row) => row.companyId).filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      result.map((row) => row.contactId).filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      campaign: campaigns.find((subRow) => subRow.id === row.campaignId),
      company: companies.find((subRow) => subRow.id === row.companyId),
      contact: contacts.find((subRow) => subRow.id === row.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === row.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        )
        .filter(nonEmpty),
    }));
  });

export const AnyOpportunity = implement(contracts.AnyOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityRepo.any(input);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        {
          column: "opportunityId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    const ownerPromises = userRepo.any(result.map((row) => row.ownerId));
    const campaignPromises = campaignRepo.any(
      result.map((row) => row.campaignId).filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      result.map((row) => row.companyId).filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      result.map((row) => row.contactId).filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      campaign: campaigns.find((subRow) => subRow.id === row.campaignId),
      company: companies.find((subRow) => subRow.id === row.companyId),
      contact: contacts.find((subRow) => subRow.id === row.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === row.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        )
        .filter(nonEmpty),
    }));
  });

export const InsertOpportunity = implement(contracts.InsertOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);

    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityRepo.insert(input);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        { column: "opportunityId", operator: "in", value: [result.id] },
      ],
    });

    const ownerPromises = userRepo.any([result.ownerId]);
    const campaignPromises = campaignRepo.any(
      [result.campaignId].filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      [result.companyId].filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      [result.contactId].filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((row) => row.id === result.ownerId)!,
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        )
        .filter(nonEmpty),
    };
  });

export const InsertManyOpportunity = implement(
  contracts.InsertManyOpportunityContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityRepo.insertMany(input);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        {
          column: "opportunityId",
          operator: "in",
          value: result.map((row) => row.id),
        },
      ],
    });

    const ownerPromises = userRepo.any(result.map((row) => row.ownerId));
    const campaignPromises = campaignRepo.any(
      result.map((row) => row.campaignId).filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      result.map((row) => row.companyId).filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      result.map((row) => row.contactId).filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return result.map((row) => ({
      ...row,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((subRow) => subRow.id === row.ownerId)!,
      campaign: campaigns.find((subRow) => subRow.id === row.campaignId),
      company: companies.find((subRow) => subRow.id === row.companyId),
      contact: contacts.find((subRow) => subRow.id === row.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === row.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        )
        .filter(nonEmpty),
    }));
  });

export const UpdateOpportunity = implement(contracts.UpdateOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityRepo.update(input.id, input.value);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        { column: "opportunityId", operator: "in", value: [result.id] },
      ],
    });

    const ownerPromises = userRepo.any([result.ownerId]);
    const campaignPromises = campaignRepo.any(
      [result.campaignId].filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      [result.companyId].filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      [result.contactId].filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find((row) => row.id === result.ownerId)!,
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        )
        .filter(nonEmpty),
    };
  });

export const RemoveOpportunity = implement(contracts.RemoveOpportunityContract)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);

    return await opportunityRepo.remove(input);
  });

export const InsertOpportunityProduct = implement(
  contracts.InsertOpportunityProductContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const opportunityProduct = await opportunityProductRepo.insert(input);

    const result = await opportunityRepo.find(opportunityProduct.opportunityId);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        { column: "opportunityId", operator: "in", value: [result.id] },
      ],
    });

    const ownerPromises = userRepo.any([result.ownerId]);
    const campaignPromises = campaignRepo.any(
      [result.campaignId].filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      [result.companyId].filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      [result.contactId].filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find(
        (row) => row.id === result.ownerId
      ) as (typeof owners)[number],
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        ) as (typeof products)[number][],
    };
  });

export const InsertManyOpportunityProduct = implement(
  contracts.InsertManyOpportunityProductContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const opportunityProducts = await opportunityProductRepo.insertMany(input);

    const opportunityIds = opportunityProducts.map((row) => row.opportunityId);
    const opportunities = await opportunityRepo.any(opportunityIds);

    const allOpportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        { column: "opportunityId", operator: "in", value: opportunityIds },
      ],
    });

    const ownerPromises = userRepo.any(opportunities.map((row) => row.ownerId));
    const campaignPromises = campaignRepo.any(
      opportunities.map((row) => row.campaignId).filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      opportunities.map((row) => row.companyId).filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      opportunities.map((row) => row.contactId).filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      allOpportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return opportunities.map((opportunity) => ({
      ...opportunity,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find(
        (row) => row.id === opportunity.ownerId
      ) as (typeof owners)[number],
      campaign: campaigns.find((row) => row.id === opportunity.campaignId),
      company: companies.find((row) => row.id === opportunity.companyId),
      contact: contacts.find((row) => row.id === opportunity.contactId),
      products: allOpportunityProducts
        .filter((subRow) => subRow.opportunityId === opportunity.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        ) as (typeof products)[number][],
    }));
  });

export const UpdateOpportunityProduct = implement(
  contracts.UpdateOpportunityProductContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityRepo = OpportunityRepository.fns(context.kysely);
    const userRepo = UserRepository.fns(context.kysely);
    const campaignRepo = CampaignRepository.fns(context.kysely);
    const companyRepo = CompanyRepository.fns(context.kysely);
    const contactRepo = ContactRepository.fns(context.kysely);
    const productRepo = ProductRepository.fns(context.kysely);
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const opportunityProduct = await opportunityProductRepo.update(
      input.id,
      input.value
    );

    const result = await opportunityRepo.find(opportunityProduct.opportunityId);

    const opportunityProducts = await opportunityProductRepo.paginate({
      page: 1,
      perPage: 1000,
      filters: [
        { column: "opportunityId", operator: "in", value: [result.id] },
      ],
    });

    const ownerPromises = userRepo.any([result.ownerId]);
    const campaignPromises = campaignRepo.any(
      [result.campaignId].filter(nonEmpty)
    );
    const companyPromises = companyRepo.any(
      [result.companyId].filter(nonEmpty)
    );
    const contactPromises = contactRepo.any(
      [result.contactId].filter(nonEmpty)
    );
    const productPromises = productRepo.any(
      opportunityProducts.map((row) => row.productId)
    );

    const [owners, campaigns, companies, contacts, products] =
      await Promise.all([
        ownerPromises,
        campaignPromises,
        companyPromises,
        contactPromises,
        productPromises,
      ]);

    return {
      ...result,
      // biome-ignore lint/style/noNonNullAssertion: force check since its already verified by the database
      owner: owners.find(
        (row) => row.id === result.ownerId
      ) as (typeof owners)[number],
      campaign: campaigns.find((row) => row.id === result.campaignId),
      company: companies.find((row) => row.id === result.companyId),
      contact: contacts.find((row) => row.id === result.contactId),
      products: opportunityProducts
        .filter((subRow) => subRow.opportunityId === result.id)
        .map(
          (subRow) =>
            products.find((pSubRow) => pSubRow.id === subRow.productId)!
        ) as (typeof products)[number][],
    };
  });

export const RemoveOpportunityProduct = implement(
  contracts.RemoveOpportunityProductContract
)
  .$context<ORPCContext>()
  .handler(async ({ context, input }) => {
    const opportunityProductRepo = OpportunityProductRepository.fns(
      context.kysely
    );

    const result = await opportunityProductRepo.remove(input);

    return result;
  });
