import '../styles/App.sass';
import { useEffect } from 'react';
import GetPodcast from '../services/api';

function App() {
//   const [data, setData] = useState([]);
  useEffect(() => {
    GetPodcast().then(response => {
        console.log('desde app', response)
    })
  }, []);

  // function printList(){
  //   data.map(podcast=>{
  //     return(
  //       <li>{podcast}</li>
  //     )
  //   })
  // }

  return (
    <div>
      <header>
        <h1 className="title">Podcaster</h1>
      </header>
      <main>
        <section className="searcher">
          <label>
            <input type="text" placeholder="Filter podcast"/>
          </label>
        </section>
        <ul>
        {/* {printList()} */}
        </ul>
        <section>

        </section>
      </main>
    </div>
  );
}

export default App;