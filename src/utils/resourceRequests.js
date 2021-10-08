import requester from "./requester";
import store from "../store";

export const requestResource = async ({
  resourcePath,
  mainId,
  secondaryId,
}) => {
  let headers = {};
  let accessToken = localStorage.getItem("Access-Token");
  headers["Authorization"] = `Bearer ${accessToken}`;

  let resourceUrl = secondaryId
    ? `${resourcePath}/${mainId}/${secondaryId}`
    : mainId
    ? `${resourcePath}/${mainId}`
    : resourcePath;

  return requester.get(resourceUrl, headers);
  // try {
  //   const response = await requester.get(resourceUrl, headers);

  //   return response.data.data;
  // } catch (error) {
  //   console.log(error.message);
  // }
};

export const postResource = async ({
  resourcePath,
  mainId,
  secondaryId,
  payload,
}) => {
  let headers = {};
  let accessToken = localStorage.getItem("Access-Token");
  headers["Authorization"] = `Bearer ${accessToken}`;

  let resourceUrl = secondaryId
    ? `${resourcePath}/${mainId}/${secondaryId}`
    : mainId
    ? `${resourcePath}/${mainId}`
    : resourcePath;

  try {
    const response = await requester.post(resourceUrl, payload, headers);
    store.dispatch("notifications/addNotifications", [
      {
        text: "Successfully saved settings",
        type: "success",
        visible: true,
      },
    ]);
    return response.data.data;
  } catch (error) {
    store.dispatch("notifications/addNotifications", [
      {
        text: "Error saving settings",
        type: "error",
        visible: true,
      },
    ]);
    console.log(error.message);
  }
};

export const putResource = async ({
  resourcePath,
  mainId,
  secondaryId,
  payload,
}) => {
  let headers = {};
  let accessToken = localStorage.getItem("Access-Token");
  headers["Authorization"] = `Bearer ${accessToken}`;

  let resourceUrl = secondaryId
    ? `${resourcePath}/${mainId}/${secondaryId}`
    : mainId
    ? `${resourcePath}/${mainId}`
    : resourcePath;
  try {
    const response = await requester.put(resourceUrl, payload, headers);
    store.dispatch("notifications/addNotifications", [
      {
        text: "Successfully saved settings",
        type: "success",
        visible: true,
      },
    ]);
    return response.data.data;
  } catch (error) {
    store.dispatch("notifications/addNotifications", [
      {
        text: "Error editing settings",
        type: "error",
        visible: true,
      },
    ]);
    console.log(error.message);
  }
};

export const deleteResource = async ({ resourcePath, mainId, secondaryId }) => {
  let headers = {};
  let accessToken = localStorage.getItem("Access-Token");
  headers["Authorization"] = `Bearer ${accessToken}`;

  let resourceUrl = secondaryId
    ? `${resourcePath}/${mainId}/${secondaryId}`
    : mainId
    ? `${resourcePath}/${mainId}`
    : resourcePath;
  try {
    const response = await requester.delete(resourceUrl, headers);
    store.dispatch("notifications/addNotifications", [
      {
        text: "Successfully deleted settings",
        type: "success",
        visible: true,
      },
    ]);
    return response.data.data;
  } catch (error) {
    store.dispatch("notifications/addNotifications", [
      {
        text: "Error deleting settings",
        type: "error",
        visible: true,
      },
    ]);
    console.log(error.message);
  }
};
