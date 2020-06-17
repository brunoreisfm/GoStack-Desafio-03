import React, {useState, useEffect} from "react";
import api from './services/api';

import "./styles.css";

function App() {
  
  const [ repositories, setRepository ] = useState([]);

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepository(response.data);
    });
  }, []);

  function handleAddRepository() {
    api.post('repositories',{
      title: `Repositório ${Date.now()}`,
      url: `https://www.${Date.now()}.com.br`,
      techs: ['a','b','c']
    }).then(response => {
      setRepository([...repositories, response.data]);
    });
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    const repIndex = repositories.findIndex( rep => rep.id === id );
    const updatedRep = [...repositories];
    updatedRep.splice(repIndex, 1);

    setRepository(updatedRep);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        { repositories.map( rep => (
          <li key={rep.id}>
            {rep.title}
            <button onClick={ () => { handleRemoveRepository(rep.id) } }>Remover</button>
          </li>
        ) ) }
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
