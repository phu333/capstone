
$(document).ready(function () {
    $("#user-nav").hide();
    $("#user-list-nav").click(function () {
        $("#user-nav").show();
    });
	
	$("a").click(function () {
		alert("Link clicked");
	});
	
	$("#assignButton").click(function () {
		alert("Assign people here");
	});
	
	$("#dueButton").click(function () {
		alert("Set due date here (for the whole checklist)");
	});
});