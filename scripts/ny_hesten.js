//"use strict";

//hesten.js
var slet = void 0,
    ret = false;
var fra = "kommende";
var her = document.getElementById("lars");
var zzz = "";
zzz = window.location.search;

var alle_data;

hent_tal_fra_DB(fra);

var i = 0;

var c = void 0;
var deltagere = void 0;

function opret() {
  window.location.replace("https://lars-f.dk/" + site + "/includes/opret.php" + zzz);
}

function check_para() {
  if (zzz > "") {
    var posting = $.post("includes/log.php", {
      check: "true",
      test: zzz.substring(1).toString()
    }).done(function (data) {
      var tekst = JSON.parse(data);
      var der = document.getElementById("logo");
      der.insertAdjacentHTML('beforeend', tekst);
    }).fail(function (data) {
      alert("fejl");
    });
  }
} // check_para

check_para();

function gem_deltagere(arr_id, data) {
  var posting = $.post("includes/arr.php", {
    arr_id: arr_id,
    gem_navn: "true",
    data: JSON.stringify(data)
  }).done(function (data) {
    alert("er hermed gemt");
    window.location.replace("https://lars-f.dk/" + site + "/" + zzz);
  }).fail(function (data) {
    alert("failed ikke gemt!!!");
    return data;
  });
}

function hent_deltagere(gem, arr_id, deltager_navn, deltager_antal, callback) {
  var posting = $.post("includes/arr.php", {
    arr_id: arr_id,
    hent_navn: "true"
  }).done(function (hdata) {
    if (gem) {
      if (hdata == "fejl") {

        deltagere = [];
        deltagere.push(deltager_antal);
      } else {
        deltagere = JSON.parse(hdata);
        deltagere[0] = parseInt(deltagere[0]) + parseInt(deltager_antal);
      }
      //if (IsJsonString(svar)) {}

      deltagere.push(deltager_navn);
      deltagere.push(deltager_antal);
      gem_deltagere(arr_id, deltagere);
    } // if gem
    else {
        // hent
        callback(hdata);
      }
  }).fail(function (hdata) {
    alert("failed !!!");
    //data = hdata;
    hdata = "fejl";
    callback(hdata);
  });
} // hent_deltagere


function vis_deltagere() {
  // deltagere liste
  arr_id = this.parentElement.parentElement.id;
  hent_deltagere(false, arr_id, "", 0, function (data) {
    if (data == "fejl") {
      // ingen deltagere
    } else {
      deltagere = JSON.parse(data);
      var tekst = '<ul>';
      var tekst2 = void 0;
      var i = 1;
      tekst += '<h2>Deltager-liste</h2>';
      tekst += '<strong> Antal og Navn </strong></br>';
      tekst += '<svg height="3" width="130">' + '<line x1="0" y1="0" x2="130" y2="0" style="stroke:rgb(0,255,0);stroke-width:2" />';
      for (;;) {
        tekst += '<li>  ' + deltagere[i + 1] + '   ' + deltagere[i] + '</li>';
        i = i + 2;
        if (i > deltagere.length - 1) {
          break;
        }
      }
      tekst += '<svg height="3" width="130">' + '<line x1="0" y1="0" x2="130" y2="0" style="stroke:rgb(0,255,0);stroke-width:2" />';
      tekst += '<li>' + deltagere[0] + ' ialt</li>';
      tekst += "</ul>";

      m = new Modal();
      m.html = tekst;
      m.open();
      $(".modal").toggleClass("--absolut");
      console.log("scroll " + window.scrollY);
      $('html,body').scrollTop(0);
    }
  });
}

function clikket(e) {
  e.preventDefault();
  var arr_id = this.parentElement.parentElement.id;
  c = this.parentElement.parentElement.children;
  m = new Modal();
  m.html = 'Du er ved at tilmelde dig ' + c[1].innerHTML + c[0].innerHTML + '</br>' + 'Skriv dit navn + antal og tryk [Deltag]' + '</br>' + '<input type = "text" id="navn" placeholder="Navn" style="font-size: 15px;"> </br>' + 'Antal <input id="antal" type="number" value="1" style="font-size: 15px; width: 50px; text-align: center;">' + '</br>' + this.parentElement.innerText.substring(0, 13) + '<a id="mdeltag">Gem</a>';
  m.open();
  debugger;
  //var mc = document.getElementsByClassName('mcontainer');

  //var mc2 = document.querySelectorAll('#mdeltag');
  $('#mdeltag').on("click", function () {
    console.log(arr_id);
    deltager_navn = document.getElementById('navn').value;
    deltager_antal = document.getElementById('antal').value;
    if (deltager_navn == "") {
      alert("Du har ikke skrevet dit navn !");
    } else {
      var filnavn = "events/" + arr_id + ".json";
      var svar = hent_deltagere(true, arr_id, deltager_navn, deltager_antal);
    }
    
  });
} // clikket

function klargor_slet() {
  slet = true;
  hent_tal_fra_DB("alle");
}

function klargor_ret() {
  ret = true;
  hent_tal_fra_DB("alle");
}

function find_data(data, id) {
  for (var i = 2; i <= data.length - 1; i++) {
    if (data[i].indexOf(id) > 0) {
      return i;
    }
  }
  return false;
}

