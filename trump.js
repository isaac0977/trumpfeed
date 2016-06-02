
var stopped = true;
var id_previous = 0;
var interval = 0;

function make() {
	var request = new XMLHttpRequest();

	request.open('GET', 'http://ec2-54-201-84-161.us-west-2.compute.amazonaws.com/feed/mis', true);

	request.addEventListener('load', function(e) {
		if (request.status == 200) {
			var content = request.responseText;
			var data = JSON.parse(content);

			var ul = document.getElementById('tweets');
			var li = document.createElement('li');
			var username = data[0].user.name;
			var img = document.createElement('img');
			var id = data[0].id;
			/*username.style.color = '#4099FF';*/
			if(id_previous != id) {
				li.innerHTML = '<img src=' +data[0].user.profile_image_url +'>' + '<strong>' + username + '<br>' +'</strong> ' + parseLinks(data[0].text) + '<br>' + data[0].created_at;
				$('#tweets').prepend(li);

				if($("#tweets li").length > 5) {
					$('#tweets li:last-child').remove();
				}
			}
		} else {

		} 
	}, false);

	request.send(null);

}

window.addEventListener('load', function() {
	interval = window.setInterval(make, 3000);
	stopped = false;
}, false);

window.addEventListener('keydown', function(e) {
	var pause = document.getElementById('pause');
	var keycode = (e.keyCode ? e.keyCode : e.which);
	    if(keycode == '80'){
	        if(stopped == false) {
	 		window.clearInterval(interval);
	 		pause.innerHTML = "Paused!";
	 		stopped = true;
	 		} else {
	 		interval = window.setInterval(make, 3000);
	 		pause.innerHTML = "Press 'p' to pause";
	 		stopped = false;
	 		}
	 	}
	}, false);


/*function to parse the text and make links clickable
retrieved the code from http://stackoverflow.com/questions/10347166/how-to-make-links-work-in-twitter-tweets-api-json*/
function parseLinks(tweet) {
    return tweet.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/g, function (tweet) {
        return tweet.link(tweet);
    });
};