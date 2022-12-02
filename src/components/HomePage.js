import SolutionLetters from './SolutionLetters';
import ErrorLetters from './ErrorLetters';
import Form from './Form';

function HomePage(props) {
  <section>
    <SolutionLetters word={props.word} userLetters={props.userLetters} />
    <ErrorLetters userLetters={props.userLetters} word={props.word} />
    <Form
      lastLetter={props.lastLetter}
      handleLastLetter={props.handleLastLetter}
    />
  </section>;
}

export default HomePage;
