import { useEffect, useState } from 'react'

function App() {
  const [torUsers, setTorUsers] = useState([]); 
  const [dbUsers, setDbUsers] = useState([]);   
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_URL = 'http://localhost:5000/api';

  const fetchTorUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(`${API_URL}/tor/users`);
      const data = await response.json();
      if (data.result) setTorUsers(data.users);
      else setError(data.error);
    } catch (err) {
      setError("Erreur Tor: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchDbUsers = async () => {
    try {
      const response = await fetch(`${API_URL}/database`);
      const data = await response.json();
      if (data.result) setDbUsers(data.users);
    } catch (err) {
      console.error("Erreur BDD:", err);
    }
  };

  const saveToDb = async (userTor) => {
    try {
      await fetch(`${API_URL}/database`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: userTor.login.username,
          password: userTor.login.password
        })
      });
      fetchDbUsers();
    } catch (err) {
      setError("Erreur Sauvegarde: " + err.message);
    }
  };

  const deleteFromDb = async (id) => {
    try {
      await fetch(`${API_URL}/database/${id}`, { method: 'DELETE' });
      fetchDbUsers();
    } catch (err) {
      setError("Erreur Suppression: " + err.message);
    }
  }

  useEffect(() => {
    fetchDbUsers();
  }, []);

return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Projet Final : Tor + PostgreSQL</h1>

      <div style={{ marginBottom: '40px', borderBottom: '2px solid #ccc', paddingBottom: '20px' }}>
        <h2>1. Récupération via Tor</h2>
        
        <button onClick={fetchTorUsers} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
          Recharger via Tor
        </button>

        {loading && <p>Chargement...</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        {torUsers.length > 0 && (
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th style={{ padding: '10px' }}>Photo</th>
                <th style={{ padding: '10px' }}>Nom</th>
                <th style={{ padding: '10px' }}>Email</th>
                <th style={{ padding: '10px' }}>Pays</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {torUsers.map((user, index) => (
                <tr key={index}>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <img src={user.picture.thumbnail} alt="user" style={{ borderRadius: '50%' }} />
                  </td>
                  <td style={{ padding: '10px', textAlign: 'left' }}>
                    {user.name.first} {user.name.last}
                  </td>
                  <td style={{ padding: '10px', textAlign: 'left' }}>{user.email}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>{user.location.country}</td>
                  <td style={{ padding: '10px', textAlign: 'center' }}>
                    <button onClick={() => saveToDb(user)} style={{ cursor: 'pointer' }}>Sauvegarder</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div>
        <h2>2. Contenu Base de Données</h2>
        {dbUsers.length === 0 ? <p>Aucune donnée enregistrée.</p> : (
          <table border="1" style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
            <thead>
              <tr style={{ background: '#eee' }}>
                <th style={{ padding: '10px' }}>ID</th>
                <th style={{ padding: '10px' }}>Nom</th>
                <th style={{ padding: '10px' }}>Mot de passe</th>
                <th style={{ padding: '10px' }}>Action</th>
              </tr>
            </thead>
            <tbody>
              {dbUsers.map((user) => (
                <tr key={user.id}>
                  <td style={{ padding: '10px' }}>{user.id}</td>
                  <td style={{ padding: '10px', textAlign: 'left' }}>{user.username}</td>
                  <td style={{ padding: '10px', textAlign: 'left' }}>{user.password}</td>
                  <td style={{ padding: '10px' }}>
                    <button onClick={() => deleteFromDb(user.id)} style={{ cursor: 'pointer' }}>Supprimer</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default App