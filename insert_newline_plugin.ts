import { App, Editor, MarkdownView, Notice, Plugin, PluginSettingTab, Setting } from 'obsidian';

// Plugin that adds 1 command and 1 optional ribbon entry.
// It inserts an HTML newline at the cursor within table cells

interface InsertNewlinePluginSettings {
	showNewlineRibbonIcon: boolean;
}

const DEFAULT_SETTINGS: InsertNewlinePluginSettings = {
	showNewlineRibbonIcon: false
}

export default class InsertNewlinePlugin extends Plugin {
	settings: InsertNewlinePluginSettings;

	async onload() {
		await this.loadSettings();

		// Conditionally add the ribbon entry based on settings
		if (this.settings.showNewlineRibbonIcon) {
			this.addRibbonIcon('corner-down-left', 'New line within table cell', (evt: MouseEvent) => {
				this.insertNewlineInCurrentNote();
			});
		}

		// Command to insert one newline to the current note
		this.addCommand({
			id: 'insert-nl-at-cursor',
			name: 'New line',
			icon: 'corner-down-left',
			editorCallback: (editor: Editor, view: MarkdownView) => {
				this.insertNewlineAtCursor(editor);
			}
		});

		// This adds a settings tab so the user can add or remove the newline ribbon icon
		this.addSettingTab(new InsertNewlineSettingTab(this.app, this));
	}

	onunload() {

	}

	// Method to add one HTML newline element to the current note (works from anywhere)
	insertNewlineInCurrentNote() {
		const activeView = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (activeView) {
			const editor = activeView.editor;
			this.insertNewlineAtCursor(editor);
		} else {
			new Notice('No active note found');
		}
	}

	// Method to insert one newline HTML element at cursor position
	insertNewlineAtCursor(editor: Editor) {
		const textToInsert = '<br>'; // Hard-coded as there is only one possible line break
		
		// Get cursor position before insertion
		const cursor = editor.getCursor();
		
		// For HTML content in tables, manually build the line
		const currentLine = editor.getLine(cursor.line);
		const beforeCursor = currentLine.substring(0, cursor.ch);
		const afterCursor = currentLine.substring(cursor.ch);
		
		// Do the insertion using a before and behind cursor in case the cursor is not at the end of a line
		const newLineContent = beforeCursor + textToInsert + afterCursor;
		
		editor.setLine(cursor.line, newLineContent);
		
		// Move the cursor by the # of chars as more than 1 char was inserted
		editor.setCursor({
			line: cursor.line,
			ch: cursor.ch + textToInsert.length
		});
		
		// Keep keyboard visible on mobile devices (Android)
		editor.focus();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}
}

class InsertNewlineSettingTab extends PluginSettingTab {
	plugin: InsertNewlinePlugin;

	constructor(app: App, plugin: InsertNewlinePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('New Line within Table Cell')
			.setHeading();

		new Setting(containerEl)
			.setName('Show ribbon icon')
			.setDesc('Display the enter key (↵) entry in the ribbon')
			.addToggle(toggle => toggle
				.setValue(this.plugin.settings.showNewlineRibbonIcon)
				.onChange(async (value) => {
					this.plugin.settings.showNewlineRibbonIcon = value;
					await this.plugin.saveSettings();
					
					new Notice('Please restart Obsidian or reload the plugin for the ribbon entry change to take effect.');
				}));

		new Setting(containerEl)
			.setName('About')
			.setDesc('This plugin inserts one <br> tag for a new line within table cells. Use the ribbon icon (if enabled) or the "New line" command (Ctrl+P).');
	}
}
