Sample JS scripts to gather geospatial data on the Hamilton County, Kansas, USA region.
All code is meant to be run in the Google Earth Engine Code Editor, and thus has no
configurations or entry points

Once you run the collect.js script, you will get the images as assets in the EE, at
which point you can save them as EE assets and import them in your program to use in
analyze.js.

Once you create an image variable and run analyze.js, with the image variable like the following:

var image = ee.Image('projects/<your_username>/assets/id_of_image')

EE will ask you whether you would like to import the image rather than treat it as a variable. To this, you should agree, and thus the image variables will not be declared in the analysis scripts, you will have to create your own.

Right now, the only data I've found that contains Hamilton county, KS has been Landsat 4 and beyond. (1982+)
