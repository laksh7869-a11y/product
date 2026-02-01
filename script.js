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