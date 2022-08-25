import React from "react";

const BlogCard = ({ title, author, cover, datePublished }, setLoading) => {
  return (
    <div className="h-[350px]  bg-slate-100 flex flex-col justify-center items-center border-4 shadow-xl">
      <img src={cover.url} alt={title} className="w-full" />
      <h2 className="font-semibold text-lg mt-2 text-center">{title}</h2>
      <div className="w-full m-4 flex justify-around items-center">
        <div className="flex gap-2">
          <img
            src={author.avatar.url}
            alt={author.name}
            width="30px"
            className="rounded-full"
          />
          <h3 className="font-semibold">{author.name}</h3>
        </div>
        <h3 className="font-semibold">{datePublished}</h3>
      </div>
    </div>
  );
};

export default BlogCard;
