export async function getDetailPost(postId: string) {
  try {
    const response = await fetch(`/api/posts/proxy?postId=${postId}`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch post');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching post:', error);
    throw new Error('Failed to fetch post');
  }
}

export function getComments(postId: string) {
  return fetch(`/api/${postId}/comments`);
}

export function getComment({
  postId,
  commentId,
}: {
  postId: string;
  commentId: number;
}) {
  return fetch(`/api/${postId}/comments/${commentId}`);
}
