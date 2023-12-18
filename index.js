let data
// A $( document ).ready() block.
$(document ).ready(function() {
    // let data; // Declare the global variable
    const spinalLevels = [
      "C1", "C2", "C3", "C4", "C5", "C6", "C7",
      "T1", "T2", "T3", "T4", "T5", "T6", "T7", "T8", "T9", "T10", "T11", "T12",
      "L1", "L2", "L3", "L4", "L5",
      "S1", "S2", "S3", "S4", "S5",
    ]
    const group=['AIS A','AIS B','AIS C', 'AIS D', 'MS']
    // Array for the html form
    let head_n_type=[
      {"name": "name", "type": "text", "inputType": "input", "option": "", "display": "Name"},
      {"name": "dateOfBirth", "type": "date", "inputType": "input", "option": "", "display": "Date of Birth"},
      {"name": "location", "type": "text", "inputType": "input", "option": "", "display": "Location"},
      {"name": "phone", "type": "tel", "inputType": "input", "option": "", "display": "Phone"},
      {"name": "email", "type": "email", "inputType": "input", "option": "", "display": "Email"},
      {"name": "dateOfInjury", "type": "date", "inputType": "input", "option": "", "display": "Date of Injury"},
      {"name": "gender", "type": "text", "inputType": "select", "option": ["", "Male", "Female"], "display": "Gender"},
      {"name": "levelOfInjury", "type": "text", "inputType": "select", "option": spinalLevels, "display": "Level of Injury"},
      {"name": "group", "type": "text", "inputType": "select", "option": group, "display": "Group"},
      {"name": "studiesEnrolled", "type": "text", "inputType": "input", "option": "", "display": "Studies Enrolled"},
      {"name": "eligibleForStudies", "type": "text", "inputType": "input", "option": "", "display": "Eligible for Studies"},
      {"name": "notes", "type": "text", "inputType": "textarea", "option": "", "display": "Notes"},
      {"name": "datesContacted", "type": "text", "inputType": "input", "option": "", "display": "Dates Contacted"}
    ]

    // Declare variable to_day to calculate age & year from injury
    let to_day=new Date 
    $.ajax({
        type:'GET',
        url: 'data.json',
        dataType: 'json',
        success: function(response){
          data=response.json_data
            // date = new Date(data[1].dateOfBirth)
            // Calculated 
            data=calculated_field(data)
            // Execute the fn to populate table
            buildTable(data)
            isRendered = true
            // execute the function to populate tableheads
            tableHead(Object.keys(data[0]))
        },
        error: function(r){
            console.log(r+"Loi cmnr")
        }
    })

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
    document.getElementById("submit").style.visibility = "hidden";

    table.innerHTML=""

      for (i in data){
        cell=""
        let row=""
        for (let k in data[i]){
          // console.log(data[i][k])
          let cell=`<td class="table_row" id='${data[i].id}'> ${data[i][k]} </td>`
          row+=cell
        }
        table.innerHTML+=row
        // Fn for click the row show the row 
        $(".table_row").on("click", function () {
          display_row=document.querySelector('#display_row')
          display_row.innerHTML=``
          display_row.innerHTML+=`<button id='edit' type="submit">EDIT</button>` 
          row=data.find((ele) => ele['id']===Number(this.id))
          for (const  key of Object.keys(row)) {
            display_row.innerHTML+=`<p>${key} : ${row[key]}</p> `
            // console.log(row[key]) 
            }
          })
        // End on fn clicking the row

      }}
// End of populating table

      // fn to create new calculated field
      function calculated_field(data) {
        for (const pt of data) {
          pt['age']=Math.round(((to_day - new Date(pt['dateOfBirth'])))/(60*60*24*365*1000))
          pt['yearFromInjury']=Math.round((to_day - new Date(pt.dateOfInjury))/(60*60*24*365*1000))
        }
        return data
      }
      // 


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

    

    // Fn for making html buttons for selecting 
    function filterbuttons(list,htmlclass,innerhtml_id) {
      let filterbutton=document.querySelector(innerhtml_id)
      for (let i in list) {
        html=`
        <button class=${htmlclass} id= '${list[i]}'>${list[i]}</button>`
        filterbutton.innerHTML +=html
      }
    }
    filterbuttons(spinalLevels,htmlclass='spinallevels',innerhtml_id='#level_of_injury_filter')
    filterbuttons(group,htmlclass='groups',innerhtml_id='#group')

    // End of html filtering buttons

    // fn for filtering
    let levels_for_filtering=[]
    $(".spinallevels").on("click", function(){
      if (levels_for_filtering.includes($(this).attr('id'))) {
        levels_for_filtering=levels_for_filtering.filter(item => item!=$(this).attr('id'));
        document.getElementById($(this).attr('id')).style.backgroundColor= "white";
      } else {
        document.getElementById($(this).attr('id')).style.backgroundColor= "cyan";
        levels_for_filtering.push($(this).attr('id'))
      }
    })
    let group_for_filtering=[]
    $(".groups").on("click", function(){
      if (group_for_filtering.includes($(this).attr('id'))) {
        group_for_filtering=group_for_filtering.filter(item => item!=$(this).attr('id'));
        document.getElementById($(this).attr('id')).style.backgroundColor= "white";
      } else {
        document.getElementById($(this).attr('id')).style.backgroundColor= "cyan";
        group_for_filtering.push($(this).attr('id'))
      }
    })
    // Filter button: Apply all current filter values to the table 
    function filter_helper(input) {
      let maximum_age=document.getElementById('maximum_age');
      let minimum_age=document.getElementById('minimum_age');
      let years_from_injury=document.getElementById('years_from_injury')

        if (input.age <= maximum_age.value
          && input.age>= minimum_age.value
          && input.yearFromInjury>= years_from_injury.value
          && levels_for_filtering.includes(input.levelOfInjury)
          && group_for_filtering.includes(input.group)
          ) {
            return true
        }
        else { return false}
      }
    
    $("#filter").on("click", function () {
        // let result=data.filter((dat) => dat['age'] );
        // return result
      filtered_data=data.filter(filter_helper)
      buildTable(filtered_data)
      // console.log(years_from_injury.value)
    })
    $("#reset").on("click", function () {
    buildTable(data)
  })
    // end of filtering
    
    // Fn for display the form to add new participant 
    $("#add").on("click", function () {
      function make_options(array) {
        html=""
        for (const i of array) {
          html+=`<option value=${i} >${i} </option>`
        }
        return html
      }   
      new_row=document.getElementById('new')
      document.getElementById("add").style.visibility = "hidden";
      document.getElementById("submit").style.visibility = "visible";
      new_row.innerHTML+=`<div id="form_filling"> `
      // new_row.innerHTML+='New Participant'
      for (const i of head_n_type){
        let input= `<h5> ${i.display}</h5>` 
        if (i.inputType==='input') {
          input+=`<${i.inputType} id='form_${i.name}' class='input_form' type = ${i.type} name =${i.name}> </>`
        } else {
          input+=`<${i.inputType} id='form_${i.name}' name =${i.name}  >${make_options(i.option)} </${i.inputType}>`
        }
        new_row.innerHTML+=input 
      }
      new_row.innerHTML+=`</div>`

    })
    // end of fn for display the form

    // Fn for submit button, add data to the table and reload the full table
    $("#submit").on("click", function () {
      new_object={"id":data.at(-1).id +1}
      for (const i of head_n_type) {
        input=document.getElementById('form_'+i.name).value
        new_object[i.name]=input
      }
      data.push(new_object)
      data=calculated_field(data)
      buildTable(data)
      document.getElementById("new").innerHTML=``; // delete the form
      document.getElementById("add").style.visibility = "visible";
   
    })
        // end of add new participant fn

  
});


