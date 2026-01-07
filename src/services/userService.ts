
export const fetchUsers = async () => {
  const response = await fetch('/api/users');

  if (!response.ok) {
    throw new Error('Failed to fetch users');
  }

  const data = await response.json();
  return data.users;
};
