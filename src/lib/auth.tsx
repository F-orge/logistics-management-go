import { betterAuth } from 'better-auth';
import { admin as adminPlugin, bearer } from 'better-auth/plugins';
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
import ResetPassword from '@/emails/reset-password';

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
      sendResetPassword: async ({ user, url, token }) => {
        await mailer.sendMail({
          from: process.env.MAIL_FROM_ADDRESS,
          to: user.email,
          subject: 'Reset your password',
          html: ReactDOMServer.renderToString(
            <ResetPassword
              url={
                process.env.NODE_ENV === 'development'
                  ? `http://localhost:3001/auth/reset-password`
                  : url
              }
              token={token}
            />,
          ),
        });
      },
    },
    emailVerification: {
      sendOnSignUp: true,
      sendVerificationEmail: async ({ user, url, token }) => {
        await mailer.sendMail({
          from: process.env.MAIL_FROM_ADDRESS,
          to: user.email,
          subject: 'Verify your email address',
          html: ReactDOMServer.renderToString(
            <VerifyEmail url={url} token={token} />,
          ),
        });
      },
    },
    plugins: [
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
    ],
  });
