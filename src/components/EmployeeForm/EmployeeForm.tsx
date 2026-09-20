import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  TextField
} from '@mui/material';

import { Employee } from '../../types/Employee';

interface EmployeeFormProps {
  initialEmployee?: Employee;
  buttonText: string;
  onSubmit: (employee: Employee) => Promise<void>;
  resetAfterSubmit?: boolean;
}

const emptyEmployee: Employee = {
  firstName: '',
  lastName: '',
  email: '',
  department: ''
};

const EmployeeForm: React.FC<EmployeeFormProps> = ({
  initialEmployee = emptyEmployee,
  buttonText,
  onSubmit,
  resetAfterSubmit = true
}) => {
  const [employee, setEmployee] =
    useState<Employee>(initialEmployee);

  const [error, setError] =
    useState<string>('');

  const [validationErrors, setValidationErrors] =
    useState<{
      firstName?: string;
      lastName?: string;
      email?: string;
      department?: string;
    }>({});

  useEffect(() => {
    setEmployee(initialEmployee);
    setError('');
    setValidationErrors({});
  }, [initialEmployee]);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    const { name, value } = event.target;

    setEmployee((previousEmployee) => ({
      ...previousEmployee,
      [name]: value
    }));
  };

  const validate = (): boolean => {
    const errors: {
      firstName?: string;
      lastName?: string;
      email?: string;
      department?: string;
    } = {};

    if (!employee.firstName.trim()) {
      errors.firstName =
        'First Name is required.';
    }

    if (!employee.lastName.trim()) {
      errors.lastName =
        'Last Name is required.';
    }

    if (!employee.email.trim()) {
      errors.email =
        'Email is required.';
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
        employee.email
      )
    ) {
      errors.email =
        'Enter a valid email address.';
    }

    if (!employee.department.trim()) {
      errors.department =
        'Department is required.';
    }

    setValidationErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (
    event: React.FormEvent
  ): Promise<void> => {
    event.preventDefault();

    setError('');

    if (!validate()) {
      return;
    }

    try {
      await onSubmit(employee);

      if (resetAfterSubmit) {
        setEmployee(emptyEmployee);
        setValidationErrors({});
      }
    } catch (err) {
      setError(
        'Unable to save employee.'
      );
    }
  };

  return (
    <>
      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="First Name"
          name="firstName"
          value={employee.firstName}
          onChange={handleChange}
          margin="normal"
          error={!!validationErrors.firstName}
          helperText={
            validationErrors.firstName
          }
        />

        <TextField
          fullWidth
          label="Last Name"
          name="lastName"
          value={employee.lastName}
          onChange={handleChange}
          margin="normal"
          error={!!validationErrors.lastName}
          helperText={
            validationErrors.lastName
          }
        />

        <TextField
          fullWidth
          label="Email"
          name="email"
          value={employee.email}
          onChange={handleChange}
          margin="normal"
          error={!!validationErrors.email}
          helperText={
            validationErrors.email
          }
        />

        <TextField
          fullWidth
          label="Department"
          name="department"
          value={employee.department}
          onChange={handleChange}
          margin="normal"
          error={!!validationErrors.department}
          helperText={
            validationErrors.department
          }
        />

        <Button
          type="submit"
          variant="contained"
          sx={{ marginTop: 2 }}
        >
          {buttonText}
        </Button>
      </form>
    </>
  );
};

export default EmployeeForm;