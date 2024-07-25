const GOOGLE_API_KEY = "AIzaSyC9OuR_oE5WHRxwi_1D9Z87anykxfzRsVc";

export const getMapPreview = (lat, lng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:S%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;

  console.log("imagePreviewUrl", imagePreviewUrl);
  return imagePreviewUrl;
};

// 用經緯度座標 轉換人類可讀的地址
export const getAddress = async (lat, lng) => {
  const url = fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`
  );

  const response = await fetch(url);
  if (!response.ok) {
    return new Error("Failed to fetch address!");
  }

  const data = await response.json();
  const address = data.result[0].formatted_address;

  return address;
};
