import React from "react";
import {BrowserRouter as Router, Route , Switch} from 'react-router-dom'
import AdminIndex from "./pages/AdminIndex/AdminIndex";
import Login from "./pages/login/Login";
import store from './store/configureStore'
import {Provider} from 'react-redux'

function App() {
  return (
    <Provider store={store}>
      <Router>
       <Switch>
          <Route path="/login" component={Login}/>
          <Route path="/index" component={AdminIndex}/>
       </Switch>
     </Router>
    </Provider>
     
  );
}

export default App;
