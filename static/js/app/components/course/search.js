define(function(require) {
  var $ = require('jquery');

  var oSearch = {
    bind:function() {
      $('#search-btn').on('click', function(event) {
        event.preventDefault();
        /* Act on the event */
        var sKeyword = $('#search-input').text();
      });
    }
  }
});
