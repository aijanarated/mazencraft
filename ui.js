let diamondText;
let achievementBox;
let rewardScreen;
let letterScreen;


window.addEventListener("load", () => {

    diamondText = document.getElementById("diamondAmount");
    achievementBox = document.getElementById("achievementBox");
    rewardScreen = document.getElementById("rewardScreen");
    letterScreen = document.getElementById("letterScreen");

});



function updateDiamonds(amount) {

    if (diamondText) {
        diamondText.innerText = amount;
    }

}



function showAchievement(title, text) {

    if (!achievementBox) return;

    const box = document.createElement("div");

    box.className = "achievement";

    box.innerHTML = `
        <b>${title}</b><br>
        ${text}
    `;

    achievementBox.appendChild(box);


    setTimeout(() => {
        box.remove();
    }, 5000);

}



const achievements = [

    ["Microwave Lifter", "Lifted a microwave like a champion."],

    ["30 Push-Ups", "Strength unlocked."],

    ["Daily Tea Drinker", "Tea is life."],

    ["405 Days Together", "405 days of memories."],

    ["Level 18 Unlocked", "Adult mode activated."],

    ["Still Using the Mizr Account", "Some legends never switch accounts."],

    ["Master of 15-Hour Sleep", "Sleep speedrun completed."]

];



function unlockAllAchievements() {

    achievements.forEach((a, i) => {

        setTimeout(() => {

            showAchievement(a[0], a[1]);

        }, i * 1500);

    });

}



function openFinalReward() {

    if (rewardScreen) {

        rewardScreen.classList.remove("hidden");

    }

    unlockAllAchievements();

}



document.addEventListener("DOMContentLoaded", () => {

    const letterButton = document.getElementById("letterBtn");


    if (letterButton) {

        letterButton.onclick = () => {

            rewardScreen.classList.add("hidden");

            letterScreen.classList.remove("hidden");

            typeLetter();

        };

    }

});



function typeLetter() {

    const text = `Happy 18th Birthday to my favorite boy ever ❤️

I missed you so much, but let's not make this all about me.

You're finally 18 now! You can get the licenses you always wanted, and you're officially a pedo.

I love you, so, so much, and I hope 18 treats you well and brings you everything you wish for.

I hope we get married, and I could honestly write so much about you that you probably wouldn't be able to read it all.

Just know that you are my favorite man ever. You are the sweetest and kindest person ever.

Love you, Mazonty ❤️`;


    const element = document.getElementById("letterText");

    let i = 0;


    const timer = setInterval(() => {

        element.innerHTML += text[i];

        i++;


        if (i >= text.length) {

            clearInterval(timer);

        }

    }, 50);

}
