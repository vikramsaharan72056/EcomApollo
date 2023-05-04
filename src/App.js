import "./App.css";
import Navbar from "./Components/Navbar";

import { BrowserRouter, useRoutes } from "react-router-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import routes from "./Components/routes";
import { CartProvider } from "react-use-cart";

const client = new ApolloClient({
  uri: "https://ecomstrapi1.onrender.com/graphql",
  cache: new InMemoryCache(),
});

const Routes = () => {
  const element = useRoutes(routes);
  return (
    <div>
      <Navbar />
      {element}
    </div>
  );
};

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ApolloProvider client={client}>
          <Routes />
        </ApolloProvider>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
