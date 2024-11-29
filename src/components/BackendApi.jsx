import {ApiClient, DefaultApi, AdoptionApi, MatchingApi, PetApi, UserApi} from "../../api-client/src";

export function initBackendApi() {
    const apiClient = new ApiClient();
    apiClient.basePath = `http://143.198.40.227:8080/api/v4`;

    const backendApi = new Object();
    backendApi.adoption = new AdoptionApi(apiClient);
    backendApi.matching = new MatchingApi(apiClient);
    backendApi.pet = new PetApi(apiClient);
    backendApi.user = new UserApi(apiClient)
    return backendApi;
}