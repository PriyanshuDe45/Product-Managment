import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getCompany, deactivateCompany, activateCompany } from './api';

export default function CompanyView() {
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState({ company: {}, products: [] });

  useEffect(() => { getCompany(id).then(setData); }, [id]);

  const toggle = () => {
    const fn = data.company.deactivated ? activateCompany : deactivateCompany;
    fn(id).then(() => getCompany(id).then(setData));
  };

  return (
    <div>
      <h1>{data.company.companyName}</h1>
      <p>{data.company.companyAddress}</p>
      <p>{data.company.companyEmail}</p>
      <h3>Owner: {data.company.owner?.name}</h3>
      <h3>Contact: {data.company.contact?.name}</h3>
      <button onClick={toggle}>{data.company.deactivated ? 'Activate' : 'Deactivate'}</button>
       <button onClick={() => nav(`/02_module_b/companies/${id}/edit`)}>Edit</button>
      <h2>Products</h2>
      <table border="1">
        <thead><tr><th>GTIN</th><th>Name</th></tr></thead>
        <tbody>
          {data.products.map(p => (
            <tr key={p.gtin}><td>{p.gtin}</td><td>{p.name?.en}</td></tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
