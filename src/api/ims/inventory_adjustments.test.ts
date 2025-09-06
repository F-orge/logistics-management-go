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

describe('Inventory Adjustment management api', () => {
  let adjustment: ORPCOutputs['ims']['adjustments']['create'];
  let productId: string;
  let warehouseId: string;
  let userId: string;

  it('should create a new inventory adjustment', async () => {
    const { token, userId: signedInUserId } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });

    // Create a product
    const product = await api.ims.products.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Test Product',
      sku: 'TP-002',
      description: 'Test product for adjustment',
      status: '',
      supplierId: null,
      clientId: null,
    });
    productId = product.id;

    // Create a warehouse
    const warehouse = await api.wms.warehouse.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      name: 'Adjustment Warehouse',
      address: '456 Adjustment St',
    });
    warehouseId = warehouse.id;

    userId = signedInUserId;

    adjustment = await api.ims.adjustments.create.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      productId,
      warehouseId,
      userId,
      quantityChange: 5,
      reason: 'cycle_count',
      notes: 'Initial adjustment',
    });

    expect(adjustment.productId).toBe(productId);
    expect(adjustment.warehouseId).toBe(warehouseId);
    expect(adjustment.userId).toBe(userId);
    expect(adjustment.id).toBeDefined();
  });

  it('should list all inventory adjustments', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const adjustments = await api.ims.adjustments.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});

    expect(Array.isArray(adjustments)).toBe(true);
    expect(adjustments.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single inventory adjustment based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.ims.adjustments.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: adjustment.id,
      value: { notes: 'Updated adjustment note' },
    });

    expect(updated.id).toBe(adjustment.id);
    expect(updated.notes).toBe('Updated adjustment note');
  });

  it('should remove an inventory adjustment and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.ims.adjustments.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(adjustment.id);

    expect(response.success).toBe(true);
  });
});
