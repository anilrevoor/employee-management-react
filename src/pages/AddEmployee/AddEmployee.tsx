import React from 'react';
import {
  Box,
  Paper,
  Typography
} from '@mui/material';

import { Employee } from '../../types/Employee';
import { useAppContext } from '../../context/AppContext';
import { useAppDispatch } from '../../store/hooks';
import { addEmployee } from '../../store/slices/employeeSlice';
import EmployeeForm from '../../components/EmployeeForm/EmployeeForm';

const AddEmployee: React.FC = () => {

  const { showNotification } = useAppContext();
  const dispatch = useAppDispatch();

  const handleSubmit = async (employee: Employee): Promise<void> => {
    await dispatch(addEmployee(employee)).unwrap();
    showNotification('Employee created successfully.');
  };

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
        <Typography variant="h4" gutterBottom>
          Add Employee
        </Typography>

        <EmployeeForm
          buttonText="Add Employee"
          onSubmit={handleSubmit}
        />
      </Paper>
    </Box>
  );
};

export default AddEmployee;