var streetmap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});



var map = L.map("map", {
    center: [37.000, -95.000],
    zoom: 4,
    
});

streetmap.addTo(map)


  var legend = L.control({
    position: "bottomright"
  });
  
  
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
        div.innerHTML += "<h4>Depth</h4>";
        div.innerHTML += '<i style="background: red"></i><span>> 90</span><br>';
        div.innerHTML += '<i style="background: orangered"></i><span>70 - 90</span><br>';
        div.innerHTML += '<i style="background: orange"></i><span>50 - 70</span><br>';
        div.innerHTML += '<i style="background: gold"></i><span>30 - 50</span><br>';
        div.innerHTML += '<i style="background: yellow"></i><span>10 - 30</span><br>';
        div.innerHTML += '<i style="background: limegreen"></i><span>< 10</span><br>';
        
    return div;
  };
 
  legend.addTo(map);

var eqData = "https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2023-01-01"


      

  

d3.json(eqData).then(function(data) {
    console.log(data)
    features = data.features

    
    var eqMarkers = []

    for (var i = 0; i < features.length; i++) {

        

        var longitude = features[i].geometry.coordinates[0];
        var latitude = features[i].geometry.coordinates[1];
        
        var coordinates = [latitude,longitude];
        var depth = features[i].geometry.coordinates[2]
        var mag = features[i].properties.mag

        var fill = "";
        if (depth > 90) {
            fill = "red"
        }
        else if (depth > 70) {
            fill = "orangered"
        }
        else if (depth > 50) {
            fill = "orange"
        }
        else if (depth > 30) {
            fill = "gold"
        }
        else if (depth > 10) {
            fill = "yellow"
        }
        else {fill = "limegreen"}

        
        
        eqMarkers.push(
            L.circle(coordinates,{
                fillOpacity: .75,
                color: "black",
                weight: .5,
                fillColor: fill,
                radius: mag * 30000
            }).bindPopup(`<h2> Magnitude: ${mag} </h2> <hr> <h4> Longitude: ${longitude}, Latitude: ${latitude}, Depth: ${depth} </h4>`)
            .addTo(map))
    }

    
    

});





