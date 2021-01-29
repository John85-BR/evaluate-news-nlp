//to check the url field text
const urlRegex = require('url-regex');
//node-fecth necessary to succeed in the test
const fetch = require("node-fetch");

const postData = async ( url = '', data)=>{  
    //config and post the data 
    const response = await fetch(url, {
    method: 'POST', 
    credentials: 'same-origin',
    headers: {
        'Content-Type': 'application/json',
    },
   // Body data type must match "Content-Type" header        
   body: JSON.stringify(data),
  });

    try {
      const newData = await response.json();
      return newData;
    }catch(error) {
    console.log("error in postData", error);
    }
}

function handleSubmit(event) {
    event.preventDefault();    
    // check what text was put into the form fieldan textarea
    let formText = document.getElementById('text');   
    let urlText = document.getElementById('url');
    //
    let sectionResults = document.getElementById('results-details');
    let loader = document.querySelector(".loader");

    if(sectionResults.style.display=='block'){
      sectionResults.style.display = 'none';
    }

    if((formText.value!="" && urlText.value!="") || (formText.value=="" && urlText.value=="")){
      alert("Put some text or url. And it is not possible to choose the two options together.");
    }else{

      if(formText.value!=""){
        loader.style.display = 'block';

        postData('http://localhost:8081/searchText', {text:formText.value})       
        .then(data=>{
          console.log(data);
          Client.updateHolderEntry(data); 

          sectionResults.style.display='block';   
          loader.style.display = 'none';

        })
        .catch(function (error) {
          // handle error
          console.log(error);
        }); 
      }

      if(urlText.value!=""){
        if(urlRegex({exact:true,strict:false}).test(urlText.value)==false){
          alert("Insert a valid url");
        }else{

          loader.style.display = 'block';

          postData('http://localhost:8081/searchUrl', {url:urlText.value})
          .then(data=>{        
            Client.updateHolderEntry(data); 

            sectionResults.style.display='block';
            loader.style.display = 'none';

          }); 
        }
      }        
    }       
}

export { handleSubmit, postData};
