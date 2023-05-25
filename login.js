function login() {
    const nameEl = document.querySelector("#name");
    localStorage.setItem("userName", nameEl.value);
    //can store it here and display further in future
    // window.location.href = "play.html";
  }