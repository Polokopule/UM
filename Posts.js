	
						 $(document).ready(function() {
						 	
            // Define your Firebase project URL
            
            var PostsURL = 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
            // Function to add data to Firebase
             function getAll(){
             	  
                $.ajax({
                    url: PostsURL + "Posts.json",
                    type: "GET",
                    success: function(data) {
             //Clear the loading Posts           
           
						$("#feed").empty();  
     $("#myPosts").empty();
                  
           //Fetch All Posts
               $.each(data, function(key, value) {
                     	
                    var idP = value.idP;
                  
                    
                    var title = value.title;
                    var dis = value.dis;

			 var paragraphs = dis.split('\n'); // Split by newline to identify paragraphs
    var modifiedDis = paragraphs.join('<br><br>');

    // Update the 'dis' variable with the modified content
    dis = modifiedDis;
                    var id = value.id;
                    
                    var time = value.time;
                    var date= new Date();
          
            
            var timeNow = date.getMinutes();
            
                    
                        var ptags = value.tags;
                    var byletter = value.fletter;
                    var bybg = value.bg;
                    
                    
                    	var tag =ptags;
                   
                    var username = value.username;
      localStorage.setItem('toN',username);
         localStorage.setItem('toId',id);
                  localStorage.setItem('idP',idP);
                
         
var href = idP;
localStorage.setItem('thisPost',href);
             
var commentCount = Object.keys(data).length;
             var formId = "CommentForm" + commentCount;
                      
                    if(dis.length  > 100) {
                        $(".txx").css(
             {
             	    "font-size":"20px"
             });
        
                    } 
                      
                   var html = `	<div class="card">
	<div class="Cdetail">
		<div class="pp" style="background:${bybg};">${byletter} 
	</div>
		<span class="user">
			<b style="font-weight: bolder;">${username}  <img src="5k.png" alt="" width="10px"></b> <i>${time}min  ago - @${idP}</i>
			</span>
		</div>
		<br>
	<div class="Cimg">
		<div class='productView'>
			
					<div  class="text" style="border-left:2px solid ${bybg};">
			<b>@ ${title}</b><br><article>
<p class="txx">${dis}</p></div>
		<div class="btn" id="tags">
			
				  
					
				<!-- Check if 'tag' is true before displaying the label -->
${tag ? `<label>${tag}</label>` : ''}	 
						
				
						</article>
		
			</div></div>
		

		<a href="#${href}">Opinions </a>
	
						<div id="${href}" class="comments">
				<div class="card">
	<div class="Cdetail">
		<div class="pp" style="background:${bybg};">${byletter}</div>
		<span class="user">
			<b>[@]/${username}</b> <i>${time} ago </i>
			</span>
		</div>
		<br>
	<div class="Cimg">
		<div class='productView'>
			
					<div class="text">
			<b>@ ${title}</b><br><p >
${dis}</p>
		<div class="btn" id="tags">
			
				  
					
				<!-- Check if 'tag' is true before displaying the label -->
${tag ? `<label>${tag}</label>` : ''}	
						
				
						</div>
		
			</div></div>
		

					</div>
	Others Opinion
	
	 <form class="CommentForm" data-idp="${idP}" action="javascript:void(0);">
      <div class="Cmon" id="Cmon1">
        <input type="text" placeholder="Write your opinion to  ${username}" id="commentText" name="commentText">
        <input type="submit" value="Comment">
      </div>
    </form>
    <div id="All${idP}">
	
			</div>
			</div>
					`;
					 $("#"+href).click(function() {
        // Clear the interval when the link is clicked
        clearInterval(intervalID);
    });
					
					var CommentsURL= 'https://unitemedia-96620-default-rtdb.firebaseio.com/';
$.ajax({
                url: CommentsURL + "Comments.json",
                type: "GET",
                success: function(commentsData) {
             


                
                    $.each(commentsData, function(commentKey, comment) {
                        var commentId = comment.idComment;
                        var byUser = comment.username;
                        var byText = comment.CText;
                        var postId = comment.idPost;
                        
               var Fletter = comment.Fletter;      
               
               var bg= comment.bg;
    
       var htm = `
                                <div class="Someone" style="display: flex;">
                                    <div class="Spp"
                                    style="background:${bg}; display: flex;justify-content:center;align-items:center;">${Fletter} </div>
	</div>
                                    <span><b>${byUser} </b> <p>${byText}</p></span>
                                </div>`;
                                
                      if(idP === postId){
                      //$("#All" + postId).empty();  
                    //  function Cget(){
    	$("#All" + postId).append(htm);
    }  //  }
   // setInterval(Cget,1000);
                      
               });
                },
                error: function(error) {
                    console.error("Error retrieving comments data:", error);
                }
            });
   
					
					$(".CommentForm").off().submit(function(event) {
  event.preventDefault();
  $(this).prop('disabled', true);
  var form = $(this);
  var idP = form.data('idp');
  var CText = form.find('input[name="commentText"]').val();
  
  var idComment = Math.floor(Math.random() * 1000000);
  var Fletter = localStorage.getItem('Fletter');
  var bg = localStorage.getItem('bg');
  var idby = localStorage.getItem('id');
  var username = localStorage.getItem('user');

  // Fetch existing comments from the database
  $.ajax({
    url: PostsURL + "Comments.json",
    type: "GET",
    success: function(existingComments) {
      var commentExists = false;
      
      // Loop through existing comments to check if idComment already exists
      for (var commentId in existingComments) {
        if (existingComments[commentId].idComment === idComment) {
          commentExists = true;
          break;
        }
      }
      var msgD = "Duplicates are not allowed,this means your opinion is already Added to some of Expriences in the feeds";
      if (commentExists) {
        $("#feed").append(`<span class="duplicate">${msgD}</span >`);
        $(this).prop('disabled', false); // Re-enable the form
      } else {
        // Add the new comment to the database
        $.ajax({
          url: PostsURL + "Comments.json",
          type: "POST",
          data: JSON.stringify({
            username: username,
            idby: idby,
            CText: CText,
            Fletter: Fletter,
            idComment: idComment,
            bg: bg,
            idPost: idP
          }),
          contentType: "application/json",
          success: function(response) {
            alert("Comment added: " + CText);
            $(this).prop('disabled', false); // Re-enable the form
          },
          error: function(error) {
            console.error("Error adding data:", error);
            alert(error);
            $(this).prop('disabled', false); // Re-enable the form
          }
        });
      
      var toN = localStorage.getItem('toN');
         var toId= localStorage.getItem('toId');
        var thisPost = localStorage.getItem('thisPost');
         var id= localStorage.getItem('id');
     var NotifyId = Math.floor(Math.random()*100000);
         $.ajax({
          url: PostsURL + "Notify.json",
          type: "POST",
          data: JSON.stringify({
            fromN: username,
            fromId:id,
            toN: toN,
            toId:toId,
            thisPost:thisPost,
            NotifyId:NotifyId,
            said:CText
          }),
          contentType: "application/json",
          success: function(response) {
            alert("Notifications sent: ");
            $(this).prop('disabled', false); // Re-enable the form
          },
          error: function(error) {
            console.error("Error sending Notification:", toN);
            
            $(this).prop('disabled', false); // Re-enable the form
          }
        });
      }
      
      
    },
    error: function(error) {
      console.error("Error fetching existing opinions for this Exprience:",);
      
      $(this).prop('disabled', false); // Re-enable the form
    }
  });
});

if(id == localStorage.getItem("id")){
    $("#myPosts").append(html);
}
          
                      $("#feed").append(html); 	
                      
           });
          
                    },
                    error: function(error) {
                        console.error("Error retrieving data:", error);
                        
                    }
                    
                    
                    
                });
                
                  }
                  intervalID = setInterval(function() {
            // Your existing code for fetching data
            getAll();
        }, 10000); // Set the interval time as needed
    

                  
                      
          
          
     
     
     
            
});
		
