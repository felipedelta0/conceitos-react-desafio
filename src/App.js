import React, { useState, useEffect } from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [repositories, setRepositories] = useState([])

  useEffect(() => {
    api.get('/repositories').then(response => {
      setRepositories(response.data)
    })
  }, [])

  async function handleAddRepository() {
    const newRepo = {
      "url": "https://github.com/Rocketseat/felipedelta0",
      "title": "Delta",
      "techs": ["Node", "Express", "TypeScript"]
    }

    api.post('/repositories', newRepo).then(response => {
      if (response.status === 200) {
        setRepositories([ ...repositories, response.data ])
      }
    })
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status === 204) {
        setRepositories(repositories.filter(repo => repo.id !== id))
      }
    })
  }

  return (
    <div>
      <ul data-testid="repository-list">
      { repositories.map(repository => (
        <li key={repository.id}>
          <p>{repository.title}</p>
          <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
      )) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
