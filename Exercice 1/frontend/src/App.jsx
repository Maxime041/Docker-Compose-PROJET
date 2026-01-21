import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState('');
  useEffect(() => {
    fetch('http://localhost:5000/api/hello')
      .then(response => response.json())
      .then(data => setMessage(data.message))
      .catch(error => console.error('Erreur:', error));
  }, []);
  return (
    <div>
      <p>
        Message du backend : {message}
      </p>
    </div>
  )
}

export default App
