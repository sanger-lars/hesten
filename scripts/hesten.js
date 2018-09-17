//hesten.js

const fra = "kommende";
const her = document.getElementById("lars");

var alle_data;
hent_tal_fra_DB(fra);
let i = 0,
    m = new Modal();
let c;
let deltagere;

function gem_deltagere(arr_id, data) {
  var posting = $.post("includes/arr.php", {
    arr_id: arr_id,
    gem_navn: "true",
    data: JSON.stringify(data)
  })
  .done(function (data) {
    alert("er hermed gemt");
    window.location.replace("https://lars-f.dk/hesten2");
      
  })
  .fail(function (data) {
    alert("failed ikke gemt!!!");
    return data;
  });
}

function hent_deltagere(arr_id, deltager_navn, deltager_antal) {
  var posting = $.post("includes/arr.php", {
    arr_id: arr_id,
    hent_navn: "true"
  })
  .done(function (data) {
    debugger;
    if (data == "fejl") {
      
        deltagere = [];
        deltagere.push(1);
      } else {
        deltagere = JSON.parse(data);
        deltagere[0] = parseInt(deltagere[0])+parseInt(deltager_antal);
      }
      //if (IsJsonString(svar)) {}
      
      deltagere.push(deltager_navn);
      deltagere.push(deltager_antal);
      gem_deltagere(arr_id, deltagere); 
      
  })
  .fail(function (data) {
    alert("failed !!!");
    return data;
  });
}

function clikket(e) {
  e.preventDefault();
  var arr_id = this.parentElement.parentElement.id;
  c = this.parentElement.parentElement.children;
  m.html = 'Du er ved at tilmelde dig ' + 
  c[1].innerHTML + c[0].innerHTML + '</br>' +
  'Skriv dit navn + antal og tryk [Deltag]' + '</br>'
  +'<input type = "text" id="navn" placeholder="Navn" style="font-size: 15px;"> </br>'
  +'Antal <input id="antal" type="number" value="1" style="font-size: 15px; width: 50px; text-align: center;">'
  +'</br>'+this.parentElement.innerHTML;
  m.open();
  
  var mc = document.getElementsByClassName('mcontainer');
  
  const mc2 = document.querySelectorAll('#deltag');

  mc2.forEach(delt => delt.addEventListener('mousedown', function () {
    console.log(arr_id);
    deltager_navn = document.getElementById('navn').value;
    deltager_antal = document.getElementById('antal').value;
    if (deltager_navn == "") {
      alert("Du har ikke skrevet dit navn !");
    } else {
      var filnavn = "events/" + arr_id + ".json";
      var svar = hent_deltagere(arr_id, deltager_navn, deltager_antal);
    }
    
  }));

}



function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function hent_tal_fra_DB(fra) {
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
      const delta = document.querySelectorAll('#deltag');

      delta.forEach(delt => delt.addEventListener('mousedown', clikket));
    } else {
      her.insertAdjacentHTML('beforeend', "<h2>Der er ingen kommende arangementer</h2>");
    }
  })
  .fail(function (data) {
  	alert('hent fail');
  });
}

