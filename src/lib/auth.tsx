import { betterAuth } from 'better-auth';
import { admin as adminPlugin, bearer } from 'better-auth/plugins';
import { reactStartCookies } from 'better-auth/react-start';
import { Pool } from 'pg';
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
import { pgPool } from '@/db';
import nodemailer from 'nodemailer';
import VerifyEmail from '@/emails/verify-email';
import ReactDOMServer from 'react-dom/server';

export const authFactory = (
  dbClient: Pool,
  mailer: ReturnType<typeof nodemailer.createTransport>,
) =>
  betterAuth({
    database: dbClient,
    trustedOrigins: ['http://localhost:3001'],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url, token }) => {
        console.log('sending verification email');
        try {
          if (!user?.email || !url || !token) {
            throw new Error('Missing required email verification parameters');
          }
          await mailer.sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: user.email,
            subject: 'Verify your email address',
            html: ReactDOMServer.renderToString(
              <VerifyEmail url={url} token={token} />,
            ),
          });
        } catch (e) {
          console.error('Failed to send verification email:', e);
        }
      },
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
