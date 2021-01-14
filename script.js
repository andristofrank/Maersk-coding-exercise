// array declaration and initialization
var numberArray = [];

// on render
$(document).ready(() => 
{   // objects pushed into the array as value-color pair
    numberArray.push(
    {value: 1, color: "--blue-gray"},
    {value: 2, color: "--blue"},
    {value: 3, color: "--dark-blue"},
    {value: 4, color: "--blue"},
    {value: 5, color: "--dark-blue"},
    {value: 6, color: "--gray"},
    {value: 7, color: "--gray"},
    {value: 8, color: "--blue-gray"},
    {value: 9, color: "--dark-blue"});
    
    // render view with number containers based on array parameter
    renderNumberContainers(numberArray);
    
})
/**
 * when window is resized, the callback function is resetting the container view by emptying
 * the DOM element and reappending the values
 **/
$( window ).resize(() => {
    resetContainerView();
    renderNumberContainers(numberArray);
})

// clicking 'Shuffle' triggers the shuffle function and the view updates with the shuffled elements
$('#suffle-btn').on('click', () => {
        shuffleArray(numberArray);
        resetContainerView();
        renderNumberContainers(numberArray);
    });

// clicking 'Sort' triggers the sorting function and the view updates with the sorted elements
$('#sort-btn').on('click', () => {
        sortArray(numberArray);
        resetContainerView();
        renderNumberContainers(numberArray);
    });




// The following are the helping functions which are responsible with the logic of the app

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
        }
}

function sortArray(array) {
    array.sort((a, b) => {
        // comparing value property
        return a.value - b.value;
    });
}

function renderNumberContainers(array) {
    array.forEach((element, i) => {
        // there are 3 rows in the container view, each with a specific id: 'maersk-container-0', 'maersk-container-1', 'maersk-container-2'
        var rowId = 'maersk-container-';
        
        // maximum 3 elements on the row, compare index of the current element and compose the id of the row container  
        if (i < 3) { rowId = rowId + '0'}
        else if( i > 2 && i < 6) { rowId = rowId + '1'}
        else {rowId = rowId + '2'}
        // on medium-large screens, the color of the current element is used for the background of its box container while on smaller ones, that becomes the border color  
        var containerColorTarget = 'background-color:';
        if (window.innerWidth <= 600) {
            containerColorTarget = 'border-left: 8px solid'
        }
        // call the jQuery function append of the row container view to add a child element (box-container) with the targeted style(depending on screen size) and element value
        $(`#${rowId}`).append(`<div class="box-container" style="${containerColorTarget} var(${element.color})">
        <div class="box-container-content"> ${element.value} </div>
        </div>`);
    });
}

// for each row, the following function removes the children using the 'maersk-container' id
function resetContainerView() {
    [0,1,2].map( row => {
        $(`#maersk-container-${row}`).empty();
    })
}
