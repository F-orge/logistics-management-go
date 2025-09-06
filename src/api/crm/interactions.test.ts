import { describe, expect, it } from 'bun:test';
import api from '@/api';

async function signInJohnDoe() {
  const request = new Request('http://example.com');
  const response = await api.auth.signIn.callable({
    context: {
      auth: globalThis.betterAuth,
      request,
      user: null,
      session: null,
    },
  })({ email: 'johndoe@email.com', password: 'randompassword' });
  return { token: response.token, userId: response.user.id };
}

describe('Interaction management api', () => {
  let interaction: ORPCOutputs['crm']['interactions']['create'];
  let contactId: string;
  let caseId: string;

  it('should create a new contact for interaction', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const company = await api.crm.companies.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Interaction Corp',
      street: '789 Main St',
      city: 'Big City',
      state: 'Big State',
      postalCode: '54321',
      country: 'Freedonia',
      phoneNumber: '+1122334455',
      industry: 'Consulting',
      website: 'https://interactioncorp.com',
      annualRevenue: '2000000.00',
      ownerId: userId,
    });
    const contact = await api.crm.contacts.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'John Contact',
      email: 'john.contact@email.com',
      phoneNumber: '+10987654321',
      jobTitle: 'Consultant',
      companyId: company.id,
      ownerId: userId,
    });
    contactId = contact.id;
    expect(contactId).toBeDefined();

    // Create a case for the interaction
    const crmCase = await api.crm.cases.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      caseNumber: 'CASE-INT-001',
      status: 'active',
      priority: 'medium',
      type: 'support',
      ownerId: userId,
      contactId,
      description: 'Interaction test case',
    });
    caseId = crmCase.id;
    expect(caseId).toBeDefined();
  });

  it('should create a new interaction', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    interaction = await api.crm.interactions.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      contactId,
      userId,
      caseId,
      type: 'call',
      outcome: 'Successful',
      notes: 'Discussed project requirements.',
      interactionDate: new Date(Date.now()),
    });
    expect(interaction.type).toBe('call');
    expect(interaction.id).toBeDefined();
  });

  it('should list all interactions', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const interactions = await api.crm.interactions.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});
    expect(Array.isArray(interactions)).toBe(true);
    expect(interactions.length).toBeGreaterThanOrEqual(0);
  });

  it('should view a single interaction by id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const viewed = await api.crm.interactions.view.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(interaction.id);
    expect(viewed.id).toBe(interaction.id);
    expect(viewed.type).toBe('call');
  });
});
