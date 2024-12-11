import {ApiClient, DefaultApi, AdoptionApi, MatchingApi, PetApi, UserApi} from "../../api-client/src";

const apiHost = 'http://localhost:8080';
const apiBasePath = `${apiHost}/api/v5`;

export function initBackendApi(authToken) {
    const apiClient = new ApiClient();
    apiClient.basePath = apiBasePath;

    apiClient.defaultHeaders = {}

    if(authToken){
        apiClient.defaultHeaders['Authorization'] = `Bearer ${authToken}`;
    }

    const backendApi = new Object();
    backendApi.adoption = new AdoptionApi(apiClient);
    backendApi.matching = new MatchingApi(apiClient);
    backendApi.pet = new PetApi(apiClient);
    backendApi.user = new UserApi(apiClient);
    backendApi.imagePath = function (url) {
        return apiHost + url;
    };

    return backendApi;
}