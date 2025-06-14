import axios from 'axios';

export const client = axios.create({ baseURL: '/api' });

export type ValidationError = Record<
  string,
  {
    code: string;
    message?: string;
    params: Record<string, unknown>;
  }[]
>;
