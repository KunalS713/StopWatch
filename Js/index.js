
// Store all elements using id's in variables
var start=document.getElementById('start');
var stop=document.getElementById('stop');
var restart=document.getElementById('restart');
var hr=document.getElementById('hour');
var min=document.getElementById('minutes');
var sec=document.getElementById('seconds');
var mili=document.getElementById('miliSeconds');
var lap=document.getElementById('lap');
var timeElement = document.getElementById('time');
var timeList = document.getElementById("time_list");


var ms_Inter;
var sInter;
var minInter;
var hrInter;
var running=false;

timeElement.style.border = "3px solid #0077b6";
//disable buttons as not needed initially.
disableButton(restart);
disableButton(stop);
lap.disabled = true;

// time increament and conversion to 0 after 60
function Sixty(time){
    time=parseInt(time)+1;
    if(time==60){
        time='00';
    }
    else if(time<10){
        time="0"+time;
    }
    return time;
}

// disable button function
function disableButton(btn){
    btn.disabled = true;
    btn.style.background="rgb(228 143 143)";
    btn.style.hover="rgb(222 201 210)";
}

// function to enable buttons
function enableButton(btn){
    btn.disabled = false;
    btn.style.background= "linear-gradient(0deg,rgba(71, 153, 71,1) 0%, rgba(111, 168, 182, 0.548) 100%)";
}

// function to disble lap button
function lapButtonEnable(){
    lap.disabled=false;
}


// click listener for start button
start.addEventListener('click',function(){

    // interval for miliSecHand
    ms_Inter=setInterval(() => {
        mili.textContent=Sixty(mili.textContent);
    }, 1000/60);

    // interval for sec hand
    sInter=setInterval(() => {
        sec.textContent=Sixty(sec.textContent);
    }, 1000);

    // minhand interval
    minInter=setInterval(() => {
        min.textContent=Sixty(min.textContent);
    }, 1000*60);

    // hr hand interval
    hrInter=setInterval(() => {
        hr.textContent=Sixty(hr.textContent);
    }, 1000*60*60);

    running=true;
    // disabling start button and enabling stop restart and lap button
    disableButton(start);
    enableButton(stop);
    enableButton(restart);
    lapButtonEnable();
    
    timeElement.style.border = "3px solid #40916c";
});



// function to clear intervals 
function clearIntervals(){
    clearInterval(ms_Inter);
    clearInterval(sInter);
    clearInterval(minInter);
    clearInterval(hrInter);
    enableButton(start);
}

var stopcount=1;
// click event listner for stop button
stop.addEventListener('click',function(){
       
    if (running) {
      
        running = false;
        timeElement.style.border = "3px solid #c9184a";
        // add the selected stop time to UI
        // var innerContent = "<li>" + hour + " : "  + minutes + " : " + seconds + " : " + miliSeconds + "</li>";
        var innerContent="<li>"+stopcount +".&nbsp&nbsp&nbsp&nbsp" +hr.textContent+" : "+min.textContent+" : "+sec.textContent+" : "+mili.textContent+"</li>";
        timeList.insertAdjacentHTML("afterbegin", innerContent);
    }

    clearIntervals();
    timeElement.style.border = "3px solid #c9184a";
    disableButton(stop);
    stopcount+=1;
    
});


// click event listener for restart button 
restart.addEventListener("click",function(){
    
    timeElement.style.border = "3px solid #0077b6";
    // reseting value to 00
    hr.textContent='00';
    min.textContent='00';
    sec.textContent='00';
    mili.textContent='00';

    // clearing intervals and disabling button
    clearIntervals();
    disableButton(restart);
    disableButton(stop);

    // removing all the laps
    while (flex.firstChild) {
        flex.firstChild.remove()
    }
    count=1;
    lap.disabled = true;
    
    timeList.innerHTML = "";
    stopcount=1;
});

// click event listener for lap button
var count=1;
lap.addEventListener('click',function(){

    // create one div
    let parent = document.createElement("div");  
    // adding class to created dive
    parent.classList.add("lap-item"); 

    var lapTime=hr.textContent+" : "+min.textContent+" : "+sec.textContent+" : "+mili.textContent
    parent.innerHTML =`<span>`+count+`.</span><span class="times">`+lapTime+`</span>`;

    count+=1;
    //append lap div to flex div
    flex.appendChild(parent);    
    
});

