import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getProduct, createProduct, updateProduct, getCompanies } from './api';

export default function ProductForm() {
  const { gtin } = useParams();
  const nav = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [img, setImg] = useState(null);
  const [f, setF] = useState({
    name: { en: '', fr: '' }, description: { en: '', fr: '' },
    gtin: '', brand: '', countryOfOrigin: '', weight: { gross: '', net: '', unit: 'L' },
    company: ''
  });

  useEffect(() => {
    getCompanies().then(setCompanies);
    if (gtin) getProduct(gtin).then(p => {
      setF({ ...p, name: p.name || { en: '', fr: '' }, description: p.description || { en: '', fr: '' }, weight: p.weight || { gross: '', net: '', unit: 'L' } });
    });
  }, [gtin]);

  const submit = async (e) => {
    e.preventDefault();
    const data = { ...f, weight: { ...f.weight, gross: Number(f.weight.gross), net: Number(f.weight.net) } };
    if (gtin) await updateProduct(gtin, data, img);
    else await createProduct(data, img);
     nav('/02_module_b/products');
   };

   return (
     <div>
       <h1>{gtin ? 'Edit' : 'New'} Product</h1>
      <form onSubmit={submit}>
        <input placeholder="GTIN" value={f.gtin} onChange={e => setF({...f, gtin: e.target.value})} required disabled={!!gtin} /><br/>
        <input placeholder="Name EN" value={f.name.en} onChange={e => setF({...f, name: {...f.name, en: e.target.value}})} required /><br/>
        <input placeholder="Name FR" value={f.name.fr} onChange={e => setF({...f, name: {...f.name, fr: e.target.value}})} /><br/>
        <textarea placeholder="Desc EN" value={f.description.en} onChange={e => setF({...f, description: {...f.description, en: e.target.value}})} /><br/>
        <textarea placeholder="Desc FR" value={f.description.fr} onChange={e => setF({...f, description: {...f.description, fr: e.target.value}})} /><br/>
        <input placeholder="Brand" value={f.brand} onChange={e => setF({...f, brand: e.target.value})} /><br/>
        <input placeholder="Country" value={f.countryOfOrigin} onChange={e => setF({...f, countryOfOrigin: e.target.value})} /><br/>
        <input placeholder="Gross" type="number" step="0.1" value={f.weight.gross} onChange={e => setF({...f, weight: {...f.weight, gross: e.target.value}})} /><br/>
        <input placeholder="Net" type="number" step="0.1" value={f.weight.net} onChange={e => setF({...f, weight: {...f.weight, net: e.target.value}})} /><br/>
        <input placeholder="Unit" value={f.weight.unit} onChange={e => setF({...f, weight: {...f.weight, unit: e.target.value}})} /><br/>
        <select value={f.company} onChange={e => setF({...f, company: e.target.value})} required>
          <option value="">Select Company</option>
          {companies.map(c => <option key={c._id} value={c._id}>{c.companyName}</option>)}
        </select><br/>
        <input type="file" accept="image/*" onChange={e => setImg(e.target.files[0])} /><br/>
        <button type="submit">Save</button>
         <button type="button" onClick={() => nav('/02_module_b/products')}>Cancel</button>
      </form>
    </div>
  );
}
