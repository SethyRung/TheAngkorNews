import {
  navbar_toggler,
  loadNavBar,
  loadBanner,
  loadAds,
  btnSearch_click,
  relativeDate,
  absoluteDate,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", function () {
  async function loadNew() {
    const hotNews = document.querySelector("#hot-news");
    const div = document.querySelector("#news");
    let listHotNews;
    let listCategory;

    let res = await fetch("actions/get_news.php");
    let json = await res.json();

    listHotNews = await json.HotNews;
    let strNews = "";
    await listHotNews.forEach((news) => {
      strNews += `<a href="article.html?newsID=${news.id}" class="content">
                    <img
                      src="admin/images/${news.img}"
                      alt="image"
                    />
                    <div class="info">
                      <h3 class="title">
                        ${news.title}
                      </h3>
                      <div class="post-date">
                        <i class="fa-regular fa-clock"></i>
                        <p><abbr title="${absoluteDate(
                          news.post_date
                        )}">${relativeDate(news.post_date)}</abbr></p>
                      </div>
                    </div>
                  </a>`;
    });

    hotNews.innerHTML = `<div class="head">
                            <h2><i class="fa-solid fa-fire"></i> ព័ត៌មានក្តៅៗ</h2>
                          </div>
                          <div class="body">
                            ${strNews}
                            <div class="ads"></div>
                          </div>`;

    listCategory = await json.News;
    let strCategory = "";
    await listCategory.forEach((category) => {
      let strNews = "";
      category.newsList.forEach((news) => {
        strNews += `<a href="article.html?newsID=${news.id}" class="content">
        <img
          src="admin/images/${news.img}"
          alt="Image"
        />
        <div class="info">
          <h3 class="title">
            ${news.title}
          </h3>
          <div class="post-date">
            <i class="fa-regular fa-clock"></i>
            <p><abbr title="${absoluteDate(news.post_date)}">${relativeDate(
          news.post_date
        )}</abbr></p>
          </div>
        </div>
      </a>`;
      });

      strCategory += `
      <div class="category">
        <div class="head">
          <h2><img src="admin/images/${category.img}" alt=""> ${category.title}</h2>
          <a href="category.html?${category.id}">ទាំងអស់</a>
        </div>
        <div class="body">
          ${strNews}
          <div class="ads"></div>
        </div>
      </div>
    `;
    });

    div.innerHTML += strCategory;
    loadAds();
  }

  btnSearch_click();
  navbar_toggler();
  loadNavBar();
  loadBanner();
  loadNew();
});
