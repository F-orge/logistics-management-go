```mermaid
erDiagram
    %% Shared Entities (Defined in other diagrams)
    users {
        string id PK
        string name
    }
    ims_products {
        string id PK
        string name
        string sku
    }
    ims_inbound_shipments {
        string id PK
        string client_id
    }
    ims_sales_orders {
        string id PK
        string order_number
    }
    ims_returns {
        string id PK
        string return_number
    }
    ims_inventory_batches {
        string id PK
        string batch_number
    }

    %% WMS (Warehouse Management System)

    wms_locations {
        string id PK
        string warehouse_id FK
        string parent_location_id FK "self-referencing for hierarchy"
        string name "e.g., A-01-B-101"
        string barcode
        string type "e.g., receiving_dock, pick_bin, packing_station, cross_dock_area"
        float max_weight
        float max_volume
        datetime created_at
        datetime updated_at
    }

    wms_inventory_stock {
        string id PK
        string location_id FK
        string product_id FK
        string batch_id FK "nullable"
        int quantity
        string status "e.g., available, allocated, damaged"
        datetime created_at
        datetime updated_at
    }

    wms_putaway_rules {
        string id PK
        string product_id FK
        string client_id FK
        string preferred_location_id FK
        int priority
        datetime created_at
        datetime updated_at
    }

    wms_bin_thresholds {
        string id PK
        string location_id FK
        string product_id FK
        int min_quantity
        int max_quantity
        datetime created_at
        datetime updated_at
    }

    wms_pick_batches {
        string id PK
        string status "e.g., open, in_progress, completed"
        string strategy "e.g., batch_picking, zone_picking"
        datetime created_at
        datetime updated_at
    }

    wms_pick_batch_items {
        string pick_batch_id PK, FK
        string sales_order_id PK, FK
    }

    wms_tasks {
        string id PK
        string user_id FK
        string type "e.g., putaway, pick, pack, replenishment, cycle_count, cross_dock"
        string status "e.g., pending, in_progress, completed"
        string source_entity_id "e.g., inbound_shipment_id, pick_batch_id, return_id"
        datetime start_time
        datetime end_time
        int duration_seconds
        datetime created_at
        datetime updated_at
    }

    wms_task_items {
        string id PK
        string task_id FK
        string product_id FK
        string source_location_id FK
        string destination_location_id FK
        int quantity_required
        int quantity_completed
        string status "e.g., pending, completed"
        datetime created_at
        datetime updated_at
    }

    wms_packages {
        string id PK
        string sales_order_id FK
        string package_number
        float weight
        float length
        float width
        float height
        datetime created_at
        datetime updated_at
    }

    wms_package_items {
        string id PK
        string package_id FK
        string product_id FK
        int quantity
        datetime created_at
        datetime updated_at
    }

    %% WMS Relationships
    users                   ||--o{ wms_tasks : "performs"
    wms_locations           ||--o{ wms_locations : "is parent of"
    wms_locations           ||--o{ wms_bin_thresholds : "has"
    ims_products            ||--o{ wms_putaway_rules : "has"
    wms_locations           ||--o{ wms_putaway_rules : "is preferred for"
    
    %% Inventory Stock Relationships
    wms_locations           ||--|{ wms_inventory_stock : "holds"
    ims_products            ||--|{ wms_inventory_stock : "is instance of"
    ims_inventory_batches   ||--o{ wms_inventory_stock : "is batch of"

    %% Task & Workflow Relationships
    wms_tasks               ||--|{ wms_task_items : "consists of"
    wms_locations           ||--o{ wms_task_items : "is source for"
    wms_locations           ||--o{ wms_task_items : "is destination for"
    ims_products            ||--o{ wms_task_items : "is subject of"
    
    %% Picking & Packing Relationships
    wms_pick_batches        ||--|{ wms_pick_batch_items : "groups"
    ims_sales_orders        ||--o{ wms_pick_batch_items : "is part of"
    wms_pick_batches        ||--o{ wms_tasks : "generates"
    ims_sales_orders        ||--|{ wms_packages : "is packed into"
    wms_packages            ||--|{ wms_package_items : "contains"
    ims_products            ||--o{ wms_package_items : "is"

    %% Process Trigger Relationships
    ims_inbound_shipments   ||--o{ wms_tasks : "triggers putaway"
    wms_bin_thresholds      ||--o{ wms_tasks : "triggers replenishment"
    ims_returns             ||--o{ wms_tasks : "triggers returns processing"
```
