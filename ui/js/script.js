var previousGears = null;

window.addEventListener('message', function(event) {
    var data = event.data;

    if (data.type === 'update') {
        var speed = Math.round(data.status.speed);
        document.getElementById('speed').innerText = speed ? speed : '000';

        var fuelLevel = Math.round(data.status.fuel);
        document.getElementById('fuel-level').innerText = fuelLevel;

        var fuelIcon = document.querySelector('.fa-gas-pump');
        fuelIcon.className = 'fas fa-gas-pump'; 
        if (fuelLevel > 80) {
            fuelIcon.classList.add('green');
        } else if (fuelLevel <= 80 && fuelLevel > 20) {
            fuelIcon.classList.add('orange');
        } else {
            fuelIcon.classList.add('red');
        }

        var gearElement = document.getElementById('gear');
        if (data.status.gears !== previousGears) {
            gearElement.classList.remove('animate');
            void gearElement.offsetWidth; 
            gearElement.classList.add('animate');
            previousGears = data.status.gears;
        }
        gearElement.innerText = data.status.gears;

        document.getElementById('street-name').innerText = data.status.street;

        var damageLevel = Math.round(data.status.damage);
        document.getElementById('damage-level').innerText = damageLevel;
        
var damageIcon = document.querySelector('.fa-car-crash');
damageIcon.className = 'fas fa-car-crash'; 
if (damageLevel > 80) {
    damageIcon.classList.add('green');
} else if (damageLevel <= 80 && damageLevel > 20) {
    damageIcon.classList.add('orange');
} else {
    damageIcon.classList.add('red');
}

        document.getElementById('carhud').style.display = data.show ? 'flex' : 'none';
        document.getElementById('fuel-container').style.display = data.show ? 'flex' : 'none';
        document.getElementById('street-container').style.display = data.show ? 'flex' : 'none';
        document.getElementById('damage-container').style.display = data.show ? 'flex' : 'none'; 
    }
});

var carhud = document.getElementById('carhud');
var fuelContainer = document.getElementById('fuel-container');
var streetContainer = document.getElementById('street-container');
var damageContainer = document.getElementById('damage-container'); 

carhud.addEventListener('animationend', function(event) {
    if (event.animationName === 'fadeOut') {
        carhud.style.display = 'none';
    }
});

fuelContainer.addEventListener('animationend', function(event) {
    if (event.animationName === 'fadeOut') {
        fuelContainer.style.display = 'none';
    }
});

streetContainer.addEventListener('animationend', function(event) {
    if (event.animationName === 'fadeOut') {
        streetContainer.style.display = 'none';
    }
});

damageContainer.addEventListener('animationend', function(event) { 
    if (event.animationName === 'fadeOut') {
        damageContainer.style.display = 'none';
    }
});

document.getElementById('gear').addEventListener('animationend', function() {
    this.classList.remove('animate');
});