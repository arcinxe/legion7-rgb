# legion7-rgb

Simple console application for basic configuration of the RGB lights of the Lenovo Legion 7 laptop on Linux. Doesn't seem to work on Windows for reasons i don't really care about, as you can simply use iCue to set static lighting, and then kill it with ~~fire~~ task manager to free resources and while keeping the lights configuration.

### Note: this is proof of concept app. No special features like those available in open-rgb app. I don't consider any further development of this app. Feel free to use this app as the reference for implementing support for this laptop in open-rgb or other apps.




# Installation
```sh
git clone https://github.com/arcinxe/legion7-rgb.git
cd legion7-rgb
npm install
npm install -g .
```

# Usage
Because this app is meant to be really basic all the LEDs have been separated in 4 groups
```sh
$ legion7-rgb --help

Options:
      --help     Show help                                             [boolean]
      --version  Show version number                                   [boolean]
  -k, --keys     Set the color of all the keyboard keys                 [string]
  -n, --neon     Set the color of the front bottom neon                 [string]
  -v, --vents    Set the color of the back vents                        [string]
  -l, --logo     Set the color of the back lid LEGION logo              [string]

```
## Example
Set all the LEDs to hardcoded values per LED in leds.js (default all white, fell free to edit this file to set custom static colors per LED)
```sh
$ legion-rgb
```

Set the LED groups to the custom hex colors
```sh
$ legion7-rgb -l FF0010 -v FF0010 -n FF0010 -k FF0010

{ keysColor: [ 255, 0, 16 ] }
{ logoColor: [ 255, 0, 16 ] }
{ neonColor: [ 255, 0, 16 ] }
{ ventsColor: [ 255, 0, 16 ] }
writing packet #0
writing packet #1
writing packet #2
writing packet #3
```

## Development tip
+ Check the leds.js file to see the addresses of the each led and their locations on the keyboard/laptop

