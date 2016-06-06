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

  function executeCopy (text) {
    var input;
    try {
      input = document.createElement('textarea');
      input.style.position = 'fixed';
      input.style.opacity = 0;
      document.body.appendChild(input);
      input.value = text;
      input.focus();
      input.select();
      document.execCommand('Copy');
      input.remove();
    } catch (err) {
      console.warn("Unable to copy color to clipboard.");
    }
  }

  function executeCopy2(html, useInnerHtml) {
    var text, doc = new DOMParser().parseFromString(html, 'text/html')
    if (useInnerHtml) {
      text = doc.body.innerHTML;
    }
    else {
      text = doc.body.textContent;
    }

    return executeCopy(text);
  }

  function bindCopySnippet() {
    var target, code, copied;

    $('.tdcss-copy-btn').on('click', function(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      var target = $(ev.currentTarget);
      var original = $(target).html();
      code = $(target).next().text();
      $(target).html('Copied!');
      executeCopy2(code, true);

      _.delay(function() {
        $(target).html(original);
      }, 1200);
    });
  }

  bindSidebarFadeActions();
  bindCopySnippet();

});


