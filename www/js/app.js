angular.module('starter', ['ionic', 'ngCordova', 'hc.marked', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if (typeof analytics !== 'undefined'){
      analytics.startTrackerWithId('UA-60917659-4');
      analytics.trackView('Screen Title')
    } else {
      console.log("Google Analytics plugin could not be loaded.")
    }
    if(window.plugins && window.plugins.AdMob) {
      var admob_key = device.platform == "Android" ? "ANDROID_PUBLISHER_KEY" : "IOS_PUBLISHER_KEY";
      var admob = window.plugins.AdMob;
      admob.createBannerView(
        {
          'publisherId': 'ca-app-pub-3662578183051823/3416509805',
          'adSize': admob.AD_SIZE.BANNER,
          'bannerAtTop': false
        },
        function() {
          admob.requestAd(
            { 'isTesting': false },
            function() {
              admob.showAd(true);
            },
            function() { console.log('failed to request ad'); }
          );
        },
        function() { console.log('failed to create banner view'); }
      );
    }
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.config(function ($cordovaAppRateProvider) {
  document.addEventListener("deviceready", function () {
    var prefs = {
      language: 'zh-Hans',
      appName: '教你设计物联网',
      androidURL: 'market://details?id=com.phodal.designiot'
    };
    var strings = {
      title: '动动手指，为我们打分',
      message: '无论是来自亲的赞美诗，还是让亲唾沫横飞的槽点，我们只愿——让评价来得更猛烈些吧！',
      cancelButtonLabel: '残忍地拒绝',
      laterButtonLabel: '容我考虑考虑',
      rateButtonLabel: '马上就去'
    };
    $cordovaAppRateProvider.setCustomLocale(strings);
    $cordovaAppRateProvider.setPreferences(prefs);
  }, false);
})

  .config(['markedProvider', function (markedProvider) {
  markedProvider.setOptions({
    gfm: true,
    tables: true,
    highlight: function (code) {
      return hljs.highlightAuto(code).value;
    }
  })
}])

.config(function($ionicConfigProvider){
	$ionicConfigProvider.tabs.position('bottom');
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('tab', {
    url: "/tab",
    abstract: true,
    templateUrl: "templates/tabs.html"
  })

  .state('tab.home', {
    url: '/home',
    views: {
      'tab-home': {
        templateUrl: 'templates/tab-homepage.html',
        controller: 'HomeCtrl'
      }
    }
  })

  .state('tab.blog', {
      url: '/blog',
      views: {
        'tab-blog': {
          templateUrl: 'templates/tab-blog.html',
          controller: 'BlogCtrl'
        }
      }
    })
    .state('tab.blog-detail', {
      url: '/blog/:blogId',
      views: {
        'tab-blog': {
          templateUrl: 'templates/blog-detail.html',
          controller: 'BlogDetailCtrl'
        }
      }
    })

  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/tab-about.html',
        controller: 'AccountCtrl'
      }
    }
  })

  .state('tab.flask', {
    url: '/flask',
    views: {
      'tab-flask': {
        templateUrl: 'templates/tab-flask.html',
        controller: 'FlaskCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tab/home');

});
