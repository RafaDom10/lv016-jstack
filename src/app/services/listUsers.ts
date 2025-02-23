import { IUser } from "../types/IUser";

export async function listUsers(): Promise<Array<IUser>> {
  const response = await fetch('http://localhost:3000/users');
  const body = await response.json();
  return body;
}
