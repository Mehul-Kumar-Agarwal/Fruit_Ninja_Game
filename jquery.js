//click on start reset button to check if we playing
//if plaing reload
//if not playing-- show trailsleft box, change button text to reset game and 1) create a random fruit, definee random step, 2) move fruits down by 1 step using loops every 30sec, check if fruit is too low, if fruit is not too low then repeat 2) else, if fruit is too low, ask whether there are trials left? If we have trails left, geneerate new random fruit and remove 1 heart and repeat 1) else, show game over and button tect to start game


//slice a fruit-> play a sound and explode the fruit


var playing=false;
var score;
var trails;
var fruits=['apple','banana','cherries','grapes','mango','orange','peach','pear','watermelon'];
var step;
var action; //used to move fruit down
$(function(){
    
     $("#startreset").click(function(){
        //check if playing
         if(playing==true)
         {
            //reload page
             location.reload();//reloads the page
         }
         else
        {
            //we are not playing
            playing=true;//gme started
            score=0; //as game just started
            $("#scorevalue").html(score);//setting score on right as zero
            
            $("#trailsleft").show();//making the trials box appear
            trails=3;
            addHearts();
            
            //hide game over box
            $("#gameOver").hide();
            $("#startreset").html("Reset Game");//change button text to reset game
            
            //genertae fruits
            startFruits();
            
        }
         
         
   });
    //slice a fruit
   $("#fruit1").mouseover(function(){
       score++;
       $("#scorevalue").html(score); //updates the score
       $("#audio")[0].play(); //plays sound
       
       //stop the fruit 
       clearInterval(action);
       //hide fruit
       $("#fruit1").hide("explode",500); //slicing animation
       //send new fruits
       setTimeout(startFruits,550);
       
   });

    function addHearts()
    {
        $("#trailsleft").empty();
            for(i=0;i<trails;i++) //this for loop adds the heart in the box
                {  
                    $("#trailsleft").append('<img src="images/heart_logo.png" class="heart">'); 
                }
    }

    function startFruits()
    {
    
        //generate fruit
        $("#fruit1").show();
        chooseFruit(); //chhose a random fruit
        $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
        //generate a random step
        step=1+Math.round(Math.random()*6); //we get a step b/w 1 and 7
        //move fruit down by one step at 10ms
        action=setInterval(function(){
            $("#fruit1").css('top',$("#fruit1").position().top+step);

            //check if fruit is too low
            if($("#fruit1").position().top>$("#fruitsContainer").height())
            {
               //check if any trail left
                if(trails>1)
                {
                    //generate fruit
                        $("#fruit1").show();
                        chooseFruit(); //chhose a random fruit
                        $("#fruit1").css({'left':Math.round(Math.random()*550),'top':-50});
                        //generate a random step
                        step=1+Math.round(Math.random()*6); //we get a step b/w 1 and 7

                        trails--; //reduce trails by 1
                        addHearts();//remove 1 heart
                }
                else
                {
                    //game over
                    playing=false; //all lives done => not playing
                    $("#startreset").html("Start Game"); 
                    $("#gameOver").show();
                    $("#gameOver").html('<p>GAME OVER!!</p><p>Your Score is '+score+' </p>');
                    stopFruits();
                }
            }
        },10);

    }

    function chooseFruit()
    {
        $("#fruit1").attr('src','images/'+fruits[Math.round(Math.random()*8)]+'.png');
    }

    //stops dropping fruits
    function stopFruits()
    {
        clearInterval(action);
        $("#fruit1").hide();
    }
});