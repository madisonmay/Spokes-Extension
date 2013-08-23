//define keywords and url used for each service
var images = {'keywords': ['images', 'image'],
              'url': 'https://www.google.com/images?q='};
var maps = {'keywords': ['maps', 'map', 'directions'],
            'url': 'https://www.google.com/maps?q='};
var youtube = {'keywords': ['youtube'],
               'url': 'https://www.youtube.com/results?q='};
var news = {'keywords': ['news'],
            'url': 'https://www.google.com/news?q='};
var calendar = {'keywords': ['calendar'],
                'url': 'https://www.google.com/calendar/render?'};
var gmail = {'keywords': ['mail', 'inbox', 'gmail', 'email'],
             'url': 'https://mail.google.com/mail/u/0/#search/'};
var drive = {'keywords': ['drive', 'docs'],
             'url': 'https://drive.google.com/#search/'};
var translate = {'keywords': ['translate'],
                 'url': 'https://translate.google.com/?#auto/en/'};
var plus = {'keywords': ['g+', 'google+'],
            'url': 'https://plus.google.com/u/0/s/'};
var web = {'keywords': ['web', 'google'],
           'url': 'http://www.google.com/search?q='};
var twitter = {'keywords': ['twitter', 'tweets'], 
			   'url': 'https://twitter.com/search?q='}
var facebook = {'keywords': ['fb', 'facebook'], 
				'url': 'https://www.facebook.com/search/more/?q='}
var bing = {'keywords': ['bing'],
            'url': 'http://www.bing.com/search?'}	
var wolfram_alpha = {'keywords': ['wolfram', 'alpha', 'wa', 'wolframalpha'], 
					 'url': 'http://www.wolframalpha.com/input/?i='}   

var services = [images, maps, youtube, news, calendar, gmail, drive, 
                translate, plus, web, twitter, facebook, bing, wolfram_alpha];

var special_cases = gmail['keywords'].concat(drive['keywords'], translate['keywords'], plus['keywords']);

function contains(a, obj) {
    var i = a.length;
    while (i--) {
       if (a[i] === obj) {
           return true;
       }
    }
    return false;
}

chrome.omnibox.onInputEntered.addListener(
  	function(text) {
  		//keyword must be first word in query
        var selected = text.split(' ')[0];
        try {
        	var query = text.split(' ')[1];
        } catch(e) {
        	console.log(e);
        	var query = '';
        }
        var special_case = false;
        var keyword_match = false;
        for (service in services) {
    	    var current_service = services[service];
            for (keyword in current_service['keywords']) {
            	var current_keyword = current_service['keywords'][keyword];
            	if (current_keyword === selected) {
            		var	base_url = current_service['url'];
            		var	keyword_match = true;
            		if (contains(special_cases, current_keyword)) {
            			var special_case = true;
            		}
            	}
            }
        }

        if (!keyword_match) {
        	var base_url = web['url'];
        }

        var search_terms = encodeURIComponent(query);
        chrome.tabs.update({url: base_url+search_terms});
    }
);