import { useEffect, useState } from 'react';
// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Form.scss';
//Router
import { Routes, Route } from 'react-router-dom';
//components
import Header from './Header';
import Dummy from './Dummy';
import Footer from './Footer';
import Instructions from './Instructions';
import Options from './Options';
import HomePage from './HomePage';

function App() {
  const [word, setWord] = useState('');
  const [userLetters, setUserLetters] = useState([]);
  const [lastLetter, setLastLetter] = useState('');

  useEffect(() => {
    getWordFromApi().then((word) => {
      setWord(word);
    });
  }, []);

  // events
  const getNumberOfErrors = () => {
    const errorLetters = userLetters.filter(
      (letter) => word.includes(letter) === false
    );
    return errorLetters.length;
  };

  const handleLastLetter = (value) => {
    value = value.toLocaleLowerCase();
    setLastLetter(value);

    if (!userLetters.includes(value)) {
      userLetters.push(value);
      setUserLetters([...userLetters]);
    }
  };

  return (
    <div className="page">
      <Header />
      <main className="main">
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                word={word}
                userLetters={userLetters}
                lastLetter={lastLetter}
                handleLastLetter={handleLastLetter}
              />
            }
          />
          <Route path="/instructions" element={<Instructions />} />
          <Route path="/options" element={<Options />} />
        </Routes>

        <Dummy numberOfErrors={getNumberOfErrors()} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
