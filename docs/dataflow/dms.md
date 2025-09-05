## DMS Data Flow Explanation

This document outlines the data flows within the Delivery Management System
(DMS), which focuses on the final mile of the delivery process. It covers how
delivery routes are planned, executed by drivers, and tracked by both
dispatchers and end customers.

### Dispatch & Route Optimization Flow

This flow describes how packages ready for shipment are assigned to drivers and
how their daily routes are planned and optimized.

```mermaid
graph TD
    subgraph "Inputs from other Systems"
        WMS[(WMS Packages)] -- Ready for Delivery --> Dispatcher[Dispatch Manager]
        TMS[(TMS Drivers)] -- Provides Available Drivers --> Dispatcher
    end

    subgraph "Dispatch & Planning"
        Dispatcher -- Views Packages & Drivers on --> Dashboard[Dispatch Dashboard & Map]
        Dispatcher -- Assigns Packages to Driver --> CreateRoute{Create Delivery Route}
        CreateRoute --> DeliveryRoutes[(dms_delivery_routes)]
        DeliveryRoutes -- Contains --> DeliveryTasks[(dms_delivery_tasks)]
        
        Dispatcher -- Initiates --> Optimizer{Optimize Route}
        Optimizer -- Calculates & Updates --> DeliveryRoutes
    end

    subgraph "Output to Driver"
        DeliveryRoutes -- Appears on --> DriverApp[Driver's Mobile App]
    end
```

- **Inputs**: The process begins when the **Dispatch Manager** receives a list
  of packaged orders from the WMS and a list of available drivers from the TMS.
- **Dispatch & Planning**:
  - Using a dashboard, the Dispatcher visualizes the package destinations and
    driver locations.
  - They assign one or more packages to a driver, which creates a **Delivery
    Route**. This route is composed of individual **Delivery Tasks**.
  - The Dispatcher then uses the system's **Route Optimizer** to calculate the
    most efficient sequence of stops. The optimized path and turn-by-turn data
    are saved to the route.
- **Output**: The newly created and optimized route appears on the assigned
  **Driver's** mobile application, ready for them to start their day.

### Driver Delivery Execution Flow

This flow details the driver's interaction with the mobile app to complete their
assigned deliveries.

```mermaid
graph TD
    subgraph "Driver's Mobile App"
        Driver[Delivery Driver] -- Starts Route & Follows --> OptimizedRoute[Optimized Route Sequence]
        OptimizedRoute -- Navigates to --> DeliveryStop{Delivery Stop}
        
        Driver -- At Stop, Updates Status --> CreateEvent[Create Task Event]
        CreateEvent --> TaskEvents[(dms_task_events)]
        
        Driver -- If Delivered --> CapturePOD{Capture Proof of Delivery}
        CapturePOD --> PODs[(dms_proof_of_deliveries)]
    end

    subgraph "Real-Time System Updates"
        direction LR
        DriverApp[Driver's App] -- Constantly Sends --> LocationUpdate[Location Update]
        LocationUpdate --> DriverLocations[(dms_driver_locations)]
        
        TaskEvents -- Updates --> DeliveryTasks[(dms_delivery_tasks)]
        DriverLocations -- Feeds --> DispatcherDashboard[Dispatcher's Live Map]
    end
```

- **Route Execution**: The **Delivery Driver** follows the optimized sequence of
  stops presented in their mobile app.
- **Task Updates**: At each stop, the driver updates the delivery status (e.g.,
  "Delivered," "Failed"). Each update creates a **Task Event**, providing a
  real-time audit trail.
- **Proof of Delivery**: For successful deliveries, the driver is prompted to
  capture **Proof of Delivery** (a signature or photo), which is linked to the
  specific delivery task.
- **Location Tracking**: Throughout the day, the driver's app sends GPS data to
  the system, which populates their **Driver Location** and allows the Dispatch
  Manager to monitor progress on a live map.

### Customer Tracking Experience Flow

This flow describes how the end customer is kept informed and can track their
package in real-time on the day of delivery.

```mermaid
graph TD
    subgraph "System Triggers"
        DeliveryTasks[(dms_delivery_tasks)] -- Status is 'Out for Delivery' --> GenerateLink{Generate Tracking Link}
        GenerateLink --> TrackingLinks[(dms_customer_tracking_links)]
        TrackingLinks -- Sent Via --> Notification[SMS/Email Notification]
    end

    subgraph "Customer Interaction"
        Notification -- Contains Link for --> Customer[End Customer]
        Customer -- Clicks Link & Opens --> TrackingPage[Live Tracking Web Page]
    end

    subgraph "Live Tracking Data"
        DriverLocations[(dms_driver_locations)] -- Feeds Real-Time Location to --> TrackingPage
        OptimizedRoute[(dms_delivery_routes)] -- Provides ETA to --> TrackingPage
    end
```

- **Notification Trigger**: When a driver begins their route and a package is
  marked as "Out for Delivery," the system automatically generates a unique,
  secure **Customer Tracking Link**. This link is sent to the **End Customer**
  via SMS or email.
- **Live Tracking**: The customer clicks the link to open a web page displaying
  a live map. This page shows the real-time location of the delivery vehicle
  (fed by **Driver Locations**) and a dynamically updated Estimated Time of
  Arrival (ETA), giving the customer full visibility into the final stage of
  their delivery.
