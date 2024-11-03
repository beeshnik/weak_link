

export default class Question {
    constructor() {
        this.value = Math.floor(Math.random() * (2^7 - 2 + 1) + 2);
        this.text = "Some question text...";
        this.trueAnswer = "1"
    }
}