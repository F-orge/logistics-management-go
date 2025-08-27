import Pocketbase from 'pocketbase';
import type { TypedPocketBase } from './types';

export const pb = new Pocketbase('/') as TypedPocketBase;

export type CreateRecord<T> = Omit<T, 'id' | 'created' | 'updated'>;

export type UpdateRecord<T> = Partial<CreateRecord<T>>;
