document.addEventListener("DOMContentLoaded", function () {
  let showPassword = document.querySelector("#showPassword");
  showPassword.addEventListener("click", function () {
    var x = document.getElementById("txtPassword");
    if (x.type === "password") {
      x.type = "text";
      document.querySelector(".fa-eye").style.visibility = "visible";
      document.querySelector(".fa-eye-slash").style.visibility = "hidden";
    } else {
      x.type = "password";

      document.querySelector(".fa-eye-slash").style.visibility = "visible";
      document.querySelector(".fa-eye").style.visibility = "hidden";
    }
  });

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function ValidatePassword(input, errMessage) {
    if (input != null) {
      let value = input.value.trim();
      if (input.tagName.toLowerCase() === "input") {
        if (value === "") {
          setErrorFor(input.parentElement, errMessage);
          return false;
        } else if (value.length < 8) {
          setErrorFor(input.parentElement, "Minimum 8 characters.");
          return false;
        } else {
          setSuccessFor(input.parentElement);
          return true;
        }
      }
    }
  }

  function ValidateEmail(input, errMessage) {
    if (input != null) {
      let value = input.value.trim();
      if (input.tagName.toLowerCase() === "input")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setSuccessFor(input);
          return true;
        } else {
          setErrorFor(input, errMessage);
          return false;
        }
    }
  }

  let frm = document.querySelector(".frm");
  frm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let email = document.querySelector("#txtEmail");
    let password = document.querySelector("#txtPassword");

    let contentBtnSubmit = btnSubmit.innerHTML;

    let unvalide = 0;
    if (!ValidateEmail(email, "You have entered an invalid email address!"))
      unvalide++;
    if (!ValidatePassword(password, "Password cannot be null")) unvalide++;

    if (unvalide == 0) {
      btnSubmit.innerHTML = `<div class="loader"></div>`;
      let formData = new FormData();
      formData.append("email", email.value.trim());
      formData.append("password", password.value);

      let respone = await fetch("actions/login.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      let jsonData = await respone.json();

      if ((await jsonData.LoginStatus) == true) {
        window.location.replace("index.html");
      } else {
        if (jsonData.hasOwnProperty("isActivated")) {
          let formData = new FormData();
          formData.append("email", txtEmail.value.trim());

          let respone = await fetch("actions/forgot password.php", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(Object.fromEntries(formData)),
          });
          let jsonData = await respone.json();

          if (
            (await jsonData.message) ==
            "Please check your email for a message with your code. Your code is 6 numbers long."
          ) {
            sessionStorage.setItem("email", txtEmail.value.trim());
            sessionStorage.setItem("expire", jsonData.expire);
            console.log(jsonData.message);
            window.location.assign("enter otp.html");
          } else {
            alert(jsonData.message);
          }
        } else alert("Email or Password is invalid");
      }
      btnSubmit.innerHTML = contentBtnSubmit;
    }
  });
});
