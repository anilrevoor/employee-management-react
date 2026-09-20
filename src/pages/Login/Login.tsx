import React, { useState } from 'react';
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography
} from '@mui/material';

import { useHistory } from 'react-router-dom';

import { login } from '../../services/authService';
import { useAppContext } from '../../context/AppContext';

interface LoginProps {
  onLogin: () => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const { showNotification } = useAppContext();
  const history = useHistory();

  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = async (
	  event: React.FormEvent
	): Promise<void> => {
	  event.preventDefault();

	  setError('');

	  if (!username.trim() || !password.trim()) {
		setError('Username and password are required.');
		return;
	  }

	  try {
		setLoading(true);

		await login(username, password);

		onLogin();

		showNotification('Login successful.');

		history.push('/');
	  } catch (err) {
		console.error('Login error:', err);
		setError('Login request failed. Check the browser console.');
	  } finally {
		setLoading(false);
	  }
	};

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: 400,
        margin: '60px auto',
        padding: 2
      }}
    >
      <Paper sx={{ padding: 3 }}>
        <Typography
          variant="h4"
          gutterBottom
        >
          Login
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit}
        >
          <TextField
            fullWidth
            label="Username"
            value={username}
            onChange={(event) =>
              setUsername(event.target.value)
            }
            margin="normal"
          />

          <TextField
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(event) =>
              setPassword(event.target.value)
            }
            margin="normal"
          />

          {error && (
            <Typography
              color="error"
              sx={{ marginTop: 1 }}
            >
              {error}
            </Typography>
          )}

          <Button
            type="submit"
            variant="contained"
            fullWidth
            disabled={loading}
            sx={{ marginTop: 2 }}
          >
            {loading ? 'Logging in...' : 'Login'}
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default Login;