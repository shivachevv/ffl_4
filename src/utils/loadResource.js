import requester from "./requester";

export const requestResource = async (resourcePath, mainId, secondaryId) => {
  let headers = {};
  let accessToken = localStorage.getItem("Access-Token");
  headers["Authorization"] = `Bearer ${accessToken}`;

  let resourceUrl = secondaryId
    ? `${resourcePath}/${mainId}/${secondaryId}`
    : mainId
    ? `${resourcePath}/${mainId}`
    : resourcePath;

  try {
    const response = await requester.get(resourceUrl, headers);

    return response.data;
  } catch (error) {
    console.log(error.message);
  }
};
