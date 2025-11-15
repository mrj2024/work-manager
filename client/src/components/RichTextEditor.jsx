import { useEffect } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';

const toolbarButtons = [
  { action: 'toggleBold', label: 'B' },
  { action: 'toggleItalic', label: 'I' },
  { action: 'toggleUnderline', label: 'U' },
  { action: 'toggleBulletList', label: '•' },
  { action: 'toggleOrderedList', label: '1.' },
  { action: 'setParagraph', label: 'P' },
  { action: 'setHeading', options: { level: 2 }, label: 'H2' }
];

const RichTextEditor = ({ value, onChange }) => {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3, 4] } }),
      Link.configure({ openOnClick: true }),
      Image
    ],
    content: value,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    }
  });

  useEffect(
    () => () => {
      editor?.destroy();
    },
    [editor]
  );

  if (!editor) return null;

  const handleAction = (action, options) => {
    if (action === 'setHeading') {
      editor.chain().focus()[action](options).run();
    } else if (action === 'toggleUnderline') {
      document.execCommand('underline');
    } else {
      editor.chain().focus()[action]().run();
    }
  };

  return (
    <div className="rounded-lg border border-slate-200 bg-white">
      <div className="flex flex-wrap gap-2 border-b border-slate-200 p-3">
        {toolbarButtons.map((button) => (
          <button
            key={button.label}
            type="button"
            onClick={() => handleAction(button.action, button.options)}
            className="rounded border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100"
          >
            {button.label}
          </button>
        ))}
        <button
          type="button"
          onClick={() => {
            const url = prompt('Image URL');
            if (url) editor.chain().focus().setImage({ src: url }).run();
          }}
          className="rounded border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600"
        >
          Image
        </button>
        <button
          type="button"
          onClick={() => {
            const href = prompt('Link URL');
            if (href) editor.chain().focus().setLink({ href }).run();
          }}
          className="rounded border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600"
        >
          Link
        </button>
      </div>
      <EditorContent editor={editor} className="prose max-w-none p-4" />
    </div>
  );
};

export default RichTextEditor;
