```mermaid
erDiagram
	%% RELATIONSHIPS - Core Logistics
	addresses ||--o{ shipments : "sender_address"
	addresses ||--o{ shipments : "receiver_address"
	addresses ||--o{ warehouses : "located_at"
	
	shipping_services ||--o{ shipments : "uses"
	shipping_services ||--o{ pricing_rates : "has_rates"
	
	pricing_zones ||--o{ pricing_rates : "origin_zone"
	pricing_zones ||--o{ pricing_rates : "destination_zone"
	
	shipments ||--o{ packages : "contains"
	shipments ||--o{ tracking_events : "has_events"
	shipments ||--o{ warehouse_inventory : "stored_in"
	shipments ||--o{ route_shipments : "assigned_to"
	shipments ||--o{ invoice_line_items : "billed_for"
	shipments ||--o{ notifications : "triggers"
	
	packages ||--o{ warehouse_inventory : "tracked_as"
	
	warehouses ||--o{ warehouse_inventory : "stores"
	warehouses ||--o{ vehicles : "based_at"
	warehouses ||--o{ tracking_events : "location"
	
	invoices ||--o{ invoice_line_items : "contains"
	
	auth_users ||--o{ shipments : "created_by"
	auth_users ||--o{ warehouses : "manages"
	%% EXISTING CRM TABLES
	auth_users {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null"
		email text "not null unique"
		email_verified boolean "not null default false"
		password text "not null"
		department_id uuid "references departments(id)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% DEPARTMENTS
	departments {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null unique"
		code text "not null unique"
		description text
		department_type text "not null"
		manager_id uuid "references auth_users(id)"
		phone_number text
		email text
		budget decimal "(15,2)"
		is_active boolean "default true"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	department_transport_modes {
		id uuid "not null primary key default gen_random_uuid()"
		department_id uuid "not null references departments(id)"
		transport_mode text "not null"
		is_primary boolean "default false"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	department_users {
		id uuid "not null primary key default gen_random_uuid()"
		department_id uuid "not null references departments(id)"
		user_id uuid "not null references auth_users(id)"
		role text "not null"
		permissions jsonb
		assigned_date date "not null default current_date"
		is_active boolean "default true"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_companies {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null unique"
		description text
		email text
		website text
		address text
		industry text
		phone_number text
		city text
		state text
		zip_code text
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_contacts {
		id uuid "not null primary key default gen_random_uuid()"
		first_name text "not null"
		last_name text "not null"
		email text "not null unique"
		phone_number text
		job_title text
		lead_source text
		status text "not null"
		birth_date text
		address text
		company_id uuid "references companies(id)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_leads {
		id uuid "not null primary key default gen_random_uuid()"
		first_name text "not null"
		last_name text "not null"
		email text "not null unique"
		phone_number text
		company_name text 
		lead_source text
		lead_status text "not null"
		lead_score integer "not null default 0"
		converted_to_contact_id uuid "references contact(id)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_opportunities {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null"
		company_id uuid "references companies(id)"
		primary_contact_id uuid "references contacts(id)"
		stage text "not null"
		amount decimal "(10,2) not null default 0.00"
		close_date date
		probability decimal "(5,2) not null default 0.00"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_interactions {
		id uuid "not null primary key default gen_random_uuid()"
		type text "not null"
		subject text
		description text
		interaction_date datetime "not null"
		contact_id uuid "references contacts(id)"
		opportunity_id uuid "references opportunities(id)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_campaigns {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null"
		description text
		start_date date "not null"
		end_date date 
		budget decimal "(10,2) default 0.00"
		status text "not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_campaign_contacts {
		id uuid "not null primary key default gen_random_uuid()"
		campaign_id uuid "not null references campaigns(id)"
		contact_id uuid "not null references contacts(id)"
		status text "not null"
		interaction_date datetime
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_cases {
		id uuid "not null primary key default gen_random_uuid()"
		subject text "not null"
		description text "not null"
		status text "not null"
		priority text "not null"
		contact_id uuid "references contacts(id)"
		closed_at datetime
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_products {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null unique"
		description text 
		price decimal "(10,2) not null"
		sku text "unique"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	crm_opportunity_products {
		id uuid "not null primary key default gen_random_uuid()"
		opportunity_id uuid "not null references opportunities(id)"
		product_id uuid "not null references products(id)"
		quantity decimal "(10,2) not null default 1"
		unit_price decimal "(10,2) not null"
		total_price decimal "(10,2) not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% NEW LOGISTICS MODULES
	
	%% Address Management
	addresses {
		id uuid "not null primary key default gen_random_uuid()"
		address_line1 text "not null"
		address_line2 text
		city text "not null"
		state text "not null"
		postal_code text "not null"
		country text "not null"
		address_type text "not null"
		is_validated boolean "default false"
		latitude decimal "(10,8)"
		longitude decimal "(11,8)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Service Management
	shipping_services {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null unique"
		description text
		service_type text "not null"
		max_weight decimal "(10,2)"
		max_dimensions jsonb
		delivery_time_min integer
		delivery_time_max integer
		is_active boolean "default true"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Pricing
	pricing_zones {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null"
		zone_code text "not null unique"
		countries jsonb "not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	pricing_rates {
		id uuid "not null primary key default gen_random_uuid()"
		service_id uuid "not null references shipping_services(id)"
		origin_zone_id uuid "not null references pricing_zones(id)"
		destination_zone_id uuid "not null references pricing_zones(id)"
		weight_min decimal "(10,2) not null"
		weight_max decimal "(10,2) not null"
		base_rate decimal "(10,2) not null"
		per_kg_rate decimal "(10,2) not null"
		fuel_surcharge_rate decimal "(5,2) default 0.00"
		effective_date date "not null"
		expiry_date date
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Shipment Management
	shipments {
		id uuid "not null primary key default gen_random_uuid()"
		tracking_number text "not null unique"
		sender_company_id uuid "references crm_companies(id)"
		sender_contact_id uuid "references crm_contacts(id)"
		sender_address_id uuid "not null references addresses(id)"
		receiver_company_id uuid "references crm_companies(id)"
		receiver_contact_id uuid "references crm_contacts(id)"
		receiver_address_id uuid "not null references addresses(id)"
		service_id uuid "not null references shipping_services(id)"
		assigned_department_id uuid "references departments(id)"
		primary_transport_mode text "not null"
		status text "not null"
		total_weight decimal "(10,2) not null"
		total_value decimal "(10,2)"
		insurance_amount decimal "(10,2)"
		shipping_cost decimal "(10,2)"
		currency text "not null default 'USD'"
		pickup_date date
		delivery_date date
		estimated_delivery_date date
		special_instructions text
		created_by uuid "references auth_users(id)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	packages {
		id uuid "not null primary key default gen_random_uuid()"
		shipment_id uuid "not null references shipments(id)"
		package_number text "not null"
		weight decimal "(10,2) not null"
		length decimal "(10,2)"
		width decimal "(10,2)"
		height decimal "(10,2)"
		package_type text "not null"
		contents_description text
		declared_value decimal "(10,2)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Tracking
	tracking_events {
		id uuid "not null primary key default gen_random_uuid()"
		shipment_id uuid "not null references shipments(id)"
		event_type text "not null"
		event_description text "not null"
		event_location text
		event_timestamp timestamptz "not null"
		warehouse_id uuid "references warehouses(id)"
		vehicle_id uuid "references vehicles(id)"
		driver_id uuid "references drivers(id)"
		created timestamptz "not null default now()"
	}

	%% Warehouse Management
	warehouses {
		id uuid "not null primary key default gen_random_uuid()"
		name text "not null"
		code text "not null unique"
		address_id uuid "not null references addresses(id)"
		warehouse_type text "not null"
		capacity integer
		department_id uuid "references departments(id)"
		is_active boolean "default true"
		manager_id uuid "references auth_users(id)"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	warehouse_inventory {
		id uuid "not null primary key default gen_random_uuid()"
		warehouse_id uuid "not null references warehouses(id)"
		shipment_id uuid "not null references shipments(id)"
		package_id uuid "not null references packages(id)"
		location_code text
		status text "not null"
		arrived_at timestamptz
		departed_at timestamptz
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Transportation Providers (Third-party)
	transportation_providers {
		id uuid "not null primary key default gen_random_uuid()"
		company_name text "not null"
		provider_type text "not null"
		contact_person text
		email text
		phone_number text
		address_id uuid "references addresses(id)"
		preferred_by_department_id uuid "references departments(id)"
		api_endpoint text
		api_key text
		contract_start_date date
		contract_end_date date
		payment_terms text
		insurance_coverage decimal "(15,2)"
		performance_rating decimal "(3,2)"
		is_active boolean "default true"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	provider_services {
		id uuid "not null primary key default gen_random_uuid()"
		provider_id uuid "not null references transportation_providers(id)"
		service_name text "not null"
		service_type text "not null"
		transport_mode text "not null"
		origin_countries jsonb
		destination_countries jsonb
		max_weight decimal "(10,2)"
		max_dimensions jsonb
		transit_time_min integer
		transit_time_max integer
		cutoff_time time
		tracking_available boolean "default true"
		insurance_available boolean "default true"
		is_active boolean "default true"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	provider_rates {
		id uuid "not null primary key default gen_random_uuid()"
		provider_service_id uuid "not null references provider_services(id)"
		origin_zone_id uuid "not null references pricing_zones(id)"
		destination_zone_id uuid "not null references pricing_zones(id)"
		weight_min decimal "(10,2) not null"
		weight_max decimal "(10,2) not null"
		base_rate decimal "(10,2) not null"
		per_kg_rate decimal "(10,2) not null"
		fuel_surcharge_rate decimal "(5,2) default 0.00"
		currency text "not null default 'USD'"
		effective_date date "not null"
		expiry_date date
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Internal Transportation (Own Fleet)
	drivers {
		id uuid "not null primary key default gen_random_uuid()"
		employee_id text "not null unique"
		first_name text "not null"
		last_name text "not null"
		license_number text "not null unique"
		phone_number text "not null"
		email text "not null unique"
		hire_date date "not null"
		status text "not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	vehicles {
		id uuid "not null primary key default gen_random_uuid()"
		vehicle_number text "not null unique"
		license_plate text "not null unique"
		vehicle_type text "not null"
		make text "not null"
		model text "not null"
		year integer "not null"
		capacity_weight decimal "(10,2)"
		capacity_volume decimal "(10,2)"
		department_id uuid "references departments(id)"
		warehouse_id uuid "references warehouses(id)"
		status text "not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Unified Transportation Management
	transport_legs {
		id uuid "not null primary key default gen_random_uuid()"
		shipment_id uuid "not null references shipments(id)"
		leg_sequence integer "not null"
		transport_type text "not null"
		provider_id uuid "references transportation_providers(id)"
		provider_service_id uuid "references provider_services(id)"
		provider_tracking_number text
		vehicle_id uuid "references vehicles(id)"
		driver_id uuid "references drivers(id)"
		origin_warehouse_id uuid "references warehouses(id)"
		destination_warehouse_id uuid "references warehouses(id)"
		origin_address_id uuid "references addresses(id)"
		destination_address_id uuid "references addresses(id)"
		scheduled_pickup timestamptz
		actual_pickup timestamptz
		scheduled_delivery timestamptz
		actual_delivery timestamptz
		cost decimal "(10,2)"
		currency text "default 'USD'"
		status text "not null"
		special_instructions text
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	routes {
		id uuid "not null primary key default gen_random_uuid()"
		route_name text "not null"
		driver_id uuid "references drivers(id)"
		vehicle_id uuid "references vehicles(id)"
		route_date date "not null"
		estimated_departure timestamptz
		actual_departure timestamptz
		estimated_arrival timestamptz
		actual_arrival timestamptz
		status text "not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	route_shipments {
		id uuid "not null primary key default gen_random_uuid()"
		route_id uuid "not null references routes(id)"
		shipment_id uuid "not null references shipments(id)"
		sequence_number integer "not null"
		delivery_type text "not null"
		estimated_delivery timestamptz
		actual_delivery timestamptz
		delivery_status text "not null"
		signature_required boolean "default false"
		recipient_signature text
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Provider Performance Tracking
	provider_performance {
		id uuid "not null primary key default gen_random_uuid()"
		provider_id uuid "not null references transportation_providers(id)"
		shipment_id uuid "references shipments(id)"
		transport_leg_id uuid "references transport_legs(id)"
		metric_type text "not null"
		metric_value decimal "(10,4)"
		measurement_date date "not null"
		notes text
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Provider Invoicing
	provider_invoices {
		id uuid "not null primary key default gen_random_uuid()"
		provider_id uuid "not null references transportation_providers(id)"
		invoice_number text "not null"
		invoice_date date "not null"
		due_date date "not null"
		subtotal decimal "(10,2) not null"
		tax_amount decimal "(10,2) default 0.00"
		total_amount decimal "(10,2) not null"
		currency text "not null default 'USD'"
		status text "not null"
		payment_date date
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	provider_invoice_line_items {
		id uuid "not null primary key default gen_random_uuid()"
		provider_invoice_id uuid "not null references provider_invoices(id)"
		transport_leg_id uuid "not null references transport_legs(id)"
		description text "not null"
		quantity decimal "(10,2) not null default 1"
		unit_price decimal "(10,2) not null"
		line_total decimal "(10,2) not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Billing Integration
	invoices {
		id uuid "not null primary key default gen_random_uuid()"
		invoice_number text "not null unique"
		company_id uuid "not null references crm_companies(id)"
		contact_id uuid "references crm_contacts(id)"
		invoice_date date "not null"
		due_date date "not null"
		subtotal decimal "(10,2) not null"
		tax_amount decimal "(10,2) not null default 0.00"
		total_amount decimal "(10,2) not null"
		currency text "not null default 'USD'"
		status text "not null"
		payment_terms text
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	invoice_line_items {
		id uuid "not null primary key default gen_random_uuid()"
		invoice_id uuid "not null references invoices(id)"
		shipment_id uuid "references shipments(id)"
		description text "not null"
		quantity decimal "(10,2) not null default 1"
		unit_price decimal "(10,2) not null"
		line_total decimal "(10,2) not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% Customer Notifications
	notifications {
		id uuid "not null primary key default gen_random_uuid()"
		shipment_id uuid "not null references shipments(id)"
		contact_id uuid "references crm_contacts(id)"
		notification_type text "not null"
		channel text "not null"
		recipient text "not null"
		subject text
		message text "not null"
		sent_at timestamptz
		delivery_status text "not null"
		created timestamptz "not null default now()"
		updated timestamptz "not null default now()"
	}

	%% RELATIONSHIPS - CRM
	crm_companies ||--o{ crm_contacts : "has"
	crm_companies ||--o{ crm_opportunities : "has"
	crm_contacts ||--o{ crm_interactions : "has"
	crm_contacts ||--o{ crm_cases : "has"
	crm_opportunities ||--o{ crm_interactions : "has"
	crm_leads ||--o| crm_contacts : "converts_to"
	crm_campaigns ||--|| crm_campaign_contacts : "has"
	crm_contacts ||--|| crm_campaign_contacts : "participates_in"
	crm_products ||--|| crm_opportunity_products : "included_in"
	crm_opportunities ||--|| crm_opportunity_products : "includes"

	%% RELATIONSHIPS - Departments
	departments ||--o{ auth_users : "has_members"
	departments ||--o{ department_users : "has_assignments"
	departments ||--o{ department_transport_modes : "handles"
	departments ||--o{ crm_opportunities : "manages"
	departments ||--o{ crm_interactions : "handles"
	departments ||--o{ crm_cases : "assigned_to"
	departments ||--o{ shipments : "manages"
	departments ||--o{ warehouses : "operates"
	departments ||--o{ vehicles : "owns"
	departments ||--o{ transportation_providers : "preferred_by"
	
	auth_users ||--o{ departments : "manages"
	auth_users ||--o{ department_users : "assigned_to"

	%% RELATIONSHIPS - CRM to Logistics Integration
	crm_companies ||--o{ shipments : "sends"
	crm_companies ||--o{ shipments : "receives"
	crm_contacts ||--o{ shipments : "sender_contact"
	crm_contacts ||--o{ shipments : "receiver_contact"
	crm_companies ||--o{ invoices : "billed_to"
	crm_contacts ||--o{ invoices : "contact_for"
	crm_contacts ||--o{ notifications : "receives"

	%% RELATIONSHIPS - Transportation Providers
	transportation_providers ||--o{ provider_services : "offers"
	transportation_providers ||--o{ provider_rates : "has_rates"
	transportation_providers ||--o{ transport_legs : "handles"
	transportation_providers ||--o{ provider_performance : "tracked_for"
	transportation_providers ||--o{ provider_invoices : "bills_us"
	
	provider_services ||--o{ provider_rates : "priced_by"
	provider_services ||--o{ transport_legs : "used_in"
	
	pricing_zones ||--o{ provider_rates : "origin_zone"
	pricing_zones ||--o{ provider_rates : "destination_zone"
	
	%% RELATIONSHIPS - Transport Legs (Unified Transportation)
	shipments ||--o{ transport_legs : "transported_via"
	transport_legs ||--o{ provider_performance : "measured_by"
	transport_legs ||--o{ provider_invoice_line_items : "billed_as"
	
	%% RELATIONSHIPS - Internal Fleet
	drivers ||--o{ routes : "assigned_to"
	drivers ||--o{ transport_legs : "drives"
	drivers ||--o{ tracking_events : "performed_by"
	
	vehicles ||--o{ routes : "used_in"
	vehicles ||--o{ transport_legs : "transported_by"
	vehicles ||--o{ tracking_events : "transported_by"
	
	routes ||--o{ route_shipments : "includes"
	
	%% RELATIONSHIPS - Provider Invoicing
	provider_invoices ||--o{ provider_invoice_line_items : "contains"
	
	%% RELATIONSHIPS - Warehouses and Addresses
	warehouses ||--o{ transport_legs : "origin_warehouse"
	warehouses ||--o{ transport_legs : "destination_warehouse"
	addresses ||--o{ transport_legs : "origin_address"
	addresses ||--o{ transport_legs : "destination_address"
	addresses ||--o{ transportation_providers : "located_at"
```
