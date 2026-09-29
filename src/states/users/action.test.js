/**
 * skenario test
 *
 * - asyncPopulateUsers thunk
 *  - should dispatch action correctly when data fetching success
 *  - should dispatch action and call alert correctly when data fetching failed
 */

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import api from '../../utils/api';
import { asyncPopulateUsers, receiveUsersActionCreator } from './action';

const fakeUsersResponse = [
  {
    id: 'john_doe',
    name: 'John Doe',
    email: 'john@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'jane_doe',
    name: 'Jane Doe',
    email: 'jane@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
  {
    id: 'fulan',
    name: 'Si Fulan',
    email: 'fulan@example.com',
    avatar: 'https://generated-image-url.jpg',
  },
];

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncPopulateUsers', async () => {
  beforeEach(() => {
    api._getUsers = api.getUsers;
  });

  it('should dispatch action correctly when data fetching success', async () => {
    api.getUsers = () => Promise.resolve(fakeUsersResponse);

    const dispatch = vi.fn();

    await asyncPopulateUsers()(dispatch);

    expect(dispatch).toHaveBeenCalledWith(receiveUsersActionCreator(fakeUsersResponse));
  });

  it('should dispatch action and call alert correctly when data fetching failed', async () => {
    api.getUsers = () => Promise.reject(fakeErrorResponse);

    const dispatch = vi.fn();
    window.alert = vi.fn();

    await asyncPopulateUsers()(dispatch);

    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });

  afterEach(() => {
    api.getUsers = api._getUsers;
    delete api._getUsers;
  });
});
