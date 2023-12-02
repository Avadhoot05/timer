const inputHour = document.getElementById("input-hour");
const inputMinute = document.getElementById("input-minute");
const inputSecond = document.getElementById("input-second");
const btnStart = document.getElementById("btn-start");
const btnReset = document.getElementById("btn-reset");

btnStart.addEventListener("click", OnStartPauseBtnClicked);
btnReset.addEventListener("click", OnResetBtnClicked);


let time = {
    hour: 0,
    minute: 0,
    second: 0
}

let interval = -1;

function CheckTimerOver()
{
    if(time.hour == 0 && time.minute == 0 && time.second == 0)
    {
        console.log("Over");
        Pause();
    }
}


function Get2DigitFormat(time)
{
    return (time.toString().length == 1 && time < 10) ? "0" + time : time;    
}


function RenderTime()
{
    inputHour.value = Get2DigitFormat(time.hour);
    inputMinute.value = Get2DigitFormat(time.minute);
    inputSecond.value = Get2DigitFormat(time.second);
}

function UpdateTime()
{
    time.second -= 1;

    if(time.second == -1)
    {
        time.minute -= 1;
        time.second = 59;    
    }

    if(time.minute == -1)
    {
        time.hour -= 1;
        time.minute = 59;
    }

    // console.log(`${time.hour}: ${time.minute}: ${time.second}`);

    RenderTime();
    CheckTimerOver();
}

function ValidateInput()
{
    if(time.second >= 60) 
    {
        time.minute += 1;   
        time.second -= 60; 
    }

    if(time.minute >= 60) 
    {
        time.hour += 1;   
        time.minute -= 60; 
    }

    if(time.hour == 100)
        return false;
    return true;
}

function Pause()
{
    clearInterval(interval);
    interval = -1;

    if(time.hour != 0 || time.minute != 0 || time.second != 0)
        btnStart.innerHTML = "resume";
    else 
        btnStart.innerHTML = "start";
}

function Start()
{
    console.log(`${time.hour}: ${time.minute}: ${time.second}`);
    
    const isValid = ValidateInput();
    if(!isValid)
    {
        console.log("Timer limit exceed");
        return;
    }
    RenderTime();
    interval = setInterval(UpdateTime, 1000);
    btnStart.innerHTML = "pause";
}

function OnResetBtnClicked()
{
    time = {
        hour: 0,
        minute: 0,
        second: 0
    }
    Pause();
    RenderTime();
}

function OnStartPauseBtnClicked()
{
    if(interval != -1)
    {
        Pause();
    }
    else
    {
        time.hour = parseInt(inputHour.value);
        time.minute = parseInt(inputMinute.value);
        time.second = parseInt(inputSecond.value);

        Start();
    }
}