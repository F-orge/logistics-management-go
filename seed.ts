import PocketBase from 'pocketbase';
import { faker } from '@faker-js/faker';
import {
    Collections,
    type TypedPocketBase,
    type UsersRecord,
    UsersRoleOptions,
    type EmployeeRecord,
    type DepartmentRecord,
    type NotificationsRecord,
    type ShipmentRecord,
    ShipmentTransportModeOptions,
    ShipmentPriorityOptions,
    ShipmentWeightTypeOptions,
    ShipmentShipmentTypeOptions,
    ShipmentStatusOptions,
    ShipmentPriceCurrencyOptions,
    ShipmentPaymentModeOptions,
    type ShipmentItemRecord,
    type TasksRecord,
    TasksStatusOptions,
    type ChatMessageRecord,
    type TasksMessagesRecord
} from './web/lib/pocketbase-types'; // Adjust path if your types file is elsewhere

// --- Configuration ---
const POCKETBASE_URL = process.env.POCKETBASE_URL || 'http://127.0.0.1:8090'; // Replace with your PocketBase URL
const ADMIN_EMAIL = process.env.POCKETBASE_ADMIN_EMAIL || 'admin@example.com';       // Replace with your admin email
const ADMIN_PASSWORD = process.env.POCKETBASE_ADMIN_PASSWORD || 'password123';   // Replace with your admin password

const NUM_USERS = 20;
const NUM_DEPARTMENTS = 5;
const NUM_EMPLOYEES_PER_DEPARTMENT_MAX = 8; // Max, can be less
const NUM_SHIPMENTS = 30;
const NUM_SHIPMENT_ITEMS_PER_SHIPMENT_MAX = 5;
const NUM_TASKS = 25;
const NUM_MESSAGES_PER_ENTITY_MAX = 10; // For chat, task messages

// --- PocketBase Client ---
const pb = new PocketBase(POCKETBASE_URL) as TypedPocketBase;

const res = await pb.collection('_superusers').authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD)

// --- Helper Functions ---
function randomEnumValue<T extends object>(enumObj: T): T[keyof T] {
    const enumValues = Object.values(enumObj) as T[keyof T][];
    return faker.helpers.arrayElement(enumValues);
}

async function clearCollection(collectionName: Collections) {
    try {
        console.log(`Clearing collection: ${collectionName}...`);
        const records = await pb.collection(collectionName).getFullList({ batch: 200 });
        for (const record of records) {
            await pb.collection(collectionName).delete(record.id);
        }
        console.log(`Collection ${collectionName} cleared successfully.`);
    } catch (error) {
        console.error(`Error clearing collection ${collectionName}:`, error);
    }
}

// --- Seeding Functions ---

async function seedUsers(): Promise<UsersRecord[]> {
    console.log('Seeding users...');
    const createdUsers: UsersRecord[] = [];

    for (let i = 0; i < NUM_USERS; i++) {
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        // Download avatar image and convert to File for PocketBase upload
        const avatarUrl = faker.image.avatarGitHub();
        
        let avatarFile: File | undefined = undefined;
        try {
            const response = await fetch(avatarUrl);
            const blob = await response.blob();
            avatarFile = new File([blob], `avatar-${faker.string.uuid()}.png`, { type: blob.type });
        } catch (err) {
            console.warn(`Failed to fetch avatar image, using URL instead.`, err);
        }

        const userData: Partial<UsersRecord> = {
            name: `${firstName} ${lastName}`,
            email: faker.internet.email({ firstName, lastName }),
            password: 'password123', // PocketBase will hash this
            passwordConfirm: 'password123', // Required for user creation via API
            emailVisibility: true,
            verified: faker.datatype.boolean(0.8), // 80% chance of being verified
            role: randomEnumValue(UsersRoleOptions),
            //@ts-ignore
            avatar: avatarFile,
            address: `<p>${faker.location.streetAddress(true)}</p>`,
        };
        try {
            const record = await pb.collection(Collections.Users).create<UsersRecord>(userData);
            createdUsers.push(record);
            console.log(`Created user: ${record.name} (ID: ${record.id})`);
        } catch (error) {
            console.error(`Failed to create user ${userData.name}:`, (error as any)?.response?.data || error);
        }
    }
    console.log(`${createdUsers.length} users seeded.`);
    return createdUsers;
}

