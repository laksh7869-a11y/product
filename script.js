let allelems = document.querySelectorAll('.elem');
let pages=document.querySelectorAll('.page');
let back=document.querySelectorAll('.page .close');

allelems.forEach((elems) => {
    elems.addEventListener('click',function(){
    pages[elems.id].style.display='block';
    })
})

back.forEach((back) => {
    back.addEventListener('click',function(){
    pages[back.id].style.display='none';
    })
})