const url = 'includes/process.php';
const form = document.querySelector('form');

form.addEventListener('submit', e => {
    e.preventDefault();

    const files = document.querySelector('[type=file]').files;
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        formData.append('files[]', file);
    }
    
    fetch(url, {
        method: 'POST',
        body: formData
    }).then(data => {

       
        gem_i_DB();
        //if (response.status === 200) {alert("filen er gemt "+response.json());}
       // else alert("fejl "+response.status);
    });

    function gem_i_DB() {
      console.log('gem_i_DB  er startet ');
      var posting = $.post("includes/signup.inc.php", {
            date: document.getElementById('date').value,
            overskrift: document.getElementById('overskrift').value,
            tekst: document.getElementById('tekst').value
      })
      .done(function (data) {
          debugger;
          alle_data = JSON.parse(data);
          for (var t=0;t < alle_data.length; t++) {
            her.insertAdjacentHTML('beforeend', alle_data[t]);
          } 
      })
      .fail(function () {
        alert('fail');
      });
    }
});