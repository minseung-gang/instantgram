import UserSidebar from '@/components/UserSidebar';
import Followingbar from '@/components/Followingbar';
import PostContainer from '@/components/ui/post/PostContainer';
import { getServerSession } from 'next-auth';
import { authOptions } from './api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export default async function HomePage() {
  const session = await getServerSession(authOptions);
  const user = session?.user;

  if (!user) {
    redirect('/auth/signin');
  }

  return (
    <section className="flex w-full h-full justify-center mx-auto">
      <div className="w-full max-w-[630px] sm:min-w-[630px] flex flex-col">
        <Followingbar />
        <PostContainer />
      </div>
      <UserSidebar user={user} />
    </section>
  );
}
