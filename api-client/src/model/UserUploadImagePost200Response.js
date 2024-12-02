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

import ApiClient from '../ApiClient';
import ApiResponse from './ApiResponse';

/**
 * The UserUploadImagePost200Response model module.
 * @module model/UserUploadImagePost200Response
 * @version 5.0.0
 */
class UserUploadImagePost200Response {
    /**
     * Constructs a new <code>UserUploadImagePost200Response</code>.
     * @alias module:model/UserUploadImagePost200Response
     * @implements module:model/ApiResponse
     */
    constructor() { 
        ApiResponse.initialize(this);
        UserUploadImagePost200Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UserUploadImagePost200Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserUploadImagePost200Response} obj Optional instance to populate.
     * @return {module:model/UserUploadImagePost200Response} The populated <code>UserUploadImagePost200Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserUploadImagePost200Response();
            ApiResponse.constructFromObject(data, obj);

            if (data.hasOwnProperty('success')) {
                obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('payload')) {
                obj['payload'] = ApiClient.convertToType(data['payload'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UserUploadImagePost200Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UserUploadImagePost200Response</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }
        // ensure the json data is a string
        if (data['payload'] && !(typeof data['payload'] === 'string' || data['payload'] instanceof String)) {
            throw new Error("Expected the field `payload` to be a primitive type in the JSON string but got " + data['payload']);
        }

        return true;
    }


}



/**
 * @member {Boolean} success
 */
UserUploadImagePost200Response.prototype['success'] = undefined;

/**
 * @member {String} message
 */
UserUploadImagePost200Response.prototype['message'] = undefined;

/**
 * @member {String} payload
 */
UserUploadImagePost200Response.prototype['payload'] = undefined;


// Implement ApiResponse interface:
/**
 * @member {Boolean} success
 */
ApiResponse.prototype['success'] = undefined;
/**
 * @member {String} message
 */
ApiResponse.prototype['message'] = undefined;




export default UserUploadImagePost200Response;

