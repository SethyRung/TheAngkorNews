export function navbar_toggler() {
  const btn_nav = document.querySelector(".navbar-toggler");
  const btn_nav_icon = document.querySelector(".fa-solid");
  let nav_bar = document.querySelector(".navbar-collapse");
  let isClicked = false;
  btn_nav.addEventListener("click", () => {
    if (isClicked == false) {
      nav_bar.style.display = "block";
      btn_nav_icon.classList.remove("fa-bars");
      btn_nav_icon.classList.add("fa-xmark");
      isClicked = true;
    } else {
      nav_bar.style.display = "none";
      btn_nav_icon.classList.remove("fa-xmark");
      btn_nav_icon.classList.add("fa-bars");
      isClicked = false;
    }
  });
}

export async function loadNavBar() {
  const navbar = document.querySelector(".navbar-collapse");
  let res = await fetch("actions/get_menu.php");
  let jsonData = await res.json();
  await jsonData.forEach((menu) => {
    let li = document.createElement("li");
    li.setAttribute("class", "nav-item");
    let a = document.createElement("a");
    a.setAttribute("href", `category.html?${menu.id}`);
    a.innerText = menu.title;
    li.appendChild(a);
    let lastNode = navbar.children.length + 1;
    navbar.childNodes[lastNode].insertAdjacentElement("beforebegin", li);
  });
}

export async function loadBanner() {
  const bannerSlider = document.querySelector(".banner");
  let res1 = await fetch("actions/get_ads.php?location=Top of page");
  let bannerList = await res1.json();
  let i = 0;
  let strBannerItem = "";
  await bannerList.forEach((ads) => {
    strBannerItem += `<div class="banner-item">
                    <a href="${ads.link}">${ads.ads}</a>
                  </div>`;
  });
  bannerSlider.innerHTML = strBannerItem;
  let current = 0;
  let before = -1;
  const slides = document.querySelectorAll(".banner-item");
  setInterval(() => {
    if (before == -1) {
      slides[current].style.display = "flex";
      before++;
    } else {
      before = current;
      current++;
      if (current > slides.length - 1) {
        current = 0;
      }
      slides[before].style.display = "none";
      slides[current].style.display = "flex";
    }
  }, 5000);
}

export async function loadAds(type = "one ads per div") {
  const slideContainer = document.querySelector(".ads-slider");
  const slide = document.querySelector(".slides");
  const nextBtn = document.getElementById("btnAds-next");
  const prevBtn = document.getElementById("btnAds-prev");
  const interval = 3000;

  let res2 = await fetch("actions/get_ads.php?location=In order");
  let adsList = await res2.json();

  let strAdsItem = "";
  if (type === "all") {
    const adsElement = document.querySelector(".ads");
    await adsList.forEach((ads) => {
      adsElement.innerHTML += `<a href="${ads.link}">${ads.ads}</a>`;
      strAdsItem += `<div class="slide">
                      <a href="${ads.link}">${ads.ads}</a>
                    </div>`;
    });
  } else {
    const adsElementList = document.querySelectorAll(".ads");
    let i = 0;
    await adsList.forEach((ads) => {
      if (i < adsElementList.length) {
        adsElementList[i].innerHTML = `<a href="${ads.link}">${ads.ads}</a>`;
        i++;
      }
      strAdsItem += `<div class="slide">
                      <a href="${ads.link}">${ads.ads}</a>
                    </div>`;
    });
  }
  slide.innerHTML = strAdsItem;

  let slides = document.querySelectorAll(".slide");
  let index = 1;
  let slideInterval;

  const firstClone = slides[0].cloneNode(true);
  const lastClone = slides[slides.length - 1].cloneNode(true);

  firstClone.id = "first-clone";
  lastClone.id = "last-clone";

  slide.append(firstClone);
  slide.prepend(lastClone);

  const slideWidth = slides[index].clientWidth;

  slide.style.transform = `translateX(${-slideWidth * index}px)`;

  const startSlide = () => {
    slideInterval = setInterval(() => {
      moveToNextSlide();
    }, interval);
  };

  const getSlides = () => document.querySelectorAll(".slide");

  slide.addEventListener("transitionend", () => {
    slides = getSlides();
    if (slides[index].id === firstClone.id) {
      slide.style.transition = "none";
      index = 1;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }

    if (slides[index].id === lastClone.id) {
      slide.style.transition = "none";
      index = slides.length - 2;
      slide.style.transform = `translateX(${-slideWidth * index}px)`;
    }
  });

  const moveToNextSlide = () => {
    slides = getSlides();
    if (index >= slides.length - 1) return;
    index++;
    slide.style.transition = ".7s ease-out";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  const moveToPreviousSlide = () => {
    if (index <= 0) return;
    index--;
    slide.style.transition = ".7s ease-out";
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  };

  slideContainer.addEventListener("mouseenter", () => {
    clearInterval(slideInterval);
  });

  slideContainer.addEventListener("mouseleave", startSlide);
  nextBtn.addEventListener("click", moveToNextSlide);
  prevBtn.addEventListener("click", moveToPreviousSlide);

  startSlide();
}

export function btnSearch_click() {
  const btn_search = document.querySelector("#btn-search");
  const txtSearch = document.querySelector("#txtSearch");
  btn_search.addEventListener("click", () => {
    if (txtSearch.value !== "") {
      window.location.assign("search.html?" + txtSearch.value);
    }
  });
}

export function relativeDate(date) {
  const diff = Math.round((new Date() - new Date(date)) / 1000);

  const minute = 60;
  const hour = minute * 60;
  const day = hour * 24;
  const week = day * 7;
  const month = day * 30;
  const year = month * 12;

  if (diff < 30) {
    return "just now";
  } else if (diff < minute) {
    return diff + " seconds ago";
  } else if (diff < 2 * minute) {
    return "a minute ago";
  } else if (diff < hour) {
    return Math.floor(diff / minute) + " minutes ago";
  } else if (Math.floor(diff / hour) == 1) {
    return "1 hour ago";
  } else if (diff < day) {
    return Math.floor(diff / hour) + " hours ago";
  } else if (diff < day * 2) {
    return "yesterday";
  } else if (diff < week) {
    return Math.floor(diff / day) + " days ago";
  } else if (diff < month) {
    return Math.floor(diff / week) + " weeks ago";
  } else if (diff < year) {
    return Math.floor(diff / month) + " months ago";
  } else {
    return Math.floor(diff / year) + " years ago";
  }
}

export function absoluteDate(date) {
  const d = new Date(date);
  console.log(d);
  return `ថ្ងៃទី ${d.getDate()} ខែ ${d.getMonth() + 1} ឆ្នាំ ${d.getFullYear()} ម៉ោង ${d.getHours()}:${String(
    d.getMinutes()
  ).padStart(2, "0")}`;
}
