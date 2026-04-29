import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCompanies, deactivateCompany, activateCompany } from './api';

export default function AdminCompanies() {
  const [active, setActive] = useState(true);
  const [list, setList] = useState([]);
  const nav = useNavigate();

  const load = () => getCompanies(!active).then(setList);
  useEffect(() => { load(); }, [active]);

  return (
    <div>
      <h1>Companies ({active ? 'Active' : 'Deactivated'})</h1>
      <button onClick={() => { setActive(!active); }}>Toggle: {active ? 'Show Deactivated' : 'Show Active'}</button>
       <button onClick={() => nav('/02_module_b/companies/new')}>New Company</button>
      <table border="1">
        <thead><tr><th>Name</th><th>Email</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(c => (
            <tr key={c._id}>
               <td><button onClick={() => nav(`/02_module_b/companies/${c._id}`)}>{c.companyName}</button></td>
              <td>{c.companyEmail}</td>
              <td>{c.deactivated ? 'Deactivated' : 'Active'}</td>
              <td>
                {c.deactivated
                  ? <button onClick={() => { activateCompany(c._id).then(load); }}>Activate</button>
                  : <button onClick={() => { deactivateCompany(c._id).then(load); }}>Deactivate</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
