// Mock database - In production, use a real database like PostgreSQL with Prisma
interface UserDB {
  id: string;
  email: string;
  name: string;
  password: string;
  role?: "student" | "alumni" | "recruiter";
  createdAt: Date;
}

// In-memory storage (for demo purposes only)
const users: UserDB[] = [];

export async function createUser(data: {
  email: string;
  name: string;
  password: string;
  role?: "student" | "alumni" | "recruiter";
}): Promise<UserDB> {
  const user: UserDB = {
    id: Math.random().toString(36).substring(2),
    ...data,
    createdAt: new Date(),
  };
  users.push(user);
  return user;
}

export async function findUserByEmail(email: string): Promise<UserDB | null> {
  return users.find((u) => u.email === email) || null;
}

export async function findUserById(id: string): Promise<UserDB | null> {
  return users.find((u) => u.id === id) || null;
}
