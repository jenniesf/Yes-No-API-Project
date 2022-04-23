// SELECTORS
const ballSelector = document.querySelector('#ball')
const buttonSelector = document.querySelector('#button')
const inputSelector = document.querySelector('#input')

// API -- to fetch data from
const API_ENDPOINT = 'https://yesno.wtf/api';

// FLAGS
let isRequestInProgress = false



/**
 * STEPS:
 *
 * 1. Create a fetchAnswer function and call the API
 * 2. Output the API's response
 * 3. Attach fetchAnswer to an event listener
 * 4. Clear output after 3 seconds
 * 5. Optional: add loading/error states
 *
 */
  
// create function for flag 'is request in progress'
const setIsRequestInProgress = (value) => {
  isRequestInProgress = value;
}

// disable API request to prevent user from pressing 1000s of times while its running
const setDisableButtonState = (value) => {
  if (value) {
  buttonSelector.setAttribute('disabled', 'disabled')
  } else {
    buttonSelector.removeAttribute('disabled')
  } 
}

// EVENT LISTENERS
  // listen for click - run fetchAnswer
buttonSelector.addEventListener('click', () => {
  if ( !inputSelector.value ) return;      // if input value is empty, do not run function
  fetchAnswer()
})

// listen for ENTER key press - run fetchAnswer
inputSelector.addEventListener('keypress', function (e) {
  setIsRequestInProgress(true)
  //if inputselector empty -- enter will not do anything/run
  if ( !inputSelector.value ) return;
  // listen for enter key press, if pressed run fetchAnswer function
  if (e.key === 'Enter') {
    fetchAnswer()
  }
});


// clear out input field and answer on screen -- helps it looks neater for user
const cleanupResponse = () => {
  // set a timed out so functions dont run all at once
  setTimeout (  ()  => {
    document.querySelector('#answer').innerHTML = ''  // make answer response an empty string
    inputSelector.value =''
      // set request back to false
    setIsRequestInProgress(false)
    setDisableButtonState(false)
  } ,3000 )  // 3000 is 3 seconds
}

// create function to put response into answer and to show response on ball.
// answer parameter called from below function
const showAnswer = (answer) => {
  // wrap code in a setTimeout b/c functions running to fast that you cannot clearly see the shake
   setTimeout ( () => {
      // insert response into ball
      document.querySelector('#answer').innerHTML = `<p>${answer}</p>` 
      // turn off shake ball so it can start again
      ballSelector.classList.remove('shake__ball')
      // run cleanupResponse function to clear input and answer for next use
      cleanupResponse()
   }, 1000)   // 1000 is one second
 }

// create function to run fetch in API
const fetchAnswer = () => {
    // set request to true (initially nothing)
  setIsRequestInProgress(true)
    // after running fetch, disable the button so cannot be constantly clicked
  setDisableButtonState(true)
    // run shake ball when press enter or click submit
  ballSelector.classList.add('shake__ball')
    // fetch API URL
  fetch(API_ENDPOINT)
    .then(res => res.json()) // parse response as JSON
    .then(data => 
        showAnswer(data.answer)  // run showAnswer function -> Yes/no response will go into showAnswer function parameter
  )
  .catch(err => {
      console.log(`error ${err}`)
  });
}

