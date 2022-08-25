import { useParams } from "react-router-dom";
import { GraphQLClient, gql } from "graphql-request";
import { useEffect, useState } from "react";
import Spinner from "../assets/spinner.gif";
const graphcms = new GraphQLClient(
  "https://api-ap-southeast-2.hygraph.com/v2/cl6w8tbhz415q01uj2jh86qv0/master"
);

const QUERY = gql`
  query Post($slug: String!) {
    post(where: { slug: $slug }) {
      id
      title
      slug
      datePublished
      author {
        id
        name
        avatar {
          url
        }
      }
      content {
        html
      }
      cover {
        id
        url
      }
    }
  }
`;

// const SLUGLIST = gql`
//   {
//     posts {
//       slug
//     }
//   }
// `;
const BlogContent = () => {
  const { slug } = useParams();
  const [post, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSinglePost();
  }, []);

  const fetchSinglePost = async () => {
    const response = await graphcms.request(QUERY, { slug });
    const data = await response.post;
    // const post = posts.find((post) => post.slug === slug);
    setPost(data);
    setLoading(false);
  };

  return (
    <div key={post.key} className="w-4/5 mx-auto">
      {loading ? (
        <div className="flex justify-center items-center w-full h-screen">
          <img src={Spinner} alt="Spinner" width="300px" />
        </div>
      ) : (
        <>
          <div className="w-full">
            <img
              src={post.cover.url}
              alt={post.title}
              className="w-full max-w-[900px]  h-auto mx-auto my-8"
            />
          </div>
          <div className="w-full max-w-[900px] mx-auto ">
            <h2 className="text-3xl md:text-4xl text-slate-700 font-bold mb-4 ">
              {post.title}
            </h2>
            <p className="font-semibold text-slate-800 ">{`Written on ${post.datePublished} by ${post.author.name}`}</p>
          </div>
          <div
            className="w-full max-w-[900px] mx-auto text-md md:text-lg text-justify my-8"
            dangerouslySetInnerHTML={{ __html: post.content.html }}
          ></div>
        </>
      )}
    </div>
  );
};

export default BlogContent;
