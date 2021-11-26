// Add new comment 
$("#btnAddComment").click(async (event) => {
  event.preventDefault();
  const comment_text = $("#addComment").val().trim();
  const post_id = $(".add-comment").data("post_id");
  if (comment_text) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/posts/", {
      method: "POST",
      body: JSON.stringify({ post_id, comment_text }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      document.location.replace("/"); //Home Screen
    } else {
      alert(response.statusText);
    }
  } else {
    alert("400 Error with comment");
  }
});

//Delete button pressed
$(".card").on("click", "#delPost", async (event) => {
  event.preventDefault();
  const post_id = $(event.target).data("id");
  const response = await fetch(`/api/dash/${post_id}`, {
    method: "DELETE",
  });

  if (response.ok) {
    document.location.replace("/api/dash");
  } else {
    alert("Failed to delete project");
  }
});

//Update Post button pressed
$(".card").on("click", "#btnUpdate", async (event) => {
  event.preventDefault();
  const post_id = $(".add-comment").data("post_id");
  const title = $("#editTitle").val().trim();
  const comment_text = $("#editContent").val().trim();
  if (!title) {
    alert('Empty title is not allowed')
    return
  };
  const response = await fetch("/api/dash/", {
    method: "PUT",
    body: JSON.stringify({ post_id, title, comment_text }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/api/dash");
  } else {
    alert("Failed to update post");
  }
});
//Add New Post button pressed
$(".card").on("click", "#btnNew", async (event) => {
  event.preventDefault();
  const title = $("#editTitle").val().trim();
  const comment_text = $("#editContent").val().trim();
  if (!title) {
    alert('Empty title is not allowed')
    return
  };
  const response = await fetch("/api/dash/", {
    method: "POST",
    body: JSON.stringify({title, comment_text }),
    headers: { "Content-Type": "application/json" },
  });
  if (response.ok) {
    document.location.replace("/api/dash");
  } else {
    alert("Failed to add new post");
  }
});
