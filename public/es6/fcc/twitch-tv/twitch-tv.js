//JavaScript File
$(document).ready(function() {
    console.log('ready');
    console.log(window.jQuery.fn.jquery);
    loadChannel();
});

function loadChannel() {
    let channels = ["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas", "brunofin", "comster404", "terakilobyte", "thomasballinger", "Beohoff", "sheevergaming", "TR7K"];

    function api(type, channel) {
        return `https://api.twitch.tv/kraken/${type}/${channel}?callback=?`;
    }

    channels.forEach(function(channel) { // forEach prevents inner async request from breaking out of loop
        let display_name = null;
        let logo = null;
        let url = null;
        let game = null;
        let status = null;
        let online = false;

        $.getJSON(api('channels', channel), function(data) {
            display_name = data.display_name ? data.display_name : channel;
            logo = data.logo ? data.logo : `//dummyimage.com/300x300/000/fff.jpg&text=${display_name}`;
            url = data.url ? data.url : '';
            game = data.game;
            status = data.status;
            $.getJSON(api('streams', channel), function(data) {
                let logoHTML = null;
                let nameHTML = null;
                let descHTML = null;

                if (data.stream) {
                    online = true;
                } else if (data.stream === undefined) {
                    game = 'Account';
                    status = 'Closed';
                    url = logo = `//dummyimage.com/300x300/000/fff.jpg&text=${display_name}`;
                } else {
                    game = 'Account';
                    status = 'Offline';
                }

                logoHTML = `<div class="logo col-sm-2"><a href="${url}"><img src="${logo}"></a></div>`;
                nameHTML = `<div class="name col-sm-3"><a href="${url}">${display_name}</a></div>`;
                descHTML = `<div class="desc col-sm-7">${game}: ${status.substr(0, 45)}</div>`;

                if (online === true)
                    $('#main').prepend(`<div class="row online">${logoHTML}${nameHTML}${descHTML}</div>`);
                else if (status === 'Offline')
                    $('#main').append(`<div class="row offline">${logoHTML}${nameHTML}${descHTML}</div>`);
                else
                    $('#main').append(`<div class="row closed">${logoHTML}${nameHTML}${descHTML}</div>`);
            });
        });
    });
}
