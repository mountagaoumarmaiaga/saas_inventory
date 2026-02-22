import { FormEventHandler, useEffect } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  });

  useEffect(() => {
    return () => {
      reset('password', 'password_confirmation');
    };
  }, []);

  const submit: FormEventHandler = (e) => {
    e.preventDefault();
    post('/register');
  };

  return (
    <GuestLayout>
      <Head title="Inscription" />

      <div className="space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-3xl font-bold tracking-tight text-foreground/90">Commencer</h1>
          <p className="text-muted-foreground">
            Créez votre compte en quelques secondes
          </p>
        </div>

        <form onSubmit={submit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
              isFocused={true}
              onChange={(e) => setData('name', e.target.value)}
              required
              placeholder="John Doe"
            />
            {errors.name && <p className="text-sm text-destructive font-medium">{errors.name}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              value={data.email}
              className="mt-1 block w-full"
              autoComplete="username"
              onChange={(e) => setData('email', e.target.value)}
              required
              placeholder="nom@entreprise.com"
            />
            {errors.email && <p className="text-sm text-destructive font-medium">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Mot de passe</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={data.password}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password', e.target.value)}
              required
              placeholder="••••••••"
            />
            {errors.password && <p className="text-sm text-destructive font-medium">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
            <Input
              id="password_confirmation"
              type="password"
              name="password_confirmation"
              value={data.password_confirmation}
              className="mt-1 block w-full"
              autoComplete="new-password"
              onChange={(e) => setData('password_confirmation', e.target.value)}
              required
              placeholder="••••••••"
            />
            {errors.password_confirmation && <p className="text-sm text-destructive font-medium">{errors.password_confirmation}</p>}
          </div>

          <Button
            type="submit"
            disabled={processing}
            className="w-full h-10 font-bold"
          >
            {processing ? 'Création...' : "S'inscrire"}
          </Button>
        </form>

        <div className="text-center text-sm">
          Déjà inscrit ?{' '}
          <Link href="/login" className="font-semibold text-primary hover:text-primary/80 hover:underline underline-offset-4">
            Se connecter
          </Link>
        </div>
      </div>
    </GuestLayout>
  );
}
