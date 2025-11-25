import NotFoundLayout from '@/components/layout/NotFoundLayout/NotFoundLayout';

const NotFound = () => {
  return (
    <NotFoundLayout message="Page not found" iconName="img-404" backHref="/" backLabel="Go Home" />
  );
};

export default NotFound;
