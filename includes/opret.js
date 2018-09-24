let zzz = "";
let billede = "false";
zzz = window.location.search;
if (zzz > "") {
	document.getElementById("output_image").src = "../uploads/"+zzz.substring(1, 50);
	billede = "true";
	$("#opret_submit").toggleClass("--groen_knap");
} else {
	$("#opret_submit").toggleClass("--gul_knap");
}

$("textarea").on("change", function(event){
    this.value.replace(/\n\r?/g, '\n');
});

$("#fortryd").on("mousedown", function(e) {
	e.preventDefault();
	window.location.replace("https://lars-f.dk/hesten/index.php");
});
