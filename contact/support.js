var d = new Date();
document.getElementById("date").innerHTML = d;
document.getElementById("date").style.display = "initial";
var support_message_number = 0;
var user_message_number = 0;
var response_message1 = new Array();
var pictureURL;
var iDiv_general = new Array();
var iDiv = new Array();
var iIMG = new Array();
var iDiv_generall = new Array();
var iDivv = new Array();
var iIMGG = new Array();
var pic ="pictures/mahtab.jpg";

/*start chat box, check online supporter and show their properties*/
document.getElementById("popUp_button").addEventListener("click", popUp_click_Function);

function popUp_click_Function(){
	popUp_Function();
	start_chat();
	var myVar;
	check_server_response();
	//recieve_message();
}

function popUp_Function() {
    document.getElementById("popUp_window").style.display = "initial";	
}

function start_chat() {
	axios.get('http://51.15.59.130:46260/start')
	.then(function (response) {
    //console.log(response.data.success);
	var validation = response.data.success;
	if (validation){
     support_info();
	}
	})
  .catch(function (error) {
    console.log(error);
  });
  };
  
function support_info(){
	axios.get('http://51.15.59.130:46260/support')
	.then(function (response) {
	var supporterField = "پشتیبان بخش فروش";
	document.getElementById("supporter_field").innerHTML = supporterField;
	var name = response.data.support.first + " " + response.data.support.last;
	document.getElementById("supporter_name").innerHTML = name;
	pictureURL = response.data.support.picture;
	document.getElementById("supporter_image").src = pictureURL;
	document.getElementById("supporter_image").style.display = "initial";
	document.getElementById("supporter_first_pic").src = pictureURL;

	//console.log(response.data.support.last);
})

  .catch(function (error) {
    console.log(error);
  });
};

/*minimize the pop window*/
document.getElementById("minimize").addEventListener("click", popUp_close_Function);

function popUp_close_Function() {
    document.getElementById("popUp_window").style.display = "none";
	var list_of_messages = document.getElementById("popUp_window_middle");
	var sum_of_messages = support_message_number + user_message_number;
	while (list_of_messages.firstChild) {
    list_of_messages.removeChild(list_of_messages.firstChild);
	}
	support_message_number = 0;
	user_message_number = 0;
}

/*send button*/
document.getElementById("popUp_send").addEventListener("click", popUp_send_Function);

function popUp_send_Function() {
	user_message_number++;
	axios.post('http://51.15.59.130:46260/send', {
	message: document.getElementById("popUp_input_id").value
  })
  .then(function (response) {
	  if(user_message_number == 1){
		document.getElementById("user_start_message").innerHTML = document.getElementById("popUp_input_id").value;
		document.getElementById("user_start_message").style.display = "initial";
		document.getElementById("user_first_pic").style.display = "initial";
	  }
	  
	  else{
		iDiv_generall[user_message_number] = document.createElement("div");
		iDiv_generall[user_message_number].className = "other_user_message";
		//create message node
		iDivv[user_message_number] = document.createElement("div");
		iDivv[user_message_number].className = "user_next_message";
		iDiv_generall[user_message_number].appendChild(iDivv[user_message_number]); 
		//create image node
		iIMGG[user_message_number] = document.createElement("IMG");
		iIMGG[user_message_number].className = "user_next_pic";
		iDiv_generall[user_message_number].appendChild(iIMGG[user_message_number]); 
		//add general div to middle box
		document.getElementById("popUp_window_middle").appendChild(iDiv_generall[user_message_number]); 
		//get style of picture
		var array_counterr = user_message_number - 2;
		var ux = document.getElementsByClassName("user_next_pic")[array_counterr];  
		ux.style.position = "absolute";
	    ux.style.borderStyle = "none";	
		ux.style.borderRadius = "24px";
		var top_tempp1 = 105;
		var top_tempp2 = 135 * (user_message_number - 1);
		var top_tempp3 = top_tempp1 + top_tempp2;
		var top_tempp4 = top_tempp3.toString();
		var strr2 = "px";
		var ress = top_tempp4.concat(strr2);
		ux.style.top = ress;
		ux.style.left = "3%";
		ux.style.height = "40px";
	    ux.style.width = "40px";
		ux.src = pic;
		
		//get style of message
		var vx = document.getElementsByClassName("user_next_message")[array_counterr];
		vx.style.position = "absolute";		
		vx.style.borderStyle = "none";	
		vx.style.borderRadius = "5px";
		var top_tempp11 = 105;
		var top_tempp21 = 135 * (user_message_number - 1);
		var top_tempp31 = top_tempp1 + top_tempp21;
		var top_tempp41 = top_tempp3.toString();
		var strr21 = "px";
		var ress1 = top_tempp41.concat(strr21);
		vx.style.top = ress1;
		//tx.style.top = "38.5%";
		vx.style.left = "22.5%";
		vx.style.height = "24px";
		vx.style.width = "180px";
		vx.style.backgroundColor  = "white";
		vx.style.fontFamily = "Shabnam";
		vx.style.fontSize = "10px";
		vx.style.textAlign = "center";
		vx.style.paddingTop = "11px";
		vx.style.direction = "rtl";
		vx.innerHTML = document.getElementById("popUp_input_id").value;
	  }
  })
  .catch(function (error) {
    console.log(error);
});
};
  
