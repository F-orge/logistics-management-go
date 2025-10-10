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
import sgMailer, { MailService } from '@sendgrid/mail';

export const authFactory = (
  dbClient: Pool,
  mailer: ReturnType<typeof nodemailer.createTransport> | sgMailer.MailService,
  enableEmailVerification: boolean,
) =>
  betterAuth({
    user: {
      fields: {
        emailVerified: 'email_verified',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      },
    },
    account: {
      fields: {
        accessToken: 'access_token',
        accessTokenExpiresAt: 'access_token_expires_at',
        accountId: 'account_id',
        createdAt: 'created_at',
        idToken: 'id_token',
        providerId: 'provider_id',
        refreshToken: 'refresh_token',
        refreshTokenExpiresAt: 'refresh_token_expires_at',
        updatedAt: 'updated_at',
        userId: 'user_id',
      },
    },
    session: {
      fields: {
        createdAt: 'created_at',
        expiresAt: 'expires_at',
        ipAddress: 'ip_address',
        updatedAt: 'updated_at',
        userAgent: 'user_agent',
        userId: 'user_id',
      },
    },
    verification: {
      fields: {
        createdAt: 'created_at',
        expiresAt: 'expires_at',
        updatedAt: 'updated_at',
      },
    },
    database: dbClient,
    trustedOrigins: [
      process.env.NODE_ENV === 'production'
        ? process.env.DOMAIN_ORIGIN!
        : 'http://localhost:3001',
    ],
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: enableEmailVerification,
      sendResetPassword: async ({ user, url, token }) => {
        if (
          process.env.NODE_ENV === 'production' &&
          mailer instanceof MailService
        ) {
          await sgMailer.send({
            from: process.env.MAIL_FROM_ADDRESS!,
            to: user.email,
            subject: 'Reset your password',
            html: ReactDOMServer.renderToString(
              <ResetPassword url={url} token={token} />,
            ),
          });
        } else {
          await (
            mailer as ReturnType<typeof nodemailer.createTransport>
          ).sendMail({
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
        }
      },
    },
    emailVerification: {
      sendOnSignUp: enableEmailVerification,
      sendVerificationEmail: async ({ user, url, token }) => {
        if (
          process.env.NODE_ENV === 'production' &&
          mailer instanceof MailService
        ) {
          await sgMailer.send({
            from: process.env.MAIL_FROM_ADDRESS!,
            to: user.email,
            subject: 'Verify your email address',
            html: ReactDOMServer.renderToString(
              <VerifyEmail url={url} token={token} />,
            ),
          });
        } else {
          await (
            mailer as ReturnType<typeof nodemailer.createTransport>
          ).sendMail({
            from: process.env.MAIL_FROM_ADDRESS,
            to: user.email,
            subject: 'Verify your email address',
            html: ReactDOMServer.renderToString(
              <VerifyEmail url={url} token={token} />,
            ),
          });
        }
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
