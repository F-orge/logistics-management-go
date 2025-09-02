```mermaid
erDiagram
    %% Shared Entities (Defined in other diagrams)
    users {
        string id PK
        string name
        string email
    }

    ims_outbound_shipments {
        string id PK
        string tracking_number
    }

    %% TMS (Transportation Management System)

    tms_drivers {
        string id PK
        string user_id FK
        string license_number
        date license_expiry_date
        string status "e.g., active, inactive, on_leave"
        datetime created_at
        datetime updated_at
    }

    tms_driver_schedules {
        string id PK
        string driver_id FK
        date start_date
        date end_date
        string reason "e.g., vacation, sick_leave"
        datetime created_at
        datetime updated_at
    }

    tms_vehicles {
        string id PK
        string registration_number
        string model
        float capacity_volume
        float capacity_weight
        string status "e.g., available, in_maintenance, on_trip"
        datetime created_at
        datetime updated_at
    }

    tms_vehicle_maintenance {
        string id PK
        string vehicle_id FK
        date service_date
        string service_type
        decimal cost
        text notes
        datetime created_at
        datetime updated_at
    }

    tms_trips {
        string id PK
        string driver_id FK
        string vehicle_id FK
        string status "e.g., planned, in_progress, completed, cancelled"
        datetime created_at
        datetime updated_at
    }

    tms_trip_stops {
        string id PK
        string trip_id FK
        string shipment_id FK "from ims_outbound_shipments"
        int sequence
        string address
        string status "e.g., pending, arrived, completed"
        datetime estimated_arrival_time
        datetime actual_arrival_time
        datetime estimated_departure_time
        datetime actual_departure_time
        datetime created_at
        datetime updated_at
    }

    tms_gps_pings {
        string id PK
        string vehicle_id FK
        float latitude
        float longitude
        datetime timestamp
    }

    tms_routes {
        string id PK
        string trip_id FK
        text optimized_route_data "e.g., polyline, turn-by-turn directions"
        float total_distance
        float total_duration
        datetime created_at
        datetime updated_at
    }

    tms_proof_of_deliveries {
        string id PK
        string trip_stop_id FK
        string type "e.g., signature, photo"
        string file_path
        datetime timestamp
        float latitude
        float longitude
        datetime created_at
        datetime updated_at
    }

    tms_expenses {
        string id PK
        string trip_id FK
        string driver_id FK
        string type "e.g., fuel, tolls, maintenance"
        decimal amount
        string currency
        string receipt_url
        float fuel_quantity "nullable"
        int odometer_reading "nullable"
        string status "e.g., pending, approved, rejected"
        datetime created_at
        datetime updated_at
    }

    tms_geofences {
        string id PK
        string name
        text coordinates "e.g., polygon data"
        datetime created_at
        datetime updated_at
    }

    tms_geofence_events {
        string id PK
        string vehicle_id FK
        string geofence_id FK
        string event_type "e.g., enter, exit"
        datetime timestamp
    }

    tms_carriers {
        string id PK
        string name
        string contact_details
        text services_offered
        datetime created_at
        datetime updated_at
    }

    tms_carrier_rates {
        string id PK
        string carrier_id FK
        string service_type
        string origin
        string destination
        decimal rate
        string unit "e.g., per_kg, per_container"
        datetime created_at
        datetime updated_at
    }

    tms_shipment_legs {
        string id PK
        string shipment_id FK
        int leg_sequence
        string start_location
        string end_location
        string carrier_id FK "nullable, for 3rd party"
        string internal_trip_id FK "nullable, for internal fleet"
        string status
        datetime created_at
        datetime updated_at
    }

    tms_shipment_leg_events {
        string id PK
        string shipment_leg_id FK
        string status_message
        string location
        datetime event_timestamp
    }

    tms_partner_invoices {
        string id PK
        string carrier_id FK
        string invoice_number
        date invoice_date
        decimal total_amount
        string status "e.g., pending, paid, disputed"
        datetime created_at
        datetime updated_at
    }

    tms_partner_invoice_items {
        string id PK
        string partner_invoice_id FK
        string shipment_leg_id FK
        decimal amount
    }

    %% TMS Relationships
    users                   ||--o{ tms_drivers : "is a"
    tms_drivers             ||--|{ tms_driver_schedules : "has"
    tms_vehicles            ||--|{ tms_vehicle_maintenance : "undergoes"
    tms_drivers             ||--o{ tms_trips : "drives"
    tms_vehicles            ||--o{ tms_trips : "is used in"
    tms_trips               ||--|{ tms_trip_stops : "consists of"
    ims_outbound_shipments  ||--o{ tms_trip_stops : "is delivered in"
    tms_trips               ||--o{ tms_routes : "follows"
    tms_trip_stops          ||--o{ tms_proof_of_deliveries : "has"
    tms_trips               ||--o{ tms_expenses : "incurs"
    tms_drivers             ||--o{ tms_expenses : "logs"
    tms_vehicles            ||--|{ tms_gps_pings : "sends"
    tms_vehicles            ||--o{ tms_geofence_events : "triggers"
    tms_geofences           ||--o{ tms_geofence_events : "is boundary for"
    
    %% Multi-Leg & Carrier Relationships
    ims_outbound_shipments  ||--|{ tms_shipment_legs : "is composed of"
    tms_carriers            ||--o{ tms_shipment_legs : "handles"
    tms_carriers            ||--|{ tms_carrier_rates : "defines"
    tms_shipment_legs       ||--|{ tms_shipment_leg_events : "has"
    tms_trips               ||--o{ tms_shipment_legs : "handles internal"
    tms_carriers            ||--o{ tms_partner_invoices : "sends"
    tms_partner_invoices    ||--|{ tms_partner_invoice_items : "contains"
    tms_shipment_legs       ||--o{ tms_partner_invoice_items : "is billed in"
```
