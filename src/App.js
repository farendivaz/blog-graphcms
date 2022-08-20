import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";
import BlogContent from "./components/BlogContent";
import Blog from "./components/Blog";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const graphcms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/cl6w8tbhz415q01uj2jh86qv0/master"
);

const QUERY = gql`
  {
    posts {
      id
      title
      datePublished
      slug
      content {
        html
      }
      author {
        name
        avatar {
          url
        }
      }
      cover {
        url
      }
    }
  }
`;

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { posts } = await graphcms.request(QUERY);
    setPosts(posts);
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Blog posts={posts} />} />
        <Route path="/post/:slug" element={<BlogContent posts={posts} />} />
      </Routes>
    </Router>
  );
}

export default App;
