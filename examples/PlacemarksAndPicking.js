/*
 * Copyright 2003-2006, 2009, 2017, United States Government, as represented by the Administrator of the
 * National Aeronautics and Space Administration. All rights reserved.
 *
 * The NASAWorldWind/WebWorldWind platform is licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
/**
 * Illustrates how to display and pick Placemarks.
 */
requirejs(['./WorldWindShim',
        './LayerManager'],
    function (WorldWind,
              LayerManager) {
        "use strict";

        // Tell WorldWind to log only warnings and errors.
        WorldWind.Logger.setLoggingLevel(WorldWind.Logger.LEVEL_WARNING);

        // Create the WorldWindow.
        var wwd = new WorldWind.WorldWindow("canvasOne");

        // Create and add layers to the WorldWindow.
        var layers = [
            // Imagery layers.
            {layer: new WorldWind.BMNGLayer(), enabled: true},
            {layer: new WorldWind.BMNGLandsatLayer(), enabled: false},
            {layer: new WorldWind.BingAerialWithLabelsLayer(null), enabled: true},
            // Add atmosphere layer on top of all base layers.
            {layer: new WorldWind.AtmosphereLayer(), enabled: true},
            // WorldWindow UI layers.
            {layer: new WorldWind.CompassLayer(), enabled: true},
            {layer: new WorldWind.CoordinatesDisplayLayer(wwd), enabled: true},
            {layer: new WorldWind.ViewControlsLayer(wwd), enabled: true},
            //{layer: new WorldWind.SharkAttack(wwd), enabled: true}
        ];

        for (var l = 0; l < layers.length; l++) {
            layers[l].layer.enabled = layers[l].enabled;
            wwd.addLayer(layers[l].layer);
        }

        // Define the images we'll use for the placemarks.
        var images = [
            "plain-black.png",
            "plain-blue.png",
            "plain-brown.png",
            "plain-gray.png",
            "plain-green.png",
            "plain-orange.png",
            "plain-purple.png",
            "plain-red.png",
            "plain-teal.png",
            "plain-white.png",
            "plain-yellow.png",
            "castshadow-black.png",
            "castshadow-blue.png",
            "castshadow-brown.png",
            "castshadow-gray.png",
            "castshadow-green.png",
            "castshadow-orange.png",
            "castshadow-purple.png",
            "castshadow-red.png",
            "castshadow-teal.png",
            "castshadow-white.png"
        ];

        var image2 = [
            "shark.png", "shark2.png","shark3.png"
        ];

        WorldWind.configuration.baseUrl
        var pinLibrary = WorldWind.configuration.baseUrl + "images/pushpins/", // location of the image files
            placemark,
            placemarkAttributes = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes,
            placemarkLayer = new WorldWind.RenderableLayer("Placemarks"),
            latitude = 47.684444,
            longitude = -121.129722;

        var sharkLib = WorldWind.configuration.baseUrl + "images/",
            placemark2,
            placemarkAttributes2 = new WorldWind.PlacemarkAttributes(null),
            highlightAttributes2,
            placemarkLayer2 = new WorldWind.RenderableLayer("Shark Attacks"),
            latitude2 = [37.7249303,29.4787,21.5569],
            longitude2 = [-123.0302779,-81.1288,-157.8537];



        // Set up the common placemark attributes.
        placemarkAttributes.imageScale = 1;
        placemarkAttributes.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes.drawLeaderLine = true;
        placemarkAttributes.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

        placemarkAttributes2.imageScale = 0.3;
        placemarkAttributes2.imageOffset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.3,
            WorldWind.OFFSET_FRACTION, 0.0);
        placemarkAttributes2.imageColor = WorldWind.Color.WHITE;
        placemarkAttributes2.labelAttributes.offset = new WorldWind.Offset(
            WorldWind.OFFSET_FRACTION, 0.5,
            WorldWind.OFFSET_FRACTION, 1.0);
        placemarkAttributes2.labelAttributes.color = WorldWind.Color.YELLOW;
        placemarkAttributes2.drawLeaderLine = true;
        placemarkAttributes2.leaderLineAttributes.outlineColor = WorldWind.Color.RED;

        // For each placemark image, create a placemark with a label.
        for (var i = 0, len = images.length; i < len; i++) {
            // Create the placemark and its label.
            placemark = new WorldWind.Placemark(new WorldWind.Position(latitude, longitude + i, 1e2), true, null);
            placemark.label = "Placemark " + i.toString() + "\n"
                + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark.position.longitude.toPrecision(5).toString();
            placemark.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            placemarkAttributes.imageSource = pinLibrary + images[i];
            placemark.attributes = placemarkAttributes;

            // Create the highlight attributes for this placemark. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            highlightAttributes.imageScale = 1.2;
            placemark.highlightAttributes = highlightAttributes;

            // Add the placemark to the layer.
            placemarkLayer.addRenderable(placemark);


        }

        for (var i = 0, len = image2.length; i < len; i++) {
            // Create the placemark2 and its label.
            placemark2 = new WorldWind.Placemark(new WorldWind.Position(latitude2[i], longitude2[i], 1e2), true, null);
            placemark2.label = "Red Triangle" + (i+1).toString() + "\n"
                + "Lat " + placemark2.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark2.position.longitude.toPrecision(5).toString();
            placemark2.altitudeMode = WorldWind.RELATIVE_TO_GROUND;

            // Create the placemark attributes for this placemark. Note that the attributes differ only by their
            // image URL.
            // placemarkAttributes = new WorldWind.PlacemarkAttributes(placemarkAttributes);
            // placemarkAttributes.imageSource = pinLibrary + images[i];
            // placemark.attributes = placemarkAttributes;

            placemarkAttributes2 = new WorldWind.PlacemarkAttributes(placemarkAttributes2);
            placemarkAttributes2.imageSource = sharkLib + image2[i];
            console.log(sharkLib);
            placemark2.attributes = placemarkAttributes2;

            // Create the highlight attributes for SHARKS. Note that the normal attributes are specified as
            // the default highlight attributes so that all properties are identical except the image scale. You could
            // instead vary the color, image, or other property to control the highlight representation.
            highlightAttributes2 = new WorldWind.PlacemarkAttributes(placemarkAttributes2);
            highlightAttributes2.imageScale = 0.5;
            placemark2.highlightAttributes2 = highlightAttributes2;
            console.log(placemark2);// good tho

            // Add the placemark to the layer.
            //placemarkLayer.addRenderable(placemark);

            placemarkLayer2.addRenderable(placemark2);

        }

        // Add the placemarks layer to the WorldWindow's layer list.
        wwd.addLayer(placemarkLayer);
        wwd.addLayer(placemarkLayer2);
        console.log(wwd.layers);

        // Now set up to handle picking.

        var highlightedItems = [];



        // The common pick-handling function.
        var handlePick = function (o) {
            // The input argument is either an Event or a TapRecognizer. Both have the same properties for determining
            // the mouse or tap location.
            var x = o.clientX,
                y = o.clientY;

            var redrawRequired = highlightedItems.length > 0; // must redraw if we de-highlight previously picked items

            // De-highlight any previously highlighted placemarks.
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];

            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            console.log(pickList);
            if (pickList.objects.length > 0) {
                redrawRequired = true;
            }

            // Highlight the items picked by simply setting their highlight flag to true.
            console.log(pickList.objects[0]);
            if (pickList.objects.length > 0)
            {
                for (var p = 0; p < pickList.objects.length; p++) {
                    if (pickList.objects[p].userObject instanceof WorldWind.Placemark) {
                        console.log("called");


                pickList.objects[p].userObject.highlighted = true;
                highlightedItems.push(pickList.objects[p].userObject);

                if (pickList.objects[p].labelPicked)
                {
                    console.log("Label picked");
                }
                    if (redrawRequired) {
                        wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
                    }

                }

        }}} //end handlePick

        var handlePick2 = function (o) {
            var x = o.clientX,
                y = o.clientY;
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            console.log(pickList);
            if (pickList.objects.length > 0)
            {

                for (var p = 0; p < pickList.objects.length; p++) {

                    for (var j = 0; j< placemarkLayer2.renderables.length; j++){
                        if (pickList.objects[p].userObject.label === placemarkLayer2.renderables[j].label) {
                            //if (pickList.objects[p].userObject instanceof WorldWind.Placemark){
                            console.log("1111");

                            // highlight a placemark selected.
                            // pickList.objects[p].userObject.highlightAttributes.imageScale = 1;

                            // make a popup window

                            let modalBtn = placemark2;
                            let modal = document.querySelector("#m1")
                            let closeBtn = document.querySelector("#c1")
                            console.log(modalBtn)

                            modal.style.display = "block"


                            /* this modalBtn.onclick = function () {
                                modal.style.display = "block"
                            } */
                            closeBtn.onclick = function () {
                                modal.style.display = "none"
                            }


                            window.onclick = function (e) {
                                if (e.target == modal) {
                                    modal.style.display = "none"
                                }
                            }

                        }
                    }


                }
        }}

        var handlePick3 = function (o) {
            console.log("seen");
            var x = o.clientX,
                y = o.clientY;
            for (var h = 0; h < highlightedItems.length; h++) {
                highlightedItems[h].highlighted = false;
            }
            highlightedItems = [];
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));
            console.log(pickList);
            if (pickList.objects.length > 0)
            {
                console.log(pickList.objects);
                console.log(placemarkLayer2.renderables);

                for (var p = 0; p < pickList.objects.length; p++) {
                    for (var j = 0; j< placemarkLayer2.renderables.length; j++) {
                        if (pickList.objects[p].userObject.label === placemarkLayer2.renderables[j].label) {
                            console.log("picked");

                            document.getElementById('theNo').innerHTML = placemarkLayer2.renderables[j].label;
                            let modal2 = document.getElementById("m2");

                            //let modalBtn = placemark2;
                            modal2.style.display = "block";
                            console.log("1");//yep

                            // wwd.addEventListener("mouseout", function () {
                            //     modal2.style.display = "none";
                            // })
                            // modalBtn.onmouseover = function (){
                            //     console.log(placemark2);
                            //     modal2.style.display = "block";
                            // }
                            //
                            // modalBtn.onmouseout = function (){
                            //     modal2.style.display = "none";
                            // }


                            /*window.onmouseover = function (e) {
                                if (e.target == modal2) {
                                    modal2.style.display = "none";
                                }
                            }*/

                        }
                    }
                }
        }} //end HandlePick3




        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
       // wwd.addEventListener("mousemove", handlePick);
        wwd.addEventListener("click", handlePick2);
        wwd.addEventListener("mousemove", handlePick3);

        var handleClick = function (recognizer) {
            // Obtain the event location.
            var x = recognizer.clientX,
                y = recognizer.clientY;

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
            var pickList = wwd.pick(wwd.canvasCoordinates(x, y));

            // If only one thing is picked and it is the terrain, use a go-to animator to go to the picked location.
            if (pickList.objects.length == 1 && pickList.objects[0].isTerrain) {
                var position = pickList.objects[0].position;
                goToAnimator.goTo(new WorldWind.Location(position.latitude, position.longitude));
            }


        };

        //var clickRecongnizer = new WorldWind.ClickRecongizer(wwd, handleClick);

        /*var showBox = function (p) {
            window.open("", "info", "width=200,height=100")


        } */

        //wwd.addEventListener("click", showBox)


        // Listen for taps on mobile devices and highlight the placemarks that the user taps.
        var tapRecognizer = new WorldWind.TapRecognizer(wwd, handlePick);


        // Create a layer manager for controlling layer visibility.
        var layerManager = new LayerManager(wwd);
    });

// 1. make multiple placemarks,
// 2. add two listners, click and mousemove
//     2.1 handle function 1 for click
//            2.1.1 identify the placemark object first, then which placemark object

//      2.2 handle function 2 for mousemove/mouseover