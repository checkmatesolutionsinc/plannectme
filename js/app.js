angular.module("app", ["ngRoute", "ngStorage", "ngTouch", "ngAnimate", "countrySelect", "ngFileUpload", "rzModule", "chart.js", "cgBusy", "swipe"]).run(function($rootScope, $location) {
    $rootScope.home = function(){
        $location.path('/');
    };
});
