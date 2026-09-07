import React, { useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import { Employee } from '../../types/Employee';
import { createEmployee } from '../../services/employeeService';

const AddEmployee: React.FC = () => {
  const [employee, setEmployee] = useState<Employee>({
    firstName: '',
    lastName: '',
    email: '',
    department: ''
  });

	const [message, setMessage] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [validationErrors, setValidationErrors] = useState<{
	  firstName?: string;
	  lastName?: string;
	  email?: string;
	  department?: string;
	}>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setEmployee({
      ...employee,
      [name]: value
    });
  };

  const handleSubmit = async (event: React.FormEvent) => {
	  event.preventDefault();

	  const errors: {
		firstName?: string;
		lastName?: string;
		email?: string;
		department?: string;
	  } = {};

	  if (!employee.firstName.trim()) {
		errors.firstName = 'First Name is required.';
	  }

	  if (!employee.lastName.trim()) {
		errors.lastName = 'Last Name is required.';
	  }

	  if (!employee.email.trim()) {
		errors.email = 'Email is required.';
	  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(employee.email)) {
		errors.email = 'Enter a valid email address.';
	  }

	  if (!employee.department.trim()) {
		errors.department = 'Department is required.';
	  }

	  setValidationErrors(errors);

	  if (Object.keys(errors).length > 0) {
		return;
	  }

	  try {
      await createEmployee(employee);

      setMessage('Employee created successfully.');
      setError('');

      setEmployee({
        firstName: '',
        lastName: '',
        email: '',
        department: ''
      });
    } catch (err) {
      setError('Unable to create employee.');
      setMessage('');
    }
  };

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '30px auto', padding: 2 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Add Employee
        </Typography>

        {message && <Alert severity="success">{message}</Alert>}
        {error && <Alert severity="error">{error}</Alert>}

        <form onSubmit={handleSubmit}>
			<TextField
			  fullWidth
			  label="First Name"
			  name="firstName"
			  value={employee.firstName}
			  onChange={handleChange}
			  margin="normal"
			  error={!!validationErrors.firstName}
			  helperText={validationErrors.firstName}
			/>

			<TextField
			  fullWidth
			  label="Last Name"
			  name="lastName"
			  value={employee.lastName}
			  onChange={handleChange}
			  margin="normal"
			  error={!!validationErrors.lastName}
			  helperText={validationErrors.lastName}
			/>

			<TextField
			  fullWidth
			  label="Email"
			  name="email"
			  value={employee.email}
			  onChange={handleChange}
			  margin="normal"
			  error={!!validationErrors.email}
			  helperText={validationErrors.email}
			/>

			<TextField
			  fullWidth
			  label="Department"
			  name="department"
			  value={employee.department}
			  onChange={handleChange}
			  margin="normal"
			  error={!!validationErrors.department}
			  helperText={validationErrors.department}
			/>

          <Button
            type="submit"
            variant="contained"
            sx={{ marginTop: 2 }}
          >
            Add Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default AddEmployee;