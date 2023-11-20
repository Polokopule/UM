
function SendMsg(id, GName) {
      alert(GName);
    alert("Sending message to group with ID: " + id);
    var userN = localStorage.getItem("user");
    var uId = localStorage.getItem("id");
    var mid = Math.floor(Math.random() * 100000);
   var input = document.getElementById(id).value;
    var UnitersURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
    $.ajax({
        url: UnitersURL + "messages.json",
        type: "POST",
        data: JSON.stringify({
            msg: input,
            msgId: mid,
            by: userN,
            byId: uId,
            toGN: GName,
            toGId: id
        }),
        contentType: "application/json",
        success: function(response) {
            alert("Message sent");
        },
        error: function(error) {
            console.error("Error adding data:", error);
            alert("Error sending message");
        }
    });
}
       
$(document).ready(function() {
    // Define your Firebase project URL
  
     
                 
    var UnitersURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
    
    // Function to add data to Firebase
    $.ajax({
        url: UnitersURL + "JoinUsers.json",
        type: "GET",
        success: function(data) {
            // Loop through the data and display it
            $("#listg").empty();
            var cId = localStorage.getItem("id");

            // Create an array to keep track of joined GIds for this user
            var joinedGIds = [];

            $.each(data, function(key, value) {
                var gN = value.GName;
                var GId = value.GId;
                var link = "group/" + gN + "/id=" + GId;

                // Check if the user is already a member of this GId
                if (value.GbyId === cId) {
                    if (!joinedGIds.includes(GId)) {
                        // Add this GId to the list of joined groups
                        joinedGIds.push(GId);

                        var htm = `
                        <div class="frcard">
                            <div class="frPp">
                                <img src="img/9t.png" alt="">
                            </div>
                            <div class="frDetail">
                                <a href='#${link}'> Open Group</a>
                                <b>${gN}</b><br>
                                groupId: ${GId}<br>
                                Pin: ${value.GPin}
                                
                            </div>
                        </div>
                        <div id="${link}" class="groupChat">
                            <div class="person" style="background:${value.GbyBg};">
                                <div class="Gprofile" style="background:#f2f2f2;"> <img src="img/9t.png" alt="" width="20"></div>
                                <div class="Udetails">
                                    <b>${gN}</b>
                                    <span>You are a ${value.status} in this group</span>
                                </div>
                            </div>
                            <br><br><br><br>
                            <div class="chat" id="Msg${GId}">
                                <!-- Messages for this group -->
                            </div>
                            <div class="mForm">
                                       <textarea placeholder="Send message:${GId}" id="${GId}" height="30px" style="height:auto;"></textarea>
                                <input type="button" onclick="SendMsg(${GId},'${gN}')" value="Send">
                 
                            </div>
                        </div>
                        `;
                        
                        
                               var UnitersURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
                       function groupGet(){
                        $.ajax({
                            url: UnitersURL + "messages.json",
                            type: "GET",
                            success: function(data) {
                                $("#Msg" + GId).empty();
                                $.each(data, function(key, text) {
                                    if (text.toGId == GId) {
                                        var chat;
                                        if (text.byId == cId) {
                                            chat = `
                                            <div class="mine messages">
                                                <div class="message">
                                                    ${text.msg}
                                                </div>
                                            </div>`;
                                        } else {
                                            chat = `
                                            <div class="yours messages">
                                                <small>${text.by}</small>
                                                <div class="message">
                                                    ${text.msg}
                                                </div>
                                            </div>`;
                                        }
                                        
                                        
                                        $("#Msg" + GId).append(chat);
                                        
                                        
                                        }
                                                                           
                                    
                                });
                                
                            },
                            error: function(error) {
                                console.error("Error retrieving data:", error);
                                //alert("error getting messages...");
                            }
                        });
}
                        $("#listg").append(htm);
                     setInterval(groupGet,100);
                    }
                }
            });
        },
        error: function(error) {
            console.error("Something went wrong", error);
            //alert("Error getting groups");
        }
    });



 
});
