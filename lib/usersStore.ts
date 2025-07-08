export type User = {
  name: string;
  email: string;
  password: string;
  favorites: string[];
  subscriptions: string[];
};

// En memoria: no se borra mientras el servidor no se reinicie
const users: User[] = [
  {
    name: "John Doe",
    email: "johndoe123@learnit.com",
    password: "dqbf5jstmjvGQ6B", // En producción esto debería estar hasheado
    favorites: [],
    subscriptions: []
  },
];

export function getUsers() {
  return users;
}

export function addUser(user: Omit<User, 'favorites' | 'subscriptions'>) {
  users.push({ ...user, favorites: [], subscriptions: [] });
}

export function updateUser(email: string, updatedData: Partial<User>) {
  const user = users.find((u) => u.email === email);
  if (user) {
    Object.assign(user, updatedData);
  }
}

export function updateUserFavorites(email: string, favorites: string[]) {
  const user = users.find((u) => u.email === email);
  if (user) {
    user.favorites = favorites;
    console.log(`🔄 Updated favorites for ${email}:`, user.favorites);
  } else {
    console.log(`❌ No user found with email ${email}`);
  }
}



