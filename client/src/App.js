import './App.css';
import Home from './pages/Home';
import Login from './components/Login';
import Gallery from './pages/Gallery';
import Add from './pages/Add';
import Header from './components/Header'
import Nav from './components/Nav';
import Footer from './components/Footer'

function App() {
  return (
    <>
      < Header />
      < Nav />
      < Login />
      < Gallery />
      < Footer />
    </>
  );
}

export default App;