async function seedDepartments(allUsers: UsersRecord[]): Promise<DepartmentRecord[]> {
    console.log('Seeding departments...');
    const createdDepartments: DepartmentRecord[] = [];
    const potentialManagers = allUsers.filter(u => u.role === UsersRoleOptions.manager || u.role === UsersRoleOptions.admin);
    const potentialEmployees = allUsers.filter(u => u.role === UsersRoleOptions.employee);
    for (let i = 0; i < NUM_DEPARTMENTS; i++) {

        let avatarFile: File | undefined = undefined;
        let coverPhoto: File | undefined = undefined;
        try {
            const avatarResponse = await fetch(faker.image.urlLoremFlickr({ category: 'business' }));
            const coverResponse = await fetch(faker.image.urlLoremFlickr({ category: 'abstract', width: 1200, height: 400 }));
            const avatarBlob = await avatarResponse.blob();
            const coverBlob = await coverResponse.blob();
            avatarFile = new File([avatarBlob], `avatar-${faker.string.uuid()}.png`, { type: avatarBlob.type });
            coverPhoto = new File([coverBlob], `cover-${faker.string.uuid()}.png`, { type: coverBlob.type });
        } catch (err) {
            console.warn(`Failed to fetch avatar image, using URL instead.`, err);
        }
        const departmentData: Partial<DepartmentRecord> = {
            name: faker.commerce.department() + ` ${faker.company.buzzNoun()}`,
            //@ts-ignore
            avatar: avatarFile,
            //@ts-ignore
            cover_photo: coverPhoto,
            managers: potentialManagers.length > 0 ? faker.helpers.arrayElements(potentialManagers, faker.number.int({ min: 1, max: Math.min(2, potentialManagers.length) })).map(u => u.id) : [],
            employees: potentialEmployees.length > 0 ? faker.helpers.arrayElements(potentialEmployees, faker.number.int({ min: 1, max: Math.min(5, potentialEmployees.length) })).map(u => u.id) : [],
          };
        try {
            const record = await pb.collection(Collections.Department).create<DepartmentRecord>(departmentData);
            createdDepartments.push(record);
            console.log(`Created department: ${record.name} (ID: ${record.id})`);
        } catch (error) {
            console.error(`Failed to create department ${departmentData.name}:`, error);
        }
    }
    console.log(`${createdDepartments.length} departments seeded.`);
    return createdDepartments;
}

async function seedEmployees(allUsers: UsersRecord[], allDepartments: DepartmentRecord[]): Promise<EmployeeRecord[]> {
    console.log('Seeding employees...');
    const createdEmployees: EmployeeRecord[] = [];
    const usersWithoutEmployeeRecord = [...allUsers]; // Avoid assigning same user to multiple employee records if desired

    for (const department of allDepartments) {
        const numEmployees = faker.number.int({ min: 1, max: Math.min(NUM_EMPLOYEES_PER_DEPARTMENT_MAX, usersWithoutEmployeeRecord.length) });
        const departmentEmployeeIds: string[] = [];

        for (let i = 0; i < numEmployees; i++) {
            if (usersWithoutEmployeeRecord.length === 0) break;
            const userIndex = faker.number.int({ min: 0, max: usersWithoutEmployeeRecord.length - 1 });
            const user = usersWithoutEmployeeRecord.splice(userIndex, 1)[0]; // Get and remove user

            const employeeData: Partial<EmployeeRecord> = {
                user_id: user.id,
                first_name: user.name?.split(' ')[0] || faker.person.firstName(),
                last_name: user.name?.split(' ').slice(-1)[0] || faker.person.lastName(),
                middle_name: faker.datatype.boolean(0.3) ? faker.person.middleName() : undefined,
                job_role: faker.person.jobTitle(),
            };
            try {
                const record = await pb.collection(Collections.Employee).create<EmployeeRecord>(employeeData);
                createdEmployees.push(record);
                departmentEmployeeIds.push(record.id);
                console.log(`Created employee: ${record.first_name} ${record.last_name} (ID: ${record.id}) for user ${user.id}`);
            } catch (error) {
                console.error(`Failed to create employee for user ${user.id}:`, error);
            }
        }
        // Update department with these employees
        if (departmentEmployeeIds.length > 0) {
            try {
                await pb.collection(Collections.Department).update(department.id, {
                    employees: departmentEmployeeIds
                });
                console.log(`Updated department ${department.name} with ${departmentEmployeeIds.length} employees.`);
            } catch (error) {
                console.error(`Failed to update department ${department.name} with employees:`, error);
            }
        }
    }
    console.log(`${createdEmployees.length} employees seeded.`);
    return createdEmployees;
}

