$(document).ready(function() {

  //display all the speakers
  $.ajax({
    url: "/api/displayspeakers",
    method: "get"
  })
  .done(function(response) {
    console.log(response)
    var sessions = response;
    var source = $("#session-box").html();
    var template = Handlebars.compile(source);
    for (var i = 0; i < sessions.length; i++) {
      speaker = {
        sessionid: sessions[i].id,
        speakerimg: sessions[i].speaker_img,
        speakername: sessions[i].speaker_name,
        talktitle: sessions[i].talk_title,
        talktime: sessions[i].talk_time,
      }
      $(".speakers").append(template(speaker))
    }
    //display speakers in order
    $(".speakers").find('.session-box').sort(function (a, b) {
     return +a.getAttribute('time') - +b.getAttribute('time')
     })
     .appendTo(".speakers");

    // Make 'session-box' Draggable and set properties
    $(".session-box").draggable({

      helper: 'clone',
      revert: true,
      cursor: 'move',
      // stop: function(event, ui) {
      //     $(ui.helper).revert('true')
      // }
      // revert: function(event){
      //   var slotTime = $(this).attr('time')
      //   var cardTime = event.attr('time')
      //   if (slotTime != cardTime) return true
      // }

    })
  })

  //display slots for the itinerary
  var times = [9, 10, 11, 12, 1, 2, 3, 4]
  var innertext = ["9:00am","10:00am","11:00am","L U N C H","1:00pm","2:00pm","3:00pm","4:00pm"]
  var source = $("#timeslot").html();
  var template = Handlebars.compile(source);
  for (var i = 0; i < times.length; i++) {
    timeslot = {
      talktime: times[i],
      text: innertext[i]
    }
    $(".itinerary").append(template(timeslot))
  }


  // Make 'timeslot' Draggable and set properties
  $(".timeslot").droppable({
    drop: placeSession,
    hoverClass: 'hoverTimeslot',
    // scope: function() {
    //   this.attr('time')
    // }
  })


  function placeSession( event, ui ) {
    var slotTime = $(this).attr('time')
    var cardTime = ui.draggable.attr('time')

    // If the card was dropped to the correct slot,
    // change the card colour, position it directly
    // on top of the slot, and prevent it being dragged
    // again

    if ( slotTime == cardTime ) {
      //ui.draggable.addClass( 'correct' );
      //ui.draggable.draggable( 'disable' );
      //$(this).droppable( 'disable' );
      ui.draggable.position( { of: $(this), my: 'left top', at: 'left top' } );
      //ui.draggable.draggable( 'option', 'revert', false );


      //take text within the session box that was selected for dragging
      //ui.draggable.html()
      //put text within the timeslot that it was dragged into
      $(this).html(
        ui.draggable.html()
      )

      return false;
    }else {
      return true;
    }
  }
})
