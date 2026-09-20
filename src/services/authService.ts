import axios from 'axios';

const AUTH_URL = 'http://localhost:8080/api/v1/auth/login';

interface AuthResponse {
  token: string;
  role: string;
}

export const login = async (
  username: string,
  password: string
): Promise<AuthResponse> => {
  const response = await axios.post<AuthResponse>(
    AUTH_URL,
    {
      username,
      password
    }
  );

  localStorage.setItem('token', response.data.token);
  localStorage.setItem('role', response.data.role);

  return response.data;
};

export const getToken = (): string | null => {
  return localStorage.getItem('token');
};

export const logout = (): void => {
  localStorage.removeItem('token');
  localStorage.removeItem('role');
};
