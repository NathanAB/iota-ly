/* content.js */

var imgur = require('imgur-node-api');
var request = require('request');
var cheerio = require('cheerio');
var q = require('q');

var ContentProvider = require('./model.js').ContentProvider;
ContentProvider = new ContentProvider();
imgur.setClientID("0bc71bb09c764b2");

var ContentPoster = function() {};

/* Functions */

ContentPoster.prototype.post = function(userid, stringlet) {
    console.log("posting " + userid + " " + stringlet);
    convertAndPostStringlet(userid, stringlet);
};

/* Helper Functions */
function convertAndPostStringlet(userid, stringlet) {

    var data = {};
    
    if (isImage(stringlet)) {
        console.log('Image: ' + stringlet);
        toImage(userid, stringlet).then(function(data) {
            postContent(data);
        });
    }
    else if (isVideo(stringlet)) {
        console.log('Video: ' + stringlet);
        toVideo(userid, stringlet).then(function(data) {
            postContent(data);
        });
    }
    else if (isUrl(stringlet)) {
        console.log('URL: ' + stringlet);
        toURL(userid, stringlet).then(function(data) {
            console.log('To URL');
            postContent(data);
        });
    }
    else {
        console.log('String: ' + stringlet);
        data.userid = userid;
        data.type = 'STRING';
        data.half = false;
        data.content = decodeURI(stringlet);
        console.log('Decoded String: ' + data.content);
        postContent(data);
    }
}

function postContent(content) {
    ContentProvider.save(content, function(err, todo) {
        if (err) {
            console.log(err);
        }
    });
}

function isImage(stringlet) {
    if (stringlet.indexOf(".jpg") > -1 || stringlet.indexOf(".jpeg") > -1 || stringlet.indexOf(".gif") > -1 || stringlet.indexOf(".png") > -1)
        return true;
    else
        return false;
}

function isDisplayImage(image) {
    if ((image.indexOf("http") >= 0 || image.indexOf("https") >= 0) && (image.indexOf(".jpg") >= 0 || image.indexOf(".jpeg") >= 0 || image.indexOf(".png") >= 0 || image.indexOf(".svg") >= 0)) {
        return true;
    } else 
        return false;
}

function isVideo(stringlet) {
    var regexYoutube = new RegExp(/((youtube\.com\/watch\?v=)|(youtu\.be\/))(.{11})/i);
    var regexVimeo = new RegExp(/vimeo.com\/(.{8})/i);

    var youtubeMatch = regexYoutube.exec(stringlet);
    var vimeoMatch = regexVimeo.exec(stringlet);

    if (youtubeMatch || vimeoMatch)
        return true;
    else
        return false;
}

function isUrl(stringlet) {
    var regexUrl = new RegExp(/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g);
    var URLMatch = regexUrl.exec(stringlet);

    if (URLMatch)
        return true;
    else
        return false;
}

function toImage(userid, stringlet) {
    var imgurUrl = q.defer();
    var imageInfo = {};

    imageInfo.userid = userid;
    imageInfo.type = 'IMAGE';
    imageInfo.half = true;

    if (stringlet.indexOf("imgur") < 0) {
        imgur.upload(stringlet, function(err, res) {
            if (err) {
                console.log(err);
                imgurUrl.reject(err);
                
            }
            else {
                console.log(stringlet + " to " + res.data.link);
                imageInfo.content = res.data.link;
                imgurUrl.resolve(imageInfo);
            }
        });
    } else {
        imageInfo.content = stringlet;
        imgurUrl.resolve(imageInfo);
    }

    return imgurUrl.promise;
}

function toVideo(userid, stringlet) {
    var regexYoutube = new RegExp(/((youtube\.com\/watch\?v=)|(youtu\.be\/))(.{11})/i);
    var regexVimeo = new RegExp(/vimeo.com\/(\d*)/i);

    var youtubeMatch = regexYoutube.exec(stringlet);
    var vimeoMatch = regexVimeo.exec(stringlet);

    var data = q.defer();
    var videoInfo = {};

    videoInfo.userid = userid;
    videoInfo.type = 'VIDEO';
    videoInfo.half = true;
    videoInfo.content = stringlet;

    request(stringlet, function(error, response, body) {
        if (error) console.log(error);
        var $;
        try {
            $ = cheerio.load(body);
        }
        catch (err) {
            console.log(err);
            return;
        }

        videoInfo.title = $("title").text();

        if (youtubeMatch !== null) {
            console.log('Youtube Match: ' + youtubeMatch[4]);
            videoInfo.img = 'http://img.youtube.com/vi/' + youtubeMatch[4] + '/0.jpg';
            videoInfo.embed = 'https://www.youtube.com/embed/' + youtubeMatch[4];
            data.resolve(videoInfo);
        }
        else {
            $("img").each(function() {
                try {
                    var srcImg = $(this).attr("src");
                    if (isDisplayImage(srcImg)) {
                        videoInfo.img = srcImg;
                        videoInfo.embed = 'https://player.vimeo.com/video/' + vimeoMatch[1];
                        data.resolve(videoInfo);
                        return data.promise;
                    }
                } catch (err) {
                    console.log(err);
                    return;
                }
            });
            data.resolve(videoInfo);
        }
    });

    return data.promise;
}

function toURL(userid, stringlet) {
    var data = q.defer();
    var URLInfo = {};

    URLInfo.userid = userid;
    URLInfo.type = 'URL';
    URLInfo.half = false;
    URLInfo.content = stringlet;

    request(stringlet, function(error, response, body) {
        if (error) console.log(error);
        var $;
        try {
            $ = cheerio.load(body);
        } catch (err) {
            console.log(err);
            return;
        }

        URLInfo.title = $("title").text();
        //Default Image
        URLInfo.img = 'http://i.imgur.com/JimTudA.jpg';

        $("img").each(function() {
            try {
                var srcImg = $(this).attr("src");
                if (isDisplayImage(srcImg)) {
                    URLInfo.img = srcImg;
                    data.resolve(URLInfo);
                    return data.promise;
                }
            } catch (err) {
                console.log(err);
                return;
            }
        });
        data.resolve(URLInfo);
    });
    return data.promise;
}

exports.ContentPoster = ContentPoster;