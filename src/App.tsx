import { useEffect, useState } from 'react';
import './App.css';
import { useWarningsDB } from './useWarningsDB';

// const FIRST_YEAR = 1950;
// const CURRENT_YEAR = new Date().getFullYear();
// const years = Array.from({length:CURRENT_YEAR-FIRST_YEAR+1}).map((_,i) => FIRST_YEAR + i);
const ONE_HOUR = 60 * 60 * 1000;
const EIGHT_HOURS = 8 * ONE_HOUR;

function App() {
  const [ now, setNow ] = useState(() => Date.now());
  // const now = useDebounce(rawNow, 50);
  // const [ year, setYear ] = useState(CURRENT_YEAR);
  const warningsDB = useWarningsDB();
  const [ isPlaying, setIsPlaying ] = useState(false);

  // useEffect(() => {
  //   const date = new Date(now);
  //   date.setFullYear(year);
  //   setNow(+date);
  // }, [year, now]);

  useEffect(() => {
    if (isPlaying) {
      const FPS = 10;
      const speed = 2 * ONE_HOUR; // per second
      const id = setInterval(() => setNow(now => now + speed / FPS), 1000 / FPS);
      return () => clearInterval(id);
    }
  }, [isPlaying]);

  const inForce = warningsDB ?
    [
      ...warningsDB
      .query()
      .where(row => +new Date(row.start) <= now && now < +new Date(row.end))
    ] :
    [];

  const year = new Date(now).getFullYear();

  const startDate = new Date(`${year}-01-01T00:00:00`);
  const endDate = new Date(`${year+1}-01-01T00:00:00`);

  return (
    <>
      <p>
        {/* <select value={year} onChange={e => setYear(+e.target.value)}>
          {
            years.map(year => <option key={year}>{year}</option>)
          }
        </select> */}
        <input
          type="datetime-local"
          value={new Date(now+EIGHT_HOURS).toISOString().substring(0,19)}
          onChange={e => {
            setNow(e.target.valueAsNumber);
          }}
        />
        {/* <input
          type="date"
          value={new Date(now).toISOString().substring(0,10)}
          onChange={e => setNow(+(e.target.valueAsDate||0))}
        />
        <input
        type="time"
          value={new Date(now).toISOString().substring(11,19)}
          onChange={e => setNow(+(e.target.valueAsDate||0))}
        /> */}
        <button onClick={() => setIsPlaying(p=>!p)}>{isPlaying?"Pause":"Play"}</button>
      </p>
      <label>
        <input
          type="range"
          value={now/1000}
          onChange={e => setNow(e.target.valueAsNumber*1000)}
          min={+startDate/1000}
          max={+endDate/1000}
          style={{width:"100%"}}
        />
      </label>
      <div style={{display:"flex"}}>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>J</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>F</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>M</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>A</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>M</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>J</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>J</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>A</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>S</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>O</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>N</td>
        <td style={{flex:1,borderLeft:"1px solid #666"}}>D</td>
      </div>
      <ul style={{listStyle:"none"}}>
        {
          inForce.map(w => <li key={w.code} style={{display:"inline-block"}}><img src={`/${w.code}.webp`} style={{width:256}} /></li>)
        }
      </ul>
    </>
  )
}

export default App
