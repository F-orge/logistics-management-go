import { describe, expect, it } from 'bun:test';
import api from '@/api';

describe('Better auth sign out', () => {
  it('should sign out current user that is logged in', async () => {
    const loginRequest = new Request('http://example.com');

    // login mechanism
    const { token } = await api.auth.signIn.callable({
      context: {
        auth: globalThis.betterAuth,
        request: loginRequest,
        user: null,
        session: null,
      },
    })({ email: 'johndoe@email.com', password: 'randompassword' });

    const signOutRequest = new Request('http://example.com', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await api.auth.signOut.callable({
      context: {
        auth: globalThis.betterAuth,
        request: signOutRequest,
        user: null,
        session: null,
      },
    })();

    expect(response.success).toBeTrue();
  });

  it("should throw if the user sign's out without logging in", async () => {
    const signOutRequest = new Request('http://example.com', {
      headers: {
        Authorization: `Bearer wrongtoken`,
      },
    });

    const response = () =>
      api.auth.signOut.callable({
        context: {
          auth: globalThis.betterAuth,
          request: signOutRequest,
          user: null,
          session: null,
        },
      })();

    expect(response).toThrowError();
  });
});
