/** Set the variables */
let currentCategory;
let currentQuestionsIndex;
let correct;
let incorrect;
let allCategories = ['movies', 'music', 'sports'];
let seenCategories = [];
let currentDifficultyLevel = 'easy';

/** Set a function so the game starts with the chosen category */
function startGame(category) {
    if (!seenCategories.includes(category)) {
        seenCategories.push(category);
    }

    /** Set the current category, question index, 
     * the counter for the correct and incorrect answers 
     */
    currentCategory = allQuestions[currentDifficultyLevel][category];
    currentQuestionsIndex = 0;
    correct = 0;
    incorrect = 0;

    /** Display the first question */
    displayQuestion();
}

/** Set the question to be displayed 
 * and the user interface(UI) elements
 */
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const correctElement = document.getElementById('correct');
    const incorrectElement = document.getElementById('incorrect');

    /** Check if the questions from the current category were displayed */
    if (currentQuestionsIndex >= currentCategory.questions.length) {

        /** Check if there are categories not seen yet */
       const unseenCategories = allCategories.filter(category => !seenCategories.includes(category)); 
       console.log('current',currentCategory);
       console.log('unseen',unseenCategories);
       console.log('seen',seenCategories);
       console.log('difficultyLevel', currentDifficultyLevel);
        if (unseenCategories.length === 0) {

            /** Update the difficulty level */
            if (currentDifficultyLevel === 'easy') {
                currentDifficultyLevel = 'intermediate';
                seenCategories = [allCategories[0]];
                currentCategory = allQuestions[currentDifficultyLevel][allCategories[0]];
            } else if (currentDifficultyLevel === 'intermediate') {
                currentDifficultyLevel = 'pro';
                seenCategories = [allCategories[0]];
                currentCategory = allQuestions[currentDifficultyLevel][allCategories[0]];
            } else {
                /** If game completed, game over */ 
                questionElement.textContent = 'Game Over';
                answerElement.value = '';
                submitButton.removeEventListener('click', checkAnswer);
                correctElement.textContent = correct;
                incorrectElement.textContent = incorrect;
                hideElements();
                return;
            }

            /** Update the difficulty level */
            const levelElement = document.getElementById('level-display');
            levelElement.textContent = currentDifficultyLevel;
         } else {
            const nextCategoryIndex = Math.floor(Math.random() * unseenCategories.length);
            const nextCategory = unseenCategories[nextCategoryIndex];
            seenCategories.push(nextCategory);
            currentCategory = allQuestions[currentDifficultyLevel][nextCategory];
        }

        /** Reset the questions index for the next category */
        currentQuestionsIndex = 0;
    }
    

    /** Update the category name and display the current question */
    const catElement = document.getElementById('category-name');
    catElement.textContent = currentCategory.name;

    const question = currentCategory.questions[currentQuestionsIndex].question;
    questionElement.textContent = question;
    answerElement.value = '';
    submitButton.addEventListener('click', checkAnswer);
    correctElement.textContent = correct;
    incorrectElement.textContent = incorrect;
}
/** set hide input elements when game over */
function hideElements() {
    document.getElementById("submit").remove();
    document.getElementById("answer").remove();
}

/** User name answer checked and score updated */
function checkAnswer() {
    const answerElement = document.getElementById('answer');
    const answer = answerElement.value.trim().toLowerCase();
    const correctAnswer = currentCategory.questions[currentQuestionsIndex].answer.toLowerCase();
    const questionElement = document.getElementById('question');
    const submitButton = document.getElementById('submit');
    const incorrectElement = document.getElementById('incorrect');

    /** It doesnt allow to submit an empty answer */
    if (answer === '') {
        return;
    }

    if (answer === correctAnswer) {
        correct++;
    } else {
        incorrect++;
    }

    /** If the player answers incorrect 5 times, the game is over */
    if (incorrect >= 5) {
        questionElement.textContent = 'Game Over';
        answerElement.value = '';
        submitButton.removeEventListener('click', checkAnswer);
        incorrectElement.textContent = incorrect;
        hideElements();
        return;
    }

    /** If the player answers correct 27 times, 
     * 'CONGRATULATIONS! YOU WON!' appears 
     */
    if (correct >= 28) {
        questionElement.textContent = 'CONGRATULATIONS! YOU WON!';
        answerElement.value = '';
        submitButton.removeEventListener('click', checkAnswer);
        incorrectElement.textContent = incorrect;
        hideElements();
        return;
    }

    /** Move to the next question */
    currentQuestionsIndex++;
    displayQuestion();
}

/** Start with the category 'Movies' by default when DOM loaded */
addEventListener("DOMContentLoaded", (event) => {
    startGame("movies");
  });