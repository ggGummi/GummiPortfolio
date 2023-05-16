const track = null

function limitNumberWithinRange(num, min, max){
    const MIN = min || 1;
    const MAX = max || 20;
    const parsed = parseInt(num)
    return Math.min(Math.max(parsed, MIN), MAX)
}

document.addEventListener("DOMContentLoaded", function(event) { 
    const track = document.getElementById("image-track")
    
    window.onmousemove = e => {
        if (track.dataset.mouseDownAt === "0") return;
        const mouseDelta = parseFloat(track.dataset.mouseDownAt) - e.clientX
        const maxDelta = window.innerWidth / 2;
    
        const percentage = (mouseDelta / maxDelta) * -100;
        const nextPercentage = limitNumberWithinRange((parseFloat(track.dataset.prevPercentage) + percentage), -100, -0.1);

        track.dataset.percentage = nextPercentage;

        track.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        },
        {
            duration: 1200, fill: "forwards"
        });

        image.animate({
            objectPosition: `${nextPercentage + 100} 50%`
        },
        {
            duration: 1200, fill: "forwards"
        });
    }

    window.onmousedown = e => {
        track.dataset.mouseDownAt = e.clientX;
    }
    
    window.onmouseup = e => {
        track.dataset.mouseDownAt = "0";
        track.dataset.prevPercentage = track.dataset.percentage
    }
});