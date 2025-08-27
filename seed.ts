/**
 * Development seed script for PocketBase
 *
 * Prerequisites:
 * - PocketBase server running on localhost:8090
 * - Superuser account with email: seeder@email.com, password: password123
 * - @faker-js/faker installed: bun add @faker-js/faker
 *
 * Usage:
 * bun run seed.ts
 */

import { faker } from '@faker-js/faker';
import PocketBase from 'pocketbase';
import type { TypedPocketBase } from './src/pocketbase/types.js';

// Development configuration
const POCKETBASE_URL = 'http://127.0.0.1:8090';
const SUPERUSER_EMAIL = 'seeder@email.com';
const SUPERUSER_PASSWORD = 'password123';

class Seeder {
  private pb: TypedPocketBase;
  private seedSummary: Record<string, { created: number; updated: number }> =
    {};

  constructor() {
    this.pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;
  }

  async authenticate() {
    try {
      await this.pb
        .collection('_superusers')
        .authWithPassword(SUPERUSER_EMAIL, SUPERUSER_PASSWORD);
      console.log('✅ Authenticated as superuser');
    } catch (error) {
      console.error('❌ Failed to authenticate as superuser:', error);
      throw error;
    }
  }

  async findOneByFilter(collectionName: string, filter: string) {
    try {
      const result = await this.pb.collection(collectionName).getList(1, 1, {
        filter,
      });
      return result.items[0] || null;
    } catch {
      return null;
    }
  }

  async createOrUpdate(
    collectionName: string,
    uniqueFilter: string,
    payload: any,
  ) {
    const existing = await this.findOneByFilter(collectionName, uniqueFilter);

    if (!this.seedSummary[collectionName]) {
      this.seedSummary[collectionName] = { created: 0, updated: 0 };
    }

    try {
      if (existing) {
        const updated = await this.pb
          .collection(collectionName)
          .update(existing.id, payload);
        this.seedSummary[collectionName].updated++;
        return updated;
      } else {
        const created = await this.pb
          .collection(collectionName)
          .create(payload);
        this.seedSummary[collectionName].created++;
        return created;
      }
    } catch (error: any) {
      console.warn(
        `⚠️  Failed to create/update ${collectionName}:`,
        error?.message || error,
      );
      // Log detailed validation errors if available
      if (error?.data) {
        console.warn('   Validation errors:', error.data);
      }
      return null;
    }
  }

