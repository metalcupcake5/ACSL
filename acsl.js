const fs = require("fs");

const main = async () => {
    const input = await fs.readFileSync("input.txt", "utf-8");
    let result = arrange(input);
    let finalString = result.newString;
    let restOfString = result.restOfString;
    while(restOfString.length > 0){
        result = arrange(restOfString);
        finalString += result.newString;
        restOfString = result.restOfString;
    }
    console.log(lint(finalString));
}

function sort(array) {
    return array.sort((a, b) => a < b ? -1 : a > b ? 1 : 0)
}

function convertToLetters(string){
    let result = "";
    for(const char of string.toLowerCase()){
        if(/[a-zA-Z]/.test(char)){
            result += char;
        }
    }
    return result;
}

function arrange(input){
    let string = convertToLetters(input).split("");
    let result = [...string];
    let charArray = [];
    for(const char of string){
        if(charArray.includes(char))
            continue;
        charArray.push(char);
        result.splice(result.indexOf(char), 1);
    }
    return {
        newString: sort(charArray).join(""),
        restOfString: result.join("")
    }
}

function lint(string){
    const array = string.split("");
    const lint = [...array];
    let previous;
    let index = 1;
    for(const char of array){
        index += 1;
        if(previous == char)
            lint.splice(lint.indexOf(char, index), 1);
        previous = char;
    }
    return lint.join("");
}

main();