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

describe('Case management api', () => {
  let crmCase: ORPCOutputs['crm']['cases']['create'];
  let contactId: string;

  it('should create a new contact for case', async () => {
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
      name: 'Case Corp',
      street: '123 Main St',
      city: 'Metropolis',
      state: 'Metro State',
      postalCode: '12345',
      country: 'Freedonia',
      phoneNumber: '+1234567890',
      industry: 'Legal',
      website: 'https://casecorp.com',
      annualRevenue: '1000000.00',
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
      name: 'Jane Case',
      email: 'jane.case@email.com',
      phoneNumber: '+12345678901',
      jobTitle: 'Manager',
      companyId: company.id,
      ownerId: userId,
    });
    contactId = contact.id;
    expect(contactId).toBeDefined();
  });

  it('should create a new case', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    crmCase = await api.crm.cases.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      caseNumber: 'CASE-001',
      status: 'active',
      priority: 'high',
      type: 'issue',
      ownerId: userId,
      contactId,
      description: 'Test case description',
    });
    expect(crmCase.caseNumber).toBe('CASE-001');
    expect(crmCase.id).toBeDefined();
  });

  it('should list all cases', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const cases = await api.crm.cases.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});
    expect(Array.isArray(cases)).toBe(true);
    expect(cases.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single case based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.cases.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: crmCase.id,
      value: { description: 'Updated case description' },
    });
    expect(updated.id).toBe(crmCase.id);
    expect(updated.description).toBe('Updated case description');
  });

  it('should remove a case and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.cases.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(crmCase.id);
    expect(response.success).toBe(true);
  });
});
