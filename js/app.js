
  function initMap() {
    var map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: 37.773972, lng: -122.431297},
    zoom: 11,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  });
}

function getData(){
//get the category from check boxes to feed to our url query string
    var stats = ($('input[name=category]:checked').val());
    //pass in the category to the url query string
$.ajax({
      url: "https://data.sfgov.org/resource/nwbb-fxkq.json?incident_category=" + stats,
      type: "GET",
	   	dataType: "json",
//getting the data and then use the data for next step:
	   	success: function(data) {
      // console.log(data);

      //create new instance of the map for to drop markers
    	var map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 37.773972, lng: -122.431297},
        zoom: 13,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      });


      for(var i =0; i<data.length; i++){
        // console.log(data[i].latitude);
        // console.log(data[i].longitude);

//use parseFloat to turn the string into a number:
      var myLat = parseFloat(data[i].latitude);
      // console.log(myLat);
      var myLng = parseFloat(data[i].longitude);
      // console.log(myLng);
      var myLatLng = {lat: myLat, lng: myLng};
      // console.log(myLatLng);
      var marker = new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: data[i].report_type_description + ' ' + data[i].incident_date + ' ' + data[i].incident_day_of_week + ' ' + data[i].intersection + ' ' + data[i].police_district
        });
      // console.log(marker);
      }

    }
	   });

  }