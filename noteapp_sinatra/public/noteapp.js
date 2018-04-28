var Quiz = {
  init: function() {}
}

const PX_PER_REM = 14;

function drawLedgerLines() {    // adds to treblelines or basslines.
  $('.ledger-line').remove();
  $('.note:visible').each(function(){
    console.log('drawLedgerLines was called');

    function ledgerLine(topRem) {
      return $("<div class='ledger-line'></div>").css({
        top: topRem * PX_PER_REM,
        left: lineLeftPx,
      });
    }

    var $note = $(this);
    var $staff = $note.parent();
    var OFFSET_FROM_NOTE = 10;
    var noteTopRem = parseFloat($note.css('top')) / PX_PER_REM;
    var lineLeftPx = parseFloat($note.css('left')) - OFFSET_FROM_NOTE;
    console.log($note.css('left'));
    if (noteTopRem <= -3) {
      $staff.append(ledgerLine(-2));
      if (noteTopRem <= -5) {
        $staff.append(ledgerLine(-4));
      }
    } else if (noteTopRem >= 9) {
      $staff.append(ledgerLine(10));
      if (noteTopRem >= 11) {
        $staff.append(ledgerLine(12));
      }
    }
  });
}

$(function() {

  drawLedgerLines();

  var Note = {
    init: function(data) {
      this.id = data;
      this.position = $('.' + data).css('top');
      this.audio = $('#' + data.substr(0, 2));
    },
    play: function() {
      this.audio.play();
    },
    practice: function() {

    },

  }


  // var allNotes = [{noteId: "C6t", position: "-5rem", sound: 'sounds/c6.wav', classes: ".ledger-line-through .ledger-line-3below"},
  //         {noteId: "B5t", position: "-4rem", sound: 'sounds/b5.wav'},
  //         {noteId: "A5t", position: "-3rem", sound: 'sounds/a5.wav'},

  //         {noteId: "G5t", position: "-2rem", sound: 'sounds/g5.wav'},
  //         {noteId: "F5t", position: "-1rem", sound: 'sounds/f5.wav'},
  //         {noteId: "E5t", position: "0", sound: 'sounds/e5.wav'},
  //         {noteId: "D5t", position: "1rem", sound: "sounds/d5.wav"}, 
  //         {noteId: "C5t", position: "2rem", sound: "sounds/c5.wav"}, 
  //         {noteId: "B4t", position: "3rem", sound: 'sounds/b4.wav'}, 
  //         {noteId: "A4t", position: "4rem", sound: 'sounds/a4.wav'}, 
  //         {noteId: "G4t", position: "5rem", sound: 'sounds/g4.wav'}, 
  //         {noteId: "F4t", position: "6rem", sound: 'sounds/f4.wav'}, 
  //         {noteId: "E4t", position: "7rem", sound: 'sounds/e4.wav'}, 
  //         {noteId: "D4t", position: "8rem", sound: 'sounds/d4.wav'}, 
  //         {noteId: "C4t", position: "9rem", sound: 'sounds/c4.wav', classes: "ledger-line"},
          
  //         {noteId: "C4b", position: "-3rem", sound: 'sounds/c4.wav', classes: "ledger-line"},
  //         {noteId: "B3b", position: "-2rem", sound: 'sounds/b3.wav'},
  //         {noteId: "A3b", position: "-1rem", sound: 'sounds/a3.wav'},
  //         {noteId: "G3b", position: "0", sound: 'sounds/g3.wav'},
  //         {noteId: "F3b", position: "1rem", sound: 'sounds/f3.wav'},
  //         {noteId: "E3b", position: "2rem", sound: 'sounds/e3.wav'},
  //         {noteId: "D3b", position: "3rem", sound: "sounds/d3.wav"}, 
  //         {noteId: "C3b", position: "4rem", sound: "sounds/c3.wav"}, 
  //         {noteId: "B2b", position: "5rem", sound: 'sounds/b2.wav'}, 
  //         {noteId: "A2b", position: "6rem", sound: 'sounds/a2.wav'},
  //         {noteId: "G2b", position: "7rem", sound: 'sounds/g2.wav'}, 
  //         {noteId: "F2b", position: "8rem", sound: 'sounds/f2.wav'}, 
  //         {noteId: "E2b", position: "9rem", sound: 'sounds/e2.wav'}, 
  //         {noteId: "D2b", position: "10rem", sound: 'sounds/d2.wav'},
  //         {noteId: "C2b", position: "11rem", sound: 'sounds/c2.wav'}];

  var activeArray = [];
  var numberCorrect = 0;



  function shuffle(array) {
    var m = array.length, t, p;
    // While there remain elements to shuffle…
    while (m) {
      // Pick a remaining element…
      p = Math.floor(Math.random() * m--);
      // And swap it with the current element.
      t = array[m];
      array[m] = array[p];
      array[p] = t;
    }
    return array;
  }

  var i = 0;
  var currentNote; //note object in array
  var currentDiv; //jquery-created div in dom
  var nextNote; // note object in array
  var nextDiv // jquery-created div in dom
  var previousNote = {}; //note object in array
  var currentStaff // div.treble-lines or div.bass-lines jquery object
  var nextStaff

  function storePreviousNote() { 
    previousNote = activeArray[i];
  }

  function switchClefs() {
    if (activeArray[i].staff === "t" ) {
      $(".bassclef").addClass("rotate-out");
      setTimeout( function(){
        $(".bassclef").hide();
        $(".trebleclef").addClass("rotate-in").show("fade");
        $('.quiz-note').show("fade");
      }, [300]);
    } else {
      $(".trebleclef").addClass("rotate-out");
      setTimeout( function(){
        $(".trebleclef").hide();
        $(".bassclef").addClass("rotate-in").show("fade");
        $('.quiz-note').show("fade");
      }, [300]);
    } 
  }

  function switchArray() {
    i = 0;
            
    if (activeArray == trebleArray) {
      if (bassArray.length > 0) {
        activeArray = bassArray;
      }
    } else if (activeArray == bassArray) {
      if (trebleArray.length > 0) {
        activeArray = trebleArray;
      } 
    } 
    
    shuffle(activeArray);
    return activeArray;
    console.log(activeArray);
  }
  


  function buildNextNote(noteObject){
    
    //assign current staff
    function assignStaff(){
      if (noteObject.noteId[2] === "t"){
        currentStaff = $(".treble-lines");
      } else {
        currentStaff = $(".bass-lines");
      }
    }
    assignStaff();

    let id = noteObject.noteId;
    if (noteObject.classes){
      var addHtml = "<div class=" + noteObject.classes + "></div>";
    }
    //create div and append.
    nextDiv = $("<div/>")
      .attr("id", id)
      .addClass("note whole-note next-note")
      .html(addHtml)//ledger lines
      .appendTo(currentStaff);
  } 

  function assignCurrent(){
    currentNote = activeArray[i]; //in start-button event listener

  }

  function moveToCurrentNote(jqDiv){
    jqDiv.addClass("quiz-note").animate({
      opacity: 1,
      left: "48%"
    }).removeClass("next-note");
    currentDiv = jqDiv;
  } 

  function newNote() {
    
    //currentNote = activeArray[i];
    
    nextNote = activeArray[i+1] ? activeArray[i+1] : switchArray()[i];

    buildNextNote(nextNote);
    console.log();



    

    //let rem = activeArray[i].position;
    //$(".quiz-note").css({"top": rem, "background-color": "black"}).html("");
    
    //add ledger lines using css pseudo elements
    if (activeArray[i].classes) {
      $(".quiz-note").html("<div class=" + activeArray[i].classes + "></div>");
    }; 
    //switch clefs if necessary.

    if ($("#staff").css("height") == "20rem") {
      if (activeArray[i].staff != previousNote.staff) {
        switchClefs(); // includes showing the quiz note.
      }
    } else {
      $('.quiz-note').show("fade");
    }



  }

  function startCount() {
    
    var min = 3;
    var sec = 00;

    function twoDigits( n ){
          return (n <= 9 ? "0" + n : n);
      }
    setInterval(function() {
      sec--;
      if (sec === -1) {
        sec = 59;
        min--;
        $(".minutes").html(min);
      }
      $(".seconds").html(twoDigits(sec));
      if (min === 0 && sec === 0) {
        clearInterval(startCount);
      }

    }, 1000);
  }

  function logArray(array) {
    for (var k = array.length - 1; k >= 0; k--) {
      console.log(array[k]); 
    }
  }

  function timesUp() {
    function message() {
      if (numberCorrect <=10) {
        $(".message").text("Keep practicing!").show("fade");
      } else if (numberCorrect <= 20) {
        $(".message").text("Way to go!").show("drop", "right");
      } else if (numberCorrect <= 30) {
        $(".message").text("Awesome!").show("bounce");
      } else if (numberCorrect > 30) {
        $(".message").text("Amazing!!").show("bounce");
      }
    }
    function workOn() {
    }
    $(".end-screen").show("drop", "up");
    $(".correct").text(numberCorrect);
    setTimeout(message, [700]);
  }

  function colorSelect(){
    $(this).toggleClass("selected");
  }


//To check if all audio files have loaded:
function audioReady(){
  return $.when.apply($, $('audio').map(function(){
    var ready = new $.Deferred();
    $(this).one('canplay', ready.resolve);
    return ready.promise();
  }));
}

audioReady().then(function(){
  //$("h5").text("Audio files are loaded.")
});

//Event Listeners:

  $(".pick").on("click", ".note", colorSelect);
  $(".pick").on("click", colorSelect);

  $(".next-button").on("click", function(){
    event.preventDefault();
    $(".treble-lines").toggle("fade");
    $(".bass-lines").toggle("fade");
    
    if ( $(".selected") ) {
      $(".start-button").show();
    }
  });

  $(".start-button").on("click", function(){
    event.preventDefault();
    //For smaller screens, make div#staff smaller to fit both staves.
    //if ( $("#container").css("width", "100%") ){
    //  $("html").css("font-size", "8px");
    //}

    //build the arrays:
    $(".selected").map(function(){
      for (let n=0; n<allNotes.length; n++) {
        if ($(this).attr("id") === allNotes[n].noteId) {
          if (allNotes[n].noteId[2] === "t") {
            trebleArray.push(allNotes[n]);
          } else {
            bassArray.push(allNotes[n]);
          }
        }
      }
    });

    //assign activeArray 
    if (trebleArray.length > 0) {
      activeArray = trebleArray;
    } else if (bassArray.length > 0) {
      activeArray = bassArray;
    } else {
      alert("Please select some notes to practice.");
    }
    
    

    $(".pick").hide("fade");
    $(".line").css("z-index", "3");
    shuffle(activeArray); 

    // assign value so that newNote works.
    if ($(".treble-lines").hasClass("rotate-in")){
      previousNote.staff = "t";
    } else {
      previousNote.staff = "b";
    }

    // show buttons and score bar
    $(".instructions, .start-button, .next-button").hide("fade", "slow");
    setTimeout(function(){
      $(".score").show("fade", "slow");
    }, [500]);    
    setTimeout( function(){
      $(".quiz-button").show("fade", "slow");
    }, [500]);

    assignCurrent();
    buildNextNote(currentNote);
    moveToCurrentNote(nextDiv);

    startCount();
    setTimeout(newNote, [200]);
    setTimeout(timesUp, [180000]);
  });

  $(".quiz-button").on("click", function(){
    event.preventDefault();
    if ($(this).text() == currentDiv.attr("id").charAt(0)) {
      //increase score
      numberCorrect++;
      $('.correct').text(numberCorrect);

      //find and play sound
      let soundId = "#" + currentDiv.attr("id").substring(0,2).toLowerCase();
      $(soundId).trigger("play");
      console.log(soundId);
      // store previous note
      storePreviousNote();
      
      //fade
      currentDiv.css("background-color", "rgb(177, 54, 177)")
        .animate({
          opacity: 0}, 
          400, //time it takes to fade
          function change(){ //will run after the animation is done
            currentDiv.remove();
            moveToCurrentNote(nextDiv);
            newNote();//next note & switch arrays if needed.
            i++
            if (i > activeArray.length) {
              switchArray();
            }
          } );
      $('.ledger-line').css("background-color", "rgb(177, 54, 177)").hide("fade", "slow");

    } else {
      currentDiv.effect("shake");
    }
  });

});
