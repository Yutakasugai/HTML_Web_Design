const menu = document.querySelector('#mobile-menu');
const menuLinks = document.querySelector('.nav-menu');

menu.addEventListener('click', function(){
    menu.classList.toggle('is-active');
    menuLinks.classList.toggle('active');
})

// Mobile items
const modal = document.getElementById('email-modal');
const openBtn = document.querySelector('.main-btn');
const closeBtn = document.querySelector('.close-btn');

openBtn.addEventListener('click', () => {
    modal.style.display = 'block';
})

closeBtn.addEventListener('click', () => {
    modal.style.display = none;
})

window.addEventListener('click', (e) => {
    if(e.target === modal){
        modal.style.display = 'none';
    }
})

const form = document.getElementById('form');
const name = document.getElementById('name');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm')

function showError(input, message){
    const formValidation = input.parentElement; 
    formValidation.className = 'form-validation error'; 

    const errorMessage = formValidation.querySelector('p')
    errorMessage.innerText = message;
}

function showValid(input){
    const formValidation = input.parentElement;
    formValidation.className = 'form-validation valid';
}

function checkRequired(inputArr){
    inputArr.forEach(function(input){
        if(input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        }else{
            showValid(input);
        }
    })
}

function checkLength(input, min, max){
    if (input.value.length < min){
        showError(input, `${getFieldName(input)} must be at least ${min} words`);
    }else if (input.value.length > max){
        showError(input, `${getFieldName(input)} must be less than ${max} words`);
    }else{
        showValid(input); 
    }
}

function passwordMatch(input1, input2){
    if (input1.value !== input2.value){
        showError(input2, 'Password dont match each other');
    }
}

function getFieldName(input){
    return input.name.charAt(0).toUpperCase() + input.name.slice(1);
}

form.addEventListener('submit', (e) => {

    e.preventDefault();

    checkRequired([name, email, password, passwordConfirm]); 
    checkLength(name, 3, 30);
    checkLength(password, 8, 25);
    checkLength(passwordConfirm, 8, 25); 
    passwordMatch(password, passwordConfirm);
})

//Image Gallery 
let galleryImages = document.querySelectorAll('.services-cell');
let getLatestOpnedImg; 
let windowWidth = window.innerWidth; 

galleryImages.forEach(function(image, index){
    image.onclick = function(){
        
        getLatestOpnedImg = index + 1; 

        let container = document.body;
        let newimgWindow = document.createElement('div');
        container.appendChild(newimgWindow);
        newimgWindow.setAttribute('class', 'img-window');
        newimgWindow.setAttribute('onclick', 'closeImg()');

        let newImg = image.firstElementChild.cloneNode();
        newimgWindow.appendChild(newImg);
        newImg.classList.remove('services-cell_img');
        newImg.classList.add('popup-img');
        newImg.setAttribute('id', 'current-img');

        newImg.onload = function() {
            let newNextbtn = document.createElement('a');
            newNextbtn.innerHTML = '<i class="fan fas fa-chevron-right next"></i>';
            container.appendChild(newNextbtn);
            newNextbtn.setAttribute('class', 'img-btn-next');
            newNextbtn.setAttribute('onclick', 'changeImg(1)');

            let newPrevbtn = document.createElement('a');
            newPrevbtn.innerHTML = '<i class="fan fas fa-chevron-left next"></i>';
            container.appendChild(newPrevbtn);
            newPrevbtn.setAttribute('class', 'img-btn-prev');
            newPrevbtn.setAttribute('onclick', 'changeImg(0)');
        }
    }
})

function closeImg(){
    document.querySelector('.img-window').remove();
    document.querySelector('.img-btn-next').remove();
    document.querySelector('.img-btn-prev').remove();

}

function changeImg(change){
    document.querySelector('#current-img').remove();

    let getImgWindow = document.querySelector('.img-window');
    let newImg = document.createElement('img');
    getImgWindow.appendChild(newImg);

    let clacNewImg;
    if (change === 1){
        clacNewImg = getLatestOpnedImg + 1;
        if (clacNewImg > galleryImages.length){
            clacNewImg = 1;
        }
    }
    else if (change === 0){
        clacNewImg = getLatestOpnedImg - 1;
        if (clacNewImg < 1){
            clacNewImg = galleryImages.length;
        }
    }

    newImg.setAttribute('src', 'gallery/img-' + clacNewImg + '.jpg');
    newImg.setAttribute('class', 'popup-img');
    newImg.setAttribute('id', 'current-img');

    getLatestOpnedImg = clacNewImg; 
}


