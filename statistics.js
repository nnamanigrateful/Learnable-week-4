const readline = require("readline");

const inputInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

class Person {
  constructor(personName, personAge) {
    this.personName = personName;
    this.personAge = personAge;
  }

  static limbsCount = 4;

  static displayPersonName(personInstance) {
    console.log(`Person's name is ${personInstance.personName}`);
  }
}

function initiatePersonClass() {
  return Person;
}

const PersonClass = initiatePersonClass();

const individual = new PersonClass("Michael", 30);
console.log(individual);

const limbs = PersonClass.limbsCount;
console.log(`Number of limbs: ${limbs}`);

PersonClass.displayPersonName(individual);

function initiateStatisticsClass() {
  class CentralTendency {
    mean(numbers) {
      return numbers.reduce((a, b) => a + b, 0) / numbers.length;
    }

    median(numbers) {
      const sorted = [...numbers].sort((a, b) => a - b);
      const mid = Math.floor(sorted.length / 2);
      return sorted.length % 2 !== 0
        ? sorted[mid]
        : (sorted[mid - 1] + sorted[mid]) / 2;
    }

    mode(numbers) {
      const counts = numbers.reduce((acc, val) => {
        acc[val] = (acc[val] || 0) + 1;
        return acc;
      }, {});

      let maxCount = Math.max(...Object.values(counts));
      return Object.keys(counts).filter((key) => counts[key] === maxCount);
    }
  }

  class Dispersion extends CentralTendency {
    range(numbers) {
      return Math.max(...numbers) - Math.min(...numbers);
    }

    variance(numbers) {
      let mean = this.mean(numbers);
      return (
        numbers.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) /
        numbers.length
      );
    }

    standardDeviation(numbers) {
      return Math.sqrt(this.variance(numbers));
    }

    meanDeviation(numbers) {
      let mean = this.mean(numbers);
      return (
        numbers.reduce((acc, val) => acc + Math.abs(val - mean), 0) /
        numbers.length
      );
    }

    interquartileRange(numbers) {
      const sorted = [...numbers].sort((a, b) => a - b);
      const q1 = this.percentile(sorted, 25);
      const q3 = this.percentile(sorted, 75);
      return q3 - q1;
    }

    percentile(numbers, nthPercentile) {
      const index = Math.ceil((nthPercentile / 100) * numbers.length);
      return numbers[index - 1];
    }
  }

  return Dispersion;
}

const exampleArray = [1, 4, 6, 1, 8, 15, 18, 1, 5, 1];

const Statistics = initiateStatisticsClass();
const stats = new Statistics();

console.log("Mean:", stats.mean(exampleArray));
console.log("Median:", stats.median(exampleArray));
console.log("Mode:", stats.mode(exampleArray));
console.log("Range:", stats.range(exampleArray));
console.log("Variance:", stats.variance(exampleArray));
console.log("Standard Deviation:", stats.standardDeviation(exampleArray));
console.log("Mean Absolute Deviation:", stats.meanDeviation(exampleArray));
console.log("Interquartile Range:", stats.interquartileRange(exampleArray));
