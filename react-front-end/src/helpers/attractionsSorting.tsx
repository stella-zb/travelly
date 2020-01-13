//helper functions
//to shuffle all attractions in a random way  
export const shuffleAttractions = (array: Array<any>) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i - 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

//create an object to apply filters


export const getAttractions = (attractionObject: any = {}, attractionsShuffle:Array<{category: string}>) => {

  for (let i = 0; i < attractionsShuffle.length; i++) {
    if (attractionObject[attractionsShuffle[i].category]) {
      attractionObject[attractionsShuffle[i].category].push(attractionsShuffle[i])
    } else {
      attractionObject[attractionsShuffle[i].category] = [attractionsShuffle[i]]
    }
  }
  return attractionObject;
};

//apply filters from props to create new attractions array

export const applyFilter = (attrObject: any, array: Array<any>) => {
  let filteredAttraction: Array<any> = [];
  if (!array.length) {
    for (let i in attrObject) {
      filteredAttraction = filteredAttraction.concat(attrObject[i])
    }
  } else {
    for (let i of array) {
      if (attrObject.hasOwnProperty(i)) {
        filteredAttraction = filteredAttraction.concat(attrObject[i]);
      }
    }
  }
  return filteredAttraction;
};