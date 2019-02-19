# node-crackwatch
A CLI tool to search and find games on crackwatch

**To install just run `npm install -g node-crackwatch`**

**Usage: crackwatch [options]**

**Options:**
  * -V, --version                output the version number
  * -g, --game [optional]        Game name (must be between quotes) <String>
  * -G, --games [optional]       Games, split by comma <ArrayString>
  * -e, --exact                  Match the exact title <Boolean>
  * -p, --page-start [optional]  Page start (default 0) <Integer>
  * -P, --page-end [optional]    Page end (default 100) <Integer>
  * -v, --verbose                Display more information <Boolean>
  * -s, --stop-on-find           Stop once the program has found a game <Boolean>
  * -h, --help                   output usage information
  
Examples: 
* crackwatch -g "Far Cry" (Will try to find games that match with the parameter)
* crackwatch -G "Far Cry,Metro" -p 0 -P 100 (Will try to find games that mach with the parameter from page 0 to 100)