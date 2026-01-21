import { useEffect, useState } from 'react'

function App() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchTorUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('http://localhost:5000/api/tor/users');
      const data = await response.json();

      if (data.result) {
        setUsers(data.users);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError("Erreur de communication avec le backend: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTorUsers();
  }, []);
   return (
    <div style={{ padding: '20px', fontFamily: 'Arial', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
      <h1>Tor</h1>

      <button onClick={fetchTorUsers} style={{ marginBottom: '20px', padding: '10px 20px', cursor: 'pointer' }}>
        Recharger via Tor
      </button>

      {loading && <p>Chargement...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', margin: '0 auto' }}>
          <tr style={{ background: '#eee' }}>
            <th style={{ padding: '10px' }}>Photo</th>
            <th style={{ padding: '10px' }}>Nom</th>
            <th style={{ padding: '10px' }}>Email</th>
            <th style={{ padding: '10px' }}>Pays</th>
          </tr>
          {users.map((user, index) => (
            <tr key={index}>
              <td style={{ padding: '10px', textAlign: 'center' }}>
                <img src={user.picture.thumbnail} alt="user" style={{ borderRadius: '50%' }} />
              </td>
              <td style={{ padding: '10px', textAlign: 'left' }}>
                {user.name.first} {user.name.last}
              </td>
              <td style={{ padding: '10px', textAlign: 'left' }}>{user.email}</td>
              <td style={{ padding: '10px', textAlign: 'center' }}>{user.location.country}</td>
            </tr>
          ))}
      </table>
    </div>
  )
}

export default App