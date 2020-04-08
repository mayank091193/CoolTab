
$(document).ready(function () {
	//localStorage["username"] = "";
	$( "#idCheckAllTodo" ).click(function() {
	  $( "#idmainsection" ).slideToggle("fast");
	  $("#idInsertTodoBlock").slideToggle("fast");
	});
	var body = $('body');
	var backgrounds = new Array(
			'url(1.jpg) no-repeat center center fixed',
			'url(2.jpg) no-repeat center center fixed',
			'url(3.jpg) no-repeat center center fixed',
			'url(4.jpg) no-repeat center center fixed',
			'url(5.jpg) no-repeat center center fixed',
			'url(6.jpg) no-repeat center center fixed',
			'url(7.jpg) no-repeat center center fixed',
			'url(8.jpg) no-repeat center center fixed',
			'url(9.jpg) no-repeat center center fixed');
	var current = 0;
	function nextBackground() {
		body.css('background', backgrounds[current = ++current % backgrounds.length]);
		body.css('background-size', 'cover');
		body.css("transition", "background 1s linear");
		setTimeout(nextBackground, 5000);
	}
	var current = Math.floor(Math.random() * backgrounds.length);
	setTimeout(nextBackground, 5000);
	body.css('background', backgrounds[current]);
	body.css('background-size', 'cover');

	$('#idUserName').keyup(function (eventObj) {
		if (eventObj.which == 13) {
			var output = "";
			var data = $('#idUserName').val();
			localStorage["username"] = data;
			$("#idNameUser").text("Welcome " + localStorage["username"]);
			$('#idspn').hide();
			var letters = localStorage["username"].split("");
			letters.forEach(function (letter) {
				var color = "#" + (Math.random() * 16777215 | 0).toString(16);
				output += '<span style="font-size: 75px;text-align: center;font-weight: bold;color: ' + color + ';">' + letter + '</span>';
				$('span#idNameUser').html(output);
			});
			$('#idWelcome').show();
			$('#idNameUser').show();
		}
	});

	
	var ArrayTodo = [];
	//for todo item
	$('#add').click(function () {
		var Description = $('#description').val();
		//if the to-do is empty
		if ($("#description").val() == '') {
			$('#alert').html("<p style='color:red'><strong>You left the to-do empty!</strong></p>");
			$('#alert').fadeIn().delay(1000).fadeOut();
			return false;
		}
		chrome.storage.local.get('list_todo', function (result) {
            ArrayTodo = result.list_todo;
			ArrayTodo.push(Description)
			chrome.storage.local.set({
			"list_todo" : ArrayTodo
		}, function () {
			loadToDos();
		});
        });
		return false;
	});
	//on blur if enter save todo
	$('#description').keydown( function(eventObj) {
    if ( eventObj.which == 13 )
    {
       var Description = $('#description').val();
		//if the to-do is empty
		if ($("#description").val() == '') {
			$('#alert').html("<p style='color:red'><strong>You left the to-do empty!</strong></p>");
			$('#alert').fadeIn().delay(1000).fadeOut();
			return false;
		}
		chrome.storage.local.get('list_todo', function (result) {
            ArrayTodo = result.list_todo;
			ArrayTodo.push(Description)
			chrome.storage.local.set({
			"list_todo" : ArrayTodo
		}, function () {
			loadToDos();
		});
        });
		return false;
    }
	} );
	// clear all the local storage
	$('#clear').click(function () {
		localStorage.setItem('todos', '')
		$('#todos').html(localStorage.getItem('todos'));
		var ArrayTodo = [];
		chrome.storage.local.set({
			"list_todo" : ArrayTodo
		}, function () {
			loadToDos();
		});
		return false;
	});
	loadName();
	loadToDos();
	startTime();
	getLoadingText();
	$('#idClearName').click(function () {
		localStorage["username"] = "";
		loadName();
	});
});

function loadName()
{
	if (localStorage["username"] != "" && localStorage["username"] != "undefined" && localStorage["username"] != undefined) {
		var output = "";
		var letters = localStorage["username"].split("");
		letters.forEach(function (letter) {
			var color = "#" + (Math.random() * 16777215 | 0).toString(16);
			output += '<span class="classShadow" style="font-size: 75px;text-align: center;font-weight: bold;color: ' + color + ';">' + letter + '</span>';
			$('span#idNameUser').html(output);
		});
		$('#idWelcome').hide();
		$('#idWelcome').show();
		$('#idspn').hide();
	} else {
		$('#idspn').show();
		$('#idWelcome').hide();
		$('#idNameUser').hide();
	}
}
function loadToDos() {
	// if (localStorage.getItem('todos')) {
		// $('#todos').html(localStorage.getItem('todos'));
	// }
	$("#description").val("");
	$('#todos').empty();
	chrome.storage.local.get('list_todo', function (result) {
            var ToDoArray = result.list_todo;
			if(ToDoArray.length != 0){
			for(var i =0;i< ToDoArray.length;i++)
			{
				var item = ToDoArray[i];
				$('#todos').prepend("<div class='todoElement'><span style='color:black;margin-left:0px;margin-top:60px;font-size:18px;word-wrap: break-word;'>" + item + "</span><div style='clear:both'></div><a style='color:red;cursor:pointer;font-size:18px;text-decoration:none;float:right;margin-right:7px;margin-top:-5px;' class = 'btnDeleteItem'>x</a><br /></div>");
			}
			$('#todos').show();
			$('#noTodoFound').hide();
			}
			else
			{
				$('#noTodoFound').show();
			    $('#todos').hide();
			}
			$(".btnDeleteItem").click(function(){
			DeleteToDo($(this).prev().text());
		});
        });
		
}
function DeleteToDo(todoItem)
{
	chrome.storage.local.get('list_todo', function (result) {
		var ToDoArray = result.list_todo;
		var i = ToDoArray.indexOf(todoItem);
		ToDoArray.splice(i, 1);
		chrome.storage.local.set({
			"list_todo" : ToDoArray
		}, function () {
			loadToDos();
		});
	});
}
function getLoadingText() {

	var loadingText = ["Life has given us 'REAL EYES'.. to.. 'REALISE'.. the.. \"REAL LIES\"! feel d difference",
		"Failure Is The Opportunity To Begin Again But More Intelligently This Time",
		"You don't have to be great to start, but you have to start to be great.....!",
		"Those who are afraid to fall, will never fly.",
		"It is hard to fail, but it is worse never to have tried to succeed.",
		"Discussion is an exchange of knowledge, argument is an exchange of ignorance....!",
		"Sometimes you have to stand alone to prove that you can still stand.",
		"If someone won't fight for you, they're not right for you.",
		"Every time you subtract Negative from your life, you make room for more Positive!",
		"Walking with a friend in the dark is better than walking alone in the light."];
	$("#idRandomThought").text('"' + loadingText[Math.floor(Math.random() * loadingText.length)] + '"');
}
function startTime() {
	var today = new Date();
	var h = today.getHours();
	var m = today.getMinutes();
	var s = today.getSeconds();
	m = checkTime(m);
	s = checkTime(s);
	document.getElementById('txt').innerHTML =
		h + ":" + m + ":" + s;
	var t = setTimeout(startTime, 500);
}
function checkTime(i) {
	if (i < 10) {
		i = "0" + i
	}; // add zero in front of numbers < 10
	return i;
}
