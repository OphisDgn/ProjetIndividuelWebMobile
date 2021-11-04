var app = {
    initialize: function () {
      document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
    },
};
app.initialize();

/** FUNCTIONS */

// return to home page
function returnHome() {
  const divs = [$("#list"), $("#detail"), $("#create")];
  divs.forEach((div, i) => {
      if (!div.hasClass("hidden")) div.addClass("hidden");
      if ($(div).hasClass("list")) {
          div.removeClass("hidden");
      }
  });
}

// show detail's top
function onClickFunction(elem) {
  navigator.vibrate(2000);
  const divs = [$("#list"), $("#detail"), $("#create")];

  if ($(elem).attr("data-oid")) {
    let OID = $(elem).attr("data-oid");
    localStorage.setItem("detailTop", OID);
    $("#detailTopic").html("");
  
    divs.forEach((div, i) => {
      if (!div.hasClass("hidden")) div.addClass("hidden");
      if ($(div).hasClass("detail")) {
        div.removeClass("hidden");
      }
    });
    if (OID > 2) {
      fetchOneLocalStorage();
    } else {
      callFetchDetail();
    }
  }
  else {
    divs.forEach((div, i) => {
      if (!div.hasClass("hidden")) div.addClass("hidden");
      if ($(div).hasClass("create")) {
        div.removeClass("hidden");
      }
    });
  }
}

// add top 
function addTop() {
  const title = $('#title_top').val();
  let tmp = JSON.parse(localStorage.getItem("Datas"));
  let Count = tmp.length + 1;
  let item1name = $('#item1name').val();
  let item1url = $('#item1url').val();
  let item2name = $('#item2name').val();
  let item2url = $('#item2url').val();
  let item3name = $('#item3name').val();
  let item3url = $('#item3url').val();
  let item4name = $('#item4name').val();
  let item4url = $('#item4url').val();
  let item5name = $('#item5name').val();
  let item5url = $('#item5url').val();
 
  let Top = `
  { 
    "id": "${Count}",
    "title": "${title}",
    "items": [
      {
        "name": "${item1name}",
        "url": "${item1url}"
      },
      {
        "name": "${item2name}",
        "url": "${item2url}"
      },
      {
        "name": "${item3name}",
        "url": "${item3url}"
      },
      {
        "name": "${item4name}",
        "url": "${item4url}"
      },
      {
        "name": "${item5name}",
        "url": "${item5url}"
      }
    ]
  }`;
  tmp.push(JSON.parse(Top));

  localStorage.setItem("Datas", JSON.stringify(tmp));
  $('.form-control').val('');
  fetchLocalStorageDone();
  returnHome();
}
