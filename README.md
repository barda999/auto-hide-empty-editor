# Auto Hide Empty Editor

Give Claude Code the whole window when you're not editing a file.

When no files are open, this extension hides VS Code's empty editor area so Claude Code and the Terminal fill the space next to the Explorer. Open a file and the editor comes back; close the last one and it collapses again. There are no commands or settings to learn.

```
No files open:   Explorer │ Claude Code
                          │ ───────────
                          │ Terminal

File open:       Explorer │ Editor │ Claude Code
                          │ ────────────────────
                          │ Terminal
```

With a file open you get VS Code's usual layout: Claude Code in the Secondary Side Bar and the Terminal in a bottom Panel that runs under both the editor and Claude Code.

## Requirements

- VS Code 1.140 or later
- The [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) extension

## What it changes

The first time the extension runs with Claude Code installed, it runs **View: Reset View Locations**, so any views you have moved yourself go back to their default places.

After that, whenever you close the last file or open the first one, it moves Claude Code, the Terminal and the Panel into the layouts shown above:

- No files open: the Panel is docked on the right and maximized, Claude Code and the Terminal share one Panel tab, and the Secondary Side Bar is closed.
- File open: the Panel is docked at the bottom and aligned right, the Terminal goes back to it, and Claude Code goes back to the Secondary Side Bar.

## Tips

- **Cmd+B** (Ctrl+B on Windows and Linux) hides the Explorer when you want Claude Code to use the full width.
- Drag the divider between Claude Code and the Terminal to resize them.

## Undoing the layout

Disable or uninstall the extension, then run these from the Command Palette:

1. **View: Reset View Locations**
2. **View: Move Panel Bottom**
3. **View: Set Panel Alignment to Center**

## Disclaimer

This is an independent extension. It is not made or endorsed by Anthropic.
