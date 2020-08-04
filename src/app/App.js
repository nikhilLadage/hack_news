import React from 'react';
import containers from '../app/containers';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { HashRouter as Router, Switch, Route} from "react-router-dom";

const Containers = containers;

function App() {
  return (
    <div className="app">
        <Containers.LayoutContainers.SideBarContainerComponent />
        <Containers.LayoutContainers.MainContainerComponent>
          <Containers.LayoutContainers.NavBarContainerComponent/>
            <div className="pt-5">
                <Router>
                    <Switch>
                        <Route path="/challenge" component={Containers.ChallengeContainers.AddNewChallengeContainerComponent} />
                        <Route path="/" component={Containers.DashboardContainers.DashboardHomeContainerComponent} />
                    </Switch>
                </Router>
            </div>            
        </Containers.LayoutContainers.MainContainerComponent>
    </div>
  );
}

export default App;
