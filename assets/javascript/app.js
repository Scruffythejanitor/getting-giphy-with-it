$(document).ready(function () {
    var topicsToChoose = ['cats', 'dogs', 'movies', 'simpsons', 'dancing', 'the office', "funny"]
    buttons()
    $('#submit').on('click', function(){
        event.preventDefault();

        var userTopics = $("#giphySearch").val().trim();
        topicsToChoose.push(userTopics);
        $("#giphySearch").val("")
        buttons()
    })

    function buttons() {
        $('.header-button').empty()
        for (let i = 0; i < topicsToChoose.length; i++) {
            var button = topicsToChoose[i];
            $('.header-button').append("<button>" + button + "</button>")
            $('button').addClass("btn btn-primary topic")
        }
    }

    $('.topic').on('click', function(){
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + button + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=1";
    
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
              var gifDiv = $("<div>");
  
              var rating = results[i].rating;
  
              var p = $("<p>").text("Rating: " + rating);
  
              var personImage = $("<img>");
              personImage.attr("src", results[i].images.original_still.url);
  
              gifDiv.prepend(p);
              gifDiv.prepend(personImage);
  
              $(".images").prepend(gifDiv);
            }
            console.log(results);
        });

        
    })
    

    console.log(topicsToChoose);
    


});