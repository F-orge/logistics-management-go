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

describe('Invoice management api', () => {
  let invoice: ORPCOutputs['crm']['invoices']['create'];
  let opportunityId: string;

  it('should create a new opportunity for invoice', async () => {
    const { token, userId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const opportunity = await api.crm.opportunities.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Invoice Deal',
      stage: 'closed-won',
      dealValue: '10000.00',
      probability: 1.0,
      expectedCloseDate: new Date(Date.now()),
      source: 'Referral',
      ownerId: userId,
      companyId: null,
      contactId: null,
      lostReason: null,
      campaignId: null,
    });
    opportunityId = opportunity.id;
    expect(opportunityId).toBeDefined();
  });

  it('should create a new invoice', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    invoice = await api.crm.invoices.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      opportunityId,
      status: 'issued',
      total: '10000.0',
      issueDate: new Date(Date.now()),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      paymentMethod: 'bank_transfer',
      sentAt: null,
      paidAt: null,
    });
    expect(invoice.status).toBe('issued');
    expect(invoice.id).toBeDefined();
  });

  it('should list all invoices', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const invoices = await api.crm.invoices.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});
    expect(Array.isArray(invoices)).toBe(true);
    expect(invoices.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single invoice based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.crm.invoices.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: invoice.id,
      value: { status: 'paid' },
    });
    expect(updated.id).toBe(invoice.id);
    expect(updated.status).toBe('paid');
  });

  it('should remove an invoice and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.crm.invoices.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(invoice.id);
    expect(response.success).toBe(true);
  });
});