function slet_arangement(e) {

  // find id i lars.json
  var id = this.id;
  var nr = find_data(alle_data, id);
  if (nr !== "false") {
    slet = false;
    svar_ja = false;
    var svar_ja = confirm("vil du slette denne begivenhed ? ");
    if (svar_ja) {
      // find billedet
      c = this.children;
      var b_path = "";
      if (c[2].src === undefined) {
        // intet billede
      } else {
        b_path = c[2].src.slice(-6-11).substring(0,11);
      }
       
      // slice array
      var slettet = alle_data.splice(nr, 1);
      // gem array
      var json_data = JSON.stringify(alle_data);
      var posting = $.post("includes/hent.php", {
        gem: "true",
        data: json_data,
        id: id,
        billed_path: b_path
      }).done(function (data) {
        alert("arangementet er slettet");
        window.location.replace("https://lars-f.dk/" + site + zzz);
      }).fail(function (data) {
        var strr = JSON.stringify(data);
        alert("hej "+strr);
        window.location.replace("https://lars-f.dk/" + site + zzz);
      });
    }
  }
  // redraw index.php

  
} // slet_arangement

function ret_arr(e) {
  // find id i lars.json
  var id = this.id;
  var nr = find_data(alle_data, id);
  if (nr !== "false") {
    ret = false;
    svar_ja = false;
    var svar_ja = confirm("vil du rette/opdatere denne begivenhed ?");
    if (svar_ja) {
      // find billedet
      c = this.children;
      var i;
      var b_path = "";
      if (c[2].src === undefined) {
        i = -1;
        // intet billede
      } else {
        b_path = c[2].src.slice(-6-11).substring(0,11);
        i = 0;
      }

      var overskrift = c[1].innerText;
      var tekst = c[3 + i].innerText;
      var deltagere = c[4 + i].innerText.substring(10, 13);
      window.location.replace('https://lars-f.dk/' + site + '/includes/ret.php' + zzz + ',' + b_path + ',' + nr);

      // slice array
      // var slettet = alle_data.splice(nr,1);
      // gem array
      /*      var json_data = JSON.stringify(alle_data);
            var posting = $.post("includes/hent.php", {
              gem: "true",
              data: json_data,
              id: id,
              billed_path: b_path
            })
            .done(function (data) {
              alert("arangementet er slettet");
            })*/
    }
  }
  // redraw index.php

  //window.location.replace("https://lars-f.dk/"+site+zzz);
}

function IsJsonString(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}

klargor_skift_retning_klik();

function klargor_deltag_klik() {
  $('*[id=deltag]').each(function (index) {
    console.log("t =",index);
    $(this).on("click", clikket);
  })
}

function klargor_vis_deltager_klik() {
  $('*[id=dtekst]').each(function () {   
    $(this).on("click", vis_deltagere);
  })
}

function klargor_skift_retning_klik() {
  var kom = document.getElementById('kommende');
  kom.addEventListener('mousedown', tidligere_eller_kommende);
}

function tidligere_eller_kommende() {
  if (fra == "kommende") {
    fra = "tideligere";
    document.getElementById('kommende').innerHTML = "<h1>Tidligere begivenheder</h1>";
  } else {
    fra = "kommende";
    document.getElementById('kommende').innerHTML = "<h1>Kommende begivenheder</h1>";
  }
  hent_tal_fra_DB(fra);
}

function hent_tal_fra_DB(fra, callback) {
  var posting = $.post("includes/hent.php", {
    alle: fra
  }).done(function (data) {
    if (!data == "") {
      //debugger;
      if (IsJsonString(data)) {
        alle_data = JSON.parse(data);
      }
      if (alle_data != null) {
        her.innerHTML = "";
        for (var t = 2; t < alle_data.length; t++) {
          var tekst = alle_data[t];
          var p1 = tekst.indexOf('img_') + 11;
          var tal = Math.floor(Math.random()* 9999 + 11111);
          var nyHtml = tekst.substring(0,p1)+"?"+ tal+
            tekst.substring(p1,tekst.length);
          her.insertAdjacentHTML('beforeend', nyHtml);
        }
      }
      if (slet) {
        $('*[class=arangement]').each(function (index) {
          console.log("t =",index);
          $(this).on("click", slet_arangement);
        });
        // tilføj class 
        var divs = document.querySelectorAll('.arangement'),
            i;

        for (i = 0; i < divs.length; ++i) {
          var classString = divs[i].className; // returns the string of all the classes for myDiv
          var newClass = classString.concat(" slet"); // Adds the class "main__section" to the string (notice the leading space)
          divs[i].className = newClass;
        }
      } else if (ret) {
        $('*[class=arangement]').each(function (index) {
          console.log("t =",index);
          $(this).on("click", ret_arr);
        });
        

        // tilføj class 
        var divs = document.querySelectorAll('.arangement'),
            i;

        for (i = 0; i < divs.length; ++i) {
          var classString = divs[i].className; // returns the string of all the classes for myDiv
          var newClass = classString.concat(" ret"); // Adds the class "main__section" to the string (notice the leading space)
          divs[i].className = newClass;
        }
      } else {
        klargor_deltag_klik();
        klargor_vis_deltager_klik();
      }
    } else {
      her.innerHTML = "";
      her.insertAdjacentHTML('beforeend', '<h2 style="text-align: center;">Der er ingen ' + fra + ' begivenheder</h2>');
    } // if data = ""
  }).fail(function (data) {
    alert('hent fail');
  });
}
