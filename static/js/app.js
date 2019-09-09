function init() {

  // Grab a reference to the dropdown select element
  var select = document.getElementById("selArtwork");
  var options = [];
  for (var i = 0; i < cmaJ.length; i++){
    options.push(cmaJ[i].artwork_id);
  }


  // Use the list of artwork id's to populate the select options
  for(var i = 0; i < options.length; i++) {
    var opt = document.createElement('option');
    opt.innerHTML = options[i];
    opt.value = options[i];
    select.appendChild(opt);
  };
  
  const firstWork = cmaJ[0];

  var workTitle = firstWork['title'];
  var workDept = firstWork['department_name'];
  var workAcc = firstWork['accession_number'];
  var tombStone = firstWork['tombstone'];
 
// Populate initial image  
  var accNumFile = "../static/images/" + workAcc + "_reduced.jpg";

// Grab a reference to the image element
  var img = document.createElement('img'); 
  img.src = accNumFile;

// Populate initial info fields
  var src = document.getElementById("art-image"); 
  src.appendChild(img);
  var select = document.getElementById("art-info");
  var par = document.createElement('p');
  par.innerHTML = "Title: " + workTitle;
 
  select.appendChild(par);
  var par1 = document.createElement('p');
  par1.innerHTML = "Accession Number: " + workAcc;

  select.appendChild(par1);
  var par2= document.createElement('p');
  par2.innerHTML = "Department: " + workDept;

  select.appendChild(par2);

  for (var f =0; f < firstWork['creator_info'].length; f++) {
    var par3 = document.createElement('p');
    var creatorRole = firstWork['creator_info'][f]['role'];
    creatorRole = creatorRole[0].toUpperCase() + creatorRole.slice(1);
    par3.innerHTML = creatorRole + ": " + firstWork['creator_info'][f]['description'];

    select.appendChild(par3);
  }
  var par4= document.createElement('p');
  par4.innerHTML = "Tombstone: " + tombStone;
 
  select.appendChild(par4);
    
}


function optionChanged(newWork) {
// Fetch new data each time a new artwork id is selected
  document.getElementById("art-info").innerHTML = "";
  document.getElementById("art-image").innerHTML = "";
 
  displayData(newWork);
  displayImage(newWork);

}

// Function to update and display info regarding selected artwork
function displayData(newWork) {

  for (var i = 0; i < cmaJ.length; i++) {
    if (cmaJ[i].artwork_id == newWork) {
    // set variables for information to be displayed
      var workTitle = cmaJ[i]['title'];
      var workDept = cmaJ[i]['department_name'];
      var workAcc = cmaJ[i]['accession_number'];
      var tombStone = cmaJ[i]['tombstone'];
     
    // Grab a reference to the dropdown select element and create html elements
      var select = document.getElementById("art-info");
      var par = document.createElement('p');
      par.innerHTML = "Title: " + workTitle;
     
      select.appendChild(par);
      var par1 = document.createElement('p');
      par1.innerHTML = "Accession Number: " + workAcc;
      
      select.appendChild(par1);
      var par2= document.createElement('p');
      par2.innerHTML = "Department: " + workDept;
      
      select.appendChild(par2);

    // Loop through all creator info to ensure capture of various numbers of creators
      for (var f =0; f < cmaJ[i]['creator_info'].length; f++) {

      // set variable for dynamically displaying various numbers of creators
        var creatorRole = cmaJ[i]['creator_info'][f]['role'];

      // Format for consistency
        creatorRole = creatorRole[0].toUpperCase() + creatorRole.slice(1);         
        var creatorDescr = cmaJ[i]['creator_info'][f]['description'];
        
      // Removed the display of data that included null values
        if (creatorRole == "NULL") {continue;}

        var par3 = document.createElement('p');
        par3.innerHTML = creatorRole + ": " + creatorDescr;
        
        select.appendChild(par3);     
      }
      var par4= document.createElement('p');
      par4.innerHTML = "Tombstone: " + tombStone;
      
      select.appendChild(par4);
    }
  }
}
  
// Function to update and display image based on selection
function displayImage(newWork) {

  for (var i = 0; i < cmaJ.length; i++) {
    if (cmaJ[i].artwork_id == newWork) {
        var accNum = cmaJ[i]['accession_number'];
        var accNumFile = "../static/images/" + accNum + "_reduced.jpg";     
     
    // Grab a reference to the image element
        var img = document.createElement('img'); 
        img.src = accNumFile;
        
        var src = document.getElementById("art-image"); 
        src.appendChild(img);
       
    }
  }
}



// Initialize the dashboard
init();

