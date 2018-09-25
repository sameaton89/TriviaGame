$('#start-button').on('click', function() {
    $(this).remove();
    game.loadQuestion();
});

$(document).on('click', '.answer-button', function(e) {
    game.clicked(e);
});

$(document).on('click', '#reset', function() {
    game.reset();
});

var questions = [{
    question: "Who is commonly credited as the founder of hip-hop?",
    answers: ["Afrika Bambaataa", "Grand Wizzard Theodore", "DJ Kool Herc", "Grandmaster Flash"],
    image: "assets/images/koolherc.jpg",
    correctAnswer: "DJ Kool Herc"
}, {
    question: "Who was the first rap group signed to a major label?",
    answers: ["Fearless Four", "Grandmaster Flash & The Furious Five", "The Sugarhill Gang", "Treacherous Three"],
    image: "assets/images/fearlessfour.jpg",
    correctAnswer: "Fearless Four"
}, {
    question: "2Pac made his recorded debut with which group?",
    answers: ["Bone Thugs-N-Harmony", "Black Moon", "Digital Underground","RBL Posse"],
    image: "assets/images/digital.jpg",
    correctAnswer: "Digital Underground"
}, {
    question: "Which New York rapper's father created the logo for Bad Boy Records?",
    answers: ["Joey Bada$$", "A$AP Ferg", "Tekashi 6ix9ine", "A Boogie Wit Da Hoodie"],
    image: "assets/images/ferg.jpeg",
    correctAnswer: "A$AP Ferg"
}, {
    question: "In which city was No Limit Records founded?",
    answers: ["Baton Rouge, LA", "New Orleans, LA", "Port Arthur, TX", "Richmond, CA"],
    image: "assets/images/richmond.jpg",
    correctAnswer: "Richmond, CA"
}, {
    question: "What was the first record to feature the Def Jam logo?",
    answers: ["I Need A Beat by LL Cool J", "It's Yours by T La Rock and Jazzy J", "Def Jam by Jazzy Jay", "Rock Hard by Beastie Boys"],
    image: "assets/images/itsyours.jpg",
    correctAnswer: "It's Yours by T La Rock and Jazzy J"
}, {
    question: "Pitbull was originally signed to which label?",
    answers: ["Slip-N-Slide Records", "TVT Records", "Priority Records", "Luke Records"],
    image: "assets/images/luke.jpg",
    correctAnswer: "Luke Records"
} , {
    question: "Who is responsible for the signature look of '90s Cash Money and No Limit releases?",
    answers: ["Pen & Pixel", "Zombart", "Glen E. Friedman", "Eric Haze"],
    image: "assets/images/penpixel.jpg",
    correctAnswer: "Pen & Pixel"
}, {
    question: 'Which future director appeared as a dancer on the 1984 program "Graffiti Rock?"',
    answers: ["Abel Ferrara", "Mario Van Peebles", "Hype Williams", "Vincent Gallo"],
    image: "assets/images/princevince.jpg",
    correctAnswer: "Vincent Gallo"
}, {
    question: 'Which of these artists DID NOT appear on the cover of "Midnight Marauders" by A Tribe Called Quest?',
    answers: ["Puff Daddy", "Busta Rhymes", "Ice Cube", "Ice T"],
    image: "assets/images/icecube.jpg",
    correctAnswer: "Ice Cube"
}];

var game = {
    questions: questions,
    currentQuestion: 0,
    counter: 30,
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    countdown: function() {
        game.counter--;
        $('#timer').html(game.counter);
        if (game.counter<=0) {
            console.log('Time up');
            game.timeUp();
        }
    },
    loadQuestion: function() {
        timer = setInterval(game.countdown, 1000);
        $('#content-delivery').html('<h2>'+questions[game.currentQuestion].question+'</h2>');
        for (var i = 0; i < questions[game.currentQuestion].answers.length; i++) {
            $('#content-delivery').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
        }

    },
    nextQuestion: function() {
        game.counter = 30;
        $('#timer').html(game.counter);
        game.currentQuestion++;
        game.loadQuestion();
    },
    timeUp: function() {
        clearInterval(timer);
        game.unanswered++;
        $('#content-delivery').html("<h2>Time's up!</h2>");
        $('#content-delivery').append('<h3>The correct answer is '+questions[game.currentQuestion].correctAnswer+'.</h3> <img src="'+questions[this.currentQuestion].image+'" class="resize">');
        if (game.currentQuestion==questions.length-1) {
            setTimeout(game.results, 3000);
        } else {
            setTimeout(game.nextQuestion, 3000);
        }    
    },
    results: function() {
        clearInterval(timer);
        $('#content-delivery').html('<h2>Quiz complete.<h2>');
        $('#content-delivery').append('<h3>Correct: '+game.correct+'</h3>');
        $('#content-delivery').append('<h3>Incorrect: '+game.incorrect+'</h3>');
        $('#content-delivery').append('<h3>Unanswered: '+game.unanswered+'</h3>')
        $('#content-delivery').append('<button id="reset">Restart</button>')

    },
    clicked: function(e) {
        clearInterval(timer);
        if ($(e.target).data('name')==questions[game.currentQuestion].correctAnswer) {
            game.answeredCorrectly();
        } else {
            game.answeredIncorrectly();
        }

    },
    answeredCorrectly: function() {
        console.log('Correct!');
        clearInterval(timer);
        game.correct++;
        $('#content-delivery').html('<h2>Correct!</h2>');
        $('#content-delivery').append('<img src="'+questions[this.currentQuestion].image+'" class="resize">');
        if (game.currentQuestion==questions.length-1) {
            setTimeout(game.results, 3000);
        } else {
            setTimeout(game.nextQuestion, 3000);
        }
    },
    answeredIncorrectly: function() {
        console.log('Wrong!');
        clearInterval(timer);
        game.incorrect++;
        $('#content-delivery').html('<h2>Wrong!</h2>');
        $('#content-delivery').append('<h3>The correct answer is '+questions[game.currentQuestion].correctAnswer+'.</h3> <img src="'+questions[this.currentQuestion].image+'" class="resize">');
        if (game.currentQuestion==questions.length-1) {
            setTimeout(game.results, 3000);
        } else {
            setTimeout(game.nextQuestion, 3000);
        }
    },
    reset: function() {
        game.currentQuestion = 0;
        game.counter = 30;
        game.correct = 0;
        game.incorrect = 0;
        game.unanswered = 0;
        game.loadQuestion();
    }
}