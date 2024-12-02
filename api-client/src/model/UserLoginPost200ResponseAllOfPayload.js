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
import Role from './Role';

/**
 * The UserLoginPost200ResponseAllOfPayload model module.
 * @module model/UserLoginPost200ResponseAllOfPayload
 * @version 5.0.0
 */
class UserLoginPost200ResponseAllOfPayload {
    /**
     * Constructs a new <code>UserLoginPost200ResponseAllOfPayload</code>.
     * @alias module:model/UserLoginPost200ResponseAllOfPayload
     */
    constructor() { 
        
        UserLoginPost200ResponseAllOfPayload.initialize(this);
    }

    /**
     * Initializes the fields of this object.
     * This method is used by the constructors of any subclasses, in order to implement multiple inheritance (mix-ins).
     * Only for internal use.
     */
    static initialize(obj) { 
    }

    /**
     * Constructs a <code>UserLoginPost200ResponseAllOfPayload</code> from a plain JavaScript object, optionally creating a new instance.
     * Copies all relevant properties from <code>data</code> to <code>obj</code> if supplied or a new instance if not.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @param {module:model/UserLoginPost200ResponseAllOfPayload} obj Optional instance to populate.
     * @return {module:model/UserLoginPost200ResponseAllOfPayload} The populated <code>UserLoginPost200ResponseAllOfPayload</code> instance.
     */
    static constructFromObject(data, obj) {
        if (data) {
            obj = obj || new UserLoginPost200ResponseAllOfPayload();

            if (data.hasOwnProperty('role')) {
                obj['role'] = Role.constructFromObject(data['role']);
            }
            if (data.hasOwnProperty('profileSet')) {
                obj['profileSet'] = ApiClient.convertToType(data['profileSet'], 'Boolean');
            }
            if (data.hasOwnProperty('token')) {
                obj['token'] = ApiClient.convertToType(data['token'], 'String');
            }
        }
        return obj;
    }

    /**
     * Validates the JSON data with respect to <code>UserLoginPost200ResponseAllOfPayload</code>.
     * @param {Object} data The plain JavaScript object bearing properties of interest.
     * @return {boolean} to indicate whether the JSON data is valid with respect to <code>UserLoginPost200ResponseAllOfPayload</code>.
     */
    static validateJSON(data) {
        // ensure the json data is a string
        if (data['token'] && !(typeof data['token'] === 'string' || data['token'] instanceof String)) {
            throw new Error("Expected the field `token` to be a primitive type in the JSON string but got " + data['token']);
        }

        return true;
    }


}



/**
 * @member {module:model/Role} role
 */
UserLoginPost200ResponseAllOfPayload.prototype['role'] = undefined;

/**
 * @member {Boolean} profileSet
 */
UserLoginPost200ResponseAllOfPayload.prototype['profileSet'] = undefined;

/**
 * @member {String} token
 */
UserLoginPost200ResponseAllOfPayload.prototype['token'] = undefined;






export default UserLoginPost200ResponseAllOfPayload;

