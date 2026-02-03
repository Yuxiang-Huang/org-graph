import { Button } from "@scottylabs/corgi";
import { createFileRoute } from "@tanstack/react-router";
import { AuthHello } from "@/components/AuthHello.tsx";
import { Hello } from "@/components/Hello.tsx";
import { signIn, signOut, useSession } from "@/lib/auth/client.ts";

export const Route = createFileRoute("/")({
  component: App,
});

function App() {
  const { data: auth } = useSession();
  const image = auth?.user?.image;

  if (!auth?.user) {
    return (
      <div className="m-2">
        Unauthenticated.{" "}
        <Button
          size="md"
          theme="brand"
          className="inline"
          onClick={() => signIn()}
        >
          Sign In
        </Button>
      </div>
    );
  }

  return (
    <>
      {typeof image === "string" && (
        <img
          src={image}
          alt="Profile"
          className="w-10 h-10 rounded-full"
          referrerPolicy="no-referrer"
        />
      )}
      <Hello />
      <AuthHello />
      <Button size="md" theme="brand" className="inline" onClick={signOut}>
        Sign Out
      </Button>
    </>
  );
}
