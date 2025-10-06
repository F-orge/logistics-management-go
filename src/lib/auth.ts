import { betterAuth } from 'better-auth';
import { admin as adminPlugin, bearer } from 'better-auth/plugins';
import { reactStartCookies } from 'better-auth/react-start';
import { Pool } from 'pg';
import { db } from '@/db';
import {
  ac,
  accountant,
  accountsManager,
  admin,
  client,
  clientAdmin,
  customerSupportAgent,
  deliveryDriver,
  developer,
  dispatcher,
  dispatchManager,
  driver,
  financeManager,
  fleetManager,
  inventoryManager,
  logisticsCoordinator,
  logisticsManager,
  logisticsPlanner,
  marketingManager,
  packer,
  picker,
  pricingAnalyst,
  qualityControlManager,
  receivingManager,
  routePlanner,
  SDR,
  salesManager,
  salesRep,
  supervisor,
  transportManager,
  user,
  warehouseManager,
  warehouseOperator,
} from '@/lib/permissions';

export const authFactory = (dbClient: typeof db) =>
  betterAuth({
    database: new Pool({ connectionString: process.env.DATABASE_URL! }),
    emailAndPassword: {
      enabled: true,
    },
    plugins: [
      bearer(),
      adminPlugin({
        ac,
        roles: {
          admin,
          developer,
          clientAdmin,
          user,
          pricingAnalyst,
          accountsManager,
          financeManager,
          salesManager,
          client,
          accountant,
          salesRep,
          customerSupportAgent,
          marketingManager,
          SDR,
          dispatchManager,
          routePlanner,
          deliveryDriver,
          logisticsCoordinator,
          inventoryManager,
          warehouseManager,
          warehouseOperator,
          qualityControlManager,
          receivingManager,
          transportManager,
          fleetManager,
          dispatcher,
          driver,
          logisticsManager,
          logisticsPlanner,
          supervisor,
          picker,
          packer,
        },
      }),
      reactStartCookies(),
    ],
  });

export const authFactoryV2 = (dbClient: Pool) =>
  betterAuth({
    database: dbClient,
    emailAndPassword: {
      enabled: true,
    },
    plugins: [bearer(), adminPlugin({ roles: {} }), reactStartCookies()],
  });

export const auth = authFactory(db);
