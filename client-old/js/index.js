// public/core.js
var iotaModule = angular.module('iotaModule', []);

/*iotaModule.config(function($routeProvider, $locationProvider) {
      console.log('config block');
    $routeProvider.
      when("/persons",
        { templateUrl: "partials/index.html" }).
      when("/login",
        { templateUrl: "login.html", controller: "LoginCtrl" }).
      otherwise( { redirectTo: "/persons" });
});

iotaModule.run(function($rootScope, $window) {
    console.log('run block');
    if ($rootScope.loggedInUser == null) {
        console.log('no user login');
        //$window.location.href = '/login.html';
      }
});
*/
/*function mainController($scope, $http) {
    
    $http.get('/api/contents')
        .success(function(data) {
            $scope.contents = data;
            console.log(data);
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
}*/

iotaModule.controller("mainController", function($scope, $http) {
    // when landing on the page, get all contents and show them
    $http.get('/api/contents')
        .success(function(data) {
            $scope.contents = data;
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
});

iotaModule.controller("loginController", function($scope, $location, $rootScope) {
  $scope.login = function() {
    //$rootScope.loggedInUser = $scope.username;
    //$location.path("/persons");
  };
});

iotaModule.directive('contentItem', function ($compile) {
    
    var stringletTemplate = '<div class="content"> <div class="content-iota"> {{ content.content }} </div> </div>';
    var imageTemplate = '<div class="image-screen" ng-click="expandImage(content.content)"></div><img class="content-image" src="{{ content.content }}">';
    var videoTemplate = '<div class="content"> <div class="content-actions"><div class="actions-button" ng-click="openActions($event)"><span class="genericon genericon-ellipsis hover-solid"></span></div></div><div class="content-iota content-link with-thumb" ng-click="playVideo($event, content)"><div class="content-link-title">{{ content.title }}<div class="play-button"><span class="genericon genericon-play"></span></div></div></div><div class="perma-image-screen"></div><img class="content-image" src="{{ content.img }}"></div>';
    var urlTemplate = '<div class="content"> <div class="content-actions"> <div class="actions-button" onclick="openActions($event)"> <span class="genericon genericon-ellipsis hover-solid"> </span> </div> </div> <a href="{{ content.content }}" target="_blank"><div class="content-iota content-link with-thumb"><div class="content-link-title">{{ content.title }}</div><br>{{ content.content }}</div></a><div class="perma-image-screen"> </div> <img class="content-image" src="{{ content.img }}"> </div>';

    var getTemplate = function (contentType) {
        var template = '';

        switch (contentType) {
            case 'STRING':
                template = stringletTemplate;
                break;
            case 'IMAGE':
                template = imageTemplate;
                break;
            case 'VIDEO':
                template = videoTemplate;
                break;
            case 'URL':
                template = urlTemplate;
                break;
        }
        return template;
    };

    var linker = function(scope, element, attrs) {
        element.html(getTemplate(scope.content.type)).show();
        $compile(element.contents())(scope);
    };

    return {
        restrict: 'E',
        link: linker,
        scope: {
            content:'='
        },
        controller: function($scope, $element){
            $scope.expandImage = function(content){
                $('body').append($('<div>', { class: 'curtain' }).append($('<img>', { class: 'image-expand', src: content })).click(function() {
                    $('.curtain').remove();
                }));
             };
            $scope.playVideo = function($event, content){
                var grandParentElement = angular.element($event.currentTarget).parent().parent();
                grandParentElement.toggleClass("content-media content-half");
                grandParentElement.html('<div class="hidden">'+angular.element($event.currentTarget).html()+'</div><iframe id="ytplayer" type="text/html" src="'+content.embed+'" width="100%" height="330px" frameborder="0" allowfullscreen/><a href="#!" class="hover-pink" ng-click="closeVideo($event)">close</a>');
            };
            $scope.closeVideo = function($event){
                var parentElement = angular.element($event.currentTarget).parent();
                angular.element($event.currentTarget).html("<div>TEST</div>");
                parentElement.html("<div>TEST</div>");
                parentElement.toggleClass("content-media content-half");
                parentElement.html(parentElement.children(".hidden").html());
            };
        }
    };
});