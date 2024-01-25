// Define the bounding box coordinates for Hamilton County
// These are [longitude, latitude] pairs for the southwest and northeast corners
var hamiltonCountyBounds = ee.Geometry.Rectangle([
  [-102.051764, 37.558789], // Southwest corner
  [-101.556865, 38.002478]  // Northeast corner
]);

var hamiltonCounty = ee.Feature(hamiltonCountyBounds, {name: 'Hamilton County'});
Map.addLayer(hamiltonCounty, {color: 'FF0000'}, 'Hamilton County Bounds');
Map.centerObject(hamiltonCountyBounds, 9);

// Show LANDSAT 2 image data
function getYearlyImage(year) {
  var startDate = ee.Date.fromYMD(year, 1, 1); // 1/1/yyyy
  var endDate = startDate.advance(1, 'year');  // 1/1/yyyy+1

  var dataset = ee.ImageCollection("LANDSAT/LM02/C02/T1");
  var firstImage = dataset.first();
  print("First image info for year " + year, firstImage);

  // Filter dataset for the given year and bounds
  return dataset
    .filterDate(startDate, endDate)
    .filterBounds(hamiltonCountyBounds);
}

// Export function
function exportImage(image, year) {
  Export.image.toDrive({
    image: image,
    description: 'HamiltonCounty_Image_' + year,
    scale: 30,
    region: hamiltonCounty.geometry(),
    maxPixels: 1e9
  });
}

// Get and export images from 1980 to the current year
for (var year = 1975; year <= 1982; year++) {
  var imageCollection = getYearlyImage(year);
  var image = imageCollection.median();

  // Check if the image collection is not empty
  if (image.bandNames().length().getInfo() > 0) {
    exportImage(image, year);
  } else {
    print('No images found for year: ' + year);
  }
}
