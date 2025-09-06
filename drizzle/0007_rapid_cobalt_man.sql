CREATE TABLE "ims"."products" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(255) NOT NULL,
	"sku" varchar(64) NOT NULL,
	"barcode" varchar(64),
	"description" text,
	"cost_price" numeric(12, 2),
	"length" real,
	"width" real,
	"height" real,
	"weight" real,
	"status" varchar(32) NOT NULL,
	"supplier_id" uuid,
	"client_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
