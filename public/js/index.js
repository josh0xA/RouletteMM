/*
Author: Josh Schiavone

Purpose: Boredeom but I like statistics

Note: This code is garbage. I hate javascript so don't mind the global variables and the tedious code.
*/

var chart; 
let probs = []
let graph_probs = []
let iteration_trials = [] 
let theoretical_line = []
let inputted_probability = 0
let success_counter = 0
let other_counter = 0
// Roulette Bet Probabilities dictionary
var roulette_bets = {
    "Single": 2.63,
    "Split": 5.26,
    "Street": 7.89,
    "Corner": 10.53,
    "Six_Line": 15.79,
    "Combo_FirstFive": 13.16,
    "Dozen": 31.58,
    "Colour_Even_Odd_Low_High": 47.37,
}

// Roullete bet payout dictionary
var roulette_payouts = {
    "Single": 35,
    "Split": 17,
    "Street": 11,
    "Corner": 8,
    "Six_Line": 5,
    "Combo_FirstFive": 7,
    "Dozen": 2,
    "Colour_Even_Odd_Low_High": 1,
}

function rn_engine(inputted_prob) { 
    return Math.random() < (inputted_prob / 100) ? 0 : 1;
}

function assess_probability(prob) {
    if (rn_engine(prob) == 0) {
        success_counter += 1;
    } else {
        other_counter += 1;
    }
    var simulated_prob = (success_counter / (success_counter + other_counter) * 100);
    // We only want to push the simulated probability if it is not equal to the theoretical probability because its bound to happen in early iterations
    if (simulated_prob != inputted_probability) {
        probs.push(simulated_prob)
    }
    graph_probs.push(simulated_prob)
}

// calculate expected value of the bet
function calculate_expected_value(payout_odds) {
    let bet_amount = parseInt(document.getElementById("bet_amount").value)
    let expected_value = (inputted_probability / 100) * payout_odds - ((100 - inputted_probability) / 100) * bet_amount
    return expected_value
}

function determine_payout() {
    let bet_amount = parseInt(document.getElementById("bet_amount").value);
    let payout = 0; // Initialize the payout variable

    if (document.getElementById("bet_option_colour").checked) {
        payout = (success_counter * bet_amount * 2) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_dozen").checked) {
        payout = (success_counter * bet_amount * 3) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_combination").checked) {
        payout = (success_counter * bet_amount * 7) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_sixline").checked) {
        payout = (success_counter * bet_amount * 5) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_corner").checked) {
        payout = (success_counter * bet_amount * 8) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_street").checked) {
        payout = (success_counter * bet_amount * 11) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_split").checked) {
        payout = (success_counter * bet_amount * 17) - (other_counter * bet_amount);
    } else if (document.getElementById("bet_option_single").checked) {
        payout = (success_counter * bet_amount * 35) - (other_counter * bet_amount);
    }

    return payout;
}

