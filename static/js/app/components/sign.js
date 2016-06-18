define(function(require) {
  var $ = require('jquery');

  var sign = {
    switchShowModal : function($Btn,$SignModal) {
      // var button = $Btn;
      var showModal = $Btn.data('whatever');
      var parentModal = $SignModal;
      var hideModal = $('.modal-content');
      hideModal.hide();
      parentModal.find(showModal).show();
    },
    showModal : function($Btn) {
      // body...
    }
  };
  return sign;
});
