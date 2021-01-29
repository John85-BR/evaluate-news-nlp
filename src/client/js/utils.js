//Function that updates the results in id = details when the user clicks on the word.
function updateResults(domObject, data){

  //get de elements 
  let spans = domObject.getElementsByTagName('span');
  let titlesSentences = domObject.getElementsByTagName('h2');
  

  //search the title inside the titlesSentences
  for(let title of titlesSentences){

    //adds a listener for each element
    title.addEventListener('click', function(event){

      //get the text clicked
      let str = event.target.textContent;

      //get number after the name Sentence
      let attibute = str.charAt(str.length-1);
       
      //set the innertext of id results
      document.getElementById('results').innerHTML = `<h2>${data.sentence_list[attibute-1].text}</h2>
      <p>The sentence the ${checkPolarity(data.sentence_list[attibute-1].score_tag)} polarity. There is ${data.sentence_list[attibute-1].agreement}
      of polarity between the different elements identified in the sentence.</p>`;           
      
      //moves slowly to id results when clicked on the word
      document.getElementById('results').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }

  for(let span of spans){

     //adds a listener for each element
    span.addEventListener('click',function(event){  

      for(let item of data.sentence_list){        
        for(let segItem of item.segment_list){

          //compare the text clicked
          if(event.target.textContent==segItem.text){     
            //set the innertext of id results    
            document.getElementById('results').innerHTML = `<h2>${segItem.text}</h2><p>The segment has ${checkPolarity(segItem.score_tag)} polarity. There is ${segItem.agreement}
            of polarity between the different elements identified in the segment.</p>`;           
          }
         
          for(let polItem of segItem.polarity_term_list){
            //compare the text clicked
            if(event.target.textContent==polItem.text){
              //set the innertext of id results 
              document.getElementById('results').innerHTML = `<h2>${polItem.text}</h2><p>The polarity term has ${checkPolarity(polItem.score_tag)} polarity.</p>`;     
            }                   
          }          
        }   

        for(let entity of item.sentimented_entity_list){
          //compare the text clicked
          if(event.target.textContent==entity.form){
            //set the innertext of id results 
            document.getElementById('results').innerHTML = `<h2>${entity.form}</h2><p>The entidy has ${checkPolarity(entity.score_tag)} polarity.</p>`; 
          }              
        }
        
        for(let concept of item.sentimented_concept_list){
          //compare the text clicked
          if(event.target.textContent==concept.form){
            //set the innertext of id results 
            document.getElementById('results').innerHTML = `<h2>${concept.form}</h2><p>The concept has ${checkPolarity(concept.score_tag)} polarity.</p>`; 

          }                  
        }
      }
      //moves slowly to id results when clicked on the word
      document.getElementById('results').scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
    });
  }

}

//function that checks the assigned polarity and returns a specific word
function checkPolarity(text){

  switch(text){
    case 'P+':
      return 'STRONG POSITIVE';
    case 'P':
      return 'POSITIVE';
    case 'NEU':
      return 'NEURAL';
    case 'N':
      return 'NEGATIVE';
    case 'N+':
      return 'STRONG NEGATIVE';
    default:
      return 'NONE';
  }
}


//function that updates and feeds the results obtained in the API into the html
function updateHolderEntry(data){
  
    //specific text to feed the result about the characteristics obtained by the API
    const strText = `The text has ${checkPolarity(data.score_tag)} polarity, is ${data.subjectivity} and ${data.irony}.There is ${data.agreement}
     of polarity between the different elements identified in the text.`;

    //feed the text of 'results-text-complete' id
    document.getElementById('results-text-complete').innerHTML = `<p>${strText}</p>`;

    //obtain de element of details id
    let details = document.getElementById('details');
    
    let sentences="";
    let count = 0;
    let regex = "";

    for(let item of data.sentence_list){
  
      ++count;
      sentences+= `<h2>Sentence&nbsp${count}</h2><p>${item.text}</p>`;
      
      for(let segItem of item.segment_list){
        //inserts in the searched text the <span> and </span>
        regex = new RegExp(segItem.text,"g");
        console.log(segItem.text);
        sentences = sentences.replace(regex,`<span class="segment">${segItem.text}</span>`);

        for(let polItem of segItem.polarity_term_list){

          regex = new RegExp(polItem.text,"g");
          //inserts in the searched text the <span> and </span>
          sentences = sentences.replace(regex,`<span class="polarity-term">${polItem.text}</span>`);
                  
        }
          
      }       
      
      for(let entity of item.sentimented_entity_list){

        regex = new RegExp(entity.form,"g");
        //inserts in the searched text the <span> and </span>
        sentences = sentences.replace(regex,`<span class="sentimented-entity">${entity.form}</span>`);
      }
      
      for(let concept of item.sentimented_concept_list){

        regex = new RegExp(concept.form,"g");
        //inserts in the searched text the <span> and </span>
        sentences = sentences.replace(regex,`<span class="sentimented-concept">${concept.form}</span>`);
      }
      
    }
    //in the end feed de details id with the texts
    details.innerHTML=sentences;   
   
    updateResults(details,data);

  }

  export {updateHolderEntry,checkPolarity}