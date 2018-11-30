'use strict';

const ExifImage = require('exif').ExifImage;

const getCoordinates = (img) => new Promise((resolve,reject) => {
	try	{
		new ExifImage({image:img}, (err, exifData) =>	{
			if (err) {
				console.log(err.message);
			}	else {
				const lat = gpsToDecimal(exifData.gps.GPSLatitude, exifData.gps.GPSLatitudeRef);
				const lon = gpsToDecimal(exifData.gps.GPSLongitude, exifData.gps.GPSLongitudeRef);
				const coor = {
					lati: lat,
					longi: lon
				};
				resolve(coor);
			}
		})
	} catch (e) {
		reject(e.message);
	}
});

const gpsToDecimal = (gpsData, hem) => {
  let d = parseFloat(gpsData[0]) + parseFloat(gpsData[1] / 60) + parseFloat(gpsData[2] / 3600);
  return (hem === 'S' || hem === 'W') ? d *= -1 : d;
};

module.exports ={
  getCoordinates: getCoordinates,
};