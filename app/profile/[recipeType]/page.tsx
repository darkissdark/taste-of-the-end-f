export const metadata = {
  title: "Профіль",
  description: "Порожня сторінка"
};

type PageProps = {
  params: Promise<{ recipeType: string }>;
};

export default async function ProfilePage({ params }: PageProps) {
  const { recipeType } = await params;
  return <section>Профіль: {recipeType}</section>;
}

