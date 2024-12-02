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
import RecommendationStatus from './RecommendationStatus';

/**
 * The Recommendation model module.
 * @module model/Recommendation
 * @version 5.0.0
 */
class Recommendation {
    /**
     * Constructs a new <code>Recommendation</code>.
     * @alias module:model/Recommendation
     */
    constructor() { 
        
        Recommendation.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>Recommendation</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/Recommendation} obj Optional instance to populate.
     * @return {module:model/Recommendation} The populated <code>Recommendation</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new Recommendation();

            if (data.hasOwnProperty('id')) {
                obj['id'] = ApiClient.convertToType(data['id'], 'String');
            }
            if (data.hasOwnProperty('petId')) {
                obj['petId'] = ApiClient.convertToType(data['petId'], 'String');
            }
            if (data.hasOwnProperty('date')) {
                obj['date'] = ApiClient.convertToType(data['date'], 'Date');
            }
            if (data.hasOwnProperty('status')) {
                obj['status'] = RecommendationStatus.constructFromObject(data['status']);
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>Recommendation</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>Recommendation</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['id'] && !(typeof data['id'] === 'string' || data['id'] instanceof String)) {
            throw new Error("Expected the field `id` to be a primitive type in the JSON string but got " + data['id']);
        }
        // ensure the json data is a string
        if (data['petId'] && !(typeof data['petId'] === 'string' || data['petId'] instanceof String)) {
            throw new Error("Expected the field `petId` to be a primitive type in the JSON string but got " + data['petId']);
        }

        return true;
    }


}



/**
 * @member {String} id
 */
Recommendation.prototype['id'] = undefined;

/**
 * @member {String} petId
 */
Recommendation.prototype['petId'] = undefined;

/**
 * @member {Date} date
 */
Recommendation.prototype['date'] = undefined;

/**
 * @member {module:model/RecommendationStatus} status
 */
Recommendation.prototype['status'] = undefined;






export default Recommendation;