  generateTokenKey() {
    try {
      return crypto.randomUUID();
    } catch {
      return `token_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }
  }

  async seedUsers() {
    console.log('🌱 Seeding users...');

    const users = [
      {
        email: 'admin@logistics.com',
        password: 'admin123',
        passwordConfirm: 'admin123',
        name: 'System Administrator',
        verified: true,
        emailVisibility: true,
      },
      {
        email: 'manager@logistics.com',
        password: 'manager123',
        passwordConfirm: 'manager123',
        name: 'Operations Manager',
        verified: true,
        emailVisibility: true,
      },
      {
        email: 'driver@logistics.com',
        password: 'driver123',
        passwordConfirm: 'driver123',
        name: 'Delivery Driver',
        verified: true,
        emailVisibility: false,
      },
    ];

    const createdUsers = [];
    for (const user of users) {
      const result = await this.createOrUpdate(
        'users',
        `email = "${user.email}"`,
        user,
      );
      if (result) createdUsers.push(result);
    }

    return createdUsers;
  }

  async seedOrganizations(users: any[]) {
    console.log('🌱 Seeding organizations...');

    if (users.length === 0) {
      console.warn('⚠️  Skipping organizations - no users available');
      return [];
    }

    const orgs = [
      {
        name: 'Logistics Corp',
        owner: users[0]?.id,
      },
      {
        name: 'Express Delivery Ltd',
        owner: users[1]?.id || users[0]?.id,
      },
    ];

    const createdOrgs = [];
    for (const org of orgs) {
      if (org.owner) {
        const result = await this.createOrUpdate(
          'org_organization',
          `name = "${org.name}"`,
          org,
        );
        if (result) createdOrgs.push(result);
      }
    }

    return createdOrgs;
  }

  async seedRoles(organizations: any[]) {
    console.log('🌱 Seeding roles...');

    const roles = [
      {
        name: 'Admin',
        description: 'Full system access',
        organization: organizations[0]?.id,
      },
      {
        name: 'Manager',
        description: 'Operations management',
        organization: organizations[0]?.id,
      },
      {
        name: 'Driver',
        description: 'Delivery operations',
        organization: organizations[0]?.id,
      },
      {
        name: 'Warehouse Staff',
        description: 'Inventory management',
        organization: organizations[0]?.id,
      },
    ];

    const createdRoles = [];
    for (const role of roles) {
      if (role.organization) {
        const result = await this.createOrUpdate(
          'org_roles',
          `name = "${role.name}" && organization = "${role.organization}"`,
          role,
        );
        if (result) createdRoles.push(result);
      }
    }

    return createdRoles;
  }

  async seedTeams(organizations: any[]) {
    console.log('🌱 Seeding teams...');

    const teams = [
      {
        name: 'Operations Team',
        description: 'Main operations team',
        organization: organizations[0]?.id,
      },
      {
        name: 'Delivery Team',
        description: 'Delivery drivers and coordinators',
        organization: organizations[0]?.id,
      },
      {
        name: 'Warehouse Team',
        description: 'Inventory and warehouse management',
        organization: organizations[0]?.id,
      },
    ];

    const createdTeams = [];
    for (const team of teams) {
      if (team.organization) {
        const result = await this.createOrUpdate(
          'org_teams',
          `name = "${team.name}" && organization = "${team.organization}"`,
          team,
        );
        if (result) createdTeams.push(result);
      }
    }

    return createdTeams;
  }

  async seedAddresses() {
    console.log('🌱 Seeding addresses...');

    const addresses = [];
    for (let i = 0; i < 10; i++) {
      addresses.push({
        address_line_1: faker.location.streetAddress(),
        address_line_2: faker.location.secondaryAddress(),
        city: faker.location.city(),
        state: faker.location.state(),
        postal_code: faker.location.zipCode(),
        type: faker.helpers.arrayElement([
          'shipping',
          'billing',
          'warehouse',
          'office',
        ]),
        is_validated: faker.datatype.boolean(),
      });
    }

    const createdAddresses = [];
    for (const address of addresses) {
      const result = await this.createOrUpdate(
        'lms_addresses',
        `address_line_1 = "${address.address_line_1}" && city = "${address.city}"`,
        address,
      );
      if (result) createdAddresses.push(result);
    }

    return createdAddresses;
  }

  async seedCompanies() {
    console.log('🌱 Seeding companies...');

    const companies = [];
    for (let i = 0; i < 5; i++) {
      companies.push({
        name: faker.company.name(),
        description: faker.company.catchPhrase(),
        email: faker.internet.email(),
        phone_number: faker.phone.number({ style: 'international' }),
        website: faker.internet.url(),
        industry: faker.helpers.arrayElement([
          'Technology',
          'Manufacturing',
          'Retail',
          'Healthcare',
          'Finance',
        ]),
      });
    }

    const createdCompanies = [];
    for (const company of companies) {
      const result = await this.createOrUpdate(
        'crm_companies',
        `name = "${company.name}"`,
        company,
      );
      if (result) createdCompanies.push(result);
    }

    return createdCompanies;
  }

  async seedContacts(companies: any[]) {
    console.log('🌱 Seeding contacts...');

    const contacts = [];
    for (let i = 0; i < 15; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      contacts.push({
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone_number: faker.phone.number({ style: 'international' }),
        job_title: faker.person.jobTitle(),
        company: faker.helpers.arrayElement(companies)?.id,
        status: faker.helpers.arrayElement([
          'lead',
          'prospect',
          'customer',
          'inactive',
        ]),
        lead_source: faker.helpers.arrayElement([
          'Website',
          'Referral',
          'Cold Call',
          'Social Media',
        ]),
      });
    }

    const createdContacts = [];
    for (const contact of contacts) {
      const result = await this.createOrUpdate(
        'crm_contacts',
        `email = "${contact.email}"`,
        contact,
      );
      if (result) createdContacts.push(result);
    }

    return createdContacts;
  }

  async seedTransportProviders(addresses: any[]) {
    console.log('🌱 Seeding transport providers...');

    const providers = [
      {
        company_name: 'FastTrack Express',
        type: 'express',
        contact_person: faker.person.fullName(),
        email: 'contact@fasttrack.com',
        phone_number: faker.phone.number({ style: 'international' }),
        address: addresses[0]?.id,
        is_active: true,
        performance_rating: 4.5,
      },
      {
        company_name: 'Global Freight Solutions',
        type: 'freight',
        contact_person: faker.person.fullName(),
        email: 'info@globalfreight.com',
        phone_number: faker.phone.number({ style: 'international' }),
        address: addresses[1]?.id,
        is_active: true,
        performance_rating: 4.2,
      },
      {
        company_name: 'City Courier Service',
        type: 'courier',
        contact_person: faker.person.fullName(),
        email: 'dispatch@citycourier.com',
        phone_number: faker.phone.number({ style: 'international' }),
        address: addresses[2]?.id,
        is_active: true,
        performance_rating: 4.0,
      },
    ];

    const createdProviders = [];
    for (const provider of providers) {
      if (provider.address) {
        const result = await this.createOrUpdate(
          'lms_transport_providers',
          `company_name = "${provider.company_name}"`,
          provider,
        );
        if (result) createdProviders.push(result);
      }
    }

    return createdProviders;
  }

  async seedShippingServices() {
    console.log('🌱 Seeding shipping services...');

    const services = [
      {
        name: 'Standard Delivery',
        type: 'standard',
        description: 'Regular delivery service, 3-5 business days',
        delivery_time_min: 3,
        delivery_time_max: 5,
        max_weight: 50,
        is_active: true,
      },
      {
        name: 'Express Delivery',
        type: 'express',
        description: 'Fast delivery service, 1-2 business days',
        delivery_time_min: 1,
        delivery_time_max: 2,
        max_weight: 25,
        is_active: true,
      },
      {
        name: 'Overnight Express',
        type: 'overnight',
        description: 'Next business day delivery',
        delivery_time_min: 1,
        delivery_time_max: 1,
        max_weight: 10,
        is_active: true,
      },
    ];

    const createdServices = [];
    for (const service of services) {
      const result = await this.createOrUpdate(
        'lms_shipping_services',
        `name = "${service.name}"`,
        service,
      );
      if (result) createdServices.push(result);
    }

    return createdServices;
  }

  async seedWarehouses(addresses: any[]) {
    console.log('🌱 Seeding warehouses...');

    const warehouses = [
      {
        name: 'Main Distribution Center',
        code: 'DC001',
        type: 'distribution',
        address: addresses[3]?.id,
        capacity: 10000,
        is_active: true,
      },
      {
        name: 'Regional Fulfillment Hub',
        code: 'FH001',
        type: 'fulfillment',
        address: addresses[4]?.id,
        capacity: 5000,
        is_active: true,
      },
    ];

    const createdWarehouses = [];
    for (const warehouse of warehouses) {
      if (warehouse.address) {
        const result = await this.createOrUpdate(
          'lms_warehouses',
          `code = "${warehouse.code}"`,
          warehouse,
        );
        if (result) createdWarehouses.push(result);
      }
    }

    return createdWarehouses;
  }

  async seedShipments(
    users: any[],
    addresses: any[],
    companies: any[],
    contacts: any[],
    services: any[],
  ) {
    console.log('🌱 Seeding shipments...');

    // Check if we have required data
    if (users.length === 0 || addresses.length === 0 || services.length === 0) {
      console.warn(
        '⚠️  Skipping shipments - missing required data (users, addresses, or services)',
      );
      return [];
    }

    const shipments = [];
    for (let i = 0; i < 8; i++) {
      const trackingNumber = `TRK${Date.now()}${i.toString().padStart(3, '0')}`;
      shipments.push({
        tracking_number: trackingNumber,
        status: faker.helpers.arrayElement([
          'created',
          'picked_up',
          'in_transit',
          'out_for_delivery',
          'delivered',
        ]),
        primary_transport_mode: faker.helpers.arrayElement([
          'air',
          'sea',
          'road',
          'rail',
        ]),
        total_weight: faker.number.float({
          min: 0.5,
          max: 50,
          fractionDigits: 2,
        }),
        currency: 'USD',
        shipping_cost: faker.number.float({
          min: 10,
          max: 500,
          fractionDigits: 2,
        }),
        created_by: faker.helpers.arrayElement(users)?.id,
        sender_address: faker.helpers.arrayElement(addresses)?.id,
        receiver_address: faker.helpers.arrayElement(addresses)?.id,
        sender_company:
          companies.length > 0
            ? faker.helpers.arrayElement(companies)?.id
            : undefined,
        receiver_company:
          companies.length > 0
            ? faker.helpers.arrayElement(companies)?.id
            : undefined,
        sender_contact:
          contacts.length > 0
            ? faker.helpers.arrayElement(contacts)?.id
            : undefined,
        receiver_contact:
          contacts.length > 0
            ? faker.helpers.arrayElement(contacts)?.id
            : undefined,
        shipping_service: faker.helpers.arrayElement(services)?.id,
        pickup_date: faker.date.recent({ days: 7 }).toISOString(),
        estimated_delivery_date: faker.date
          .future({ years: 0.02 })
          .toISOString(), // ~7 days
      });
    }

    const createdShipments = [];
    for (const shipment of shipments) {
      if (
        shipment.created_by &&
        shipment.sender_address &&
        shipment.receiver_address &&
        shipment.shipping_service
      ) {
        const result = await this.createOrUpdate(
          'lms_shipments',
          `tracking_number = "${shipment.tracking_number}"`,
          shipment,
        );
        if (result) createdShipments.push(result);
      }
    }

    return createdShipments;
  }

  async seedPackages(shipments: any[]) {
    console.log('🌱 Seeding packages...');

    const packages: any[] = [];
    shipments.forEach((shipment, shipmentIndex) => {
      // Create 1-3 packages per shipment
      const packageCount = faker.number.int({ min: 1, max: 3 });
      for (let i = 0; i < packageCount; i++) {
        packages.push({
          package_number: `PKG${shipmentIndex + 1}-${i + 1}`,
          shipment: shipment.id,
          type: faker.helpers.arrayElement([
            'box',
            'envelope',
            'tube',
            'pallet',
            'crate',
            'bag',
          ]),
          weight: faker.number.float({ min: 0.1, max: 10, fractionDigits: 2 }),
          length: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
          width: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
          height: faker.number.float({ min: 5, max: 100, fractionDigits: 1 }),
          declared_value: faker.number.float({
            min: 10,
            max: 1000,
            fractionDigits: 2,
          }),
          description: faker.commerce.productDescription(),
        });
      }
    });

    const createdPackages = [];
    for (const pkg of packages) {
      const result = await this.createOrUpdate(
        'lms_packages',
        `package_number = "${pkg.package_number}"`,
        pkg,
      );
      if (result) createdPackages.push(result);
    }

    return createdPackages;
  }

  async seedDrivers() {
    console.log('🌱 Seeding drivers...');

    const drivers = [];
    for (let i = 0; i < 5; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      drivers.push({
        employee_id: `DRV${(i + 1).toString().padStart(3, '0')}`,
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone_number: faker.phone.number({ style: 'international' }),
        license_number: faker.vehicle.vrm(),
        hire_date: faker.date.past({ years: 3 }).toISOString().split('T')[0],
        status: faker.helpers.arrayElement(['active', 'inactive', 'on_leave']),
      });
    }

    const createdDrivers = [];
    for (const driver of drivers) {
      const result = await this.createOrUpdate(
        'tms_drivers',
        `employee_id = "${driver.employee_id}"`,
        driver,
      );
      if (result) createdDrivers.push(result);
    }

    return createdDrivers;
  }

  async seedVehicles() {
    console.log('🌱 Seeding vehicles...');

    const vehicles = [];
    for (let i = 0; i < 8; i++) {
      vehicles.push({
        vehicle_number: `VEH${(i + 1).toString().padStart(3, '0')}`,
        license_plate: faker.vehicle.vrm(),
        make: faker.vehicle.manufacturer(),
        model: faker.vehicle.model(),
        year: faker.date.past({ years: 10 }).toISOString().split('T')[0],
        vehicle_type: faker.helpers.arrayElement([
          'van',
          'truck',
          'trailer',
          'motorcycle',
          'car',
        ]),
        capacity_weight: faker.number.float({
          min: 500,
          max: 5000,
          fractionDigits: 0,
        }),
        capacity_volume: faker.number.float({
          min: 10,
          max: 100,
          fractionDigits: 1,
        }),
        status: faker.helpers.arrayElement([
          'active',
          'maintenance',
          'retired',
          'out-of-service',
        ]),
      });
    }

    const createdVehicles = [];
    for (const vehicle of vehicles) {
      const result = await this.createOrUpdate(
        'tms_vehicles',
        `vehicle_number = "${vehicle.vehicle_number}"`,
        vehicle,
      );
      if (result) createdVehicles.push(result);
    }

    return createdVehicles;
  }

  // Phase 1: Core Relationship Collections (Junction Tables)

  async seedTeamMembers(teams: any[], users: any[]) {
    console.log('🌱 Seeding team members...');

    if (teams.length === 0 || users.length === 0) {
      console.warn('⚠️  Skipping team members - missing teams or users');
      return [];
    }

    const teamMembers = [];

    // Add admin user to operations team
    if (teams[0] && users[0]) {
      teamMembers.push({
        team: teams[0].id,
        user: users[0].id, // admin
      });
    }

    // Add manager to operations and delivery teams
    if (teams[0] && teams[1] && users[1]) {
      teamMembers.push(
        {
          team: teams[0].id, // operations
          user: users[1].id, // manager
        },
        {
          team: teams[1].id, // delivery
          user: users[1].id, // manager
        },
      );
    }

    // Add driver to delivery team
    if (teams[1] && users[2]) {
      teamMembers.push({
        team: teams[1].id, // delivery
        user: users[2].id, // driver
      });
    }

    const createdTeamMembers = [];
    for (const member of teamMembers) {
      const result = await this.createOrUpdate(
        'org_team_members',
        `team = "${member.team}" && user = "${member.user}"`,
        member,
      );
      if (result) createdTeamMembers.push(result);
    }

    return createdTeamMembers;
  }

  async seedTeamRoles(teams: any[], roles: any[]) {
    console.log('🌱 Seeding team roles...');

    if (teams.length === 0 || roles.length === 0) {
      console.warn('⚠️  Skipping team roles - missing teams or roles');
      return [];
    }

    const teamRoles = [
      {
        team: teams[0]?.id, // operations team
        roles: roles[0]?.id, // admin role
      },
      {
        team: teams[0]?.id, // operations team
        roles: roles[1]?.id, // manager role
      },
      {
        team: teams[1]?.id, // delivery team
        roles: roles[1]?.id, // manager role
      },
      {
        team: teams[1]?.id, // delivery team
        roles: roles[2]?.id, // driver role
      },
      {
        team: teams[2]?.id, // warehouse team
        roles: roles[3]?.id, // warehouse staff role
      },
    ];

    const createdTeamRoles = [];
    for (const teamRole of teamRoles) {
      if (teamRole.team && teamRole.roles) {
        const result = await this.createOrUpdate(
          'org_team_roles',
          `team = "${teamRole.team}" && roles = "${teamRole.roles}"`,
          teamRole,
        );
        if (result) createdTeamRoles.push(result);
      }
    }

    return createdTeamRoles;
  }

  async seedRoleActions(roles: any[]) {
    console.log('🌱 Seeding role actions...');

    if (roles.length === 0) {
      console.warn('⚠️  Skipping role actions - missing roles');
      return [];
    }

    const roleActions: any[] = [];

    // Admin role - all permissions
    if (roles[0]) {
      ['create', 'read', 'update', 'delete'].forEach((action) => {
        roleActions.push({
          role: roles[0].id,
          action: action,
        });
      });
    }

    // Manager role - create, read, update
    if (roles[1]) {
      ['create', 'read', 'update'].forEach((action) => {
        roleActions.push({
          role: roles[1].id,
          action: action,
        });
      });
    }

    // Driver role - read, update (own records)
    if (roles[2]) {
      ['read', 'update'].forEach((action) => {
        roleActions.push({
          role: roles[2].id,
          action: action,
        });
      });
    }

    // Warehouse staff - read, update
    if (roles[3]) {
      ['read', 'update'].forEach((action) => {
        roleActions.push({
          role: roles[3].id,
          action: action,
        });
      });
    }

    const createdRoleActions = [];
    for (const roleAction of roleActions) {
      const result = await this.createOrUpdate(
        'org_role_actions',
        `role = "${roleAction.role}" && action = "${roleAction.action}"`,
        roleAction,
      );
      if (result) createdRoleActions.push(result);
    }

    return createdRoleActions;
  }

  async seedProducts() {
    console.log('🌱 Seeding products...');

    const products = [
      {
        name: 'Standard Shipping Box',
        sku: 'BOX-STD-001',
        description: 'Standard cardboard shipping box for general items',
        price: 2.99,
      },
      {
        name: 'Express Envelope',
        sku: 'ENV-EXP-001',
        description: 'Padded envelope for documents and small items',
        price: 1.49,
      },
      {
        name: 'Fragile Item Packaging',
        sku: 'PKG-FRAG-001',
        description: 'Specialized packaging for fragile items with bubble wrap',
        price: 5.99,
      },
      {
        name: 'Temperature Controlled Container',
        sku: 'CON-TEMP-001',
        description: 'Insulated container for temperature-sensitive items',
        price: 15.99,
      },
      {
        name: 'Oversized Item Crate',
        sku: 'CRT-OVER-001',
        description: 'Wooden crate for oversized and heavy items',
        price: 25.99,
      },
      {
        name: 'Insurance Coverage - Basic',
        sku: 'INS-BASIC-001',
        description: 'Basic insurance coverage up to $100',
        price: 3.0,
      },
      {
        name: 'Insurance Coverage - Premium',
        sku: 'INS-PREM-001',
        description: 'Premium insurance coverage up to $1000',
        price: 12.0,
      },
      {
        name: 'Signature Confirmation',
        sku: 'SVC-SIG-001',
        description: 'Signature required upon delivery',
        price: 2.5,
      },
    ];

    const createdProducts = [];
    for (const product of products) {
      const result = await this.createOrUpdate(
        'crm_products',
        `sku = "${product.sku}"`,
        product,
      );
      if (result) createdProducts.push(result);
    }

    return createdProducts;
  }

  async seedLeads() {
    console.log('🌱 Seeding leads...');

    const leads = [];
    for (let i = 0; i < 12; i++) {
      const firstName = faker.person.firstName();
      const lastName = faker.person.lastName();
      leads.push({
        first_name: firstName,
        last_name: lastName,
        email: faker.internet.email({ firstName, lastName }),
        phone_number: faker.phone.number({ style: 'international' }), // Use consistent format
        company_name: faker.company.name(),
        lead_status: faker.helpers.arrayElement([
          'new',
          'qualified',
          'contacted',
          'unqualified',
        ]),
        lead_source: faker.helpers.arrayElement([
          'Website',
          'Referral',
          'Cold Call',
          'Social Media',
          'Trade Show',
        ]),
        lead_score: faker.number.int({ min: 1, max: 100 }),
      });
    }

    const createdLeads = [];
    for (const lead of leads) {
      const result = await this.createOrUpdate(
        'crm_leads',
        `email = "${lead.email}"`,
        lead,
      );
      if (result) createdLeads.push(result);
    }

    return createdLeads;
  }

  // Phase 2: Business Workflow Collections

  async seedOpportunities(companies: any[], contacts: any[], leads: any[]) {
    console.log('🌱 Seeding opportunities...');

    if (companies.length === 0 && contacts.length === 0) {
      console.warn(
        '⚠️  Skipping opportunities - missing companies and contacts',
      );
      return [];
    }

    const opportunities = [];

    // Create opportunities from some leads (lead conversion)
    for (let i = 0; i < Math.min(5, leads.length); i++) {
      const lead = leads[i];
      if (lead) {
        opportunities.push({
          name: `${lead.company_name || 'Logistics'} - Shipping Services`,
          amount: faker.number.float({
            min: 1000,
            max: 50000,
            fractionDigits: 2,
          }),
          stage: faker.helpers.arrayElement([
            'prospecting',
            'qualification',
            'proposal',
            'closed-won',
            'closed-lost',
          ]),
          probability: faker.number.int({ min: 10, max: 90 }),
          close_date: faker.date
            .future({ years: 0.5 })
            .toISOString()
            .split('T')[0],
          company:
            companies.length > 0
              ? faker.helpers.arrayElement(companies)?.id
              : undefined,
          primary_contact:
            contacts.length > 0
              ? faker.helpers.arrayElement(contacts)?.id
              : undefined,
        });
      }
    }

    // Create additional opportunities from existing companies
    for (let i = 0; i < Math.min(8, companies.length); i++) {
      const company = companies[i];
      opportunities.push({
        name: `${company.name} - ${faker.helpers.arrayElement([
          'Express Delivery',
          'Freight Services',
          'Warehouse Solutions',
          'International Shipping',
        ])}`,
        amount: faker.number.float({
          min: 2000,
          max: 100000,
          fractionDigits: 2,
        }),
        stage: faker.helpers.arrayElement([
          'prospecting',
          'qualification',
          'proposal',
          'closed-won',
          'closed-lost',
        ]),
        probability: faker.number.int({ min: 15, max: 85 }),
        close_date: faker.date
          .future({ years: 0.5 })
          .toISOString()
          .split('T')[0],
        company: company.id,
        primary_contact: contacts.find((c) => c.company === company.id)?.id,
      });
    }

    const createdOpportunities = [];
    for (const opportunity of opportunities) {
      const result = await this.createOrUpdate(
        'crm_opportunities',
        `name = "${opportunity.name}"`,
        opportunity,
      );
      if (result) createdOpportunities.push(result);
    }

    return createdOpportunities;
  }

  async seedOpportunityProducts(opportunities: any[], products: any[]) {
    console.log('🌱 Seeding opportunity products...');

    if (opportunities.length === 0 || products.length === 0) {
      console.warn(
        '⚠️  Skipping opportunity products - missing opportunities or products',
      );
      return [];
    }

    const opportunityProducts: any[] = [];

    // Add 1-4 products to each opportunity
    opportunities.forEach((opportunity) => {
      const productCount = faker.number.int({ min: 1, max: 4 });
      const selectedProducts = faker.helpers.arrayElements(
        products,
        productCount,
      );

      selectedProducts.forEach((product) => {
        opportunityProducts.push({
          opportunity: opportunity.id,
          product: product.id,
          quantity: faker.number.int({ min: 1, max: 100 }),
          unit_price: product.price
            ? product.price *
              faker.number.float({ min: 0.8, max: 1.5, fractionDigits: 2 })
            : faker.number.float({ min: 10, max: 500, fractionDigits: 2 }),
        });
      });
    });

    const createdOpportunityProducts = [];
    for (const opportunityProduct of opportunityProducts) {
      const result = await this.createOrUpdate(
        'crm_opportunity_products',
        `opportunity = "${opportunityProduct.opportunity}" && product = "${opportunityProduct.product}"`,
        opportunityProduct,
      );
      if (result) createdOpportunityProducts.push(result);
    }

    return createdOpportunityProducts;
  }

  async seedCampaigns() {
    console.log('🌱 Seeding campaigns...');

    const campaigns = [
      {
        name: 'Q1 Express Delivery Promotion',
        description:
          'Promotional campaign for express delivery services targeting new customers',
        status: 'active',
        start_date: faker.date.recent({ days: 30 }).toISOString().split('T')[0],
        end_date: faker.date
          .future({ years: 0.25 })
          .toISOString()
          .split('T')[0],
        budget: 15000,
      },
      {
        name: 'Holiday Season Shipping Solutions',
        description:
          'Special holiday shipping packages and rates for retail clients',
        status: 'completed',
        start_date: faker.date.past({ years: 0.5 }).toISOString().split('T')[0],
        end_date: faker.date.recent({ days: 15 }).toISOString().split('T')[0],
        budget: 25000,
      },
      {
        name: 'International Freight Awareness',
        description:
          'Educational campaign about international freight services',
        status: 'planned',
        start_date: faker.date
          .future({ years: 0.1 })
          .toISOString()
          .split('T')[0],
        end_date: faker.date.future({ years: 0.3 }).toISOString().split('T')[0],
        budget: 8000,
      },
      {
        name: 'Warehouse Solutions for E-commerce',
        description:
          'Targeting e-commerce businesses with warehouse and fulfillment solutions',
        status: 'active',
        start_date: faker.date.recent({ days: 45 }).toISOString().split('T')[0],
        end_date: faker.date.future({ years: 0.2 }).toISOString().split('T')[0],
        budget: 20000,
      },
    ];

    const createdCampaigns = [];
    for (const campaign of campaigns) {
      const result = await this.createOrUpdate(
        'crm_campaigns',
        `name = "${campaign.name}"`,
        campaign,
      );
      if (result) createdCampaigns.push(result);
    }

    return createdCampaigns;
  }

  async seedCampaignContacts(campaigns: any[], contacts: any[]) {
    console.log('🌱 Seeding campaign contacts...');

    if (campaigns.length === 0 || contacts.length === 0) {
      console.warn(
        '⚠️  Skipping campaign contacts - missing campaigns or contacts',
      );
      return [];
    }

    const campaignContacts: any[] = [];

    // Assign contacts to campaigns
    campaigns.forEach((campaign) => {
      const contactCount = faker.number.int({ min: 3, max: 8 });
      const selectedContacts = faker.helpers.arrayElements(
        contacts,
        Math.min(contactCount, contacts.length),
      );

      selectedContacts.forEach((contact) => {
        const startDate = new Date(campaign.start_date);
        const endDate = new Date();
        // Ensure we have a valid date range
        const interactionDate =
          startDate <= endDate
            ? faker.date.between({ from: startDate, to: endDate })
            : faker.date.recent({ days: 30 });

        campaignContacts.push({
          campaign: campaign.id,
          contact: contact.id,
          status: faker.helpers.arrayElement([
            'sent',
            'opened',
            'clicked',
            'responded',
            'unsubscribe',
          ]),
          interaction_date: interactionDate.toISOString(),
        });
      });
    });

    const createdCampaignContacts = [];
    for (const campaignContact of campaignContacts) {
      const result = await this.createOrUpdate(
        'crm_campaign_contacts',
        `campaign = "${campaignContact.campaign}" && contact = "${campaignContact.contact}"`,
        campaignContact,
      );
      if (result) createdCampaignContacts.push(result);
    }

    return createdCampaignContacts;
  }

  async seedInteractions(contacts: any[], opportunities: any[]) {
    console.log('🌱 Seeding interactions...');

    if (contacts.length === 0) {
      console.warn('⚠️  Skipping interactions - missing contacts');
      return [];
    }

    const interactions = [];

    // Create interactions for contacts
    for (let i = 0; i < 25; i++) {
      const contact = faker.helpers.arrayElement(contacts);
      interactions.push({
        contact: contact.id,
        opportunity:
          opportunities.length > 0
            ? faker.helpers.arrayElement([...opportunities, null, null])?.id
            : undefined, // 50% chance of being linked to opportunity
        type: faker.helpers.arrayElement([
          'call',
          'email',
          'meeting',
          'chat',
          'note',
        ]),
        subject: faker.helpers.arrayElement([
          'Follow-up on shipping quote',
          'Meeting to discuss logistics needs',
          'Pricing inquiry for international delivery',
          'Customer service call',
          'Contract negotiation',
          'Service feedback discussion',
          'New service introduction',
        ]),
        description: faker.lorem.paragraphs(2),
        interaction_date: faker.date.recent({ days: 90 }).toISOString(),
      });
    }

    const createdInteractions = [];
    for (const interaction of interactions) {
      const result = await this.createOrUpdate(
        'crm_interactions',
        `contact = "${interaction.contact}" && type = "${interaction.type}" && interaction_date = "${interaction.interaction_date}"`,
        interaction,
      );
      if (result) createdInteractions.push(result);
    }

    return createdInteractions;
  }

  // Phase 3: Logistics Enhancement Collections

  async seedPricingZones() {
    console.log('🌱 Seeding pricing zones...');

    const zones = [
      { name: 'Domestic Zone 1', zone_code: 'DZ1' },
      { name: 'Domestic Zone 2', zone_code: 'DZ2' },
      { name: 'Domestic Zone 3', zone_code: 'DZ3' },
      { name: 'International Zone A', zone_code: 'IZA' },
      { name: 'International Zone B', zone_code: 'IZB' },
      { name: 'International Zone C', zone_code: 'IZC' },
      { name: 'Express Zone', zone_code: 'EXP' },
      { name: 'Economy Zone', zone_code: 'ECO' },
    ];

    const createdZones = [];
    for (const zone of zones) {
      const result = await this.createOrUpdate(
        'lms_pricing_zones',
        `zone_code = "${zone.zone_code}"`,
        zone,
      );
      if (result) createdZones.push(result);
    }

    return createdZones;
  }

  async seedPricingZoneCountries(zones: any[]) {
    console.log('🌱 Seeding pricing zone countries...');

    if (zones.length === 0) {
      console.warn('⚠️  Skipping pricing zone countries - missing zones');
      return [];
    }

    // Map countries to zones
    const zoneCountries: any[] = [];

    // Domestic zones
    const domesticZones = zones.filter((z) => z.zone_code.startsWith('DZ'));
    if (domesticZones[0]) {
      ['US', 'CA'].forEach((country) => {
        zoneCountries.push({
          pricing_zone: domesticZones[0].id,
          country_code: country,
        });
      });
    }

    if (domesticZones[1]) {
      ['MX', 'GT', 'BZ'].forEach((country) => {
        zoneCountries.push({
          pricing_zone: domesticZones[1].id,
          country_code: country,
        });
      });
    }

    // International zones
    const intlZones = zones.filter((z) => z.zone_code.startsWith('IZ'));
    if (intlZones[0]) {
      // Zone A - Europe
      ['GB', 'FR', 'DE', 'IT', 'ES', 'NL'].forEach((country) => {
        zoneCountries.push({
          pricing_zone: intlZones[0].id,
          country_code: country,
        });
      });
    }

    if (intlZones[1]) {
      // Zone B - Asia Pacific
      ['JP', 'CN', 'KR', 'AU', 'SG', 'HK'].forEach((country) => {
        zoneCountries.push({
          pricing_zone: intlZones[1].id,
          country_code: country,
        });
      });
    }

    if (intlZones[2]) {
      // Zone C - Rest of World
      ['BR', 'AR', 'ZA', 'IN', 'RU', 'EG'].forEach((country) => {
        zoneCountries.push({
          pricing_zone: intlZones[2].id,
          country_code: country,
        });
      });
    }

    const createdZoneCountries = [];
    for (const zoneCountry of zoneCountries) {
      const result = await this.createOrUpdate(
        'lms_pricing_zone_countries',
        `pricing_zone = "${zoneCountry.pricing_zone}" && country_code = "${zoneCountry.country_code}"`,
        zoneCountry,
      );
      if (result) createdZoneCountries.push(result);
    }

    return createdZoneCountries;
  }

  async seedPricingRates(zones: any[], services: any[]) {
    console.log('🌱 Seeding pricing rates...');

    if (zones.length === 0 || services.length === 0) {
      console.warn('⚠️  Skipping pricing rates - missing zones or services');
      return [];
    }

    const rates: any[] = [];

    // Create rates for each service and zone combination
    services.forEach((service) => {
      zones.forEach((originZone, originIndex) => {
        zones.forEach((destZone, destIndex) => {
          if (originIndex !== destIndex) {
            // Don't create rates for same origin/destination
            const baseMultiplier = destZone.zone_code.startsWith('IZ')
              ? 2.5
              : 1.0;
            const serviceMultiplier =
              service.type === 'express'
                ? 1.8
                : service.type === 'overnight'
                  ? 2.5
                  : 1.0;

            rates.push({
              shipping_service: service.id,
              origin_zone: originZone.id,
              destination_zone: destZone.id,
              weight_min: 0.1, // Set minimum weight to 0.1 instead of 0
              weight_max: 50,
              base_rate:
                faker.number.float({ min: 5, max: 25, fractionDigits: 2 }) *
                baseMultiplier *
                serviceMultiplier,
              per_kg_rate:
                faker.number.float({ min: 1, max: 8, fractionDigits: 2 }) *
                baseMultiplier *
                serviceMultiplier,
              fuel_surcharge_rate: faker.number.float({
                min: 0.5,
                max: 2.0,
                fractionDigits: 2,
              }),
              effective_date: faker.date
                .past({ years: 0.5 })
                .toISOString()
                .split('T')[0],
              expiry_date: faker.date
                .future({ years: 1 })
                .toISOString()
                .split('T')[0],
            });
          }
        });
      });
    });

    const createdRates = [];
    for (const rate of rates) {
      const result = await this.createOrUpdate(
        'lms_pricing_rates',
        `shipping_service = "${rate.shipping_service}" && origin_zone = "${rate.origin_zone}" && destination_zone = "${rate.destination_zone}"`,
        rate,
      );
      if (result) createdRates.push(result);
    }

    return createdRates;
  }

  async seedProviderServices(providers: any[]) {
    console.log('🌱 Seeding provider services...');

    if (providers.length === 0) {
      console.warn('⚠️  Skipping provider services - missing providers');
      return [];
    }

    const providerServices: any[] = [];

    providers.forEach((provider) => {
      // Each provider offers multiple services
      const serviceTypes = [
        'standard',
        'express',
        'overnight',
        'economy',
        'freight',
      ];
      const transportModes = ['air', 'sea', 'road', 'rail'];

      for (let i = 0; i < 3; i++) {
        // 3 services per provider
        providerServices.push({
          provider: provider.id,
          name: `${provider.company_name} ${faker.helpers.arrayElement([
            'Express',
            'Priority',
            'Economy',
            'Freight',
            'Next Day',
          ])}`,
          type: faker.helpers.arrayElement(serviceTypes),
          transport_mode: faker.helpers.arrayElement(transportModes),
          transit_time_min: faker.number.int({ min: 1, max: 5 }),
          transit_time_max: faker.number.int({ min: 3, max: 10 }),
          max_weight: faker.number.float({
            min: 10,
            max: 100,
            fractionDigits: 1,
          }),
          cutoff_time: `${faker.number.int({ min: 9, max: 17 })}:00:00`,
          tracking_available: faker.datatype.boolean(0.8), // 80% have tracking
          insurance_available: faker.datatype.boolean(0.7), // 70% have insurance
          is_active: faker.datatype.boolean(0.9), // 90% active
        });
      }
    });

    const createdProviderServices = [];
    for (const service of providerServices) {
      const result = await this.createOrUpdate(
        'lms_transport_provider_services',
        `provider = "${service.provider}" && name = "${service.name}"`,
        service,
      );
      if (result) createdProviderServices.push(result);
    }

    return createdProviderServices;
  }

  async seedTrackingEvents(shipments: any[]) {
    console.log('🌱 Seeding tracking events...');

    if (shipments.length === 0) {
      console.warn('⚠️  Skipping tracking events - missing shipments');
      return [];
    }

    const trackingEvents: any[] = [];

    // Create realistic tracking timeline for each shipment
    shipments.forEach((shipment) => {
      const events = [];
      let currentDate = new Date(
        shipment.pickup_date || faker.date.recent({ days: 10 }),
      );

      // Always start with 'created'
      events.push({
        type: 'created',
        description: 'Shipment created and label generated',
        date: new Date(currentDate.getTime() - 24 * 60 * 60 * 1000), // 1 day before pickup
      });

      // Add pickup event
      events.push({
        type: 'picked_up',
        description: 'Package picked up from sender',
        date: new Date(currentDate),
      });

      // Add transit events based on shipment status
      if (
        ['in_transit', 'out_for_delivery', 'delivered', 'exception'].includes(
          shipment.status,
        )
      ) {
        currentDate = new Date(
          currentDate.getTime() +
            faker.number.int({ min: 4, max: 24 }) * 60 * 60 * 1000,
        );
        events.push({
          type: 'departed',
          description: 'Departed from origin facility',
          date: new Date(currentDate),
        });

        currentDate = new Date(
          currentDate.getTime() +
            faker.number.int({ min: 12, max: 48 }) * 60 * 60 * 1000,
        );
        events.push({
          type: 'arrived',
          description: 'Arrived at sorting facility',
          date: new Date(currentDate),
        });
      }

      if (['out_for_delivery', 'delivered'].includes(shipment.status)) {
        currentDate = new Date(
          currentDate.getTime() +
            faker.number.int({ min: 2, max: 12 }) * 60 * 60 * 1000,
        );
        events.push({
          type: 'out_for_delivery',
          description: 'Out for delivery',
          date: new Date(currentDate),
        });
      }

      if (shipment.status === 'delivered') {
        currentDate = new Date(
          currentDate.getTime() +
            faker.number.int({ min: 1, max: 8 }) * 60 * 60 * 1000,
        );
        events.push({
          type: 'delivered',
          description: 'Package delivered successfully',
          date: new Date(currentDate),
        });
      }

      if (shipment.status === 'exception') {
        events.push({
          type: 'exception',
          description: faker.helpers.arrayElement([
            'Delivery attempted - recipient not available',
            'Package damaged in transit',
            'Incorrect address',
            'Customs delay',
          ]),
          date: new Date(
            currentDate.getTime() +
              faker.number.int({ min: 1, max: 24 }) * 60 * 60 * 1000,
          ),
        });
      }

      // Convert events to trackingEvents
      events.forEach((event) => {
        trackingEvents.push({
          shipment: shipment.id,
          type: event.type,
          description: event.description,
          location: null, // Will be populated with coordinates if needed
        });
      });
    });

    const createdTrackingEvents = [];
    for (const event of trackingEvents) {
      const result = await this.createOrUpdate(
        'lms_tracking_events',
        `shipment = "${event.shipment}" && type = "${event.type}"`,
        event,
      );
      if (result) createdTrackingEvents.push(result);
    }

    return createdTrackingEvents;
  }

  async seedWarehouseInventories(
    warehouses: any[],
    packages: any[],
    shipments: any[],
  ) {
    console.log('🌱 Seeding warehouse inventories...');

    if (
      warehouses.length === 0 ||
      (packages.length === 0 && shipments.length === 0)
    ) {
      console.warn(
        '⚠️  Skipping warehouse inventories - missing warehouses or packages/shipments',
      );
      return [];
    }

    const inventories: any[] = [];

    // Create inventory records for packages that go through warehouses
    packages.forEach((pkg) => {
      const warehouse = faker.helpers.arrayElement(warehouses);
      const shipment = shipments.find((s) => s.id === pkg.shipment);

      if (warehouse && shipment) {
        const statuses = ['received', 'stored', 'picked', 'shipped'];
        const status = faker.helpers.arrayElement(statuses);

        inventories.push({
          warehouse: warehouse.id,
          package: pkg.id,
          shipment: shipment.id,
          status: status,
          location_code: `${warehouse.code}-${faker.string.alpha({
            length: 2,
            casing: 'upper',
          })}-${faker.number
            .int({ min: 1, max: 99 })
            .toString()
            .padStart(2, '0')}`,
          arrived_at:
            status !== 'shipped'
              ? faker.date.recent({ days: 5 }).toISOString()
              : undefined,
          departed_at:
            status === 'shipped'
              ? faker.date.recent({ days: 2 }).toISOString()
              : undefined,
        });
      }
    });

    const createdInventories = [];
    for (const inventory of inventories) {
      const result = await this.createOrUpdate(
        'lms_warehouse_inventories',
        `warehouse = "${inventory.warehouse}" && package = "${inventory.package}"`,
        inventory,
      );
      if (result) createdInventories.push(result);
    }

    return createdInventories;
  }

  async seedProviderPerformance(providers: any[], shipments: any[]) {
    console.log('🌱 Seeding provider performance...');

    if (providers.length === 0 || shipments.length === 0) {
      console.warn(
        '⚠️  Skipping provider performance - missing providers or shipments',
      );
      return [];
    }

    const performanceRecords: any[] = [];
    const usedCombinations = new Set<string>(); // Track provider+shipment combinations

    // Create one performance record per unique provider-shipment combination
    providers.forEach((provider) => {
      const availableShipments = shipments.filter(
        (s) => !usedCombinations.has(`${provider.id}-${s.id}`),
      );
      const providerShipments = faker.helpers.arrayElements(
        availableShipments,
        {
          min: Math.min(1, availableShipments.length),
          max: Math.min(3, availableShipments.length),
        },
      );

      providerShipments.forEach((shipment) => {
        usedCombinations.add(`${provider.id}-${shipment.id}`);

        performanceRecords.push({
          provider: provider.id,
          shipment: shipment.id,
          metric_type: faker.helpers.arrayElement([
            'on_time_delivery',
            'damage_rate',
            'cost_efficiency',
            'customer_satisfaction',
          ]),
          metric_value: faker.number.float({
            min: 70,
            max: 99,
            fractionDigits: 1,
          }),
          measurement_date: faker.date
            .past({ years: 1 })
            .toISOString()
            .split('T')[0],
          delivery_time_days: faker.number.int({ min: 1, max: 30 }),
          on_time_delivery: faker.datatype.boolean({ probability: 0.85 }),
          damage_rate: faker.number.float({
            min: 0,
            max: 0.05,
            fractionDigits: 4,
          }),
          cost_efficiency: faker.number.float({
            min: 0.7,
            max: 1.2,
            fractionDigits: 2,
          }),
          customer_rating: faker.number.float({
            min: 3.0,
            max: 5.0,
            fractionDigits: 1,
          }),
          evaluation_date: faker.date
            .past({ years: 1 })
            .toISOString()
            .split('T')[0],
        });
      });
    });

    const createdPerformance = [];
    for (const record of performanceRecords) {
      const result = await this.createOrUpdate(
        'lms_transport_provider_performance',
        `provider = "${record.provider}" && shipment = "${record.shipment}"`,
        record,
      );
      if (result) createdPerformance.push(result);
    }

    return createdPerformance;
  }

  // Phase 4: Financial & Support Systems
  async seedCases(companies: any[], contacts: any[]) {
    console.log('🌱 Seeding support cases...');

    if (companies.length === 0 || contacts.length === 0) {
      console.warn('⚠️  Skipping cases - missing companies or contacts');
      return [];
    }

    const caseTypes = [
      'shipping_delay',
      'damaged_package',
      'lost_shipment',
      'billing_inquiry',
      'address_change',
      'documentation_issue',
      'customs_problem',
      'general_inquiry',
    ];

    const priorities = ['low', 'medium', 'high', 'critical'];
    const statuses = ['open', 'in_progress', 'pending_customer', 'closed'];

    const cases = [];

    for (let i = 0; i < 20; i++) {
      const company = faker.helpers.arrayElement(companies);
      const contact = faker.helpers.arrayElement(
        contacts.filter((c) => c.company === company.id),
      );

      const createdDate = faker.date.past({ years: 1 });
      const status = faker.helpers.arrayElement(statuses);

      cases.push({
        case_number: `CASE-${faker.number.int({ min: 100000, max: 999999 })}`,
        subject: faker.helpers.arrayElement([
          'Shipment tracking inquiry',
          'Package delivery delay',
          'Damaged goods claim',
          'Billing discrepancy',
          'Address correction request',
          'Documentation missing',
          'Customs clearance issue',
        ]),
        description: faker.lorem.paragraph({ min: 2, max: 4 }),
        case_type: faker.helpers.arrayElement(caseTypes),
        priority: faker.helpers.arrayElement(priorities),
        status: status,
        company: company.id,
        contact: contact?.id || null,
        created_date: createdDate.toISOString().split('T')[0],
        resolved_date: ['closed'].includes(status)
          ? faker.date
              .between({ from: createdDate, to: new Date() })
              .toISOString()
              .split('T')[0]
          : null,
        resolution_notes: ['closed'].includes(status)
          ? faker.lorem.sentence()
          : null,
      });
    }

    const createdCases = [];
    for (const caseData of cases) {
      const result = await this.createOrUpdate(
        'crm_cases',
        `case_number = "${caseData.case_number}"`,
        caseData,
      );
      if (result) createdCases.push(result);
    }

    return createdCases;
  }

  async seedCrmInvoices(companies: any[], contacts: any[]) {
    console.log('🌱 Seeding CRM invoices...');

    if (companies.length === 0) {
      console.warn('⚠️  Skipping CRM invoices - missing companies');
      return [];
    }

    const invoices = [];

    for (let i = 0; i < 15; i++) {
      const company = faker.helpers.arrayElement(companies);
      const contact = faker.helpers.arrayElement(
        contacts.filter((c) => c.company === company.id),
      );

      const issueDate = faker.date.past({ years: 1 });
      const dueDate = faker.date.soon({ days: 30, refDate: issueDate });
      const status = faker.helpers.arrayElement([
        'draft',
        'sent',
        'paid',
        'overdue',
        'cancelled',
      ]);

      invoices.push({
        invoice_number: `INV-${faker.number.int({ min: 10000, max: 99999 })}`,
        company: company.id,
        contact: contact?.id || null,
        invoice_date: issueDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        status: status,
        subtotal: faker.number.float({
          min: 100,
          max: 5000,
          fractionDigits: 2,
        }),
        tax_amount: faker.number.float({
          min: 10,
          max: 500,
          fractionDigits: 2,
        }),
        total_amount: faker.number.float({
          min: 120,
          max: 5500,
          fractionDigits: 2,
        }),
        currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'CAD']),
        notes: faker.lorem.sentence(),
        payment_date:
          status === 'paid'
            ? faker.date
                .between({ from: issueDate, to: dueDate })
                .toISOString()
                .split('T')[0]
            : null,
      });
    }

    const createdInvoices = [];
    for (const invoice of invoices) {
      const result = await this.createOrUpdate(
        'crm_invoices',
        `invoice_number = "${invoice.invoice_number}"`,
        invoice,
      );
      if (result) createdInvoices.push(result);
    }

    return createdInvoices;
  }

  async seedCrmInvoiceLineItems(
    invoices: any[],
    products: any[],
    shipments: any[],
  ) {
    console.log('🌱 Seeding CRM invoice line items...');

    if (
      invoices.length === 0 ||
      products.length === 0 ||
      shipments.length === 0
    ) {
      console.warn(
        '⚠️  Skipping invoice line items - missing invoices, products, or shipments',
      );
      return [];
    }

    const lineItems: any[] = [];
    const usedCombinations = new Set<string>(); // Track invoice+shipment combinations

    for (const invoice of invoices) {
      const itemCount = faker.number.int({ min: 1, max: 3 });
      const availableShipments = shipments.filter(
        (s) => !usedCombinations.has(`${invoice.id}-${s.id}`),
      );
      const selectedShipments = faker.helpers.arrayElements(
        availableShipments,
        {
          min: Math.min(1, availableShipments.length),
          max: Math.min(itemCount, availableShipments.length),
        },
      );

      selectedShipments.forEach((shipment, index) => {
        usedCombinations.add(`${invoice.id}-${shipment.id}`);
        const product = faker.helpers.arrayElement(products);
        const quantity = faker.number.int({ min: 1, max: 10 });
        const unitPrice = faker.number.float({
          min: 10,
          max: 500,
          fractionDigits: 2,
        });

        lineItems.push({
          invoice: invoice.id,
          line_number: index + 1,
          product: product.id,
          shipment: shipment.id,
          description: `${product.name} for shipment ${shipment.tracking_number}`,
          quantity: quantity,
          unit_price: unitPrice,
          line_total: quantity * unitPrice,
        });
      });
    }

    const createdLineItems = [];
    for (const item of lineItems) {
      const result = await this.createOrUpdate(
        'crm_invoice_line_items',
        `invoice = "${item.invoice}" && line_number = ${item.line_number}`,
        item,
      );
      if (result) createdLineItems.push(result);
    }

    return createdLineItems;
  }

  async seedProviderInvoices(providers: any[], shipments: any[]) {
    console.log('🌱 Seeding provider invoices...');

    if (providers.length === 0 || shipments.length === 0) {
      console.warn(
        '⚠️  Skipping provider invoices - missing providers or shipments',
      );
      return [];
    }

    const invoices = [];

    for (let i = 0; i < 12; i++) {
      const provider = faker.helpers.arrayElement(providers);
      const issueDate = faker.date.past({ years: 1 });
      const dueDate = faker.date.soon({ days: 30, refDate: issueDate });
      const status = faker.helpers.arrayElement([
        'draft',
        'sent',
        'paid',
        'overdue',
        'cancelled',
      ]);

      invoices.push({
        invoice_number: `PROV-${faker.number.int({ min: 10000, max: 99999 })}`,
        provider: provider.id,
        invoice_date: issueDate.toISOString().split('T')[0],
        due_date: dueDate.toISOString().split('T')[0],
        status: status,
        subtotal: faker.number.float({
          min: 500,
          max: 10000,
          fractionDigits: 2,
        }),
        tax_amount: faker.number.float({
          min: 50,
          max: 1000,
          fractionDigits: 2,
        }),
        total_amount: faker.number.float({
          min: 600,
          max: 11000,
          fractionDigits: 2,
        }),
        currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP']),
        payment_terms: faker.helpers.arrayElement([
          'NET15',
          'NET30',
          'NET45',
          'COD',
        ]),
        notes: faker.lorem.sentence(),
      });
    }

    const createdInvoices = [];
    for (const invoice of invoices) {
      const result = await this.createOrUpdate(
        'lms_transport_provider_invoices',
        `invoice_number = "${invoice.invoice_number}"`,
        invoice,
      );
      if (result) createdInvoices.push(result);
    }

    return createdInvoices;
  }

  async seedProviderInvoiceLineItems(
    providerInvoices: any[],
    shipments: any[],
  ) {
    console.log('🌱 Seeding provider invoice line items...');

    if (providerInvoices.length === 0 || shipments.length === 0) {
      console.warn(
        '⚠️  Skipping provider invoice line items - missing invoices or shipments',
      );
      return [];
    }

    const lineItems: any[] = [];

    for (const invoice of providerInvoices) {
      const itemCount = faker.number.int({ min: 2, max: 8 });
      const selectedShipments = faker.helpers.arrayElements(
        shipments,
        itemCount,
      );

      selectedShipments.forEach((shipment, index) => {
        const serviceType = faker.helpers.arrayElement([
          'shipping',
          'handling',
          'fuel_surcharge',
          'insurance',
          'customs_fee',
        ]);

        lineItems.push({
          provider_invoice: invoice.id,
          line_number: index + 1,
          shipment: shipment.id,
          service_type: serviceType,
          description: `${serviceType.replace(
            '_',
            ' ',
          )} for shipment ${shipment.tracking_number}`,
          quantity: 1,
          unit_price: faker.number.float({
            min: 25,
            max: 500,
            fractionDigits: 2,
          }),
          line_total: faker.number.float({
            min: 25,
            max: 500,
            fractionDigits: 2,
          }),
        });
      });
    }

    const createdLineItems = [];
    for (const item of lineItems) {
      const result = await this.createOrUpdate(
        'lms_transport_provider_invoice_line_items',
        `provider_invoice = "${item.provider_invoice}" && line_number = ${item.line_number}`,
        item,
      );
      if (result) createdLineItems.push(result);
    }

    return createdLineItems;
  }

  async seedTeamResources(teams: any[]) {
    console.log('🌱 Seeding team resources...');

    if (teams.length === 0) {
      console.warn('⚠️  Skipping team resources - missing teams');
      return [];
    }

    // All collection names except 'users'
    const allCollections = [
      // Organization & Teams
      'org_organization',
      'org_roles',
      'org_teams',
      'org_team_members',
      'org_team_roles',
      'org_role_actions',
      'org_team_resources',

      // CRM Collections
      'crm_companies',
      'crm_contacts',
      'crm_leads',
      'crm_products',
      'crm_opportunities',
      'crm_opportunity_products',
      'crm_campaigns',
      'crm_campaign_contacts',
      'crm_interactions',
      'crm_cases',
      'crm_invoices',
      'crm_invoice_line_items',

      // Logistics Collections
      'lms_addresses',
      'lms_transport_providers',
      'lms_shipping_services',
      'lms_warehouses',
      'lms_shipments',
      'lms_packages',
      'lms_pricing_zones',
      'lms_pricing_zone_countries',
      'lms_pricing_rates',
      'lms_transport_provider_services',
      'lms_tracking_events',
      'lms_warehouse_inventories',
      'lms_transport_provider_performance',
      'lms_transport_provider_invoices',
      'lms_transport_provider_invoice_line_items',

      // Transport Collections
      'tms_drivers',
      'tms_vehicles',
    ];

    const resources: any[] = [];

    // Distribute collections across teams logically
    const teamCollectionMapping: Record<string, string[]> = {
      'Operations Team': [
        'org_organization',
        'org_roles',
        'org_teams',
        'org_team_members',
        'org_team_roles',
        'org_role_actions',
        'org_team_resources',
        'crm_companies',
        'crm_contacts',
        'crm_opportunities',
        'crm_invoices',
        'lms_addresses',
        'lms_shipping_services',
        'lms_shipments',
      ],
      'Delivery Team': [
        'tms_drivers',
        'tms_vehicles',
        'lms_transport_providers',
        'lms_tracking_events',
        'lms_transport_provider_performance',
        'lms_transport_provider_services',
        'lms_transport_provider_invoices',
        'lms_transport_provider_invoice_line_items',
      ],
      'Warehouse Team': [
        'lms_warehouses',
        'lms_packages',
        'lms_warehouse_inventories',
        'crm_products',
        'lms_pricing_zones',
        'lms_pricing_zone_countries',
        'lms_pricing_rates',
      ],
    };

    // Assign remaining collections to teams to ensure all are covered
    const assignedCollections = new Set<string>();
    Object.values(teamCollectionMapping)
      .flat()
      .forEach((col) => assignedCollections.add(col));

    const unassignedCollections = allCollections.filter(
      (col) => !assignedCollections.has(col),
    );

    // Distribute unassigned collections across teams
    unassignedCollections.forEach((collection, index) => {
      const teamNames = Object.keys(teamCollectionMapping);
      const targetTeam = teamNames[index % teamNames.length];
      if (teamCollectionMapping[targetTeam]) {
        teamCollectionMapping[targetTeam].push(collection);
      }
    });

    // Create resource records for each team
    for (const team of teams) {
      const teamCollections = teamCollectionMapping[team.name] || [];

      teamCollections.forEach((collectionName: string) => {
        resources.push({
          team: team.id,
          resource: collectionName,
        });
      });
    }

    const createdResources = [];
    for (const resource of resources) {
      const result = await this.createOrUpdate(
        'org_team_resources',
        `resource = "${resource.resource}"`,
        resource,
      );
      if (result) createdResources.push(result);
    }

    return createdResources;
  }

  // Phase 5: Missing LMS Collections
  async seedProviderRates(providerServices: any[], zones: any[]) {
    console.log('🌱 Seeding provider rates...');

    if (providerServices.length === 0 || zones.length === 0) {
      console.warn('⚠️  Skipping provider rates - missing dependencies');
      return [];
    }

    const rates = [];
    for (const providerService of providerServices) {
      for (const zone of zones.slice(0, 3)) {
        // Limit to 3 zones per provider service
        const rate = {
          provider: providerService.id, // This references provider services, not transport providers
          origin_zone: zone.id,
          destination_zones: faker.helpers.arrayElement(zones).id,
          weight_min: faker.number.float({ min: 0, max: 5, multipleOf: 0.1 }),
          weight_max: faker.number.float({ min: 5, max: 50, multipleOf: 0.1 }),
          per_kg_rate: faker.number.float({
            min: 2,
            max: 25,
            multipleOf: 0.01,
          }),
          base_rate: faker.number.float({ min: 5, max: 100, multipleOf: 0.01 }),
          fuel_surcharge_rate: faker.number.float({
            min: 0,
            max: 15,
            multipleOf: 0.1,
          }),
          effective_date: faker.date.past().toISOString(),
          expiry_date: faker.date.future().toISOString(),
          currency: faker.helpers.arrayElement(['USD', 'EUR', 'GBP', 'PHP']),
        };
        rates.push(rate);
      }
    }

    const createdRates = [];
    for (const rate of rates) {
      const created = await this.createOrUpdate(
        'lms_transport_provider_rates',
        `provider-${rate.provider}-origin-${rate.origin_zone}-dest-${rate.destination_zones}`,
        rate,
      );
      if (created) createdRates.push(created);
    }

    console.log(`✅ Created ${createdRates.length} provider rates`);
    return createdRates;
  }

  async seedProviderServiceOriginCountries(
    providerServices: any[],
    countries: any[],
  ) {
    console.log('🌱 Seeding provider service origin countries...');

    if (providerServices.length === 0 || countries.length === 0) {
      console.warn(
        '⚠️  Skipping provider service origin countries - missing dependencies',
      );
      return [];
    }

    const originCountries = [];
    for (const providerService of providerServices) {
      // Each provider service covers 2-5 origin countries
      const serviceCountries = faker.helpers.arrayElements(
        countries,
        faker.number.int({ min: 2, max: 5 }),
      );

      for (const country of serviceCountries) {
        const originCountry = {
          provider: providerService.id, // This references provider services, not transport providers
          country_code: country.country_code,
        };
        originCountries.push(originCountry);
      }
    }

    const createdOriginCountries = [];
    for (const origin of originCountries) {
      const created = await this.createOrUpdate(
        'lms_transport_provider_service_origin_countries',
        `provider-${origin.provider}-origin-${origin.country_code}`,
        origin,
      );
      if (created) createdOriginCountries.push(created);
    }

    console.log(
      `✅ Created ${createdOriginCountries.length} provider service origin countries`,
    );
    return createdOriginCountries;
  }

  async seedProviderServiceDestinationCountries(
    providerServices: any[],
    countries: any[],
  ) {
    console.log('🌱 Seeding provider service destination countries...');

    if (providerServices.length === 0 || countries.length === 0) {
      console.warn(
        '⚠️  Skipping provider service destination countries - missing dependencies',
      );
      return [];
    }

    const destinationCountries = [];
    for (const providerService of providerServices) {
      // Each provider service delivers to 3-8 destination countries
      const serviceCountries = faker.helpers.arrayElements(
        countries,
        faker.number.int({ min: 3, max: 8 }),
      );

      for (const country of serviceCountries) {
        const destinationCountry = {
          provider: providerService.id, // This references provider services, not transport providers
          country_code: country.country_code,
        };
        destinationCountries.push(destinationCountry);
      }
    }

    const createdDestinationCountries = [];
    for (const destination of destinationCountries) {
      const created = await this.createOrUpdate(
        'lms_transport_provider_service_destination_countries',
        `provider-${destination.provider}-dest-${destination.country_code}`,
        destination,
      );
      if (created) createdDestinationCountries.push(created);
    }

    console.log(
      `✅ Created ${createdDestinationCountries.length} provider service destination countries`,
    );
    return createdDestinationCountries;
  }

  async seedProviderServiceMaxDimensions(providerServices: any[]) {
    console.log('🌱 Seeding provider service max dimensions...');

    if (providerServices.length === 0) {
      console.warn(
        '⚠️  Skipping provider service max dimensions - missing provider services',
      );
      return [];
    }

    const dimensions = [];
    for (const providerService of providerServices) {
      const dimension = {
        provider: providerService.id, // This references provider services, not transport providers
        length: faker.number.int({ min: 50, max: 200 }),
        width: faker.number.int({ min: 30, max: 150 }),
        height: faker.number.int({ min: 20, max: 100 }),
      };
      dimensions.push(dimension);
    }

    const createdDimensions = [];
    for (const dimension of dimensions) {
      const created = await this.createOrUpdate(
        'lms_transport_provider_service_max_dimensions',
        `provider-${dimension.provider}`,
        dimension,
      );
      if (created) createdDimensions.push(created);
    }

    console.log(
      `✅ Created ${createdDimensions.length} provider service max dimensions`,
    );
    return createdDimensions;
  }

  async seedShippingServiceMaxDimensions(shippingServices: any[]) {
    console.log('🌱 Seeding shipping service max dimensions...');

    if (shippingServices.length === 0) {
      console.warn(
        '⚠️  Skipping shipping service max dimensions - missing shipping services',
      );
      return [];
    }

    const dimensions = [];
    for (const service of shippingServices) {
      const dimension = {
        shipping_service: service.id,
        length: faker.number.int({ min: 40, max: 180 }),
        width: faker.number.int({ min: 25, max: 120 }),
        height: faker.number.int({ min: 15, max: 80 }),
      };
      dimensions.push(dimension);
    }

    const createdDimensions = [];
    for (const dimension of dimensions) {
      const created = await this.createOrUpdate(
        'lms_shipping_service_max_dimensions',
        `service-${dimension.shipping_service}`,
        dimension,
      );
      if (created) createdDimensions.push(created);
    }

    console.log(
      `✅ Created ${createdDimensions.length} shipping service max dimensions`,
    );
    return createdDimensions;
  }

  async run() {
    try {
      console.log('🚀 Starting PocketBase seeding...\n');

      await this.authenticate();

      // Core entities
      const users = await this.seedUsers();
      const organizations = await this.seedOrganizations(users);
      const roles = await this.seedRoles(organizations);
      const teams = await this.seedTeams(organizations);

      // Phase 1: Core relationship collections (junction tables)
      console.log('\n🔗 Phase 1: Core Relationships');
      await this.seedTeamMembers(teams, users);
      await this.seedTeamRoles(teams, roles);
      await this.seedRoleActions(roles);
      const products = await this.seedProducts();
      const leads = await this.seedLeads();

      // Logistics entities
      const addresses = await this.seedAddresses();
      const companies = await this.seedCompanies();
      const contacts = await this.seedContacts(companies);
      const providers = await this.seedTransportProviders(addresses);
      const services = await this.seedShippingServices();
      const warehouses = await this.seedWarehouses(addresses);
      const shipments = await this.seedShipments(
        users,
        addresses,
        companies,
        contacts,
        services,
      );
      const packages = await this.seedPackages(shipments);
      await this.seedDrivers();
      await this.seedVehicles();

      // Phase 2: Business workflow collections
      console.log('\n💼 Phase 2: Business Workflows');
      const opportunities = await this.seedOpportunities(
        companies,
        contacts,
        leads,
      );
      await this.seedOpportunityProducts(opportunities, products);
      const campaigns = await this.seedCampaigns();
      await this.seedCampaignContacts(campaigns, contacts);
      await this.seedInteractions(contacts, opportunities);

      // Phase 3: Logistics enhancement collections
      console.log('\n🚛 Phase 3: Logistics Enhancement');
      const zones = await this.seedPricingZones();
      await this.seedPricingZoneCountries(zones);
      await this.seedPricingRates(zones, services);
      await this.seedProviderServices(providers);
      await this.seedTrackingEvents(shipments);
      await this.seedWarehouseInventories(warehouses, packages, shipments);
      await this.seedProviderPerformance(providers, shipments);

      // Phase 4: Financial & Support Systems
      console.log('\n💰 Phase 4: Financial & Support Systems');
      await this.seedCases(companies, contacts);
      const crmInvoices = await this.seedCrmInvoices(companies, contacts);
      await this.seedCrmInvoiceLineItems(crmInvoices, products, shipments);
      const providerInvoices = await this.seedProviderInvoices(
        providers,
        shipments,
      );
      await this.seedProviderInvoiceLineItems(providerInvoices, shipments);
      await this.seedTeamResources(teams);

      // Phase 5: Missing LMS Collections
      console.log('\n🔧 Phase 5: Missing LMS Collections');
      const zoneCountries = await this.pb
        .collection('lms_pricing_zone_countries')
        .getFullList();
      const providerServices = await this.pb
        .collection('lms_transport_provider_services')
        .getFullList();
      await this.seedProviderRates(providerServices, zones);
      await this.seedProviderServiceOriginCountries(
        providerServices,
        zoneCountries,
      );
      await this.seedProviderServiceDestinationCountries(
        providerServices,
        zoneCountries,
      );
      await this.seedProviderServiceMaxDimensions(providerServices);
      await this.seedShippingServiceMaxDimensions(services);

      console.log('\n✅ Seeding completed successfully!\n');
      console.log('📊 Summary:');
      Object.entries(this.seedSummary).forEach(([collection, stats]) => {
        console.log(
          `  ${collection}: ${stats.created} created, ${stats.updated} updated`,
        );
      });
    } catch (error) {
      console.error('❌ Seeding failed:', error);
      throw error;
    }
  }
}

// Run the seeder
const seeder = new Seeder();
seeder.run();
