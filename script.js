document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('.nav');
    let lastScroll = window.scrollY;

    window.addEventListener('scroll', () => {
        if (window.scrollY > lastScroll) {
            nav.classList.add('hidden');
        }
        else {
            nav.classList.remove('hidden');
        }
        lastScroll = window.scrollY;
    }
    );
}
);



document.addEventListener('DOMContentLoaded', () => {
    const heroBtn = document.getElementById('hero-btn');
    heroBtn.addEventListener('click', () => {
        document.getElementById('music').scrollIntoView({ behavior: 'smooth' });
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const musicSlides = document.querySelectorAll('#music .carousel-slide');
    const musicPrevBtn = document.getElementById('music-prev-btn');
    const musicNextBtn = document.getElementById('music-next-btn');
    const checkBtn = document.getElementById('music-check-btn');
    let currentMusicSlide = 0;

    function showMusicSlide(newIndex) {
        const current = musicSlides[currentMusicSlide];
        const next = musicSlides[newIndex];

        // Crossfade animation using the Web Animations API
        current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
        next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });

        current.classList.remove('active');
        next.classList.add('active');
        currentMusicSlide = newIndex;

        musicPrevBtn.disabled = (newIndex === 0);
        musicNextBtn.disabled = (newIndex === musicSlides.length - 1);
    }

    musicPrevBtn.addEventListener('click', () => {
        if (currentMusicSlide > 0) {
            showMusicSlide(currentMusicSlide - 1);
        }
    });
    musicNextBtn.addEventListener('click', () => {
        if (currentMusicSlide < musicSlides.length - 1) {
            showMusicSlide(currentMusicSlide + 1);
        }
    });

    function checkAnswer() {
        const slide = musicSlides[currentMusicSlide];
        const input = slide.querySelector('.music-input');
        const correctAnswer = slide.dataset.answer.trim().toLowerCase();
        const userAnswer = input.value.trim().toLowerCase();
        alert(userAnswer === correctAnswer ? 'God I love you!' : 'Don\'t make me doubt my choice!');
    }
    checkBtn.addEventListener('click', checkAnswer);
});



document.addEventListener('DOMContentLoaded', () => {
    const memorySlides = document.querySelectorAll('#memory-carousel .carousel-slide');
    const memoryPrevBtn = document.getElementById('memory-prev-btn');
    const memoryNextBtn = document.getElementById('memory-next-btn');
    const memoryRevealBtn = document.getElementById('memory-reveal-btn');
    let currentMemorySlide = 0;

    function showMemorySlide(newIndex) {
        const current = memorySlides[currentMemorySlide];
        const next = memorySlides[newIndex];

        // Reset flip state on the next slide
        const flipInner = next.querySelector('.flip-inner');
        if (flipInner) {
            flipInner.classList.remove('flipped');
        }
        memoryRevealBtn.textContent = "Reveal";

        // Crossfade transition
        current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
        next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });

        current.classList.remove('active');
        next.classList.add('active');
        currentMemorySlide = newIndex;

        memoryPrevBtn.disabled = (newIndex === 0);
        memoryNextBtn.disabled = (newIndex === memorySlides.length - 1);
    }

    memoryPrevBtn.addEventListener('click', () => {
        if (currentMemorySlide > 0) {
            showMemorySlide(currentMemorySlide - 1);
        }
    });
    memoryNextBtn.addEventListener('click', () => {
        if (currentMemorySlide < memorySlides.length - 1) {
            showMemorySlide(currentMemorySlide + 1);
        }
    });

    memoryRevealBtn.addEventListener('click', () => {
        const currentSlide = memorySlides[currentMemorySlide];
        const flipInner = currentSlide.querySelector('.flip-inner');
        if (flipInner) {
            if (!flipInner.classList.contains('flipped')) {
                flipInner.classList.add('flipped');
                memoryRevealBtn.textContent = "UnReveal";
            } else {
                flipInner.classList.remove('flipped');
                memoryRevealBtn.textContent = "Reveal";
            }
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const checkboxes = document.querySelectorAll('#bucket input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        const key = checkbox.id;
        const savedValue = localStorage.getItem(key);
        if (savedValue !== null) {
            checkbox.checked = JSON.parse(savedValue);
        }
    });

    document.getElementById('bucket-save-btn').addEventListener('click', () => {
        checkboxes.forEach(checkbox => {
            const key = checkbox.id;
            localStorage.setItem(key, JSON.stringify(checkbox.checked));
        });
        alert('Your progress has been saved!');
    });

});

document.addEventListener('DOMContentLoaded', () => {
    const quizSlides = document.querySelectorAll('#quiz-carousel .carousel-slide');
    const quizPrevBtn = document.getElementById('quiz-prev-btn');
    const quizNextBtn = document.getElementById('quiz-next-btn');
    let currentQuizSlide = 0;

    function showQuizSlide(newIndex) {
        const current = quizSlides[currentQuizSlide];
        const next = quizSlides[newIndex];

        current.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, fill: 'forwards' });
        next.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 300, fill: 'forwards' });

        current.classList.remove('active');
        next.classList.add('active');
        currentQuizSlide = newIndex;

        quizPrevBtn.disabled = (newIndex === 0);
        quizNextBtn.disabled = (newIndex === quizSlides.length - 1);
    }

    quizPrevBtn.addEventListener('click', () => {
        if (currentQuizSlide > 0) {
            showQuizSlide(currentQuizSlide - 1);
        }
    });
    quizNextBtn.addEventListener('click', () => {
        if (currentQuizSlide < quizSlides.length - 1) {
            showQuizSlide(currentQuizSlide + 1);
        }
    });

    // Quiz option checking remains the same
    const quizOptionButtons = document.querySelectorAll('#quiz-carousel .quiz-options button');
    quizOptionButtons.forEach(button => {
        button.addEventListener('click', (e) => {

            const slide = e.target.closest('.carousel-slide');
            const correctAnswer = slide.dataset.answer;
            const options = slide.querySelectorAll('.quiz-options button');
            let selectedOption = "";
            options.forEach((btn, idx) => {
                if (btn === e.target) {
                    selectedOption = "option" + (idx + 1);
                }
            });
            alert(selectedOption === correctAnswer ? "Yay you know me!" : "What the hell HITI!");
        });
    });
});




document.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('love-yes-btn');
    let yesClicks = 0;
    const clickThreshold = 5;    // Number of clicks required
    const timeLimit = 10000;       // 10-second window for repeated clicks
    let clickTimer;

    yesBtn.addEventListener('click', () => {

        yesClicks++;
        // Start the timer on the first click
        if (yesClicks === 1) {
            clickTimer = setTimeout(() => {
                yesClicks = 0;
            }, timeLimit);
        }
        // When threshold is reached, trigger confetti and play audio
        if (yesClicks >= clickThreshold) {
            confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 },
                shapes: ['heart'],
                colors: ['#ff69b4', '#ff1493', '#ff85c1']
            });

            const loveAudio = document.getElementById('love-audio');
            loveAudio.currentTime = 0;
            loveAudio.play();
            clearTimeout(clickTimer);
            yesClicks = 0;
        }
    });
});




