import api from '@/api';
import { describe, expect, it } from 'bun:test';

describe('Better auth sign up', () => {
  it('should register a new user', async () => {
    const request = new Request('http://example.com');

    const result = await api.auth.signUp.callable({
      context: {
        auth: globalThis.betterAuth,
        request,
        user: null,
        session: null,
      },
    })({
      email: 'johndoe@email.com',
      name: 'John doe',
      password: 'randompassword',
    });

    expect(result.user.email).toBe('johndoe@email.com');
    expect(result.user.name).toBe('John doe');
  });

  it('should not register with existing email', async () => {
    const request = new Request('http://example.com');

    const testCase = async () =>
      api.auth.signUp.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({
        email: 'johndoe@email.com',
        name: 'John doe',
        password: 'randompassword',
      });

    expect(testCase).toThrowError();
  });

  it('should not register user with invalid email format', () => {
    const request = new Request('http://example.com');

    const testCase = async () =>
      api.auth.signUp.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({
        email: 'johndoe@@sdfwe.com',
        name: 'John doe',
        password: 'randompassword',
      });

    expect(testCase).toThrowError();
  });

  it('should not register user with short password', () => {
    const request = new Request('http://example.com');

    const testCase = async () =>
      api.auth.signUp.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({
        email: 'janedoe@email.com',
        name: 'Jane doe',
        password: 'short',
      });

    expect(testCase).toThrowError();
  });

  it('should not register user with very long password (128 max)', () => {
    const request = new Request('http://example.com');

    const testCase = async () =>
      api.auth.signUp.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({
        email: 'alex@email.com',
        name: 'Alex cruz',
        password:
          'awefhkjlfaewhkjfwaehjkefawjhkhajflkewwhljkwfefhjafewhljkefawlhjkewfakhljakfewhljkefawhljkefawhjlkefawhljkefhlwlewfalhjkaewfakhwehkfjajkhwehfjkahwjkefhkjawlhkelhfjkalhjkwef',
      });

    expect(testCase).toThrowError();
  });

  it('should not register user with bad image format', () => {
    const request = new Request('http://example.com');

    const testCase = async () =>
      api.auth.signUp.callable({
        context: {
          auth: globalThis.betterAuth,
          request,
          user: null,
          session: null,
        },
      })({
        email: 'alex@email.com',
        name: 'Alex cruz',
        password: 'randompassword',
        image: '/file.jpg',
      });

    expect(testCase).toThrowError();
  });
});
