import {
  navbar_toggler,
  loadNavBar,
  loadBanner,
  loadAds,
  relativeDate,
  absoluteDate,
} from "./utils.js";

document.addEventListener("DOMContentLoaded", async function () {
  const btn_search = document.querySelector("#btn-search");
  const txtSearch = document.querySelector("#txtSearch");
  btn_search.addEventListener("click", () => {
    if (txtSearch.value !== "") {
      window.location.search = txtSearch.value;
    }
  });

  navbar_toggler();

  loadNavBar();
  loadBanner();
  loadAds();

  async function searchNews(searchData, offset, count) {
    const search_resault = document.querySelector("#search-resault");
    let res = await fetch(
      `actions/search.php?searchData=${searchData}&offset=${offset}&count=${count}`
    );
    let newsList = await res.json();
    let str = "";
    await newsList.forEach((news) => {
      str += `<a href="article.html?newsID=${news.id}" class="content">
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
    search_resault.innerHTML += str;
  }

  const lastNewsObserver = new IntersectionObserver(async (entries) => {
    const lastNews = entries[0];
    if (!lastNews.isIntersecting) return;
    if (offset < totalData) {
      if (totalData - offset < count) count = totalData - offset;
      await searchNews(search, offset, count);
      offset += count;
      lastNewsObserver.unobserve(lastNews.target);
      lastNewsObserver.observe(document.querySelector(".content:last-child"));
    }
  });

  const search = window.location.search.substring(1);
  var offset = 0;
  var count = 12;
  var totalData = 0;
  if (search !== "") {
    let res = await fetch(`actions/totalSearchData.php?searchData=${search}`);
    totalData = await res.json();
    if (totalData > 0) {
      if (totalData < count) {
        count = totalData;
        await searchNews(search, offset, count);
      } else {
        await searchNews(search, offset, count);
        offset += count;
        lastNewsObserver.observe(document.querySelector(".content:last-child"));
      }
    }
  }
});
