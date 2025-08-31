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
  showRibbonIcon: true
};
var MyPlugin = class extends import_obsidian.Plugin {
  async onload() {
    await this.loadSettings();
    if (this.settings.showRibbonIcon) {
      const ribbonIconEl = this.addRibbonIcon("corner-down-left", "New line within table cell", (evt) => {
        this.addTextToCurrentNote();
      });
      ribbonIconEl.addClass("my-plugin-ribbon-class");
    }
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
    containerEl.createEl("h2", { text: "New Line Break Inside Table Cell Settings" });
    new import_obsidian.Setting(containerEl).setName("Show ribbon icon").setDesc("Display the Enter key (\u21B5) icon in the left sidebar ribbon").addToggle((toggle) => toggle.setValue(this.plugin.settings.showRibbonIcon).onChange(async (value) => {
      this.plugin.settings.showRibbonIcon = value;
      await this.plugin.saveSettings();
      new import_obsidian.Notice("Please restart Obsidian or reload the plugin for the ribbon icon change to take effect.");
    }));
    containerEl.createEl("p", {
      text: 'This plugin inserts <br> tags for line breaks in table cells. Use the ribbon icon (if enabled) or the "New Line" command (Ctrl+P).',
      cls: "setting-item-description"
    });
  }
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsib2JzaWRpYW5fcGx1Z2luLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBBcHAsIEVkaXRvciwgTWFya2Rvd25WaWV3LCBNb2RhbCwgTm90aWNlLCBQbHVnaW4sIFBsdWdpblNldHRpbmdUYWIsIFNldHRpbmcgfSBmcm9tICdvYnNpZGlhbic7XG5cbi8vIFJlbWVtYmVyIHRvIHJlbmFtZSB0aGVzZSBjbGFzc2VzIGFuZCBpbnRlcmZhY2VzIVxuXG5pbnRlcmZhY2UgTXlQbHVnaW5TZXR0aW5ncyB7XG5cdHNob3dSaWJib25JY29uOiBib29sZWFuO1xufVxuXG5jb25zdCBERUZBVUxUX1NFVFRJTkdTOiBNeVBsdWdpblNldHRpbmdzID0ge1xuXHRzaG93UmliYm9uSWNvbjogdHJ1ZVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNeVBsdWdpbiBleHRlbmRzIFBsdWdpbiB7XG5cdHNldHRpbmdzOiBNeVBsdWdpblNldHRpbmdzO1xuXG5cdGFzeW5jIG9ubG9hZCgpIHtcblx0XHRhd2FpdCB0aGlzLmxvYWRTZXR0aW5ncygpO1xuXG5cdFx0Ly8gQ29uZGl0aW9uYWxseSBjcmVhdGUgcmliYm9uIGljb24gYmFzZWQgb24gc2V0dGluZ3Ncblx0XHRpZiAodGhpcy5zZXR0aW5ncy5zaG93UmliYm9uSWNvbikge1xuXHRcdFx0Y29uc3QgcmliYm9uSWNvbkVsID0gdGhpcy5hZGRSaWJib25JY29uKCdjb3JuZXItZG93bi1sZWZ0JywgJ05ldyBsaW5lIHdpdGhpbiB0YWJsZSBjZWxsJywgKGV2dDogTW91c2VFdmVudCkgPT4ge1xuXHRcdFx0XHR0aGlzLmFkZFRleHRUb0N1cnJlbnROb3RlKCk7XG5cdFx0XHR9KTtcblx0XHRcdC8vIFBlcmZvcm0gYWRkaXRpb25hbCB0aGluZ3Mgd2l0aCB0aGUgcmliYm9uXG5cdFx0XHRyaWJib25JY29uRWwuYWRkQ2xhc3MoJ215LXBsdWdpbi1yaWJib24tY2xhc3MnKTtcblx0XHR9XG5cblx0XHQvLyBDb21tYW5kIHRvIGFkZCB0ZXh0IHRvIHRoZSBjdXJyZW50IG5vdGVcblx0XHR0aGlzLmFkZENvbW1hbmQoe1xuXHRcdFx0aWQ6ICdhZGQtdGV4dC10by1ub3RlJyxcblx0XHRcdG5hbWU6ICdOZXcgTGluZScsXG5cdFx0XHRpY29uOiAnY29ybmVyLWRvd24tbGVmdCcsXG5cdFx0XHRlZGl0b3JDYWxsYmFjazogKGVkaXRvcjogRWRpdG9yLCB2aWV3OiBNYXJrZG93blZpZXcpID0+IHtcblx0XHRcdFx0dGhpcy5pbnNlcnRUZXh0QXRDdXJzb3IoZWRpdG9yKTtcblx0XHRcdH1cblx0XHR9KTtcblxuXHRcdC8vIFRoaXMgYWRkcyBhIHNldHRpbmdzIHRhYiBzbyB0aGUgdXNlciBjYW4gY29uZmlndXJlIHZhcmlvdXMgYXNwZWN0cyBvZiB0aGUgcGx1Z2luXG5cdFx0dGhpcy5hZGRTZXR0aW5nVGFiKG5ldyBTYW1wbGVTZXR0aW5nVGFiKHRoaXMuYXBwLCB0aGlzKSk7XG5cdH1cblxuXHQvLyBNZXRob2QgdG8gYWRkIHRleHQgdG8gdGhlIGN1cnJlbnQgbm90ZSAod29ya3MgZnJvbSBhbnl3aGVyZSlcblx0YWRkVGV4dFRvQ3VycmVudE5vdGUoKSB7XG5cdFx0Y29uc3QgYWN0aXZlVmlldyA9IHRoaXMuYXBwLndvcmtzcGFjZS5nZXRBY3RpdmVWaWV3T2ZUeXBlKE1hcmtkb3duVmlldyk7XG5cdFx0aWYgKGFjdGl2ZVZpZXcpIHtcblx0XHRcdGNvbnN0IGVkaXRvciA9IGFjdGl2ZVZpZXcuZWRpdG9yO1xuXHRcdFx0Ly8gVXNlIHRoZSBzYW1lIGluc2VydGlvbiBtZXRob2Rcblx0XHRcdHRoaXMuaW5zZXJ0VGV4dEF0Q3Vyc29yKGVkaXRvcik7XG5cdFx0fSBlbHNlIHtcblx0XHRcdG5ldyBOb3RpY2UoJ05vIGFjdGl2ZSBub3RlIGZvdW5kJyk7XG5cdFx0fVxuXHR9XG5cblx0Ly8gTWV0aG9kIHRvIGluc2VydCB0ZXh0IGF0IGN1cnNvciBwb3NpdGlvblxuXHRpbnNlcnRUZXh0QXRDdXJzb3IoZWRpdG9yOiBFZGl0b3IpIHtcblx0XHRjb25zdCB0ZXh0VG9JbnNlcnQgPSAnPGJyPic7IC8vIEhhcmQtY29kZWQgbGluZSBicmVha1xuXHRcdFxuXHRcdC8vIEdldCBjdXJzb3IgcG9zaXRpb24gYmVmb3JlIGluc2VydGlvblxuXHRcdGNvbnN0IGN1cnNvciA9IGVkaXRvci5nZXRDdXJzb3IoKTtcblx0XHRcblx0XHQvLyBGb3IgSFRNTCBjb250ZW50IGluIHRhYmxlcywgbWFudWFsbHkgYnVpbGQgdGhlIGxpbmVcblx0XHRjb25zdCBjdXJyZW50TGluZSA9IGVkaXRvci5nZXRMaW5lKGN1cnNvci5saW5lKTtcblx0XHRjb25zdCBiZWZvcmVDdXJzb3IgPSBjdXJyZW50TGluZS5zdWJzdHJpbmcoMCwgY3Vyc29yLmNoKTtcblx0XHRjb25zdCBhZnRlckN1cnNvciA9IGN1cnJlbnRMaW5lLnN1YnN0cmluZyhjdXJzb3IuY2gpO1xuXHRcdFxuXHRcdC8vIEJ1aWxkIG5ldyBsaW5lIGNvbnRlbnRcblx0XHRjb25zdCBuZXdMaW5lQ29udGVudCA9IGJlZm9yZUN1cnNvciArIHRleHRUb0luc2VydCArIGFmdGVyQ3Vyc29yO1xuXHRcdFxuXHRcdC8vIFJlcGxhY2UgdGhlIGxpbmUgY29udGVudCAodGhpcyB3YXMgd29ya2luZyBmb3IgY3Vyc29yIHBvc2l0aW9uaW5nKVxuXHRcdGVkaXRvci5zZXRMaW5lKGN1cnNvci5saW5lLCBuZXdMaW5lQ29udGVudCk7XG5cdFx0XG5cdFx0Ly8gU2V0IGN1cnNvciBhZnRlciB0aGUgaW5zZXJ0ZWQgdGV4dFxuXHRcdGVkaXRvci5zZXRDdXJzb3Ioe1xuXHRcdFx0bGluZTogY3Vyc29yLmxpbmUsXG5cdFx0XHRjaDogY3Vyc29yLmNoICsgdGV4dFRvSW5zZXJ0Lmxlbmd0aFxuXHRcdH0pO1xuXHRcdFxuXHRcdC8vIFRyeSB0byBwcmV2ZW50IGV4dHJhIGxpbmUgYnkgZW5zdXJpbmcgd2Ugc3RheSBvbiBzYW1lIGxpbmVcblx0XHRlZGl0b3IuZm9jdXMoKTtcblx0fVxuXG5cdG9udW5sb2FkKCkge1xuXG5cdH1cblxuXHRhc3luYyBsb2FkU2V0dGluZ3MoKSB7XG5cdFx0dGhpcy5zZXR0aW5ncyA9IE9iamVjdC5hc3NpZ24oe30sIERFRkFVTFRfU0VUVElOR1MsIGF3YWl0IHRoaXMubG9hZERhdGEoKSk7XG5cdH1cblxuXHRhc3luYyBzYXZlU2V0dGluZ3MoKSB7XG5cdFx0YXdhaXQgdGhpcy5zYXZlRGF0YSh0aGlzLnNldHRpbmdzKTtcblx0fVxufVxuXG5jbGFzcyBTYW1wbGVNb2RhbCBleHRlbmRzIE1vZGFsIHtcblx0Y29uc3RydWN0b3IoYXBwOiBBcHApIHtcblx0XHRzdXBlcihhcHApO1xuXHR9XG5cblx0b25PcGVuKCkge1xuXHRcdGNvbnN0IHtjb250ZW50RWx9ID0gdGhpcztcblx0XHRjb250ZW50RWwuc2V0VGV4dCgnV29haCEnKTtcblx0fVxuXG5cdG9uQ2xvc2UoKSB7XG5cdFx0Y29uc3Qge2NvbnRlbnRFbH0gPSB0aGlzO1xuXHRcdGNvbnRlbnRFbC5lbXB0eSgpO1xuXHR9XG59XG5cbmNsYXNzIFNhbXBsZVNldHRpbmdUYWIgZXh0ZW5kcyBQbHVnaW5TZXR0aW5nVGFiIHtcblx0cGx1Z2luOiBNeVBsdWdpbjtcblxuXHRjb25zdHJ1Y3RvcihhcHA6IEFwcCwgcGx1Z2luOiBNeVBsdWdpbikge1xuXHRcdHN1cGVyKGFwcCwgcGx1Z2luKTtcblx0XHR0aGlzLnBsdWdpbiA9IHBsdWdpbjtcblx0fVxuXG5cdGRpc3BsYXkoKTogdm9pZCB7XG5cdFx0Y29uc3Qge2NvbnRhaW5lckVsfSA9IHRoaXM7XG5cblx0XHRjb250YWluZXJFbC5lbXB0eSgpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ2gyJywge3RleHQ6ICdOZXcgTGluZSBCcmVhayBJbnNpZGUgVGFibGUgQ2VsbCBTZXR0aW5ncyd9KTtcblxuXHRcdG5ldyBTZXR0aW5nKGNvbnRhaW5lckVsKVxuXHRcdFx0LnNldE5hbWUoJ1Nob3cgcmliYm9uIGljb24nKVxuXHRcdFx0LnNldERlc2MoJ0Rpc3BsYXkgdGhlIEVudGVyIGtleSAoXHUyMUI1KSBpY29uIGluIHRoZSBsZWZ0IHNpZGViYXIgcmliYm9uJylcblx0XHRcdC5hZGRUb2dnbGUodG9nZ2xlID0+IHRvZ2dsZVxuXHRcdFx0XHQuc2V0VmFsdWUodGhpcy5wbHVnaW4uc2V0dGluZ3Muc2hvd1JpYmJvbkljb24pXG5cdFx0XHRcdC5vbkNoYW5nZShhc3luYyAodmFsdWUpID0+IHtcblx0XHRcdFx0XHR0aGlzLnBsdWdpbi5zZXR0aW5ncy5zaG93UmliYm9uSWNvbiA9IHZhbHVlO1xuXHRcdFx0XHRcdGF3YWl0IHRoaXMucGx1Z2luLnNhdmVTZXR0aW5ncygpO1xuXHRcdFx0XHRcdFxuXHRcdFx0XHRcdC8vIFNob3cgbm90aWNlIHRoYXQgcmVzdGFydCBpcyBuZWVkZWRcblx0XHRcdFx0XHRuZXcgTm90aWNlKCdQbGVhc2UgcmVzdGFydCBPYnNpZGlhbiBvciByZWxvYWQgdGhlIHBsdWdpbiBmb3IgdGhlIHJpYmJvbiBpY29uIGNoYW5nZSB0byB0YWtlIGVmZmVjdC4nKTtcblx0XHRcdFx0fSkpO1xuXG5cdFx0Y29udGFpbmVyRWwuY3JlYXRlRWwoJ3AnLCB7XG5cdFx0XHR0ZXh0OiAnVGhpcyBwbHVnaW4gaW5zZXJ0cyA8YnI+IHRhZ3MgZm9yIGxpbmUgYnJlYWtzIGluIHRhYmxlIGNlbGxzLiBVc2UgdGhlIHJpYmJvbiBpY29uIChpZiBlbmFibGVkKSBvciB0aGUgXCJOZXcgTGluZVwiIGNvbW1hbmQgKEN0cmwrUCkuJyxcblx0XHRcdGNsczogJ3NldHRpbmctaXRlbS1kZXNjcmlwdGlvbidcblx0XHR9KTtcblx0fVxufSJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsc0JBQTRGO0FBUTVGLElBQU0sbUJBQXFDO0FBQUEsRUFDMUMsZ0JBQWdCO0FBQ2pCO0FBRUEsSUFBcUIsV0FBckIsY0FBc0MsdUJBQU87QUFBQSxFQUc1QyxNQUFNLFNBQVM7QUFDZCxVQUFN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
