import type {FC, ReactNode} from 'react';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from 'react-query/devtools';

interface Props {
  children: ReactNode;
}

const queryClient = new QueryClient();

const ReactQueryConfig: FC<Props> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} position="bottom-left" />}
    </QueryClientProvider>
  );
};

export default ReactQueryConfig;
