$(document).ready(function() {
  var c = new coreValueApp();
});

function coreValueApp() {
  this.cvState = 0;

  this.getCoreValues();    
  this.setupScrolly();
  this.setupEnding();

}

coreValueApp.prototype = {
  getCoreValues: function() {
    var self = this;
    
    $('#branding').height($(window).height());

    $.ajax({
      url: '/api/CoreValue',
      success: function (res) {

        var model = {
          values: res.values
        };

        $('#wrap').append(Mustache.to_html($('#listValues').html(), model));

        $('#cvList li').height($(window).height() - 30);
        $('#topLink').show();

        //self.pulsate();

      }
    });
  },

  pulsate: function() {
    var first = $('.cvNumber').eq('0');         

    window.setInterval(function() {
      first.fadeOut('fast');
    },500);

  },

  setupScrolly: function() {

    var self = this;

    var height = $(window).height();

    $('#wrap').click(function (e) {
      e.preventDefault();
      var target = $(e.target);
      if (target[0].tagName.toLowerCase() == 'a') {
        
        var scrollTo = (target.offset().top);
        $('html,body').animate({scrollTop: scrollTo}, 200);
      }
        
    });

    $('body').keydown(function(e) {

      var key = e.keyCode;

      if (key == '40') {

        // down
        if ((self.cvState + 1) > 10) {
          self.cvState = 10;
        } else {
          self.cvState++;
        }

        e.preventDefault();
        $('#coreValue-' + self.cvState + ' .cvNumber').click();    

      } else if (key == '38') {

        // up
        if ((self.cvState - 1) < 0) {
          self.cvState = 0;
        } else {
          self.cvState--;
        }
        
        if (self.cvState != 0) {
          e.preventDefault();
          $('#coreValue-' + self.cvState + ' .cvNumber').click();    
        } else {
          $('html,body').animate({scrollTop: 0}, 200);
        }

      }

    });
  },

  setupEnding: function () {
    var self = this;
    $('#topLink').click(function(e) {
      e.preventDefault();
      
      $('html,body').animate({scrollTop: 0}, 1000);
      self.cvState = 0;

      window.setTimeout(function() {
        $('#sharingIsCaring').fadeIn('slow');
      }, 1000);
    }); 
  }

};

