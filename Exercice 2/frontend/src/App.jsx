import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [inputUsername, setInputUsername] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [editId, setEditId] = useState(null); 

  const port = 5000;
  const url = `http://localhost:${port}`;
  const api = '/api/users';

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${url}${api}`);
      if (response.ok) {
        const data = await response.json();
        setUsers(data.users || data); 
        setError('');
      } else {
        setError("Erreur requête : " + response.statusText);
      }
    } catch (error) {
      setError("Erreur récupération : " + error.message);
    }
  };

  const createUser = async (username, password) => {
    try {
      const response = await fetch(`${url}${api}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();

        setUsers([...users, data.user || data]);
        setError('');
        resetForm();
      } else {
        setError("Erreur création : " + response.statusText);
      }
    } catch (error) {
      setError("Erreur création : " + error.message);
    }
  }

  const updateUser = async (id, username, password) => {
    try {
      const response = await fetch(`${url}${api}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(users.map(user => user.id === id ? (data.user || data) : user));
        setError('');
        resetForm();
      } else {
        setError("Erreur update : " + response.statusText);
      }
    } catch (error) {
      setError("Erreur update : " + error.message);
    }
  }

  const deleteUser = async (id) => {
    if (!confirm("Supprimer cet utilisateur ?")) return; 
    try {
      const response = await fetch(`${url}${api}/${id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        setUsers(users.filter(user => user.id !== id));
        setError('');
      } else {
        setError("Erreur suppression : " + response.statusText);
      }
    } catch (error) {
      setError("Erreur suppression : " + error.message);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (editId) {
      updateUser(editId, inputUsername, inputPassword);
    } else {
      createUser(inputUsername, inputPassword);
    }
  };

  const handleEditClick = (user) => {
    setEditId(user.id);
    setInputUsername(user.username);
    setInputPassword(user.password);
  };

  const resetForm = () => {
    setEditId(null);
    setInputUsername('');
    setInputPassword('');
  };

 return (
    <div style={{ padding: '20px' }}>
      <h1>Utilisateurs</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* Formulaire */}
      <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
        <input 
          placeholder="Nom" 
          value={inputUsername} 
          onChange={e => setInputUsername(e.target.value)} 
          required 
        />
        <input 
          placeholder="Mot de passe" 
          value={inputPassword} 
          onChange={e => setInputPassword(e.target.value)} 
          required 
          style={{ marginLeft: '5px' }}
        />
        <button type="submit" style={{ marginLeft: '5px' }}>
          {editId ? 'Modifier' : 'Ajouter'}
        </button>
        {editId && <button type="button" onClick={resetForm} style={{ marginLeft: '5px' }}>Annuler</button>}
      </form>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
          <tr style={{ background: '#eee' }}>
            <th style={{ padding: '8px' }}>Nom</th>
            <th style={{ padding: '8px' }}>Mot de passe</th>
            <th style={{ padding: '8px' }}>Actions</th>
          </tr>
          {users.map(user => (
            <tr key={user.id}>
              <td style={{ padding: '8px' }}>{user.username}</td>
              <td style={{ padding: '8px' }}>{user.password}</td>
              <td style={{ padding: '8px', textAlign: 'center' }}>
                <button onClick={() => handleEditClick(user)} style={{ marginRight: '5px' }}>Modifier</button>
                <button onClick={() => deleteUser(user.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default App