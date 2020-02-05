$(document).ready(function () {

  var topicsToChoose = ['cats', 'dogs', 'movies', 'simpsons', 'dancing', 'the office', "funny"]


  $(document).on("click", "#submit", function () {
    event.preventDefault();
    var userTopics = $("#giphySearch").val().trim();
    topicsToChoose.push(userTopics);
    $("#giphySearch").val("")
    buttons()
  })

  function buttons() {
    $(".header-button").empty()
    for (let i = 0; i < topicsToChoose.length; i++) {
      var button = topicsToChoose[i];
      $('.header-button').append("<button class=\"btn topic\">" + button + "</button>")
      // $('button').addClass("btn btn-primary topic")

    }
  }

  buttons()
  $(document).on("click", ".topic", function () {
    event.preventDefault();
    $('.images').empty()
    var topicClicked = $(this).text().trim()
    console.log(this);
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topicClicked + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      var results = response.data;

      for (var i = 0; i < results.length; i++) {
        var gifDiv = $("<div>");

        var rating = results[i].rating;

        var p = $("<p>").text("Rating: " + rating +  "  (click gif to animate)");

        var personImage = $("<img>");
        personImage.attr("src", results[i].images.original_still.url);
        personImage.attr("data-still", results[i].images.original_still.url);
        personImage.attr("data-animate", results[i].images.original.url);
        personImage.attr("data-state", "still");
        personImage.attr("class", "gif");



        gifDiv.prepend(p);
        gifDiv.prepend(personImage);

        $(".images").prepend(gifDiv);
      }
      console.log(results);
    });


  })

  $(document).on("click", ".gif", function () {
    console.log(state);
    var state = $(this).attr("data-state")
    if (state === "still") {
      animate = $(this).attr("data-animate")
      $(this).attr('src', animate)
      $(this).attr("data-state", "animate")
    }
    if (state === "animate") {
      still = $(this).attr("data-still")
      $(this).attr('src', still)
      $(this).attr("data-state", "still")
    }
  })
  console.log(topicsToChoose);



});