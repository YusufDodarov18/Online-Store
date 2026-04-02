import { Toaster } from 'react-hot-toast';
import { Layout } from './layout/layout';

function App() {
  return (
    <>
      <Layout/>
      <Toaster position="top-center" />
    </>
  );
}

export default App
