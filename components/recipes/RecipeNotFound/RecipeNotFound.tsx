import NotFoundLayout from '@/components/layout/NotFoundLayout/NotFoundLayout';

const RecipeNotFound = () => {
  return (
    <NotFoundLayout
      message="Recipe not found"
      imageSrc="/recipeNF.jpg"
      imageAlt="Recipe Not Found"
      backHref="/"
      backLabel="Back to Home"
    />
  );
};

export default RecipeNotFound;
