var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// insert_newline_plugin.ts
var insert_newline_plugin_exports = {};
__export(insert_newline_plugin_exports, {
  default: () => InsertNewlinePlugin
});
module.exports = __toCommonJS(insert_newline_plugin_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  showNewlineRibbonIcon: false
};
var InsertNewlinePlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    if (this.settings.showNewlineRibbonIcon) {
      const ribbonEntryEl = this.addRibbonIcon("corner-down-left", "New line within table cell", (evt) => {
        this.insertNewlineInCurrentNote();
      });
    }
    this.addCommand({
      id: "insert-nl-at-cursor",
      name: "New Line",
      icon: "corner-down-left",
      editorCallback: (editor, view) => {
        this.insertNewlineAtCursor(editor);
      }
    });
    this.addSettingTab(new InsertNewlineSettingTab(this.app, this));
  }
  onunload() {
  }
  // Method to add one HTML newline element to the current note (works from anywhere)
  insertNewlineInCurrentNote() {
    const activeView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (activeView) {
      const editor = activeView.editor;
      this.insertNewlineAtCursor(editor);
    } else {
      new import_obsidian.Notice("No active note found");
    }
  }
  // Method to insert one newline HTML element at cursor position
  insertNewlineAtCursor(editor) {
    const textToInsert = "<br>";
    const cursor = editor.getCursor();
    const currentLine = editor.getLine(cursor.line);
    const beforeCursor = currentLine.substring(0, cursor.ch);
    const afterCursor = currentLine.substring(cursor.ch);
    const newLineContent = beforeCursor + textToInsert + afterCursor;
    editor.setLine(cursor.line, newLineContent);
    editor.setCursor({
      line: cursor.line,
      ch: cursor.ch + textToInsert.length
    });
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var InsertNewlineSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("h2", { text: "New Line Within Table Cell Settings" });
    new import_obsidian.Setting(containerEl).setName("Show ribbon icon").setDesc("Display the Enter key (\u21B5) entry in the ribbon").addToggle((toggle) => toggle.setValue(this.plugin.settings.showNewlineRibbonIcon).onChange(async (value) => {
      this.plugin.settings.showNewlineRibbonIcon = value;
      await this.plugin.saveSettings();
      new import_obsidian.Notice("Please restart Obsidian or reload the plugin for the ribbon entry change to take effect.");
    }));
    containerEl.createEl("p", {
      text: 'This plugin inserts one <br> tag for a new line within table cells. Use the ribbon icon (if enabled) or the "New Line" command (Ctrl+P).',
      cls: "setting-item-description"
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5zZXJ0X25ld2xpbmVfcGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25WaWV3LCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuLy8gUGx1Z2luIHRoYXQgYWRkcyAxIGNvbW1hbmQgYW5kIDEgb3B0aW9uYWwgcmliYm9uIGVudHJ5LlxuLy8gSXQgaW5zZXJ0cyBhbiBIVE1MIG5ld2xpbmUgYXQgdGhlIGN1cnNvciB3aXRoaW4gdGFibGUgY2VsbHNcblxuaW50ZXJmYWNlIEluc2VydE5ld2xpbmVQbHVnaW5TZXR0aW5ncyB7XG5cdHNob3dOZXdsaW5lUmliYm9uSWNvbjogYm9vbGVhbjtcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogSW5zZXJ0TmV3bGluZVBsdWdpblNldHRpbmdzID0ge1xuXHRzaG93TmV3bGluZVJpYmJvbkljb246IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc2VydE5ld2xpbmVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRzZXR0aW5nczogSW5zZXJ0TmV3bGluZVBsdWdpblNldHRpbmdzO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gQ29uZGl0aW9uYWxseSBhZGQgdGhlIHJpYmJvbiBlbnRyeSBiYXNlZCBvbiBzZXR0aW5nc1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLnNob3dOZXdsaW5lUmliYm9uSWNvbikge1xuXHRcdFx0Y29uc3QgcmliYm9uRW50cnlFbCA9IHRoaXMuYWRkUmliYm9uSWNvbignY29ybmVyLWRvd24tbGVmdCcsICdOZXcgbGluZSB3aXRoaW4gdGFibGUgY2VsbCcsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRcdFx0dGhpcy5pbnNlcnROZXdsaW5lSW5DdXJyZW50Tm90ZSgpO1xuXHRcdFx0fSk7XG5cdFx0fVxuXG5cdFx0Ly8gQ29tbWFuZCB0byBpbnNlcnQgb25lIG5ld2xpbmUgdG8gdGhlIGN1cnJlbnQgbm90ZVxuXHRcdHRoaXMuYWRkQ29tbWFuZCh7XG5cdFx0XHRpZDogJ2luc2VydC1ubC1hdC1jdXJzb3InLFxuXHRcdFx0bmFtZTogJ05ldyBMaW5lJyxcblx0XHRcdGljb246ICdjb3JuZXItZG93bi1sZWZ0Jyxcblx0XHRcdGVkaXRvckNhbGxiYWNrOiAoZWRpdG9yOiBFZGl0b3IsIHZpZXc6IE1hcmtkb3duVmlldykgPT4ge1xuXHRcdFx0XHR0aGlzLmluc2VydE5ld2xpbmVBdEN1cnNvcihlZGl0b3IpO1xuXHRcdFx0fVxuXHRcdH0pO1xuXG5cdFx0Ly8gVGhpcyBhZGRzIGEgc2V0dGluZ3MgdGFiIHNvIHRoZSB1c2VyIGNhbiBhZGQgb3IgcmVtb3ZlIHRoZSBuZXdsaW5lIHJpYmJvbiBpY29uXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBJbnNlcnROZXdsaW5lU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXHR9XG5cblx0b251bmxvYWQoKSB7XG5cblx0fVxuXG5cdC8vIE1ldGhvZCB0byBhZGQgb25lIEhUTUwgbmV3bGluZSBlbGVtZW50IHRvIHRoZSBjdXJyZW50IG5vdGUgKHdvcmtzIGZyb20gYW55d2hlcmUpXG5cdGluc2VydE5ld2xpbmVJbkN1cnJlbnROb3RlKCkge1xuXHRcdGNvbnN0IGFjdGl2ZVZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuXHRcdGlmIChhY3RpdmVWaWV3KSB7XG5cdFx0XHRjb25zdCBlZGl0b3IgPSBhY3RpdmVWaWV3LmVkaXRvcjtcblx0XHRcdHRoaXMuaW5zZXJ0TmV3bGluZUF0Q3Vyc29yKGVkaXRvcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5ldyBOb3RpY2UoJ05vIGFjdGl2ZSBub3RlIGZvdW5kJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gTWV0aG9kIHRvIGluc2VydCBvbmUgbmV3bGluZSBIVE1MIGVsZW1lbnQgYXQgY3Vyc29yIHBvc2l0aW9uXG5cdGluc2VydE5ld2xpbmVBdEN1cnNvcihlZGl0b3I6IEVkaXRvcikge1xuXHRcdGNvbnN0IHRleHRUb0luc2VydCA9ICc8YnI+JzsgLy8gSGFyZC1jb2RlZCBhcyB0aGVyZSBpcyBvbmx5IG9uZSBwb3NzaWJsZSBsaW5lIGJyZWFrXG5cdFx0XG5cdFx0Ly8gR2V0IGN1cnNvciBwb3NpdGlvbiBiZWZvcmUgaW5zZXJ0aW9uXG5cdFx0Y29uc3QgY3Vyc29yID0gZWRpdG9yLmdldEN1cnNvcigpO1xuXHRcdFxuXHRcdC8vIEZvciBIVE1MIGNvbnRlbnQgaW4gdGFibGVzLCBtYW51YWxseSBidWlsZCB0aGUgbGluZVxuXHRcdGNvbnN0IGN1cnJlbnRMaW5lID0gZWRpdG9yLmdldExpbmUoY3Vyc29yLmxpbmUpO1xuXHRcdGNvbnN0IGJlZm9yZUN1cnNvciA9IGN1cnJlbnRMaW5lLnN1YnN0cmluZygwLCBjdXJzb3IuY2gpO1xuXHRcdGNvbnN0IGFmdGVyQ3Vyc29yID0gY3VycmVudExpbmUuc3Vic3RyaW5nKGN1cnNvci5jaCk7XG5cdFx0XG5cdFx0Ly8gRG8gdGhlIGluc2VydGlvbiB1c2luZyBhIGJlZm9yZSBhbmQgYmVoaW5kIGN1cnNvciBpbiBjYXNlIHRoZSBjdXJzb3IgaXMgbm90IGF0IHRoZSBlbmQgb2YgYSBsaW5lXG5cdFx0Y29uc3QgbmV3TGluZUNvbnRlbnQgPSBiZWZvcmVDdXJzb3IgKyB0ZXh0VG9JbnNlcnQgKyBhZnRlckN1cnNvcjtcblx0XHRcblx0XHRlZGl0b3Iuc2V0TGluZShjdXJzb3IubGluZSwgbmV3TGluZUNvbnRlbnQpO1xuXHRcdFxuXHRcdC8vIE1vdmUgdGhlIGN1cnNvciBieSB0aGUgIyBvZiBjaGFycyBhcyBtb3JlIHRoYW4gMSBjaGFyIHdhcyBpbnNlcnRlZFxuXHRcdGVkaXRvci5zZXRDdXJzb3Ioe1xuXHRcdFx0bGluZTogY3Vyc29yLmxpbmUsXG5cdFx0XHRjaDogY3Vyc29yLmNoICsgdGV4dFRvSW5zZXJ0Lmxlbmd0aFxuXHRcdH0pO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cblxuY2xhc3MgSW5zZXJ0TmV3bGluZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cGx1Z2luOiBJbnNlcnROZXdsaW5lUGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEluc2VydE5ld2xpbmVQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdoMicsIHt0ZXh0OiAnTmV3IExpbmUgV2l0aGluIFRhYmxlIENlbGwgU2V0dGluZ3MnfSk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdTaG93IHJpYmJvbiBpY29uJylcblx0XHRcdC5zZXREZXNjKCdEaXNwbGF5IHRoZSBFbnRlciBrZXkgKFx1MjFCNSkgZW50cnkgaW4gdGhlIHJpYmJvbicpXG5cdFx0XHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGVcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dOZXdsaW5lUmliYm9uSWNvbilcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dOZXdsaW5lUmliYm9uSWNvbiA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdG5ldyBOb3RpY2UoJ1BsZWFzZSByZXN0YXJ0IE9ic2lkaWFuIG9yIHJlbG9hZCB0aGUgcGx1Z2luIGZvciB0aGUgcmliYm9uIGVudHJ5IGNoYW5nZSB0byB0YWtlIGVmZmVjdC4nKTtcblx0XHRcdFx0fSkpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG5cdFx0XHR0ZXh0OiAnVGhpcyBwbHVnaW4gaW5zZXJ0cyBvbmUgPGJyPiB0YWcgZm9yIGEgbmV3IGxpbmUgd2l0aGluIHRhYmxlIGNlbGxzLiBVc2UgdGhlIHJpYmJvbiBpY29uIChpZiBlbmFibGVkKSBvciB0aGUgXCJOZXcgTGluZVwiIGNvbW1hbmQgKEN0cmwrUCkuJyxcblx0XHRcdGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbidcblx0XHR9KTtcblx0fVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxzQkFBcUY7QUFTckYsSUFBTSxtQkFBZ0Q7QUFBQSxFQUNyRCx1QkFBdUI7QUFDeEI7QUFFQSxJQUFxQixzQkFBckIsY0FBaUQsdUJBQU87QUFBQSxFQUd2RCxNQUFNLFNBQVM7QUFDZCxVQUFNLEtBQUssYUFBYTtBQUd4QixRQUFJLEtBQUssU0FBUyx1QkFBdUI7QUFDeEMsWUFBTSxnQkFBZ0IsS0FBSyxjQUFjLG9CQUFvQiw4QkFBOEIsQ0FBQyxRQUFvQjtBQUMvRyxhQUFLLDJCQUEyQjtBQUFBLE1BQ2pDLENBQUM7QUFBQSxJQUNGO0FBR0EsU0FBSyxXQUFXO0FBQUEsTUFDZixJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixnQkFBZ0IsQ0FBQyxRQUFnQixTQUF1QjtBQUN2RCxhQUFLLHNCQUFzQixNQUFNO0FBQUEsTUFDbEM7QUFBQSxJQUNELENBQUM7QUFHRCxTQUFLLGNBQWMsSUFBSSx3QkFBd0IsS0FBSyxLQUFLLElBQUksQ0FBQztBQUFBLEVBQy9EO0FBQUEsRUFFQSxXQUFXO0FBQUEsRUFFWDtBQUFBO0FBQUEsRUFHQSw2QkFBNkI7QUFDNUIsVUFBTSxhQUFhLEtBQUssSUFBSSxVQUFVLG9CQUFvQiw0QkFBWTtBQUN0RSxRQUFJLFlBQVk7QUFDZixZQUFNLFNBQVMsV0FBVztBQUMxQixXQUFLLHNCQUFzQixNQUFNO0FBQUEsSUFDbEMsT0FBTztBQUNOLFVBQUksdUJBQU8sc0JBQXNCO0FBQUEsSUFDbEM7QUFBQSxFQUNEO0FBQUE7QUFBQSxFQUdBLHNCQUFzQixRQUFnQjtBQUNyQyxVQUFNLGVBQWU7QUFHckIsVUFBTSxTQUFTLE9BQU8sVUFBVTtBQUdoQyxVQUFNLGNBQWMsT0FBTyxRQUFRLE9BQU8sSUFBSTtBQUM5QyxVQUFNLGVBQWUsWUFBWSxVQUFVLEdBQUcsT0FBTyxFQUFFO0FBQ3ZELFVBQU0sY0FBYyxZQUFZLFVBQVUsT0FBTyxFQUFFO0FBR25ELFVBQU0saUJBQWlCLGVBQWUsZUFBZTtBQUVyRCxXQUFPLFFBQVEsT0FBTyxNQUFNLGNBQWM7QUFHMUMsV0FBTyxVQUFVO0FBQUEsTUFDaEIsTUFBTSxPQUFPO0FBQUEsTUFDYixJQUFJLE9BQU8sS0FBSyxhQUFhO0FBQUEsSUFDOUIsQ0FBQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixTQUFLLFdBQVcsT0FBTyxPQUFPLENBQUMsR0FBRyxrQkFBa0IsTUFBTSxLQUFLLFNBQVMsQ0FBQztBQUFBLEVBQzFFO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDcEIsVUFBTSxLQUFLLFNBQVMsS0FBSyxRQUFRO0FBQUEsRUFDbEM7QUFDRDtBQUVBLElBQU0sMEJBQU4sY0FBc0MsaUNBQWlCO0FBQUEsRUFHdEQsWUFBWSxLQUFVLFFBQTZCO0FBQ2xELFVBQU0sS0FBSyxNQUFNO0FBQ2pCLFNBQUssU0FBUztBQUFBLEVBQ2Y7QUFBQSxFQUVBLFVBQWdCO0FBQ2YsVUFBTSxFQUFDLFlBQVcsSUFBSTtBQUV0QixnQkFBWSxNQUFNO0FBRWxCLGdCQUFZLFNBQVMsTUFBTSxFQUFDLE1BQU0sc0NBQXFDLENBQUM7QUFFeEUsUUFBSSx3QkFBUSxXQUFXLEVBQ3JCLFFBQVEsa0JBQWtCLEVBQzFCLFFBQVEsb0RBQStDLEVBQ3ZELFVBQVUsWUFBVSxPQUNuQixTQUFTLEtBQUssT0FBTyxTQUFTLHFCQUFxQixFQUNuRCxTQUFTLE9BQU8sVUFBVTtBQUMxQixXQUFLLE9BQU8sU0FBUyx3QkFBd0I7QUFDN0MsWUFBTSxLQUFLLE9BQU8sYUFBYTtBQUUvQixVQUFJLHVCQUFPLDBGQUEwRjtBQUFBLElBQ3RHLENBQUMsQ0FBQztBQUVKLGdCQUFZLFNBQVMsS0FBSztBQUFBLE1BQ3pCLE1BQU07QUFBQSxNQUNOLEtBQUs7QUFBQSxJQUNOLENBQUM7QUFBQSxFQUNGO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
