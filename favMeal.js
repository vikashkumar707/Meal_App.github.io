//We first need to fetch the favorite meal Id whenever the fav icon is clicked
let mealIdsval = JSON.parse(localStorage.getItem('mealid'))
// console.log(mealIdsval.length)
let newMealsArray =[]
//Here we will provide details of favourite meal 
let Mealdetails = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=`
let checkdata = []


//forming the new url using the liked meal id
 function displayfavValue() {
     let promise = new Promise((resolve,reject)=>{

        for(i in mealIdsval){
            let mid = '';
            mid = mealIdsval[i];
            let newurl=Mealdetails+mid.mealIds;

            fetch(newurl).then((response)=>{
                return response.json();
            }).then((data)=>{
    //            console.log(data)
    //once the data is fetched it will be displayed
                displayfavbookmarks(data);            
            })    
            
            resolve("data is being resolved")
        }
     })
     return promise;
    }


//if the fav item is displayed then console success
 displayfavValue().then((success)=>{
    console.log(success)
    
 }).catch(()=>{
     console.log('failed')
 });

 //
 function displayfavbookmarks(data){
    
    newMealsArray.push(data);
    if(mealIdsval.length == newMealsArray.length){
        displaytheDatas(newMealsArray)
    }
 }

 function displaytheDatas(newMealsArray){
    let displayImages = '';
    for(let i in newMealsArray){
        let newData = newMealsArray[i].meals[0]
      //  console.log(newData)
        
        displayImages+=`
        <div id="mealbox_${newData.idMeal}" class="newMain">
            <div  class="image_and_Details">
                <div class="imageDem">
                    <img src="${newData.strMealThumb}">
                </div>
                <div style="text-align: center;">
                    <p style=" color:Black">${newData.strMeal}</p>
                    <div>
                        <button class="RemoveButton" onClick = "removeClickd(${newData.idMeal},'mealbox_${newData.idMeal}')" >
                         Remove
                         </button>
                    </div>
                </div>
            </div>
        </div>
        `
    }

    document.querySelector('.main_ImageANdDet_Sec').innerHTML =displayImages;
}


function removeClickd(val,newMain){
   let removableeme = document.getElementById(newMain);
   removableeme.remove(); 
    console.log('clicked',newMealsArray)
    console.log(mealIdsval)
   let Idmeals = '';
    for(let i in newMealsArray){
        Idmeals = newMealsArray[i].meals[0].idMeal;
        // console.log(newMealsArray[i])
        if(Idmeals == val){
            // console.log(val)
             console.log(Idmeals)
           handleDeleteAction(Idmeals)
           
            return;
        }
    }

}

//Removing from fav list
function handleDeleteAction(Idmeals){
   // console.log(localStorage.getItem('mealId'))    
    for(let i of JSON.parse(localStorage.getItem('mealid'))){
        if(i.mealIds == Idmeals)
        {
            JSON.parse(localStorage.getItem('mealid')).splice(i,1);
            //console.log(Idmeals)
          //  localStorage.removeItem('mealid')
        }
    }
    console.log(JSON.parse(localStorage.getItem('mealid')))

    // let k = Object.keys(localStorage);
    // console.log(k)
}
