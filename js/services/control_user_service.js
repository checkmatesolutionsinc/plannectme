angular.module("app").service('UserControlService', ['$localStorage', '$sessionStorage', '$q', '$http', '$rootScope', 'API_CONN', '$location', function ($localStorage, $sessionStorage, $q, $http, $rootScope, API_CONN, $location) {

	this.setUser = function(user){
		var deferred = $q.defer();
		$http.post(API_CONN.NODE_SERVER+"/auth/sign_up", user)
		.success(function(data) {
		        deferred.resolve();
						console.log(data);
		    })
		    .error(function(data) {
		        console.log('Error: ' + data);
						console.log("Unable to connect to server");
						$sessionStorage.user = null;
						$location.path("/error");
		    });
		return deferred.promise;
	}

	this.getUser = function(request){
		//This will be called once the user has been confirmed.
		var deferred = $q.defer();
		$http.get(API_CONN.NODE_SERVER+'/api/users/getProfile', request)
		.success(function(data) {
		        deferred.resolve(data);
		    })
		    .error(function(data) {
		        console.log('Error: ' + data);
						$sessionStorage.user = null;
						$location.path("/error");
		    });
				return deferred.promise;
	}

	this.authUser = function(user){
		var deferred = $q.defer();
		$http.post(API_CONN.NODE_SERVER+"/auth/authenticate", user)
		.success(function(data){
			deferred.resolve(data);
		})
		.error(function(data){
			$sessionStorage.user = null;
			$location.path("/error");
		})
		return deferred.promise;
	}

	this.updateUser = function(user, token){
		console.log(user);
		var deferred = $q.defer();
		$http.post(API_CONN.NODE_SERVER+'/api/users/update_user?token='+token, user)
		.success(function(data){
			if(data.success == false){
				console.log("Token is not valid");
				$sessionStorage.user = null;
				$location.path("/signin");
			}else{
				console.log("Token valid");
				deferred.resolve(data);
			}
		})
		.error(function(data){
			console.log('Error: ' + data);
			$sessionStorage.user = null;
			$location.path("/error");
		})
		return deferred.promise;
	}

	this.changePassword = function(userId, oldPass, newPass, token){
		var deferred = $q.defer();
		var request = {
			'oldPassword': oldPass,
			'newPassword': newPass,
			'userId': userId
		}
		console.log(request);
		$http.post(API_CONN.NODE_SERVER+'/api/users/change_password?token='+token, request)
			.success(function(data){
				if(data.success == false){
					console.log("Token is not valid");
					$sessionStorage.user = null;
					$location.path("/signin");
				}else{
					console.log("Token valid");
					deferred.resolve(data);
				}
			})
			.error(function(data){
				console.log('Error: ' + data);
				$sessionStorage.user = null;
				$location.path("/error");
			})
			return deferred.promise;
	}

}]);