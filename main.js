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
      this.addRibbonIcon("corner-down-left", "New line within table cell", (evt) => {
        this.insertNewlineInCurrentNote();
      });
    }
    this.addCommand({
      id: "insert-nl-at-cursor",
      name: "New line",
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
    editor.focus();
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
    new import_obsidian.Setting(containerEl).setName("New line within table cell settings").setHeading();
    new import_obsidian.Setting(containerEl).setName("Show ribbon icon").setDesc("Display the enter key (\u21B5) entry in the ribbon").addToggle((toggle) => toggle.setValue(this.plugin.settings.showNewlineRibbonIcon).onChange(async (value) => {
      this.plugin.settings.showNewlineRibbonIcon = value;
      await this.plugin.saveSettings();
      new import_obsidian.Notice("Please restart Obsidian or reload the plugin for the ribbon entry change to take effect.");
    }));
    new import_obsidian.Setting(containerEl).setName("About").setDesc('This plugin inserts one <br> tag for a new line within table cells. Use the ribbon icon (if enabled) or the "New line" command (Ctrl+P).');
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5zZXJ0X25ld2xpbmVfcGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25WaWV3LCBOb3RpY2UsIFBsdWdpbiwgUGx1Z2luU2V0dGluZ1RhYiwgU2V0dGluZyB9IGZyb20gJ29ic2lkaWFuJztcblxuLy8gUGx1Z2luIHRoYXQgYWRkcyAxIGNvbW1hbmQgYW5kIDEgb3B0aW9uYWwgcmliYm9uIGVudHJ5LlxuLy8gSXQgaW5zZXJ0cyBhbiBIVE1MIG5ld2xpbmUgYXQgdGhlIGN1cnNvciB3aXRoaW4gdGFibGUgY2VsbHNcblxuaW50ZXJmYWNlIEluc2VydE5ld2xpbmVQbHVnaW5TZXR0aW5ncyB7XG5cdHNob3dOZXdsaW5lUmliYm9uSWNvbjogYm9vbGVhbjtcbn1cblxuY29uc3QgREVGQVVMVF9TRVRUSU5HUzogSW5zZXJ0TmV3bGluZVBsdWdpblNldHRpbmdzID0ge1xuXHRzaG93TmV3bGluZVJpYmJvbkljb246IGZhbHNlXG59XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluc2VydE5ld2xpbmVQbHVnaW4gZXh0ZW5kcyBQbHVnaW4ge1xuXHRzZXR0aW5nczogSW5zZXJ0TmV3bGluZVBsdWdpblNldHRpbmdzO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gQ29uZGl0aW9uYWxseSBhZGQgdGhlIHJpYmJvbiBlbnRyeSBiYXNlZCBvbiBzZXR0aW5nc1xuXHRcdGlmICh0aGlzLnNldHRpbmdzLnNob3dOZXdsaW5lUmliYm9uSWNvbikge1xuXHRcdFx0dGhpcy5hZGRSaWJib25JY29uKCdjb3JuZXItZG93bi1sZWZ0JywgJ05ldyBsaW5lIHdpdGhpbiB0YWJsZSBjZWxsJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHR0aGlzLmluc2VydE5ld2xpbmVJbkN1cnJlbnROb3RlKCk7XG5cdFx0XHR9KTtcblx0XHR9XG5cblx0XHQvLyBDb21tYW5kIHRvIGluc2VydCBvbmUgbmV3bGluZSB0byB0aGUgY3VycmVudCBub3RlXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnaW5zZXJ0LW5sLWF0LWN1cnNvcicsXG5cdFx0XHRuYW1lOiAnTmV3IGxpbmUnLFxuXHRcdFx0aWNvbjogJ2Nvcm5lci1kb3duLWxlZnQnLFxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XG5cdFx0XHRcdHRoaXMuaW5zZXJ0TmV3bGluZUF0Q3Vyc29yKGVkaXRvcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGFkZCBvciByZW1vdmUgdGhlIG5ld2xpbmUgcmliYm9uIGljb25cblx0XHR0aGlzLmFkZFNldHRpbmdUYWIobmV3IEluc2VydE5ld2xpbmVTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cdH1cblxuXHRvbnVubG9hZCgpIHtcblxuXHR9XG5cblx0Ly8gTWV0aG9kIHRvIGFkZCBvbmUgSFRNTCBuZXdsaW5lIGVsZW1lbnQgdG8gdGhlIGN1cnJlbnQgbm90ZSAod29ya3MgZnJvbSBhbnl3aGVyZSlcblx0aW5zZXJ0TmV3bGluZUluQ3VycmVudE5vdGUoKSB7XG5cdFx0Y29uc3QgYWN0aXZlVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cdFx0aWYgKGFjdGl2ZVZpZXcpIHtcblx0XHRcdGNvbnN0IGVkaXRvciA9IGFjdGl2ZVZpZXcuZWRpdG9yO1xuXHRcdFx0dGhpcy5pbnNlcnROZXdsaW5lQXRDdXJzb3IoZWRpdG9yKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0bmV3IE5vdGljZSgnTm8gYWN0aXZlIG5vdGUgZm91bmQnKTtcblx0XHR9XG5cdH1cblxuXHQvLyBNZXRob2QgdG8gaW5zZXJ0IG9uZSBuZXdsaW5lIEhUTUwgZWxlbWVudCBhdCBjdXJzb3IgcG9zaXRpb25cblx0aW5zZXJ0TmV3bGluZUF0Q3Vyc29yKGVkaXRvcjogRWRpdG9yKSB7XG5cdFx0Y29uc3QgdGV4dFRvSW5zZXJ0ID0gJzxicj4nOyAvLyBIYXJkLWNvZGVkIGFzIHRoZXJlIGlzIG9ubHkgb25lIHBvc3NpYmxlIGxpbmUgYnJlYWtcblx0XHRcblx0XHQvLyBHZXQgY3Vyc29yIHBvc2l0aW9uIGJlZm9yZSBpbnNlcnRpb25cblx0XHRjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0XG5cdFx0Ly8gRm9yIEhUTUwgY29udGVudCBpbiB0YWJsZXMsIG1hbnVhbGx5IGJ1aWxkIHRoZSBsaW5lXG5cdFx0Y29uc3QgY3VycmVudExpbmUgPSBlZGl0b3IuZ2V0TGluZShjdXJzb3IubGluZSk7XG5cdFx0Y29uc3QgYmVmb3JlQ3Vyc29yID0gY3VycmVudExpbmUuc3Vic3RyaW5nKDAsIGN1cnNvci5jaCk7XG5cdFx0Y29uc3QgYWZ0ZXJDdXJzb3IgPSBjdXJyZW50TGluZS5zdWJzdHJpbmcoY3Vyc29yLmNoKTtcblx0XHRcblx0XHQvLyBEbyB0aGUgaW5zZXJ0aW9uIHVzaW5nIGEgYmVmb3JlIGFuZCBiZWhpbmQgY3Vyc29yIGluIGNhc2UgdGhlIGN1cnNvciBpcyBub3QgYXQgdGhlIGVuZCBvZiBhIGxpbmVcblx0XHRjb25zdCBuZXdMaW5lQ29udGVudCA9IGJlZm9yZUN1cnNvciArIHRleHRUb0luc2VydCArIGFmdGVyQ3Vyc29yO1xuXHRcdFxuXHRcdGVkaXRvci5zZXRMaW5lKGN1cnNvci5saW5lLCBuZXdMaW5lQ29udGVudCk7XG5cdFx0XG5cdFx0Ly8gTW92ZSB0aGUgY3Vyc29yIGJ5IHRoZSAjIG9mIGNoYXJzIGFzIG1vcmUgdGhhbiAxIGNoYXIgd2FzIGluc2VydGVkXG5cdFx0ZWRpdG9yLnNldEN1cnNvcih7XG5cdFx0XHRsaW5lOiBjdXJzb3IubGluZSxcblx0XHRcdGNoOiBjdXJzb3IuY2ggKyB0ZXh0VG9JbnNlcnQubGVuZ3RoXG5cdFx0fSk7XG5cdFx0XG5cdFx0Ly8gS2VlcCBrZXlib2FyZCB2aXNpYmxlIG9uIG1vYmlsZSBkZXZpY2VzIChBbmRyb2lkKVxuXHRcdGVkaXRvci5mb2N1cygpO1xuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cblxuY2xhc3MgSW5zZXJ0TmV3bGluZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cGx1Z2luOiBJbnNlcnROZXdsaW5lUGx1Z2luO1xuXG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwLCBwbHVnaW46IEluc2VydE5ld2xpbmVQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ05ldyBsaW5lIHdpdGhpbiB0YWJsZSBjZWxsIHNldHRpbmdzJylcblx0XHRcdC5zZXRIZWFkaW5nKCk7XG5cblx0XHRuZXcgU2V0dGluZyhjb250YWluZXJFbClcblx0XHRcdC5zZXROYW1lKCdTaG93IHJpYmJvbiBpY29uJylcblx0XHRcdC5zZXREZXNjKCdEaXNwbGF5IHRoZSBlbnRlciBrZXkgKFx1MjFCNSkgZW50cnkgaW4gdGhlIHJpYmJvbicpXG5cdFx0XHQuYWRkVG9nZ2xlKHRvZ2dsZSA9PiB0b2dnbGVcblx0XHRcdFx0LnNldFZhbHVlKHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dOZXdsaW5lUmliYm9uSWNvbilcblx0XHRcdFx0Lm9uQ2hhbmdlKGFzeW5jICh2YWx1ZSkgPT4ge1xuXHRcdFx0XHRcdHRoaXMucGx1Z2luLnNldHRpbmdzLnNob3dOZXdsaW5lUmliYm9uSWNvbiA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdG5ldyBOb3RpY2UoJ1BsZWFzZSByZXN0YXJ0IE9ic2lkaWFuIG9yIHJlbG9hZCB0aGUgcGx1Z2luIGZvciB0aGUgcmliYm9uIGVudHJ5IGNoYW5nZSB0byB0YWtlIGVmZmVjdC4nKTtcblx0XHRcdFx0fSkpO1xuXG5cdFx0bmV3IFNldHRpbmcoY29udGFpbmVyRWwpXG5cdFx0XHQuc2V0TmFtZSgnQWJvdXQnKVxuXHRcdFx0LnNldERlc2MoJ1RoaXMgcGx1Z2luIGluc2VydHMgb25lIDxicj4gdGFnIGZvciBhIG5ldyBsaW5lIHdpdGhpbiB0YWJsZSBjZWxscy4gVXNlIHRoZSByaWJib24gaWNvbiAoaWYgZW5hYmxlZCkgb3IgdGhlIFwiTmV3IGxpbmVcIiBjb21tYW5kIChDdHJsK1ApLicpO1xuXHR9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLHNCQUFxRjtBQVNyRixJQUFNLG1CQUFnRDtBQUFBLEVBQ3JELHVCQUF1QjtBQUN4QjtBQUVBLElBQXFCLHNCQUFyQixjQUFpRCx1QkFBTztBQUFBLEVBR3ZELE1BQU0sU0FBUztBQUNkLFVBQU0sS0FBSyxhQUFhO0FBR3hCLFFBQUksS0FBSyxTQUFTLHVCQUF1QjtBQUN4QyxXQUFLLGNBQWMsb0JBQW9CLDhCQUE4QixDQUFDLFFBQW9CO0FBQ3pGLGFBQUssMkJBQTJCO0FBQUEsTUFDakMsQ0FBQztBQUFBLElBQ0Y7QUFHQSxTQUFLLFdBQVc7QUFBQSxNQUNmLElBQUk7QUFBQSxNQUNKLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOLGdCQUFnQixDQUFDLFFBQWdCLFNBQXVCO0FBQ3ZELGFBQUssc0JBQXNCLE1BQU07QUFBQSxNQUNsQztBQUFBLElBQ0QsQ0FBQztBQUdELFNBQUssY0FBYyxJQUFJLHdCQUF3QixLQUFLLEtBQUssSUFBSSxDQUFDO0FBQUEsRUFDL0Q7QUFBQSxFQUVBLFdBQVc7QUFBQSxFQUVYO0FBQUE7QUFBQSxFQUdBLDZCQUE2QjtBQUM1QixVQUFNLGFBQWEsS0FBSyxJQUFJLFVBQVUsb0JBQW9CLDRCQUFZO0FBQ3RFLFFBQUksWUFBWTtBQUNmLFlBQU0sU0FBUyxXQUFXO0FBQzFCLFdBQUssc0JBQXNCLE1BQU07QUFBQSxJQUNsQyxPQUFPO0FBQ04sVUFBSSx1QkFBTyxzQkFBc0I7QUFBQSxJQUNsQztBQUFBLEVBQ0Q7QUFBQTtBQUFBLEVBR0Esc0JBQXNCLFFBQWdCO0FBQ3JDLFVBQU0sZUFBZTtBQUdyQixVQUFNLFNBQVMsT0FBTyxVQUFVO0FBR2hDLFVBQU0sY0FBYyxPQUFPLFFBQVEsT0FBTyxJQUFJO0FBQzlDLFVBQU0sZUFBZSxZQUFZLFVBQVUsR0FBRyxPQUFPLEVBQUU7QUFDdkQsVUFBTSxjQUFjLFlBQVksVUFBVSxPQUFPLEVBQUU7QUFHbkQsVUFBTSxpQkFBaUIsZUFBZSxlQUFlO0FBRXJELFdBQU8sUUFBUSxPQUFPLE1BQU0sY0FBYztBQUcxQyxXQUFPLFVBQVU7QUFBQSxNQUNoQixNQUFNLE9BQU87QUFBQSxNQUNiLElBQUksT0FBTyxLQUFLLGFBQWE7QUFBQSxJQUM5QixDQUFDO0FBR0QsV0FBTyxNQUFNO0FBQUEsRUFDZDtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ3BCLFNBQUssV0FBVyxPQUFPLE9BQU8sQ0FBQyxHQUFHLGtCQUFrQixNQUFNLEtBQUssU0FBUyxDQUFDO0FBQUEsRUFDMUU7QUFBQSxFQUVBLE1BQU0sZUFBZTtBQUNwQixVQUFNLEtBQUssU0FBUyxLQUFLLFFBQVE7QUFBQSxFQUNsQztBQUNEO0FBRUEsSUFBTSwwQkFBTixjQUFzQyxpQ0FBaUI7QUFBQSxFQUd0RCxZQUFZLEtBQVUsUUFBNkI7QUFDbEQsVUFBTSxLQUFLLE1BQU07QUFDakIsU0FBSyxTQUFTO0FBQUEsRUFDZjtBQUFBLEVBRUEsVUFBZ0I7QUFDZixVQUFNLEVBQUMsWUFBVyxJQUFJO0FBRXRCLGdCQUFZLE1BQU07QUFFbEIsUUFBSSx3QkFBUSxXQUFXLEVBQ3JCLFFBQVEscUNBQXFDLEVBQzdDLFdBQVc7QUFFYixRQUFJLHdCQUFRLFdBQVcsRUFDckIsUUFBUSxrQkFBa0IsRUFDMUIsUUFBUSxvREFBK0MsRUFDdkQsVUFBVSxZQUFVLE9BQ25CLFNBQVMsS0FBSyxPQUFPLFNBQVMscUJBQXFCLEVBQ25ELFNBQVMsT0FBTyxVQUFVO0FBQzFCLFdBQUssT0FBTyxTQUFTLHdCQUF3QjtBQUM3QyxZQUFNLEtBQUssT0FBTyxhQUFhO0FBRS9CLFVBQUksdUJBQU8sMEZBQTBGO0FBQUEsSUFDdEcsQ0FBQyxDQUFDO0FBRUosUUFBSSx3QkFBUSxXQUFXLEVBQ3JCLFFBQVEsT0FBTyxFQUNmLFFBQVEsMElBQTBJO0FBQUEsRUFDcko7QUFDRDsiLAogICJuYW1lcyI6IFtdCn0K
