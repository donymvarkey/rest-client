import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
  timeout: 10000, // Set a default timeout of 10 seconds
});

// Function to make the API request
async function sendApiRequest(
  method: string,
  url: string,
  headers?: object,
  body?: object
) {
  const startTime = performance.now(); // Record start time
  try {
    const response = await axiosInstance({
      method,
      url,
      headers: headers || {}, // Default to empty headers
      data: body || null, // Only include the body for methods that support it
    });

    const endTime = performance.now(); // Record end time
    const timeTaken = endTime - startTime; // Calculate response time

    // Extract necessary details
    return {
      status: response.status,
      statusText: response.statusText,
      headers: response.headers,
      data: response.data,
      timeTaken: timeTaken.toFixed(2), // Time taken in milliseconds
      requestConfig: response.config, // Original request configuration
    };
  } catch (error) {
    const endTime = performance.now();
    const timeTaken = endTime - startTime;

    // Extract error details
    return {
      status: error.response?.status || "N/A",
      statusText: error.response?.statusText || error.message,
      headers: error.response?.headers || {},
      data: error.response?.data || {},
      timeTaken: timeTaken.toFixed(2),
      requestConfig: error.config,
      error: true, // Indicate an error occurred
    };
  }
}

export default sendApiRequest;
