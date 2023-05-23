import type {FC} from 'react';
import MainConfig from '@/config/Main';
import MyRoutes from './routes';

const App: FC = () => {
  return (
    <MainConfig>
      <MyRoutes />
    </MainConfig>
  );
};

export default App;
