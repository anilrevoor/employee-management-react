import React from 'react';
import { Alert, Box } from '@mui/material';
import { useAppContext } from '../../context/AppContext';

const Notification: React.FC = () => {
  const {
    notification,
    clearNotification
  } = useAppContext();

  if (!notification) {
    return null;
  }

  return (
    <Box sx={{ marginBottom: 2 }}>
      <Alert
        severity="success"
        onClose={clearNotification}
      >
        {notification}
      </Alert>
    </Box>
  );
};

export default Notification;