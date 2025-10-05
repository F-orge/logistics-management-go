import { sql, type Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await sql`
		-- Create the roles enum for user.role
		create type user_role as ENUM(
			'admin',
			'developer',
			'user',
			'client',
			'client-admin',
			'end-customer',
			'inventory-manager',
			'warehouse-manager',
			'receiving-manager',
			'warehouse-operator',
			'picker',
			'packer',
			'returns-processor',
			'qc-manager',
			'logistics-coordinator',
			'logistics-manager',
			'logistics-planner',
			'dispatcher',
			'driver',
			'fleet-manager',
			'transport-manager',
			'account-manager',
			'pricing-analyst',
			'finance-manager',
			'accountant',
			'sdr',
			'sales-rep',
			'sales-manager',
			'marketing-manager',
			'customer-support-agent',
			'product-manager',
			'carrier'
		);

		-- Alter the role column in user to use the new enum
		alter table "user"
			alter column role type user_role
			using role::user_role;
	`.execute(db);
}

export async function down(db: Kysely<any>): Promise<void> {
  await sql`
		alter table "user"
			alter column role type TEXT
			using role::text;

		drop type if exists user_role;
	`.execute(db);
}
