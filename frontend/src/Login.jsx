import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from './api';

export default function Login() {
  const [pass, setPass] = useState('');
  const [err, setErr] = useState('');
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const ok = await login(pass);
    if (ok) nav('/02_module_b/products');
    else setErr('Invalid passphrase');
  };

  return (
    <div>
      <h1>Admin Login</h1>
      <form onSubmit={submit}>
        <input value={pass} onChange={e => setPass(e.target.value)} placeholder="Passphrase" />
        <button>Login</button>
      </form>
      {err && <p>{err}</p>}
    </div>
  );
}
