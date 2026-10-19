/*
 * Script to run in the background of all webpages, listening for key events
 * Listens for two consecutive key presses (within a certain time period) of
 * the shortcut key defined below. Upon clicking the shortcut key twice, the
 * script will capitalize and space out the currently selected element's text.
 * Example:
 * Before: Hello
 *  After: H E L L O
 */

var shortcutKey = 'Q';
// Number of milliseconds user has to press shortcut key twice to activate shortcut
var shortcutTimespan = 250;

var shorcutCode = shortcutKey.charCodeAt(0);

// Records the last time the shortcut key was pressed
var lastPressedTime = null;
// Was the last key pressed the shortcut key
var wasLastKeyPressed = false;

function code(event) {
    event = event || window.event;
    return (event.keyCode || event.which);
}

window.onload = function() {
    document.onkeyup = function(keyboardEvent) {
        var key = code(keyboardEvent);
        if (key != shorcutCode)
        {
            wasLastKeyPressed = false;
            return;
        }

        // Has the shortcut key been pressed before
        if (lastPressedTime == null)
        {
            lastPressedTime = Date.now();
            wasLastKeyPressed = true;
            return;
        }

        // Check if the shortcut key was pressed twice consecutively
        if (!wasLastKeyPressed)
        {
            wasLastKeyPressed = true;
            lastPressedTime = Date.now();
            return;
        }

        // If all conditions are met, edit the text in the active element
        var currentTime = Date.now();
        if (currentTime - lastPressedTime < shortcutTimespan)
        {
            var text = document.activeElement.value;
            // Trim off the two d's typed to activate this function
            text = text.substring(0, text.length - 2);
            var editedText = "";
            for (var i = 0; i < text.length; i++)
            {
                editedText = editedText.concat(text.charAt(i).toUpperCase(), " ");
            }
            // Trim off the two spaces at the end
            editedText = editedText.substring(0, editedText.length - 1);
            document.activeElement.value = editedText;
        } else
        {
            lastPressedTime = currentTime;
        }
    };
};