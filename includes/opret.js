let zzz = "";
let billede = "false";
zzz = window.location.search;
if (zzz > "") {
	document.getElementById("output_image").src = "../uploads/"+zzz.substring(1, 50);
	billede = "true";
}

$("textarea").on("change", function(event){
    this.value.replace(/\n\r?/g, '\n');
});
