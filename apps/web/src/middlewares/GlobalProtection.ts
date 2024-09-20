import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, useState, ReactNode } from 'react';

const withGlobalProtectionAuth = (WrappedComponent: any) => {
  const Auth = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true); // Loading state to manage async session check

    useEffect(() => {
      const checkSession = async () => {
        const session = await getSession();
        if (!session && router.pathname !== '/api/auth/signin') {
          router.push('/api/auth/signin');
        } else {
          setLoading(false); // Only stop loading after session is checked
        }
      };

      checkSession();
    }, [router]);

    // Show a loading message or spinner while checking session
    if (loading) {
      return <div>{"Loading..."}</div>;
    }

    // Render the wrapped component with all props
    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withGlobalProtectionAuth;
