import { HeaderClient } from './HeaderClient';
import { getServerMe } from '@/lib/api/serverApi';
import type { User } from '@/types/user';

export async function Header() {
  let user: User | null = null;

  try {
    user = await getServerMe();
  } catch {
    user = null;
  }

  return <HeaderClient isAuthenticated={!!user} userName={user?.name ?? null} />;
}
