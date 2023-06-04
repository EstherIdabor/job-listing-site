// fetch("./data.json").then((response) => console.log(response.json()));
import jsonData from "./data.json";

const jobList = document.querySelector(".job");
const filterBar = document.querySelector(".filter-bar");
const filterItem = document.querySelector(".filter-key-items");
const clearTab = document.querySelector(".clear-filter");

let filterArr = [];
window.itemFilter = function (param) {
  let item = param.innerHTML;
  if (!filterArr.includes(item)) {
    filterArr.push(item);
    filterBar.style.display = "Block";
    filterItem.insertAdjacentHTML(
      "beforeend",
      `<div class="filter-key-item">
                  <button class="language ${item}">${item}</button>
                    <button class="remove-icon">
                    <img src="/images/icon-remove.svg" alt="" />
                  </button>
                </div>`
    );
    clearData();
    filterData();
  }
};

const displayData = function (Data) {
  Data.forEach((stat) => {
    jobList.insertAdjacentHTML(
      "beforeend",
      `
    <div class="job-item">
          <div class="job-profile">
            <div class="company-image">
              <img src="${stat.logo}" alt="" />
            </div>
            <div class="role-info">
              <h1>
                <span class="company-name">${stat.company} </span>
                ${stat.new ? '<span class="new">new!</span>' : ""}
                ${
                  stat.featured ? '<span class="featured">featured</span>' : ""
                } 
              </h1>
              <h2 class="job-title">${stat.position}</h2>
              <ul>
                <li class="first-list-item">${stat.postedAt}</li>
                <li>${stat.contract}</li>
                <li>${stat.location}</li>
              </ul>
            </div>
          </div>
          <div class="languages">
          <button class="language" onclick="itemFilter(this)">${
            stat.role
          }</button>
          <button class="language" onclick="itemFilter(this)">${
            stat.level
          }</button>
          ${stat.languages
            .map(
              (lang) =>
                `<button class="language" onclick="itemFilter(this)">${lang}</button>`
            )
            .join("")}
            ${stat.tools
              .map(
                (tool) =>
                  `<button class="language" onclick="itemFilter(this)">${tool}</button>`
              )
              .join("")}
          </div>
        </div> 
  `
    );
  });
};

const clearData = function () {
  jobList.innerHTML = "";
};

displayData(jsonData);

const filterData = function () {
  const filteredData = jsonData.filter((item) => {
    let filteredarray = [
      item.role,
      item.level,
      ...item.languages,
      ...item.tools,
    ];
    return filterArr.every((r) => filteredarray.includes(r));
  });
  displayData(filteredData);
};

filterItem.addEventListener("click", function (e) {
  if (e.target.closest(".remove-icon")) {
    const removeIcon = e.target;
    const removeItem = removeIcon.closest(".filter-key-item");
    removeItem.remove();
    const removeItemContent = removeItem.querySelector("button").textContent;
    const removeIndex = filterArr.indexOf(removeItemContent);
    filterArr.splice(removeIndex, 1);
    clearData();
    filterData();

    if (filterArr.length == 0) {
      filterBar.style.display = "none";
    }
  }
});

clearTab.addEventListener("click", function () {
  const removeItems = filterItem.querySelectorAll(".filter-key-item");
  removeItems.forEach((item) => item.remove());
  filterArr = [];
  filterBar.style.display = "none";
  clearData();
  displayData(jsonData);
});
