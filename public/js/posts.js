$("button").click(async (event) => {
  event.preventDefault();
  console.log(event.target)
  const comment_text = $("#addComment").val().trim();
  const post_id = $(".add-comment").data('post_id');
  //console.log(comment_text, post_id);

 
  if (comment_text) {
    // Send a POST request to the API endpoint
     const response = await fetch("/api/posts/", {
       method: "POST",
       body: JSON.stringify({ post_id, comment_text }),
       headers: { "Content-Type": "application/json" },
     });
    console.log(response);
    if (response.ok) {
      // If successful, redirect the browser to the profile page
       document.location.replace("/"); //Home Screen
    } else {
      alert(response.statusText);
    }
  } else {
      alert("400 Error with comment")
  }

});
