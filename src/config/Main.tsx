import {FC, ReactNode} from 'react';
import ReactQuery from './ReactQuery';
import ToastConfig from './Toast';

interface Props {
  children: ReactNode;
}

const MainConfig: FC<Props> = ({children}) => {
  return (
    <div>
      <ReactQuery>{children}</ReactQuery>
      <ToastConfig />
    </div>
  );
};

export default MainConfig;
