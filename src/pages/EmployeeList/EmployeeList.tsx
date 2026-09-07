import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography
} from '@mui/material';

import { Employee } from '../../types/Employee';
import { getEmployees, deleteEmployee } from '../../services/employeeService';
import { Link } from 'react-router-dom';

const EmployeeList: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data);
      setError('');
    } catch (err) {
      setError('Unable to load employees.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <CircularProgress />;
  }

const handleDelete = async (id: number) => {
  const confirmed = window.confirm(
    'Are you sure you want to delete this employee?'
  );

  if (!confirmed) {
    return;
  }

  try {
    await deleteEmployee(id);
    setEmployees(employees.filter((employee) => employee.id !== id));
  } catch (err) {
    setError('Unable to delete employee.');
  }
};

  return (
    <div>
    <Box
	  sx={{
		display: 'flex',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 2
	  }}
	>
	  <Typography variant="h4">
		Employee List
	  </Typography>

	  <Button
		variant="contained"
		component={Link}
		to="/add"
	  >
		Add Employee
	  </Button>
	</Box>

      {error && <Alert severity="error">{error}</Alert>}

      <TableContainer component={Paper} sx={{ overflowX: 'auto' }}>
		<Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>First Name</TableCell>
              <TableCell>Last Name</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Department</TableCell>
			  <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {employees.map((employee) => (
              <TableRow key={employee.id}>
                <TableCell>{employee.id}</TableCell>
                <TableCell>{employee.firstName}</TableCell>
                <TableCell>{employee.lastName}</TableCell>
                <TableCell>{employee.email}</TableCell>
                <TableCell>{employee.department}</TableCell>
				<TableCell>
				  <Button
					variant="contained"
					size="small"
					component={Link}
					to="/edit"
					sx={{ marginRight: 1 }}
				  >
					Edit
				  </Button>

				  <Button
					variant="outlined"
					color="error"
					size="small"
					onClick={() => {
					  if (employee.id !== undefined) {
						handleDelete(employee.id);
					  }
					}}
				  >
					Delete
				  </Button>
				</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default EmployeeList;