let zzz, xxx = "";
let pass;
let billede = "false";
let nr;
var arr_tekst;
var arr_overskrift;
var arr_dato;
var arr_date;
var arr_deltagere;
var alle_data;


xxx = window.location.search;
if (xxx > "") {
	debugger;
	xxx = xxx.substring(1);
	zzz = xxx.split(',');
	if (zzz[1] !== "") {
		document.getElementById("output_image").src = "../uploads/"+zzz[1];
		billede = "true";
		$("#opret_submit").toggleClass("--groen_knap");
		nr = parseInt(zzz[2]);
		var arr_img = zzz[1];
	} else {
		if (zzz[0].substring(0, 3) !== "img") {
			// ingen billede
			$("#opret_submit").toggleClass("--gul_knap");
			nr = parseInt(zzz[2]);
		}
	
	}
	pass = zzz[0];

	var posting = $.post("log.php", {
		check: "true",
		kunCheck: "ok",
		test: pass.toString()
    })
    .done(function (data) {
    	// pass word OK
    })
    .fail(function (data) {
		alert("Du skal være logget ind for at kunne oprette");
		window.location.replace("https://lars-f.dk/"+site+"/");
    }); 
} else {
	
	alert("Du skal være logget ind for at kunne oprette");
	window.location.replace("https://lars-f.dk/"+site+"/");
}
document.getElementById('pass').value = zzz;


//document.getElementById('input_overskrift').value = zzz[4];

//document.getElementById('date').value = zzz[3];
//document.getElementById('pass').value = JSON.stringify(zzz);

/*$("textarea").on("change", function(event){
	console.log("hej ");
	var aa = this.value.replace(/<br>/g, "");
    bb = aa.replace(/[\n\r]/g, "<br>\r\n");
    this.value = aa;
    console.log(aa);
    debugger;
});*/
// = zzz[6];

$("#fortryd").on("mousedown", function(e) {
	e.preventDefault();
	window.location.replace("https://lars-f.dk/"+site+"/?"+zzz[0]);
});

$("#opdater").on("mousedown", function(e) {
	e.preventDefault();
	var dato = document.getElementById('date').value;
	arr_id = dato;
	arr_tekst = document.getElementById('tekst').value;
	var bb = arr_tekst.replace(/[\n\r]/g, "<br>\r\n");
	arr_tekst = bb;
	arr_overskrift = document.getElementById('input_overskrift').value;

	if (dato !== arr_dato) {
		if (confirm("Der vil blive oprettet et nyt arrangement. ok ?")) {
			// opret et nyt
		}
	} else {
		var arr_html = '<div id="'+arr_id+'" class="arangement">'+
			'<div><h2>Dato: '+ arr_date +'</h2></div>'+
			'<div class="overskrift"><h2>'+arr_overskrift+'</h2></div>';
			if (billede == "true") {
				arr_html = arr_html+'<img src="uploads/'+arr_img+'">';
			}
			arr_html = arr_html + '<div id="tekst">'+ arr_tekst + '</div>' + 
			'<div id="deltagere"><span id="dtekst">Deltagere:'+ arr_deltagere +
			'</span> <a id ="deltag">Deltag</a> </div>'+
			'</div>';


		alle_data[nr] = arr_html;
		// gem i json
		var json_data = JSON.stringify(alle_data);
		var posting = $.post("hent.php", {
			gem: "true",
			data: json_data
		})
		.done(function (data) {
			alert("arangementet er opdateret");
		})


	}
	window.location.replace("https://lars-f.dk/"+site+"/?"+zzz[0]);
});


	var posting = $.post("hent.php", {
		alle: "alle"
    })
    .done(function (data) {
    	// OK
    	alle_data = JSON.parse(data);
    	tekst = alle_data[nr];
    	// tekst
    	debugger;
    	var p1 = tekst.indexOf('id="tekst"') + 11;
    	p2 = tekst.substring(p1).indexOf('</div>') + p1;
    	arr_tekst = tekst.substring(p1,p2);
    	var aa = arr_tekst.replace(/<br>/g, "");
    	arr_tekst = aa;
    	aa = arr_tekst.replace(/<br \/>/g, "");
    	arr_tekst = aa;
    	debugger;
    	document.getElementById('tekst').value = arr_tekst;
    	//overskrift
    	p1 = tekst.indexOf('class="overskrift"') + 23;
    	p2 = tekst.substring(p1).indexOf('</h2>') + p1;
    	arr_overskrift = tekst.substring(p1,p2);
    	document.getElementById('input_overskrift').value = arr_overskrift;
    	// dato
    	arr_dato = tekst.substring(9,19);
    	document.getElementById('date').value = arr_dato;
    	// 1966-11-30
    	// 0123456789
    	arr_date = arr_dato.substring(8,10) + "-"+
    	 arr_dato.substring(5,8) + arr_dato.substring(0,4);
    	
    	// deltagere
    	p1 = tekst.indexOf('id="dtekst"') + 22;
    	p2 = tekst.substring(p1).indexOf('</span>') + p1;
    	arr_deltagere = tekst.substring(p1,p2);

    })
    .fail(function (data) {
		// fejl
    }); 
