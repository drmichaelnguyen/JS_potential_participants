
// A $( document ).ready() block.
$( document ).ready(function() {
    let data; // Declare the global variable
    const spinalLevels = [
      "C1", "C2", "C3", "C4", "C5", "C6", "C7",
      "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",
      "L1", "L2", "L3", "L4", "L5",
      "S1", "S2", "S3", "S4", "S5"
    ]
    // declare to_day variable 
    let to_day=new Date 
    $.ajax({
        type:'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(response){
            data=response;
            date = new Date(data[1].dateOfBirth)
            console.log(Object.keys(data[0]))

            console.log(new Date - date)
            buildTable(response)
            tableHead(Object.keys(data[0]))
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
  let table_heads = document.querySelector('#table_heads');
  function tableHead(data){
    let len=data.length
    for (let i=0;i<len;i++){
      let heads= `
      <th> ${data[i]} </th`
      table_heads.innerHTML+=heads
    }
  }
  function buildTable(data){
      let len=data.length
      console.log(len)
      for (let i = 0; i < len; i++){
          let row = `<tr>
              <td>${data[i].name}</td>
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
// End of populating table




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



