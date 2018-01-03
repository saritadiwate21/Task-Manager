
$(document).ready(()=>{
	var arr=[];
	var res=[];

	var uname,password;
	var session,sessionp,local,localp;
    

// input placeholder moves as a label

$('#task').focusin(function(e){
    $('#l1').addClass('show1');
    $(this).attr('placeholder','');
}).focusout(function(e){
    $('#l1').removeClass('show1');
    $(this).attr('placeholder','Add new task & press enter');
});


   // hide close button in input
   $('#btn-close').addClass('hide1');

// close button shows as key up in input

$('#task').keyup(function(e){
	console.log(e);
	if($(this)!=''){
		$('#btn-close').addClass('show1');	
	}
	if($(this).val()===''){
	$('#btn-close').removeClass('show1');		
	}
		 
});

// close button hides as in input is blank
$('#btn-close').click(function(){
	$(this).removeClass('show1');
});



// Add tak in form and show it into list
$('#form1').on('submit',(e)=>{
	// take text from text field
	let searchText1 = $('#task').val();
		// if textfiled is not null/empty
	if(searchText1 != ''){
		// if array is empty
	if(arr.length==0){
		// add item to list array
	arr.push(searchText1);
	// call fun to add list
	addList(searchText1);
	$('#task').val('');
	}
	else{  //array is not empty
			if(arr.indexOf(searchText1)!= -1){
				let output =`
					<div class="alert alert-danger alert-dismissable fade show fixed-bottom w-50">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					Please do not enter the duplicate task</div>
					`;

				$('#div-main1').append(output);
			}
			else{
				arr.push(searchText1);
				addList(searchText1);
				$('#task').val('');

			}
		}
	}
else{
			let msg = `
					<div class="alert alert-danger alert-dismissable fade show fixed-bottom w-50">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					Please enter task</div>
					`;
	$('#div-main2').append(msg);
}
	e.preventDefault();
});



// show close button to list
$(document).on({
    mouseenter: function(){
        $(this).find('span').removeClass("hide");
 		
        $(this).find('span').addClass("show");
 		

    }, 
    mouseleave: function(){
         $("#div2 ul li span").removeClass("show");
        $("#div2 ul li span").addClass("hide");
    }
},"#div2 ul li");


// remove task after clicking on close button
$(document).on({
    click: function(){
    	let val = $("input[type=checkbox]").val();
    	for(let i=0;i<arr.length;i++){
    		if(arr[i]==val)
    			arr.splice(i,1);
    	}
    	console.log("deleted array"+arr);
        $(this).parent().remove();
 
}},"#div2 ul li span");



// deleting item of completed task list after unchecked task
$(document).on({
	change: function(){
    	let checkbox = $(this);
    	var listItems = $("#div3 ul li");
        var product;
        var val;
//add checked task to div 3 list - completed 
    	let output1='';
    	if (checkbox.is( ":checked" )){
    		res.push(checkbox.val());
    		console.log("checked "+checkbox.val());
			output1 +=`
			<li class="border pl-5 p-1 list-unstyled-item" id="${checkbox.val()}">
  			${checkbox.val()}
			</li>
			`;
		$('#div3 ul').append(output1);    	
	}
	else{    //uncheck task  - delets from div 3 list
		for(let i=0;i<res.length;i++){
			if(res[i]==checkbox.val()){
				listItems.each(function(idx, li) {
        		product = $(li);
				console.log(res);
				 if(checkbox.val()==product['0'].innerText){
                    product['0'].remove();
                }
				});
				res.splice(i,1);	
			}
			console.log(res);
			console.log("unchecked"+checkbox.val());
		}	

    }
    if(res.length>0){
    	$('#divb3').html('<div id="d1"><button type="submit" class="btn btn-default w-50 p-1" id="save-btn">SAVE</button></div>');
    }
    else{
    	$('#divb3').html('');
    }
}},"#div2 ul li input:checkbox");

// //remove from arr when clicking on li remove icon
// $('#div2 ul li span #li-close').click(function(){
// 	for(let i=0;i<arr;i++){
// 		if(arr[i]==){}
// 	}
// }) ;   


  checkLoginStatus();
	



$("#login-form").submit((e)=>{
  uname = $("#uname").val();
 password = $("#pwd").val();
  obj ={
		uname:uname,
		pwd:password,
		tasks:[]

	};
 $(".welcome-user").text("Welcome "+uname);
 $('#myModal').modal('toggle');
 
 console.log($("#remembermechk").is(':checked'));
 
 if($("#remembermechk").is(':checked')){
   
  localStorage.setItem("info",JSON.stringify(obj));
 }
 else{
 	   sessionStorage.setItem("info",JSON.stringify(obj));
 }

 $("#login-btn").addClass('hide1');
 
  e.preventDefault();
});


// Logout Button
$("#logout-btn").click(()=>{
	session = sessionStorage.getItem("info");
	local=localStorage.getItem("info"); 
  	if(session){
  sessionStorage.removeItem("info");
}
else{
	localStorage.removeItem("info");	
}

   location.reload();


});




// Save button
$(document).on("click","#save-btn",function(){
	session = sessionStorage.getItem("info");
	local=localStorage.getItem("info");
	var listItems1 = $("#div2 ul li");
	let out2='';

				out2+=`
					<div class="alert alert-danger alert-dismissable fade show fixed-bottom w-50">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					Please first log in</div>
					`;
 if(session == null && local ==null || session==undefined && local==undefined){
  				
				$('#div-main1').append(out2);
			}

  else{
  		if(session){
	sessionp = JSON.parse(session);
  	alert("Hello "+sessionp.uname);
  	console.log("unae "+sessionp.uname+" pwd "+sessionp.pwd);
  	
 	console.log(res.length);
  		
  		if(sessionp.tasks=='' && res!=''){
  			sessionp.tasks = res;
  		}
  		 else{
  		 	 $.each(res,function(index,item){
  		 	 		sessionp.tasks.push(item);
    			
	 		});  
  		 }

  console.log("Arr "+sessionp.tasks);
    var updatedSessionObj = {
    	uname:sessionp.uname,
		pwd:sessionp.pwd,
		tasks:sessionp.tasks
    };
    console.log(updatedSessionObj);
    sessionStorage.setItem("info",JSON.stringify(updatedSessionObj));


var session1 = sessionStorage.getItem("info");
var sessionp1=JSON.parse(session1);
    for(let i=0;i<sessionp1.tasks.length;i++){
		listItems1.each(function(idx, li) {
        		product = $(li);
				 if(sessionp1.tasks[i]==product['0'].id){
				 	for(let j=0;j<arr.length;j++){
				 		if(arr[j]==product['0'].id)
				 			arr.splice(j,1);
				 	}
                    product['0'].remove();
                }
				});
		console.log(sessionp1.tasks[i]);
		}

  }
  else{
  	localp = JSON.parse(local);
  	// obj.tasks=res;
  	// localStorage.setItem("info.tasks",obj.tasks);
  	alert("Hello "+localp.uname);

 var updatedLocalObj = {
    	uname:localp.uname,
		pwd:localp.pwd,
		tasks:localp.tasks
    };
    console.log(updatedLocalObj);
    localStorage.setItem("info",JSON.stringify(updatedLocalObj));

  	for(let i=0;i<localp.tasks.length;i++){
		listItems1.each(function(idx, li) {
        		product = $(li);
				 if(localp.tasks[i]==product['0'].id){
				 	for(let j=0;j<arr.length;j++){
				 		if(arr[j]==product['0'].id)
				 			arr.splice(j,1);
				 	}
                    product['0'].remove();
                }
				});

	}
  }
}
	res=[];
	console.log(res);

});


// end of document.ready
});


// Adding to list -display in list
function addList(t){
			console.log("T is "+t);
			let output='';
			output +=`<li class="border pl-5 list-unstyled-item" id="${t}">
			<div class="checkbox">
  			<input type="checkbox" value="${t}">
  			<label class="ml-3 mr-5">${t}</label>
  			<span class='pl-4 pr-2 hide' id="li-close">x</span>
			</div>
			</li>
			`;
		$('#div2 ul').append(output);
};

function checkLoginStatus(){
	// console.log("res "+res);
	session = sessionStorage.getItem("info");
	local = localStorage.getItem("info");
	console.log(session);
	console.log(local);
	if(session==null && local==null) {
		$("#myModal").modal();
			
			}

			else{
				if(session){	  
				sessionp = JSON.parse(session);
	 		 $(".welcome-user").text("Welcome "+sessionp.uname);
	 		 $("#login-btn").addClass('hide1');
	 			}
	 		else{
	 			localp = JSON.parse(local);
	 		 $(".welcome-user").text("Welcome "+localp.uname);
	 			$("#login-btn").addClass('hide1');
	 			}
	 	}
 
	 	
}