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

describe('Opportunity management api', () => {
  let opportunity: ORPCOutputs['crm']['opportunities']['create'];

  it('should create a new opportunity', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    opportunity = await api.crm.opportunities.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Big Deal',
      stage: 'prospecting',
      dealValue: '50000.00', // number, not string
      probability: 0.8,
      expectedCloseDate: new Date(Date.now()),
      source: 'Web',
      ownerId: userId,
      lostReason: null,
      contactId: null,
      companyId: null,
      campaignId: null,
    });
    expect(opportunity.name).toBe('Big Deal');
    expect(opportunity.id).toBeDefined();
  });

  it('should list all opportunities', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const opportunities = await api.crm.opportunities.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});
    expect(Array.isArray(opportunities)).toBe(true);
    expect(opportunities.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single opportunity based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.opportunities.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: opportunity.id,
      value: { stage: 'negotiation' },
    });
    expect(updated.id).toBe(opportunity.id);
    expect(updated.stage).toBe('negotiation');
  });

  it('should remove an opportunity and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.opportunities.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(opportunity.id);
    expect(response.success).toBe(true);
  });
});
