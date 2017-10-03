
var topics = ["hockey", "cricket", "football", "tennis", "baseball", "squash"];

      
function displayTopics() {

  var search = $(this).attr("data-name");
  var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + search + "&api_key=W2IRBysFTaAyhRYG2etfQi9vZmt0WDnc&limit=5";
  
  $.ajax({
    url: queryURL,
    method: "GET"
  }).done(function(response) {

    var rating = response.data;

    for (var i = 0; i < rating.length; i++) {

      if (rating[i].rating !== "r" && rating[i].rating !== "pg-13") {

        var topicsDiv = $("<div class= 'col-xs-2'>");
        var pOne = $("<p>").text("Rating: " + rating[i].rating);

        topicsDiv.append(pOne);
        var imgURL = rating[i].images.fixed_width_still.url;

        var image = $("<img>")
        image.attr("src", imgURL);
        image.attr("data-state", "still")
        image.attr("data-still", rating[i].images.fixed_width_still.url)
        image.attr("data-animate", rating[i].images.fixed_width.url)

        topicsDiv.append(image);

        $("#sports-view").append(topicsDiv);
      }
    }
  });

}

  function renderButtons() {

    $("#buttons-view").empty();


    for (var i = 0; i < topics.length; i++) {

      var a = $("<button type='button' class= 'btn btn-info'>");

      a.addClass("sport");
      a.attr("data-name", topics[i]);
      a.text(topics[i]);
      $("#buttons-view").append(a);
    }
  }
   $(document).on("click", "img", function() {
      var state = $(this).attr("data-state");
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
   });

  $("#add-topics").on("click", function(event) {
    event.preventDefault();
    search = $("#topics-input").val().trim();

    topics.push(search);

    renderButtons();
  });

  $(document).on("click", ".sport", displayTopics);

  renderButtons();




