if (
  sessionStorage.getItem("email") === null ||
  sessionStorage.getItem("expire") === null
)
  window.location.assign("forgot password.html");

document.addEventListener("DOMContentLoaded", function () {
  function setErrorFor(input, message) {
    const formControl = input.parentElement;
    const small = formControl.querySelector("small");
    formControl.className = "form-control error";
    small.innerText = message;
  }

  function checkInputs(input, errMessage) {
    if (input != null) {
      let value = input.value.trim();
      if (
        (input.tagName.toLowerCase() === "input" &&
          input.getAttribute("type").toLowerCase() === "text") ||
        (input.tagName.toLowerCase() === "input" &&
          input.getAttribute("type").toLowerCase() === "email") ||
        input.tagName.toLowerCase() === "select"
      ) {
        if (value === "") {
          setErrorFor(input, errMessage);
          return false;
        } else {
          return true;
        }
      }
    }
  }

  let btnSendNewOTP = document.querySelector("#sendNewOTP");
  let email = sessionStorage.getItem("email");
  let expire = sessionStorage.getItem("expire");
  let btnSubmit = document.querySelector("#btnSubmit");
  let contentBtnSubmit = btnSubmit.innerHTML;

  let txtCode = document.querySelector("#txtCode");
  txtCode.addEventListener("keypress", function (event) {
    const keyCode = event.keyCode;

    if (keyCode < 48 || keyCode > 57) {
      event.preventDefault();
    }
  });

  document.querySelector("#showEmail").textContent = email;

  if (expire - Math.floor(new Date().getTime() / 1000) > 0) {
    setInterval(function () {
      let timeOut = expire - Math.floor(new Date().getTime() / 1000);
      if (timeOut > 0) btnSendNewOTP.textContent = timeOut + "s";
      else {
        btnSendNewOTP.textContent = "Re-Send";
        return;
      }
      timeOut -= 1;
    }, 1000);

    let frm = document.querySelector(".frm");
    frm.addEventListener("submit", async function (e) {
      e.preventDefault();

      let unvalide = 0;
      if (!checkInputs(txtCode, "OTP cannot be null")) unvalide++;

      if (unvalide == 0) {
        btnSubmit.innerHTML = `<div class="loader"></div>`;
        let formData = new FormData();
        formData.append("email", email);
        formData.append("code", txtCode.value.trim());

        let respone = await fetch("actions/checkOtp.php", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(formData)),
        });
        let jsonData = await respone.json();

        if ((await jsonData.message) == "Success") {
          sessionStorage.setItem("code", txtCode.value.trim());
          window.location.assign("reset password.html");
        } else {
          alert(jsonData.message);
        }
        btnSubmit.innerHTML = contentBtnSubmit;
      }
    });
  } else {
    btnSendNewOTP.textContent = "Re-Send";
    alert("Code expired");
  }

  btnSendNewOTP.addEventListener("click", async function () {
    if (btnSendNewOTP.textContent !== "Re-Send") return;

    let formData = new FormData();
    formData.append("email", email);

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
      sessionStorage.setItem("email", email);
      sessionStorage.setItem("expire", jsonData.expire);
      console.log(jsonData.message);
      window.location.reload();
    } else {
      alert(jsonData.message);
    }
  });
});
