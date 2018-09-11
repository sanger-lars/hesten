//hesten.js

const fra = "2018-10-01";
const her = document.getElementById("lars");
hent_tal_fra_DB(fra);
var alle_data;

function clikket(e) {
  e.preventDefault();
  console.log(this.parentElement.parentElement.id);
  console.log(this.parentElement.innerHTML);
  debugger;
}

function hent_tal_fra_DB(fra) {
  var posting = $.post("includes/hent.php", {
    alle: fra
  })
  .done(function (data) {
    if (!data == "") {
      alle_data = JSON.parse(data);
      if (alle_data != null) {
        her.innerHTML = "";
      for (var t=2;t < alle_data.length; t++) {
        her.insertAdjacentHTML('beforeend', alle_data[t]);
      }}

      const delta = document.querySelectorAll('#deltag');

      delta.forEach(delt => delt.addEventListener('mousedown', clikket));
    }
  })
  .fail(function () {
  	alert('fail');
  });
}

