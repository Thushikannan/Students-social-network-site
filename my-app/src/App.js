import React from 'react';
import {BrowserRouter,Route,Switch} from 'react-router-dom';
//import MainNavi from './Components/Controls/Home'
import Login from './Components/Login/Login'
import Video from './Components/Controls/Video'
import Post from './Components/Controls/Post'
import About from './Components/Controls/About'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
            <Route path="/Video" component={Video} />
            <Route path="/Home" component={Video} />
            <Route path="/About" component={About} />
            <Route path="/Post" component={Post} />
            <Route path="/Logout" component={Login} />
           
            <Route path="/" component={Login}  />
          
          </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
