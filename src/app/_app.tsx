import { AppProps } from 'next/app';
import '../styles/globals.css'; // Optional: global styles
import { Toaster } from 'react-hot-toast';
import Layout from './Layout';
import { useRouter } from 'next/router';

// Update the App component props type
interface AppPropsWithLayout extends AppProps {
  Component: React.ComponentType & { getLayout?: (page: React.ReactNode) => React.ReactNode };
}

// Utility function to check if the current page is an auth page
const isAuthPage = (pathname: string) => ['/login', '/signup'].includes(pathname);

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();
  const { pathname } = router;

  // Conditionally apply the layout
  const getLayout = Component.getLayout || ((page) => (isAuthPage(pathname) ? page : <Layout>{page}</Layout>));

  return (
    <div>
      <Toaster />
      {getLayout(<Component {...pageProps} />)}
    </div>
  );
}
