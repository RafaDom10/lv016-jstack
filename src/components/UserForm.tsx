import { Button } from "./ui/button";
import { Input } from "./ui/input";

export function UserForm() {
  return (
    <form className="bg-muted/50 p-4 rounded-md">
      <div className="flex gap-3">
        <Input placeholder="Nome do usuário" />
        <Input placeholder="@ no github" />
      </div>
      <Button className="mt-2 w-full">
        Cadastrar
      </Button>
    </form>
  )
}
