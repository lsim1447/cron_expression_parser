# Cron Expression Parser

This Node.js script parses a cron expression and outputs the individual components: minute, hour, day of month, month, day of week, and command.

## Installation

### Prerequisites: 
Node.js installed on your system. You can download it here: https://nodejs.org/en/download/source-code

You can clone the repository by executing the following git command, from your desired folder, in your terminal:

```bash
git clone https://github.com/lsim1447/cron_expression_parser.git
```

## Usage
After navigating into the project's folder, try to run the script.

```bash
cd cron_expression_parser

node cron_parser.js '<cron_expression>'
```

### Example
```bash
node cron_parser.js "*/15 0 1,15 * 1-5 /usr/bin/find"
```

### Output
```bash
minute         0 15 30 45
hour           0
day of month   1 15
month          1 2 3 4 5 6 7 8 9 10 11 12
day of week    1 2 3 4 5
command        /usr/bin/find
```
### Meaning
“At every 15th minute past hour 0 on day-of-month 1 and 15 and on every day-of-week from Monday through Friday.”
or more clearly
"Every 15 minutes, between 12:00 AM and 12:59 AM, on day 1 and 15 of the month, Monday through Friday"


## Code details

### getFieldResults(fieldName, field, minVal, maxVal)
This function parses a field of the cron expression. 
It handles:
- Wildcards (*)
- Lists (e.g., 1,2,3)
- Ranges (e.g., 1-5)
- Steps (e.g., */5, 1/5)

### parseCronExpression(cronExpression)
This function parses a cron string and expands each field to show the times at which it will run.

## Learn more:
- https://www.baeldung.com/cron-expressions
- https://www.freeformatter.com/cron-expression-generator-quartz.html
- https://crontab.cronhub.io/
