import React from 'react';
import {
  ApolloClient, 
  InMemoryCache, 
  ApolloProvider, 
  createHttpLink,
} from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';
import Home from './pages/Home';
import About from './pages/About';
import ContactUs from './pages/ContactUs';
import SignUp from './pages/SignUp';
import Wishlist from './pages/Wishlist';

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: '/graphql',
});
// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('id_token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/contact-us' element={<ContactUs/>} />
        <Route path='/about' element={<About/>} />
        <Route path='/sign-up' element={<SignUp/>} />
        {/* <Route path='/wishlist' element={<Wishlist/>} /> */}

      </Routes>
    </Router>
    </ApolloProvider>
  );
}

export default App;