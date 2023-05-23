import {Outlet} from 'react-router-dom';
import type {FC} from 'react';

const Main: FC = () => {
  return (
    <main className="bg-auth flex min-h-screen w-screen items-center justify-center bg-cover bg-no-repeat">
      <div className="w-[95vw] rounded border border-pen-light bg-[#161a1e90] p-2 py-12 lg:p-20 lg:py-32">
        <Outlet />
      </div>
    </main>
  );
};

export default Main;
