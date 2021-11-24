$(".card-body").on("submit", async (event) => {
    event.preventDefault();
  
    // Collect values from the login form using jQuery
    const email = $("#signupEmail").val().trim();
    const password = $("#signupPassword").val().trim();
    const name = $("#signupName").val().trim();
  
    if (email && password && name) {
      // Send a POST request to the API endpoint
      const response = await fetch("/api/users/signup", {
        method: "PUT",
        body: JSON.stringify({ name, email, password }),
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