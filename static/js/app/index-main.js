define(function (require) {
  var $ = require('jquery');
  $(function() {
    $('#sign-modal').on('show.bs.modal',function(event) {
      var button = $(event.relatedTarget);
      var showModal = button.data('whatever');
      var modal = $(this);
      var hideModal = $('.modal-content');
      hideModal.hide();
      modal.find(showModal).show();
    });
  });
});
