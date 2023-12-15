let data
// A $( document ).ready() block.
$(document ).ready(function() {
    // let data; // Declare the global variable
    let isRendered = false
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
        success: function(response){
          data=response
            date = new Date(data[1].dateOfBirth)
            // Calculated 
            data=calculated_field(data)
            // Execute the fn to populate table
            data=ais_filter(data)
            buildTable(data)
            isRendered = true
            // execute the function to populate tableheads
            tableHead(Object.keys(data[0]))
        },
        error: function(r){
            console.log(r+"Loi cmnr")
        }
    })
// $("body").on("click", () => {
//   console.log(data)
//   console.log('hi')
// })

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
  }
  function buildTable(data){
      // let len_table=data.length
      for (i in data){
        cell=""
        let row=""
        for (let k in data[i]){
          // console.log(data[i][k])
          let cell=`<td> ${data[i][k]} </td>`
          row+=cell
        }


        table.innerHTML+=row
      }}
// End of populating table

      // fn to create new calculated field
      function calculated_field(data) {
        for (const key in data) {
          data[key]['age']=Math.round((to_day - new Date(data[i].dateOfBirth))/(60*60*24*365*1000))
          data[key]['yearFromInjury']=Math.round((to_day - new Date(data[i].dateOfInjury))/(60*60*24*365*1000))
        }
        return data

      }
      // 



  // Fn for making buttons for selecting levelOfInjury
  function levelofInjurybuttons(button) {
    let level_of_injury_selector=document.querySelector('#level_of_injury_filter')
    for (let i in button) {
   
      html=`
      <button class='spinal_level_button' id= '${button[i]}'>${button[i]} </button>`
      level_of_injury_selector.innerHTML +=html
    }
  }
  levelofInjurybuttons(spinalLevels)
// End of buttons for level of Injury
// FN for filtering
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
  // Age filtering
  function ais_filter(data,age) {
    let result=data.filter((dat) => dat['ais'] === 'B');
    return result
    
  }

// End of filtering

});


