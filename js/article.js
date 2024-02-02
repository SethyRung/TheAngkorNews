import {
  navbar_toggler,
  loadNavBar,
  loadBanner,
  loadAds,
  btnSearch_click,
  absoluteDate,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", async function () {
  btnSearch_click();
  navbar_toggler();
  loadNavBar();
  loadBanner();
  loadAds("all");

  const query = window.location.search;
  const params = new URLSearchParams(query);
  const param = params.get("newsID");

  let newsID = Number(param);

  if (isNaN(newsID)) {
    alert(
      `ទំព័រដែលលោកអ្នកស្វែងរកមិនមាននៅក្នុងគេហទំយើងទេ\nសូមព្យាយាមចុចលើតំភ្ជាប់ដទៃ រឹស្វែងរកតាមរយះ ពាក្យគន្លឺះ!`
    );
  } else {
    const news = document.querySelector("#news");
    let res = await fetch(`actions/get_news_detail.php?id=${newsID}`);
    let newsList = await res.json();
    news.innerHTML = `<div class="content">
                        <div class="info">
                          <h2 class="title">${newsList.title}</h2>
                          <div class="post-date">
                              <i class="fa-regular fa-clock"></i>
                              <p>${absoluteDate(newsList.post_date)}</p>
                          </div>
                          <img
                            src="admin/images/${newsList.img}"
                            alt="image"
                          />
                        </div>
                        <div class="description">${newsList.des}</div>
                      </div>`;
    document.querySelector(".ads").style.height = `${news.offsetHeight}px`;
  }
});
