import UserSidebar from '@/components/UserSidebar';
import Followingbar from '@/components/Followingbar';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth';
import { redirect } from 'next/navigation';
import { getDehydratedQuery, Hydrate } from '@/utils/react-query';
import postQueryOptions from '@/service/post/server/queries';
import userQueryOptions from '@/service/user/server/queries';
import PostList from '@/components/post/PostList';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  const postQuery = await getDehydratedQuery(postQueryOptions.all());
  const userQuery = await getDehydratedQuery(userQueryOptions.all());

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex w-full h-full justify-center mx-auto">
      <div className="w-full h-full max-w-[630px] sm:min-w-[630px] flex flex-col">
        <Hydrate state={{ queries: [postQuery, userQuery] }}>
          <Followingbar />
          <PostList />
        </Hydrate>
      </div>
      <UserSidebar user={user} />
    </section>
  );
}
