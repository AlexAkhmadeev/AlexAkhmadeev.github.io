module.exports = function(homeApp) {
    /**
     * Роутер
     */
    homeApp.config(function($stateProvider, $urlRouterProvider) {

        $stateProvider
            // Главная
            .state('main', {
                url: '/main',
                template: '<ng-main-view></ng-main-view>',
                controller: function () {
                    console.log('Переход на Main View');
                }
            })

            // Багтрекер
            .state('bugtracker', {
                url: '/bugtracker',
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('create', {
                parent:'bugtracker',
                url: '/create',
                template: '<ng-create-ticket></ng-create-ticket>'
            })
            .state('list', {
                parent:'bugtracker',
                url: '/list',
                template: '<ng-ticket-list></ng-ticket-list>'
            })
            .state('current', {
                parent:'bugtracker',
                url: '/current',
                template: '<ng-current-ticket></ng-current-ticket>'
            })

            // Справочник
            .state('directory', {
                abstract: true,
                url: '/directory',
                template: '<ui-view></ui-view>'
            })
            .state('add', {
                parent:'directory',
                url: '/add',
                template: '<ng-dir-add></ng-dir-add>'
            })
            .state('select', {
                parent:'directory',
                url: '/select',
                template: '<ng-dir-select></ng-dir-select>'
            })


            // Клавиши
            .state('keyboard', {
                url: '/keyboard',
                abstract: true,
                template: '<ui-view></ui-view>'
            })
            .state('beats', {
                parent:'keyboard',
                url: '/beats',
                template: '<ng-all-beats></ng-all-beats>'
            })
            .state('statistics', {
                parent:'keyboard',
                url: '/statistics',
                template: '<ng-stat></ng-stat>'
            })
            .state('addbeats', {
                parent:'keyboard',
                url: '/addbeats',
                template: '<ng-add-beats></ng-add-beats>'
            })

            // Спорт
            .state('sport', {
                abstract:true,
                url: '/sport',
                template: '<ui-view></ui-view>'
            })
            .state('allexercises', {
                parent:'sport',
                url: '/allexercises',
                template: '<ng-all-ex></ng-all-ex>'
            })
            .state('doneexercises', {
                parent:'sport',
                url: '/doneexercises',
                template: '<ng-done-ex></ng-done-ex>'
            })
            .state('addexercises', {
                parent:'sport',
                url: '/addexercises',
                template: '<ng-add-ex></ng-add-ex>'
            });




        $urlRouterProvider.otherwise('/main');
        $urlRouterProvider.when('/bugtracker/list', function($state, $stateParams) {
            $state.go('main');
            alert(1);
        });
        $urlRouterProvider.when('ticketList', function($state, $stateParams) {
            $state.go('main');
            alert(1);
        });

    }); // /config


};