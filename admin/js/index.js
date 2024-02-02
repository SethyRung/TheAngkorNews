fetch("actions/checkLogin.php")
  .then((respone) => {
    return respone.json();
  })
  .then((jsonData) => {
    if (jsonData.isLoggedin == false) {
      window.location.replace("login.html");
    }
  })
  .catch((error) => {});

document.addEventListener("DOMContentLoaded", function () {
  const body = document.querySelector("body");
  const btnLogout = document.querySelector("#btnLogout");
  const btnAdd = document.querySelector("#btnAdd");
  const sub_menu_item = document.querySelectorAll(".sub-menu-item");
  const sltLimit = document.querySelector("#sltLimit");
  const btnPrev = document.querySelector("#btnPrev");
  const btnNext = document.querySelector("#btnNext");
  const current_page = document.querySelector("#current-page");
  const total_page = document.querySelector("#total-page");
  const total = document.querySelector("#total");
  const popup = document.createElement("div");
  popup.classList.add("popup");
  popup.innerHTML =
    "<div class='loading'><i class='fa-solid fa-circle-notch fa-spin'></i>Loading</div>";
  const frmList = {
    "User List": ["frm user.php", "user"],
    "Menu List": ["frm menu.php", "menu"],
    "News List": ["frm news.php", "news"],
    "Ads List": ["frm ads.php", "ads"],
  };

  var offset = 0;
  var count;
  var totalRecord;
  var frmTitle;
  var canAdd = true;
  var canEdit = true;
  var canView = true;
  var canEditClass = "";

  btnLogout.addEventListener("click", async function () {
    let respone = await fetch("actions/logout.php");
    let data = await respone.json();
    if ((await data.message) === "Success")
      window.location.replace("login.html");
    else alert(await data.error);
  });

  function closePopup() {
    tinymce.remove();
    const btnClose = document.querySelector("#btnClose");
    btnClose.addEventListener("click", function () {
      body.removeChild(document.querySelector(".popup"));
    });
  }

  function uploadImage() {
    const input_file = document.querySelector("#filePhoto");
    input_file.addEventListener("change", async function () {
      let file = input_file.files[0];

      if (!["image/jpeg", "image/png", "image/svg+xml"].includes(file.type)) {
        // document.getElementById("uploaded_image").innerHTML =
        //   '<div class="alert alert-danger">Only .jpg and .png image are allowed</div>';

        // document.getElementsByName("sample_image")[0].value = "";
        alert("Only .jpg and .png image are allowed");
        return;
      }

      if (file.size > 2 * 1024 * 1024) {
        alert("File must be less than 2 MB");
        return;
      }

      const form_data = new FormData();
      form_data.append("image", file);

      let response = await fetch("actions/upload_image.php", {
        method: "POST",
        body: form_data,
      });

      let image = await response.json();
      document.querySelector(".photo-box").style.backgroundImage =
        "url('" + (await image.Path) + "')";
    });
  }

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
          setSuccessFor(input);
          return true;
        }
      }
    }
  }

  function checkImage(image_name, errMessage, input) {
    if (input != null) {
      if (
        image_name.trim() === "" ||
        image_name.trim() === "folder-open-regular.svg"
      ) {
        setErrorFor(input, errMessage);
        return false;
      } else {
        return true;
      }
    }
  }

  async function loadMenu(selectTarget) {
    let length = 0;
    let response = await fetch("actions/get_menu.php");
    let json = await response.json();
    if (json != null) {
      json.forEach((data) => {
        let option = document.createElement("option");
        option.value = data.id;
        option.textContent = data.title;
        selectTarget.appendChild(option);
        length++;
      });
    }
  }

  function modifyUser(action) {
    const frm = document.querySelector(".frm");
    frm.addEventListener("submit", async function (e) {
      e.preventDefault();

      function getPermission(checkboxs) {
        let permission = "";
        checkboxs.forEach((c) => {
          if (c.checked == true) permission += c.value;
        });
        return permission;
      }

      //validate the form
      let id = document.getElementById("txtID");
      let username = document.getElementById("txtUserName");
      let email = document.getElementById("txtEmail");
      let userType = document.getElementById("sltUserType");

      let unvalide = 0;
      if (checkInputs(id, "ID cannot be blank") == false) unvalide++;
      if (checkInputs(username, "Username cannot be blank") == false)
        unvalide++;
      if (checkInputs(email, "Email cannot be blank") == false) unvalide++;

      if (unvalide == 0) {
        let frmData = new FormData();
        frmData.append("id", id.value);
        frmData.append("username", username.value);
        frmData.append("email", email.value);
        frmData.append("password", "angkornews");
        frmData.append("userType", userType.value);
        frmData.append(
          "perUser",
          getPermission(document.querySelectorAll(".ckbUser"))
        );
        frmData.append(
          "perMenu",
          getPermission(document.querySelectorAll(".ckbMenu"))
        );
        frmData.append(
          "perNews",
          getPermission(document.querySelectorAll(".ckbNews"))
        );
        frmData.append(
          "perAds",
          getPermission(document.querySelectorAll(".ckbAds"))
        );
        frmData.append("action", action);

        let response = await fetch("actions/modify_user.php?", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(frmData)),
        });

        let jsonData = await response.json();
        if (await jsonData.hasOwnProperty("Successful")) {
          getTotalRecord();
        } else if (await jsonData.hasOwnProperty("Unsuccessful")) {
          alert(jsonData.Unsuccessful);
        } else if (await jsonData.hasOwnProperty("error")) {
          alert(jsonData.error);
        }
        btnClose.click();
      }
    });
  }
  function modifyMenu(action) {
    const frm = document.querySelector(".frm");
    frm.addEventListener("submit", async function (e) {
      e.preventDefault();

      //validate the form
      let id = document.getElementById("txtID");
      let title = document.getElementById("txtTitle");
      let od = document.getElementById("txtOD");
      let photo_box = document.querySelector(".photo-box");
      let str = photo_box.style.backgroundImage;
      let image_name = str.substring(12, str.length - 2);

      let unvalide = 0;
      if (checkInputs(id, "ID cannot be blank") == false) unvalide++;
      if (checkInputs(title, "Title cannot be blank") == false) unvalide++;
      if (checkInputs(od, "Order Number cannot be blank") == false) unvalide++;
      if (checkImage(image_name, "Photo cannot be blank", photo_box) == false)
        unvalide++;

      if (unvalide == 0) {
        let frmData = new FormData(frm);
        frmData.delete("filePhoto");
        frmData.append("image", image_name);
        frmData.append("action", action);

        let response = await fetch("actions/modify_menu.php?", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(frmData)),
        });

        let jsonData = await response.json();
        if (await jsonData.hasOwnProperty("Successful")) {
          getTotalRecord();
        } else if (await jsonData.hasOwnProperty("Unsuccessful")) {
          alert(jsonData.Unsuccessful);
        } else if (await jsonData.hasOwnProperty("error")) {
          alert(jsonData.error);
        }
        btnClose.click();
      }
    });
  }

  function modifyNews(action) {
    const frm = document.querySelector(".frm");
    frm.addEventListener("submit", async function (e) {
      e.preventDefault();

      //validate the form
      let id = document.getElementById("txtID");
      let menu = document.getElementById("sltMenu");
      let title = document.getElementById("txtTitle");
      let od = document.getElementById("txtOD");
      let status = document.getElementById("sltStatus");
      let description = tinymce.get("txtDescription").getContent();
      let photo_box = document.querySelector(".photo-box");
      let str = photo_box.style.backgroundImage;
      let image_name = str.substring(12, str.length - 2);

      let unvalide = 0;
      if (checkInputs(id, "ID cannot be blank") == false) unvalide++;
      if (checkInputs(menu, "Please select a menu") == false) unvalide++;
      if (checkInputs(title, "Title cannot be blank") == false) unvalide++;
      if (checkInputs(od, "Order Number cannot be blank") == false) unvalide++;
      if (checkInputs(status, "Please select a status") == false) unvalide++;
      if (checkImage(image_name, "Photo cannot be blank", photo_box) == false)
        unvalide++;
      if (description === "") {
        tinymce.activeEditor.notificationManager.open({
          text: "Description cannot be blank",
          type: "error",
        });
        unvalide++;
      } else {
        tinymce.activeEditor.notificationManager.close({
          text: "Description cannot be blank",
          type: "error",
        });
      }

      if (unvalide == 0) {
        // tinyMCE.triggerSave();
        let frmData = new FormData(frm);
        frmData.delete("filePhoto");
        frmData.append("image", image_name);
        frmData.append("action", action);

        let response = await fetch("actions/modify_news.php", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(frmData)),
        });

        let jsonData = await response.json();
        if (await jsonData.hasOwnProperty("Successful")) {
          getTotalRecord();
        } else if (await jsonData.hasOwnProperty("Unsuccessful")) {
          alert(jsonData.Unsuccessful);
        } else if (await jsonData.hasOwnProperty("error")) {
          alert(jsonData.error);
        }
        btnClose.click();
      }
    });
  }

  function modifyAds(action) {
    const frm = document.querySelector(".frm");
    frm.addEventListener("submit", async function (e) {
      e.preventDefault();

      //validate the form
      let id = document.getElementById("txtID");
      let ads = tinymce.get("txtAds").getContent();
      let link = document.getElementById("txtLink");
      let location = document.getElementById("sltLocation");
      let od = document.getElementById("txtOD");
      let status = document.getElementById("sltStatus");

      let unvalide = 0;
      if (checkInputs(id, "ID cannot be blank") == false) unvalide++;
      if (checkInputs(location, "Please select a location") == false)
        unvalide++;
      if (checkInputs(link, "Link cannot be blank") == false) unvalide++;
      if (checkInputs(od, "Order Number cannot be blank") == false) unvalide++;
      if (checkInputs(status, "Please select a status") == false) unvalide++;
      if (ads === "") {
        tinymce.activeEditor.notificationManager.open({
          text: "Ads cannot be blank",
          type: "error",
        });
        unvalide++;
      } else {
        tinymce.activeEditor.notificationManager.close({
          text: "Ads cannot be blank",
          type: "error",
        });
      }

      if (unvalide == 0) {
        let frmData = new FormData(frm);
        frmData.append("action", action);

        let response = await fetch("actions/modify_ads.php", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(Object.fromEntries(frmData)),
        });

        let jsonData = await response.json();
        if (await jsonData.hasOwnProperty("Successful")) {
          getTotalRecord();
        } else if (await jsonData.hasOwnProperty("Unsuccessful")) {
          alert(jsonData.Unsuccessful);
        } else if (await jsonData.hasOwnProperty("error")) {
          alert(jsonData.error);
        }
        btnClose.click();
      }
    });
  }

  async function EditData() {
    document.querySelectorAll("td button").forEach((btnEdit) => {
      btnEdit.addEventListener("click", async function () {
        if (!canEdit) return;
        let tr = this.parentElement.parentElement;

        body.appendChild(popup);
        try {
          //get form and take in popup
          let popup = document.querySelector(".popup");
          let response = await fetch("form/" + frmList[frmTitle][0]);
          let html = await response.text();

          //check the success or not
          if (html.includes("<title>404 Not Found</title>")) {
            throw "404 Not Found";
          } else {
            popup.innerHTML = html;

            closePopup();

            if (frmList[frmTitle][1] == "menu") {
              uploadImage();
              let data = {
                id: tr.children[0].innerText,
                title: tr.children[1].innerText,
                image: tr.children[2].children[0].getAttribute("src"),
                od: tr.children[3].innerText,
                status: tr.children[4].innerText,
              };

              document.getElementById("txtID").value = data.id;
              document.getElementById("txtTitle").value = data.title;
              document.getElementById("txtOD").value = data.od;
              if (data.image === "images/") {
                document.querySelector(
                  ".photo-box"
                ).style.backgroundImage = `url("images/folder-open-regular.svg")`;
              } else {
                document.querySelector(
                  ".photo-box"
                ).style.backgroundImage = `url("${data.image}")`;
              }
              document.querySelector("#sltStatus").value = data.status;

              modifyMenu("update");
            } else if (frmList[frmTitle][1] == "news") {
              uploadImage();
              await loadMenu(document.getElementById("sltMenu"));

              let data = {
                id: tr.children[0].innerText,
                title: tr.children[1].innerText,
                menu_id: tr.children[2].innerText,
                image: tr.children[4].children[0].getAttribute("src"),
                od: tr.children[5].innerText,
                status: tr.children[7].innerText,
              };

              document.getElementById("txtID").value = data.id;
              document.getElementById("txtTitle").value = data.title;
              let sltMenu = document.getElementById("sltMenu");

              for (let i = 0; i < sltMenu.options.length; i++) {
                if (sltMenu.options[i].value === data.menu_id) {
                  sltMenu.options[i].setAttribute("selected", "selected");
                  break;
                }
              }

              document.getElementById("txtOD").value = data.od;
              if (data.image === "images/") {
                document.querySelector(
                  ".photo-box"
                ).style.backgroundImage = `url("images/folder-open-regular.svg")`;
              } else {
                document.querySelector(
                  ".photo-box"
                ).style.backgroundImage = `url("${data.image}")`;
              }

              document.querySelector("#sltStatus").value = data.status;

              let response = await fetch(
                `actions/get_news_description.php?id=${data.id}`
              );
              let json = await response.json();
              let description = await json.des;
              //tinymce.get("txtDescription").setContent("<p>Test</p>");
              document.querySelector("#txtDescription").innerHTML =
                await description;
              callTextEditor("#txtDescription");
              modifyNews("update");
            } else if (frmList[frmTitle][1] == "ads") {
              let data = {
                id: tr.children[0].innerText,
                ads: tr.children[1].innerHTML,
                link: tr.children[2].innerText,
                location: tr.children[3].innerText,
                od: tr.children[4].innerText,
                status: tr.children[5].innerText,
              };

              document.getElementById("txtID").value = data.id;

              document.querySelector("#txtAds").innerHTML = data.ads;

              document.getElementById("txtLink").value = data.link;

              let sltLocation = document.getElementById("sltLocation");

              for (let i = 0; i < sltLocation.options.length; i++) {
                if (sltLocation.options[i].value === data.location) {
                  sltLocation.options[i].setAttribute("selected", "selected");
                  break;
                }
              }

              document.getElementById("txtOD").value = data.od;

              document.querySelector("#sltStatus").value = data.status;

              callTextEditor("#txtAds");
              modifyAds("update");
            } else if (frmList[frmTitle][1] == "user") {
              let data = {
                id: tr.children[0].innerText,
                username: tr.children[1].innerText,
                email: tr.children[2].innerText,
                userType: tr.children[3].innerText,
                perUser: tr.children[4].innerText,
                perMenu: tr.children[5].innerText,
                perNews: tr.children[6].innerText,
                perAds: tr.children[7].innerText,
              };

              document.getElementById("txtID").value = data.id;

              document.getElementById("txtUserName").value = data.username;

              document.getElementById("txtEmail").value = data.email;

              let sltUserType = document.getElementById("sltUserType");

              for (let i = 0; i < sltUserType.options.length; i++) {
                if (sltUserType.options[i].value === data.userType) {
                  sltUserType.options[i].setAttribute("selected", "selected");
                  break;
                }
              }

              function StringToPermission(str) {
                let permission = "";
                let arr = str.split("|");

                for (let i = 0; i < arr.length; i++) {
                  if (arr[i] === "Add") permission += "a";
                  else if (arr[i] === "Edit") permission += "e";
                  else if (arr[i] === "View") permission += "v";
                }
                return permission;
              }

              function loadPermission(checkboxs, permission) {
                checkboxs.forEach((c) => {
                  if (c.value == "v") c.checked = false;
                  if (permission.includes("a") && c.value == "a")
                    c.checked = true;
                  else if (permission.includes("e") && c.value == "e")
                    c.checked = true;
                  else if (permission.includes("v") && c.value == "v")
                    c.checked = true;
                });

                return permission;
              }

              loadPermission(
                document.querySelectorAll(".ckbUser"),
                StringToPermission(data.perUser)
              );
              loadPermission(
                document.querySelectorAll(".ckbMenu"),
                StringToPermission(data.perMenu)
              );
              loadPermission(
                document.querySelectorAll(".ckbNews"),
                StringToPermission(data.perNews)
              );
              loadPermission(
                document.querySelectorAll(".ckbAds"),
                StringToPermission(data.perAds)
              );

              let userType = document.querySelector("#sltUserType");
              userType.addEventListener("change", () => {
                let checkboxs = document.querySelectorAll(
                  "input[type='checkbox']"
                );
                if (userType.value === "Admin") {
                  checkboxs.forEach((c) => {
                    c.checked = true;
                  });
                } else {
                  checkboxs.forEach((c) => {
                    if (c.value === "v") c.checked = true;
                    else c.checked = false;
                  });
                }
              });
              modifyUser("update");
            }
          }
        } catch (err) {
          body.removeChild(document.querySelector(".popup"));
          alert("Error " + err);
        }
      });
    });
  }

  async function checkPermission() {
    let respone = await fetch(
      `actions/checkPermission.php?table_name=${frmList[frmTitle][1]}`
    );
    let data = await respone.json();
    let per = await data.permission;
    if (!per.includes("a")) {
      canAdd = false;
      document.querySelector("#btnAdd").classList.add("disabled");
    } else {
      canAdd = true;
      document.querySelector("#btnAdd").classList.remove("disabled");
    }

    if (!per.includes("e")) {
      canEdit = false;
      canEditClass = `class="disabled"`;
    } else {
      canEdit = true;
      canEditClass = "";
    }

    if (!per.includes("v")) {
      canView = false;
    } else {
      canView = true;
    }
  }

  async function getTotalRecord() {
    let response = await fetch(
      `actions/get_total_record.php?from=${frmList[frmTitle][1]}`
    );

    let json = await response.json();
    totalRecord = parseInt(await json.totalRecord);
    total.textContent = totalRecord;
    current_page.textContent = 1;
    let t = Math.ceil(totalRecord / parseInt(sltLimit.value));
    t == 0 ? (total_page.textContent = 1) : (total_page.textContent = t);
    offset = 0;
    if (totalRecord < parseInt(sltLimit.value)) {
      count = totalRecord;
    } else {
      count = parseInt(sltLimit.value);
    }

    await checkPermission();

    LoadData(frmList[frmTitle][1], offset, count);
  }

  async function LoadData(from, offset, count) {
    let param = new URLSearchParams({
      from: from,
      offset: offset,
      count: count,
    });
    let response = await fetch(
      `actions/get_table_data.php?${param.toString()}`
    );
    let data = await response.json();
    addDataToTable(from, await data);
  }

  async function addDataToTable(table_name, jsonData) {
    const table = document.getElementById("tbl-data");
    let table_data;

    if (table_name === "menu") {
      table_data = `
      <tr>
          <th>ID</th>
          <th>Title</th>
          <th>Image</th>
          <th>Order Number</th>
          <th>Status</th>
          <th>Action</th>
      </tr>
    `;
      if (canEdit || canView)
        if (jsonData != null) {
          jsonData.forEach((element) => {
            table_data += `
              <tr>
                <td>${element.id}</td>
                <td>${element.title}</td>
                <td><img src="images/${element.img}"></td>
                <td>${element.od}</td>
                <td>${element.status}</td>
                <td><button ${canEditClass}><i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
              </tr>
            `;
          });
        }
    } else if (table_name === "news") {
      table_data = `
        <tr>
            <th>ID</th>
            <th>Title</th>
            <th style="display: none;">Menu ID</th>
            <th>Menu</th>
            <th>Image</th>
            <th>Order Number</th>
            <th>Click</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
      `;
      if (canEdit || canView)
        if (jsonData != null) {
          jsonData.forEach((element) => {
            table_data += `
            <tr>
              <td>${element.id}</td>
              <td>${element.title}</td>
              <td style="display: none;">${element.menu_id}</td>
              <td>${element.menu}</td>
              <td><img src="images/${element.img}"></td>
              <td>${element.od}</td>
              <td>${element.click}</td>
              <td>${element.status}</td>
              <td><button ${canEditClass}><i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
            </tr>
          `;
          });
        }
    } else if (table_name === "ads") {
      table_data = `
        <tr>
            <th>ID</th>
            <th>Ads</th>
            <th>Link</th>
            <th>Location</th>
            <th>Order Number</th>
            <th>Status</th>
            <th>Action</th>
        </tr>
      `;
      if (canEdit || canView)
        if (jsonData != null) {
          jsonData.forEach((element) => {
            table_data += `
            <tr>
              <td>${element.id}</td>
              <td style="max-width: 350px;">${element.ads}</td>
              <td>${element.link}</td>
              <td>${element.location}</td>
              <td>${element.od}</td>
              <td>${element.status}</td>
              <td><button ${canEditClass}><i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
            </tr>
          `;
          });
        }
    } else if (table_name === "user") {
      table_data = `
        <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Email</th>
            <th>User Type</th>
            <th>Permission User</th>
            <th>Permission Menu</th>
            <th>Permission News</th>
            <th>Permission Ads</th>
            <th>Activated</th>
            <th>Action</th>
        </tr>
      `;
      if (canEdit || canView)
        if (jsonData != null) {
          jsonData.forEach((element) => {
            function PermissionToString(permission) {
              let str = "";
              permission.includes("a") ? (str += "Add|") : (str += "");
              permission.includes("e") ? (str += "Edit|") : (str += "");
              permission.includes("v")
                ? (str += "View")
                : (str = str.substring(0, str.length - 1));
              return str;
            }

            table_data += `
            <tr>
              <td>${element.id}</td>
              <td>${element.username}</td>
              <td>${element.email}</td>
              <td>${element.userType}</td>
              <td>${PermissionToString(element.perUser)}</td>
              <td>${PermissionToString(element.perMenu)}</td>
              <td>${PermissionToString(element.perNews)}</td>
              <td>${PermissionToString(element.perAds)}</td>
              <td>${element.isActivated}</td>
              <td><button ${canEditClass}><i class="fa-regular fa-pen-to-square"></i> Edit</button></td>
            </tr>
          `;
          });
        }
    }
    table.innerHTML = table_data;
    EditData();
  }

  const btnSearch = document.querySelector("#btnSearch");
  const searchBy = document.querySelector("#sltSearch");
  const txtSearch = document.querySelector("#txtSearch");
  var searchData = "";
  btnSearch.addEventListener("click", async () => {
    searchData = txtSearch.value;
    if (searchData == "") return;

    let param = new URLSearchParams({
      table: frmList[frmTitle][1],
      by: searchBy.value,
      searchData: searchData,
      offset: offset,
      count: count,
    });

    let response = await fetch(`actions/search.php?${param.toString()}`);

    let data = await response.json();

    if (data[1] == 0) {
      //alert("No data to match.");
      totalRecord = 0;
      total.textContent = totalRecord;
      current_page.textContent = 1;
      let t = Math.ceil(totalRecord / parseInt(sltLimit.value));
      t == 0 ? (total_page.textContent = 1) : (total_page.textContent = t);
      addDataToTable(frmList[frmTitle][1], null);
    } else {
      totalRecord = parseInt(await data[1]);
      total.textContent = totalRecord;
      current_page.textContent = 1;
      total_page.textContent = Math.ceil(
        totalRecord / parseInt(sltLimit.value)
      );
      offset = 0;
      if (totalRecord < parseInt(sltLimit.value)) {
        count = totalRecord;
      } else {
        count = parseInt(sltLimit.value);
      }

      addDataToTable(frmList[frmTitle][1], await data[0]);
    }
  });

  searchBy.addEventListener("change", () => {
    btnSearch.click();
  });

  txtSearch.addEventListener("focusout", () => {
    if (txtSearch.value == "") {
      searchData = "";
      getTotalRecord();
    }
  });

  sltLimit.addEventListener("change", async function () {
    offset = 0;
    current_page.textContent = 1;
    if (searchData === "") {
      total_page.textContent = Math.ceil(
        totalRecord / parseInt(sltLimit.value)
      );
      if (totalRecord < parseInt(sltLimit.value)) {
        count = totalRecord;
      } else {
        count = parseInt(sltLimit.value);
      }
      LoadData(frmList[frmTitle][1], offset, count);
    } else {
      let param = new URLSearchParams({
        table: frmList[frmTitle][1],
        by: searchBy.value,
        searchData: searchData,
        offset: offset,
        count: parseInt(sltLimit.value),
      });

      let response = await fetch(`actions/search.php?${param.toString()}`);

      let data = await response.json();

      totalRecord = parseInt(await data[1]);
      total.textContent = totalRecord;

      total_page.textContent = Math.ceil(
        totalRecord / parseInt(sltLimit.value)
      );

      if (totalRecord < parseInt(sltLimit.value)) {
        count = totalRecord;
      } else {
        count = parseInt(sltLimit.value);
      }

      addDataToTable(frmList[frmTitle][1], await data[0]);
    }
  });

  btnPrev.addEventListener("click", async function () {
    if (current_page.textContent != "1") {
      offset -= count;
      current_page.textContent = parseInt(current_page.textContent) - 1;
      if (searchData === "") {
        LoadData(frmList[frmTitle][1], offset, count);
      } else {
        let param = new URLSearchParams({
          table: frmList[frmTitle][1],
          by: searchBy.value,
          searchData: searchData,
          offset: offset,
          count: count,
        });

        let response = await fetch(`actions/search.php?${param.toString()}`);

        let data = await response.json();

        addDataToTable(frmList[frmTitle][1], await data[0]);
      }
    }
  });

  btnNext.addEventListener("click", async function () {
    if (current_page.textContent != total_page.textContent) {
      offset += count;
      current_page.textContent = parseInt(current_page.textContent) + 1;
      if (searchData === "") {
        LoadData(frmList[frmTitle][1], offset, count);
      } else {
        let param = new URLSearchParams({
          table: frmList[frmTitle][1],
          by: searchBy.value,
          searchData: searchData,
          offset: offset,
          count: count,
        });

        let response = await fetch(`actions/search.php?${param.toString()}`);

        let data = await response.json();

        addDataToTable(frmList[frmTitle][1], await data[0]);
      }
    }
  });

  sub_menu_item.forEach((element) => {
    element.addEventListener("click", function () {
      document.querySelector(".detail-box").style.display = "block";

      document.getElementById("title").textContent = element.textContent;
      frmTitle = element.textContent;

      if (frmTitle === "User List") {
        let option = document.createElement("option");
        option.value = "username";
        option.textContent = "UserName";
        searchBy.removeChild(searchBy.children[1]);
        searchBy.appendChild(option);
      } else if (frmTitle === "Ads List") {
        let option = document.createElement("option");
        option.value = "link";
        option.textContent = "Link";
        searchBy.removeChild(searchBy.children[1]);
        searchBy.appendChild(option);
      } else {
        let option = document.createElement("option");
        option.value = "title";
        option.textContent = "Title";
        searchBy.removeChild(searchBy.children[1]);
        searchBy.appendChild(option);
      }

      function unloadPermission() {
        document.querySelector("#btnAdd").disabled = false;
        getTotalRecord();
        document.querySelectorAll("td button").forEach((btnEdit) => {
          btnEdit.disabled = false;
        });
      }

      getTotalRecord();
      // if (frmTitle === "User List") loadPermission(permission.perUser);
      // else if (frmTitle === "Menu List") loadPermission(permission.perMenu);
      // else if (frmTitle === "News List") loadPermission(permission.perNews);
      // else if (frmTitle === "Ads List") loadPermission(permission.perAds);
    });
  });

  btnAdd.addEventListener("click", async function () {
    if (!canAdd) return;
    body.appendChild(popup);
    try {
      //get form and take in popup
      let popup = document.querySelector(".popup");
      let response = await fetch("form/" + frmList[frmTitle][0]);
      let html = await response.text();

      //check the success or not
      if (html.includes("<title>404 Not Found</title>")) {
        throw "404 Not Found";
      } else {
        popup.innerHTML = html;

        //get dynamic id and take it to txtID
        let param = new URLSearchParams({
          from: frmList[frmTitle][1],
        });
        let response = await fetch("actions/get_id.php?" + param.toString());
        let data = await response.json();
        document.querySelector("#txtID").value = await data.id;

        //close form and popup
        closePopup();

        //submit data
        if (frmList[frmTitle][1] == "menu") {
          document.querySelector("#txtOD").value = await data.id;
          modifyMenu("insert");
          uploadImage();
        } else if (frmList[frmTitle][1] == "news") {
          document.querySelector("#txtOD").value = await data.id;
          loadMenu(document.getElementById("sltMenu"));
          uploadImage();
          callTextEditor("#txtDescription");
          modifyNews("insert");
        } else if (frmList[frmTitle][1] == "ads") {
          document.querySelector("#txtOD").value = await data.id;
          callTextEditor("#txtAds");
          modifyAds("insert");
        } else if (frmList[frmTitle][1] == "user") {
          let userType = document.querySelector("#sltUserType");
          userType.addEventListener("change", () => {
            let checkboxs = document.querySelectorAll("input[type='checkbox']");
            if (userType.value === "Admin") {
              checkboxs.forEach((c) => {
                c.checked = true;
              });
            } else {
              checkboxs.forEach((c) => {
                if (c.value === "v") c.checked = true;
                else c.checked = false;
              });
            }
          });
          modifyUser("insert");
        }
      }
    } catch (err) {
      body.removeChild(document.querySelector(".popup"));
      alert("Error " + err);
    }
  });

  async function callTextEditor(textAreaID) {
    tinymce.remove();
    if (!textAreaID.includes("#")) {
      textAreaID = "#" + textAreaID;
    }
    if (textAreaID === "#txtDescription") {
      tinymce.init({
        selector: textAreaID,
        // width: 1000,
        // height: 300,
        plugins: [
          "advlist",
          "autolink",
          "link",
          "image",
          "lists",
          "charmap",
          // "prewiew",
          "anchor",
          "pagebreak",
          "searchreplace",
          "wordcount",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "emoticons",
          // "template",
          "codesample",
        ],
        toolbar:
          "undo redo | styles | bold italic underline | alignleft aligncenter alignright alignjustify |" +
          "bullist numlist outdent indent | link image media | print fullscreen | " +
          "forecolor backcolor emoticons",
        menu: {
          favs: {
            title: "menu",
            items: "code visualaid | searchreplace | emoticons",
          },
        },
        menubar: "file edit view insert format tools table",
        content_style:
          "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",

        /* we override default upload handler to simulate successful upload*/
        images_upload_handler: async function (blobInfo) {
          if (!["image/jpeg", "image/png"].includes(blobInfo.blob().type)) {
            alert("Only .jpg and .png image are allowed");
            return;
          }

          if (blobInfo.blob().size > 2 * 1024 * 1024) {
            alert("File must be less than 2 MB");
            return;
          }

          const formData = new FormData();
          formData.append("image", blobInfo.blob());

          let response = await fetch("actions/upload_image.php", {
            method: "POST",
            body: formData,
          });

          let image = await response.json();
          return await image.Path;
        },
        // setup: function (editor) {
        //   editor.on("submit", function (e) {
        //     // console.log(tinymce.get("txtDesciption").getContent());
        //     // tinymce.activeEditor.notificationManager.open({
        //     //   text: "This is an error... notification.",
        //     //   type: "error",
        //     // });
        //   });
        // },
      });
    } else if (textAreaID === "#txtAds") {
      tinymce.init({
        selector: textAreaID,
        plugins: ["image", "code", "fullscreen", "media"],
        toolbar: "undo redo | image media | code fullscreen | ",

        menubar: "",
        content_style:
          "body{font-family:Helvetica,Arial,sans-serif; font-size:16px}",
        image_advtab: true,
        file_picker_types: "media",

        images_upload_handler: async function (blobInfo) {
          // if (!["image/jpeg", "image/png"].includes(blobInfo.blob().type)) {
          //   alert("Only .jpg and .png image are allowed");
          //   return;
          // }

          if (blobInfo.blob().size > 2 * 1024 * 1024) {
            alert("File must be less than 2 MB");
            return;
          }

          const formData = new FormData();
          formData.append("image", blobInfo.blob());

          let response = await fetch("actions/upload_image.php", {
            method: "POST",
            body: formData,
          });

          let image = await response.json();
          return await image.Path;
        },
        file_picker_callback: function (cb, value, meta) {
          var input = document.createElement("input");
          input.setAttribute("type", "file");
          input.setAttribute("accept", "video/*");

          input.onchange = async function () {
            var file = this.files[0];

            cb(await uploadVideo(file));
          };

          input.click();
        },
      });
    }
  }

  async function uploadVideo(file) {
    let BYTES_PER_CHUNK = parseInt(1024 * 1024 * 0.5, 10),
      SIZE = file.size,
      NUM_CHUNKS = Math.max(Math.ceil(SIZE / BYTES_PER_CHUNK), 1),
      start = 0,
      end = BYTES_PER_CHUNK,
      num = 1;

    while (start < SIZE) {
      let blob = file.slice(start, end);
      let fd = new FormData();
      fd.append("upload", blob, file.name);
      fd.append("num", num);
      fd.append("num_chunks", NUM_CHUNKS);
      fd.append("bytes_per_chunk", BYTES_PER_CHUNK);
      let response = await fetch("actions/upload_video.php", {
        method: "POST",
        body: fd,
      });
      if (end >= SIZE) {
        let jsonData = await response.json();
        if (await jsonData.hasOwnProperty("Path")) {
          return await jsonData.Path;
        } else if (await jsonData.hasOwnProperty("error")) {
          alert(jsonData.error);
        }
      }
      start = end;
      end = start + BYTES_PER_CHUNK;
      num++;
    }
  }
});
