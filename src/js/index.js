$(function () {
  $('#dropdownRoot01').on('mouseover', function (params) {
    $('#dropdown01').dropdown('show');
  });
  $('#dropdownRoot01').on('mouseout', function (params) {
    $('#dropdown01').dropdown('hide');
  });
});
