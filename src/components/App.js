import { useEffect, useState } from 'react';
// api
import getWordFromApi from '../services/api';
// styles
import '../styles/App.scss';
import '../styles/Form.scss';
//Router
import { Router, Route, Link, NavLink } from 'react-router-dom';
//components
import Header from './Header';
import Dummy from './Dummy';
import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';

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
        <section>
          <SolutionLetters word={word} userLetters={userLetters} />
          <ErrorLetters userLetters={userLetters} word={word} />
          <Form lastLetter={lastLetter} handleLastLetter={handleLastLetter} />
        </section>
        <Dummy numberOfErrors={getNumberOfErrors()} />
      </main>
    </div>
  );
}

export default App;
