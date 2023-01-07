class BoggleGame {

  constructor(boardId, secs = 60) {
    this.secs = secs;
    this.showTimer();

    this.score = 0;
    this.words = new Set();
    this.board = $("#" + boardId);

    this.timer = setInterval(this.tick.bind(this), 1000);

    $(".add-word", this.board).on("submit", this.handleSubmit.bind(this));
  }

  showScore() {
    $('.score', this.board).text(this.score);
  }

  showWord(word) {
    $('.words', this.board).append($("<li>").text(word));
  }

  showMessage(msg) {
    $('.msg', this.board).text(msg)
  }

  async handleSubmit(evt){
    evt.preventDefault();
    const $word = $(".word", this.board);
    console.log(this)
    let word = $word.val().toLowerCase();
    if (!word) return;
    
    if (this.words.has(word)) {
      this.showMessage(`Already found ${word}`);
      return;
    }

    const res = await axios.get("/check-word", {params: {word: word}});
    if (res.data.result === 'not-word') {
      this.showMessage(`${word} is not a valid English word`);
    } else if (res.data.result === "not-on-board") {
      this.showMessage(`${word} is not a valid word on this board`);
    } else {
      this.showWord(word);
      this.score += word.length;
      this.showScore();
      this.words.add(word);
      this.showMessage(`Added: ${word}`)
      
    }
    $word.val("").focus();
  }

  showTimer() {
    $('.timer', this.board).text(this.secs);
  }

  async tick() {
    this.secs -= 1;
    this.showTimer();

    if (this.secs === 0) {
      clearInterval(this.timer);
      await this.scoreGame();
    }
  }

  async scoreGame() {
    $(".add-word", this.board).hide();
    const res = await axios.post('/post-score', {score: this.score});
    if (res.data.brokeRecord) {
      this.showMessage(`New Record: ${this.score}`);
    } else {
      this.showMessage(`Final Score: ${this.score}`);
    }
    
  }
}

