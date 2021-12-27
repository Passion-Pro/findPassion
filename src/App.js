import react from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Home from "./components/home/Home";
import WithoutLoginHome from "./components/withoutlogin/WithoutLoginHome";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/withoutloginhome'>
          <WithoutLoginHome/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
