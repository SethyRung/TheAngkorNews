if (
  sessionStorage.getItem("email") === null ||
  sessionStorage.getItem("code") === null
)
  window.location.replace("forgot password.html");
else {
  let formData = new FormData();
  formData.append("email", sessionStorage.getItem("email"));
  formData.append("code", sessionStorage.getItem("code"));

  fetch("actions/checkResetPassword.php", {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(Object.fromEntries(formData)),
  })
    .then((respone) => {
      return respone.json();
    })
    .then((jsonData) => {
      if (jsonData.isResetAble == false) {
        window.location.replace("login.html");
      }
    })
    .catch((error) => {});
}

document.addEventListener("DOMContentLoaded", function () {
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
      if (
        input.tagName.toLowerCase() === "input" &&
        input.getAttribute("type").toLowerCase() === "password"
      ) {
        if (value === "") {
          setErrorFor(input, errMessage);
          return false;
        } else if (value.length < 8) {
          setErrorFor(input, "Minimum 8 characters.");
          return false;
        } else {
          setSuccessFor(input);
          return true;
        }
      }
    }
  }

  let txtPassword = document.querySelector("#txtPassword");
  let txtConfirmPassword = document.querySelector("#txtConfirmPassword");
  let email = sessionStorage.getItem("email");
  let code = sessionStorage.getItem("code");
  let btnSubmit = document.querySelector("#btnSubmit");
  let contentBtnSubmit = btnSubmit.innerHTML;

  let frm = document.querySelector(".frm");
  frm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let unvalide = 0;

    if (!ValidatePassword(txtPassword, "Password cannot be null")) unvalide++;
    if (
      !ValidatePassword(
        txtConfirmPassword,
        "Confirm new password cannot be null"
      )
    )
      unvalide++;
    else if (txtPassword.value != txtConfirmPassword.value) {
      unvalide++;
      setErrorFor(txtConfirmPassword, "Confirm Passwords do not match");
    } else {
      setSuccessFor(txtConfirmPassword);
    }

    if (unvalide == 0) {
      btnSubmit.innerHTML = `<div class="loader"></div>`;
      let formData = new FormData();
      formData.append("email", email);
      formData.append("password", txtPassword.value.trim());
      formData.append("code", code);

      let respone = await fetch("actions/resetPassword.php", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(Object.fromEntries(formData)),
      });
      let jsonData = await respone.json();

      if ((await jsonData.message) == "Your password has been reset.") {
        console.log(jsonData.message);
        window.location.replace("login.html");
      } else {
        alert(jsonData.message);
      }
      btnSubmit.innerHTML = contentBtnSubmit;
    }
  });
});
