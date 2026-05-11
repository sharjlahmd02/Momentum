import AppRoutes from './routes/AppRoutes';

import {
  Toaster,
} from 'react-hot-toast';

function App() {

  return (
    <>

      <Toaster
        position='top-right'
        toastOptions={{

          style: {
            background: '#161b22',
            color: '#e6edf3',
            border:
              '1px solid #30363d',
          },

        }}
      />

      <AppRoutes />

    </>
  );
}

export default App;