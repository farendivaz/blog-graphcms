import { Link } from "react-router-dom";
import BlogCard from "./BlogCard";

const Blog = ({ posts }) => {
  return (
    <main className="w-4/5 my-8 mx-auto h-screen grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 font-poppins">
      {posts.map(({ id, title, author, cover, datePublished, slug }) => (
        <Link to={`/post/${slug}`} key={id}>
          <BlogCard
            title={title}
            author={author}
            cover={cover}
            datePublished={datePublished}
          />
        </Link>
      ))}
    </main>
  );
};

export default Blog;
