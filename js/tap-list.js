Date.prototype.formatDate = function (format) {
    var monthNames = [
      "January", "February", "March",
      "April", "May", "June", "July",
      "August", "September", "October",
      "November", "December"
    ];
    var date = this,
        day = date.getDate(),
        month = monthNames[date.getMonth()],
        year = date.getFullYear();

    if (!format) {
        format = "MM/dd/yyyy";
    }

    format = format.replace("MM", month);

    if (format.indexOf("yyyy") > -1) {
        format = format.replace("yyyy", year.toString());
    } else if (format.indexOf("yy") > -1) {
        format = format.replace("yy", year.toString().substr(2, 2));
    }

    format = format.replace("dd", day.toString().replace(/^(\d)$/, '0$1'));
    return format;
};

var PASSWORD = 'aW5mb0B0aGVjb3BwZXJkb29yLm5ldDp6S19DZS1La3VvM3p5RnVzTnc3cQ=='

$(document).ready(function(){
$.ajax
({
  type: "GET",
  url: "https://business.untappd.com/api/v1/menus/195?full=true",
  dataType: 'json',
  async: false,
  headers: {
    "Authorization": "Basic " + (PASSWORD)
  },
  success: function (data) {
    var trHTML = '';
    $.each(data.menu.sections[0].items, function (i, item) {
      if (typeof item.containers[0] === "undefined") {
        var $tr = $('<tr>').append(
            $('<td>').text(item.name),
            $('<td>').text(item.brewery),
            $('<td>').text(item.abv),
            $('<td>').text('N/A')
        ).appendTo('#taplist');
      } else{
      var $tr = $('<tr>').append(
          $('<td>').text(item.name),
          $('<td>').text(item.brewery),
          $('<td>').text(item.abv),
          $('<td>').text(item.containers[0].price)
      ).appendTo('#taplist');}
    });
    var date = new Date(data.menu.updated_at);
    $('#updated').html("*" + date.formatDate("MM dd yyyy") + "*");
   },
});
});
