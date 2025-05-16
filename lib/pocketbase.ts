import Pocketbase from 'pocketbase';
import env from './env';
import type { TypedPocketBase } from './pocketbase.gen';

export const pb = new Pocketbase(env.POCKETBASE_URL) as TypedPocketBase;

export type InsertRecord<T> = Omit<T, 'id' | 'created' | 'updated'>;

export type UpdateRecord<T> = Partial<InsertRecord<T>>;
