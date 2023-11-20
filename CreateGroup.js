$(document).ready(function() {
    // Define your Firebase project URL
    var firebaseDatabaseURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';

    //var Fletter; // Declare Fletter outside the function

    // Function to add data to Firebase
    function   AddGroup(
                  GName,
                  GPin,
                  GIdNew,
                  GbyId,
                  GbyName,
                  GbyBg,
                  GbyL
                  
                  
              ) {
              var CId = localStorage.getItem("id");
        $.ajax({
            url: firebaseDatabaseURL + "groups.json",
            type: "POST",
            data: JSON.stringify({
                 GName:GName,
                  GPin:GPin,
                  GId:GIdNew,
                  GbyId:GbyId,
                  GbyName:GbyName,
                  GbyBg:GbyBg,
                  GbyL:GbyL
            }),
            contentType: "application/json",
            success: function(response) {
             //Mark as joined/Admin
             $.ajax({
            url: firebaseDatabaseURL + "JoinUsers.json",
            type: "POST",
            data: JSON.stringify({
               GName:GName,
                  GPin:GPin,
                  GId:GIdNew,
                  GbyId:CId,
                  GbyName:GbyName,
                  GbyBg:GbyBg,
                  GbyL:GbyL,
                  status:"Admin"
            }),
            contentType: "application/json",
            success: function(response) {
                alert("Your Admin")
                alert("Id:"+GIdNew)
            },
            error: function(error) {
                console.error("Error adding data:", error);
                
                
                alert("Error joining");
            }
        });
    

	
	
             
             //end
            alert("group Created") 
             
                       },
            error: function(error) {
                console.error("Error adding data:", error);
                
                
                alert("Error creating group");
            }
        });
    }

    // Submit form to add data
    $("#createNew").submit(function(event) {
        event.preventDefault();
       
        var GName= $("#GName").val();
        var GPin= $("#GPin").val();
       
       var GbyName = localStorage.getItem("user");
       var GbyId = localStorage.getItem("id");
       var GbyBg = localStorage.getItem("bg");
       var GbyL = localStorage.getItem("Fletter");
        const GIdNew = Math.floor(Math.random() * 1000000);
              AddGroup(
                  GName,
                  GPin,
                  GIdNew,
                  GbyId,
                  GbyName,
                  GbyBg,
                  GbyL
                  
                  
              );
        
    });
});
				
