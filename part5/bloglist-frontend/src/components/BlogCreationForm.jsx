import { useState } from "react";

const BlogCreationForm = ({ createBlog }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const handleBlogCreation = (event) => {
    event.preventDefault();
    createBlog({ title: title, author: author, url: url });
    setUrl("");
    setTitle("");
    setAuthor("");
  };

  return (
    <>
      <h2>Create new blog</h2>
      <form onSubmit={handleBlogCreation}>
        <div>
          <label>
            title
            <input
              type="text"
              value={title}
              onChange={({ target }) => setTitle(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            author
            <input
              type="text"
              value={author}
              onChange={({ target }) => setAuthor(target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            url
            <input
              type="text"
              value={url}
              onChange={({ target }) => setUrl(target.value)}
            />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default BlogCreationForm;
