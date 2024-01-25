var hamiltonCounty = ee.FeatureCollection('TIGER/2018/Counties')
  .filter(ee.Filter.and(
      ee.Filter.eq('NAME', 'Hamilton'),
      ee.Filter.eq('STATEFP', '20') // '20' is the FIPS code for Kansas
  ));

var image2 = ee.Image('projects/ee-hamara/assets/1989')

// Short wave infrared band
var SWIR = {bands: 'B5',
            min: 84,
            max: 163,
            gamma: 1.0 // for testing
};

Map.centerObject(hamiltonCounty, 8)
Map.addLayer(image, SWIR, 'LANDSAT') ));
