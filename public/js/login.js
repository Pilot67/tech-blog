$(".card-body").on("submit", async (event) => {
  event.preventDefault();

  // Collect values from the login form using jQuery
  const email = $("#loginEmail").val().trim();
  const password = $("#loginPassword").val().trim();

  if (email && password) {
    // Send a POST request to the API endpoint
    const response = await fetch("/api/users/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
    if (response.ok) {
      // If successful, redirect the browser to the profile page
      document.location.replace("/"); //DASHBOARD ROUTE HERE
    } else {
      alert(response.statusText);
    }
  } else {
      alert("You must enter an email and password to continue")
  }
});
