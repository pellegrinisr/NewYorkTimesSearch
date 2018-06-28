$(document).ready(function() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var apiKey = 'api_key=afbbed97e0fc4da5ba0fd364a1866e4a';
    var serarchTerm;
    var numRecords;
    function getSearchTerms() {

        console.log($('#searchTerm').val());
        console.log($('#numRecordsSelect').val());   

        searchTerm = $('#searchTerm').val();
        numRecords = $('#numRecordsSelect').val();
        console.log(searchTerm + '   ' + numRecords);

        var queryURL = url + '?' + apiKey + '&q=' + searchTerm;
        console.log(queryURL);

        $.getJSON(queryURL).then(function(response) {
            console.log(response);
            
            for (var i = 0; i < response.response.docs.length; i++) {
                //create an empty div to hold new article
                //and assign it class article-addition
                var newArticleDiv = $('<div>').addClass('article-addition');
                //create an empty p tag
                //and assign it class headline
                var headlineP = $('<p>').addClass('headline');
                //store the headline from JSON reply in headline
                headlineP.html(response.response.docs[i].headline.main);
                //append the headline p to the new article div
                newArticleDiv.append(headlineP);
                //byline p tag
                var bylineP = $('<p>').addClass('byline');
                bylineP.html(response.response.docs[i].byline.original);
                newArticleDiv.append(bylineP);
                $('.search-results').append(newArticleDiv);
            }
            
        });
    }

    $(document).on('click', '.search-button', getSearchTerms);
});






