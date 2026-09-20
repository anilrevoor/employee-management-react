import {
  fetchEmployees,
  addEmployee,
  editEmployee,
  removeEmployee
} from './employeeSlice';

import {
  getEmployees,
  createEmployee,
  updateEmployee,
  deleteEmployee
} from '../../services/employeeService';

jest.mock('../../services/employeeService');

const mockedGetEmployees = getEmployees as jest.MockedFunction<
  typeof getEmployees
>;

const mockedCreateEmployee = createEmployee as jest.MockedFunction<
  typeof createEmployee
>;

const mockedUpdateEmployee = updateEmployee as jest.MockedFunction<
  typeof updateEmployee
>;

const mockedDeleteEmployee = deleteEmployee as jest.MockedFunction<
  typeof deleteEmployee
>;

describe('employeeSlice async actions', () => {

  const employee = {
    id: 1,
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    department: 'IT'
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('fetchEmployees should call getEmployees', async () => {
    mockedGetEmployees.mockResolvedValue([employee]);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchEmployees()(
      dispatch,
      getState,
      undefined
    );

    expect(mockedGetEmployees).toHaveBeenCalledTimes(1);
    expect(result.type).toBe('employees/fetchEmployees/fulfilled');
    expect(result.payload).toEqual([employee]);
  });

  test('addEmployee should call createEmployee', async () => {
    mockedCreateEmployee.mockResolvedValue(employee);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await addEmployee(employee)(
      dispatch,
      getState,
      undefined
    );

    expect(mockedCreateEmployee).toHaveBeenCalledWith(employee);
    expect(result.type).toBe('employees/addEmployee/fulfilled');
    expect(result.payload).toEqual(employee);
  });

  test('editEmployee should call updateEmployee', async () => {
    mockedUpdateEmployee.mockResolvedValue(employee);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await editEmployee(employee)(
      dispatch,
      getState,
      undefined
    );

    expect(mockedUpdateEmployee).toHaveBeenCalledWith(
      employee.id,
      employee
    );
    expect(result.type).toBe('employees/editEmployee/fulfilled');
    expect(result.payload).toEqual(employee);
  });

  test('removeEmployee should call deleteEmployee', async () => {
    mockedDeleteEmployee.mockResolvedValue(undefined);

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await removeEmployee(employee.id)(
      dispatch,
      getState,
      undefined
    );

    expect(mockedDeleteEmployee).toHaveBeenCalledWith(employee.id);
    expect(result.type).toBe('employees/removeEmployee/fulfilled');
    expect(result.payload).toBe(employee.id);
  });

  test('fetchEmployees should be rejected when API fails', async () => {
    mockedGetEmployees.mockRejectedValue(
      new Error('API error')
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await fetchEmployees()(
      dispatch,
      getState,
      undefined
    );

    expect(result.type).toBe('employees/fetchEmployees/rejected');
    expect(result.payload).toBeUndefined();
  });

  test('addEmployee should be rejected when API fails', async () => {
    mockedCreateEmployee.mockRejectedValue(
      new Error('API error')
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await addEmployee(employee)(
      dispatch,
      getState,
      undefined
    );

    expect(result.type).toBe('employees/addEmployee/rejected');
  });

  test('editEmployee should be rejected when API fails', async () => {
    mockedUpdateEmployee.mockRejectedValue(
      new Error('API error')
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await editEmployee(employee)(
      dispatch,
      getState,
      undefined
    );

    expect(result.type).toBe('employees/editEmployee/rejected');
  });

  test('removeEmployee should be rejected when API fails', async () => {
    mockedDeleteEmployee.mockRejectedValue(
      new Error('API error')
    );

    const dispatch = jest.fn();
    const getState = jest.fn();

    const result = await removeEmployee(employee.id)(
      dispatch,
      getState,
      undefined
    );

    expect(result.type).toBe('employees/removeEmployee/rejected');
  });
});
