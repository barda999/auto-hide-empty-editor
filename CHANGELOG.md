# Change Log

## 0.1.3

- Fix: approving a Claude Code edit with no files open failed with "Tool permission stream closed before response received". The approval diff tab counted as an open file, so Claude Code was moved back to the Secondary Side Bar, which reloaded it mid-prompt. Claude Code's diff tabs no longer change the layout.

## 0.1.2

- With a file open, the layout now matches VS Code's default: Claude Code in the Secondary Side Bar and the Terminal in a bottom Panel that runs under the editor and Claude Code. The stacked right-hand Panel is used only when no files are open.

## 0.1.1

- Fix: if Claude Code had been moved out of the Panel (for example back to the Secondary Side Bar), closing the last file showed only the Terminal, maximized. Claude Code and the Terminal are now moved back into the Panel tab before the editor collapses.
- Fix: with the Panel docked at the bottom, Claude Code and the Terminal appeared side by side. The Panel is now docked on the right so the Terminal sits below Claude Code.
- The layout is now put in place whenever a window opens, not only on first run.

## 0.1.0

- Initial release.
- Hides the editor area when no files are open and brings it back when one opens.
- On first run with Claude Code installed, puts Claude Code and the Terminal in one right-docked Panel tab.
