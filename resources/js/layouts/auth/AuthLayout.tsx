import { PropsWithChildren } from 'react';
import { Link, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';

type SharedProps = {
  auth: {
    user: {
      id: number;
      name: string;
      email: string;
      role?: string;
    } | null;
  };
};

export default function AuthLayout({ children }: PropsWithChildren) {
  const { auth } = usePage<SharedProps>().props;

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-semibold">Stock SaaS</div>

          <div className="flex items-center gap-3">
            {auth?.user ? (
              <>
                <div className="text-sm text-muted-foreground">
                  {auth.user.name} ({auth.user.email})
                </div>
                <Link href={route('logout')} method="post" as="button">
                  <Button variant="outline">Déconnexion</Button>
                </Link>
              </>
            ) : (
              <>
                <Link href={route('login')}>
                  <Button variant="outline">Connexion</Button>
                </Link>
                <Link href={route('register')}>
                  <Button>Inscription</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
