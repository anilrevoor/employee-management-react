import React, { useCallback, useEffect } from 'react';
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Typography
} from '@mui/material';

import { Link } from 'react-router-dom';

import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchEmployees,
  removeEmployee
} from '../../store/slices/employeeSlice';

import EmployeeTable from '../../components/EmployeeTable/EmployeeTable';

const EmployeeList: React.FC = () => {
  const dispatch = useAppDispatch();

  const {
    employees,
    loading,
    error
  } = useAppSelector((state) => state.employees);

  useEffect(() => {
    dispatch(fetchEmployees());
  }, [dispatch]);

  const handleDelete = useCallback(
    async (id: number): Promise<void> => {
      const confirmed = window.confirm(
        'Are you sure you want to delete this employee?'
      );

      if (!confirmed) {
        return;
      }

      await dispatch(removeEmployee(id));
    },
    [dispatch]
  );

  if (loading) {
    return <CircularProgress />;
  }

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

      {error && (
        <Alert severity="error">
          {error}
        </Alert>
      )}

      <EmployeeTable
        employees={employees}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default EmployeeList;