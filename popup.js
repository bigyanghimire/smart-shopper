$( document ).ready(function() {
 
//fetch api tried

var salesTaxConverted;
 
//fetch api call
fetch('http://localhost:8000/login/notes/?format=json',{mode: 'cors'})
.then(response => response.json())
.then(data => {

   var html = '';

   data.forEach(listItem => {

        const h1 = `<h4> ${listItem.title} </h4>`;
        html+=h1;

        listItem.items.forEach(item=> {
            const h5 = `<li id="item-details">🎁 ${item.title}        💰$${item.price} <a href="${item.pur_link} " target="_blank"> <i class="fa fa-link"></i></a></li>`;
            html+=h5;
        });
   });

   document.getElementById('todo_list').innerHTML=html;
});
//sales tax api call
var zip_input= document.getElementById('zip-code-input')
zip_input.addEventListener('focusout', leave_zip_input);
function leave_zip_input(){
  let zip_value=document.getElementById('zip-code-input').value;
  url_raw="https://api.zip-tax.com/request/v40?key=RfMNb3m8vPq0td1U&postalcode="
  final_url=url_raw+zip_value
  //alert(final_url)
  
  fetch(final_url,{mode: 'cors'})
  .then(response => response.json())
  .then(data => {
var salesTaxConverted=data.results[0].taxSales;



document.getElementById('tax').value=salesTaxConverted;
  });
 
}
//sales tax api call

 //fetch api call ends
 //////////////////////////////////////////////////////////////-----------///////////////////////////////|
 //|||||||||||||||||||||||||||||||||||||||||||¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬¬]]]]]]]]]~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~///
 //FETCH API POST STARTS///
 var formMain= document.getElementById('addPost')
 formMain.addEventListener('submit', addPost);
 function addPost(e){
  e.preventDefault();

  let title = document.getElementById('title').value;
  

  fetch('http://localhost:8000/login/notes/', {
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type':'application/json'
    },
    body:JSON.stringify({title:title, description:"new list"})
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .then(formMain.reset())
  .then( location.reload())
}

 //FETCH API POST ENDS
 
//fetch api select dropdownlist starts
let dropdown = document.getElementById('locality-dropdown');
dropdown.length = 0;

let defaultOption = document.createElement('option');
defaultOption.text = 'Select a List';

dropdown.add(defaultOption);
dropdown.selectedIndex = 0;

const url = 'http://localhost:8000/login/notes/';

fetch(url)  
  .then(  
    function(response) {  
      if (response.status !== 200) {  
        console.warn('Looks like there was a problem. Status Code: ' + 
          response.status);  
        return;  
      }

      // Examine the text in the response  
      response.json().then(function(data) {  
        let option;
    
    	for (let i = 0; i < data.length; i++) {
          option = document.createElement('option');
          option.setAttribute("id", "optionid");
      	  option.text = data[i].title;
      	  option.value = data[i].url;
      	  dropdown.add(option);
    	}    
      });  
    }  
  )  
  .catch(function(err) {  
    console.error('Fetch Error -', err);  
  });


//fetch api select dropdown list ends


//////////////////////////////////////////////////+++++++++++++///////////
//FETCH API SAVE ITEMS STARTS
var formItem= document.getElementById('save-item-form')
 formItem.addEventListener('submit', addItem);
 function addItem(e){
  e.preventDefault();

let item_title = document.getElementById('item-title').value;
let note_value = document.getElementById('locality-dropdown').value;
let price_value = document.getElementById('displayerid').value;
let pur_link = document.getElementById('item-link').value;
console.log(note_value)

  fetch('http://localhost:8000/login/items/', {
    method:'POST',
    headers: {
      'Accept': 'application/json, text/plain, */*',
      'Content-type':'application/json'
    },
    body:JSON.stringify({title:item_title, note:note_value, price:price_value,pur_link:pur_link})
  })
  .then((res) => res.json())
  .then((data) => console.log(data))
  .then(formItem.reset())
  .then($('#alertid').css("display","block"))
 
}

//FETCH API SAVE ITEMS ENDS


 //ajax call ends
 //calculate function
  $( "#disper" ).click(function() {
    $("#discount").attr("placeholder", "Enter Discount Percentage")
  });
  $( "#disamt" ).click(function() {
    $("#discount").attr("placeholder", "Enter Discount Amount")
  });
  //fucntion calculate
  $( "#btn" ).click(function() {
    var first_number = parseInt(document.getElementById("price").value);
    var second_number = parseInt(document.getElementById("shipcost").value);
    var third_number = parseInt(document.getElementById("discount").value);
    var fifth_number = parseInt(document.getElementById("tax").value);
    var result_field=document.getElementById("displayerid");
    if($("#disper").is(":checked")){
      
      var result=first_number+second_number+third_number+fifth_number+1000;
      
      result_field.value=result;
      if(isNaN(result)){
        result_field.value="Invalid Input"
      }
    }
    if($("#disamt").is(":checked")){
      
      var result=first_number+second_number+third_number+fifth_number+1;
      
      result_field.value=result;
      if(isNaN(result)){
        result_field.value="Invalid Input"
      }
    }
   
  
  });

  
  //test code
   $( "#btn" ).click(function() {
    $( "#btn" ).css("background","lightgreen");
    $( "#btn" ).css("color","black");
  });
 



 //this is the document.ready ends brackets 
});

//////////////////////
