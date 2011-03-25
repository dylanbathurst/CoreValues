$(document).ready(function() {
  getCoreValues();    
  setupScrolly();
});

function getCoreValues() {
  
  $('#branding').height($(window).height());

  $.ajax({
    url: '/api/CoreValue',
    success: function (res) {
      var cvs = res.values
          len = cvs.length,
          mainList = ['<ul id="cvList">'];

      for (var i = 0; i < len; i++) {
        var c = cvs[i];
        mainList.push('<li id="coreValue-', c.id, '"><a href="#coreValue-', c.id, '" class="cvNumber">', c.id, '</a><section class="coreValue">', c.name, '</section></li>');
      }

      mainList.push('</ul>');
      $('#wrap').append(mainList.join(''));

      $('#cvList li').height($(window).height() - 30);

      //console.log(res);
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
