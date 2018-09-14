//hesten.js

const fra = "kommende";
const her = document.getElementById("lars");

var alle_data;
hent_tal_fra_DB(fra);
let i = 0,
    m = new Modal();

function clikket(e) {
  e.preventDefault();
  console.log(this.parentElement.parentElement.id);
  console.log();
  var c = this.parentElement.parentElement.children;
  m.html = 'Du er ved at tilmelde dig ' + 
  c[0].innerHTML + '</br>' +
  'Skriv dit navn og tryk [Deltag]' + '</br>'
  +'<input type = "text" id="navn" placeholder="Navn" style="font-size: 15px;"> </br>'
  +'Antal <input id="antal" type="number" value="1" style="font-size: 15px; width: 50px; text-align: center;">'
  +"    "+this.parentElement.innerHTML;
  m.open();
}

function hent_tal_fra_DB(fra) {
  var posting = $.post("includes/hent.php", {
    alle: fra
  })
  .done(function (data) {
    if (!data == "") {
      debugger;
      alle_data = JSON.parse(data);
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

