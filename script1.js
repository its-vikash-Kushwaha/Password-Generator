
const inputSlider=document.querySelector("[data-lengthSlider]");
const lengthDisplay=document.querySelector("[data-lengthNumber]");
const passwordDisplay=document.querySelector("[data-passwordDisplay]");
const copyBtn=document.querySelector("[data-copy]");
const copyMsg=document.querySelector("[data-copyMsg]");
const upperCaseCheck=document.querySelector("#uppercase");
const lowerCaseCheck=document.querySelector("#lowercase");
const numbersCheck=document.querySelector("#number");
const symbolsCheck=document.querySelector("#Symbols");
const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".generateBtn");
const allCheckbox=document.querySelectorAll("input[type=checkbox]");
const txtt=document.querySelector(".tt");
const symbols="!@#$%^&*()-_=+\|[]{};:/?.>";


let password="";
let passwordLength=10;
let checkCount=0;


handleSlider();
// set sliderlength
setIndicator("#ccc");

function handleSlider(){
    inputSlider.value=passwordLength;
    lengthDisplay.innerText=passwordLength;

    const min=inputSlider.min;
    const max=inputSlider.max;
    inputSlider.style.backgroundSize=((passwordLength-min)*100/(max-min)+"% 100%");
}

txtt.textContent="Strength";
function setIndicator(color ,txt){
    indicator.style.backgroundColor=color;
    indicator.style.boxShadow=`0px 0px 12px 1px ${color}`;
    txtt.textContent=txt;


}

function getRndInteger(min,max){
   return Math.floor(Math.random()*(max-min))+min;
}

function  generateRandomNumber(){
    return getRndInteger(0,9);
}

function generateRandomLowerCase(){
    return String.fromCharCode(getRndInteger(97,123));
}


function generateRandomUpperrCase(){
    return String.fromCharCode(getRndInteger(65,91));
}

function generateSymbolNumber(){
const rndNum=getRndInteger(0,symbols.length);
return symbols.charAt(rndNum);
}

function calcStrength(){
    let hasUpper=false;
    let hasLower=false;
    let hasNum=false;
    let hasSym=false;
    if(upperCaseCheck.checked) hasUpper=true;
    if(lowerCaseCheck.checked) hasLower=true;
    if(numbersCheck.checked) hasNum=true;
    if(symbolsCheck.checked) hasSym=true;

    if(hasUpper && hasLower&& (hasNum || hasSym && passwordLength>=8)){
        setIndicator("#0f0" , "Strength");
    } else if( 
        (hasLower||hasUpper)&&
        (hasNum||hasSym)&&
        passwordLength>=6
    ){
        setIndicator("#ff0","Good");
    }else{
        setIndicator("#f00","Weak");
    }
}


async function copyContent(){
try{
    await navigator.clipboard.writeText(passwordDisplay.value);
    copyMsg.innerText="copied";

}
catch(e){
   copyMsg.innerText="failed";
}
copyMsg.classList.add("active");

setTimeout(()=>{
    copyMsg.classList.remove("active");
},2000);

}


inputSlider.addEventListener('input' ,(event)=>{
    passwordLength=event.target.value;
    handleSlider();
});

copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value){
        copyContent();
    }
});

function handleCheckBoxChange(){
      checkCount=0;
      allCheckbox.forEach((checkbox)=>{
          if(checkbox.checked)
         checkCount++;
    });
    if(passwordLength<checkCount){
        passwordLength=checkCount;
        handleSlider();
    }
}

allCheckbox.forEach((checkbox) => {
    checkbox.addEventListener('change',handleCheckBoxChange);
})

function shufflePassword(array){
    //fisher Yates Method 
    for(let i=array.length-1;i>0;i--){
         const j=Math.floor(Math.random()*(i+1));
         const temp=array[i];
         array[i]=array[j];
         array[j]=temp;
    }
    let str="";
    array.forEach((el)=>(str+=el));
    return str;
}

generateBtn.addEventListener('click',()=>{
 //none of the checkbox are selected

console.log('he');
 if(checkCount==0) return;

 if(passwordLength<checkCount){
    passwordLength=checkCount;
    handleSlider();
 }

 //let's start the jouney to find new password

 // remove old password
 password="";

 // let's put the stuff mentioned by checkedboxes
  
//  if(upperCaseCheck.checked){
//     password +=generateRandomUpperrCase();
//  }

//  if(lowerCaseCheck.checked){
//     password +=generateRandomLowerCase();
//  }

//  if(numbersCheck.checked){
//     password +=generateRandomNumber();
//  }

//  if(symbolsCheck.checked){
//     password +=generateSymbolNumber();
//  }

let funcArr=[];

if(upperCaseCheck.checked){
    funcArr.push(generateRandomUpperrCase);
}

if(lowerCaseCheck.checked){
    funcArr.push(generateRandomLowerCase);
 }

 if(numbersCheck.checked){
    funcArr.push(generateRandomNumber);
 }

 if(symbolsCheck.checked){
    funcArr.push(generateSymbolNumber);
 }

 // compulsory addition
 for(let i=0; i<funcArr.length;i++){
    password+=funcArr[i]();
 }

 // remaining addition

 for(let i=0;i<passwordLength-funcArr.length;i++){
    let rndIndex=getRndInteger(0,funcArr.length);
    console.log("random Index"+rndIndex);
    password+=funcArr[rndIndex]();
 }

 //shuffle the password;
password=shufflePassword(Array.from(password));

//show in UI
passwordDisplay.value=password;


//calculate strength

calcStrength();
})