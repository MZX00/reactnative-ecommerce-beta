import axios from "axios";
import Constants from "expo-constants";

const baseUrl = Constants.manifest.extra.baseUrl;

const api = async (endpoint, requestType, payload) => {
  // console.log(Constants.manifest);
  console.log(baseUrl);
  try {
    const resp = await axios({
      method: requestType,
      url: baseUrl + endpoint,
      data: payload,
    });
    // console.log("Calling from api");
    // console.log(resp.data.body.products);
    return resp.data;
  } catch (err) {
    let title;
    let message;
    console.log(err);
    if (err.response.data) {
      title = err.response.data.header
        ? err.response.data.header.title
        : "Error";
      message = err.response.data.header
        ? err.response.data.header.message
        : err.message;
    } else {
      title = "Error";
      message = err.message;
    }

    return { error: { title: title, message: message } };
  }
};

export default api;
