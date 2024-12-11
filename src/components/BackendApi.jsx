import {
  ApiClient,
  DefaultApi,
  AdoptionApi,
  MatchingApi,
  PetApi,
  UserApi,
} from "../../api-client/src";

// Define the host and base path for API requests.
const apiHost = "http://143.198.40.227:8080";
const apiBasePath = `${apiHost}/api/v5`;

// Initialize the backend API client.
export function initBackendApi(authToken, errorHandler) {
  const apiClient = new ApiClient();
  apiClient.basePath = apiBasePath;

  // Initialize default headers for the API client.
  apiClient.defaultHeaders = {};

  // Add error handling plugin if an errorHandler is provided.
  if (errorHandler) {
    function errorHandlingPlugin(req) {
      // Intercepts the response and invokes the errorHandler for non-OK responses.
      req.on("response", (res) => {
        if (!res.ok) {
          console.error("Global Intercepted Error:", res.status, res.body);
          errorHandler(res);
        }
      });
      return req;
    }
    apiClient.plugins = [errorHandlingPlugin];
  }

  // Add the authorization token to the default headers if provided.
  if (authToken) {
    apiClient.defaultHeaders["Authorization"] = `Bearer ${authToken}`;
  }

  // Create an object to hold API modules.
  const backendApi = new Object();

  // Initialize various API modules using the configured API client.
  backendApi.adoption = new AdoptionApi(apiClient);
  backendApi.matching = new MatchingApi(apiClient);
  backendApi.pet = new PetApi(apiClient);
  backendApi.user = new UserApi(apiClient);

  // Utility function to generate full URLs for image paths.
  backendApi.imagePath = function (url) {
    // Concatenate the host with the provided URL.
    return apiHost + url;
  };

  // Return the initialized API object.
  return backendApi;
}
