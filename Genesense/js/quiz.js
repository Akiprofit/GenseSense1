/* ============================================
   GENESE: Interactive Quiz Logic
   ============================================ */

let currentQuestion = 0;
let score = 0;
let answered = [false, false, false, false, false, false, false, false, false, false];
const correctAnswers = [0, 2, 1, 1, 2, 2, 1, 3, 3, 2];

function startQuiz() {
    document.getElementById('quiz-intro').style.display = 'none';
    document.getElementById('quiz-questions').style.display = 'block';
    document.getElementById('quiz-nav').style.display = 'flex';
    showQuestion(0);
}

function showQuestion(index) {
    // Hide all questions
    const allQuestions = document.querySelectorAll('.quiz-question');
    allQuestions.forEach(q => q.style.display = 'none');

    // Show current question
    allQuestions[index].style.display = 'block';

    // Update button states
    updateNavigation();

    // Scroll to top of quiz
    document.querySelector('.quiz-wrapper').scrollIntoView({ behavior: 'smooth' });
}

function updateNavigation() {
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    // Disable/enable previous button
    if (currentQuestion === 0) {
        prevBtn.disabled = true;
        prevBtn.style.opacity = '0.5';
    } else {
        prevBtn.disabled = false;
        prevBtn.style.opacity = '1';
    }

    // Update next button text on last question
    if (currentQuestion === 9) {
        nextBtn.textContent = 'See Results →';
    } else {
        nextBtn.textContent = 'Next →';
    }
}

function checkAnswer(questionIndex, element) {
    // If already answered, don't allow changing
    if (answered[questionIndex]) {
        return;
    }

    const options = element.parentElement.querySelectorAll('.quiz-option');
    // Mark as answered
    answered[questionIndex] = true;

    // Visual feedback
    if (Array.from(options).indexOf(element) === correctAnswers[questionIndex]) {
        element.classList.add('correct');
        score++;
    } else {
        element.classList.add('incorrect');
        options[correctAnswers[questionIndex]].classList.add('correct');
    }

    // Disable all options
    options.forEach(opt => opt.style.pointerEvents = 'none');

    // Show feedback
    const feedback = document.getElementById(`feedback-${questionIndex}`);
    if (feedback) {
        feedback.classList.add('show');
    }
}

function nextQuestion() {
    if (currentQuestion < 9) {
        currentQuestion++;
        showQuestion(currentQuestion);
    } else {
        // Show results
        showResults();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        showQuestion(currentQuestion);
    }
}

function showResults() {
    document.getElementById('quiz-questions').style.display = 'none';
    document.getElementById('quiz-nav').style.display = 'none';
    document.getElementById('quiz-results').style.display = 'block';

    // Update score display
    document.getElementById('final-score').textContent = `${score}/10`;
    document.getElementById('correct-count').textContent = score;

    // Update message based on score
    let message = '';
    if (score === 10) {
        message = 'Perfect score! You\'ve mastered GMO knowledge.';
    } else if (score >= 8) {
        message = 'Excellent understanding. You know this topic well.';
    } else if (score >= 6) {
        message = 'Good foundation. Review the articles to fill gaps.';
    } else if (score >= 4) {
        message = 'You\'re learning. Dive deeper into the articles.';
    } else {
        message = 'Keep learning. Start with the foundational articles.';
    }

    document.getElementById('score-message').textContent = message;

    // Scroll to results
    document.querySelector('.quiz-wrapper').scrollIntoView({ behavior: 'smooth' });
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    answered = [false, false, false, false, false, false, false, false, false, false];

    // Reset all options and feedback
    document.querySelectorAll('.quiz-option').forEach(opt => {
        opt.classList.remove('correct', 'incorrect', 'selected');
        opt.style.pointerEvents = 'auto';
    });

    document.querySelectorAll('.quiz-feedback').forEach(fb => {
        fb.classList.remove('show');
    });

    // Show intro again
    document.getElementById('quiz-results').style.display = 'none';
    document.getElementById('quiz-intro').style.display = 'block';
    document.getElementById('quiz-nav').style.display = 'none';
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    // Add click handlers to quiz options (they're already inline, but this ensures they work)
    const options = document.querySelectorAll('.quiz-option');
    options.forEach((option, index) => {
        option.addEventListener('click', function() {
            const questionNum = Math.floor(index / 4);
            checkAnswer(questionNum, this);
        });
    });
});
