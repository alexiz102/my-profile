const check_reloader = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
        if(entry.type === "reload") {
            window.location = window.location.origin
        }
    })
})

check_reloader.observe({type: "navigation", buffered: true})

document.getElementById("coffee").addEventListener("mousemove", (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;
    const coffee = document.getElementById("beverage");
    const boundingRect = coffee.getBoundingClientRect();
    const coffeeX = boundingRect.left + boundingRect.width/2;
    const coffeeY = boundingRect.top + boundingRect.height/2;

    const angleDeg = angle(mouseX, mouseY, coffeeX, coffeeY)

    const coffee_type = (Math.abs(angleDeg)/180*1)+1

    console.log(angleDeg)

    document.getElementById("beverage").style.transform = `rotate(${angleDeg-45}deg)`    
    document.getElementById("beverage").style.filter = `saturate(${coffee_type})`    
})

function angle(cx, cy, ex, ey) {
    const dy = ey - cy;
    const dx = ex - cx;
    const rad = Math.atan2(dy, dx);
    const deg = rad * 180/Math.PI
    return deg;
}

const stopScroll = (stop_it) => {
    if(stop_it) {
        document.body.style.overflow = "hidden"
    } else {
        document.body.style.overflow = "visible"
    }
}

const modal_drawing = document.querySelector('#modal-1')
const drawing_button = document.querySelector('#drawing')
const modalClose = document.querySelectorAll('.close')

drawing_button.addEventListener("click", (e) => {
    stopScroll(true)
    modal_drawing.showModal();
})

modalClose.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        stopScroll(false)
        modal_drawing.close()
        music_modal.close()
        video_modal.close()
        stopVideo()
        read_modal.close()
        game_window.close()
    })
})

const music_player = document.querySelector('#music')
const music_modal = document.querySelector('#modal-2')
const music = document.querySelector('#fireflies')
const play_button = document.querySelector('#button-play')
const stop_button = document.querySelector('#button-stop')

function isPlaying(audio) {return !audio.paused}

music_player.addEventListener('click',(e) => {
    stopScroll(true)
    music_modal.showModal()
})

play_button.addEventListener('click', (e) => {
    if (isPlaying(music)) {
        music.pause()
        play_button.textContent = "Play"
    } else {
        music.play()
        play_button.textContent = "Pause"
    }
})

stop_button.addEventListener('click', (e) => {
    music.pause()
    music.currentTime = 0
})

const video_button = document.querySelector('#watching')
const video_modal = document.querySelector('#modal-3')
const video = document.querySelector('#game-theory')

function stopVideo() {
    var videoSrc = video.scroll;
    video.src = videoSrc
}

video_button.addEventListener('click', (e) => {
    var status = navigator.onLine
    if (status) {
        video_modal.showModal()
        stopScroll(true)
    } else {
        alert("This video requires an internet connection. Please connect then reload the page")
    }
})

const read_button = document.querySelector('#reading')
const read_modal = document.querySelector('#modal-4')

read_button.addEventListener('click', (e) => {
    read_modal.showModal()
    stopScroll(true)
})

const play_game = document.querySelector('#playing')
const char = document.querySelector('#char')
const block = document.querySelector('#block')
const jump = document.querySelector('#jump')
const game_window = document.querySelector('#modal-5')
const game_win = document.querySelector('#game')

play_game.addEventListener('click', (e) => {
    game_window.showModal()
    stopScroll(true)
})

jump.addEventListener('click', (e) => {
    if (char.classList != "jump") {
        char.classList.add("jump")
        setTimeout(function() {
            char.classList.remove("jump")
        }, 750)
    }
})

var checkDead = setInterval(function() {
    var game_w = parseInt(window.getComputedStyle(game_win).getPropertyValue("left"))
    var char_top = parseInt(window.getComputedStyle(char).getPropertyValue("top"))
    var char_height = parseInt(window.getComputedStyle(char).getPropertyValue("height"))
    var char_width = parseInt(window.getComputedStyle(char).getPropertyValue("width"))
    var block_left = parseInt(window.getComputedStyle(block).getPropertyValue("left"))
    var block_top = parseInt(window.getComputedStyle(block).getPropertyValue("top"))
    if (block_left < game_w+char_width && block_left > 0 && char_top >= block_top) {
        alert("you hit a block")
    }
}, 10)

const just_play = document.querySelector('#questionable')
const outro = document.querySelector('#outro')

just_play.addEventListener('click', (e) => {
    if(isPlaying(outro)) {
        outro.pause()
        outro.currentTime = 0
        just_play.textContent = "?????"
    } else {
        outro.play()
        just_play.textContent = "Outro"
    }
})