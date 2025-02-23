import { useCreateUser } from "@/app/hooks/useCreateUser";
import { Button } from "./ui/button";
import { Input } from "./ui/Input";
import { useState } from "react";
import { toast } from "sonner";

export function UserForm() {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');

  const { createUser } = useCreateUser();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      await createUser({
        name,
        username,
        blocked: false
      });

      setName('');
      setUsername('');
    } catch {
      toast.error('Erro ao cadastrar usuário!');
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-muted/50 p-4 rounded-md">
      <div className="flex gap-3">
        <Input
          placeholder="Nome do usuário"
          value={name}
          onChange={event => setName(event.target.value)}
        />
        <Input
          placeholder="@ no github"
          value={username}
          onChange={event => setUsername(event.target.value)}
        />
      </div>
      <Button className="mt-2 w-full">
        Cadastrar
      </Button>
    </form>
  )
}
