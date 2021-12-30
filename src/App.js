import react from "react";
import {BrowserRouter as Router,Switch,Route} from "react-router-dom";
import Group from "./components/group/Group";
import Home from "./components/home/Home";
import Createpost from "./components/post/Createpost";
import WithoutLoginHome from "./components/withoutlogin/WithoutLoginHome";

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/withoutloginhome'>
          <WithoutLoginHome/>
        </Route>
        <Route path='/createpost'>
          <Createpost/>
        </Route>
        <Route path='/group'>
          <Group/>
        </Route>
        <Route path='/'>
          <Home/>
        </Route>
      </Switch>
    </Router>
    
  );
}

export default App;