async function seedShipments(allUsers: UsersRecord[]): Promise<ShipmentRecord[]> {
    console.log('Seeding shipments...');
    const createdShipments: ShipmentRecord[] = [];

    for (let i = 0; i < NUM_SHIPMENTS; i++) {
        const shipmentData: Partial<ShipmentRecord> = {
            address: `<p>${faker.location.streetAddress(true)}</p>`,
            delivery_attempts: faker.number.int({ min: 1, max: 3 }),
            payment_mode: randomEnumValue(ShipmentPaymentModeOptions),
            payment_reference_id: faker.finance.routingNumber(),
            price: parseFloat(faker.commerce.price({ min: 100, max: 5000 })),
            price_currency: randomEnumValue(ShipmentPriceCurrencyOptions),
            priority: randomEnumValue(ShipmentPriorityOptions),
            receiver_name: faker.person.fullName(),
            sender_name: faker.person.fullName(),
            shipment_type: randomEnumValue(ShipmentShipmentTypeOptions),
            status: randomEnumValue(ShipmentStatusOptions),
            transport_mode: randomEnumValue(ShipmentTransportModeOptions),
            transport_reference_id: `TRN-${faker.string.alphanumeric(10).toUpperCase()}`,
            weight: faker.number.int({ min: 1, max: 1000 }),
            weight_type: randomEnumValue(ShipmentWeightTypeOptions),
            proof_of_delivery: [], // Usually added later
            chat_messages: [], // Will be populated later if needed or can link to general chat messages
            return_attempts: faker.datatype.boolean(0.1) ? faker.number.int({ min: 0, max: 2 }) : undefined,
        };

        try {
            const record = await pb.collection(Collections.Shipment).create<ShipmentRecord>(shipmentData as ShipmentRecord);
            createdShipments.push(record);
            console.log(`Created shipment: ${record.id} for ${record.receiver_name}`);
        } catch (error) {
            console.error(`Failed to create shipment for ${shipmentData.receiver_name}:`, (error as any)?.response?.data || error);
        }
    }
    console.log(`${createdShipments.length} shipments seeded.`);
    return createdShipments;
}

async function seedShipmentItems(allShipments: ShipmentRecord[]): Promise<ShipmentItemRecord[]> {
    console.log('Seeding shipment items...');
    const createdItems: ShipmentItemRecord[] = [];

    for (const shipment of allShipments) {
        const numItems = faker.number.int({ min: 1, max: NUM_SHIPMENT_ITEMS_PER_SHIPMENT_MAX });
        for (let i = 0; i < numItems; i++) {
            const itemData: Partial<ShipmentItemRecord> = {
                shipment_id: shipment.id,
                name: faker.commerce.productName(),
                description: `<p>${faker.commerce.productDescription()}</p>`,
                product_photo: Array.from({ length: faker.number.int({ min: 0, max: 3 }) }, () => faker.image.urlLoremFlickr({ category: 'technics' })),
            };
            try {
                const record = await pb.collection(Collections.ShipmentItem).create<ShipmentItemRecord>(itemData);
                createdItems.push(record);
                console.log(`Created shipment item: ${record.name} for shipment ${shipment.id}`);
            } catch (error) {
                console.error(`Failed to create shipment item ${itemData.name}:`, error);
            }
        }
    }
    console.log(`${createdItems.length} shipment items seeded.`);
    return createdItems;
}

