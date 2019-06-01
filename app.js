//listen for submit
const zipForm = document.querySelector('#zipForm')
const output = document.querySelector('#output')


zipForm.addEventListener('submit', getLocationInfo)

function getLocationInfo(e){
   //Get zip value from input
   const zip = document.querySelector('.zip').value;
   
   console.log(zip);

   //Make request
   fetch(`http://api.zippopotam.us/us/${zip}`)
   .then(res => {
       if(Response.status != 200){
           output.innerHTML = 
           `
            <article class='message message-body is-danger"> Invalid Zipcode, please try again</aricle>
           `;
       }
   })
   .then(data => console.log(data))

    
  e.preventDefault();
}