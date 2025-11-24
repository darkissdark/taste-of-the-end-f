import { pageMeta } from '@/lib/seo';
import Container from '@/components/layout/Container/Container';

export const generateMetadata = () => {
  return pageMeta({
    title: 'Sign-up',
    path: '/auth/register',
  });
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <Container>{children}</Container>;
}
