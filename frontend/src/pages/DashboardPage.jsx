import { useEffect, useState } from 'react';
import { api } from '../api/client';
import { useAuth } from '../context/AuthContext';

export default function DashboardPage() {
  const { user, logout } = useAuth();
  const [items, setItems] = useState([]);
  const [form, setForm] = useState({ name: '', description: '' });

  const load = async () => {
    const { data } = await api.get('/api/v1/items');
    setItems(data);
  };

  useEffect(() => {
    load();
  }, []);

  const createItem = async (e) => {
    e.preventDefault();
    await api.post('/api/v1/items', form);
    setForm({ name: '', description: '' });
    load();
  };

  const deleteItem = async (id) => {
    await api.delete(`/api/v1/items/${id}`);
    load();
  };

  return (
    <main className="container">
      <header>
        <h1>{user.name}'s Dashboard</h1>
        <button onClick={logout}>Logout</button>
      </header>

      <section>
        <h2>Create Item</h2>
        <form className="inline-form" onSubmit={createItem}>
          <input value={form.name} placeholder="Name" required onChange={(e) => setForm({ ...form, name: e.target.value })} />
          <input value={form.description} placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
          <button type="submit">Add</button>
        </form>
      </section>

      <section>
        <h2>My Items</h2>
        <ul>
          {items.map((item) => (
            <li key={item._id}>
              <strong>{item.name}</strong> — {item.description}
              <button onClick={() => deleteItem(item._id)}>Delete</button>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
