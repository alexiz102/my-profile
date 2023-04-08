// things to script
// 1. sticky-note hover in intro
// 2. some animations at top in navbar based on mouse
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