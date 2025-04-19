import { useState, useEffect } from 'react';
import './App.css';

function Card({ card, onClick }) {
  return (
    <div className={`card ${card.flipped || card.matched ? 'flipped' : ''}`} onClick={onClick}>
      <div className="front">{card.emoji}</div>
      <div className="back">❓</div>
    </div>
  );
}
function Navbar() {
  return (
    <nav className="navbar">
      <a href="../../react.html">🏠 Kezdőlap</a>
      <a href="../quiz/index.html">🧠 Kvíz</a>
    </nav>
  );
}



function App() {
  const emojis = ['🍕', '❤️', '😎', '👺', '✌️', '🍩', '💀', '👻'];

  const createCards = () => {
    const shuffled = [...emojis, ...emojis].sort(() => 0.5 - Math.random());
    return shuffled.map((emoji, index) => ({
      id: index,
      emoji,
      flipped: false,
      matched: false,
    }));
  };

  const [cards, setCards] = useState(createCards());
  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    if (first && second) {
      setDisabled(true);
      if (first.emoji === second.emoji) {
        setCards(prev =>
          prev.map(card =>
            card.emoji === first.emoji ? { ...card, matched: true } : card
          )
        );
        resetTurn();
      } else {
        setTimeout(() => {
          setCards(prev =>
            prev.map(card =>
              card.id === first.id || card.id === second.id
                ? { ...card, flipped: false }
                : card
            )
          );
          resetTurn();
        }, 1000);
      }
    }
  }, [first, second]);

  const handleClick = (card) => {
    if (disabled || card.flipped || card.matched) return;

    const flipped = { ...card, flipped: true };
    setCards(prev =>
      prev.map(c => (c.id === card.id ? flipped : c))
    );

    if (!first) {
      setFirst(flipped);
    } else {
      setSecond(flipped);
    }
  };

  const resetTurn = () => {
    setFirst(null);
    setSecond(null);
    setDisabled(false);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <h1>🎯 Memória játék</h1>
        <div className="grid">
          {cards.map(card => (
            <Card key={card.id} card={card} onClick={() => handleClick(card)} />))}
        </div>
      </div>
      <footer className="footer">
  <p>Készítette: Kovács Ádám(XJ07RM) </p>
  </footer>
    </>
  );
}
export default App;
