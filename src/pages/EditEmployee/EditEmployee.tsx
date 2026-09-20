import React, { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  CircularProgress
} from '@mui/material';

import { useParams } from 'react-router-dom';

import { Employee } from '../../types/Employee';
import { useAppContext } from '../../context/AppContext';

import {
  useAppDispatch,
  useAppSelector
} from '../../store/hooks';

import {
  fetchEmployees,
  editEmployee
} from '../../store/slices/employeeSlice';

import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';

interface RouteParams {
  id: string;
}

const EditEmployee: React.FC = () => {

  const { showNotification } = useAppContext();
  const dispatch = useAppDispatch();

  const { id } = useParams<RouteParams>();

  const {
    employees,
    loading,
    error
  } = useAppSelector(
    (state) => state.employees
  );

  const [selectedEmployee, setSelectedEmployee] =
    useState<Employee | undefined>(undefined);

  const [employeesLoaded, setEmployeesLoaded] =
    useState<boolean>(false);

  useEffect(() => {
    if (employees.length === 0) {
      dispatch(fetchEmployees());
    } else {
      setEmployeesLoaded(true);
    }
  }, [dispatch, employees.length]);

  useEffect(() => {
    if (!id || employees.length === 0) {
      return;
    }

    const employeeId = Number(id);

    const employee = employees.find(
      (item) => item.id === employeeId
    );

    setSelectedEmployee(employee);
    setEmployeesLoaded(true);

  }, [id, employees]);

  const handleSubmit = async (
    employee: Employee
  ): Promise<void> => {

    if (
      !selectedEmployee ||
      selectedEmployee.id === undefined
    ) {
      throw new Error(
        'Employee not found.'
      );
    }

    const updatedEmployee: Employee = {
      ...employee,
      id: selectedEmployee.id
    };

    await dispatch(
      editEmployee(updatedEmployee)
    ).unwrap();

    setSelectedEmployee(updatedEmployee);

    showNotification(
      'Employee updated successfully.'
    );
  };

  if (loading && !employeesLoaded) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          marginTop: 5
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 600,
        margin: '30px auto',
        padding: 2
      }}
    >
      <Paper sx={{ padding: 3 }}>

        <Typography
          variant="h4"
          gutterBottom
        >
          Edit Employee
        </Typography>

        {error && (
          <Typography
            color="error"
            sx={{ marginBottom: 2 }}
          >
            {error}
          </Typography>
        )}

        {employeesLoaded && !selectedEmployee && (
          <Typography color="error">
            Employee not found.
          </Typography>
        )}

        {selectedEmployee && (
          <Box sx={{ marginTop: 2 }}>
            <EmployeeForm
              key={selectedEmployee.id}
              initialEmployee={selectedEmployee}
              buttonText="Update Employee"
              resetAfterSubmit={false}
              onSubmit={handleSubmit}
            />
          </Box>
        )}

      </Paper>
    </Box>
  );
};

export default EditEmployee;