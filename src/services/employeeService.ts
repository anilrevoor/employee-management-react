import axios from 'axios';
import { Employee } from '../types/Employee';
import { getToken } from './authService';

const API_URL = 'http://localhost:8080/api/v1/employees';

const authHeaders = () => {
  const token = getToken();

  return token
    ? {
        Authorization: `Bearer ${token}`
      }
    : {};
};

export const getEmployees = async (): Promise<Employee[]> => {
  const response = await axios.get<Employee[]>(
    API_URL,
    {
      headers: authHeaders()
    }
  );

  return response.data;
};

export const createEmployee = async (
  employee: Employee
): Promise<Employee> => {
  const response = await axios.post<Employee>(
    API_URL,
    employee,
    {
      headers: authHeaders()
    }
  );

  return response.data;
};

export const updateEmployee = async (
  id: number,
  employee: Employee
): Promise<Employee> => {
  const response = await axios.put<Employee>(
    `${API_URL}/${id}`,
    employee,
    {
      headers: authHeaders()
    }
  );

  return response.data;
};

export const deleteEmployee = async (
  id: number
): Promise<void> => {
  await axios.delete(
    `${API_URL}/${id}`,
    {
      headers: authHeaders()
    }
  );
};
