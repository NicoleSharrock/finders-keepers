import './App.css';
import Home from './pages/Home';
import Login from './components/Login';
import Gallery from './pages/Gallery';
import Add from './pages/Add';
import Header from './components/Header'
import Nav from './components/Nav';
import Footer from './components/Footer';
// import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <>
      < Header />
      < Nav />
      < Add />
      < Footer />
    </>
  );
}

export default App;
