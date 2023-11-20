$(document).ready(function() {
						 	
            // Define your Firebase project URL
            
          
            
            var UnitersURL= 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
            // Function to add data to Firebase
             
             	  
                $.ajax({
                    url: UnitersURL + "users.json",
                    type: "GET",
                    success: function(data) {
                        
                     
                     

                        // Loop through the data and display it
                     $("#unite").empty();      $.each(data, function(key, value) {
                            var ph = value.phone;
                            var pss = value.pass;
             var nm = value.username;   
                     
                  var id= value.id;          
                  var bio = value.bio;          
                  var letter= value.fletter;          
                  
              var  cId  = localStorage.getItem("id"); 
    var htm =`
    <div class="frcard">
	<div class="frPp">
		<b>${letter}</b>
		</div>
		<div class="frDetail">
			<a href='#'> View Profile</a>
			<b>${nm}</b><br>
				${bio}
			</small>
			</div>
	</div>
	`;
if(id != cId){
    $("#unite").append(htm);
    }
           });
                    },
                    error: function(error) {
                        console.error("Error retrieving data:", error);
                       // alert("error getting Uniters...");
                    }
                });
                
                
            
});
        
        
			
					
					