async function seedTasks(allUsers: UsersRecord[], allDepartments: DepartmentRecord[]): Promise<TasksRecord[]> {
    console.log('Seeding tasks...');
    const createdTasks: TasksRecord[] = [];
    if (allUsers.length === 0) {
        console.warn("No users available to assign tasks. Skipping task seeding.");
        return [];
    }

    for (let i = 0; i < NUM_TASKS; i++) {
        const assigner = faker.helpers.arrayElement(allUsers);
        const assignees = faker.helpers.arrayElements(allUsers.filter(u => u.id !== assigner.id), faker.number.int({ min: 1, max: Math.min(3, allUsers.length -1) }));

        const taskData: Partial<TasksRecord> = {
            title: faker.hacker.phrase().replace(/^./, (match) => match.toUpperCase()),
            description: `<p>${faker.lorem.paragraphs({min:1, max:3})}</p>`,
            status: randomEnumValue(TasksStatusOptions),
            assigner: assigner.id,
            assignees: assignees.map(u => u.id),
            department: allDepartments.length > 0 ? faker.helpers.arrayElement(allDepartments).id : undefined,
            attachments: faker.datatype.boolean(0.2) ? Array.from({ length: faker.number.int({ min: 1, max: 2 }) }, () => faker.system.commonFileName('zip')) : [],
        };
        try {
            const record = await pb.collection(Collections.Tasks).create<TasksRecord>(taskData);
            createdTasks.push(record);
            console.log(`Created task: ${record.title} (ID: ${record.id})`);
        } catch (error) {
            console.error(`Failed to create task ${taskData.title}:`, (error as any)?.response?.data || error);
        }
    }
    console.log(`${createdTasks.length} tasks seeded.`);
    return createdTasks;
}

async function seedChatMessages(allUsers: UsersRecord[], allShipments: ShipmentRecord[]): Promise<ChatMessageRecord[]> {
    console.log('Seeding chat messages...');
    const createdMessages: ChatMessageRecord[] = [];
    if (allUsers.length < 2) {
        console.warn("Not enough users to create chat messages. Skipping.");
        return [];
    }

    // For general chat messages (can be associated with shipments or be general user-to-user)
    for (let i = 0; i < NUM_USERS * 2; i++) { // Create a few messages per user on average
        const sender = faker.helpers.arrayElement(allUsers);
        const receiver = faker.helpers.arrayElement(allUsers.filter(u => u.id !== sender.id));
        if (!receiver) continue;

        const messageData: Partial<ChatMessageRecord> = {
            sender_id: sender.id,
            receiver_id: receiver.id,
            content: `<p>${faker.lorem.sentence()}</p>`,
            attachments: faker.datatype.boolean(0.1) ? [faker.image.urlPlaceholder()] : [],
        };
        try {
            const record = await pb.collection(Collections.ChatMessage).create<ChatMessageRecord>(messageData);
            createdMessages.push(record);
            console.log(`Created chat message from ${sender.id} to ${receiver.id}`);

            // Optionally link some messages to shipments
            if (allShipments.length > 0 && faker.datatype.boolean(0.2)) {
                const shipment = faker.helpers.arrayElement(allShipments);
                await pb.collection(Collections.Shipment).update(shipment.id, {
                    'chat_messages+': record.id
                });
                console.log(`Linked chat message ${record.id} to shipment ${shipment.id}`);
            }

        } catch (error) {
            console.error(`Failed to create chat message:`, error);
        }
    }
    console.log(`${createdMessages.length} chat messages seeded.`);
    return createdMessages;
}

