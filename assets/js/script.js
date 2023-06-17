/** Categories variable for the easy level 
 * and set the questions & answers*/
const categoriesEasy = {
    movies: {
        name: 'Movies',
        questions: [{
                question: "What year did Disneyland open?",
                answer: "1955"
            },
            {
                question: "What is the name of Wendy\'s dog in Peter Pan?",
                answer: "Nana"
            },
            {
                question: "What are the names of Cinderella\'s stepsisters?",
                answer: "Anastasia and Drizella"
            },
        ]
    },
    music: {
        name: 'Music',
        questions: [{
                question: "Before Phil Collins, who was the lead singer of Genesis?",
                answer: "Peter Gabriel"
            },
            {
                question: "What rock star moonlights as a horror movie writer and director?",
                answer: "Rob Zombie"
            },
            {
                question: "Eminem's 8 Mile is named after a road in which city?",
                answer: "Detroit"
            },
        ]
    },
    sports: {
        name: 'Sports',
        questions: [{
                question: "What\'s the diameter of a basketball hoop in inches?",
                answer: "18 inches"
            },
            {
                question: "The Olympics are held every how many years?",
                answer: "4 years"
            },
            {
                question: "Who has won more tennis grand slam titles, Venus Williams or Serena Williams?",
                answer: "Serena Williams"
            },
        ]
    },
};

/** Categories variable for the intermediate level 
 * and set the questions & answers*/
const categoriesIntermediate = {
    movies: {
        name: 'Movies',
        questions: [{
                question: "What is Princess Mia\'s full name in The Princess Diaries?",
                answer: "Amelia Mignonette Thermopolis Renaldi"
            },
            {
                question: "Rapunzel\'s chameleon in Tangled is called what?",
                answer: "Pascal"
            },
            {
                question: "What name does Mulan pick for herself while pretending to be a man?",
                answer: "Ping"
            },
        ]
    },
    music: {
        name: 'Music',
        questions: [{
                question: "Who was the first woman ever inducted into the Rock and Roll Hall of Fame?",
                answer: "Aretha Franklin"
            },
            {
                question: "Paul McCartney and John Lennon wrote which Rolling Stones song?",
                answer: "I Wanna Be Your Man"
            },
            {
                question: "What other legendary vocalist is a cousin of Whitney Houston?",
                answer: "Dionne Warwick"
            },
        ]
    },
    sports: {
        name: 'Sports',
        questions: [{
                question: "Which boxer fought against Muhammad Ali and won?",
                answer: "Joe Frazier"
            },
            {
                question: "How many medals did China win at the Beijing Olympics?",
                answer: "100"
            },
            {
                question: "How many holes are played in an average round of golf?",
                answer: "18"
            },
        ]
    },
};

/** Categories variable for the pro level 
 * and set the questions & answers*/
const categoriesPro = {
    movies: {
        name: 'Movies',
        questions: [{
                question: "How many stones were used to make Cinderella\'s Castle in Magic Kingdom?",
                answer: "None"
            },
            {
                question: "Who was the first cartoon character to get a star on the Hollywood Walk of Fame?",
                answer: "Mickey Mouse"
            },
            {
                question: "What are the names of the Three Good Fairies in Sleeping Beauty?",
                answer: "Flora, Fauna and Merryweather"
            },
        ]
    },
    music: {
        name: 'Music',
        questions: [{
                question: "Which classical composer was deaf?",
                answer: "Ludwig van Beethoven"
            },
            {
                question: "Who was the first woman to have four country albums reach No. 1 on the Billboard 200?",
                answer: "Carrie Underwood"
            },
            {
                question: "Which Super Bowl Halftime Show performer was upstaged by a dancing shark?",
                answer: "Katy Perry"
            }
        ]
    },
    sports: {
        name: 'Sports',
        questions: [{
                question: "How many sports were included in the 2008 Summer Olympics?",
                answer: "28"
            },
            {
                question: "What is the only team in the NFL to neither host nor play in the Super Bowl?",
                answer: "Cleveland Browns"
            },
            {
                question: "What team won the first-ever football game played at night?",
                answer: "Philadelphia Athletics"
            },
        ]
    },
};

/** Set the difficulty levels into a single object*/
const allQuestions = {
    easy: categoriesEasy,
    intermediate: categoriesIntermediate,
    pro: categoriesPro,
};

/** Set the variables*/
let currentCategory;
let currentQuestionsIndex;
let correct;
let incorrect;
let allCategories = ['movies', 'music', 'sports'];
let seenCategories = [];
let currentDifficultyLevel = 'easy';

