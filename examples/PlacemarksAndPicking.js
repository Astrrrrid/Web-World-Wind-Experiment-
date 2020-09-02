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
            "shark.png"
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
            placemarkLayer2 = new WorldWind.RenderableLayer("Shark Attack"),
            latitude2 = 37.7249303,
            longitude2 = -123.0302779;

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
            // Create the placemark and its label.
            placemark2 = new WorldWind.Placemark(new WorldWind.Position(latitude2, longitude2, 1e2), true, null);
            placemark2.label = "Red Triangle" + (i+1).toString() + "\n"
                + "Lat " + placemark.position.latitude.toPrecision(4).toString() + "\n"
                + "Lon " + placemark.position.longitude.toPrecision(5).toString();
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
            console.log(placemark2);

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

            // Perform the pick. Must first convert from window coordinates to canvas coordinates, which are
            // relative to the upper left corner of the canvas rather than the upper left corner of the page.
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
                    //if (pickList.objects[p].userObject instanceof WorldWind.Placemark) {

                   // var showBox = function () {}

                         //console.log(pickList.objects[p].userObject == placemark2);




                pickList.objects[p].userObject.highlighted = true;

                // Keep track of highlighted items in order to de-highlight them later.
                highlightedItems.push(pickList.objects[p].userObject);

                // Detect whether the placemark's label was picked. If so, the "labelPicked" property is true.
                // If instead the user picked the placemark's image, the "labelPicked" property is false.
                // Applications might use this information to determine whether the user wants to edit the label
                // or is merely picking the placemark as a whole.
                if (pickList.objects[p].labelPicked)
                {
                    console.log("Label picked");
                }
                    if (redrawRequired) {
                        wwd.redraw(); // redraw to make the highlighting changes take effect on the screen
                    }

                    if (pickList.objects[p].userObject === placemark2) {
                        console.log("mousssssss");

                        // highlight a placemark selected.
                        // pickList.objects[p].userObject.highlightAttributes.imageScale = 1;

                        // make a popup window

                        /* thissss let modalBtn2 = placemark2;
                        let modal2 = document.querySelector("#m2")
                        //let closeBtn2 = document.querySelector("#c2")
                        console.log(modal2)

                        modal2.style.display = "block"

                        // wwd.addEventListener("click", showBox)
                        /* modalBtn2.mouseover = function () {
                            modal2.style.display = "block"
                        }

                        window.mouseover = function (e) {
                            if (e.target == modal2) {
                                modal2.style.display = "none"
                            }
                        } */

                        let modal2 = document.querySelector("#m2");
                        modal2.style.display = 'block';
                        /*modal2.onmouseout = function (){
                            modal2.style.display = "none";
                        }*/


                        window.onmouseover = function (e) {
                            if (e.target == modal2) {
                                modal2.style.display = "none";
                            }
                        }

                    }


                }



            // Update the window if we changed anything.

        }}

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


                    if (pickList.objects[p].userObject === placemark2) {
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
        }}

        var handlePick3 = function (o) {
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


                    if (pickList.objects[p].userObject === placemark2) {
                        console.log("mousssssss");

                        // highlight a placemark selected.
                        // pickList.objects[p].userObject.highlightAttributes.imageScale = 1;

                        // make a popup window

                        /* thissss let modalBtn2 = placemark2;
                        let modal2 = document.querySelector("#m2")
                        //let closeBtn2 = document.querySelector("#c2")
                        console.log(modal2)

                        modal2.style.display = "block"

                        // wwd.addEventListener("click", showBox)
                        /* modalBtn2.mouseover = function () {
                            modal2.style.display = "block"
                        }

                        window.mouseover = function (e) {
                            if (e.target == modal2) {
                                modal2.style.display = "none"
                            }
                        } */

                        let modal2 = document.querySelector("#m2");
                        modal2.style.display = 'block';
                        modal2.onmouseout = function (){
                            modal2.style.display = "none";
                        }


                        window.onmouseover = function (e) {
                            if (e.target == modal2) {
                                modal2.style.display = "none";
                            }
                        }

                    }
                }
            }} //end HandlePick3




        // Listen for mouse moves and highlight the placemarks that the cursor rolls over.
        wwd.addEventListener("mousemove", handlePick);
        wwd.addEventListener("click", handlePick2);
        wwd.addEventListener("mouseover", handlePick3);

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