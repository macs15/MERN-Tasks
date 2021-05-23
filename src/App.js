import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Login from './components/auth/Login';
import NuevaCuenta from './components/auth/NuevaCuenta';
import Proyectos from './components/proyectos/Proyectos';
import ProjectState from './context/proyectos/projectState';
import TaskState from './context/tareas/taskState';
import AlertState from './context/alertas/alertState';
import AuthState from './context/autenticacion/authState';
import tokenAuth from './configs/tokenAuth';
import RutaPrivada from './components/rutas/RutaPrivada';

// revisar si tenemos un token
const token = localStorage.getItem('token');
if(token) {
  tokenAuth(token);
}

function App() {
  return (
    <ProjectState>
      <TaskState>
        <AlertState>
          <AuthState>
            <Router>
              <Switch>
                <Route exact path="/" component={Login} />            
                <Route exact path="/nueva-cuenta" component={NuevaCuenta} />
                <RutaPrivada exact path="/proyectos" component={Proyectos} />
              </Switch>
            </Router>
          </AuthState>
        </AlertState>
       </TaskState>
    </ProjectState>
  );
}

export default App;
