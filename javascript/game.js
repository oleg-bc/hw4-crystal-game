var targetNumber;
  var setTarget= function(){
    var computerPick = Math.floor(Math.random() * 100) + 1;
    targetNumber = computerPick;
    
    console.log("just for fun this is the current TARGET NUM " + targetNumber);
   
    console.log("just for clarity currentScore is now "+ currentScore);
    return targetNumber;
  } 
//   var computerPick = Math.floor(Math.random() * 100) + 1;
//   targetNumber = computerPick;

targetNumber= setTarget();

  $("#number-to-guess").text(targetNumber);
  var currentScore = 0;
  var wins = 0;
  var losses= 0;

  // multiple crystals each with their own unique number value.
  // We begin by expanding our array to include four options.

    //function to create a random value (to assign to each gem)
    var randomIntFromInterval = function(min,max){ 
      return Math.floor(Math.random()*(max-min+1)+min);
    }
  //var numberOptions = [10, 5, 3, 7];
  var numberOptions = [];
  var setNewCrystalVals = function(arrayArg){
        arrayArg[0] =  randomIntFromInterval(1,10);
        arrayArg[1] =  randomIntFromInterval(10,20);
        arrayArg[2] =  randomIntFromInterval(20,25);
        arrayArg[3] =  randomIntFromInterval(25,35);
       

        for (i=0;i<=3;i++){
            var troubleShootString="Gem " +arrayArg.indexOf(arrayArg[i]) +" is worth "+arrayArg[i]+" points"+"<br>";
            $(".debug-gem-points").append(troubleShootString);
            console.log("Gem " +arrayArg.indexOf(arrayArg[i]) +" is worth "+arrayArg[i]+" points");
        }
        return arrayArg;
}
numberOptions=setNewCrystalVals(numberOptions);

  // Next we create a for loop to create crystals for every numberOption.
  for (var i = 0; i < 4; i++) {

    // For each iter create an img
    var imageCrystal = $("<img>");

    // First each crystal will be given the class ".crystal-image".
    // This will allow the CSS to take effect.
    imageCrystal.addClass("crystal-image");

    // Each imageCrystal will be given a src link to the crystal image
    imageCrystal.attr("src", "images/gems/gem"+numberOptions.indexOf(numberOptions[i])+".png");

    // Each imageCrystal will be given a data attribute called data-crystalValue.
    // This data attribute will be set equal to the array value.
    imageCrystal.attr("data-crystalvalue", numberOptions[i]);  

    // Lastly, each crystal image (with all it classes and attributes) will get added to the page.
    $("#crystals").append(imageCrystal);
  }

  // This time, our click event applies to every single crystal on the page. Not just one.
  $(".crystal-image").on("click", function() {

    // Determining the crystal's value requires us to extract  value from data attribute.
    // Using the $(this) keyword specifies that we should be extracting
    // the crystal value of the clicked crystal.
    // Using the .attr("data-crystalvalue") allows us to grab the value out of 
    //the "data-crystalvalue" attribute.
    // Since attributes on HTML elements are strings, we must convert it 
    //to an integer before adding to the currentScore

     var crystalValue = ($(this).attr("data-crystalvalue")); 
     console.log("value of this.attr data-crystalValue is  " + crystalValue);
     crystalValue = parseInt(crystalValue);
     console.log("after parse the value of this.attr data-crystalValue is  " + crystalValue);



    // We then add the crystalValue to the user's "currentScore" which is a global variable.
    // Every click, from every crystal adds to the global currentScore.
    currentScore += crystalValue;

    // All of the same game win-lose logic applies. So the rest remains unchanged.
    //alert("New score: " + currentScore);
    $(".current-points").text("current points "+currentScore);

    if (currentScore == targetNumber) {
        currentScore = 0;
        $(".debug-gem-points").text("");
        numberOptions=setNewCrystalVals(numberOptions);  
      $(".win-lose").text("you win!");
      $(".current-points").text(0);
      wins++;
        
      targetNumber= setTarget();
      $("#number-to-guess").text(targetNumber);
      $(".wins").text("wins " + wins);
      

    }

    else if (currentScore > targetNumber) {
        currentScore = 0;
      $(".debug-gem-points").text("");
      numberOptions=setNewCrystalVals(numberOptions);  
      $(".win-lose").text("you lose!");
      $(".current-points").text(0);
      
      losses++;
      targetNumber= setTarget();
      $("#number-to-guess").text(targetNumber);
      $(".losses").text("losses " + losses);
      

    }

  });