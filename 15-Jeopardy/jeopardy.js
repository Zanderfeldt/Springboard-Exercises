const apiURL = 'https://jservice.io/api/';
const numCategories = 6;
const numClues = 5;
let categories = [];

// categories is the main data structure for the app; it looks like this:

//  [
//    { title: "Math",
//      clues: [
//        {question: "2+2", answer: 4, showing: null},
//        {question: "1+1", answer: 2, showing: null}
//        ...
//      ],
//    },
//    { title: "Literature",
//      clues: [
//        {question: "Hamlet Author", answer: "Shakespeare", showing: null},
//        {question: "Bell Jar Author", answer: "Plath", showing: null},
//        ...
//      ],
//    },
//    ...
//  ]




/** Get NUM_CATEGORIES random category from API.
 *
 * Returns array of category ids
 */

async function getCategoryIds() {
  const res = await axios.get(`${apiURL}categories?count=100`);
  const catIDs = res.data.map(cat => cat.id);
  return _.sampleSize(catIDs, numCategories)
}

/** Return object with data about a category:
 *
 *  Returns { title: "Math", clues: clue-array }
 *
 * Where clue-array is:
 *   [
 *      {question: "Hamlet Author", answer: "Shakespeare", showing: null},
 *      {question: "Bell Jar Author", answer: "Plath", showing: null},
 *      ...
 *   ]
 */

async function getCategory(catId) {
  const res = await axios.get(`${apiURL}category?id=${catId}`);
  
  const randomClues = _.sampleSize(res.data.clues, numClues)

  const clueArr = randomClues.map(function(q){
    return {
      question: q.question,
      answer: q.answer,
      showing: null
    }
  });
  return {
    title: res.data.title,
    clues: clueArr
  }
}

/** Fill the HTML table#jeopardy with the categories & cells for questions.
 *
 * - The <thead> should be filled w/a <tr>, and a <td> for each category
 * - The <tbody> should be filled w/NUM_QUESTIONS_PER_CAT <tr>s,
 *   each with a question for each category in a <td>
 *   (initally, just show a "?" where the question/answer would go.)
 */

async function fillTable() {
  $('#jeopardy thead').empty();

  const $tr = $('<tr>');
  for (let i = 0; i < numCategories; i++ ){
    $tr.append($('<th>').text(categories[i].title));
  }
  $('#jeopardy thead').append($tr);

  $('#jeopardy tbody').empty();

  for (let clueIdx = 0; clueIdx < numClues; clueIdx++){
    const $tr = $('<tr>');
    for (let catIdx = 0; catIdx < numCategories; catIdx++){
      $tr.append($('<td>').attr('id', `${catIdx}-${clueIdx}`).text('?'))
    }
    $('#jeopardy tbody').append($tr);
  }
}

/** Handle clicking on a clue: show the question or answer.
 *
 * Uses .showing property on clue to determine what to show:
 * - if currently null, show question & set .showing to "question"
 * - if currently "question", show answer & set .showing to "answer"
 * - if currently "answer", ignore click
 * */

function handleClick(evt) {

  const id = evt.target.id;
  const [catI, clueI] = id.split('-');
  const clue = categories[catI].clues[clueI];

  let text;

  if (!clue.showing) {
    text = clue.question;
    clue.showing = 'question';
    evt.target.setAttribute('class', 'clue');
  } else if (clue.showing === 'question') {
    text = clue.answer;
    clue.showing = 'answer';
    evt.target.setAttribute('class', 'answer');
  } else {
    return
  }

  $(`#${catI}-${clueI}`).html(text);
}

/** Wipe the current Jeopardy board, show the loading spinner,
 * and update the button used to fetch data.
 */

function showLoadingView() {
//?? why
}

/** Remove the loading spinner and update the button used to fetch data. */

function hideLoadingView() {
  $('#spin-container').hide();
  $('#start').text('Restart Game!');
}

/** Start game:
 *
 * - get random category Ids
 * - get data for each category
 * - create HTML table
 * */

async function setupAndStart() {

  const catIds = await getCategoryIds();
  categories = [];

  for (let id of catIds) {
    categories.push(await getCategory(id));
  }

  fillTable();
  hideLoadingView()
}

/** On click of start / restart button, set up game. */

$('button').on('click', setupAndStart);


/** On page load, add event handler for clicking clues */

$( async function() {
  // setupAndStart();
  $('#jeopardy').on('click', 'td', handleClick)
});
