# Insert A New Line Within A Table Cell
## Purpose
Add a new line within the same table cell on Android.

When creating a table occasionally it is necessary to write one or more lines below the first one within the same table cell. On devices with a hardware keyboard typing SHIFT+ENTER will wrap the line and start a new line within the same table cell.

However, on Android devices it is not possible to type the key combination SHIFT+ENTER. So this plugin adds a command to Obsidian that inserts a new line and moves the cursor to the next line within the same table cell. This adds the ability of typing multiple lines within the same table cell on devices that have no hardware keyboard to Obsidian.
## Usages
- Click on the enter-key (![[images/icon-enter-key.png]]) in the Ribbon menu.
- Run the command from the Command Palette: **New Line Within Table Cell: New Line**
- Add this command to the toolbar where it will appear as an enter-key (![[images/icon-enter-key.png]]). Search for **newline** in the Command Palette during configuring the toolbar.
## Plugin integration
A new Obsidian command is added to the Command Palette. This command will insert a newline within a table cell using the HTML line break element <br\>. A new line will be started within the same table cell without using a hardware keyboard.

Command name: **New Line Within Table Cell: New Line**
..
