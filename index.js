
// A $( document ).ready() block.
$(document ).ready(function() {
    var data; // Declare the global variable
    var all_keys;
    const spinalLevels = [
      "C1", "C2", "C3", "C4", "C5", "C6", "C7",
      "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",
      "L1", "L2", "L3", "L4", "L5",
      "S1", "S2", "S3", "S4", "S5"
    ]
    // Declare variable to_day to calculate age & year from injury
    let to_day=new Date 
    $.ajax({
        type:'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(data){
            date = new Date(data[1].dateOfBirth)
            // Execute the fn to populate table
            buildTable(data)
            // execute the function to populate tableheads
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
console.log(data)
// populate json file to the table 
  let table = document.querySelector('#participants');
  let table_heads = document.querySelector('#table_heads');
  function tableHead(data){
    let len=data.length
    for (let i=0;i<len;i++){
      let heads= `
      <th id='${data[i]}' > ${data[i]} </th>`
      table_heads.innerHTML+=heads
      
    }
    table_heads.innerHTML+= `
      <th id='age' > Age </th>`
  }
    // $("#table_heads").children('th.'#dateOfBirth').css({"color": "red", "border": "2px solid red"});
  function buildTable(data){
      let len_table=data.length
      let table_heads=(Object.keys(data[0]))

      
      for (let i = 0; i < len_table; i++){
        cell=""
        let row=""
        for (let k in data[i]){
          // console.log(data[i][k])
          let cell=`<td> ${data[i][k]} </td>`
          row+=cell
        }
       row+= ` <td>${Math.round((to_day - new Date(data[i].dateOfBirth))/(60*60*24*365*1000))}</td>           </tr>`
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


