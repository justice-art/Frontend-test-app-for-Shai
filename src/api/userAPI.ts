import type { User } from '../types/User';

const BASE_URL = 'http://localhost:3000';

export const fetchAllUsers = async (): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users`);
  if (!res.ok) throw new Error('Failed to fetch users');
  return res.json();
};

export const searchUsers = async (name: string): Promise<User[]> => {
  const res = await fetch(`${BASE_URL}/users/search`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      filter: { name },
      page: 0,
      pageSize: 10,
    }),
  });
  if (!res.ok) throw new Error('Failed to search users');
  return res.json();
};

export const fetchUserById = async (id: string): Promise<User> => {
  const res = await fetch(`${BASE_URL}/users/${id}`);
  if (!res.ok) throw new Error('Failed to fetch user');
  return res.json();
};
