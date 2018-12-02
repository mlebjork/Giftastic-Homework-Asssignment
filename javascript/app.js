var topics = ["parent", "mtb", "dog", "baby", "car", "cat"]
$(document).ready(function () {

    function addButtons(array) {
        for (var i = 0; i < array.length; i++) {
            var failButtons = $("<button>")
            failButtons.addClass("fails")
            failButtons.attr("data-fails", array[i])
            failButtons.text(array[i])
            $("#buttonsGoHere").append(failButtons)

        }

    }
    addButtons(topics)


    $("button").on("click", function () {

        var fails = $(this).attr("data-fails");
        console.log(fails);

        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + fails + "+fails&api_key=7sfn18qMfYCKSxxRSvW2t2dadCRIQ8dp&limit=10";
        // do your ajax call with your queryURL
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            // After data comes back from the request
            .then(function (response) {
                console.log(queryURL);

                console.log(response);
                // storing the data from the AJAX request in the results variable
                var results = response.data;

                // Looping through each result item
                for (var i = 0; i < results.length; i++) {

                    // Creating and storing a div tag
                    var failDiv = $("<div>");

                    // Creating a paragraph tag with the result item's rating
                    var p = $("<p>").text("Rating: " + results[i].rating);

                    // Creating and storing an image tag
                    var failImage = $("<img>");
                    // Setting the src attribute of the image to a property pulled off the result item
                    failImage.attr("src", results[i].images.fixed_height.url);

                    // Appending the paragraph and image tag to the animalDiv
                    failDiv.append(p);
                    failDiv.append(failImage);

                    // Prependng the animalDiv to the HTML page in the "#gifs-appear-here" div
                    $("#gifs-appear-here").prepend(failDiv);

                    
                }
            });
    });

    

});

$(".gif").on("click", function () {

    var state = $(this).attr("data-state");

    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");

    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");

    }
});







// 5. Under every gif, display its rating (PG, G, so on).
//    * This data is provided by the GIPHY API.
//    * Only once you get images displaying with button presses should you move on to the next step.

// 6. Add a form to your page takes the value from a user input box and adds it into your `topics` array. Then make a function call that takes each topic in the array remakes the buttons on the page.
