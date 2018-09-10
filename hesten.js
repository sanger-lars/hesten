//hesten.js

const fra = "ev201806010";
const her = document.getElementById("lars");
hent_tal_fra_DB(fra);
var alle_data;

function hent_tal_fra_DB(fra) {
  var posting = $.post("includes/hent.php", {
    alle: fra
  })
  .done(function (data) {
    debugger;
    if (!data == "") {
      alle_data = JSON.parse(data);
      if (alle_data != null) {
      for (var t=2;t < alle_data.length; t++) {
        her.insertAdjacentHTML('beforeend', alle_data[t]);
      }}
    }
  })
  .fail(function () {
  	alert('fail');
  });
}

