/**
 * Created by Александр on 02.01.2017.
 */
module.exports = function(homeApp) {

    homeApp.directive("ngDropDown", function() {
        return {
            restrict: 'E',
            templateUrl: '/app/general/templates/_dropDown.html',
            scope: true,
            replace: true,
            controllerAs: 'DDCtrl',
            bindToController: true,
            controller: function($scope, $attrs, $q, LOVService, TransportService, DropDownFactory) {
                var vm = this;
                $scope.thisCtrl = null;
                vm.items = {};
                vm.currentItem = {};


                // Проверка на наличие дропдауна в контроллере
                var parentScope = $scope.$parent;
                var controller = null;
                for(var key in parentScope) {

                    if(!parentScope[key]) continue;

                    if(parentScope[key].startValue) {
                        controller = parentScope[key];
                        $scope.thisCtrl = controller;
                        break;
                    }

                }
                if(!controller) {
                    console.log("Контроллер не найден!");
                }

                var startButtonValue = controller.startValue; // Начальное значение. Присылает контроллер


                startButtonValue($attrs['type']).then(function(result) {
                    vm.currentItem.header = result;
                });

                // Статическое и динамическое поведение директивы
                if($attrs['beh'] == "dynamic") {

                    vm.items = DropDownFactory;
                    vm.currentItem = DropDownFactory;

                } else {

                    DropDownFactory[$attrs["lovType"]].then(function(result) {
                        vm.items.list = result;
                    });

                }

            },
            link: function($scope, element, attrs, TransportService) {
                var button = element.find("#dd_button");
                var list = element.find("#list");
                var body = angular.element(document.body);
                var window = angular.element(window);

                if(attrs['width']) {
                    button.css({ "width" : attrs['width']});
                    list.css({ "width" : attrs['width']});
                }

                list.hide();

                body.on('click', function(e) {
                    var target = angular.element(e.target);

                    if(target[0] == button[0]) {
                        list.toggle();
                        if(attrs['width']) {
                            $('.dd_item').css({ "width" : attrs['width']});
                        }
                        return;
                    }

                    list.hide();

                });

                var onSelectListener = $scope.thisCtrl.onSelectListener; // Должна быть определена в контроллере!

                list.on('click', function(e) {
                    var target = angular.element(e.target);
                    if(target.hasClass('dd_item')) button.html(target.html());

                    if(onSelectListener) {
                        onSelectListener(attrs['type'], target.html());
                    }

                });

                window.on('scroll', function(e) {

                    list.hide();

                });

            }

        }
    });


};