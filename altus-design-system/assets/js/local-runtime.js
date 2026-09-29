// Load classic scripts through script tags: file:// does not support jQuery XHR.
if (location.protocol === 'file:') {
  jQuery.ajaxPrefilter('script', function(options) { options.crossDomain = true; });
}
