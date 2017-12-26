
$(document).ready(()=>{
	var arr=[];
	var res=[];
	// var obj = {};
   var uname = '';
  checkLoginStatus();
	$('#btn-close').addClass('hide1');


$('#task').focusin(function(e){
    $('#l1').addClass('show1');
    $(this).attr('placeholder','');
}).focusout(function(e){
    $('#l1').removeClass('show1');
    $(this).attr('placeholder','Add new task & press enter');
});


$('#task').keyup(function(e){
	console.log(e);
	if($(this)!=''){
		$('#btn-close').addClass('show1');	
	}
	if($(this).val()===''){
	$('#btn-close').removeClass('show1');		
	}
		 
});


$('#btn-close').click(function(){
	$(this).removeClass('show1');
});


$("#login-form").submit((e)=>{
 let uname = $("#uname").val();
 let password = $("#pwd").val();
 var obj;
 //console.log(uname+" "+password);
 $(".welcome-user").text("Welcome "+uname);
 $('#myModal').modal('toggle');
 console.log($("#remembermechk").is(':checked'));
 if($("#remembermechk").is(':checked')){
  obj ={
		uname:uname,
		pwd:password,
		tasks:['a','s','f']

	};
	console.log(obj);
    
    localStorage.setItem("info",JSON.stringify(obj));
   	// localStorage.setItem("uname",uname);
    // localStorage.setItem("pwd",password);
 }else{
 	  obj ={
		uname:uname,
		pwd:password,
		tasks:['a','s','f']

	};
 	   sessionStorage.setItem("info",JSON.stringify(obj));
 	// sessionStorage.setItem("uname",uname);
  //   sessionStorage.setItem("pwd",password);
 }
 $("#login-btn").addClass('hide1');
 
  e.preventDefault();
});

// Logout Button
$("#logout-btn").click(()=>{
   // localStorage.removeItem("info");
  sessionStorage.removeItem("info");
  
   location.reload();


});


$('#form1').on('submit',(e)=>{
	let searchText1 = $('#task').val();
	var f=0; 
	if(searchText1 != ''){
	if(arr.length==0){
	arr.push(searchText1);
	getMovies(searchText1);
	$('#task').val('');
	}
	else{
		for(let i=0;i<arr.length;i++){
			if(arr[i]==searchText1){
				// alert("Please do not enter duplicate task");
				let o='';
				o+=`
					<div class="alert alert-danger alert-dismissable fade show fixed-bottom w-50">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					Please do not enter the duplicate task</div>
					`;

				$('#div-main1').append(o);

				f=1;
				i=arr.length;
			}			
		}
		if(f==0){
			arr.push(searchText1);
			getMovies(searchText1);
			$('#task').val('');
		}
	}
}else{
	var m = `
<div class="alert alert-danger alert-dismissable fade show fixed-bottom w-50">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					Please enter task</div>
					`;
	$('#div-main2').append(m);
}
	e.preventDefault();
});




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

// Save button
$(document).on("click","#save-btn",function(){
  //console.log("--> "+localStorage.getItem("uname"));
 // var username = JSON.parse(localStorage.getItem("info"));
var username1 = JSON.parse(sessionStorage.getItem("info")); 
 if(username1 ==null){
  					let o2='';
				o2+=`
					<div class="alert alert-danger alert-dismissable fade show fixed-bottom w-50">
					<button type="button" class="close" data-dismiss="alert">&times;</button>
					Please first log in</div>
					`;

				$('#div-main1').append(o2);

  }
  else{
   // alert("Hello "+username.uname);
  	alert("Hello "+username1.uname);
  }
});

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

$(document).on({
	change: function(){
    	let checkbox = $(this);
    	var listItems = $("#div3 ul li");
        var product;
        var val;

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
	else{
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
}},"#div2 ul li input:checkbox");
    

});

function getMovies(t){
			console.log("T is "+t);
			let output='';
			output +=`<li class="border pl-5 list-unstyled-item">
			<div class="checkbox">
  			<input type="checkbox" value="${t}">
  			<label class="ml-3 mr-5">${t}</label>
  			<span class='pl-4 pr-2 hide'>x</span>
			</div>
			</li>
			`;
		$('#div2 ul').append(output);
};

function checkLoginStatus(){
	// var obj = {
	// 	uname:"",
	// 	pwd:"",
	// 	tasks:[]

	// };
   
	// var username = JSON.parse(localStorage.getItem("info"));
	// var username1 = JSON.parse(sessionStorage.getItem("info"));
	
    var local = localStorage.getItem("info");
    console.log(local);
    var session = sessionStorage.getItem("info");
    var localp = JSON.parse(local);
    var sessionp = JSON.parse(session);
      
	
	  if(session==null && local==null){
	  	console.log("its nul");

	  }else{
	  	console.log("show login");
	  }
	if(session==null||session==undefined
	 // || local==null || local==undefined
	 ){
		$("#myModal").modal();
}else{
	 // $(".welcome-user").text("Welcome "+localp.uname);
	 // if(localp.uname){
	 //  	 $(".welcome-user").text("Welcome "+localp.uname);
	 //  	}else 
	  	if(sessionp.uname){
	 		 $(".welcome-user").text("Welcome "+sessionp.uname);
	 	}
	 	$("#login-btn").addClass('hide1');
}
}