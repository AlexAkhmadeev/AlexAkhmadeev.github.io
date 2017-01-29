/**
 * Created by Александр on 09.01.2017.
 */

    calc.directive("ngCalc", function() {
        return {
            restrict: 'E',
            templateUrl: 'tmp-calc',
            replace: true,
            controllerAs: 'CalcCtrl',
            bindToController: true,
            controller: function ($scope, $attrs, $q) {
                var vm = this;

                //Продукты
                vm.products = [];

                //Скидка
                vm.discount = 0;

                //Применение скидки
                vm.apply = function(discount, form) {
                    if(discount[0] == "0") {
                     alert("Введите число больше 1");   
                    }
                    if(!form.$valid) return;
                    var products = vm.products;
                    if(!products.length) {
                        alert("Добавьте хотя бы один товар");
                        return;
                    }
                    
                    var totalSum = 0, mostPrice = 0, dearest;
                    
                    products.forEach(function(product) {
                        totalSum+= +product.price;
                           if(+product.price > mostPrice) {
                            mostPrice = +product.price;
                            dearest = product;
                        }
                    });
                

                    if(discount > totalSum) {
                        alert("Скидка не может быть больше суммы всех товаров!");
                        return;
                    }

                    var allSumResidual = totalSum;
                    products.forEach(function(product) {
                        var newPrice = +product.price * (1 - +discount/totalSum);
                        product.discountPrice = Math.round(newPrice);
                        allSumResidual -= Math.round(newPrice);
                    });

                    // Если есть остаток
                    var discountResidual = discount - allSumResidual;
                    if(discount - allSumResidual) {
                        dearest.discountPrice = +(dearest.discountPrice) - discountResidual;
                    }
                return false;
                };

                //Добавление продукта
                vm.addProduct = function(product, form) {
                    if (!form.$valid) return;
                    product.discountPrice = product.price;
                    vm.products.push(product);
                    vm.product = {};
                };

            }
        }
    });
