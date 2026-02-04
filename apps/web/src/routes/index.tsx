import { createFileRoute } from "@tanstack/react-router";
import { AuthHello } from "@/components/AuthHello.tsx";
import { Hello } from "@/components/Hello.tsx";
import { Profile } from "@/components/Profile.ui.tsx";
import { Button } from "@/components/ui/button.tsx";
import { signIn, signOut, useSession } from "@/lib/auth/client.ts";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data: auth } = useSession();

  if (!auth?.user) {
    return (
      <div className="m-2">
        <Hello />
        <AuthHello />
        <p>
          Unauthenticated. <Button onClick={() => signIn()}>Sign In</Button>
        </p>
      </div>
    );
  }

  return (
    <>
      <Profile />
      <Hello />
      <AuthHello />
      <Button onClick={signOut}>Sign Out</Button>
    </>
  );
}
