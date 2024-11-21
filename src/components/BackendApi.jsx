import {ApiClient, DefaultApi} from "../../api-client/src";

export function initBackendApi() {
    const apiClient = new ApiClient();
    apiClient.basePath = `http://143.198.40.227:8080/api/v2`;
    return new DefaultApi(apiClient);
}