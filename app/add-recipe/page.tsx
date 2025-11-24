import { pageMeta } from '@/lib/seo';
import AddRecipeForm from '@/components/recipes/AddRecipeForm/AddRecipeForm';
import Container from '@/components/layout/Container/Container';

export const generateMetadata = () => pageMeta({ title: 'Add recipe', path: '/add-recipe' });

export default function AddRecipePage() {
  return (
    <Container>
      <AddRecipeForm />
    </Container>
  );
}
