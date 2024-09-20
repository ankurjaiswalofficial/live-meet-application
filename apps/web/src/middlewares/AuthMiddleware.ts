// lib/withAuth.tsx
import { getSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { useEffect, ReactNode } from 'react';

const withAuth = (WrappedComponent: React.ReactNode) => {
  const Auth = (props: any) => {
    const router = useRouter();

    useEffect(() => {
      const checkSession = async () => {
        const session = await getSession();
        if (!session) {
          router.push('/api/auth/signin');
        }
      };

      checkSession();
    }, [router]);

    return <WrappedComponent {...props} />;
  };

  return Auth;
};

export default withAuth;
