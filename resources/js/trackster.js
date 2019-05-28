var Trackster = {};


const API_KEY = '27bfa08bfa0164c1c03bc73da9406738'; //my personal API key

//when the document is finished loading, the search button becomes ready to pass the value in the search bar to the searchTracksByTitle() function
$(document).ready(function() {
  $('#search-button').on('click', function() {
    Trackster.searchTracksByTitle($('#search-input').val());
  });
});

/* */

Trackster.renderTracks = function(tracks) {
  var $trackList = $('#track-list'); //creates a jQuery object for the HTML container that holds each track <div>

  $trackList.empty(); //empties the previous tracks upon a new click search

  for (var trackIndex = 0; trackIndex < tracks.length; trackIndex++) {
    var track = tracks[trackIndex];
    var mediumAlbumArt = track.image[1]["#text"];
    var htmlTrackRow =
      '<div class="row track">' +
      '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
      '    <a href="'+ track.url + '" target="_blank">' +
      '      <i class="fa fa-play-circle-o fa-2x"></i>' +
      '    </a>' +
      '  </div>' +
      '  <div class="col-xs-4">' + track.name + '</div>' +
      '  <div class="col-xs-2">' + track.artist + '</div>' +
      '  <div class="col-xs-2"><img src="' + mediumAlbumArt + '"/></div>' +
      '  <div class="col-xs-2">' + track.listeners + '</div>' +
      '</div>';

    $trackList.append(htmlTrackRow);
  }
};

Trackster.searchTracksByTitle = function(title) { //$('#search-input').val() is passed in for the 'title' parameter - this is what the user enters in the search bar
  $.ajax({
    url: 'https://ws.audioscrobbler.com/2.0/?method=track.search&track=' + title + '&api_key=' + API_KEY + '&format=json',
    success: function(response) {
      Trackster.renderTracks(response.results.trackmatches.track);
    }
  });
};
