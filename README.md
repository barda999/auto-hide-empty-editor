# Auto Hide Empty Editor

Give Claude Code the whole window when you're not editing a file.

When no files are open, this extension hides VS Code's empty editor area so Claude Code and the Terminal fill the space next to the Explorer. Open a file and the editor comes back; close the last one and it collapses again. There are no commands or settings to learn.

```
No files open:   Explorer │ Claude Code
                          │ ───────────
                          │ Terminal

File open:       Explorer │ Editor │ Claude Code
                          │        │ ───────────
                          │        │ Terminal
```

## Requirements

- VS Code 1.140 or later
- The [Claude Code](https://marketplace.visualstudio.com/items?itemName=anthropic.claude-code) extension

## What happens on first run

The first time the extension runs with Claude Code installed, it arranges your layout once:

- The Panel is docked on the right.
- Claude Code and the Terminal are moved into one Panel tab, with Claude Code on top and the Terminal below.
- The Secondary Side Bar is closed.

To do this, it first runs **View: Reset View Locations**, so any views you have moved yourself go back to their default places. After that the extension leaves your layout alone; rearrange things however you like.

## Tips

- **Cmd+B** (Ctrl+B on Windows and Linux) hides the Explorer when you want Claude Code to use the full width.
- Drag the divider between Claude Code and the Terminal to resize them.

## Undoing the layout

Disable or uninstall the extension, then run these from the Command Palette:

1. **View: Reset View Locations**
2. **View: Move Panel Bottom**

## Disclaimer

This is an independent extension. It is not made or endorsed by Anthropic.
