import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Switch } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

// import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './components/Login';
// import Header from './components/Header';

import './App.css';
// import Home from './pages/Home';
import Gallery from './pages/Gallery';
import Add from './pages/Add';
import Signup from './pages/signup'


const httpLink = createHttpLink({
  uri: '/graphql',
});


const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
      <div>
        <div className='homepage'>
            <h1>Finders Keepers</h1>
            <h4>Keeping track of what you have forgotten</h4>
          </div>
          <nav>
          <ul className="nav">
            <li><Link to={'/'} className="nav-link">Login/Signup</Link></li>
            <li><Link to={'/add'} className="nav-link">Add</Link></li>
            <li><Link to={'/gallery'} className="nav-link"> Gallery </Link></li>
          </ul>
          </nav>
          <hr />
          <Routes>
              <Route exact path='/gallery' component={Gallery} />
              <Route path='/' component={Login } />
              <Route path='/add' component={Add} />
          </Routes>
        </div>
        <div>
          <Routes >
              <Route
                path="/" 
                element={<Login />}/>
              <Route 
                path="/add" 
                element={<Add />}/>
              <Route
                path="/gallery"
                element={<Gallery />}/>
          </ Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;
