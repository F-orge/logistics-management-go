import { describe, expect, it } from 'bun:test';
import api from '@/api';

describe('Better auth sign in', () => {
  it('should log in successfully', async () => {
    const request = new Request('http://example.com');

    const response = await api.auth.signIn.callable({
      context: {
        auth: globalThis.betterAuth,
        request,
        user: null,
        session: null,
      },
    })({ email: 'johndoe@email.com', password: 'randompassword' });

    expect(response.user.name).toBe('John doe');
    expect(response.user.email).toBe('johndoe@email.com');
  });

  it('should throw an error if password is incorrect', () => {
    const request = new Request('http://example.com');

    const response = () =>
      api.auth.signIn.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({ email: 'johndoe@email.com', password: 'incorrectpassword' });

    expect(response).toThrowError();
  });

  it('should throw an error if email is not registered', () => {
    const request = new Request('http://example.com');

    const response = () =>
      api.auth.signIn.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({ email: 'unverified@email.com', password: 'randompassword' });

    expect(response).toThrowError();
  });
});
