/**
 * Pet Adoption System API
 * API for user registration, login, adopter preferences, shelter pet management, and recommendations in the Pet Adoption System.
 *
 * The version of the OpenAPI document: 5.0.0
 * Contact: support@petadoption.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import ApiResponse from '../model/ApiResponse';
import User from '../model/User';
import UserGetProfileGet200Response from '../model/UserGetProfileGet200Response';
import UserLoginPost200Response from '../model/UserLoginPost200Response';
import UserLoginPostRequest from '../model/UserLoginPostRequest';
import UserRegisterPostRequest from '../model/UserRegisterPostRequest';
import UserUploadImagePost200Response from '../model/UserUploadImagePost200Response';

/**
* User service.
* @module api/UserApi
* @version 5.0.0
*/
export default class UserApi {

    /**
    * Constructs a new UserApi. 
    * @alias module:api/UserApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the userDeleteProfileIdDelete operation.
     * @callback module:api/UserApi~userDeleteProfileIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Delete a user profile
     * Deletes the user profile with the specified ID. Requires authentication and authorization.
     * @param {String} id The userId for the profile that needs to be deleted
     * @param {module:api/UserApi~userDeleteProfileIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    userDeleteProfileIdDelete(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling userDeleteProfileIdDelete");
      }

      let pathParams = {
        'id': id
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['BearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = ApiResponse;
      return this.apiClient.callApi(
        '/user/delete-profile/{id}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the userGetProfileGet operation.
     * @callback module:api/UserApi~userGetProfileGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserGetProfileGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve user profile information
     * Fetches the profile details of the currently authenticated user (adopter or shelter).
     * @param {module:api/UserApi~userGetProfileGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserGetProfileGet200Response}
     */
    userGetProfileGet(callback) {
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['BearerAuth'];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = UserGetProfileGet200Response;
      return this.apiClient.callApi(
        '/user/get-profile', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the userLoginPost operation.
     * @callback module:api/UserApi~userLoginPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserLoginPost200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Login a user
     * Logs in a user using email and password, and returns a user role and a JWT token.
     * @param {module:model/UserLoginPostRequest} userLoginPostRequest 
     * @param {module:api/UserApi~userLoginPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserLoginPost200Response}
     */
    userLoginPost(userLoginPostRequest, callback) {
      let postBody = userLoginPostRequest;
      // verify the required parameter 'userLoginPostRequest' is set
      if (userLoginPostRequest === undefined || userLoginPostRequest === null) {
        throw new Error("Missing the required parameter 'userLoginPostRequest' when calling userLoginPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = UserLoginPost200Response;
      return this.apiClient.callApi(
        '/user/login', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the userPreferencesPost operation.
     * @callback module:api/UserApi~userPreferencesPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add preferences for pet attributes grouped by attribute groups
     * Submit a set of preferences for different attribute groups. Each key in the JSON object represents an attribute group name, and its corresponding value is a list of selected preferences 
     * @param {Object.<String, {String: [String]}>} requestBody 
     * @param {module:api/UserApi~userPreferencesPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    userPreferencesPost(requestBody, callback) {
      let postBody = requestBody;
      // verify the required parameter 'requestBody' is set
      if (requestBody === undefined || requestBody === null) {
        throw new Error("Missing the required parameter 'requestBody' when calling userPreferencesPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['BearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = ApiResponse;
      return this.apiClient.callApi(
        '/user/preferences', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the userRegisterPost operation.
     * @callback module:api/UserApi~userRegisterPostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Register a new user
     * Registers a new user with an email, password, and account type (Pet Adopter or Pet Shelter).
     * @param {module:model/UserRegisterPostRequest} userRegisterPostRequest 
     * @param {module:api/UserApi~userRegisterPostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    userRegisterPost(userRegisterPostRequest, callback) {
      let postBody = userRegisterPostRequest;
      // verify the required parameter 'userRegisterPostRequest' is set
      if (userRegisterPostRequest === undefined || userRegisterPostRequest === null) {
        throw new Error("Missing the required parameter 'userRegisterPostRequest' when calling userRegisterPost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = ApiResponse;
      return this.apiClient.callApi(
        '/user/register', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the userUpdateProfilePut operation.
     * @callback module:api/UserApi~userUpdateProfilePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update a user profile
     * @param {module:model/User} user 
     * @param {module:api/UserApi~userUpdateProfilePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    userUpdateProfilePut(user, callback) {
      let postBody = user;
      // verify the required parameter 'user' is set
      if (user === undefined || user === null) {
        throw new Error("Missing the required parameter 'user' when calling userUpdateProfilePut");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = ['BearerAuth'];
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = ApiResponse;
      return this.apiClient.callApi(
        '/user/update-profile', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the userUploadImagePost operation.
     * @callback module:api/UserApi~userUploadImagePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserUploadImagePost200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upload an image for a user
     * Uploads a profile image for a user.
     * @param {File} image 
     * @param {module:api/UserApi~userUploadImagePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserUploadImagePost200Response}
     */
    userUploadImagePost(image, callback) {
      let postBody = null;
      // verify the required parameter 'image' is set
      if (image === undefined || image === null) {
        throw new Error("Missing the required parameter 'image' when calling userUploadImagePost");
      }

      let pathParams = {
      };
      let queryParams = {
      };
      let headerParams = {
      };
      let formParams = {
        'image': image
      };

      let authNames = ['BearerAuth'];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = UserUploadImagePost200Response;
      return this.apiClient.callApi(
        '/user/upload-image', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
