function createEmployeeRecord(array){
    // loads array elements into corresponding object properties
    // initialize empty arrays on timeInEvents and timeOutEvents
    const [firstName, familyName, title, payPerHour] = array
    const employee = {
        firstName: firstName,
        familyName: familyName,
        title: title,
        payPerHour: payPerHour,
        timeInEvents: [],
        timeOutEvents: []
    }
    return employee
}

function createEmployeeRecords(array){
    // convert each nested array into an employee record using createEmployeeRecord and accumulates to a new array
    return array.map((employee) => createEmployeeRecord(employee))
}

function createTimeInEvent(employee, timeStamp){
    const timeIn = {
        type: "TimeIn",
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    }
    employee.timeInEvents.push(timeIn)
    return employee
}

function createTimeOutEvent(employee, timeStamp){
    const timeOut = {
        type: "TimeOut",
        hour: parseInt(timeStamp.split(" ")[1]),
        date: timeStamp.split(" ")[0]
    }
    employee.timeOutEvents.push(timeOut)
    return employee
}

function hoursWorkedOnDate(employee, timeStamp){
    const clockedIn = employee.timeInEvents.find(object => object.date === timeStamp).hour
    const clockedOut = employee.timeOutEvents.find(object => object.date === timeStamp).hour
    return (clockedOut - clockedIn)/100
}

function wagesEarnedOnDate(employee, timeStamp){
    const earned = hoursWorkedOnDate(employee, timeStamp) * employee.payPerHour
    return earned 
}

function allWagesFor(employee){
    return employee.timeOutEvents.reduce((total, timeObject) => total += wagesEarnedOnDate(employee, timeObject.date), 0)
    // 0 is the initial value
}

function findEmployeeByFirstName(array, firstName){
    return array.find(employee => employee.firstName)
}

function calculatePayroll(array){
    return array.reduce((total, employee) => total += allWagesFor(employee),0)
}