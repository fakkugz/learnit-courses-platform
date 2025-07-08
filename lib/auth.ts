import { cookies } from "next/headers";
import { getUsers } from "@/lib/usersStore";

export function loginUser(email: string, password: string): string | null {
  const users = getUsers();
  const user = users.find((u) => u.email === email && u.password === password);

  if (!user) return null;

  const payload = {
    name: user.name,
    email: user.email,
  };

  const base64Payload = Buffer.from(JSON.stringify(payload)).toString("base64url");
  return `header.${base64Payload}.signature`;
}

export async function getUserFromCookie() {
  const store = await cookies();
  const token = store.get("token")?.value;
  if (!token) return null;

  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString()
    );

    const email = payload.email;

    const user = getUsers().find((u) => u.email === email);
    if (!user) return null;

    return {
      name: user.name,
      email: user.email,
      favorites: user.favorites ?? [],
      subscriptions: user.subscriptions ?? [],
    };
  } catch (e) {
    return null;
  }
}
