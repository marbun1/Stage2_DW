export interface Post {
  id: number;
  title: string;
  content: string;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "Post pertama",
    content: "content 1",
  },
  {
    id: 2,
    title: "Post kedua",
    content: "content 2",
  },
];
