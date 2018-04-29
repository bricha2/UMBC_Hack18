// JavaScript source code
function sendToDatabase() {

    var classVar = document.forms["addingEvent"]["className"].value;
    var assignmentVar = document.forms["addingEvent"]["assignment"].value;
    var dateVar = document.forms["addingEvent"]["assignmentDate"].value;
    var timeVar = document.forms["addingEvent"]["assignmentTime"].value;
    timeVar = timeVar + ":00";
    var locationVar = document.forms["addingEvent"]["location"].value;
    var professorVar = document.forms["addingEvent"]["professor"].value;
    var descriptionVar = document.forms["addingEvent"]["description"].value;

    var args = [classVar,assignmentVar,dateVar, timeVar, locationVar, professorVar, descriptionVar];
    console.log(args);
    $.ajax({
        async: true,
        type: "POST",
        url: "php/dbconnection.php",
        dataType:'json',
        data:{details: args},
        success: function (){
		//		console.log('success');
		populateTable();
        }
    });   

}

function populateTable() {
    var myTable = document.getElementById("sessions");
	$.ajax({
	url:'php/dbresult.php',
	type:'GET',
	dataType: "json",
	success: function(response){
	var data = response;
	printTable(data);
	//	console.log(data);
}
});
	
}

function printTable(data) {

    var myTable = document.getElementById("sessions");
    for (item of data) {

	var row = myTable.insertRow(0);
	var cell = row.insertCell(0);

	cell.innerHTML = "Class: " + item['class'] + "<br>Assignment: " + item['assignments'] + "<br>Date: " + item['date'] +
"           Time: " + item['time'] + "         Location: " + item['location']  + "<br>Professor: " + item['professor'] + "<br>Description: " + item['description'];
    console.log(cell.innerHTML);
    }


}