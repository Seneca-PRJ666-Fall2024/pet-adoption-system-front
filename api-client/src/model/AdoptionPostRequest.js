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

/**
 * The AdoptionPostRequest model module.
 * @module model/AdoptionPostRequest
 * @version 5.0.0
 */
class AdoptionPostRequest {
    /**
     * Constructs a new <code>AdoptionPostRequest</code>.
     * @alias module:model/AdoptionPostRequest
     * @extends Object
     */
    constructor() { 
        
        AdoptionPostRequest.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>AdoptionPostRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/AdoptionPostRequest} obj Optional instance to populate.
     * @return {module:model/AdoptionPostRequest} The populated <code>AdoptionPostRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new AdoptionPostRequest();

            ApiClient.constructFromObject(data, obj, 'String');
            

            if (data.hasOwnProperty('recommendationId')) {
                obj['recommendationId'] = ApiClient.convertToType(data['recommendationId'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>AdoptionPostRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>AdoptionPostRequest</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['recommendationId'] && !(typeof data['recommendationId'] === 'string' || data['recommendationId'] instanceof String)) {
            throw new Error("Expected the field `recommendationId` to be a primitive type in the JSON string but got " + data['recommendationId']);
        }

        return true;
    }


}



/**
 * @member {String} recommendationId
 */
AdoptionPostRequest.prototype['recommendationId'] = undefined;






export default AdoptionPostRequest;
