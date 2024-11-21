/**
 * Pet Adoption System API
 * API for user registration, login, adopter preferences, shelter pet management, and recommendations in the Pet Adoption System.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@petadoption.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 *
 */

import ApiClient from '../ApiClient';

/**
 * The ShelterAddPetPostRequest model module.
 * @module model/ShelterAddPetPostRequest
 * @version 1.0.0
 */
class ShelterAddPetPostRequest {
    /**
     * Constructs a new <code>ShelterAddPetPostRequest</code>.
     * @alias module:model/ShelterAddPetPostRequest
     */
    constructor() { 
        
        ShelterAddPetPostRequest.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>ShelterAddPetPostRequest</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/ShelterAddPetPostRequest} obj Optional instance to populate.
     * @return {module:model/ShelterAddPetPostRequest} The populated <code>ShelterAddPetPostRequest</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new ShelterAddPetPostRequest();

            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('comments')) {
                obj['comments'] = ApiClient.convertToType(data['comments'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>ShelterAddPetPostRequest</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>ShelterAddPetPostRequest</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is a string
        if (data['comments'] && !(typeof data['comments'] === 'string' || data['comments'] instanceof String)) {
            throw new Error("Expected the field `comments` to be a primitive type in the JSON string but got " + data['comments']);
        }

        return true;
    }


}



/**
 * @member {String} name
 */
ShelterAddPetPostRequest.prototype['name'] = undefined;

/**
 * @member {String} comments
 */
ShelterAddPetPostRequest.prototype['comments'] = undefined;






export default ShelterAddPetPostRequest;
