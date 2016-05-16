(function(angular, undefined) {
  angular.module("trippalApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"user",
    "manager",
		"admin"
	]
})

;
})(angular);
