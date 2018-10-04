"use strict";

var zzz = "";
var pass = void 0;
var billede = "false";

zzz = window.location.search;
if (zzz > "") {
	zzz = zzz.substring(1);
	zzz = zzz.split(',');
	if (zzz.length >= 2) {
		var tal = Math.floor(Math.random()* 9999 + 11111);
		document.getElementById("output_image").src = "../uploads/" + zzz[1]+"?"+tal;
		billede = "true";

		$("#output_image").on("mousedown", function (e) {
			e.preventDefault();
			var posting = $.post("rotate.php", {
				save: "true",
				filnavn: "../uploads/" + zzz[1]
			}).done(function (data){
				window.location.reload();
			}).fail(function(){
				alert('error');
			})
		});

		$("#opret_submit").toggleClass("--groen_knap");
		$("#opload_ok").html("Billedet er uploadet");
	} else {
		if (zzz[0].substring(0, 3) !== "img") {
			// ingen billede
			$("#opret_submit").toggleClass("--gul_knap");
			$("#opload_ok").html("Husk at uploade billede");
		}
	}
	pass = zzz[0];
	var posting = $.post("log.php", {
		check: "true",
		kunCheck: "ok",
		test: pass.toString()
	}).done(function (data) {
		// pass word OK
	}).fail(function (data) {
		alert("Du skal være logget ind for at kunne oprette");
		window.location.replace("https://lars-f.dk/" + site + "/");
	});
} else {

	alert("Du skal være logget ind for at kunne oprette");
	window.location.replace("https://lars-f.dk/" + site + "/");
}
document.getElementById('pass').value = pass;

$("textarea").on("change", function (event) {
	this.value.replace(/\n\r?/g, '\n');
});

$("#fortryd").on("mousedown", function (e) {
	e.preventDefault();
	window.location.replace("https://lars-f.dk/" + site + "/?" + zzz[0]);
});
