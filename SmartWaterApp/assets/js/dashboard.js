$(document).ready(function(){
  $('#sidebar').on('hidden.bs.collapse', toggleChevron);
  $('#sidebar').on('shown.bs.collapse', toggleChevron);

  $('.nav-sidebar').on('click', 'li', alterActive);
});

function toggleChevron(e) {
    $(e.target)
    .prev('.item-sidebar')
    .find("i.indicator")
    .toggleClass('glyphicon-chevron-down glyphicon-chevron-up');
}

function alterActive() {
    if (!$(this).hasClass("collapsed")) {
      $('.nav-sidebar li.active').removeClass('active');
      $(this).addClass('active');
    }
};
