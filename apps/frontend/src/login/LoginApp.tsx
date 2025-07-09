import { signIn } from '@/lib/auth-client';
import { useCallback, useState } from 'react';
import { FiTable } from 'react-icons/fi';

export function LoginApp() {
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  const login = useCallback(async () => {
    const { data, error } = await signIn.email({
      email,
      password: pass,
      callbackURL: '/adm',
    });
  }, [pass, email]);

  return (
    <div className="flex min-h-dvh w-full flex-col items-center justify-center text-white">
      <div className="flex flex-col items-center justify-center gap-5 rounded-2xl bg-zinc-800 p-16">
        <FiTable size={80} className="stroke-sky-300" />
        <span className="h-3"></span>
        <h1 className="text-3xl font-bold">Login</h1>
        <input
          type="text"
          className="rounded-lg bg-zinc-300 px-3 py-1 text-zinc-950"
          placeholder="E-mail"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="rounded-lg bg-zinc-300 px-3 py-1 text-zinc-950"
          placeholder="Senha"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />

        <button
          className="cursor-pointer rounded-lg bg-emerald-500 px-5 py-2 text-zinc-950 hover:bg-emerald-700 hover:text-white active:bg-emerald-900"
          onClick={() => login()}
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
