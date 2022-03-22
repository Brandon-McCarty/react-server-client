import {useState, useEffect} from 'react';
//import axios
import axios from 'axios';


function App () {
 
  const [creatureList, setCreatureList] = useState([]);

  const [newCreatureName, setNewCreatureName] = useState('');
  const [newCreatureOrigin, setNewCreatureOrigin] = useState('');

  const fetchCreatures = () => {
    // make a GET request
    axios.get('/creature').then(response => {
      // response has a lot of extra info, the .data is the information from the database
      console.log(response.data);
      setCreatureList(response.data);
    }).catch(err => {
      console.log(err);
    })
  }; // end GET
  

  // equivalent of document.ready
  // will get called when component loads, the empty array tells to only call once
  useEffect(() => {
    fetchCreatures();
  }, []);
  
  const addCreature = (event) => {
    event.preventDefault();
    console.log(newCreatureName, newCreatureOrigin);

    //POST DATA TO DATABASE
    axios.post('/creature', {name: newCreatureName, origin: newCreatureOrigin})
      .then(response => {
        // Get all data - including new
        fetchCreatures();
        //clear inputs
        setNewCreatureName('');
        setNewCreatureOrigin('');
      }).catch(err => {
        console.log(err);
      })
  }; // end POST

  return (
    <div>
      <form>
        <label htmlFor="name">Name:</label>
        <input  
          id="name" 
          type="text"
          onChange={(event) => setNewCreatureName(event.target.value)}
          value={newCreatureName}
        />
        <label htmlFor="origin">Origin:</label>
        <input 
          id="origin" 
          type="text"
          onChange={(event) => setNewCreatureOrigin(event.target.value)}
          value={newCreatureOrigin}
        />
        <button onClick={addCreature}>ADD CREATURE</button>
      </form>

      <ul>
        {creatureList.map(creature => 
         (<li key={creature.id}>{creature.name} is from {creature.origin}</li>)
        )}
      </ul>
    </div>
  );

}

export default App
