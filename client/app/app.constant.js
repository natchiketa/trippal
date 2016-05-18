(function(angular, undefined) {
  angular.module("trippalApp.constants", [])

.constant("appConfig", {
	"userRoles": [
		"guest",
		"manager",
		"user",
		"admin"
	]
})

;
})(angular);