# Cron Expression Parser

This Node.js script parses a cron expression and outputs the individual components: minute, hour, day of month, month, day of week, and command.

## Installation

### Prerequisites: 
Node.js installed on your system.

## Usage

```bash
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
