import { useEffect, useState } from 'react';

const B = import.meta.env.VITE_API_URL || '/02_module_b';

export const useAuth = () => {
  const [isAdmin, set] = useState(null);
  useEffect(() => {
    fetch(`${B}/api/auth/me`, { credentials: 'include' })
      .then(r => r.json())
      .then(d => set(!!d.isAdmin))
      .catch(() => set(false));
  }, []);
  return isAdmin;
};

export const login = (pass) =>
  fetch(`${B}/api/auth/login`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify({ passphrase: pass }) }).then(r => r.ok);

export const logout = () =>
  fetch(`${B}/api/auth/logout`, { method: 'POST', credentials: 'include' });

export const getProducts = () =>
  fetch(`${B}/api/products`, { credentials: 'include' }).then(r => r.json());

export const getProduct = (gtin) =>
  fetch(`${B}/api/products/${gtin}`, { credentials: 'include' }).then(r => r.json());

export const createProduct = (data, img) => {
  const fd = new FormData();
  fd.append('data', JSON.stringify(data));
  if (img) fd.append('image', img);
  return fetch(`${B}/api/products`, { method: 'POST', credentials: 'include', body: fd }).then(r => r.json());
};

export const updateProduct = (gtin, data, img) => {
  const fd = new FormData();
  fd.append('data', JSON.stringify(data));
  if (img) fd.append('image', img);
  return fetch(`${B}/api/products/${gtin}`, { method: 'PUT', credentials: 'include', body: fd }).then(r => r.json());
};

export const hideProduct = (gtin) =>
  fetch(`${B}/api/products/${gtin}/hide`, { method: 'POST', credentials: 'include' }).then(r => r.json());

export const deleteProduct = (gtin) =>
  fetch(`${B}/api/products/${gtin}`, { method: 'DELETE', credentials: 'include' }).then(r => r.json());

export const deleteImage = (gtin) =>
  fetch(`${B}/api/products/${gtin}/image`, { method: 'DELETE', credentials: 'include' }).then(r => r.json());

export const getCompanies = (deactivated = false) =>
  fetch(`${B}/api/companies?deactivated=${deactivated}`, { credentials: 'include' }).then(r => r.json());

export const getCompany = (id) =>
  fetch(`${B}/api/companies/${id}`, { credentials: 'include' }).then(r => r.json());

export const createCompany = (data) =>
  fetch(`${B}/api/companies`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(data) }).then(r => r.json());

export const updateCompany = (id, data) =>
  fetch(`${B}/api/companies/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, credentials: 'include', body: JSON.stringify(data) }).then(r => r.json());

export const deactivateCompany = (id) =>
  fetch(`${B}/api/companies/${id}/deactivate`, { method: 'POST', credentials: 'include' }).then(r => r.json());

export const activateCompany = (id) =>
  fetch(`${B}/api/companies/${id}/activate`, { method: 'POST', credentials: 'include' }).then(r => r.json());

export const getPublicProducts = (page = 1, query = '') => {
  const q = new URLSearchParams({ page });
  if (query) q.set('query', query);
  return fetch(`${B}/products.json?${q}`).then(r => r.json());
};

export const getPublicProduct = (gtin) =>
  fetch(`${B}/01/${gtin}.json`).then(r => r.ok ? r.json() : null);

export const verifyGTINs = (gtins) =>
  fetch(`${B}/api/verify`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ gtins }) }).then(r => r.json());
