import { client } from './sanity';

type OAuthUser = {
  id: string;
  email: string;
  name: string;
  username: string;
  image?: string | null;
};

export async function addUser({ id, username, email, name, image }: OAuthUser) {
  return client.createIfNotExists({
    _id: id,
    _type: 'user',
    username,
    email,
    name,
    image,
    following: [],
    followers: [],
    bookmarks: [],
  });
}

export async function getUser(username: string) {
  return client.fetch(
    `*[_type == "user" && username == "${username}"][0]{
        ...,
        "id":_id,
        following[]->{username,image},
        followers[]->{username,image},
        "bookmarks":bookmarks[]->_id
      }`,
  );
}

export async function serachUsers(keyword?: string) {
  const query = keyword
    ? `&& (name match "*${keyword}*" || username match "*${keyword}*")`
    : '';
  return client.fetch(
    `*[_type=="user" ${query}]{
    ...,
    "following": count(following),
    "followers": count(followers),
    }
    `,
  );
}

export async function getUserForProfile(username: string) {
  try {
    const user = await client.fetch(
      `*[_type == "user" && username == $username][0]{
        ...,
        "id": _id,
        "following": count(following),
        "followers": count(followers),
        "posts": count(*[_type=="post" && author->username == $username])
      }`,
      { username },
    );

    // 쿼리 결과가 없을 경우
    if (!user) {
      console.warn(`User with username "${username}" not found.`);
      return undefined;
    }

    return {
      ...user,
      following: user.following ?? 0,
      followers: user.followers ?? 0,
      posts: user.posts ?? 0,
    };
  } catch (error) {
    console.error('Error fetching user profile:', error);
    return undefined;
  }
}
export async function addBookmark(userId: string, postId: string) {
  return client
    .patch(userId) //
    .setIfMissing({ bookmarks: [] })
    .append('bookmarks', [
      {
        _ref: postId,
        _type: 'reference',
      },
    ])
    .commit({ autoGenerateArrayKeys: true });
}

export async function removeBookmark(userId: string, postId: string) {
  return client
    .patch(userId)
    .unset([`bookmarks[_ref=="${postId}"]`])
    .commit();
}
