import { useState } from 'react'
import './App.css'

function Navbar() {
  return (
    <nav className="navbar">
      <a href="../../index.html">🏠 Kezdőlap</a>
      <a href="../app1/index.html">🎯 Memória</a>
    </nav>
  );
}

const questions = [
  {
    question: "Folytassa az alábbi népi gyermekdalt: 'szita szita péntek, szerelem csütörtök...'",
    options: ["hódeszka", "lómenza", "dobszerda", "gólszerva"],
    answer: "dobszerda"
  },
  {
    question: "Milyen intézmény a Harry Potter-könyvekben szereplő Azkaban?",
    options: ["iskola", "stadion", "múzeum", "börtön"],
    answer: "börtön"
  },
  {
    question: "Mi a gépjárművek tengelykapcsolójának ismertebb neve?",
    options: ["porlasztó", "kuplung", "gyertya", "akkumulátor"],
    answer: "kuplung"
  },
  {
    question: "Az alábbi történelmi alakok közül kit NEM Ádám személyesít meg Az ember tragédiájában?",
    options: ["Miltiadész", "Kepler", "Michelangelo", "Danton"],
    answer: "Michelangelo"
  },
  {
    question: "Az alábbiak közül melyik tudományágban NEM osztanak ki Nobel-díjat?",
    options: ["fizika", "kémia", "matematika", "orvostudomány"],
    answer: "matematika"
  },
  {
    question: "Melyik szervünk termeli az adrenalint?",
    options: ["mellékvese", "pajzsmirigy", "hasnyálmirigy", "hipotalamusz"],
    answer: "mellékvese"
  }
];

function App() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (selected) => {
    const correct = questions[current].answer;
    if (selected === correct) {
      setScore(score + 1);
    }

    const next = current + 1;
    if (next < questions.length) {
      setCurrent(next);
    } else {
      setShowResult(true);
    }
  };

  return (
    <>
    <Navbar />
    <div className="quiz-container">
      <h1>🧠 Kvíz játék</h1>
      {showResult ? (
        <div className="result">
          <h2>🎉 Végeredmény</h2>
          <p>Helyes válaszok száma: {score} / {questions.length}</p>
        </div>
      ) : (
        <div className="question-card">
          <h2>{questions[current].question}</h2>
          <div className="options">
            {questions[current].options.map((opt, idx) => (
              <button key={idx} onClick={() => handleAnswer(opt)}>
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;


