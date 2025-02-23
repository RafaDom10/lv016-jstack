import { sleep } from "../lib/utils";
import { IUser } from "../types/IUser"

type ICreateUserDTO = Omit<IUser, 'id'>

export async function createUser({ name, username, blocked }: ICreateUserDTO): Promise<IUser> {
  await sleep();

  const response = await fetch('http://localhost:3000/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, username, blocked })
  });
  const body = await response.json();
  return body;
}
