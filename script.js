const startBtn=document.querySelector('.startbtn');
const popupInfo=document.querySelector('.popup-info');
const exitBtn =document.querySelector(".exit-btn");
const Main=document.querySelector('.main');

startBtn.addEventListener('click',()=>{
    popupInfo.classList.add('active');
    Main.classList.add('active');
});
exitBtn.addEventListener('click',()=>{
    popupInfo.classList.remove('active');
});