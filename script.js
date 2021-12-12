
document.body.innerHTML="<h1>Predict the nationality of a name</h1><p class='upper_text'>This website predicts the nationality of a person given their name. It also gives the probability of the nationality of the name.</p>"

//create input box
let submit = document.createElement('button');
submit.innerHTML="Submit";
submit.setAttribute('class','btn')
submit.setAttribute('onclick','getname();')

let div2 = document.createElement('div');
div2.innerHTML="<input type=text placeholder='Enter a name' id='n'>";
document.body.append(div2);
div2.setAttribute('class','ibox')
div2.appendChild(submit);



//take value from inputbox
function getname(){
let n=document.getElementById('n').value;
name_processing(n);
}


//get data about input name
function name_processing(n){

    let url="https://api.nationalize.io?name="+n;

const fetchData = async()=>{
    try{
        let response = await fetch(url);
        if (!response.ok) // or check for response.status
             throw new Error(response.status);
        let api_response = await response.json();
        
        //custom error for word not available in dictionary
        if(api_response.country.length==0)
            throw new Error("999");
        else    
            {   
               
                display_name_details(api_response);}
    }
    catch(err) {
        
            
        if(err.message==401){
            alert("Invalid API key")
        }
        else if(err.message==402)
        {
            alert("Subscription is not active")
        }else if(err.message==422)
        {
            alert("Invalid 'name' parameter")
        }else if(err.message==429)
        {
            alert("Request limit reached")
        }else if(err.message==999)
        {
            alert("This name does not exist in our data!")
        }
        
    }
}

fetchData();


}

//create blank div
let blank_div=document.createElement('div');
document.body.append(blank_div);

//blank child div to replace with data
let blank_child=document.createElement('div');
blank_div.appendChild(blank_child);

//function to display name details
function display_name_details(data){
let t, country_name1, country_name2;

if(data.country.length=="1"){

    country_name1 = getCountry_name(data.country[0].country_id);
    t=`<table style='border-collapse: collapse;'><tr><td>Country : ${country_name1}</td><td>Probability : ${data.country[0].probability}</td></tr></table>`;

}
else{
    country_name1 = getCountry_name(data.country[0].country_id);
    country_name2 = getCountry_name(data.country[1].country_id);
    t=`<table style='border-collapse: collapse;'><tr><td>Country : ${country_name1}</td><td>Probability : ${data.country[0].probability}</td></tr><tr><td>Country : ${country_name2}</td><td>Probability : ${data.country[1].probability}</td></tr></table>`;

}

    //create output div
let output_div=document.createElement('div');
output_div.setAttribute('class','output_div');
output_div.innerHTML = t;
blank_div.replaceChildren(output_div);
  
    
}

//function to convert country code to country name - returns code itself if not found
function getCountry_name(code){
 
    let regionNames = new Intl.DisplayNames(['en'], {type: 'region'});
    if(regionNames.of(code))
    return regionNames.of(code);
    else
    return code;


}