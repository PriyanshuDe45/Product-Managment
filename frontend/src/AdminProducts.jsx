import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getProducts, hideProduct, deleteProduct } from './api';

export default function AdminProducts() {
  const [list, setList] = useState([]);
  const nav = useNavigate();

  const load = () => getProducts().then(setList);
  useEffect(() => { load(); }, []);

  const del = async (gtin) => {
    if (confirm('Delete?')) { await deleteProduct(gtin); load(); }
  };
  const hide = async (gtin) => { await hideProduct(gtin); load(); };

  return (
    <div>
      <h1>Products</h1>
       <button onClick={() => nav('/02_module_b/products/new')}>New Product</button>
      <table border="1">
        <thead><tr><th>GTIN</th><th>Name</th><th>Hidden</th><th>Actions</th></tr></thead>
        <tbody>
          {list.map(p => (
            <tr key={p.gtin}>
              <td>{p.gtin}</td>
              <td>{p.name?.en}</td>
              <td>{p.hidden ? 'Yes' : 'No'}</td>
              <td>
                 <button onClick={() => nav(`/02_module_b/products/${p.gtin}`)}>Edit</button>
                <button onClick={() => hide(p.gtin)}>Hide</button>
                {p.hidden && <button onClick={() => del(p.gtin)}>Delete</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
