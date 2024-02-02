document.addEventListener("DOMContentLoaded", function () {
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function setSuccessFor(input) {
    const formControl = input.parentElement;
    formControl.className = "form-control success";
  }

  function ValidateEmail(input, errMessage) {
    if (input != null) {
      let value = input.value.trim();
      if (input.tagName.toLowerCase() === "input")
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)) {
          setSuccessFor(input, errMessage);
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

    let txtEmail = document.querySelector("#txtEmail");
    let btnSubmit = document.querySelector("#btnSubmit");
    let contentBtnSubmit = btnSubmit.innerHTML;

    let unvalide = 0;
    if (!ValidateEmail(txtEmail, "You have entered an invalid email address!"))
      unvalide++;

    if (unvalide == 0) {
      btnSubmit.innerHTML = `<div class="loader"></div>`;
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
          "Please check your email for a message with your code. Your code is 6 numbers long." ||
        (await jsonData.message) ==
          "We have sent a recovery code to your email."
      ) {
        sessionStorage.setItem("email", txtEmail.value.trim());
        sessionStorage.setItem("expire", jsonData.expire);
        console.log(jsonData.message);
        window.location.assign("enter otp.html");
      } else alert(jsonData.message);
      btnSubmit.innerHTML = contentBtnSubmit;
    }
  });
});
