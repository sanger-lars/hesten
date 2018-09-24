const url = 'includes/process.php';
const form = document.querySelector('form');

function addEvent(element, evnt, funct){
  if (element.attachEvent)
   return element.attachEvent('on'+evnt, funct);
  else
   return element.addEventListener(evnt, funct, false);
}


addEvent(document.getElementById('opload'), 'mousedown',
  function () {
    //e.preventDefault();
    if (confirm("vil du gemme arangementet ?")) {
       gem_i_DB(billede);
       alert("arangementet er gemt.");
       window.location.replace("https://lars-f.dk/"+site+"/?"+pass);
            //if (response.status === 200) {alert("filen er gemt "+response.json());}
           // else alert("fejl "+response.status);
    }


    function gem_i_DB(billede) {
      var posting = $.post("signup.inc.php", {
            date: document.getElementById('date').value,
            overskrift: document.getElementById('input_overskrift').value,
            tekst: document.getElementById('tekst').value,
            billede: billede
      })
      .done(function (data) {
// slet tidligere begivenheder fra browser eller Refresh
          // alle_data = JSON.parse(data);
//lav evt en sortering af begivenhederne
         // for (var t=2;t < alle_data.length; t++) {          }
       //  her.insertAdjacentHTML('beforeend', data);
 
      })
      .fail(function (data) {
         
      });
    }  
  }   
);