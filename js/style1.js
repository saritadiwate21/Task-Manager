$(document).ready(function(){
	var arr=[];
    var res = [];
     let loggedinsessionUser;
     let loggedinUserTask =[];
 // Check user is existe in web storage
 let usernameSession = sessionStorage.getItem("info");
 let usernameLocal = localStorage.getItem("info");
//  console.log(usernameSession);
// console.log(usernameLocal);

// check if no user session in  past
if(usernameLocal == null && usernameSession ==null){
  console.log("both are null.Login modal");
   $('#myModal').modal('toggle');

}else{
    console.log(usernameSession);
    if(usernameSession){
    	console.log("not null");
    	   loggedinsessionUser = JSON.parse(usernameSession).uname;
    
	console.log("get data");
    $(".welcome-user").text("Welcome "+loggedinsessionUser);
     $("#login-btn").addClass('hide1');

     loggedinsessionArray = JSON.parse(usernameSession).tasks;
	let output1 ='';
    $.each(loggedinsessionArray,function(index,item){
    		output1 +=`
			<li class="border pl-5 p-1 list-unstyled-item" id="${item}">
  			${item}
			</li>
			`;
		 
    });
    $('#div3 ul').append(output1); 
    }
    else{
    	console.log("localo");
    	console.log("not null");
    	   loggedinsessionUser = JSON.parse(usernameLocal).uname;
    
	console.log("get data");
    $(".welcome-user").text("Welcome "+loggedinsessionUser);
     $("#login-btn").addClass('hide1');

     loggedinsessionArray = JSON.parse(usernameLocal).tasks;
	let output1 ='';
    $.each(loggedinsessionArray,function(index,item){
    		output1 +=`
			<li class="border pl-5 p-1 list-unstyled-item" id="${item}">
  			${item}
			</li>
			`;
		 
    });
    $('#div3 ul').append(output1); 
    }

}


// Login Form Validate rule.
$('#login-form').validate({ // initialize the plugin
        rules: {
            uname: {
                required: true
               
            },
            pwd: {
                required: true
               
            }
        },
         messages: {
            uname: "Required User name Field",
            pwd:"Required Password"
         }
    });

// Login Submit handler
$("#login-form").submit((e)=>{
  let uname = $("#uname").val();
 let password = $("#pwd").val();
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

// Hide login button
 $("#login-btn").addClass('hide1');
 
  e.preventDefault();
});

// Logout Button
$("#logout-btn").click(()=>{
	let session = sessionStorage.getItem("info");
	let local=localStorage.getItem("info"); 
  	if(session){
  sessionStorage.removeItem("info");
}
else{
	localStorage.removeItem("info");	
}

   location.reload();


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
    	let val = $(this).parent().closest('li').attr('id');
    	 console.log(val);
    	for(let i=0;i<arr.length;i++){
    		if(arr[i]==val){
             
    			arr.splice(i,1);

    		}
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
    }
  else{
  	sessionp = JSON.parse(local);
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
    localStorage.setItem("info",JSON.stringify(updatedSessionObj));
 }
	res=[];
	console.log(res);
}

});



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