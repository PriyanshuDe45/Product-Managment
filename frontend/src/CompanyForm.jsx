import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getCompany, createCompany, updateCompany } from './api';

export default function CompanyForm() {
  const { id } = useParams();
  const nav = useNavigate();
  const [f, setF] = useState({
    companyName: '', companyAddress: '', companyTelephone: '', companyEmail: '',
    owner: { name: '', mobileNumber: '', email: '' },
    contact: { name: '', mobileNumber: '', email: '' }
  });

  useEffect(() => { if (id) getCompany(id).then(d => setF({ ...d.company, owner: d.company.owner || { name: '', mobileNumber: '', email: '' }, contact: d.company.contact || { name: '', mobileNumber: '', email: '' } })); }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (id) await updateCompany(id, f);
    else await createCompany(f);
     nav('/02_module_b/companies');
   };

  const ch = (path, val) => {
    const keys = path.split('.');
    const obj = { ...f };
    let cur = obj;
    for (let i = 0; i < keys.length - 1; i++) cur = cur[keys[i]] ||= {};
    cur[keys[keys.length - 1]] = val;
    setF(obj);
  };

  return (
    <div>
      <h1>{id ? 'Edit' : 'New'} Company</h1>
      <form onSubmit={submit}>
        <h3>Company</h3>
        <input placeholder="Name" value={f.companyName} onChange={e => ch('companyName', e.target.value)} required /><br/>
        <input placeholder="Address" value={f.companyAddress} onChange={e => ch('companyAddress', e.target.value)} /><br/>
        <input placeholder="Phone" value={f.companyTelephone} onChange={e => ch('companyTelephone', e.target.value)} /><br/>
        <input placeholder="Email" value={f.companyEmail} onChange={e => ch('companyEmail', e.target.value)} /><br/>
        <h3>Owner</h3>
        <input placeholder="Name" value={f.owner.name} onChange={e => ch('owner.name', e.target.value)} /><br/>
        <input placeholder="Mobile" value={f.owner.mobileNumber} onChange={e => ch('owner.mobileNumber', e.target.value)} /><br/>
        <input placeholder="Email" value={f.owner.email} onChange={e => ch('owner.email', e.target.value)} /><br/>
        <h3>Contact</h3>
        <input placeholder="Name" value={f.contact.name} onChange={e => ch('contact.name', e.target.value)} /><br/>
        <input placeholder="Mobile" value={f.contact.mobileNumber} onChange={e => ch('contact.mobileNumber', e.target.value)} /><br/>
        <input placeholder="Email" value={f.contact.email} onChange={e => ch('contact.email', e.target.value)} /><br/>
        <button type="submit">Save</button>
         <button type="button" onClick={() => nav('/02_module_b/companies')}>Cancel</button>
      </form>
    </div>
  );
}
