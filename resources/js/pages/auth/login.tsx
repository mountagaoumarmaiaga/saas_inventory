import { FormEventHandler } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';


export default function Login() {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/login', {
      onFinish: () => reset('password'),
    });
  };

  return (
    <GuestLayout>
      <Head title="Connexion" />

      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">Bon retour</h1>
          <p className="text-muted-foreground">
            Entrez vos identifiants pour accéder à votre espace
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={data.email}
              onChange={(e) => setData('email', e.target.value)}
              required
              placeholder="nom@entreprise.com"
              autoComplete="email"
            />
            {errors.email && <p className="text-sm text-destructive font-medium">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-gray-300 text-primary shadow-sm focus:ring-primary"
                  checked={data.remember}
                  onChange={(e) => setData('remember', e.target.checked)}
                />
                <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                  Se souvenir de moi
                </Label>
              </div>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-primary hover:text-primary/80"
              >
                Oublié ?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={data.password}
              onChange={(e) => setData('password', e.target.value)}
              required
              placeholder="••••••••"
              autoComplete="current-password"
            />
            {errors.password && <p className="text-sm text-destructive font-medium">{errors.password}</p>}
          </div>

          <Button
            type="submit"
            disabled={processing}
            className="w-full h-10 font-medium"
          >
            {processing ? 'Connexion...' : 'Se connecter'}
          </Button>
        </form>

        <div className="text-center text-sm">
          Pas encore de compte ?{' '}
          <Link href="/register" className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4">
            Créer un compte
          </Link>
        </div>
      </div>
    </GuestLayout>
  );
}
