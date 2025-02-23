import { useUsers } from "@/app/hooks/useUsers";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
import { Switch } from "./ui/Switch";
import { Skeleton } from "./ui/Skeleton";
import { useUpdateUser } from "@/app/hooks/useUpdateUser";
import { toast } from "sonner";

export function UsersList() {
  const { users, isLoading } = useUsers();
  const { updateUser } = useUpdateUser();

  async function handleBlockedUser(id: string, blocked: boolean) {
    try {
      const t = await updateUser({
        id,
        blocked
      });
      console.log(t)
      toast.success('Usuário atualizado com sucesso!');
    } catch {
      toast.error('Erro ao atualizar usuário!');
    }
  }

  return (
    <div className="space-y-4">
      {isLoading && (
        <>
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
          <Skeleton className="h-[74px]" />
        </>
      )}
      {users.map(user => (
        <div
          key={user.id}
          className="border p-4 rounded-md flex items-center justify-between"
        >
          <div className=" flex items-center gap-4">
            <Avatar>
              <AvatarImage src={`https://github.com/${user.username}.png`} />
              <AvatarFallback>{user.name.charAt(0).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div>
              <strong className="text-lg block leading-4">{user.name}</strong>
              <small className="text-muted-foreground">@{user.username}</small>
            </div>
          </div>
          <Switch
            // checked={user.blocked}
            onCheckedChange={(blocked) => handleBlockedUser(user.id, blocked)}
          />
        </div>
      ))}
    </div>
  )
}
