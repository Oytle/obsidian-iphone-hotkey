import {App, Plugin, PluginSettingTab, Setting} from 'obsidian';
import {goToHeading,getLineStartPos,getLineEndPos,moveSelection,getWordStartPos,getWordEndPos} from './utils';
// Remember to rename these classes and interfaces!

interface MyPluginSettings {
	mySetting: string;
}

const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default'
}

export default class MyPlugin extends Plugin {
	settings: MyPluginSettings;

	async onload() {
		await this.loadSettings();


		this.addCommand({
			id: 'CU1',
			name: 'Cursor ↑',
			hotkeys: [
				{
				  modifiers: ['Mod'],
				  key: 'I',
				},
			  ],
			editorCallback: (editor) => editor.exec('goUp'),
		  });
		this.addCommand({
			id: 'CD1',
			name: 'Cursor ↓',
			hotkeys: [
				{
					modifiers: ['Mod'],
					key: 'K',
				},
				],
			editorCallback: (editor) => editor.exec('goDown'),
		});
		this.addCommand({
			id: 'CL1',
			name: 'Cursor ←',
			hotkeys: [
				{
				  modifiers: ['Mod'],
				  key: 'J',
				},
			  ],
			editorCallback: (editor) => editor.exec('goLeft'),
		  });
		this.addCommand({
			id: 'CR1',
			name: 'Cursor →',
			hotkeys: [
				{
					modifiers: ['Mod'],
					key: 'L',
				},
				],
			editorCallback: (editor) => editor.exec('goRight'),
		});
		this.addCommand({
			id: 'CL4',
			name: 'Cursor ←←←←',
			hotkeys: [
				{
				  modifiers: ['Mod'],
				  key: 'U',
				},
			  ],
			editorCallback: (editor) => {
			for(let i = 0; i < 4; i++) {
				editor.exec('goLeft');
			}
			},
		  });
		this.addCommand({
			id: 'CR4',
			name: 'Cursor →→→→',
			hotkeys: [
				{
					modifiers: ['Mod'],
					key: 'O',
				},
				],
			editorCallback: (editor) => {
				for(let i = 0; i < 4; i++) {
					editor.exec('goRight');
				}
			},
		});
		this.addCommand({
			id: 'CLW1',
			name: 'Cursor ← one word',
			hotkeys: [
				{
				  modifiers: ['Mod'],
				  key: 'M',
				},
			  ],
			editorCallback: (editor) => editor.exec('goWordLeft'),
		  });
		this.addCommand({
			id: 'CRW1',
			name: 'Cursor → one word',
			hotkeys: [
				{
					modifiers: ['Mod'],
					key: ',',
				},
				],
			editorCallback: (editor) => editor.exec('goWordRight'),
		});
		this.addCommand({
			id: 'CHome',
			name: 'Cursor ← line begining',
			hotkeys: [
				{
				  modifiers: ['Mod'],
				  key: 'Y',
				},
			  ],
			editorCallback: (editor) => editor.setCursor(getLineStartPos(editor)),
		});
		this.addCommand({
			id: 'CEnd',
			name: 'Cursor → line end',
			hotkeys: [
				{
					modifiers: ['Mod'],
					key: 'P',
				},
				],
			editorCallback: (editor) => editor.setCursor(getLineEndPos(editor)),
		});
		this.addCommand({
			id: 'CNextHeading',
			name: 'Cursor → next heading',
			editorCallback: (editor) => goToHeading(this.app, editor, 'next'),
		  });
	  
		  this.addCommand({
			id: 'CPrevHeading',
			name: 'Cursor ← previous heading',
			editorCallback: (editor) => goToHeading(this.app, editor, 'prev'),
		  });
		//selection
//uNDO
		this.addCommand({
			id: 'SU1',
			name: 'Select ↑',
			hotkeys: [
				{
				  modifiers: ['Alt', 'Mod'],
				  key: 'I',
				},
			  ],
			editorCallback: (editor) => moveSelection(editor, "up"),
		});
		this.addCommand({
			id: 'SD1',
			name: 'Select ↓',
			hotkeys: [
				{
					modifiers: ['Alt', 'Mod'],
					key: 'K',
				},
				],
			editorCallback: (editor) => moveSelection(editor, "down"),
		});
		this.addCommand({
			id: 'SL1',
			name: 'Select ←',
			hotkeys: [
				{
				  modifiers: ['Alt', 'Mod'],
				  key: 'J',
				},
			  ],
			editorCallback: (editor) => moveSelection(editor, "left"),
		});
		this.addCommand({
			id: 'SR1',
			name: 'Select →',
			hotkeys: [
				{
					modifiers: ['Alt', 'Mod'],
					key: 'L',
				},
				],
			editorCallback: (editor) => moveSelection(editor, "right"),
		});
		this.addCommand({
			id: 'SL4',
			name: 'Select ←←←←',
			hotkeys: [
				{
				  modifiers: ['Alt', 'Mod'],
				  key: 'U',
				},
			  ],
			editorCallback: (editor) => {
			for(let i = 0; i < 4; i++) {
				moveSelection(editor, "left")
			}
			},
		});
		this.addCommand({
			id: 'SR4',
			name: 'Select →→→→',
			hotkeys: [
				{
					modifiers: ['Alt', 'Mod'],
					key: 'O',
				},
				],
			editorCallback: (editor) => {
				for(let i = 0; i < 4; i++) {
					moveSelection(editor, "right")
				}
			},
		});
		this.addCommand({
			id: 'SLW1',
			name: 'Select ← one word',
			hotkeys: [
				{
				  modifiers: ['Alt', 'Mod'],
				  key: 'M',
				},
			  ],
			editorCallback: (editor) => {
				editor.setSelection(editor.getCursor("anchor"), getWordStartPos(editor))
			},
		});
		this.addCommand({
			id: 'SRW1',
			name: 'Select → one word',
			hotkeys: [
				{
					modifiers: ['Alt', 'Mod'],
					key: ',',
				},
				],
			editorCallback: (editor) => {
				editor.setSelection(editor.getCursor("anchor"), getWordEndPos(editor))
			}
		});
		this.addCommand({
			id: 'SHome',
			name: 'Select ← line begining',
			hotkeys: [
				{
				  modifiers: ['Alt', 'Mod'],
				  key: 'Y',
				},
			  ],
			  editorCallback: (editor) => {
				editor.setSelection(editor.getCursor("anchor"), getLineStartPos(editor))
			},
		  });
		this.addCommand({
			id: 'SEnd',
			name: 'Select → line end',
			hotkeys: [
				{
					modifiers: ['Alt', 'Mod'],
					key: 'P',
				},
				],
				editorCallback: (editor) => {
					editor.setSelection(editor.getCursor("anchor"), getLineEndPos(editor))
				},
		});

		// a second undo/redo/copy/paste/cut
		this.addCommand({
			id: '2ndUndo',
			name: 'just Undo',
			editorCallback: (editor) => editor.undo(),
		});
		this.addCommand({
			id: '2ndRedo',
			name: 'just Redo',
			editorCallback: (editor) => editor.redo(),
		});
		this.addCommand({
			id: '2ndCopy',
			name: 'just Copy',
			editorCallback: (editor) => {
			  const textToCopy = editor.getSelection();
			  navigator.clipboard.writeText(textToCopy);
			}
		  });
		  
		  this.addCommand({
			id: '2ndPaste', 
			name: 'just Paste',
			editorCallback: async (editor) => {
			  const clipboardContent = await navigator.clipboard.readText();
			  editor.replaceSelection(clipboardContent);
			}
		  });
		  
		  this.addCommand({
			id: '2ndCut', 
			name: 'just Cut',
			editorCallback: (editor) => {
			  const textToCut = editor.getSelection();
			  navigator.clipboard.writeText(textToCut);
			  editor.replaceSelection('');
			}
		  });

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));

		// If the plugin hooks up any global DOM events (on parts of the app that doesn't belong to this plugin)
		// Using this function will automatically remove the event listener when this plugin is disabled.
		this.registerDomEvent(document, 'click', (evt: MouseEvent) => {
			console.log('click', evt);
		});

		// When registering intervals, this function will automatically clear the interval when the plugin is disabled.
		this.registerInterval(window.setInterval(() => console.log('setInterval'), 5 * 60 * 1000));
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

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const {containerEl} = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Setting of This plugin')
			.setDesc('Remember to set the hotkeys and resolve the conflicts first!')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));
	}
}
