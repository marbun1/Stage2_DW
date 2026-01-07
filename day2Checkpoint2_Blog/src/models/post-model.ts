export interface Post {
  id: number;
  title: string;
  content: string;
  author: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Post 1",
    content: "Content 1",
    author: "Author 1",
  },
  {
    id: 2,
    title: "Post 2",
    author: "Author 2",
    content: "Content 2",
  },
];
