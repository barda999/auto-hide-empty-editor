import * as vscode from "vscode";

// VS Code persists "editor hidden" per workspace and only exposes a toggle for
// it, so we remember whether we were the ones who hid it.
const EDITOR_HIDDEN_KEY = "autoHideEmptyEditor.editorHiddenByPanelMode";

// View locations are saved per profile, so the layout only needs setting up
// once. Bump the version to re-apply it after changing arrangeViews.
const LAYOUT_VERSION_KEY = "autoHideEmptyEditor.layoutVersion";
const LAYOUT_VERSION = 1;

// Closing several editors at once fires a burst of tab events; wait for it to
// settle so we don't collapse the editor between "close" and "open".
const SETTLE_DELAY_MS = 150;

// Empty Panel view container contributed in package.json. Moving views into it
// gives them a Panel tab of their own without dragging Chat along.
const PANEL_HOST = "workbench.view.extension.autoHideEmptyEditor-panelHost";

const CLAUDE_EXTENSION = "anthropic.claude-code";

// Claude Code registers one of these depending on the VS Code version.
const CLAUDE_VIEWS = ["claudeVSCodeSidebarSecondary", "claudeVSCodeSidebar"];
const TERMINAL_VIEW = "terminal";

export async function activate(context: vscode.ExtensionContext) {
  let hadEditors: boolean | undefined;
  let timer: ReturnType<typeof setTimeout> | undefined;

  const editorHidden = () =>
    context.workspaceState.get<boolean>(EDITOR_HIDDEN_KEY, false);
  const setEditorHidden = (value: boolean) =>
    context.workspaceState.update(EDITOR_HIDDEN_KEY, value);

  async function collapse() {
    if (!editorHidden()) {
      // The Panel is what fills the space, so make sure Claude Code is in it.
      // Views can be moved after the first-run setup (by hand, or by a reset).
      if (vscode.extensions.getExtension(CLAUDE_EXTENSION)) {
        await gatherViews().catch(logError);
      }
      // Hides the editor area and lets the Panel fill its space.
      await vscode.commands.executeCommand(
        "workbench.action.toggleMaximizedPanel",
      );
      await setEditorHidden(true);
    }
  }

  async function expand() {
    // When an editor opens, VS Code brings the editor area back by itself;
    // we only need to forget that we hid it.
    await setEditorHidden(false);
  }

  async function sync() {
    const hasEditors = countTabs() > 0;
    if (hasEditors !== hadEditors) {
      await (hasEditors ? expand() : collapse());
    }
    hadEditors = hasEditors;
  }

  function scheduleSync() {
    clearTimeout(timer);
    timer = setTimeout(() => {
      sync().catch(logError);
    }, SETTLE_DELAY_MS);
  }

  async function setUpLayoutOnce() {
    if (
      context.globalState.get(LAYOUT_VERSION_KEY) === LAYOUT_VERSION ||
      // Without Claude Code there's nothing to arrange; wait until it's
      // installed (see onDidChange below).
      !vscode.extensions.getExtension(CLAUDE_EXTENSION)
    ) {
      return;
    }
    await arrangeViews().catch(logError);
    await context.globalState.update(LAYOUT_VERSION_KEY, LAYOUT_VERSION);
  }

  context.subscriptions.push(
    vscode.window.tabGroups.onDidChangeTabs(scheduleSync),
    vscode.window.tabGroups.onDidChangeTabGroups(scheduleSync),
    vscode.extensions.onDidChange(() => setUpLayoutOnce().catch(logError)),
    { dispose: () => clearTimeout(timer) },
  );

  await setUpLayoutOnce();
  scheduleSync();
}

// First-run setup: puts Claude Code and the Terminal together in one
// right-docked Panel tab, Claude Code on top and the Terminal below it.
async function arrangeViews() {
  // Start from VS Code's defaults so earlier moves don't get in the way.
  await vscode.commands.executeCommand("workbench.action.resetViewLocations");
  await vscode.commands.executeCommand("workbench.action.positionPanelRight");
  await gatherViews();
}

// Moves Claude Code and the Terminal into our Panel tab. Views already there
// stay put, so this is safe to run repeatedly.
async function gatherViews() {
  await vscode.commands.executeCommand("vscode.moveViews", {
    viewIds: [...CLAUDE_VIEWS, TERMINAL_VIEW],
    destinationId: PANEL_HOST,
  });
  // Only Chat is left in the Secondary Side Bar; keep it out of the way.
  await vscode.commands.executeCommand("workbench.action.closeAuxiliaryBar");
}

function countTabs(): number {
  return vscode.window.tabGroups.all.reduce(
    (total, group) => total + group.tabs.length,
    0,
  );
}

function logError(err: unknown) {
  console.error("[auto-hide-empty-editor]", err);
}

export function deactivate() {}
