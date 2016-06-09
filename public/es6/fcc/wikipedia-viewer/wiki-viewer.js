function wikiData(data) {
    const query = data[0];
    const wikiTitle = data[1];
    const wikiDescription = data[2];
    const wikiURI = data[3];

    $('.results').append(`<h4 class="text-center">\"${query}\"</h4>`);
    for (let x = 0; x < wikiTitle.length; x++) {
        $('.results').append(`<h5><a href=\"${wikiURI[x]}\" target=\"_blank\">${wikiTitle[x]}</a></h5>`);
        $('.results').append(`<h6>${wikiDescription[x]}</h6>`);
    }
    document.getElementById('search').reset();
}

function searchWiki(data) {
    const script = document.createElement('script');
    script.src = `//en.wikipedia.org/w/api.php?action=opensearch&format=json&search=${data}&callback=wikiData`;
    document.getElementsByTagName('head')[0].appendChild(script);
}

document.getElementById('search').addEventListener('submit', function(e) {
    e.preventDefault();
    $('.results').empty();
    $('.centered').css({ "justify-content": "flex-start" });
    searchWiki(encodeURIComponent(this.query.value));
});
