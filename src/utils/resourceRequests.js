import requester from "./requester";

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

    return response.data.data;
  } catch (error) {
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
  console.log(resourcePath);
  try {
    const response = await requester.put(resourceUrl, payload, headers);

    return response.data.data;
  } catch (error) {
    console.log(error.message);
  }
};
