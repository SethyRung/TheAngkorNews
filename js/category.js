import {
  navbar_toggler,
  loadNavBar,
  loadBanner,
  loadAds,
  btnSearch_click,
  relativeDate,
  absoluteDate,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", async function () {
  btnSearch_click();
  navbar_toggler();
  loadNavBar();
  loadBanner();
  loadAds("all");

  async function loadCategory(id, offset, count) {
    let res = await fetch(
      `actions/get_category.php?id=${id}&offset=${offset}&count=${count}`
    );
    let jsonData = await res.json();
    let newsList = await jsonData.news;

    let strNews = "";
    let strCategory = "";
    await newsList.forEach((news) => {
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

    if (!document.querySelector(".content")) {
      const category = document.querySelector(".category");
      strCategory += `
        <div class="head">
          <h2><img src="admin/images/${jsonData.img}" alt=""> ${jsonData.title}</h2>
        </div>
      <div class="body">
        ${strNews}
      </div>
      `;
      category.innerHTML = strCategory;
    } else {
      const body = document.querySelector(".body");
      body.innerHTML += strNews;
    }
    document.querySelector(".ads").style.height = `${
      document.querySelector(".body").offsetHeight
    }px`;
  }

  const lastNewsObserver = new IntersectionObserver(async (entries) => {
    const lastNews = entries[0];
    if (!lastNews.isIntersecting) return;
    if (offset < totalData) {
      if (totalData - offset < count) count = totalData - offset;
      await loadCategory(id, offset, count);
      offset += count;
      lastNewsObserver.unobserve(lastNews.target);
      lastNewsObserver.observe(document.querySelector(".content:last-child"));
    }
  });

  const id = Number(window.location.search.substring(1));
  var offset = 0;
  var count = 2;
  var totalData = 0;

  if (isNaN(id)) {
    alert(
      `ទំព័រដែលលោកអ្នកស្វែងរកមិនមាននៅក្នុងគេហទំយើងទេ\nសូមព្យាយាមចុចលើតំភ្ជាប់ដទៃ រឹស្វែងរកតាមរយះ ពាក្យគន្លឺះ!`
    );
  } else {
    let res = await fetch(`actions/totalCategoryData.php?id=${id}`);
    totalData = await res.json();
    if (totalData > 0) {
      if (totalData < count) {
        count = totalData;
        await loadCategory(id, offset, count);
      } else {
        await loadCategory(id, offset, count);
        offset += count;
        lastNewsObserver.observe(document.querySelector(".content:last-child"));
      }
    }
  }
});
