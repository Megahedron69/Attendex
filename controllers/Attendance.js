import * as turf from "@turf/turf";

export const isUserInGeofence = (
  userLongitude,
  userLatitude,
  officeLocation = [77.31288879111467, 28.684539218304558], // [longitude, latitude]
  radius = 100 // in meters
) => {
  const options = { units: "meters" };
  const userPoint = turf.point([userLatitude, userLongitude]);
  const officePoint = turf.point(officeLocation);
  const distanceToOffice = turf.distance(userPoint, officePoint, options);

  console.log("Distance to office in meters:", distanceToOffice);

  if (distanceToOffice <= radius) {
    console.log("User is within the geofence radius");
    return true;
  } else {
    console.log("User is outside the geofence radius");
    return false;
  }
};
