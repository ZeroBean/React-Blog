import React from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'antd/dist/antd.css'
import Home from "./pages/home/Home";
import Detail from './pages/detail/Detail'
import TimeLine from './pages/timeline/TimeLine'
import About from './pages/about/About'

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Home}/>
        <Route path="/timeline" component={TimeLine}/>
        <Route path="/detail/:id" component={Detail}/>
        <Route path="/about" component={About}/>
      </Switch>
    </Router>
  );
}

export default App;
