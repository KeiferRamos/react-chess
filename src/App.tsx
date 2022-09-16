import "./App.css";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";
import RoutesPage from "./routes";
import { useNavigate } from "react-router";
import { useEffect } from "react";

function App() {
  const nav = useNavigate();
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    uri: "http://localhost:4000/graphql",
  });

  useEffect(() => {
    const item = localStorage.getItem("username");
    if (item) {
      return;
    }
    nav("/react-chess/login");
  }, []);

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <RoutesPage />
      </div>
    </ApolloProvider>
  );
}

export default App;