/*recieve*/
function recieve_message() {
	//if (support_message_number == user_message_number){
	support_message_number++;
	axios.get('http://51.15.59.130:46260/fetch')
	.then(function (response) {
		if(support_message_number == 1){
			response_message = response.data.responses[0].message;
			document.getElementById("supporter_first_pic").style.display = "initial";
			document.getElementById("supporter_start_message").innerHTML = response_message;
			document.getElementById("supporter_start_message").style.display = "initial";
		}
		
		else{
			response_message1[support_message_number] = response.data.responses[0].message;
			console.log(support_message_number + response_message1[support_message_number]);
			//create general div including these two
			iDiv_general[support_message_number] = document.createElement("div");
			iDiv_general[support_message_number].className = "other_supporter_message";
			//create message node
			iDiv[support_message_number] = document.createElement("div");
			iDiv[support_message_number].className = "supporter_next_message";
			iDiv_general[support_message_number].appendChild(iDiv[support_message_number]); 
			//create image node
			iIMG[support_message_number] = document.createElement("IMG");
			iIMG[support_message_number].className = "supporter_next_pic";
			iDiv_general[support_message_number].appendChild(iIMG[support_message_number]); 
			//add general div to middle box
			document.getElementById("popUp_window_middle").appendChild(iDiv_general[support_message_number]); 
			//get style of picture
			var array_counter = support_message_number - 2;
			var rx = document.getElementsByClassName("supporter_next_pic")[array_counter];
			rx.style.position = "absolute";
			rx.style.borderStyle = "none";	
			rx.style.borderRadius = "24px";
			var top_temp1 = 35;
			var top_temp2 = 135 * (support_message_number - 1);
			var top_temp3 = top_temp1 + top_temp2;
			var top_temp4 = top_temp3.toString();
			var str2 = "px";
		    var res = top_temp4.concat(str2);
			rx.style.top = res;
			rx.style.right = "3%";
			rx.style.height = "35px";
			rx.style.width = "35px";
			rx.src = pictureURL;
			
			//get style of message
			var tx = document.getElementsByClassName("supporter_next_message")[array_counter];
			tx.style.position = "absolute";		
			tx.style.borderStyle = "none";	
			tx.style.borderRadius = "5px";
			var top_temp11 = 35;
			var top_temp21 = 135 * (support_message_number - 1);
			var top_temp31 = top_temp1 + top_temp21;
			var top_temp41 = top_temp3.toString();
			var str21 = "px";
		    var res1 = top_temp41.concat(str21);
			tx.style.top = res1;
			//tx.style.top = "38.5%";
			tx.style.right = "19.5%";
			tx.style.height = "24px";
			tx.style.width = "180px";
			tx.style.backgroundColor  = "white";
		    tx.style.fontFamily = "Shabnam";
			tx.style.fontSize = "10px";
			tx.style.textAlign = "center";
			tx.style.paddingTop = "11px";
			tx.style.direction = "rtl";
			tx.innerHTML = response_message1[support_message_number];
			
			//console.log(support_message_number, response_message1[support_message_number]);			
	}

	})
   .catch(function (error) {
    console.log(error);
  });
	};

function check_server_response() {
	//var i = -1;
	myVar = setInterval(recieve_message, 10000);
}








