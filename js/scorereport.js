//test data

//potentially restructure code so that we have an internal api name to display name conversion for the google nearby place types like 'park'

var user = firebase.auth().currentUser
console.log(user)



class AlgorithmObject {
    constructor(address, parameterInfoArray, score) {
        this.address = address
        this.parameterInfo = parameterInfoArray
        this.score = score
    }
}

class ParameterInfo {
    constructor(type, importance, number, score) {
        this.type = type
        this.importance = importance
        this.number = number
        this.score = score
    }
}

let obj1 = new ParameterInfo('park', 'very important', 15, 90)
let obj2 = new ParameterInfo('bus_stop', 'important', 15, 85)
let parameterInfoArray = [obj1,obj2]
let algorithmObject = new AlgorithmObject('123 main st', parameterInfoArray, 98)

//end test data

let scoreAddress = algorithmObject['address']
let score = algorithmObject['score']
let parameterInfo = algorithmObject['parameterInfo']

function determineImportanceClass(parameterImportance) {
    if (parameterImportance == 'very important') {
        return 'very-important'
    } else if (parameterImportance == 'important') {
        return 'important'
    } else if (parameterImportance == 'somewhat important') {
        return 'somewhat-important'
    }
}

//score
let addressHeader = document.getElementById('address-header')
addressHeader.innerHTML = `${scoreAddress}`
let scoreHeader = document.getElementById('score-header')
scoreHeader.innerHTML = `${score}`


//parameter scores
let detailScoreContainer = document.getElementById('detail-score-container')

let detailScoreArray =[]
parameterInfo.forEach(function(parameterObj) { //change the type name
    let parameterType = parameterObj['type']
    let parameterImportance = parameterObj['importance']
    let parameterNumber = parameterObj['number']
    let parameterScore = parameterObj['score']

    let importanceClass = determineImportanceClass(parameterImportance)
    let formattedType = parameterType.replace('_',' ')
    let detailScoreContainerHeight = detailScoreContainer.clientHeight
    let divDimension = (detailScoreContainerHeight/3)

    let div = `<div class="parameter-container ${importanceClass}" style="height:${divDimension}; width:${divDimension}" onclick="generateParameterDetailDiv('${parameterType}','${parameterImportance}','${parameterNumber}','${parameterScore}')">
                    <h3 class="toTitleCase">${formattedType}</h3>
                    <h2>${parameterScore}</h2>
                </div>`

    detailScoreArray.push(div)
})
detailScoreContainer.innerHTML = detailScoreArray.join('')


//parameter score details
function generateParameterDetailDiv(parameterType, parameterImportance, parameterNumber, parameterScore) {
    let formattedType = parameterType.replace('_',' ')
    let detailParameterModal = document.getElementById('detail-parameter-modal')
    let detailParameterContainer = document.getElementById('detail-parameter-container')
    let detailParameterImportanceBar = document.getElementById('detail-parameter-importance-bar')
    
    detailParameterImportanceBar.className = determineImportanceClass(parameterImportance)
    let content =  `<h2 class="toTitleCase">${formattedType}</h2>
                <h1>${parameterScore}</h1>
                <h3>${parameterImportance}</h3>
                <h3>${parameterNumber}</h3>`

    detailParameterContainer.innerHTML = content
    detailParameterModal.style.display = 'block'
}

//add onclick close modal

//style things

//maybe have visual indicator of importance of each parameter
//maybe have credit score circle with red to green scale
//would have to add classes to divs accordingly and popualte image accordingly