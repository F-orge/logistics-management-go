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

describe('Contact management api', () => {
  let contact: ORPCOutputs['crm']['contacts']['create'];
  let companyId: string;

  it('should create a new company for contact', async () => {
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
      name: 'Contact Corp',
      street: '456 Side St',
      city: 'Smallville',
      state: 'State',
      postalCode: '67890',
      country: 'Freedonia',
      phoneNumber: '+1987654321',
      industry: 'Services',
      website: 'https://contactcorp.com',
      annualRevenue: '500000.00',
      ownerId: userId,
    });
    companyId = company.id;
    expect(companyId).toBeDefined();
  });

  it('should create a new contact', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    contact = await api.crm.contacts.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Jane Doe',
      email: 'jane.doe@email.com',
      phoneNumber: '+12345678901',
      jobTitle: 'Manager',
      companyId,
      ownerId: userId,
    });
    expect(contact.name).toBe('Jane Doe');
    expect(contact.id).toBeDefined();
  });

  it('should list all contacts', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const contacts = await api.crm.contacts.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});
    expect(Array.isArray(contacts)).toBe(true);
    expect(contacts.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single contact based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.contacts.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: contact.id,
      value: { jobTitle: 'Director' },
    });
    expect(updated.id).toBe(contact.id);
    expect(updated.jobTitle).toBe('Director');
  });

  it('should remove a contact and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.contacts.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(contact.id);
    expect(response.success).toBe(true);
  });
});
