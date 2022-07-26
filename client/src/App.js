import './App.css';
import Home from './pages/Home';
import Login from './components/Login';
import Gallery from './pages/Gallery';
import Add from './pages/Add';
import Header from './components/Header'
import Nav from './components/Nav';
import Footer from './components/Footer';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
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
// import { Route, Link } from 'react-router-dom';

function App() {
  return (
    <ApolloProvider client={client}>
      < Nav />
      <Login />
      < Header />
      <Gallery />
      < Add />
      < Footer />
    </ApolloProvider>
  );
}

export default App;
