$(document).ready(function() {
						 	
            // Define your Firebase project URL
            
          
            
            var UnitersURL= 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
            // Function to add data to Firebase
             
             	  
                $.ajax({
                    url: UnitersURL + "Notify.json",
                    type: "GET",
                    success: function(data) {
                        
                     
                     

                        // Loop through the data and display it
                     $("#getNotify").empty();      $.each(data, function(key, notify) {
                            
                            var fromId = notify.fromId;
                            var fromN = notify.fromN;
                            var said = notify.said;
                            var thisPost = notify.thisPost;
                            var toId =  notify.toId;
                            var toN = notify.toN;
                            
              var  CId  = localStorage.getItem("id"); 
    var htm =`
    
	 <div class="notification">
        <div class="notify">
            <img src="notify.png" alt="" >
        </div>
        <div class="notifyText">
            
            <span><b>${fromN}</b> Added Opinion to Your Experience </span>
        </div>
    </div>
	
	
	`;
if(toId == CId){
    $("#getNotify").append(htm);
    
    }
           });
                    },
                    error: function(error) {
                        console.error("Error retrieving data:", error);
                        //alert("error getting Uniters...");
                    }
                });
                
                
            
});
        
        
			
					
					