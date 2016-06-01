$(function() {

  function bindSidebarFadeActions() {
    $(document).scroll(function() {
      var bottomViewPort, footer, footerTop, sidebar;
      footer = '.footer';
      sidebar = '.docked-menu';
      bottomViewPort = $(window).scrollTop() + $(window).height();
      footerTop = $(footer).offset().top;
      if (bottomViewPort >= footerTop) {
        $(sidebar).fadeOut();
      } else {
        $(sidebar).fadeIn();
      }
    });
  }

  bindSidebarFadeActions();

});


