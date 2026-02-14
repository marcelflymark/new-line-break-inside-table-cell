# Insert line breaks into tables on mobile devices via shortcut or toolbar.

**Purpose**

Insert line breaks into tables on mobile devices via a new command you can link to a shortcut or toolbar icon.

When creating a table occasionally it is necessary to write one or more lines below the first one inside the same table cell. On devices with a hardware keyboard typing SHIFT+ENTER will wrap the line inside the same table cell.

However, on mobile devices it is not possible to type the key combination SHIFT+ENTER. So this plugin adds a command to Obsidian that inserts a line break inside a table cell. This adds the ability of typing multiple lines inside the same table cell on devices that have no hardware keyboard to Obsidian.

**Usages**

- Click on the enter-key icon (![[images/icon-enter-key.png]]) in the Ribbon menu.
- Run the command from the Command Palette: **Table Line Break: Table line break**
- Add this command to the toolbar where it will appear as an enter-key (![[images/icon-enter-key.png]]). Search for **Table line break** in the Command Palette during configuring the toolbar.

**New Command**

A new Obsidian command is added to the Command Palette. This command will insert a line break inside a table cell using the HTML line break element <br\>. A new line will be started inside the same table cell without using a hardware keyboard.

Command Palette name: **Table Line Break: Table line break**
