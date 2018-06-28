$(document).ready(function() {
    var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
    var apiKey = 'api_key=afbbed97e0fc4da5ba0fd364a1866e4a';
    var serarchTerm;
    var numRecords;
    function getSearchTerms() {
        // console.log('.search-term' + $('.search-term').val());
        // //check search term
        // if ($('.search-term').val() !== '') {
            
        //     serarchTerm = $('.search-term').val();
        //     numRecords = $('.num-records').val();
            
        // } else {
        //     alert('Search term and Number of Records')
        // }
        // console.log('search term: ' + serarchTerm);
        // console.log('number of records: ' + numRecords);
        // $.getJASON()

        console.log($('#searchTerm').val());
        console.log($('#numRecordsSelect').val());   

        searchTerm = $('#searchTerm').val();
        numRecords = $('#numRecordsSelect').val();
        console.log(searchTerm + '   ' + numRecords);

        var queryURL = url + '?' + apiKey + '&q=' + searchTerm;
        console.log(queryURL);

        $.getJSON(queryURL).then(function(response) {
            //create new div to hold each article result
            console.log(response);
        })
    }

    $(document).on('click', '.search-button', getSearchTerms);
});






