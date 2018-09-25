let zzz = "";
let pass;
let billede = "false";



zzz = window.location.search;
debugger;
if (zzz > "") {
	zzz = zzz.substring(1);
	zzz = zzz.split(',');
	if (zzz.length >= 2) {
		document.getElementById("output_image").src = "../uploads/"+zzz[1];
		billede = "true";
		$("#opret_submit").toggleClass("--groen_knap");
	} else {
		if (zzz[0].substring(0, 3) !== "img") {
			// ingen billede
			$("#opret_submit").toggleClass("--gul_knap");
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
document.getElementById('pass').value = pass;

$("textarea").on("change", function(event){
    this.value.replace(/\n\r?/g, '\n');
});

$("#fortryd").on("mousedown", function(e) {
	e.preventDefault();
	window.location.replace("https://lars-f.dk/"+site+"/?"+zzz[0]);
});
