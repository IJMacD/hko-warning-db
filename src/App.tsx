import { useEffect, useState } from 'react';
import './App.css';
import { useWarningsDB } from './useWarningsDB';
import { FlipCard } from './FlipCard';
import { RowObject } from 'csvdb';
import cards from './cards.json';

const ONE_HOUR = 60 * 60 * 1000;
const EIGHT_HOURS = 8 * ONE_HOUR;

function App() {
  const [ now, setNow ] = useState(() => Date.now());
  const warningsDB = useWarningsDB();
  const [ isPlaying, setIsPlaying ] = useState(false);

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


  const highestCard = getHighestPriority(inForce);

  const previewFlip = false;
  const previewAllFlip = false;

  if (previewAllFlip) {
    const selectedIndex = highestCard ? cards.indexOf(highestCard.code) : 0;
    const sortedCards = [...cards.slice(selectedIndex + 1), ...cards.slice(0, selectedIndex + 1) ];

    return (
      <>
        <Header now={now} setNow={setNow} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <div className="FlipCard-Wrap" style={{position:"relative",height:450,overflow:"hidden"}}>
          <FlipCard image={""} style={{position:"absolute"}} />
          {
            sortedCards.map(cardID => <FlipCard key={cardID} animated image={getImageURL({code: cardID })} style={{position:"absolute"}} />)
          }
        </div>
        <WarningIconList inForce={inForce} size={64} />
      </>
    );
  }

  if (previewFlip) {
    return (
      <>
        <Header now={now} setNow={setNow} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
        <FlipCard image={highestCard?getImageURL(highestCard):null} />
        <WarningIconList inForce={inForce} size={64} />
      </>
    );
  }

  return (
    <>
      <Header now={now} setNow={setNow} isPlaying={isPlaying} setIsPlaying={setIsPlaying} />
      <WarningIconList inForce={inForce} />
    </>
  );
}

export default App

type HeaderProps = {
  now: number;
  setNow: (now: number) => void;
  isPlaying: boolean;
  setIsPlaying: ((isPlaying: boolean|((p: boolean) => boolean)) => void);
}

type WarningIconListProps = {
  inForce: RowObject[];
  size?: number;
}

function getImageURL(card: RowObject): string {
  if (!card.code) return "";
  return `${import.meta.env.BASE_URL}${card.code}.webp`;
}

function WarningIconList ({ inForce, size = 256 }: WarningIconListProps) {
  return (
    <ul style={{ listStyle: "none", padding: 0 }}>
      {inForce.map(w => <li key={w.code} style={{ display: "inline-block" }}><img src={getImageURL(w)} style={{ width: size }} /></li>)}
    </ul>
  );
}

function Header ({ now, setNow, isPlaying, setIsPlaying }: HeaderProps) {

  const year = new Date(now).getFullYear();

  const startDate = new Date(`${year}-01-01T00:00:00`);
  const endDate = new Date(`${year+1}-01-01T00:00:00`);

  const markerStyle = { flex: 1, borderLeft: "1px solid #666", marginTop: 0 };

  return (
    <>
      <p>
        <input
          type="datetime-local"
          value={new Date(now+EIGHT_HOURS).toISOString().substring(0,19)}
          onChange={e => {
            setNow(e.target.valueAsNumber);
          }}
        />
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
        <p style={markerStyle}>J</p>
        <p style={markerStyle}>F</p>
        <p style={markerStyle}>M</p>
        <p style={markerStyle}>A</p>
        <p style={markerStyle}>M</p>
        <p style={markerStyle}>J</p>
        <p style={markerStyle}>J</p>
        <p style={markerStyle}>A</p>
        <p style={markerStyle}>S</p>
        <p style={markerStyle}>O</p>
        <p style={markerStyle}>N</p>
        <p style={markerStyle}>D</p>
      </div>
    </>
  );
}

function getHighestPriority (cards: RowObject[]) {
  let highestPriority = 0;
  let highestCard: RowObject|null = null;

  for (const card of cards) {
    const priority = getPriority(card);
    if (priority && priority > highestPriority) {
      highestCard = card;
      highestPriority = priority;
    }
  }

  return highestCard;
}

function getPriority (card: RowObject) {
  return {
    TC_1:10,
    TC_3:30,
    TC_8NE:80,
    TC_8NW:80,
    TC_8SE:80,
    TC_8SW:80,
    TC_9:90,
    TC_10:100,
    THUNDER:5,
    RAIN_A:20,
    RAIN_R:40,
    RAIN_B:50,
    HOT:3,
    COLD:3,
    FROST:4,
    FIRE_Y:2,
    FIRE_R:2,
    FNT:8,
    LS:7,
    MSN:6,
    TMW:120,
  }[card.code as string];
}