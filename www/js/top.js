const divTopDetail = `
<div>
  <div class="row">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <img src="0__src__" class="card-img-top" />
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <div class="card-body">
        <p class="card-text">
          0___name___
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <img src="1__src__" class="card-img-top" />
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <div class="card-body">
        <p class="card-text">
          1___name___
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <img src="2__src__" class="card-img-top" />
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <div class="card-body">
        <p class="card-text">
          2___name___
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <img src="3__src__" class="card-img-top" />
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <div class="card-body">
        <p class="card-text">
          3___name___
        </p>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-5 col-md-5 col-sm-12 col-xs-12">
      <img src="4__src__" class="card-img-top" />
    </div>
    <div class="col-lg-7 col-md-7 col-sm-12 col-xs-12">
      <div class="card-body">
        <p class="card-text">
          4___name___
        </p>
      </div>
    </div>
  </div>
</div>
`;

const divTopList = `
<li style="list-style:none;">
  <a class="topTitle" onclick="onClickFunction(this)" style="color: #434343;text-decoration:none;cursor:pointer;" data-oid="__id__">__top__. __title__</a>
</li>
`;

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
};

// pour afficher un top en détail
const callFetchDetail = () => {
  fetch("data/data.json").then((response) =>
    response.json().then(fetchOneTop)
  );
}

const fetchOneTop = (json) => {
  const divList = document.getElementById("detailTopic");
  json.forEach((top, i) => {
    if (top.id == localStorage.getItem("detailTop")) {
      $('.titleDetail').html("Détail du top : " + top.title);
      const newDivTopDetail = divTopDetail
      .replace("0___name___", top.items[0].name)
      .replace("0__src__", top.items[0].url)
      .replace("1___name___",top.items[1].name)
      .replace("1__src__", top.items[1].url)
      .replace("2___name___", top.items[2].name)
      .replace("2__src__", top.items[2].url)
      .replace("3___name___", top.items[3].name)
      .replace("3__src__", top.items[3].url)
      .replace("4___name___", top.items[4].name)
      .replace("4__src__", top.items[4].url)
      divList.appendChild(htmlToElement(newDivTopDetail));
      console.log(newDivTopDetail);

    }
  });
};

// pour afficher la liste des tops
const fetchApiDone = (json) => {
  const divList = document.getElementById("listTop");
  json.forEach((top, i) => {
    const newDivTopList = divTopList
      .replace("__id__", top.id)
      .replace("__top__", (i + 1))
      .replace("__title__", top.title)
      divList.appendChild(htmlToElement(newDivTopList));
  });
  localStorage.setItem("Datas", JSON.stringify(json));
};

document.addEventListener("DOMContentLoaded", () => {
  fetch("data/data.json").then((response) =>
    response.json().then(fetchApiDone)
  );
});