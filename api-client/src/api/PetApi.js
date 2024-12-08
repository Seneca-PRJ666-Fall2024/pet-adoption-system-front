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
import Pet from '../model/Pet';
import PetGetProfileGet200Response from '../model/PetGetProfileGet200Response';
import PetGetProfilePetIdGet200Response from '../model/PetGetProfilePetIdGet200Response';
import UserUploadImagePost200Response from '../model/UserUploadImagePost200Response';

/**
* Pet service.
* @module api/PetApi
* @version 5.0.0
*/
export default class PetApi {

    /**
    * Constructs a new PetApi. 
    * @alias module:api/PetApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the petAddProfilePost operation.
     * @callback module:api/PetApi~petAddProfilePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new pet profile to the system
     * Add a new pet profile to the system.
     * @param {module:model/Pet} pet 
     * @param {module:api/PetApi~petAddProfilePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    petAddProfilePost(pet, callback) {
      let postBody = pet;
      // verify the required parameter 'pet' is set
      if (pet === undefined || pet === null) {
        throw new Error("Missing the required parameter 'pet' when calling petAddProfilePost");
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
        '/pet/add-profile', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the petDeleteProfilePetIdDelete operation.
     * @callback module:api/PetApi~petDeleteProfilePetIdDeleteCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a pet profile
     * Deletes the pet profile with the specified ID.
     * @param {String} petId The unique ID of the pet profile to delete.
     * @param {module:api/PetApi~petDeleteProfilePetIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    petDeleteProfilePetIdDelete(petId, callback) {
      let postBody = null;
      // verify the required parameter 'petId' is set
      if (petId === undefined || petId === null) {
        throw new Error("Missing the required parameter 'petId' when calling petDeleteProfilePetIdDelete");
      }

      let pathParams = {
        'petId': petId
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
        '/pet/delete-profile/{petId}', 'DELETE',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the petGetProfileGet operation.
     * @callback module:api/PetApi~petGetProfileGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PetGetProfileGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve all pet for the current user (shelter)
     * Fetches all pet profile details for the current user (shelter).
     * @param {module:api/PetApi~petGetProfileGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PetGetProfileGet200Response}
     */
    petGetProfileGet(callback) {
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
      let returnType = PetGetProfileGet200Response;
      return this.apiClient.callApi(
        '/pet/get-profile', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the petGetProfilePetIdGet operation.
     * @callback module:api/PetApi~petGetProfilePetIdGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/PetGetProfilePetIdGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve pet profile information
     * Fetches the pet profile details.
     * @param {String} petId The unique ID of the pet profile to delete.
     * @param {module:api/PetApi~petGetProfilePetIdGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PetGetProfilePetIdGet200Response}
     */
    petGetProfilePetIdGet(petId, callback) {
      let postBody = null;
      // verify the required parameter 'petId' is set
      if (petId === undefined || petId === null) {
        throw new Error("Missing the required parameter 'petId' when calling petGetProfilePetIdGet");
      }

      let pathParams = {
        'petId': petId
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
      let returnType = PetGetProfilePetIdGet200Response;
      return this.apiClient.callApi(
        '/pet/get-profile/{petId}', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the petUpdateProfilePut operation.
     * @callback module:api/PetApi~petUpdateProfilePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update pet profile
     * @param {module:model/Pet} pet 
     * @param {module:api/PetApi~petUpdateProfilePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    petUpdateProfilePut(pet, callback) {
      let postBody = pet;
      // verify the required parameter 'pet' is set
      if (pet === undefined || pet === null) {
        throw new Error("Missing the required parameter 'pet' when calling petUpdateProfilePut");
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
        '/pet/update-profile', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the petUploadImagePost operation.
     * @callback module:api/PetApi~petUploadImagePostCallback
     * @param {String} error Error message, if any.
     * @param {module:model/UserUploadImagePost200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upload an image for a pet
     * Uploads an image file for a specific pet.
     * @param {File} image 
     * @param {module:api/PetApi~petUploadImagePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/UserUploadImagePost200Response}
     */
    petUploadImagePost(image, callback) {
      let postBody = null;
      // verify the required parameter 'image' is set
      if (image === undefined || image === null) {
        throw new Error("Missing the required parameter 'image' when calling petUploadImagePost");
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
        '/pet/upload-image', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
