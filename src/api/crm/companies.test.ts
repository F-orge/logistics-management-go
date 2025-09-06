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
  // Return both token and user id
  return { token: response.token, userId: response.user.id };
}

describe('Company management api', () => {
  let company: ORPCOutputs['crm']['companies']['create'];

  it('should create a new company', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    company = await api.crm.companies.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Acme Corp',
      street: '123 Main St',
      city: 'Metropolis',
      state: 'Metro State',
      postalCode: '12345',
      country: 'Freedonia',
      phoneNumber: '+1234567890',
      industry: 'Manufacturing',
      website: 'https://acme.com',
      annualRevenue: '1000000.00',
      ownerId: userId,
    });

    expect(company.name).toBe('Acme Corp');
    expect(company.id).toBeDefined();
  });

  it('should list all companies', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const companies = await api.crm.companies.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});

    expect(Array.isArray(companies)).toBe(true);
    expect(companies.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single company based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.companies.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: company.id,
      value: { website: 'https://updated-acme.com' },
    });

    expect(updated.id).toBe(company.id);
    expect(updated.website).toBe('https://updated-acme.com');
  });

  it('should remove a company and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.companies.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(company.id);

    expect(response.success).toBe(true);
  });
});
