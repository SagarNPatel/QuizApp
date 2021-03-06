$(document).ready(function () {
    $(".reset").click(function() {
    location.reload(true);
});
    $(".start").click(gk);

    function gk() {
        var scoreAry = [];
        var questions = [{
            q: "Grand Central Terminal, Park Avenue, New York is the world's?",
            s: ["largest railway station", "highest railway station", "longest railway station", "None of the above"],
            a: "largest railway station",
            correct: 0
        }, {
            q: "Entomology is the science that studies?",
            s: ["Behavior of human beings", "Insects", "The origin and history of technical and scientific terms", "The formation of rocks"],
            a: "Insects",
            correct: 0
        }, {
            q: "For which of the following disciplines is Nobel Prize awarded?",
            s: ["Physics and Chemistry", "Physiology or Medicine", "Literature, Peace and Economics", "All of the above"],
            a: "All of the above",
            correct: 0
        }, {
            q: "What was the name of the tallest Warner brother in Animaniacs?",
            s: ["Dot", "Yakko", "Wacko", "Pinky"],
            a: "Yakko",
            correct: 0
        }, {
            q: "After how many years would you celebrate your crystal anniversary?",
            s: ["5", "10", "15", "20"],
            a: "15",
            correct: 0
        }, {
            q: "Which sign of the zodiac would you be if your birthday was on October 18?",
            s: ["Virgo", "Cancer", "Libra", "Pices"],
            a: "Libra",
            correct: 0
        }, {
            q: "Which birthstone is associated with the month of May?",
            s: ["Diamond", "Peridot", "Sapphire", "Emerald"],
            a: "Emerald",
            correct: 0
        }, {
            q: "What is the capital city of Afghanistan?",
            s: ["Istanbul", "Constantinople", "Kabul", "Ghazni"],
            a: "Kabul",
            correct: 0
        }, {
            q: "In which country is Mount Everest?",
            s: ["The Himalayas", "Nepal", "Tibet", "India"],
            a: "Nepal",
            correct: 0
        }, {
            q: "Epsom (England) is the place associated with?",
            s: ["Horse racing", "Polo", "Shooting", "Snooker"],
            a: "Horse racing",
            correct: 0
        }];

        var counter = questions.length;

        //This grabs the question and answer data from the questions array and appends it to the #questions div:
        function createQuestion(questions) {
            for (var i = 0; i < questions.length; i++) {
                $(".start").hide();
                $("#questions").append('<form id="' + i + '" class="center-text"><p>Question ' + (i + 1) + ' of ' + questions.length + '</p><h3 class="question">' + questions[i].q + '</h3>' + radioButtons(questions[i].s, i) + '<button type="submit" class="next">NEXT &#8594;</button></p></form>');
            }
            //This hides all except the first question:
            for (var k = questions.length - 1; k > 0; k--) {
                $('#' + k).hide();
            }
        }
        //This grabs the answer choices from the questions array and returns them to createQuestion():
        function radioButtons(ary, qNum) {
            var answers = [];
            for (i = 0; i < ary.length; i++) {
                answers.push('<label><input type="radio" name="' + qNum + '" value="' + ary[i] + '">' + ary[i] + '</label>');
            }
            return answers.join(" ");
        }
        
        //This sums the correct values in the questions array:
        function sumScore(questions) {
            return scoreAry.reduce(function (previousValue, currentValue, index, array) {
                return previousValue + currentValue;
            });
        }
        
        //This checks the user's answer and updates the score:
        function checkAnswer(answer, qNum, questions) {
            if (answer == questions[qNum].a) {
                questions[qNum].correct = 1;
                scoreAry.push(questions[qNum].correct);
            } else {
                scoreAry.push(questions[qNum].correct);
            }
        }
        
        createQuestion(questions);
        
        $(".next").click(function (event) {
            event.preventDefault(); //This stops the form from submitting
            var qNum = $(this).closest("form").attr("id"); //This gives us the question number
            var userInput = $('input[name=' + qNum + ']:radio:checked').val(); //This grabs the user's selected answer
            if (counter > 1) {
                checkAnswer(userInput, qNum, questions);
                $("#" + qNum).hide();
                $("#" + qNum).next().show();
                counter--;
            } else if (counter == 1) {
                checkAnswer(userInput, qNum, questions);
                $("#questions").find("form").remove();
                $("#questions").append('<h3 class="result"></h3>');
                $(".result").text('You answered ' + sumScore(questions) + ' questions correctly out of 10.');
                   for (j = 0; j < scoreAry.length; j++) {
                        if (scoreAry[j] === 0) {
                            console.log(questions[j].q, questions[j].a);
                            $("#questions").append('<p class="missed-' + j + '">You missed: ' + questions[j].q + ' ' + questions[j].a + '</p>');      
                        }
                    }
            } else {
                return false;
            }
        });
    }
});
