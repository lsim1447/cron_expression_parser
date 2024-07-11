const MIN_MINUTE_VALUE = 0
const MAX_MINUTE_VALUE = 59

const MIN_HOUR_VALUE = 0
const MAX_HOUR_VALUE = 23

const MIN_DAY_OF_MONTH_VALUE = 1
const MAX_DAY_OF_MONTH_VALUE = 31

const MIN_MONTH_VALUE = 1
const MAX_MONTH_VALUE = 12

const MIN_DAY_OF_WEEK_VALUE = 0
const MAX_DAY_OF_WEEK_VALUE = 6

function expandField(fieldName, field, minVal, maxVal) {
  const result = [];

  if (field === '*') {
    for (let i = minVal; i <= maxVal; i++) {
      result.push(i);
    }

    return result
  } 
  
  const parts = field.split(',');

  parts.forEach(part => {
    if (part.includes('-')) {
      const [start, end] = part.split('-').map(Number);
      
      if (isNaN(start)) {
        console.warn(`'${fieldName}' contains incorrect start value/pattern. Skipping that (sub)part for now.`)
      }
      if (isNaN(end)) {
        console.warn(`'${fieldName}' contains incorrect end value/pattern. Skipping that (sub)part for now.`)
      }
      if (start > end) {
        console.warn(`'${fieldName}' contains incorrect interval. Starting value is bigger than the ending one. Skipping that (sub)part for now.`)
      }

      for (let i = start; i <= end; i++) {
        result.push(i);
      }
    } else if (part.includes('/')) {
      let [base, step] = part.split('/');

      step = Number(step);
      base = base === '*' ? minVal : Number(base);

      if (isNaN(step)) {
        console.warn(`'${fieldName}' contains incorrect step value. Skipping that (sub)part for now.`)
      }
      if (isNaN(base)) {
        console.warn(`'${fieldName}' contains incorrect base value. Skipping that (sub)part for now.`)
      }
      
      for (let i = base; i <= maxVal; i += step) {
        result.push(i);
      }
    } else {
      result.push(Number(part));
    }
  });

  return result;
}
  
function parseCronExpression(cronExpression) {
  const fields = cronExpression.split(' ');

  if (fields.length < 6) {
    throw new Error("Invalid. It should contain 5 fields (minute, hour, day of month, month, day of week) and a command.");
  }

  const [
    minuteSubExpression,
    hourSubExpression,
    dayOfMonthSubExpression,
    monthSubExpression,
    dayOfWeekSubExpression,
    ...command
  ] = fields;

  const mergedCommandStr = command.join(' ');

  const minute = expandField('minute', minuteSubExpression, MIN_MINUTE_VALUE, MAX_MINUTE_VALUE);
  const hour = expandField('hour', hourSubExpression, MIN_HOUR_VALUE, MAX_HOUR_VALUE);
  const dayOfMonth = expandField('day of month', dayOfMonthSubExpression, MIN_DAY_OF_MONTH_VALUE, MAX_DAY_OF_MONTH_VALUE);
  const month = expandField('month', monthSubExpression, MIN_MONTH_VALUE, MAX_MONTH_VALUE);
  const dayOfWeek = expandField('day of week', dayOfWeekSubExpression, MIN_DAY_OF_WEEK_VALUE, MAX_DAY_OF_WEEK_VALUE);

  return {
    minute,
    hour,
    dayOfMonth,
    month,
    dayOfWeek,
    command: mergedCommandStr
  };
}
  
function main() {
  if (process.argv.length !== 3) {
    console.log("Usage: node chron_parser.js '<expression>'");
    console.log('Example: node chron_parser.js "*/15 0 1,15 * 1-5 /usr/bin/find"');
    process.exit(1);
  }

  const expression = process.argv[2];

  try {
    const parsedCron = parseCronExpression(expression);

    console.log("minute        ", parsedCron.minute.join(' '));
    console.log("hour          ", parsedCron.hour.join(' '));
    console.log("day of month  ", parsedCron.dayOfMonth.join(' '));
    console.log("month         ", parsedCron.month.join(' '));
    console.log("day of week   ", parsedCron.dayOfWeek.join(' '));
    console.log("command       ", parsedCron.command);
    
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
}

main();
