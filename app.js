//listen for submit
const zipForm = document.querySelector('#zipForm')
const output = document.querySelector('#output')
const body = document.querySelector('body')

zipForm.addEventListener('submit', getLocationInfo)

body.addEventListener('click', deleteInfo)

function getLocationInfo(e){
   //Get zip value from input
   const zip = document.querySelector('.zip').value;
   
   console.log(zip);

   //Make request
   fetch(`http://api.zippopotam.us/us/${zip}`)
   .then(res => {
       if(res.status != 200){
           showIcon('remove')
           output.innerHTML = 
           `<article class="message is-danger">
           <div class="message-body"> Invalid Zipcode, please try again
           </div>
           </aricle>`;
           throw Error(res.statusText);
       }else{
        showIcon('check')
           return res.json();
       }
   })
   .then(data => {
       console.log(data)
       //show location info 
       let results = '';
       data.places.forEach(place => {
          results += `
          <article class="message is-primary">
            <div class="message-header">
              <p>Location Info</p>
              <button class="delete"></button>
            </div>
            <div class="message-body">   
               <ul>
                 <li><strong>City: </strong>${place['place name']}</li>
               </ul>
                 <li><strong>State: </strong>${place.state}</li>
               </ul>
                 <li><strong>Longtitude: </strong>${place.longitude}</li>
               </ul>
                 <li><strong>Latitude: </strong>${place.latitude}</li>
               </ul>
            </div>
          </article>
          `   
        })
        //Insert into output div
        output.innerHTML = results
    })
   .catch(err => console.log(err));

    
  e.preventDefault();
}

function showIcon(icon){
    //clear icons
    document.querySelector('.icon-remove').getElementsByClassName.display = 'none';
    document.querySelector('.icon-check').getElementsByClassName.display = 'none';

    //show correct icon
    document.querySelector(`.icon-${icon}`)
    .style.display = 'inline-flex'

}
   //delete search results

function deleteInfo(e){
    if(e.target.className === 'delete'){
        document.querySelector('.message').remove();
        document.querySelector('.zip').value = ''
        document.querySelector('.icon-check').remove();

    }
}