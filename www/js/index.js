var app = {
    initialize: function () {
      document.addEventListener("deviceready", this.onDeviceReady.bind(this), false);
    },
    onDeviceReady: function () {
    },
};
app.initialize();



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
    callFetchDetail();
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
  let Count = tmp.length;

  let Top = `
  { 
    "id": "${Count}",
    "title": "${title}",
    "items": [
      {
        "name": "1Name",
        "url": "1Url"
      },
      {
        "name": "2Name",
        "url": "2Url"
      },
      {
        "name": "3Name",
        "url": "3Url"
      },
      {
        "name": "4Name",
        "url": "4Url"
      },
      {
        "name": "5Name",
        "url": "5Url"
      },
    ]
  }`;
  
  for(var i = 1; i < 6; i++) {
    Top
    .replace(i + "Name", $('#item'+ i + "_name"))
    .replace(i + "Url", $('#item'+ i + "_url"))
  }
  tmp.push(JSON.parse(Top));
  localStorage.setItem("Datas", tmp);
}