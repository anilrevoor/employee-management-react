import React, { useEffect, useState } from 'react';
import {
  Alert,
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import { Employee } from '../../types/Employee';
import {
  getEmployees,
  updateEmployee
} from '../../services/employeeService';

const EditEmployee: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedId, setSelectedId] = useState<number | ''>('');
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

  useEffect(() => {
    loadEmployees();
  }, []);

  const loadEmployees = async () => {
    try {
      const data = await getEmployees();
      setEmployees(data);
    } catch (err) {
      setError('Unable to load employees.');
    }
  };

  const handleEmployeeSelect = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const id = Number(event.target.value);

    setSelectedId(id);

    const selectedEmployee = employees.find(
      (item) => item.id === id
    );

    if (selectedEmployee) {
      setEmployee({
        firstName: selectedEmployee.firstName,
        lastName: selectedEmployee.lastName,
        email: selectedEmployee.email,
        department: selectedEmployee.department
      });
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const { name, value } = event.target;

    setEmployee({
      ...employee,
      [name]: value
    });
  };

const handleSubmit = async (
  event: React.FormEvent
) => {
  event.preventDefault();

  if (!selectedId) {
    setError('Please select an employee.');
    return;
  }

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
    await updateEmployee(selectedId, employee);

    setMessage('Employee updated successfully.');
    setError('');
  } catch (err) {
    setError('Unable to update employee.');
    setMessage('');
  }
};

  return (
    <Box sx={{ width: '100%', maxWidth: 600, margin: '30px auto', padding: 2 }}>
      <Paper sx={{ padding: 3 }}>
        <Typography variant="h4" gutterBottom>
          Edit Employee
        </Typography>

        {message && (
          <Alert severity="success">{message}</Alert>
        )}

        {error && (
          <Alert severity="error">{error}</Alert>
        )}

        <TextField
          select
          fullWidth
          label="Select Employee"
          value={selectedId}
          onChange={handleEmployeeSelect}
          margin="normal"
          SelectProps={{
            native: true
          }}
        >
          <option value="">Select Employee</option>

          {employees.map((item) => (
            <option key={item.id} value={item.id}>
              {item.firstName} {item.lastName}
            </option>
          ))}
        </TextField>

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
            Update Employee
          </Button>
        </form>
      </Paper>
    </Box>
  );
};

export default EditEmployee;