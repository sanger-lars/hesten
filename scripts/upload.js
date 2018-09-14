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
      const files = document.querySelector('[type=file]').files;
      const formData = new FormData();
      if (files.length > 0) {
        for (let i = 0; i < files.length; i++) {
            let file = files[i];

            formData.append('files[]', file);
        }
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(data => {
          debugger;
          gem_i_DB("true");
            //if (response.status === 200) {alert("filen er gemt "+response.json());}
           // else alert("fejl "+response.status);
        });
      } else {
        debugger;
        gem_i_DB("false");
      }


      function gem_i_DB(billede) {
        var posting = $.post("includes/signup.inc.php", {
              date: document.getElementById('date').value,
              overskrift: document.getElementById('overskrift').value,
              tekst: document.getElementById('tekst').value,
              billede: billede
        })
        .done(function (data) {
  // slet tidligere begivenheder fra browser eller Refresh
            // alle_data = JSON.parse(data);
  //lav evt en sortering af begivenhederne
           // for (var t=2;t < alle_data.length; t++) {          }
          her.insertAdjacentHTML('beforeend', data);
   
        })
        .fail(function (data) {
           alert('gem i db fail' + data);
        });
      }  
    }
  }
);