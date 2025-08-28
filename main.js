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

// obsidian_plugin.ts
var obsidian_plugin_exports = {};
__export(obsidian_plugin_exports, {
  default: () => MyPlugin
});
module.exports = __toCommonJS(obsidian_plugin_exports);
var import_obsidian = require("obsidian");
var DEFAULT_SETTINGS = {
  // No settings needed for now
};
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    const ribbonIconEl = this.addRibbonIcon("corner-down-left", "Insert inline line break (<br>)", (evt) => {
      this.addTextToCurrentNote();
    });
    ribbonIconEl.addClass("my-plugin-ribbon-class");
    this.addCommand({
      id: "add-text-to-note",
      name: "New Line",
      icon: "corner-down-left",
      editorCallback: (editor, view) => {
        this.insertTextAtCursor(editor);
      }
    });
    this.addSettingTab(new SampleSettingTab(this.app, this));
  }
  // Method to add text to the current note (works from anywhere)
  addTextToCurrentNote() {
    const activeView = this.app.workspace.getActiveViewOfType(import_obsidian.MarkdownView);
    if (activeView) {
      const editor = activeView.editor;
      this.insertTextAtCursor(editor);
    } else {
      new import_obsidian.Notice("No active note found");
    }
  }
  // Method to insert text at cursor position
  insertTextAtCursor(editor) {
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
  onunload() {
  }
  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }
  async saveSettings() {
    await this.saveData(this.settings);
  }
};
var SampleSettingTab = class extends import_obsidian.PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }
  display() {
    const { containerEl } = this;
    containerEl.empty();
    containerEl.createEl("p", { text: "This plugin inserts <br> tags for line breaks in table cells. No configuration needed!" });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib2JzaWRpYW5fcGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25WaWV3LCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5cbi8vIFJlbWVtYmVyIHRvIHJlbmFtZSB0aGVzZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIVxuXG5pbnRlcmZhY2UgTXlQbHVnaW5TZXR0aW5ncyB7XG5cdC8vIFNldHRpbmdzIGludGVyZmFjZSBrZXB0IGZvciBmdXR1cmUgZXh0ZW5zaWJpbGl0eVxufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBNeVBsdWdpblNldHRpbmdzID0ge1xuXHQvLyBObyBzZXR0aW5ncyBuZWVkZWQgZm9yIG5vd1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBNeVBsdWdpblNldHRpbmdzO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gVGhpcyBjcmVhdGVzIGFuIGljb24gaW4gdGhlIGxlZnQgcmliYm9uIHRoYXQgYWRkcyB0ZXh0IHRvIHRoZSBjdXJyZW50IG5vdGVcblx0XHRjb25zdCByaWJib25JY29uRWwgPSB0aGlzLmFkZFJpYmJvbkljb24oJ2Nvcm5lci1kb3duLWxlZnQnLCAnSW5zZXJ0IGlubGluZSBsaW5lIGJyZWFrICg8YnI+KScsIChldnQ6IE1vdXNlRXZlbnQpID0+IHtcblx0XHRcdHRoaXMuYWRkVGV4dFRvQ3VycmVudE5vdGUoKTtcblx0XHR9KTtcblx0XHQvLyBQZXJmb3JtIGFkZGl0aW9uYWwgdGhpbmdzIHdpdGggdGhlIHJpYmJvblxuXHRcdHJpYmJvbkljb25FbC5hZGRDbGFzcygnbXktcGx1Z2luLXJpYmJvbi1jbGFzcycpO1xuXG5cdFx0Ly8gQ29tbWFuZCB0byBhZGQgdGV4dCB0byB0aGUgY3VycmVudCBub3RlXG5cdFx0dGhpcy5hZGRDb21tYW5kKHtcblx0XHRcdGlkOiAnYWRkLXRleHQtdG8tbm90ZScsXG5cdFx0XHRuYW1lOiAnTmV3IExpbmUnLFxuXHRcdFx0aWNvbjogJ2Nvcm5lci1kb3duLWxlZnQnLFxuXHRcdFx0ZWRpdG9yQ2FsbGJhY2s6IChlZGl0b3I6IEVkaXRvciwgdmlldzogTWFya2Rvd25WaWV3KSA9PiB7XG5cdFx0XHRcdHRoaXMuaW5zZXJ0VGV4dEF0Q3Vyc29yKGVkaXRvcik7XG5cdFx0XHR9XG5cdFx0fSk7XG5cblx0XHQvLyBUaGlzIGFkZHMgYSBzZXR0aW5ncyB0YWIgc28gdGhlIHVzZXIgY2FuIGNvbmZpZ3VyZSB2YXJpb3VzIGFzcGVjdHMgb2YgdGhlIHBsdWdpblxuXHRcdHRoaXMuYWRkU2V0dGluZ1RhYihuZXcgU2FtcGxlU2V0dGluZ1RhYih0aGlzLmFwcCwgdGhpcykpO1xuXHR9XG5cblx0Ly8gTWV0aG9kIHRvIGFkZCB0ZXh0IHRvIHRoZSBjdXJyZW50IG5vdGUgKHdvcmtzIGZyb20gYW55d2hlcmUpXG5cdGFkZFRleHRUb0N1cnJlbnROb3RlKCkge1xuXHRcdGNvbnN0IGFjdGl2ZVZpZXcgPSB0aGlzLmFwcC53b3Jrc3BhY2UuZ2V0QWN0aXZlVmlld09mVHlwZShNYXJrZG93blZpZXcpO1xuXHRcdGlmIChhY3RpdmVWaWV3KSB7XG5cdFx0XHRjb25zdCBlZGl0b3IgPSBhY3RpdmVWaWV3LmVkaXRvcjtcblx0XHRcdC8vIFVzZSB0aGUgc2FtZSBpbnNlcnRpb24gbWV0aG9kXG5cdFx0XHR0aGlzLmluc2VydFRleHRBdEN1cnNvcihlZGl0b3IpO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRuZXcgTm90aWNlKCdObyBhY3RpdmUgbm90ZSBmb3VuZCcpO1xuXHRcdH1cblx0fVxuXG5cdC8vIE1ldGhvZCB0byBpbnNlcnQgdGV4dCBhdCBjdXJzb3IgcG9zaXRpb25cblx0aW5zZXJ0VGV4dEF0Q3Vyc29yKGVkaXRvcjogRWRpdG9yKSB7XG5cdFx0Y29uc3QgdGV4dFRvSW5zZXJ0ID0gJzxicj4nOyAvLyBIYXJkLWNvZGVkIGxpbmUgYnJlYWtcblx0XHRcblx0XHQvLyBHZXQgY3Vyc29yIHBvc2l0aW9uIGJlZm9yZSBpbnNlcnRpb25cblx0XHRjb25zdCBjdXJzb3IgPSBlZGl0b3IuZ2V0Q3Vyc29yKCk7XG5cdFx0XG5cdFx0Ly8gRm9yIEhUTUwgY29udGVudCBpbiB0YWJsZXMsIG1hbnVhbGx5IGJ1aWxkIHRoZSBsaW5lXG5cdFx0Y29uc3QgY3VycmVudExpbmUgPSBlZGl0b3IuZ2V0TGluZShjdXJzb3IubGluZSk7XG5cdFx0Y29uc3QgYmVmb3JlQ3Vyc29yID0gY3VycmVudExpbmUuc3Vic3RyaW5nKDAsIGN1cnNvci5jaCk7XG5cdFx0Y29uc3QgYWZ0ZXJDdXJzb3IgPSBjdXJyZW50TGluZS5zdWJzdHJpbmcoY3Vyc29yLmNoKTtcblx0XHRcblx0XHQvLyBCdWlsZCBuZXcgbGluZSBjb250ZW50XG5cdFx0Y29uc3QgbmV3TGluZUNvbnRlbnQgPSBiZWZvcmVDdXJzb3IgKyB0ZXh0VG9JbnNlcnQgKyBhZnRlckN1cnNvcjtcblx0XHRcblx0XHQvLyBSZXBsYWNlIHRoZSBsaW5lIGNvbnRlbnQgKHRoaXMgd2FzIHdvcmtpbmcgZm9yIGN1cnNvciBwb3NpdGlvbmluZylcblx0XHRlZGl0b3Iuc2V0TGluZShjdXJzb3IubGluZSwgbmV3TGluZUNvbnRlbnQpO1xuXHRcdFxuXHRcdC8vIFNldCBjdXJzb3IgYWZ0ZXIgdGhlIGluc2VydGVkIHRleHRcblx0XHRlZGl0b3Iuc2V0Q3Vyc29yKHtcblx0XHRcdGxpbmU6IGN1cnNvci5saW5lLFxuXHRcdFx0Y2g6IGN1cnNvci5jaCArIHRleHRUb0luc2VydC5sZW5ndGhcblx0XHR9KTtcblx0XHRcblx0XHQvLyBUcnkgdG8gcHJldmVudCBleHRyYSBsaW5lIGJ5IGVuc3VyaW5nIHdlIHN0YXkgb24gc2FtZSBsaW5lXG5cdFx0ZWRpdG9yLmZvY3VzKCk7XG5cdH1cblxuXHRvbnVubG9hZCgpIHtcblxuXHR9XG5cblx0YXN5bmMgbG9hZFNldHRpbmdzKCkge1xuXHRcdHRoaXMuc2V0dGluZ3MgPSBPYmplY3QuYXNzaWduKHt9LCBERUZBVUxUX1NFVFRJTkdTLCBhd2FpdCB0aGlzLmxvYWREYXRhKCkpO1xuXHR9XG5cblx0YXN5bmMgc2F2ZVNldHRpbmdzKCkge1xuXHRcdGF3YWl0IHRoaXMuc2F2ZURhdGEodGhpcy5zZXR0aW5ncyk7XG5cdH1cbn1cblxuY2xhc3MgU2FtcGxlTW9kYWwgZXh0ZW5kcyBNb2RhbCB7XG5cdGNvbnN0cnVjdG9yKGFwcDogQXBwKSB7XG5cdFx0c3VwZXIoYXBwKTtcblx0fVxuXG5cdG9uT3BlbigpIHtcblx0XHRjb25zdCB7Y29udGVudEVsfSA9IHRoaXM7XG5cdFx0Y29udGVudEVsLnNldFRleHQoJ1dvYWghJyk7XG5cdH1cblxuXHRvbkNsb3NlKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuZW1wdHkoKTtcblx0fVxufVxuXG5jbGFzcyBTYW1wbGVTZXR0aW5nVGFiIGV4dGVuZHMgUGx1Z2luU2V0dGluZ1RhYiB7XG5cdHBsdWdpbjogTXlQbHVnaW47XG5cblx0Y29uc3RydWN0b3IoYXBwOiBBcHAsIHBsdWdpbjogTXlQbHVnaW4pIHtcblx0XHRzdXBlcihhcHAsIHBsdWdpbik7XG5cdFx0dGhpcy5wbHVnaW4gPSBwbHVnaW47XG5cdH1cblxuXHRkaXNwbGF5KCk6IHZvaWQge1xuXHRcdGNvbnN0IHtjb250YWluZXJFbH0gPSB0aGlzO1xuXG5cdFx0Y29udGFpbmVyRWwuZW1wdHkoKTtcblxuXHRcdGNvbnRhaW5lckVsLmNyZWF0ZUVsKCdwJywge3RleHQ6ICdUaGlzIHBsdWdpbiBpbnNlcnRzIDxicj4gdGFncyBmb3IgbGluZSBicmVha3MgaW4gdGFibGUgY2VsbHMuIE5vIGNvbmZpZ3VyYXRpb24gbmVlZGVkISd9KTtcblx0fVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQTRGO0FBUTVGLElBQU0sbUJBQXFDO0FBQUE7QUFFM0M7QUFFQSxJQUFxQixXQUFyQixjQUFzQyx1QkFBTztBQUFBLEVBRzVDLE1BQU0sU0FBUztBQUNkLFVBQU0sS0FBSyxhQUFhO0FBR3hCLFVBQU0sZUFBZSxLQUFLLGNBQWMsb0JBQW9CLG1DQUFtQyxDQUFDLFFBQW9CO0FBQ25ILFdBQUsscUJBQXFCO0FBQUEsSUFDM0IsQ0FBQztBQUVELGlCQUFhLFNBQVMsd0JBQXdCO0FBRzlDLFNBQUssV0FBVztBQUFBLE1BQ2YsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sZ0JBQWdCLENBQUMsUUFBZ0IsU0FBdUI7QUFDdkQsYUFBSyxtQkFBbUIsTUFBTTtBQUFBLE1BQy9CO0FBQUEsSUFDRCxDQUFDO0FBR0QsU0FBSyxjQUFjLElBQUksaUJBQWlCLEtBQUssS0FBSyxJQUFJLENBQUM7QUFBQSxFQUN4RDtBQUFBO0FBQUEsRUFHQSx1QkFBdUI7QUFDdEIsVUFBTSxhQUFhLEtBQUssSUFBSSxVQUFVLG9CQUFvQiw0QkFBWTtBQUN0RSxRQUFJLFlBQVk7QUFDZixZQUFNLFNBQVMsV0FBVztBQUUxQixXQUFLLG1CQUFtQixNQUFNO0FBQUEsSUFDL0IsT0FBTztBQUNOLFVBQUksdUJBQU8sc0JBQXNCO0FBQUEsSUFDbEM7QUFBQSxFQUNEO0FBQUE7QUFBQSxFQUdBLG1CQUFtQixRQUFnQjtBQUNsQyxVQUFNLGVBQWU7QUFHckIsVUFBTSxTQUFTLE9BQU8sVUFBVTtBQUdoQyxVQUFNLGNBQWMsT0FBTyxRQUFRLE9BQU8sSUFBSTtBQUM5QyxVQUFNLGVBQWUsWUFBWSxVQUFVLEdBQUcsT0FBTyxFQUFFO0FBQ3ZELFVBQU0sY0FBYyxZQUFZLFVBQVUsT0FBTyxFQUFFO0FBR25ELFVBQU0saUJBQWlCLGVBQWUsZUFBZTtBQUdyRCxXQUFPLFFBQVEsT0FBTyxNQUFNLGNBQWM7QUFHMUMsV0FBTyxVQUFVO0FBQUEsTUFDaEIsTUFBTSxPQUFPO0FBQUEsTUFDYixJQUFJLE9BQU8sS0FBSyxhQUFhO0FBQUEsSUFDOUIsQ0FBQztBQUdELFdBQU8sTUFBTTtBQUFBLEVBQ2Q7QUFBQSxFQUVBLFdBQVc7QUFBQSxFQUVYO0FBQUEsRUFFQSxNQUFNLGVBQWU7QUFDcEIsU0FBSyxXQUFXLE9BQU8sT0FBTyxDQUFDLEdBQUcsa0JBQWtCLE1BQU0sS0FBSyxTQUFTLENBQUM7QUFBQSxFQUMxRTtBQUFBLEVBRUEsTUFBTSxlQUFlO0FBQ3BCLFVBQU0sS0FBSyxTQUFTLEtBQUssUUFBUTtBQUFBLEVBQ2xDO0FBQ0Q7QUFrQkEsSUFBTSxtQkFBTixjQUErQixpQ0FBaUI7QUFBQSxFQUcvQyxZQUFZLEtBQVUsUUFBa0I7QUFDdkMsVUFBTSxLQUFLLE1BQU07QUFDakIsU0FBSyxTQUFTO0FBQUEsRUFDZjtBQUFBLEVBRUEsVUFBZ0I7QUFDZixVQUFNLEVBQUMsWUFBVyxJQUFJO0FBRXRCLGdCQUFZLE1BQU07QUFFbEIsZ0JBQVksU0FBUyxLQUFLLEVBQUMsTUFBTSx5RkFBd0YsQ0FBQztBQUFBLEVBQzNIO0FBQ0Q7IiwKICAibmFtZXMiOiBbXQp9Cg==
