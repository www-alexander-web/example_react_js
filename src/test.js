/* eslint-disable */


function asyncOne (resolve) {
    console.log('asyncOne');
    setTimeout(function () {
        resolve('Result 1');
    }, 10);
}

function asyncTwo (resolve) {
    console.log('asyncTwo');
    setTimeout(function () {
        resolve('Result 2');
    }, 5);
}

parallel([asyncOne, asyncTwo], function(results) {
    console.log('parallel call');
    console.log(results) // ['Result 1', 'Result 2']
});

// Write the implementation of this function, please
function parallel (asyncFunctions, readyCallback) {
    console.log('parallel');
    console.log('parallel, asyncFunctions, readyCallbac', asyncFunctions, readyCallback);
}