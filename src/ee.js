var hamiltonCounty = ee.FeatureCollection('TIGER/2018/Counties')
  .filter(ee.Filter.and(
      ee.Filter.eq('NAME', 'Hamilton'),
      ee.Filter.eq('STATEFP', '20') // '20' is the FIPS code for Kansas
  ));

Map.centerObject(hamiltonCounty, 8)
