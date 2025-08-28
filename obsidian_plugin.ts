import { App, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	// Settings interface kept for future extensibility
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	// No settings needed for now
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();

		// This creates an icon in the left ribbon that adds text to the current note
		const ribbonIconEl = this.addRibbonIcon('corner-down-left', 'Insert inline line break (<br>)', (evt: MouseEvent) => {
			this.addTextToCurrentNote();
		});
		// Perform additional things with the ribbon
		ribbonIconEl.addClass('my-plugin-ribbon-class');

		// Command to add text to the current note
		this.addCommand({
			id: 'add-text-to-note',
			name: 'New Line',
			icon: 'corner-down-left',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertTextAtCursor(editor);
			}
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	// Method to add text to the current note (works from anywhere)
	addTextToCurrentNote() {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView) {
			const editor = activeView.editor;
			// Use the same insertion method
			this.insertTextAtCursor(editor);
		} else {
			new Notice('No active note found');
		}
	}

	// Method to insert text at cursor position
	insertTextAtCursor(editor: Editor) {
		const textToInsert = '<br>'; // Hard-coded line break
		
		// Get cursor position before insertion
		const cursor = editor.getCursor();
		
		// For HTML content in tables, manually build the line
		const currentLine = editor.getLine(cursor.line);
		const beforeCursor = currentLine.substring(0, cursor.ch);
		const afterCursor = currentLine.substring(cursor.ch);
		
		// Build new line content
		const newLineContent = beforeCursor + textToInsert + afterCursor;
		
		// Replace the line content (this was working for cursor positioning)
		editor.setLine(cursor.line, newLineContent);
		
		// Set cursor after the inserted text
		editor.setCursor({
			line: cursor.line,
			ch: cursor.ch + textToInsert.length
		});
		
		// Try to prevent extra line by ensuring we stay on same line
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
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const {contentEl} = this;
		contentEl.setText('Woah!');
	}

	onClose() {
		const {contentEl} = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		containerEl.createEl('p', {text: 'This plugin inserts <br> tags for line breaks in table cells. No configuration needed!'});
	}
}