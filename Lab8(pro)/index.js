var app = angular.module('hosApp', [ 'ngRoute' ]);
var data;
app.config(function ($routeProvider) {
    $routeProvider
        .when("/", {
            templateUrl: "home.htm"
        })
        .when("/hos", {
            templateUrl: "hospital.htm",
            controller: "hosCntl"
        })
        .when("/doc", {
            templateUrl: "doctor.htm",
            controller: "docCntl"
        })
        .when("/pat", {
            templateUrl: "pat.htm",
            controller: "patCntl"
        });
});
app.controller('hosCntl', function ($scope, $http) {
    $scope.selected = "name";
    $scope.keys = [ "name", "location" ];
    $scope.title = "Hospital";
    $http.get("hos.json")
        .then((resp) => {
            $scope.Data = resp.data.hoslist.hos;
            data = resp.data.hoslist;
        });
});

app.controller('docCntl', function ($scope, $http) {
    $scope.selected = "name";
    $scope.keys = [ "name", "spec" ];
    $scope.title = "Doctors";
    $http.get("doc.json")
        .then((resp) => {
            $scope.Data = resp.data.doc;
            data = resp.data;
        });
});

app.controller('patCntl', function ($scope, $http) {
    $scope.selected = "name";
    $scope.keys = [ "name", "address" ];
    $scope.title = "Patients";
    $http.get("pat.json")
        .then((resp) => {
            $scope.Data = resp.data.pats;
            data = resp.data;
        });
});
function clr() {
    document.getElementById("srch").value = "";
};
app.filter('roman', () => {
    return (x) => getRoman(x);
});

app.filter('sentencecase', () => {
    return (x) => changeCase(true, x);
});

app.filter('togglecase', () => {
    return (x) => changeCase(false, x);
});

app.filter('color', () => {
    return (x) => {
        if (x == "Raipur" || x == "bone") return "text-bg-info";
        else if (x == "Shimla" || x == "heart") return "text-bg-danger";
        else if (x == "skin") return "text-bg-warning";
        else if (x == "Bangalore") return "text-bg-primary";

    };
});
app.filter('jsonfilter', () => {
    let y;
    return (x, dat) => {
        if (dat[ 1 ] == undefined) dat[ 1 ] = "";
        y = [];
        console.log(dat);
        Array.from(x).forEach(element => {
            if (dat[ 0 ] == "name") {
                if (element.name.startsWith(dat[ 1 ].toUpperCase())) y.push(element);
            } else if (dat[ 0 ] == "location") {
                if (element.location.startsWith(dat[ 1 ].toUpperCase())) y.push(element);
            }
            else if (dat[ 0 ] == "type") {
                if (element.spec.startsWith(dat[ 1 ])) y.push(element);
            } else if (dat[ 0 ] == "address") {
                if (element.address.toUpperCase().startsWith(dat[ 1 ].toUpperCase())) y.push(element);
            }
        });
        return y;

    };
});
const getRoman = (number) => {
    number = parseInt(number);
    roman = "";
    if (number > 0 && number <= 10) {
        if (number <= 3) {
            for (let i = 0; i < number; i++) {
                roman += "I";
            }
        } else if (number <= 8) {
            if (number == 4) roman += "I";
            roman += "V";
            if (number > 5) {
                for (let i = 0; i < 5 - number; i++) {
                    roman += "I";
                }
            }
        } else if (number <= 10) {
            if (number == 4) roman += "I";
            roman += "X";
        }
        return roman;
    }
    else return "NULL";
};

const changeCase = (bool, str) => {
    if (bool) {
        return str[ 0 ].toUpperCase() + str.substring(1).toLowerCase();
    } else {
        return str[ 0 ].toLowerCase() + str.substring(1).toUpperCase();
    }
};