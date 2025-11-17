import { pageMeta } from '@/lib/seo';

export const generateMetadata = () => {
  return pageMeta({
    title: 'Sign-up',
    path: '/auth/register',
  });
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
