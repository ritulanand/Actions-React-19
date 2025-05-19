import { useState, useTransition } from "react";

function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [loading, startTransition] = useTransition();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    startTransition(async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
          {
            method: "POST",
            body: JSON.stringify({ title, body, userId: 1 }),
            headers: { "Content-Type": "application/json" },
          }
        );

        if (!response.ok) throw new Error("Failed to submit post");

        const data = await response.json();
        setSuccess(`Post submitted successfully! ID: ${data.id}`);
        setTitle("");
        setBody("");
      } catch (err) {
        setError(err.message);
      }
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <textarea
        placeholder="Body"
        className="form-control mt-2"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        required
      />
      <button type="submit" className="mt-2" disabled={loading}>
        {loading ? "Submitting..." : "Submit Post"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export default PostForm;
