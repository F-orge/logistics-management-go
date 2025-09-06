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

describe('Warehouse management api', () => {
  let warehouse: ORPCOutputs['wms']['warehouse']['create'];

  it('should create a new warehouse', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    warehouse = await api.wms.warehouse.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Central Warehouse',
      address: '456 Warehouse Ave',
    });

    expect(warehouse.name).toBe('Central Warehouse');
    expect(warehouse.id).toBeDefined();
  });

  it('should list all warehouses', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const warehouses = await api.wms.warehouse.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});

    expect(Array.isArray(warehouses)).toBe(true);
    expect(warehouses.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single warehouse based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.wms.warehouse.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: warehouse.id,
      value: { address: '789 Updated Ave' },
    });

    expect(updated.id).toBe(warehouse.id);
    expect(updated.address).toBe('789 Updated Ave');
  });

  it('should remove a warehouse and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.wms.warehouse.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(warehouse.id);

    expect(response.success).toBe(true);
  });
});
