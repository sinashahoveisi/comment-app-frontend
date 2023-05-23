import type {FC} from 'react';
import {ToastContainer, Flip} from 'react-toastify';

const ToastConfig: FC = () => {
  return (
    <ToastContainer
      position="bottom-right"
      theme="dark"
      autoClose={1000}
      newestOnTop
      hideProgressBar
      transition={Flip}
      closeOnClick
      pauseOnHover
      pauseOnFocusLoss
      draggable
    />
  );
};

export default ToastConfig;
