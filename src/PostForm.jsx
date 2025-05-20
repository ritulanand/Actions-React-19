import { useActionState } from "react";
import { useFormStatus } from "react-dom";
// import { useState, useTransition } from "react";

async function submitPost(prevState, formData){
  const title = formData.get("title");
  const body = formData.get("body");
  try{
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
       method: "POST",
            body: JSON.stringify({ title, body, userId: 1 }),
            headers: { "Content-Type": "application/json" },
    });
     if (!response.ok) throw new Error("Failed to submit post");
      const data = await response.json();
      return {success : `Post submitted successfully! ID: ${data.id}`, error : null}
  }catch(err){
    return {success : null, error: err.message}
  }
}

function SubmitFormBtn(){
    const {pending} = useFormStatus();
    //  useFormStatus should be called inside a child component of <form> 
  return (
<button type="submit" className="mt-2" disabled={pending}>
        {pending ? "Submitting..." : "Submit Post"}
      </button>
  )
}


function Publishbtn(){
    const {pending} = useFormStatus();
  return (
<button type="submit" className="mt-2" disabled={pending}>
        {pending ? "Submitting..." : "Submit Post"}
      </button>
  )
}


function PostForm() {
  const [{success, error}, formAction, isPending] = useActionState(submitPost, {success : null, error: null});





  return (
    <form action={formAction}>
      <input
        type="text"
        className="form-control"
        placeholder="Title"
        required
        name="title"
      />
      <textarea
        placeholder="Body"
        className="form-control mt-2"
        required
        name="body"
      />
      <SubmitFormBtn/>
      <Publishbtn />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}
    </form>
  );
}

export default PostForm;
