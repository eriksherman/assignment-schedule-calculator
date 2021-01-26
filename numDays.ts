import * as readline from 'readline-sync'

const numLectures: number = parseInt(readline.question('number of lectures: '))
const numPsets: number = parseInt(readline.question('number of psets: '))
const numExams: number = parseInt(
    readline.question('number of exams (not final exam): ')
)

const lectureWeight: number = parseInt(
    readline.question('weight of lectures: ')
)
const psetWeight: number = parseInt(readline.question('weight of psets: '))
const examWeight: number = parseInt(readline.question('weight of exams: '))

const weightPerDay: number = parseInt(readline.question('weight per day: '))

const totalWeight: number =
    numLectures * lectureWeight + numPsets * psetWeight + numExams * examWeight

export const numDays = (totalWeight: number, weightPerDay: number) => {
    const days: number = totalWeight / weightPerDay
}

console.log('number of days to complete: ' + numDays(totalWeight, weightPerDay))
