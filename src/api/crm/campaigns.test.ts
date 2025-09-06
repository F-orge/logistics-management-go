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
  return response.token;
}

describe('Campaign management api', () => {
  let campaign: ORPCOutputs['crm']['campaigns']['create'];

  it('should create a new campaign', async () => {
    const token = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    campaign = await api.crm.campaigns.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Summer Sale',
      budget: '5000',
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
    });

    expect(campaign.name).toBe('Summer Sale');
    expect(campaign.id).toBeDefined();
  });

  it('should list all campaigns', async () => {
    const token = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const campaigns = await api.crm.campaigns.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});

    expect(Array.isArray(campaigns)).toBe(true);
    expect(campaigns.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single campaign based on its id', async () => {
    const token = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.campaigns.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: campaign.id,
      value: { name: 'Updated Campaign Name' },
    });

    expect(updated.id).toBe(campaign.id);
    expect(updated.name).toBe('Updated Campaign Name');
  });

  it('should remove a campaign and return an object of {"success":true}', async () => {
    const token = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.campaigns.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(campaign.id);

    expect(response.success).toBe(true);
  });
});
