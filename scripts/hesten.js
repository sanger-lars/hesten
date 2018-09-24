//hesten.js
let slet = false;
let fra = "kommende";
const her = document.getElementById("lars");
let zzz = "";
zzz = window.location.search;


var alle_data;

hent_tal_fra_DB(fra);


let i = 0;
    
let c;
let deltagere;

function opret() {
  window.location.replace("https://lars-f.dk/hesten/includes/opret.php");
}


function check_para() {
  if (zzz > "") {
    var posting = $.post("includes/log.php", {
      check: "true",
      test: zzz.substring(1).toString()
    })
    .done(function (data) {
      var tekst = JSON.parse(data);
      const der = document.getElementById("logo");     
      der.insertAdjacentHTML('beforeend', tekst);
        
    })
    .fail(function (data) {
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
  })
  .done(function (data) {
    alert("er hermed gemt");
    window.location.replace("https://lars-f.dk/hesten/index.php"+zzz);
      
  })
  .fail(function (data) {
    alert("failed ikke gemt!!!");
    return data;
  });
}

function hent_deltagere(gem, arr_id, deltager_navn, deltager_antal, callback) {
  var posting = $.post("includes/arr.php", {
    arr_id: arr_id,
    hent_navn: "true"
  })
  .done(function (hdata) {
    if (gem) {
      if (hdata == "fejl") {
          
        deltagere = [];
        deltagere.push(deltager_antal);
      } else {
        deltagere = JSON.parse(hdata);
        deltagere[0] = parseInt(deltagere[0])+parseInt(deltager_antal);
      }
        //if (IsJsonString(svar)) {}
        
      deltagere.push(deltager_navn);
      deltagere.push(deltager_antal);
      gem_deltagere(arr_id, deltagere);  
    } // if gem
    else { // hent
      callback(hdata);
    }
      
  })
  .fail(function (hdata) {
    alert("failed !!!");
    //data = hdata;
    hdata = "fejl";
    callback(hdata);
  });
} // hent_deltagere



function vis_deltagere() {
  // deltagere liste
  arr_id = this.parentElement.parentElement.id;
  hent_deltagere(false,arr_id,"",0, function(data) {
    if (data == "fejl") {
      // ingen deltagere
    } else {
      deltagere = JSON.parse(data);
      var tekst = '<ul>';
      let tekst2;
      var i = 1;
      tekst += '<h2>Deltager-liste</h2>';
      tekst += '<strong> Antal og Navn </strong></br>';
      tekst+='<svg height="3" width="130">'+
        '<line x1="0" y1="0" x2="130" y2="0" style="stroke:rgb(0,255,0);stroke-width:2" />';
      for (;;) {
        tekst += '<li>  '+deltagere[i+1]+'   '+deltagere[i]+'</li>';
        i = i+2;
        if (i > deltagere.length-1) {
          break;
        }
      }
      tekst+='<svg height="3" width="130">'+
        '<line x1="0" y1="0" x2="130" y2="0" style="stroke:rgb(0,255,0);stroke-width:2" />';
      tekst+='<li>'+deltagere[0]+' ialt</li>';
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
  m.html = 'Du er ved at tilmelde dig ' + 
  c[1].innerHTML + c[0].innerHTML + '</br>' +
  'Skriv dit navn + antal og tryk [Deltag]' + '</br>'
  +'<input type = "text" id="navn" placeholder="Navn" style="font-size: 15px;"> </br>'
  +'Antal <input id="antal" type="number" value="1" style="font-size: 15px; width: 50px; text-align: center;">'
  +'</br>'+this.parentElement.innerText.substring(0, 13)+'<a id="mdeltag">Gem</a>';
  m.open();
  debugger;
  var mc = document.getElementsByClassName('mcontainer');
  
  const mc2 = document.querySelectorAll('#mdeltag');

  mc2.forEach(delt => delt.addEventListener('mousedown', function () {
    console.log(arr_id);
    deltager_navn = document.getElementById('navn').value;
    deltager_antal = document.getElementById('antal').value;
    if (deltager_navn == "") {
      alert("Du har ikke skrevet dit navn !");
    } else {
      var filnavn = "events/" + arr_id + ".json";
      var svar = hent_deltagere(true, arr_id, deltager_navn, deltager_antal);
    }
    
  }));

} // clikket

function klargor_slet() {
  slet = true;
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
  var nr = find_data(alle_data, id) 
  if (nr !== "false") {
    console.log(alle_data[nr]);
    slet = false;
    svar_ja = false;
    var svar_ja = confirm("vil du slette dette arangementet ?");
    if (svar_ja) {
      // find billedet
      c = this.children;
      var b_path = "";
      if (c[2].src === undefined) {
        // intet billede
      } else {
        b_path = c[2].src.slice(-11);
      }
      
      console.log(b_path);
      debugger;
      // slice array
      var slettet = alle_data.splice(nr,1);
      // gem array
      var json_data = JSON.stringify(alle_data);
      var posting = $.post("includes/hent.php", {
        gem: "true",
        data: json_data,
        id: id,
        billed_path: b_path
      })
      .done(function (data) {
        alert("arangementet er slettet");
      })
          
    }
    
  }
  // redraw index.php

  window.location.replace("https://lars-f.dk/hesten"+zzz);
  
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function klargor_deltag_klik() {
  const delta = document.querySelectorAll('#deltag');
  delta.forEach(delt => delt.addEventListener('mousedown', clikket)); 
}
        
function klargor_vis_deltager_klik() {
  const vis = document.querySelectorAll('#dtekst');
  vis.forEach(delt => delt.addEventListener('mousedown', vis_deltagere)); 
}

function hent_tal_fra_DB(fra, callback) {
  var posting = $.post("includes/hent.php", {
    alle: fra
  })
  .done(function (data) {
    if (!data == "") {
      //debugger;
      if (IsJsonString(data)) {alle_data = JSON.parse(data);}
      if (alle_data != null) {
        her.innerHTML = "";
        for (var t=2;t < alle_data.length; t++) {
          her.insertAdjacentHTML('beforeend', alle_data[t]);
        }
      }
      if (slet) {
        const delta = document.querySelectorAll('.arangement');
        delta.forEach(delt => delt.addEventListener('mousedown', slet_arangement));

        // tilføj class 
        var divs = document.querySelectorAll('.arangement'), i;

        for (i = 0; i < divs.length; ++i) {
            var classString = divs[i].className; // returns the string of all the classes for myDiv
            var newClass = classString.concat(" slet"); // Adds the class "main__section" to the string (notice the leading space)
            divs[i].className = newClass;
        } 
      } else {
        klargor_deltag_klik();
        klargor_vis_deltager_klik();    
      } // if slet
    } else {
      her.insertAdjacentHTML('beforeend', "<h2>Der er ingen kommende arangementer</h2>");
    } // if data = ""
  })
  .fail(function (data) {
  	alert('hent fail');
  });
}

