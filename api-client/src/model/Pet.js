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
 * The Pet model module.
 * @module model/Pet
 * @version 5.0.0
 */
class Pet {
    /**
     * Constructs a new <code>Pet</code>.
     * @alias module:model/Pet
     */
    constructor() { 
        
        Pet.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Pet</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Pet} obj Optional instance to populate.
     * @return {module:model/Pet} The populated <code>Pet</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Pet();

            if (data.hasOwnProperty('petId')) {
                obj['petId'] = ApiClient.convertToType(data['petId'], 'String');
            }
            if (data.hasOwnProperty('shelterId')) {
                obj['shelterId'] = ApiClient.convertToType(data['shelterId'], 'String');
            }
            if (data.hasOwnProperty('name')) {
                obj['name'] = ApiClient.convertToType(data['name'], 'String');
            }
            if (data.hasOwnProperty('images')) {
                obj['images'] = ApiClient.convertToType(data['images'], ['String']);
            }
            if (data.hasOwnProperty('attributes')) {
                obj['attributes'] = ApiClient.convertToType(data['attributes'], {'String': ['String']});
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Pet</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Pet</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['petId'] && !(typeof data['petId'] === 'string' || data['petId'] instanceof String)) {
            throw new Error("Expected the field `petId` to be a primitive type in the JSON string but got " + data['petId']);
        }
        // ensure the json data is a string
        if (data['shelterId'] && !(typeof data['shelterId'] === 'string' || data['shelterId'] instanceof String)) {
            throw new Error("Expected the field `shelterId` to be a primitive type in the JSON string but got " + data['shelterId']);
        }
        // ensure the json data is a string
        if (data['name'] && !(typeof data['name'] === 'string' || data['name'] instanceof String)) {
            throw new Error("Expected the field `name` to be a primitive type in the JSON string but got " + data['name']);
        }
        // ensure the json data is an array
        if (!Array.isArray(data['images'])) {
            throw new Error("Expected the field `images` to be an array in the JSON data but got " + data['images']);
        }

        return true;
    }


}



/**
 * @member {String} petId
 */
Pet.prototype['petId'] = undefined;

/**
 * @member {String} shelterId
 */
Pet.prototype['shelterId'] = undefined;

/**
 * @member {String} name
 */
Pet.prototype['name'] = undefined;

/**
 * @member {Array.<String>} images
 */
Pet.prototype['images'] = undefined;

/**
 * @member {Object.<String, Array.<String>>} attributes
 */
Pet.prototype['attributes'] = undefined;






export default Pet;

