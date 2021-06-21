const createEmployeeRecord = (array) => {
    
    const record = {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
    
    return record

}

const createEmployeeRecords = (arrayOfArrays) => {
    const array = []
    arrayOfArrays.forEach(element => {
        array.push(createEmployeeRecord(element))
    });
    return array
}

const createTimeInEvent = (record, dtString) => {
    let timeInEvent = {
        type: "TimeIn",
        date: dtString.split(' ')[0],
        hour: parseInt(dtString.split(' ')[1])
    }
    record.timeInEvents.push(timeInEvent)
    return record
}

const createTimeOutEvent = (record, dtString) => {
    let timeOutEvent = {
        type: "TimeOut",
        date: dtString.split(' ')[0],
        hour: parseInt(dtString.split(' ')[1])
    }
    record.timeOutEvents.push(timeOutEvent)
    return record
}

const hoursWorkedOnDate = (record, date) => {

    let timeInOnDate = record.timeInEvents.find(function(event){
        return event.date === date
    })
    let timeOutOnDate = record.timeOutEvents.find(function(event){
        return event.date === date
    })

    return (timeOutOnDate.hour - timeInOnDate.hour)/100
}

const wagesEarnedOnDate = (record, date) => {
    let payableHours = hoursWorkedOnDate(record, date)
    return payableHours * record.payPerHour
}

const allWagesFor = (record) => {
    return record.timeInEvents.reduce(function(totalWages, inEvent){
        return totalWages + (wagesEarnedOnDate(record, inEvent.date))
    }, 0)
}

const calculatePayroll = (records) => {
    return records.reduce(function(totalWages, record){
        return allWagesFor(record) + totalWages
    },0)
}

const findEmployeeByFirstName = (records, name) => {
    // console.log(records)
    return records.find(function(record){
        return record.firstName === name
    })
}