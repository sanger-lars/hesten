const url = 'includes/process.php';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

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
          gem_i_DB("true");
          //if (response.status === 200) {alert("filen er gemt "+response.json());}
         // else alert("fejl "+response.status);
      });
    } else {
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
        debugger;
// slet tidligere begivenheder fra browser eller Refresh
          alle_data = JSON.parse(data);
//lav evt en sortering af begivenhederne
         // for (var t=2;t < alle_data.length; t++) {          }
            her.insertAdjacentHTML('beforeend', alle_data);
 
      })
      .fail(function () {
        alert('fail');
      });
    }
});