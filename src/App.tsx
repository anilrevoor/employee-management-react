import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from 'react-router-dom';

import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box
} from '@mui/material';

import { AppProvider } from './context/AppContext';
import Notification from './components/Notification/Notification';

import EmployeeList from './pages/EmployeeList/EmployeeList';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import EditEmployee from './pages/EditEmployee/EditEmployee';
import Login from './pages/Login/Login';

import { getToken, logout } from './services/authService';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';


interface NavigationProps {
  isLoggedIn: boolean;
  onLogout: () => void;
}

function Navigation({
  isLoggedIn,
  onLogout
}: NavigationProps) {
  const history = useHistory();

  const handleLogout = (): void => {
    onLogout();
    history.push('/login');
  };

  return (
    <AppBar position="static">
      <Toolbar sx={{ flexWrap: 'wrap' }}>
        <Typography
          variant="h6"
          sx={{
            flexGrow: 1,
            marginRight: 2
          }}
        >
          Employee Management Portal
        </Typography>

        <Button
          color="inherit"
          component={Link}
          to="/"
        >
          Employee List
        </Button>

        <Button
          color="inherit"
          component={Link}
          to="/add"
        >
          Add Employee
        </Button>

        {!isLoggedIn ? (
          <Button
            color="inherit"
            component={Link}
            to="/login"
          >
            Login
          </Button>
        ) : (
          <Button
            color="inherit"
            onClick={handleLogout}
          >
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
}


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    !!getToken()
  );

  const handleLogin = (): void => {
    setIsLoggedIn(true);
  };

  const handleLogout = (): void => {
    logout();
    setIsLoggedIn(false);
  };

  return (
    <AppProvider>
      <Router>
        <Navigation
          isLoggedIn={isLoggedIn}
          onLogout={handleLogout}
        />

        <Notification />

        <Box sx={{ padding: 2 }}>
          <Switch>
            <ProtectedRoute
			  exact
			  path="/"
			  component={EmployeeList}
			/>

			<ProtectedRoute
			  path="/add"
			  component={AddEmployee}
			/>

			<ProtectedRoute
			  path="/edit/:id"
			  component={EditEmployee}
			/>

            <Route
              path="/login"
              render={() => (
                <Login onLogin={handleLogin} />
              )}
            />
          </Switch>
        </Box>
      </Router>
    </AppProvider>
  );
}

export default App;