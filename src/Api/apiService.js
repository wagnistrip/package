import axios from "axios";
import CryptoJS from "crypto-js";
axios.defaults.withCredentials = true;
// import data from '../utils/data.json';
const SECRET_KEY = "k7sP1Dg4WmRpTcA1ZfLuQxBvNmCa8eGs"; // 32 chars
const IV = CryptoJS.enc.Utf8.parse("uA6vW1k2PsRsYz3S"); // 16 chars
const apiClient = axios.create({
  baseURL: "http://192.168.0.186:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
});


export const fetchpackageData = async (url) => {
  try {
    const response = await apiClient.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching coupons codes:", error);
    throw error;
  }
};

export const customerProfile = async (url, token) => {
  try {
    const response = await apiClient.get(url, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching customer profile:", error);
    throw error;
  }
};


export const customerProfileUpdate = async (url, data, token) => {
  try {
    const response = await apiClient.put(url, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error updating customer profile:", error);
    throw error;
  }
};


export const searchFlights = async (formData, token) => {
  const headers = {};
  if (token) headers["Authorization"] = `Bearer ${token}`;

  try {
    const response = await apiClient.post(
      "/flight/search",
      {
        departure: formData.departure,
        arrival: formData.arrival,
        noOfAdults: formData.noOfAdults,
        departureDate: formData.departureDate,
        returnDate: formData.returnDate,
        cabinClass: formData.cabinClass,
        noOfChilds: formData.noOfChilds,
        noOfInfants: formData.noOfInfants,
        tripType: formData.tripType, // 'oneway' or 'roundtrip'
        flightFare: formData.flightFare === "regular" ? "ADT" : formData.flightFare,
      },
      { headers }
    );
    return response.data; // expects { tripType, trip, galileo, amadeus, hostToken, travellers, currency, ... }
  } catch (error) {
    console.error("Error searching flights:", error);
    throw error;
  }
};

export const searchFlightspecial = async (formData, token) => {
  console.log(token,"token");
  const headers = {};


  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await apiClient.post(
      "/specialFlight/search",
     formData,
      { headers }
    );
    return response.data;
  } catch (error) {
    console.error("Error searching flights:", error);
    throw error;
  }
};



export const porfileImgeupload = async (endpoint, requestData, token) => {
  try {
    console.log(requestData, "dkkdkdkl=>");
    const response = await apiClient.post(endpoint, requestData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error occurred while making an external API request:",
      error
    );
    throw error;
  }
};

export const galileoApi = async (endpoint, requestData, token) => {
  const headers = {};
  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    const response = await apiClient.post(endpoint, requestData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error Add passangerdetails flight with Galileo:", error);
    throw error;
  }
};

export const amadeusApi = async (endpoint, requestData) => {
  try {
    const response = await apiClient.post(endpoint, requestData);
    return response.data;
  } catch (error) {
    console.error("Error Add passangerdetails flight with Galileo:", error);
    throw error;
  }
};

// ***************Login **************
export const loginProcess = async (endpoint, requestData) => {
  try {
    const response = await apiClient.post(endpoint, requestData);
    return response.data;
  } catch (error) {
    console.error("Error cancel login due to technical issues:", error);
    throw error;
  }
};

export const otpVerification = async (endpoint, requestData) => {
  try {
    const response = await apiClient.post(endpoint, requestData);
    return response.data;
  } catch (error) {
    console.error("Error otp cancel due to technical issues:", error);
    throw error;
  }
};

export const encryptPayload = (data) => {
  const json = JSON.stringify(data);
  const encrypted = CryptoJS.AES.encrypt(
    json,
    CryptoJS.enc.Utf8.parse(SECRET_KEY),
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  return encrypted.toString();
};

export const decryptPayload = (encryptedText) => {
  const decrypted = CryptoJS.AES.decrypt(
    encryptedText,
    CryptoJS.enc.Utf8.parse(SECRET_KEY),
    {
      iv: IV,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    }
  );
  const plaintext = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(plaintext);
};


