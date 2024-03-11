import {
  Editor,
  EditorPosition,
  App,
} from 'obsidian';

export const getLineStartPos = (editor: Editor): EditorPosition => ({
  line: editor.getCursor("head").line,
  ch: 0,
});

export const getLineEndPos = (
  editor: Editor,
): EditorPosition => ({
  line: editor.getCursor("head").line,
  ch: editor.getLine(editor.getCursor("head").line).length,
});


export const moveSelection = (
  editor: Editor,
  direction: 'up' | 'down' | 'left' | 'right',
) => {
  let head = editor.getCursor("head");
  let line = head.line;
  let ch = head.ch
  let newTo: EditorPosition;
  switch (direction) {
    case 'up':
      if (line === 0){
        newTo = { line: 0, ch:0};
      } else {      
        line = line - 1;
        newTo = { line: line, ch: Math.min(editor.getLine(line).length, ch) };
      }
      break;
    case 'down':
      line = line + 1;
      newTo = { line: line, ch: Math.min(editor.getLine(line).length, ch) };
      break;
    case 'left':
      if (ch === 0) {
        line = line - 1;
        newTo = { line: line, ch: editor.getLine(line).length };
      }
      else {
        newTo = { line: line, ch: ch - 1};
      }
      break;
    case 'right':
        newTo = { line: line, ch: ch + 1};
      break;
  }
  editor.setSelection(editor.getCursor("anchor"), newTo);
};

const isLetterCharacter = (char: string) => /\p{L}\p{M}*/u.test(char);

const isDigit = (char: string) => /\d/.test(char);

const isLetterOrDigit = (char: string) =>
  isLetterCharacter(char) || isDigit(char);

export const getWordStartPos = (editor: Editor): EditorPosition => {
  let lineHeight: number = editor.getCursor('head').line;
  let ch: number = editor.getCursor('head').ch;
  let lineText: string = editor.getLine(lineHeight);

  if (ch === 0 && lineHeight > 0) {
    lineHeight--;
    ch = editor.getLine(lineHeight).length;
  } else {
    if (lineHeight === 0){
      return {line:0, ch:0};
    }
  ch--;
  while (ch > 0 && isLetterOrDigit(lineText[ch - 1])) {
    ch--;
  }
  } 
  return { line: lineHeight, ch: ch };
}
export const getWordEndPos = (editor: Editor): EditorPosition => {
  let lineHeight: number = editor.getCursor('head').line;
  let ch: number = editor.getCursor('head').ch;
  let lineText: string = editor.getLine(lineHeight);

  if (ch === lineText.length) {
    lineHeight++;
    ch = 0;
  } else {
  ch++
  while (ch < lineText.length && isLetterOrDigit(lineText[ch])) {
    ch++;
  }
  }

  return { line: lineHeight, ch: ch };
}
  
export const goToHeading = (
  app: App,
  editor: Editor,
  boundary: 'prev' | 'next',
) => {
  const activeFile = app.workspace.getActiveFile();
  if (!activeFile){
    return;
  }
  const file = app.metadataCache.getFileCache(activeFile);
  if (!file || !file.headings || file.headings.length === 0) {
    return;
  }

  const { line } = editor.getCursor('from');
  let prevHeadingLine = 0;
  let nextHeadingLine = editor.lastLine();

  file.headings.forEach(({ position }) => {
    const { end: headingPos } = position;
    if (line > headingPos.line && headingPos.line > prevHeadingLine) {
      prevHeadingLine = headingPos.line;
    }
    if (line < headingPos.line && headingPos.line < nextHeadingLine) {
      nextHeadingLine = headingPos.line;
    }
  });

  editor.setCursor(
    boundary === 'prev'
      ? {line:prevHeadingLine, ch:0}
      : {line:nextHeadingLine, ch:0}
  );
};