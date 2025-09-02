# User Story: Delivery Task Assignment

**User Story:** As a dispatch manager, I want to assign delivery tasks to
available drivers based on their location and workload, so that I can ensure an
even distribution of work and timely deliveries.

**Acceptance Criteria:**

- **Given** there is a list of unassigned delivery orders for the day **When** I
  view the dispatch dashboard **Then** I should see a map with the real-time
  location of all available drivers and the locations of the delivery stops.

- **Given** I need to assign an order **When** I select one or more orders and a
  specific driver **Then** the orders should be added to that driver's route for
  the day.

- **Given** an order is assigned to a driver **When** the driver logs into their
  mobile app **Then** they should see the new delivery task in their list for
  the day.

---

# User Story: Last-Mile Route Optimization

**User Story:** As a dispatch manager, I want the system to automatically
generate optimized delivery routes for my drivers, so that they can complete
more deliveries in less time and reduce fuel costs.

**Acceptance Criteria:**

- **Given** a driver has been assigned a set of delivery tasks for the day
  **When** I click the "Optimize Route" button for that driver **Then** the
  system should calculate the most efficient sequence of stops, considering
  traffic patterns and delivery time windows.

- **Given** the route has been optimized **When** the driver views their route
  in the mobile app **Then** the stops should be listed in the optimized order,
  with turn-by-turn navigation available for the entire route.

---

# User Story: Driver Mobile App for Task Management

**User Story:** As a delivery driver, I want a mobile app that shows me my daily
tasks, provides customer information, and allows me to update the status of each
delivery, so that I can efficiently manage my workday.

**Acceptance Criteria:**

- **Given** I am logged into the driver app **When** I start my shift **Then** I
  should see a list of all my assigned deliveries for the day, ordered by the
  optimized route.

- **Given** I select a delivery task **When** I view its details **Then** I
  should see the recipient's name, address, contact number, and any special
  delivery instructions.

- **Given** I have completed a delivery **When** I update the status in the app
  (e.g., "Delivered," "Attempted," "Failed") **Then** the system should update
  in real-time, and I should be prompted to capture proof of delivery if
  required.

---

# User Story: Real-Time Tracking for Customers

**User Story:** As an end customer, I want to receive a notification with a
real-time tracking link when my package is out for delivery, so that I know when
to expect its arrival.

**Acceptance Criteria:**

- **Given** a driver has started their delivery route **When** my package is the
  next stop on the route **Then** I should receive an SMS or email notification
  with a link to a live tracking map.

- **Given** I click the tracking link **When** the map opens **Then** I should
  see the real-time location of the delivery vehicle and an estimated time of
  arrival (ETA).

- **Given** the driver is a few minutes away **When** the vehicle's location
  updates **Then** the ETA on the map should update dynamically to reflect the
  driver's progress.
