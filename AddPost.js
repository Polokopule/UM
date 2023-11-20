$(document).ready(function() {
            // Define your Firebase project URL
            
             var bg= localStorage.getItem('bg');
                          var name= localStorage.getItem('user');
              var l= localStorage.getItem('Fletter');
             $("#lett").append(l);
             $("#name").append(name);
             $("#info").css(
             {
             	    "background-color":bg
             }
                 );
                 
                 $("#b").css(
             {
             	    "border-left":"3px solid"+bg
             }
                 );
                 
                 $("#edit").css(
             {
             	    "background-color":bg
             }
                 );
                 $("#letterU").css(
             {
             	    "background-color":bg
             }
                 );
                 
                 var Fletter= localStorage.getItem('Fletter');
           var bg= localStorage.getItem('bg');
          
            $("#letter").append(Fletter);   $("#letter").empty();
            
            $("#letter").append(Fletter);
         
             $("#letter").css(
             {
             	    "background":bg
             }
                 );
             
             $("#your").append(name);
            $("#AppT").append(name+ "|Home");
            
                 
                 
            var firebaseDatabaseURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
            // Function to add data to Firebase
            function addData(username,title, dis,time,fletter,bg,ptag,id,PostId) {
                $.ajax({
                    url: firebaseDatabaseURL + "Posts.json",
                    type: "POST",
                    data: JSON.stringify({ 
         username: username,
         title:title,
          dis: dis,
          time:time,
          fletter:fletter,
          bg:bg,
          tags:ptag,
          id:id,
         idP:PostId
            }),
                    contentType: "application/json",
                    success: function(response) {
                    
                	
    
                        
                  var postedMsg = "Your Experience is now shared";
                  $("#feed").append(`<span class="postedMsg">${postedMsg}</span>`);
                  $("#letter").append(Fletter);
           function postedMsg(){
               
           
             $(".postedMsg").css(
             {
             	    "display":"none"
             });
             $(".NewPost").css(
             {
             	    "display":"none"
             }
             
                 );
             }
             
            
             setTimeout(postedMsg,1000);
                $("#disPost").val("");  
                  $("#btnS").val("Posted"); 
               //))   getAll();
                  l
                    },
                    error: function(error) {
                        console.error("Error adding data:", error);
                        alert("Error:"+error)
                    }
                });
            }

            // Submit form to add data
            $("#PostForm").submit(function(event) {
                event.preventDefault();
       
                
             var	title ="My Exprience";
                
                var dis = $("#disPost").val();
         const PostId= Math.floor(Math.random()*1000000);
    
                
                         var id = localStorage.getItem('id'); 
                         var username= localStorage.getItem('user');    
           const hashtags = dis.match(/#\w+/g);

if (hashtags) {
  for (const hashtag of hashtags) {
   var ptag = hashtag;
  }
}
            	$("#btnS").val("Working on it....");     
            
               var fletter= localStorage.getItem('Fletter');
           var bg= localStorage.getItem('bg');
 
            var date= new Date();
          
            
            var time = date.getMinutes();
            
       // alert(dis.length)
        
        	
addData(username,title, dis,time,fletter,bg,ptag,id,PostId);
       


                
            });
        });
        
        
        
