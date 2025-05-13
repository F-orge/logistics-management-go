import { faker } from '@faker-js/faker';
import PocketBase from 'pocketbase';
import type {
  TypedPocketBase,
  UsersRecord,
  UsersResponse,
} from '~/lib/pocketbase-types';

// seed locally
const pb = new PocketBase(`http://localhost:8090`) as TypedPocketBase;

if ((await pb.health.check()).code !== 200) {
} else {
  console.info('INFO:', '[POCKETBASE]', 'Connection successfull');
}

// authenticate as super user
await pb
  .collection('_superusers')
  .authWithPassword('development@email.com', 'development123');

if (!pb.authStore.isValid) {
  console.error('ERROR:', '[POCKETBASE]', 'Cannot Login as superuser');
} else {
  console.info('INFO:', '[POCKETBASE]', 'Account login successfull');
}

// generate 10,000 customers
for (let _ = 0; _ < 10_000; _++) {
  const batch = pb.createBatch();
  for (let _ = 0; _ < 5; _++) {
    const password = faker.internet.password();
    const data = {
      password: password,
      passwordConfirm: password,
      email: faker.internet.email(),
      emailVisibility: true,
      verified: true,
      name: faker.person.fullName(),
      role: 'customer',
    };
    batch.collection('users').create(data);
  }
  try {
    await batch.send();
    console.log(
      'INFO:',
      '[USER COLLECTION]',
      'Batch Customer created successfully',
    );
  } catch (e) {
    console.log(e);
    console.error('ERROR:', '[USER COLLECTION]', 'Unable to create customer');
  }
}

// generate 5 admins
for (let _ = 0; _ < 5; _++) {
  const password = faker.internet.password();
  const data = {
    password: password,
    passwordConfirm: password,
    email: faker.internet.email(),
    emailVisibility: true,
    verified: true,
    name: faker.person.fullName(),
    role: 'admin',
  };
  try {
    await pb.collection('users').create<UsersResponse>(data);
    console.log('INFO:', '[USER COLLECTION]', 'Admin created successfully');
  } catch (e) {
    console.error('ERROR:', '[USER COLLECTION]', 'Unable to create admin');
  }
}

// generate 20 employees
for (let _ = 0; _ < 20; _++) {
  const password = faker.internet.password();
  const data = {
    password: password,
    passwordConfirm: password,
    email: faker.internet.email(),
    emailVisibility: true,
    verified: true,
    name: faker.person.fullName(),
    role: 'employee',
  };
  try {
    await pb.collection('users').create<UsersResponse>(data);
    console.log('INFO:', '[USER COLLECTION]', 'Employee created successfully');
  } catch (e) {
    console.error('ERROR:', '[USER COLLECTION]', 'Unable to create employee');
  }
}
