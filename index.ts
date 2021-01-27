type Weights = {
    [assignmentType: string]: number //number represents weight
}

const assignments: string[] = [
    'lecture 1',
    'lecture 2',
    'lecture 3',
    'lecture 4',
    'pset 1',
    'lecture 5',
    'lecture 6',
    'lecture 7',
    'lecture 8',
    'lecture 9',
    'pset 2',
    'exam 1',
    'lecture 10',
    'lecture 11',
    'lecture 12',
    'pset 3',
    'lecture 13',
    'lecture 14',
    'lecture 15',
    'pset 4',
    'lecture 16',
    'lecture 17',
    'lecture 18',
    'pset 5',
    'exam 2',
    'lecture 19',
    'lecture 20',
    'pset 6',
    'lecture 21',
    'lecture 22',
    'lecture 23',
    'lecture 24',
    'pset 7',
    'lecture 25',
    'lecture 26',
    'lecture 27',
    'lecture 28',
    'pset 8',
    'lecture 29',
    'exam 3',
    'lecture 30',
    'lecture 31',
    'lecture 32',
    'pset 9',
    'lecture 33',
    'lecture 34',
    'lecture 35',
    'pset 10',
]

// extract the assignment types from the assignments list (unique list of first words of each assignment such as lecture, pset, or exam)
const extractAllAssignmentTypes = (assignments: string[]) =>
    assignments
        .map((assignment) => assignment.split(' ')[0])
        .reduce(
            (acc: string[], cur: string) =>
                acc.includes(cur) ? acc : [...acc, cur],
            []
        )

// throw error if assignment type is not a real assignment type
const extractAssignmentType = (assignment: string) => assignment.split(' ')[0]

const extractWeightFromAssignment = (assignment: string, weights: Weights) =>
    weights[extractAssignmentType(assignment)]

const printSchedule = (
    assignments: string[],
    weights: Weights,
    weightPerDay: number
) => {
    // go through the assignments
    // extract each assignment type
    // reference weight of assignment
    let netWeight: number = weightPerDay
    let dayNum: number = 0
    let unassigned: string[] = [...assignments]
    let curAssignment: string = unassigned.shift() || ''
    process.stdout.write('day ' + dayNum + ': ' + curAssignment)
    netWeight -= extractWeightFromAssignment(curAssignment, weights)
    while (unassigned.length > 0) {
        if (netWeight == 0) {
            dayNum++
            netWeight += weightPerDay
            curAssignment = unassigned.shift() || ''
            console.log()
            const assignmentWeight = extractWeightFromAssignment(
                curAssignment,
                weights
            )
            netWeight -= assignmentWeight
            process.stdout.write('day ' + dayNum + ': ' + curAssignment)
            if (netWeight < 0) {
                process.stdout.write(
                    ':' + (assignmentWeight - Math.abs(netWeight))
                )
            }
        } else if (netWeight >= 0) {
            curAssignment = unassigned.shift() || ''
            process.stdout.write(', ' + curAssignment)
            const assignmentWeight = extractWeightFromAssignment(
                curAssignment,
                weights
            )
            netWeight -= assignmentWeight
            if (netWeight < 0) {
                process.stdout.write(
                    ':' + (assignmentWeight - Math.abs(netWeight))
                )
            }
        } else if (netWeight < 0) {
            dayNum++
            console.log()
            const assignmentWeight = extractWeightFromAssignment(
                curAssignment,
                weights
            )
            process.stdout.write(
                'day ' +
                    dayNum +
                    ': ' +
                    curAssignment +
                    ':' +
                    (Math.abs(netWeight) > weightPerDay
                        ? weightPerDay
                        : Math.abs(netWeight))
            )
            netWeight += weightPerDay
        }
    }
    console.log()
}

printSchedule(assignments, { lecture: 1, pset: 4, exam: 2 }, 2)
