let fps = 60;
let frameLength = 1000 / fps;
let keyPressed = false;
let paused = true;


function runGame(gameOver) {

    if (!gameOver) {
        let splashScreen = document.getElementById('game-wrapper');

        splashScreen.innerHTML = '';

        splashScreen.style.background = 'url(images/blur-splash.png)'

        let title = document.createElement('H1');
        title.innerHTML = 'CAR LANE WITH BULLETS';
        title.style.marginTop = '150px';
        title.style.fontSize = '40px';
        title.style.textAlign = 'center';
        title.style.color = '#ffffff';
        splashScreen.appendChild(title);

        let info = document.createElement('h2');
        info.innerHTML = 'CONTROLS:';
        info.style.marginTop = '50px';
        info.style.fontSize = '25px';
        info.style.textAlign = 'center';
        info.style.color = '#ff621f'
        splashScreen.appendChild(info);

        let controls = document.createElement('h4');
        controls.innerHTML = 'LeftArrow, A : Go Left <br> RightArrow, D : Go Right <br> UpArrow, W, SPACE : Bullet<br>';
        controls.style.marginTop = '30px';
        controls.style.fontSize = '20px';
        controls.style.textAlign = 'center';
        controls.style.color = '#ffa985'
        splashScreen.appendChild(controls);

        let play = document.createElement('button');
        play.innerHTML = 'CLICK HERE TO START';
        play.style.marginTop = '50px';
        play.style.display = 'block';
        play.style.margin = '80px auto';
        play.style.fontSize = '30px';
        play.style.padding = '30px';
        splashScreen.appendChild(play);

        play.addEventListener('click', () => {
            paused = false;
            splashScreen.removeChild(play);
            splashScreen.removeChild(title);
            splashScreen.removeChild(info);
            splashScreen.removeChild(controls);
            splashScreen.style.background = 'none';
            new Game();
        });
    }
    else {
        let splashScreen = document.getElementById('game-wrapper');

        splashScreen.innerHTML = '';

        splashScreen.style.background = 'url(images/blur-splash.png)'

        splashScreen.style.background = 'url(images/blur-splash.png)'

        let gameOver = document.createElement('H1');
        gameOver.innerHTML = '!!! GAME OVER !!!';
        gameOver.style.marginTop = '150px';
        gameOver.style.fontSize = '40px';
        gameOver.style.textAlign = 'center';
        gameOver.style.color = '#ff5145';
        splashScreen.appendChild(gameOver);

        let title = document.createElement('H1');
        title.innerHTML = 'CAR LANE WITH BULLETS';
        title.style.marginTop = '50px';
        title.style.fontSize = '30px';
        title.style.textAlign = 'center';
        title.style.color = '#ffffff';
        splashScreen.appendChild(title);

        let info = document.createElement('h2');
        info.innerHTML = 'CONTROLS:';
        info.style.marginTop = '50px';
        info.style.fontSize = '25px';
        info.style.textAlign = 'center';
        info.style.color = '#ff621f'
        splashScreen.appendChild(info);

        let controls = document.createElement('h4');
        controls.innerHTML = 'LeftArrow, A : Go Left <br> RightArrow, D : Go Right <br> UpArrow, W, SPACE : Bullet<br>';
        controls.style.marginTop = '30px';
        controls.style.fontSize = '20px';
        controls.style.textAlign = 'center';
        controls.style.color = '#ffa985'
        splashScreen.appendChild(controls);

        let play = document.createElement('button');
        play.innerHTML = 'TRY AGAIN';
        play.style.marginTop = '50px';
        play.style.display = 'block';
        play.style.margin = '80px auto';
        play.style.fontSize = '30px';
        play.style.padding = '30px';
        splashScreen.appendChild(play);


        play.addEventListener('click', () => {
            location.reload();
        });
    }
}

runGame();