/** Set a function so the game starts with the chosen category*/
function startGame(category) {
    if (!seenCategories.includes(category)) {
        seenCategories.push(category);
    }

    /** Set the current category, question index, 
     * the counter for the correct and incorrect answers*/
    currentCategory = allQuestions[currentDifficultyLevel][category];
    currentQuestionsIndex = 0;
    correct = 0;
    incorrect = 0;

    /** Display the first question*/
    displayQuestion();
}

/** Set the question to be displayed 
 * and the user interface(UI) elements*/
function displayQuestion() {
    const questionElement = document.getElementById('question');
    const answerElement = document.getElementById('answer');
    const submitButton = document.getElementById('submit');
    const correctElement = document.getElementById('correct');
    const incorrectElement = document.getElementById('incorrect');

    /** Check if the questions from the current category were displayed*/
    if (currentQuestionsIndex >= currentCategory.questions.length) {

        /** Check if there are categories not seen yet*/
       const unseenCategories = allCategories.filter(category => !seenCategories.includes(category)); 
       console.log('current',currentCategory);
       console.log('unseen',unseenCategories);
       console.log('seen',seenCategories);
       console.log('difficultyLevel', currentDifficultyLevel);
        if (unseenCategories.length === 0) {

            /** Update the difficulty level*/
            if (currentDifficultyLevel === 'easy') {
                currentDifficultyLevel = 'intermediate';
                seenCategories = [allCategories[0]];
                currentCategory = allQuestions[currentDifficultyLevel][allCategories[0]];
            } else if (currentDifficultyLevel === 'intermediate') {
                currentDifficultyLevel = 'pro';
                seenCategories = [allCategories[0]];
                currentCategory = allQuestions[currentDifficultyLevel][allCategories[0]];
            } else {
                /** If game completed, game over*/ 
                questionElement.textContent = 'Game Over';
                answerElement.value = '';
                submitButton.removeEventListener('click', checkAnswer);
                correctElement.textContent = correct;
                incorrectElement.textContent = incorrect;
                hideElements();
                return;
            }

            /** Update the difficulty level*/
            const levelElement = document.getElementById('level-display');
            levelElement.textContent = currentDifficultyLevel;
         } else {
            const nextCategoryIndex = Math.floor(Math.random() * unseenCategories.length);
            const nextCategory = unseenCategories[nextCategoryIndex];
            seenCategories.push(nextCategory);
            currentCategory = allQuestions[currentDifficultyLevel][nextCategory];
        }

        /** Reset the questions index for the next category*/
        currentQuestionsIndex = 0;
    }
    

    /** Update the category name and display the current question*/
    const catElement = document.getElementById('category-name');
    catElement.textContent = currentCategory.name;

    const question = currentCategory.questions[currentQuestionsIndex].question;
    questionElement.textContent = question;
    answerElement.value = '';
    submitButton.addEventListener('click', checkAnswer);
    correctElement.textContent = correct;
    incorrectElement.textContent = incorrect;
}
/** set hide input elements when game over*/
function hideElements() {
    document.getElementById("submit").remove();
    document.getElementById("answer").remove();
}

/** User name answer checked and score updated*/
function checkAnswer() {
    const answerElement = document.getElementById('answer');
    const answer = answerElement.value.trim().toLowerCase();
    const correctAnswer = currentCategory.questions[currentQuestionsIndex].answer.toLowerCase();
    const questionElement = document.getElementById('question');
    const submitButton = document.getElementById('submit');
    const incorrectElement = document.getElementById('incorrect');

    /** It doesnt allow to submit an empty answer*/
    if (answer === '') {
        return;
    }

    if (answer === correctAnswer) {
        correct++;
    } else {
        incorrect++;
    }

    /** If the player answers incorrect 5 times, the game is over*/
    if (incorrect >= 5) {
        questionElement.textContent = 'Game Over';
        answerElement.value = '';
        submitButton.removeEventListener('click', checkAnswer);
        incorrectElement.textContent = incorrect;
        hideElements();
        return;
    }

    /** If the player answers correct 27 times, 
     * 'CONGRATULATIONS! YOU WON!' appears*/
    if (correct >= 28) {
        questionElement.textContent = 'CONGRATULATIONS! YOU WON!';
        answerElement.value = '';
        submitButton.removeEventListener('click', checkAnswer);
        incorrectElement.textContent = incorrect;
        hideElements();
        return;
    }

    /** Move to the next question*/
    currentQuestionsIndex++;
    displayQuestion();
}

/** Start with the category 'Movies' by default when DOM loaded*/
addEventListener("DOMContentLoaded", (event) => {
    startGame("movies");
  });