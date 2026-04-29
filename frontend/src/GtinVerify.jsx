import { useState } from 'react';
import { verifyGTINs } from './api';

export default function GtinVerify() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);

  const submit = async (e) => {
    e.preventDefault();
    const gtins = input.split('\n').map(s => s.trim()).filter(Boolean);
    const data = await verifyGTINs(gtins);
    setResult(data);
  };

  return (
    <div>
      <h1>GTIN Bulk Verification</h1>
      <form onSubmit={submit}>
        <textarea value={input} onChange={e => setInput(e.target.value)} rows="6" cols="40" placeholder="Enter GTINs, one per line" />
        <br/><button>Verify</button>
      </form>
      {result && (
        <div>
          {result.allValid && <h2 style={{color:'green'}}>All valid ✓</h2>}
          <ul>
            {result.results.map((r, i) => (
              <li key={i}>{r.gtin}: {r.valid ? 'Valid ✓' : 'Invalid ✗'}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
