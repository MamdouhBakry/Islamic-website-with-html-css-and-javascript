// explore button
let explorBtn = document.querySelector(".title .btn"),
  hadithSection = document.querySelector(".hadith");
explorBtn.addEventListener("click", () => {
  hadithSection.scrollIntoView({
    behavior: "smooth",
  });
});
// scroll button and fixed scroll nav

let fixedNav = document.querySelector(".header"),
  scrollBtn = document.querySelector(".scrollBtn");
window.addEventListener("scroll", () => {
  window.scrollY > 100
    ? fixedNav.classList.add("active")
    : fixedNav.classList.remove("active");
  window.scrollY > 500
    ? scrollBtn.classList.add("active")
    : scrollBtn.classList.remove("active");
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
// hadith changer
let hadithContainer = document.querySelector(".hadithContainer"),
  next = document.querySelector(".buttons .next"),
  prev = document.querySelector(".buttons .prev"),
  number = document.querySelector(".buttons .number");

let hadithIndex = 0;
HadithChanger();
function HadithChanger() {
  fetch("https://api.hadith.sutanlab.id/books/muslim?range=1-300")
    .then((respose) => respose.json())
    .then((data) => {
      let hadiths = data.data.hadiths;
      changeHadith();
      next.addEventListener("click", () => {
        hadithIndex == 299 ? (hadithIndex = 0) : hadithIndex++;
        changeHadith();
      });
      prev.addEventListener("click", () => {
        hadithIndex == 0 ? (hadithIndex = 299) : hadithIndex--;
        changeHadith();
      });
      function changeHadith() {
        hadithContainer.innerText = hadiths[hadithIndex].arab;
        number.innerText = `300 - ${hadithIndex + 1}`;
      }
    });
}

// links section
let sections = document.querySelectorAll("section"),
  links = document.querySelectorAll(".header ul li");

links.forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector(".header ul li.active").classList.remove("active");
    link.classList.add("active");
    let target = link.dataset.filter;
    sections.forEach((section) => {
      if (section.classList.contains(target)) {
        section.scrollIntoView();
      }
    });
  });
});

// surahs function
let surahsContainer = document.querySelector(".surahsContainer");
getSurahs();

function getSurahs() {
  fetch("http://api.alquran.cloud/v1/meta")
    .then((response) => response.json())
    .then((data) => {
      surahsContainer.innerHTML = "";
      let surahs = data.data.surahs.references;
      let numberOfSurahs = 114;
      for (let i = 0; i < numberOfSurahs; i++) {
        surahsContainer.innerHTML += `
             <div class="surah">
                <p>${surahs[i].name}</p>
                <p>${surahs[i].englishName}</p>
            </div>
          `;
      }
      let surahsTitles = document.querySelectorAll(".surah");
      let popup = document.querySelector(".surah-popup"),
        ayatContainer = document.querySelector(".ayat");
      surahsTitles.forEach((title, index) => {
        title.addEventListener("click", () => {
          fetch(`http://api.alquran.cloud/v1/surah/${index + 1}`)
            .then((response) => response.json())
            .then((data) => {
              ayatContainer.innerHTML = "";
              let Ayat = data.data.ayahs;
              Ayat.forEach((aya) => {
                popup.classList.add("active");
                ayatContainer.innerHTML += `
                    <p>(${aya.numberInSurah}) - ${aya.text}</p>
                    `;
              });
            });
        });
      });
      let closePopup = document.querySelector(".close-popup");
      closePopup.addEventListener("click", () => {
        popup.classList.remove("active");
      });
    });
}

let cards = document.querySelector(".cards");
getPrayTimes();
function getPrayTimes() {
  fetch(
    "https://api.aladhan.com/v1/timingsByCity?city=cairo&country=egypt%20Arab%20Emirates&method=8"
  )
    .then((response) => response.json())
    .then((data) => {
      let times = data.data.timings;
      cards.innerHTML = "";
      for (let time in times) {
        cards.innerHTML += `
        <div class="card">
                <div class="circle">
                    <svg>
                        <circle cx="100" cy="100" r="100"></circle>
                    </svg>
                    <div class="praytime">
                        ${times[time]}
                    </div>
                    <p>${time}</p>
                </div>
            </div>
        `;
      }
    });
}

// Active SideBar

let bars = document.querySelector(".bars"),
  sideBar = document.querySelector(".header ul");

bars.addEventListener("click", () => {
  sideBar.classList.toggle("active");
});
