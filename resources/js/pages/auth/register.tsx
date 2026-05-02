import { FormEventHandler, useEffect, useState } from 'react';
import GuestLayout from '@/layouts/GuestLayout';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Honeypot } from '@/components/honeypot';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const { props } = usePage<any>();
  const honeypot = props.honeypot;

  const initialData: Record<string, string> = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  // Add honeypot fields strictly to initial state to prevent Inertia from stripping them
  if (honeypot && honeypot.enabled) {
    initialData[honeypot.nameFieldName] = '';
    initialData[honeypot.validFromFieldName] = honeypot.encryptedValidFrom;
  }

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data, setData, post, processing, errors, reset } = useForm(initialData);

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
          <Honeypot setData={setData as any} />

          <div className="space-y-2">
            <Label htmlFor="name">Nom complet</Label>
            <Input
              id="name"
              name="name"
              value={data.name}
              className="mt-1 block w-full"
              autoComplete="name"
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
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                name="password"
                value={data.password}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData('password', e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
            {errors.password && <p className="text-sm text-destructive font-medium">{errors.password}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password_confirmation">Confirmer le mot de passe</Label>
            <div className="relative">
              <Input
                id="password_confirmation"
                type={showConfirmPassword ? "text" : "password"}
                name="password_confirmation"
                value={data.password_confirmation}
                className="mt-1 block w-full"
                autoComplete="new-password"
                onChange={(e) => setData('password_confirmation', e.target.value)}
                required
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
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
