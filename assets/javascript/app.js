$(document).ready(function() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var apiKey = 'api_key=afbbed97e0fc4da5ba0fd364a1866e4a';
    var searchTerm;
    var numRecords;
    var recordsPerPage = 10;
    
    function getSearchTerms() {
        if ($('#searchTerm').val()) {
            console.log($('#searchTerm').val());
            console.log($('#numRecordsSelect').val());   
    
            searchTerm = $('#searchTerm').val();
            numRecords = $('#numRecordsSelect').val();
            console.log(searchTerm + '   ' + numRecords);
            
            $('.search-results').html('');

            var numPages = $('#numRecordsSelect').val() / recordsPerPage;
            var i = 1;
            while (i <= numPages) {
                var queryURL = url + '?' + apiKey + '&q=' + searchTerm + '&page=' + i;
                console.log(queryURL);
                $.getJSON(queryURL).then(function(response) {
                    console.log(response);
                    if (response.status === 'OK') {
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
                            //create an empty image tag
                            //assign it a class
                            //change its src attribute
                            //append it to the newArticleDiv
                            if (response.response.docs[i].multimedia[3]) {
                                var articlePic = $('<img>').addClass('thumbnail');
                                articlePic.attr('src', 'https://www.nytimes.com/' + response.response.docs[i].multimedia[3].url);
                                newArticleDiv.append(articlePic);
                            }
                            
                            //verify that result has a byline tag
                            if (response.response.docs[i].byline) {
                                //create p tag for byline
                                //change its html to match the byline returned with api call
                                //append it to the new article div
                                var bylineP = $('<p>').addClass('byline');
                                bylineP.html(response.response.docs[i].byline.original);
                                newArticleDiv.append(bylineP);
                            }
                            //repeat the process for the article snippet
                            var snippetP = $('<p>').addClass('snippet');
                            snippetP.html(response.response.docs[i].snippet);
                            newArticleDiv.append(snippetP);
                            //repeat the process for the url
                            var linkTag = $('<a target="_blank">').addClass('url');
                            linkTag.attr('href', response.response.docs[i].web_url);
                            linkTag.html(response.response.docs[i].web_url);
                            newArticleDiv.append(linkTag);
                            $('.search-results').append(newArticleDiv);
                        }
                    }
                });
                i++;
            }
        }
        else {
            alert('Search Terms cannot be blank');
        }
    };
    
    $(document).on('click', '.search-button', getSearchTerms);
});
