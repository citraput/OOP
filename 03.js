const fs = require('fs');

class Log {
    constructor(){
        this.logMessage = '';
    }
    constructLogMessage(level, message){
        const date = new Date().toJSON().toString();
        const logLevel = {
            0: 'EMERGENCY',
            1: 'ALERT',
            2: 'CRITICAL',
            3: 'ERROR',
            4: 'WARNING',
            5: 'NOTICE',
            6: 'INFORMATIONAL',
            7: 'DEBUG'
        }
        if(!Object.keys(logLevel).find(el => Number(el) === level)){
            return 'Input Log Level: 1 to 7.'
        }
        this.logMessage += `[${date}] ${logLevel[level]}: ${message}\n`;
        return;
    }
    writeLog(){
        fs.appendFile('app.log', `${this.logMessage}`, function(err){
            if(err) throw err;
            console.log('Data is appended to app.log')
        })
    }   
}

const log = new Log();
log.constructLogMessage(0, 'System hung. Contact system administrator immediately!');
log.constructLogMessage(1, 'Achtung! Achtung!');
log.constructLogMessage(2, 'Medic!! We\'ve got critical damages.');
log.constructLogMessage(3, 'We can\'t divide any numbers by zero.');
log.constructLogMessage(4, 'Insufficient funds.');
log.constructLogMessage(5, 'Someone loves your status.');
log.constructLogMessage(6, 'This is an information about something.');
log.constructLogMessage(7, 'This is debug message.');
log.writeLog();