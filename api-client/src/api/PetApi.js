/**
 * Pet Adoption System API
 * API for user registration, login, adopter preferences, shelter pet management, and recommendations in the Pet Adoption System.
 *
 * The version of the OpenAPI document: 4.0.0
 * Contact: support@petadoption.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */


import ApiClient from "../ApiClient";
import FailureApiResponse from '../model/FailureApiResponse';
import PetAddProfilePostRequest from '../model/PetAddProfilePostRequest';
import PetUpdateProfilePutRequest from '../model/PetUpdateProfilePutRequest';
import SuccessApiResponse from '../model/SuccessApiResponse';

/**
* Pet service.
* @module api/PetApi
* @version 4.0.0
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
     * @param {module:model/SuccessApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Add a new pet profile to the system
     * Add a new pet profile to the system.
     * @param {module:model/PetAddProfilePostRequest} petAddProfilePostRequest 
     * @param {module:api/PetApi~petAddProfilePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SuccessApiResponse}
     */
    petAddProfilePost(petAddProfilePostRequest, callback) {
      let postBody = petAddProfilePostRequest;
      // verify the required parameter 'petAddProfilePostRequest' is set
      if (petAddProfilePostRequest === undefined || petAddProfilePostRequest === null) {
        throw new Error("Missing the required parameter 'petAddProfilePostRequest' when calling petAddProfilePost");
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
      let returnType = SuccessApiResponse;
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
     * @param data This operation does not return a value.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Deletes a pet profile
     * Deletes the pet profile with the specified ID.
     * @param {Number} petId The unique ID of the pet profile to delete.
     * @param {module:api/PetApi~petDeleteProfilePetIdDeleteCallback} callback The callback function, accepting three arguments: error, data, response
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

      let authNames = [];
      let contentTypes = [];
      let accepts = [];
      let returnType = null;
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
     * @param {module:model/PetAddProfilePostRequest} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve pet profile information
     * Fetches the pet profile details.
     * @param {module:api/PetApi~petGetProfileGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/PetAddProfilePostRequest}
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

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = PetAddProfilePostRequest;
      return this.apiClient.callApi(
        '/pet/get-profile', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the petUpdateProfilePut operation.
     * @callback module:api/PetApi~petUpdateProfilePutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/SuccessApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Update pet profile
     * @param {module:model/PetUpdateProfilePutRequest} petUpdateProfilePutRequest 
     * @param {module:api/PetApi~petUpdateProfilePutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SuccessApiResponse}
     */
    petUpdateProfilePut(petUpdateProfilePutRequest, callback) {
      let postBody = petUpdateProfilePutRequest;
      // verify the required parameter 'petUpdateProfilePutRequest' is set
      if (petUpdateProfilePutRequest === undefined || petUpdateProfilePutRequest === null) {
        throw new Error("Missing the required parameter 'petUpdateProfilePutRequest' when calling petUpdateProfilePut");
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
      let returnType = SuccessApiResponse;
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
     * @param {module:model/SuccessApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Upload an image for a pet
     * Uploads an image file for a specific pet.
     * @param {Number} petId 
     * @param {File} image 
     * @param {module:api/PetApi~petUploadImagePostCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/SuccessApiResponse}
     */
    petUploadImagePost(petId, image, callback) {
      let postBody = null;
      // verify the required parameter 'petId' is set
      if (petId === undefined || petId === null) {
        throw new Error("Missing the required parameter 'petId' when calling petUploadImagePost");
      }
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
        'petId': petId,
        'image': image
      };

      let authNames = [];
      let contentTypes = ['multipart/form-data'];
      let accepts = ['application/json'];
      let returnType = SuccessApiResponse;
      return this.apiClient.callApi(
        '/pet/upload-image', 'POST',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
