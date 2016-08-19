require.config({
    paths: {
        tweenjs : 'libs/tweenjs/src/Tween',
        jquery: 'libs/jquery/dist/jquery.min',
        underscore: 'libs/underscore/underscore-min',
        three : 'libs/three.js/build/three.min'
    },

    shim: {
        'tweenjs' : {
            exports : 'TWEEN'
        },
        'jquery': {
            exports: 'jQuery'
        },
        'underscore' : {
            exports: '_'
        },
        'three' : {
            exports : 'THREE'
        }
    }
});

//todo move tsconfig to app/

require([
        'tweenjs',
        'jquery',
        'ts/view/MainView'
    ],

    function (TWEEN,
              $,
              MainView
    ) {

        'use strict';

        var controller;
        var mainView;

        function init() {
            mainView = new MainView.MainView();

            $(document).ready(function () {
                draw(window.performance.now());
            });
        }

        function draw(time) {
            requestAnimationFrame(draw);
            TWEEN.update();
            mainView.draw(time);
        }

        init();
    });


