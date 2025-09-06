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

describe('Inventory Level management api', () => {
  let inventoryLevel: ORPCOutputs['ims']['inventoryLevel']['create'];
  let productId: string;
  let warehouseId: string;

  it('should create a new inventory level', async () => {
    const { token } = await signInJohnDoe();
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
      sku: 'TP-001',
      description: 'Test product for inventory level',
      status: '',
      clientId: null,
      supplierId: null,
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
      name: 'Test Warehouse',
      address: '123 Test St',
    });
    warehouseId = warehouse.id;

    inventoryLevel = await api.ims.inventoryLevel.create.callable({
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
      locationId: null,
      batchId: null,
      quantityOnHand: 100,
      quantityCommitted: 10,
      quantityAvailable: 90,
    });

    expect(inventoryLevel.productId).toBe(productId);
    expect(inventoryLevel.warehouseId).toBe(warehouseId);
    expect(inventoryLevel.id).toBeDefined();
  });

  it('should list all inventory levels', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const inventoryLevels = await api.ims.inventoryLevel.list.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({});

    expect(Array.isArray(inventoryLevels)).toBe(true);
    expect(inventoryLevels.length).toBeGreaterThanOrEqual(0);
  });

  it('should update a single inventory level based on its id', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const updated = await api.ims.inventoryLevel.update.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })({
      id: inventoryLevel.id,
      value: { quantityOnHand: 120, quantityAvailable: 110 },
    });

    expect(updated.id).toBe(inventoryLevel.id);
    expect(updated.quantityOnHand).toBe(120);
    expect(updated.quantityAvailable).toBe(110);
  });

  it('should remove an inventory level and return an object of {"success":true}', async () => {
    const { token } = await signInJohnDoe();
    const request = new Request('http://example.com', {
      headers: { Authorization: `Bearer ${token}` },
    });
    const response = await api.ims.inventoryLevel.remove.callable({
      context: {
        request,
        user: null,
        session: null,
        auth: globalThis.betterAuth,
        db: globalThis.dbClient,
      },
    })(inventoryLevel.id);

    expect(response.success).toBe(true);
  });
});
