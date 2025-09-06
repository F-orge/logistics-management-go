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

describe('Lead management api', () => {
  let lead: ORPCOutputs['crm']['leads']['create'];
  let campaignId: string;

  it('should create a new campaign for lead', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const campaign = await api.crm.campaigns.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Lead Campaign',
      budget: '10000',
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
    });
    campaignId = campaign.id;
    expect(campaignId).toBeDefined();
  });

  it('should create a new lead', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    lead = await api.crm.leads.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Big Lead',
      email: 'big.lead@email.com',
      leadSource: 'Web',
      leadScore: 10,
      status: 'new',
      ownerId: userId,
      campaignId,
      convertedCompanyId: null,
      convertedContactId: null,
      convertedAt: null,
      convertedOpportunityId: null,
    });
    expect(lead.name).toBe('Big Lead');
    expect(lead.id).toBeDefined();
  });

  it('should list all leads', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const leads = await api.crm.leads.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});
    expect(Array.isArray(leads)).toBe(true);
    expect(leads.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single lead based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.leads.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: lead.id,
      value: { status: 'qualified' },
    });
    expect(updated.id).toBe(lead.id);
    expect(updated.status).toBe('qualified');
  });

  it('should remove a lead and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.leads.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(lead.id);
    expect(response.success).toBe(true);
  });
});
