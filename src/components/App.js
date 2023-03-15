// import '../styles/App.sass';
import { useEffect } from 'react';
// import getPodcast from '../services/api';

function App() {
  // const [data, setData] = useState([]);
  useEffect(() => {
    console.log('eeeee')
    fetch(`https://api.allorigins.win/get?url=${encodeURIComponent('https://itunes.apple.com/us/rss/toppodcasts/limit=10/genre=1310/json')}`)
    .then(response => {
      if (response.ok) return response.json()
      throw new Error('Network response was not ok.')
    })
    .then(data => console.log(data.contents)); 
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