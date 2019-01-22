const options = {
    "scissors": {
        title: "Scissors",
        matches: ["paper", "lizard"],
    },
    "paper": {
        title: "Paper",
        matches: ["rock", "spock"]
    },
    "rock": {
        title: "Rock",
        matches: ["scissors", "lizard"]
    },
    "lizard": {
        title: "Lizard",
        matches: ["paper", "spock"]
    },
    "spock": {
        title: "Spock",
        matches: ["rock", "scissors"]
    },
}

class Helper {
    getOptions() {
        return options;
    }

    generateChoice() {
        const options = Object.keys(this.getOptions())

        // Math.random will always be < 1. So options.length is ok.
        return options[Math.floor(Math.random() * options.length)]
    }

    /**
     * Get Result of Match.
     *
     * @param string player1 selected option of player1
     * @param string player2 selected option of player2
     *
     * @returns number 1, if player1 won, -1 if player2 won, 0 if both had the same option
     */
    getResult(player1, player2) {
        if (player1 === player2) {
            return 0
        }

        if (options[player1].matches.includes(player2)) {
            return 1
        }

        return -1
    }
}

export default new Helper();