async function seedTaskMessages(allTasks: TasksRecord[], allUsers: UsersRecord[]): Promise<TasksMessagesRecord[]> {
    console.log('Seeding task messages...');
    const createdTaskMessages: TasksMessagesRecord[] = [];
    if (allTasks.length === 0 || allUsers.length === 0) {
        console.warn("No tasks or users available for task messages. Skipping.");
        return [];
    }

    for (const task of allTasks) {
        const numMessages = faker.number.int({ min: 0, max: NUM_MESSAGES_PER_ENTITY_MAX });
        for (let i = 0; i < numMessages; i++) {
            // Sender can be assigner or one of the assignees
            const potentialSenders = [task.assigner, ...(task.assignees || [])].filter(Boolean) as string[];
            if (potentialSenders.length === 0) continue;
            const senderId = faker.helpers.arrayElement(potentialSenders);
            
            const messageData: Partial<TasksMessagesRecord> = {
                task_id: task.id,
                sender_id: senderId,
                content: `<p>${faker.lorem.sentence()}</p>`,
                attachments: faker.datatype.boolean(0.1) ? [faker.system.commonFileName('txt')] : [],
            };
            try {
                const record = await pb.collection(Collections.TasksMessages).create<TasksMessagesRecord>(messageData);
                createdTaskMessages.push(record);
                console.log(`Created task message for task ${task.id} by sender ${senderId}`);
            } catch (error) {
                console.error(`Failed to create task message for task ${task.id}:`, error);
            }
        }
    }
    console.log(`${createdTaskMessages.length} task messages seeded.`);
    return createdTaskMessages;
}

async function seedNotifications(allUsers: UsersRecord[]): Promise<NotificationsRecord[]> {
    console.log('Seeding notifications...');
    const createdNotifications: NotificationsRecord[] = [];
    if (allUsers.length === 0) {
        console.warn("No users to send notifications to. Skipping.");
        return [];
    }

    for (let i = 0; i < NUM_USERS * 1.5; i++) { // Average 1.5 notifications per user
        const user = faker.helpers.arrayElement(allUsers);
        const notificationData: Partial<NotificationsRecord> = {
            user: user.id,
            title: faker.company.catchPhrase(),
            message: faker.lorem.sentence(),
            link: faker.datatype.boolean(0.7) ? `/some/path/${faker.string.uuid()}` : undefined,
        };
        try {
            const record = await pb.collection(Collections.Notifications).create<NotificationsRecord>(notificationData);
            createdNotifications.push(record);
            console.log(`Created notification for user ${user.id}: ${record.title}`);
        } catch (error) {
            console.error(`Failed to create notification for user ${user.id}:`, error);
        }
    }
    console.log(`${createdNotifications.length} notifications seeded.`);
    return createdNotifications;
}


// --- Main Seeding Orchestrator ---
async function seedDatabase() {
    try {
        // Authenticate as admin
        await pb.admins.authWithPassword(ADMIN_EMAIL, ADMIN_PASSWORD);
        console.log('Admin authentication successful.');

        // Clear existing data (BE CAREFUL WITH THIS)
        // Start with collections that are referenced by others, then those that reference them.
        // Or, if relations are optional or set to cascade delete, order is less critical for clearing.
        console.warn('--- STARTING DATA DELETION ---');
        await clearCollection(Collections.TasksMessages);
        await clearCollection(Collections.ShipmentItem);
        await clearCollection(Collections.ChatMessage); // Referenced by Shipment
        await clearCollection(Collections.Notifications);
        await clearCollection(Collections.Tasks); // Referenced by Department, Users
        await clearCollection(Collections.Shipment);
        await clearCollection(Collections.Employee); // Referenced by Department, User
        await clearCollection(Collections.Department); // Referenced by Employee, Tasks
        await clearCollection(Collections.Users);     // Base for many
        console.warn('--- DATA DELETION COMPLETE ---');


        // Seed data
        console.log('--- STARTING DATA SEEDING ---');
        const users = await seedUsers();
        const departments = await seedDepartments(users); // Pass users for manager assignment
        await seedEmployees(users, departments); // Pass users and departments for linking
        const shipments = await seedShipments(users); // Pass users if shipments relate to users directly (e.g. created_by)
        await seedShipmentItems(shipments);
        const tasks = await seedTasks(users, departments);
        await seedChatMessages(users, shipments); // For user-to-user and linking to shipments
        await seedTaskMessages(tasks, users);
        await seedNotifications(users);

        console.log('--- DATABASE SEEDING COMPLETE ---');

    } catch (error) {
        console.error('An error occurred during the seeding process:', (error as any)?.response?.data || error);
    } finally {
        // Clear auth store if you want, or just let the script exit
        pb.authStore.clear();
    }
}

// Run the seeder
seedDatabase();