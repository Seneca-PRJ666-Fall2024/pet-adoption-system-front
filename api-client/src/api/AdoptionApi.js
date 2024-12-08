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
import Adoption from '../model/Adoption';
import AdoptionStatusGet200Response from '../model/AdoptionStatusGet200Response';
import AdoptionStoryGet200Response from '../model/AdoptionStoryGet200Response';
import ApiResponse from '../model/ApiResponse';

/**
* Adoption service.
* @module api/AdoptionApi
* @version 5.0.0
*/
export default class AdoptionApi {

    /**
    * Constructs a new AdoptionApi. 
    * @alias module:api/AdoptionApi
    * @class
    * @param {module:ApiClient} [apiClient] Optional API client implementation to use,
    * default to {@link module:ApiClient#instance} if unspecified.
    */
    constructor(apiClient) {
        this.apiClient = apiClient || ApiClient.instance;
    }


    /**
     * Callback function to receive the result of the adoptionIdCancelPut operation.
     * @callback module:api/AdoptionApi~adoptionIdCancelPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Cancel adoption
     * Adopter cancels adoption
     * @param {String} id The ID of the adoption to cancel
     * @param {module:api/AdoptionApi~adoptionIdCancelPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    adoptionIdCancelPut(id, callback) {
      let postBody = null;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling adoptionIdCancelPut");
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
        '/adoption/{id}/cancel', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the adoptionIdStatusPut operation.
     * @callback module:api/AdoptionApi~adoptionIdStatusPutCallback
     * @param {String} error Error message, if any.
     * @param {module:model/ApiResponse} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve adoption status
     * Fetches the current status of adoptions for the authenticated adopter.
     * @param {String} id The ID of the adoption to update
     * @param {module:model/Adoption} adoption 
     * @param {module:api/AdoptionApi~adoptionIdStatusPutCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/ApiResponse}
     */
    adoptionIdStatusPut(id, adoption, callback) {
      let postBody = adoption;
      // verify the required parameter 'id' is set
      if (id === undefined || id === null) {
        throw new Error("Missing the required parameter 'id' when calling adoptionIdStatusPut");
      }
      // verify the required parameter 'adoption' is set
      if (adoption === undefined || adoption === null) {
        throw new Error("Missing the required parameter 'adoption' when calling adoptionIdStatusPut");
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
      let contentTypes = ['application/json'];
      let accepts = ['application/json'];
      let returnType = ApiResponse;
      return this.apiClient.callApi(
        '/adoption/{id}/status', 'PUT',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the adoptionStatusGet operation.
     * @callback module:api/AdoptionApi~adoptionStatusGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AdoptionStatusGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve adoption status
     * Fetches the current status of adoptions for the authenticated adopter.
     * @param {module:api/AdoptionApi~adoptionStatusGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AdoptionStatusGet200Response}
     */
    adoptionStatusGet(callback) {
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
      let returnType = AdoptionStatusGet200Response;
      return this.apiClient.callApi(
        '/adoption/status', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }

    /**
     * Callback function to receive the result of the adoptionStoryGet operation.
     * @callback module:api/AdoptionApi~adoptionStoryGetCallback
     * @param {String} error Error message, if any.
     * @param {module:model/AdoptionStoryGet200Response} data The data returned by the service call.
     * @param {String} response The complete HTTP response.
     */

    /**
     * Retrieve a list of adoption stories
     * Returns a list of adoption stories with the specified number of objects.
     * @param {Object} opts Optional parameters
     * @param {Number} [N = 5)] The number of adoption story objects to return
     * @param {module:api/AdoptionApi~adoptionStoryGetCallback} callback The callback function, accepting three arguments: error, data, response
     * data is of type: {@link module:model/AdoptionStoryGet200Response}
     */
    adoptionStoryGet(opts, callback) {
      opts = opts || {};
      let postBody = null;

      let pathParams = {
      };
      let queryParams = {
        'N': opts['N']
      };
      let headerParams = {
      };
      let formParams = {
      };

      let authNames = [];
      let contentTypes = [];
      let accepts = ['application/json'];
      let returnType = AdoptionStoryGet200Response;
      return this.apiClient.callApi(
        '/adoption/story', 'GET',
        pathParams, queryParams, headerParams, formParams, postBody,
        authNames, contentTypes, accepts, returnType, null, callback
      );
    }


}
