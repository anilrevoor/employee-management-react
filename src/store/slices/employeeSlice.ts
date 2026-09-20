import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../../services/employeeService';
import { Employee } from '../../types/Employee';

interface EmployeeState {
  employees: Employee[];
  loading: boolean;
  error: string | null;
}

const initialState: EmployeeState = {
  employees: [],
  loading: false,
  error: null
};

export const fetchEmployees = createAsyncThunk(
  'employees/fetchEmployees',
  async () => {
    return await getEmployees();
  }
);

export const addEmployee = createAsyncThunk(
  'employees/addEmployee',
  async (employee: Employee) => {
    return await createEmployee(employee);
  }
);

export const editEmployee = createAsyncThunk(
  'employees/editEmployee',
  async (employee: Employee) => {
    return await updateEmployee(employee.id, employee);
  }
);

export const removeEmployee = createAsyncThunk(
  'employees/removeEmployee',
  async (id: number) => {
    await deleteEmployee(id);
    return id;
  }
);

const employeeSlice = createSlice({
  name: 'employees',
  initialState,
  reducers: {
    clearEmployeeError: (state) => {
      state.error = null;
    },
    clearEmployees: (state) => {
      state.employees = [];
    }
  },
  extraReducers: (builder) => {
    builder

      // Fetch employees
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload;
      })
      .addCase(fetchEmployees.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to load employees.';
      })

      // Add employee
      .addCase(addEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addEmployee.fulfilled, (state, action) => {
        state.loading = false;
        state.employees.push(action.payload);
      })
      .addCase(addEmployee.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to add employee.';
      })

      // Edit employee
      .addCase(editEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editEmployee.fulfilled, (state, action) => {
        state.loading = false;

        const index = state.employees.findIndex(
          (employee) => employee.id === action.payload.id
        );

        if (index !== -1) {
          state.employees[index] = action.payload;
        }
      })
      .addCase(editEmployee.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to update employee.';
      })

      // Delete employee
      .addCase(removeEmployee.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(removeEmployee.fulfilled, (state, action) => {
        state.loading = false;

        state.employees = state.employees.filter(
          (employee) => employee.id !== action.payload
        );
      })
      .addCase(removeEmployee.rejected, (state) => {
        state.loading = false;
        state.error = 'Unable to delete employee.';
      });
  }
});

export const {
  clearEmployeeError,
  clearEmployees
} = employeeSlice.actions;

export default employeeSlice.reducer;