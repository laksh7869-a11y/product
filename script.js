function openfunction() {
    let allelems = document.querySelectorAll('.elem');
    let pages = document.querySelectorAll('.page');
    let back = document.querySelectorAll('.page .close');

    allelems.forEach((elems) => {
        elems.addEventListener('click', function () {
            pages[elems.id].style.display = 'block';
        })
    })

    back.forEach((back) => {
        back.addEventListener('click', function () {
            pages[back.id].style.display = 'none';
        })
    })
}

openfunction();



function todopage() {
    let currentTask = []

    if (localStorage.getItem('currentTask')) {
        currentTask = JSON.parse(localStorage.getItem('currentTask'))
    } else {
        console.log('Task list is Empty');
    }


    function rendertask() {
        let alltask = document.querySelector('.alltask');

        let sum = ``

        currentTask.forEach((elem, idx) => {
            sum = sum + `<div class="task">
                        <h5>${elem.task} <span class=${elem.imp}>imp</span></h5>
                        <button id=${idx}>Mark as done</button>
                </div>`


        })
        alltask.innerHTML = sum;

        localStorage.setItem('currentTask', JSON.stringify(currentTask));

        document.querySelectorAll('.task button').forEach((btn) => {
            btn.addEventListener('click', function () {
                currentTask.splice(btn.id, 1);
                rendertask();
            })
        })
    }

    let form = document.querySelector('.addtask form');
    let taskinput = document.querySelector('.addtask form #task-input');
    let taskdetailsinput = document.querySelector('.addtask form #textarea');
    let checkbox = document.querySelector('.addtask form #checkbox');

    rendertask();

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        currentTask.push({
            task: taskinput.value,
            details: taskdetailsinput.value,
            imp: checkbox.checked
        })

        taskinput.value = "";
        taskdetailsinput.value = "";
        checkbox.checked = false;

        rendertask();
    })
}

todopage();



function dailyplanner() {
    let dayplannerstorage = JSON.parse(localStorage.getItem('dayplannerstorage')) || {};

    let dayplanner = document.querySelector('.dayplanner');



    let hours = Array.from({ length: 18 }, (_, idx) => `${idx + 6}:00 - ${idx + 7}:00`);

    let wholedaysum = ''

    hours.forEach(function (elem, idx) {

        let saveddata = dayplannerstorage[idx] || '';

        wholedaysum = wholedaysum + `<div class="dayplanner-time">
                    <p class="time">${elem}</p>
                    <input id=${idx} type="text" placeholder="..." value="${saveddata}">
                </div>`
    }
    )

    dayplanner.innerHTML = wholedaysum;

    let dayplannerinputs = document.querySelectorAll('.dayplanner-time input');


    dayplannerinputs.forEach(function (elem) {
        elem.addEventListener('input', function () {
            dayplannerstorage[elem.id] = elem.value;
            localStorage.setItem('dayplannerstorage', JSON.stringify(dayplannerstorage));
        })

    })
}

dailyplanner();



function motivational_quote() {
    var motivationalQuote = document.querySelector('.motivation2 h1');
    var motivationalAuthour = document.querySelector('.name h3');

    async function fetchQuote() {
        let response = await fetch('https://api.quotable.io/random')
        let data = await response.json()

        motivationalQuote.innerText = data.content
        motivationalAuthour.innerText = `~ ${data.author}`
    }

    fetchQuote()
}
motivational_quote();



function pomodoroTimer() {
    let totalSeconds = 1500;

    let timer = document.querySelector('.page.pomodoro .pomo-timer h1');
    let strtbtn = document.querySelector('.page.pomodoro .pomo-timer .start-timer');
    let pausetbtn = document.querySelector('.page.pomodoro .pomo-timer .pause-timer');
    let resetbtn = document.querySelector('.page.pomodoro .pomo-timer .reset-timer');
    let session = document.querySelector('.page.pomodoro .session');
    var isWorkSession = true




    let timeinterval = null;


    function updateTimer() {
        let minutes = Math.floor(totalSeconds / 60)
        let seconds = totalSeconds % 60

        timer.innerHTML = `${String(minutes).padStart(2, 0)}:${String(seconds).padStart(2, 0)}`
    }

    function startTimer() {
        if (isWorkSession) {

            timeinterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = false
                    clearInterval(timeinterval)
                    timer.innerHTML = '05:00'
                    session.innerHTML = 'Take a Break'
                    session.style.backgroundColor = 'var(--blue)'
                    totalSeconds = 5 * 60
                }
            }, 1000)
        } else {


            timeinterval = setInterval(function () {
                if (totalSeconds > 0) {
                    totalSeconds--
                    updateTimer()
                } else {
                    isWorkSession = true
                    clearInterval(timeinterval)
                    timer.innerHTML = '25:00'
                    session.innerHTML = 'Work Session'
                    session.style.backgroundColor = 'yellowgreen'
                    totalSeconds = 25 * 60
                }
            }, 1000)
        }
    }

    function pauseTimer() {
        clearInterval(timeinterval)
    }

    function resetTimer() {
        clearInterval(timeinterval)
        totalSeconds = 1500
        updateTimer()
    }

    strtbtn.addEventListener('click', startTimer)

    pausetbtn.addEventListener('click', pauseTimer)
    pausetbtn.addEventListener('click', pauseTimer)
    resetbtn.addEventListener('click', resetTimer)


}

pomodoroTimer();

function weather() {
    let APIkey='2ec684cc794448069d863616260802';
let city='mumbai'
let dayTime=document.querySelector('.header1 h1');
let dayDate=document.querySelector('.header1 h2');
let temprature=document.querySelector('.header2 h2');
let humidity=document.querySelector('.header2 .hum');
let precipitation=document.querySelector('.header2 .precip');
let condition=document.querySelector('.header2 h4');
let wind=document.querySelector('.header2 .wind');

async function weatherAPICall(){
    let response=await fetch(`https://api.weatherapi.com/v1/current.json?key=${APIkey}&q=${city}&aqi=no`);
    let data=await response.json();
    temprature.innerHTML=`${data.current.temp_c}°C`;
    condition.innerHTML=`${data.current.condition.text}`;
    humidity.innerHTML=`Humidity : ${data.current.humidity}%`;
    precipitation.innerHTML=`Precipitation : ${data.current.precip_in}%`;
    wind.innerHTML=`Wind : ${data.current.wind_kph} KpH`;
}

weatherAPICall();

function timeData(){
    let totalDaysOfWeek=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    let totalMonths=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date=new Date();
    let dayOfWeek=totalDaysOfWeek[date.getDay()];
    let hours=date.getHours();
    let minutes=date.getMinutes();
    let monthName=totalMonths[date.getMonth()];
    let dateofMonth=date.getDate()
    let year=date.getFullYear();

    dayDate.innerHTML=`${String(dateofMonth).padStart(2, 0)} ${monthName} ${year}`;
    


        if(hours<12){
            dayTime.innerHTML=`${dayOfWeek} ${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)} AM`;
        }
        else{
            dayTime.innerHTML=`${dayOfWeek} ${String(hours-12).padStart(2, 0)}:${String(minutes).padStart(2, 0)} PM`;

        }


}
setInterval(()=>{
    timeData();
},1000)
}

weather();