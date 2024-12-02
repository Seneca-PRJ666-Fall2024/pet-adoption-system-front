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
import AdoptionStoryGet200ResponseAllOfPayloadInner from './AdoptionStoryGet200ResponseAllOfPayloadInner';
import ApiResponse from './ApiResponse';

/**
 * The AdoptionStoryGet200Response model module.
 * @module model/AdoptionStoryGet200Response
 * @version 5.0.0
 */
class AdoptionStoryGet200Response {
    /**
     * Constructs a new <code>AdoptionStoryGet200Response</code>.
     * @alias module:model/AdoptionStoryGet200Response
     * @implements module:model/ApiResponse
     */
    constructor() { 
        ApiResponse.initialize(this);
        AdoptionStoryGet200Response.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AdoptionStoryGet200Response</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AdoptionStoryGet200Response} obj Optional instance to populate.
     * @return {module:model/AdoptionStoryGet200Response} The populated <code>AdoptionStoryGet200Response</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AdoptionStoryGet200Response();
            ApiResponse.constructFromObject(data, obj);

            if (data.hasOwnProperty('success')) {
                obj['success'] = ApiClient.convertToType(data['success'], 'Boolean');
            }
            if (data.hasOwnProperty('message')) {
                obj['message'] = ApiClient.convertToType(data['message'], 'String');
            }
            if (data.hasOwnProperty('payload')) {
                obj['payload'] = ApiClient.convertToType(data['payload'], [AdoptionStoryGet200ResponseAllOfPayloadInner]);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AdoptionStoryGet200Response</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AdoptionStoryGet200Response</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['message'] && !(typeof data['message'] === 'string' || data['message'] instanceof String)) {
            throw new Error("Expected the field `message` to be a primitive type in the JSON string but got " + data['message']);
        }
        if (data['payload']) { // data not null
            // ensure the json data is an array
            if (!Array.isArray(data['payload'])) {
                throw new Error("Expected the field `payload` to be an array in the JSON data but got " + data['payload']);
            }
            // validate the optional field `payload` (array)
            for (const item of data['payload']) {
                AdoptionStoryGet200ResponseAllOfPayloadInner.validateJSON(item);
            };
        }

        return true;
    }


}



/**
 * @member {Boolean} success
 */
AdoptionStoryGet200Response.prototype['success'] = undefined;

/**
 * @member {String} message
 */
AdoptionStoryGet200Response.prototype['message'] = undefined;

/**
 * @member {Array.<module:model/AdoptionStoryGet200ResponseAllOfPayloadInner>} payload
 */
AdoptionStoryGet200Response.prototype['payload'] = undefined;


// Implement ApiResponse interface:
/**
 * @member {Boolean} success
 */
ApiResponse.prototype['success'] = undefined;
/**
 * @member {String} message
 */
ApiResponse.prototype['message'] = undefined;




export default AdoptionStoryGet200Response;

