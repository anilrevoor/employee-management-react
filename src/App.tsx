import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Button, Typography, Box } from '@mui/material';

import EmployeeList from './pages/EmployeeList/EmployeeList';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import EditEmployee from './pages/EditEmployee/EditEmployee';

function App() {
  return (
    <Router>
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

          <Button color="inherit" component={Link} to="/">
            Employee List
          </Button>

          <Button color="inherit" component={Link} to="/add">
            Add Employee
          </Button>

          <Button color="inherit" component={Link} to="/edit">
            Edit Employee
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ padding: 2 }}>
        <Switch>
          <Route exact path="/" component={EmployeeList} />
          <Route path="/add" component={AddEmployee} />
          <Route path="/edit" component={EditEmployee} />
        </Switch>
      </Box>
    </Router>
  );
}

export default App;