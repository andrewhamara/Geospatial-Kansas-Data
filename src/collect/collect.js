// Define Hamilton County using the TIGER dataset
var hamiltonCounty = ee.FeatureCollection('TIGER/2018/Counties')
  .filter(ee.Filter.and(
      ee.Filter.eq('NAME', 'Hamilton'),
      ee.Filter.eq('STATEFP', '20') // '20' is the FIPS code for Kansas
  ));

// Function to get yearly images
function getYearlyImage(year) {
  var startDate = ee.Date.fromYMD(year, 1, 1); // 1/1/yyyy
  var endDate = startDate.advance(1, 'year');  // 1/1/yyyy+1

  // Select the appropriate Landsat dataset based on the year
  var dataset;
  if (year < 1984) {
    dataset = ee.ImageCollection('LANDSAT/LT04/C01/T1')
  } else if (year < 1999) {
    dataset = ee.ImageCollection('LANDSAT/LT05/C01/T1')
  } else if (year < 2013) {
    dataset = ee.ImageCollection('LANDSAT/LE07/C01/T1')
  } else {
    dataset = ee.ImageCollection('LANDSAT/LC08/C01/T1')
  }

  // Filter dataset for the given year and bounds
  return dataset
    .filterDate(startDate, endDate)
    .filterBounds(hamiltonCounty);
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
for (var year = 1982; year <= 2022; year++) {
  var imageCollection = getYearlyImage(year);
  var image = imageCollection.median();

  // Check if the image collection is not empty
  if (image.bandNames().length().getInfo() > 0) {
    exportImage(image, year);
  } else {
    print('No images found for year: ' + year);
  }
}
