import React, {
  createContext,
  useCallback,
  useContext,
  useState
} from 'react';

interface AppContextType {
  notification: string;
  showNotification: (message: string) => void;
  clearNotification: () => void;
}

const AppContext = createContext<AppContextType | undefined>(
  undefined
);

export const AppProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [notification, setNotification] = useState<string>('');

  const showNotification = useCallback(
    (message: string): void => {
      setNotification(message);
    },
    []
  );

  const clearNotification = useCallback(
    (): void => {
      setNotification('');
    },
    []
  );

  return (
    <AppContext.Provider
      value={{
        notification,
        showNotification,
        clearNotification
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      'useAppContext must be used within AppProvider'
    );
  }

  return context;
};