function simulate_lln() {
    if (chart) {
        probs = []
        graph_probs = []
        iteration_trials = []
        theoretical_line = []
        chart.destroy()
    }

    let trials = parseInt(document.getElementById("trials").value)
    let bet_amount = parseInt(document.getElementById("bet_amount").value)
    let bet_type = ""

    if (trials > 100000) {
        alert("The Maximum Number of Trials allowed is 100,000")
        return
    }
    if (bet_amount == "") {
        alert("Please enter a bet amount")
        return
    }
    if (document.querySelectorAll('input[type="checkbox"]:checked').length > 1) {
        alert("Please select only one bet option")
        document.getElementById("bet_option_colour").checked = false
        document.getElementById("bet_option_dozen").checked = false
        document.getElementById("bet_option_combination").checked = false
        document.getElementById("bet_option_sixline").checked = false
        document.getElementById("bet_option_corner").checked = false
        document.getElementById("bet_option_street").checked = false
        document.getElementById("bet_option_split").checked = false
        document.getElementById("bet_option_single").checked = false
        return
    }
    
    let iter = 1;
    // Note that we're pushing the sample mean (x-bar), not the actual random variable
    // Thus the graph shows the sample mean as it tends towards the theoretical probability 
    while (iter <= trials) {
        iteration_trials.push(iter)
        if (document.getElementById("bet_option_colour").checked) {
            assess_probability(inputted_probability = roulette_bets["Colour_Even_Odd_Low_High"])
            bet_type = "Colour_Even_Odd_Low_High"
        } else if (document.getElementById("bet_option_dozen").checked) {
            assess_probability(inputted_probability = roulette_bets["Dozen"])
            bet_type = "Dozen"
        } else if (document.getElementById("bet_option_combination").checked) {
            assess_probability(inputted_probability = roulette_bets["Combo_FirstFive"])
            bet_type = "Combo_FirstFive"
        } else if (document.getElementById("bet_option_sixline").checked) {
            assess_probability(inputted_probability = roulette_bets["Six_Line"])
            bet_type = "Six_Line"
        } else if (document.getElementById("bet_option_corner").checked) {
            assess_probability(inputted_probability = roulette_bets["Corner"])
            bet_type = "Corner"
        } else if (document.getElementById("bet_option_street").checked) {
            assess_probability(inputted_probability = roulette_bets["Street"])
            bet_type = "Street"
        } else if (document.getElementById("bet_option_split").checked) {
            assess_probability(inputted_probability = roulette_bets["Split"])
            bet_type = "Split"
        } else if (document.getElementById("bet_option_single").checked) {
            assess_probability(inputted_probability = roulette_bets["Single"])
            bet_type = "Single"
        } else {
            alert("Please select a bet option")
            return
        }
        iter++;
    }
    let expected_value = calculate_expected_value(roulette_payouts[bet_type])
    let payout = determine_payout()
    fill_theoretical_line()
    draw_graph()
    clearFields()

    var table = document.getElementById("stats1");
    var row = table.insertRow(1);
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3)

    var ev_table = document.getElementById("ev");
    var ev_row = ev_table.insertRow(1);
    var ev_cell1 = ev_row.insertCell(0);
    var ev_cell2 = ev_row.insertCell(1);
    var ev_cell3 = ev_row.insertCell(2);


    cell1.innerHTML = trials;
    cell2.innerHTML = getClosest(probs, inputted_probability) + "%";
    cell3.innerHTML = success_counter + "/" + trials
    cell4.innerHTML = "$" + payout + " of " + "$" + (trials * bet_amount)

    ev_cell1.innerHTML = expected_value.toFixed(2);
    // expected value per hour
    ev_cell2.innerHTML = (expected_value * (3600 / 60)).toFixed(2);
    // expected value per day
    ev_cell3.innerHTML = (expected_value * (3600 / 60) * 24).toFixed(2);

    summary.innerHTML = "Simulation Summary: " + success_counter + "/" + trials + " successes/trials. X\u0304 =  " + 
        (success_counter / (success_counter + other_counter) * 100).toFixed(7) + "%" + " with a " + 
        inputted_probability + "% natural likelihood of success. "
    success_counter = 0
    other_counter = 0
}

// Function that gets closest value in probs array to theoretical probability 
function getClosest(arr, closestTo) {
    var closest = Math.max.apply(null, arr); // Get the highest number in arr in case it match nothing.
    for (var i = 0; i < arr.length; i++) { // Loop the array
        if (arr[i] >= closestTo && arr[i] < closest) closest = arr[i]; // Check if it's higher than your number, but lower than your closest value
    }
    return closest.toFixed(5); // return the value
}

function fill_theoretical_line() {
    var theoretical_prob = inputted_probability;

    for (var i = 0; i < iteration_trials.length; i++) {
        theoretical_line.push(theoretical_prob);
    }
}

function draw_graph() {
    var theoretical_prob = inputted_probability;
    chart = new Chart(document.getElementById("myChart"), {
    type: 'line',
    data: {
        labels: iteration_trials,
        datasets: [{ 
            data: graph_probs,
            label: "Simulated Probability",
            // set border color to hot pink
            borderColor: "rgb(255, 105, 180)",
            fill: false,
            pointRadius: 1
        }, {
            data: theoretical_line,
            label: "Theoretical Probability " + theoretical_prob + "%",
            borderColor: "rgb(0, 191, 255)",
            fill: true,
            pointRadius: 1
        }]
    },
    options: {
        title: {
        display: true,
        text: 'Live Graph As Simulated Probabilities Tend Towards Theoretical Probability (x\u0304 \u2192 \u03BC)'
        },
        scales: {
            xAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Trials'
                },
                ticks: {
                    autoSkip: true, 
                    autoSkipPadding: 10, 
                }
            }],
            yAxes: [{
                scaleLabel: {
                    display: true,
                    labelString: 'Percentage'
                },
                ticks: {
                    beginAtZero: true,
                    steps: 10, 
                    stepValue: 5,
                    max: 100
                },
                display: true,
            }]
        },
        // Change size of line 
        elements: {
            line: {
                borderWidth: 1
            }
        },      
    }
    });
}

function clearFields() {
    document.getElementById("trials").value = "";
    document.getElementById("bet_amount").value = "";
}

function clearTable() {
    // Alert user that they are about to clear the table
    var table = document.getElementById("stats1");
    var table2 = document.getElementById("ev");
    var rowCount = table.rows.length;
    // Check if table is empty
    if (rowCount > 2) {
        if (confirm("Are you sure you want to clear the table? This cannot be undone.") == true) {
            for (var i = rowCount - 1; i > 0; i--) {
                table.deleteRow(i);
                table2.deleteRow(i);
            }
        } 
    }      
}