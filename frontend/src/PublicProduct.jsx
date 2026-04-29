import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPublicProduct } from './api';

export default function PublicProduct() {
  const { gtin } = useParams();
  const [p, setP] = useState(null);
  const [lang, setLang] = useState('en');

  useEffect(() => { getPublicProduct(gtin).then(setP); }, [gtin]);

  if (!p) return <h1>Product not found</h1>;

  const name = p.name?.[lang] || p.name?.en || '';
  const desc = p.description?.[lang] || p.description?.en || '';

  return (
    <div lang={lang}>
      <button onClick={() => setLang(lang === 'en' ? 'fr' : 'en')}>Toggle {lang === 'en' ? 'FR' : 'EN'}</button>
      <h1>{p.company?.companyName}</h1>
      <h2>{name}</h2>
      <p>GTIN: {p.gtin}</p>
      <p>{desc}</p>
      {p.image && <img src={p.image} alt="" width="200" />}
      {!p.image && <p>[No image]</p>}
      <p>Gross: {p.weight?.gross} {p.weight?.unit}</p>
      <p>Net: {p.weight?.net} {p.weight?.unit}</p>
    </div>
  );
}
