import {ApiClient, DefaultApi, AdoptionApi, MatchingApi, PetApi, UserApi} from "../../api-client/src";

const apiHost = 'http://143.198.40.227:8080';
const apiBasePath = `${apiHost}/api/v5`;

export function initBackendApi(authToken, errorHandler) {
    const apiClient = new ApiClient();
    apiClient.basePath = apiBasePath;

    apiClient.defaultHeaders = {}

    if(errorHandler){
        function errorHandlingPlugin(req) {
            req.on('response', (res) => {
                if (!res.ok) {
                    console.error('Global Intercepted Error:', res.status, res.body);
                    errorHandler(res);
                }
            });
            return req;
        }
        apiClient.plugins = [errorHandlingPlugin];
    }

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