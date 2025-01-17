import { Header } from "./components/Header";
import { Router } from "./Router";

function App() {
  return (
    <div className="App">
      <Header />
      <div className="mt-20">
        <Router />
      </div>
    </div>
  );
}

export default App;
