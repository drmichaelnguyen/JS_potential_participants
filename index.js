
// A $( document ).ready() block.
$( document ).ready(function() {
    let data; // Declare the global variable
    // declare to_day variable 
    let to_day=new Date 
    $.ajax({
        type:'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(response){
            data=response;
            date = new Date(data[1].dateOfBirth)

            console.log(new Date - date)
            buildTable(response)
        },
        error: function(r){
            console.log(r+"Loi cmnr")
        }
    })


// Define a function that can convert string dateofBirth to date format and calculate age 
    function to_date(date){
        date.split('-');
        new_date= new Date()
    }

// populate json file to the table 
  let table = document.querySelector('#participants');
  function buildTable(data){
      let len=data.length
      console.log(len)
      for (let i = 0; i < len; i++){
          let row = `<tr>
              <td id=>${data[i].name}</td>
              <td>${data[i].dateOfBirth}</td>
              <!-- Calculate age using dateOfBirth -->
              <td>${Math.round((to_day - new Date(data[i].dateOfBirth))/(60*60*24*365*1000))}</td>
              <td>${data[i].location}</td>
              <td>${data[i].phone}</td>
              <td>${data[i].email}</td>
              <td>${data[i].levelOfInjury}</td>
              <td>${data[i].ais}</td>
              <td>${data[i].studiesEnrolled}</td>
              <td>${data[i].eligibleForStudies}</td>
              <td>${data[i].notes}</td>
                      </tr>`
          table.innerHTML+=row
      }}



// Collapsable section for filtering
var coll = document.getElementsByClassName("collapsible");
var i;
for (i = 0; i < coll.length; i++) {
  coll[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var content = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}
// End of section
});



