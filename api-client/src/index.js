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


import ApiClient from './ApiClient';
import AdopterPreferencesPostRequest from './model/AdopterPreferencesPostRequest';
import AdoptionStoryGet200ResponseInner from './model/AdoptionStoryGet200ResponseInner';
import ApiResponse from './model/ApiResponse';
import PetUpdateInfoPutRequest from './model/PetUpdateInfoPutRequest';
import Recommendation from './model/Recommendation';
import ShelterAddPetPostRequest from './model/ShelterAddPetPostRequest';
import ShelterUpdateContactsPutRequest from './model/ShelterUpdateContactsPutRequest';
import UserLoginPost200Response from './model/UserLoginPost200Response';
import UserLoginPostRequest from './model/UserLoginPostRequest';
import UserRegisterPostRequest from './model/UserRegisterPostRequest';
import UserUpdateContactsPutRequest from './model/UserUpdateContactsPutRequest';
import DefaultApi from './api/DefaultApi';


/**
* API for user registration, login, adopter preferences, shelter pet management, and recommendations in the Pet Adoption System..<br>
* The <code>index</code> module provides access to constructors for all the classes which comprise the public API.
* <p>
* An AMD (recommended!) or CommonJS application will generally do something equivalent to the following:
* <pre>
* var PetAdoptionSystemApi = require('index'); // See note below*.
* var xxxSvc = new PetAdoptionSystemApi.XxxApi(); // Allocate the API class we're going to use.
* var yyyModel = new PetAdoptionSystemApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* <em>*NOTE: For a top-level AMD script, use require(['index'], function(){...})
* and put the application logic within the callback function.</em>
* </p>
* <p>
* A non-AMD browser application (discouraged) might do something like this:
* <pre>
* var xxxSvc = new PetAdoptionSystemApi.XxxApi(); // Allocate the API class we're going to use.
* var yyy = new PetAdoptionSystemApi.Yyy(); // Construct a model instance.
* yyyModel.someProperty = 'someValue';
* ...
* var zzz = xxxSvc.doSomething(yyyModel); // Invoke the service.
* ...
* </pre>
* </p>
* @module index
* @version 1.0.0
*/
export {
    /**
     * The ApiClient constructor.
     * @property {module:ApiClient}
     */
    ApiClient,

    /**
     * The AdopterPreferencesPostRequest model constructor.
     * @property {module:model/AdopterPreferencesPostRequest}
     */
    AdopterPreferencesPostRequest,

    /**
     * The AdoptionStoryGet200ResponseInner model constructor.
     * @property {module:model/AdoptionStoryGet200ResponseInner}
     */
    AdoptionStoryGet200ResponseInner,

    /**
     * The ApiResponse model constructor.
     * @property {module:model/ApiResponse}
     */
    ApiResponse,

    /**
     * The PetUpdateInfoPutRequest model constructor.
     * @property {module:model/PetUpdateInfoPutRequest}
     */
    PetUpdateInfoPutRequest,

    /**
     * The Recommendation model constructor.
     * @property {module:model/Recommendation}
     */
    Recommendation,

    /**
     * The ShelterAddPetPostRequest model constructor.
     * @property {module:model/ShelterAddPetPostRequest}
     */
    ShelterAddPetPostRequest,

    /**
     * The ShelterUpdateContactsPutRequest model constructor.
     * @property {module:model/ShelterUpdateContactsPutRequest}
     */
    ShelterUpdateContactsPutRequest,

    /**
     * The UserLoginPost200Response model constructor.
     * @property {module:model/UserLoginPost200Response}
     */
    UserLoginPost200Response,

    /**
     * The UserLoginPostRequest model constructor.
     * @property {module:model/UserLoginPostRequest}
     */
    UserLoginPostRequest,

    /**
     * The UserRegisterPostRequest model constructor.
     * @property {module:model/UserRegisterPostRequest}
     */
    UserRegisterPostRequest,

    /**
     * The UserUpdateContactsPutRequest model constructor.
     * @property {module:model/UserUpdateContactsPutRequest}
     */
    UserUpdateContactsPutRequest,

    /**
    * The DefaultApi service constructor.
    * @property {module:api/DefaultApi}
    */
    DefaultApi
};
