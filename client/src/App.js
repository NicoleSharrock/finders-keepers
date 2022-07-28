import React, {Component} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

import Nav from './components/Nav';
import Footer from './components/Footer';
import Login from './components/Login';
// import Header from './components/Header';

import './App.css';
// import Home from './pages/Home';
// import Gallery from './pages/Gallery';
import Add from './pages/Add';


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
          <Nav />
          <Routes >
              <Route
                path="/" 
                element={<Login />}/>
              <Route 
                path="/add" 
                element={<Add />}/>
          </ Routes>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}


export default App;
