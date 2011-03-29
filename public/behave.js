$(document).ready(function() {
  getCoreValues();    
  setupScrolly();
  setupEnding();
});

function getCoreValues() {
  
  $('#branding').height($(window).height());

  $.ajax({
    url: '/api/CoreValue',
    success: function (res) {

      var model = {
        values: res.values
      };

      $('#wrap').append(Mustache.to_html($('#listValues').html(), model));

      $('#cvList li').height($(window).height() - 30);

    }
  });
}

function setupScrolly() {
  var height = $(window).height();
  $('#wrap').click(function (e) {
    e.preventDefault();
    var target = $(e.target);
    if (target[0].tagName.toLowerCase() == 'a') {
      
      var scrollTo = (target.offset().top);
      $('html,body').animate({scrollTop: scrollTo}, 200);
    }
      
  });
}

function setupEnding() {
  $('#topLink').click(function(e) {
    e.preventDefault();
    
    $('html,body').animate({scrollTop: 0}, 1000);

    window.setTimeout(function() {
      $('#sharingIsCaring').fadeIn('slow');
    }, 1000);
  }); 
}
