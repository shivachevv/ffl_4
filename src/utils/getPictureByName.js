export const getPictureByName = (leagueName, suffix='') => {
  try {
    const img = require(`@/assets/images/home/${leagueName.toLowerCase()}${suffix}`);
    return img;
  } catch (err) {
    // just catch if image missing
  }
}