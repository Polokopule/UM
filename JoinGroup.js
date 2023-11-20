$(document).ready(function() {
    // Define your Firebase project URL
    var firebaseDatabaseURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';

    // Function to join a group
    function joinGroup(enterPin, enterId) {
        $.ajax({
            url: firebaseDatabaseURL + "JoinUsers.json",
            type: "GET",
            success: function(joinUserData) {
                var userExists = false;
                var joinedGroupId = null;

                // Check if the user already exists in JoinUsers.json and get the joined group ID
                $.each(joinUserData, function(key, userData) {
                    var Cod = localStorage.getItem("id");
                    if (Cod == userData.GbyId) {
                        userExists = false;
                        joinedGroupId = userData.GId; // Store the joined group's ID
                        return false; // Exit the loop
                    }
                });

                if (userExists) {
                    alert("You are already a member of a group (Group ID: " + joinedGroupId + "). You cannot join another group.");
                } else {
                    // User is not in JoinUsers.json, proceed to join the group
                    $.ajax({
                        url: firebaseDatabaseURL + "groups.json",
                        type: "GET",
                        success: function(data) {
                            var foundGroup = null;

                            $.each(data, function(key, value) {
                                if (enterId == value.GId && enterPin == value.GPin) {
                                    foundGroup = value;
                                    return false; // Exit the loop since the group was found
                                }
                            });

                            if (foundGroup) {
                                // You've found a matching group
                                alert("Correct group: You are now a member of: " + foundGroup.GName);

                                // Add user to JoinUsers.json
                                var joinedId = localStorage.getItem("id");
                                var joinedName = localStorage.getItem("user");
                                $("#found").empty(); 
                                $.ajax({
                                    url: firebaseDatabaseURL + "JoinUsers.json",
                                    type: "POST",
                                    data: JSON.stringify({
                                        GName: foundGroup.GName,
                                        GPin: foundGroup.GPin,
                                        GId: foundGroup.GId,
                                        GDis: foundGroup.GDis,
                                        GbyId: joinedId,
                                        GbyjoinedName: joinedName,
                                        GbyBg: foundGroup.GbyBg,
                                        GbyL: foundGroup.GbyL,
                                        status: "member"
                                    }),
                                    contentType: "application/json",
                                    success: function(response) {
                         $("#found").append(`<br><div class="frcard">
	<div class="frPp" style="width:30px;height:30px;">
		<b></b>
		</div>
		<div class="frDetail">
			
			<b>${foundGroup.GName}</b><br>
				Group Found
			</small>
			</div>
	</div> `);        
	    alert("You joined the group");
	      $("j").val("");
       $("j").val("Group Found¡");
	    
                                    },
                                    error: function(error) {
                                        console.error("Error adding data:", error);
                                        alert("Error joining");
                                    }
                                });
                            } else {
                                // No matching group found
                                alert("Incorrect group credentials");
                            }
                        },
                        error: function(error) {
                            console.error("Error retrieving groups:", error);
                        }
                    });
                }
            },
            error: function(error) {
                console.error("Error checking user data:", error);
            }
        });
    }

    // Submit form to join a group
    $("#JoinNew").submit(function(event) {
        event.preventDefault();
        var enterPin = $("#enterPin").val();
        var enterId = $("#enterId").val();
      
       $("j").val("");
       $("j").append("Searching for your group..");
        joinGroup(enterPin, enterId);
        return false;
    });
});
