"use client";

import { useState } from "react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";
import DOMPurify from "dompurify";
import {
  Bold,
  Italic,
  Strikethrough,
  List,
  ListOrdered,
  Link as LinkIcon,
  Image as ImageIcon,
  Heading2,
  Heading3,
  Quote,
  Code,
} from "lucide-react";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export default function TiptapEditor({ value, onChange }: TiptapEditorProps) {
  // Transaction tick state ensures toolbar buttons immediately re-render on cursor movement or toggle clicks
  const [, setSelectionTick] = useState(0);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3],
        },
      }),
      Link.configure({ openOnClick: false }),
      Image,
    ],
    content: value,
    onSelectionUpdate: () => {
      setSelectionTick((t) => t + 1);
    },
    onTransaction: () => {
      setSelectionTick((t) => t + 1);
    },
    onUpdate: ({ editor }) => {
      const html = editor.getHTML();
      const sanitized = DOMPurify.sanitize(html);
      onChange(sanitized);
    },
    editorProps: {
      attributes: {
        class:
          "prose max-w-none focus:outline-none min-h-[360px] border border-border-default rounded-xl p-5 bg-bg-surface text-text-body",
      },
    },
  });

  if (!editor) {
    return null;
  }

  const addLink = () => {
    const previousUrl = editor.getAttributes("link").href;
    const url = window.prompt("Enter URL (https://...)", previousUrl);
    if (url === null) return;
    if (url === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      setSelectionTick((t) => t + 1);
      return;
    }
    editor.chain().focus().extendMarkRange("link").setLink({ href: url }).run();
    setSelectionTick((t) => t + 1);
  };

  const addImage = () => {
    const url = window.prompt("Enter Workplace Image URL (https://...)");
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setSelectionTick((t) => t + 1);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {/* Editor Toolbar with accurate active toggle highlights */}
      <div
        className="flex flex-wrap items-center gap-1.5 border border-border-default p-2 rounded-xl bg-bg-surface-subtle"
        role="toolbar"
        aria-label="Editor formatting toolbar"
      >
        {/* Bold */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleBold().run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("bold")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Bold text"
          aria-pressed={editor.isActive("bold")}
          title="Bold (Ctrl+B)"
        >
          <Bold className="w-4 h-4" />
        </button>

        {/* Italic */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleItalic().run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("italic")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Italic text"
          aria-pressed={editor.isActive("italic")}
          title="Italic (Ctrl+I)"
        >
          <Italic className="w-4 h-4" />
        </button>

        {/* Strike-through */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleStrike().run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("strike")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Strike text"
          aria-pressed={editor.isActive("strike")}
          title="Strikethrough"
        >
          <Strikethrough className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-border-default mx-1 hidden sm:block" />

        {/* Heading 2 */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 2 }).run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("heading", { level: 2 })
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Heading 2"
          aria-pressed={editor.isActive("heading", { level: 2 })}
          title="Heading 2"
        >
          <Heading2 className="w-4 h-4" />
        </button>

        {/* Heading 3 */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleHeading({ level: 3 }).run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("heading", { level: 3 })
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Heading 3"
          aria-pressed={editor.isActive("heading", { level: 3 })}
          title="Heading 3"
        >
          <Heading3 className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-border-default mx-1 hidden sm:block" />

        {/* Bullet List */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleBulletList().run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("bulletList")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Bullet list"
          aria-pressed={editor.isActive("bulletList")}
          title="Bullet List"
        >
          <List className="w-4 h-4" />
        </button>

        {/* Ordered List */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleOrderedList().run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("orderedList")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Numbered list"
          aria-pressed={editor.isActive("orderedList")}
          title="Numbered List"
        >
          <ListOrdered className="w-4 h-4" />
        </button>

        {/* Blockquote */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => {
            editor.chain().focus().toggleBlockquote().run();
            setSelectionTick((t) => t + 1);
          }}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("blockquote")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Blockquote"
          aria-pressed={editor.isActive("blockquote")}
          title="Quote Block"
        >
          <Quote className="w-4 h-4" />
        </button>

        <div className="h-5 w-px bg-border-default mx-1 hidden sm:block" />

        {/* Link */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={addLink}
          className={`p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg transition-all ${
            editor.isActive("link")
              ? "bg-slate-950 text-white dark:bg-slate-100 dark:text-slate-950 font-bold shadow-xs scale-105"
              : "text-text-muted hover:bg-bg-surface hover:text-text-heading"
          }`}
          aria-label="Insert link"
          aria-pressed={editor.isActive("link")}
          title="Insert Link"
        >
          <LinkIcon className="w-4 h-4" />
        </button>

        {/* Image */}
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={addImage}
          className="p-2 min-h-[38px] min-w-[38px] flex items-center justify-center rounded-lg text-text-muted hover:bg-bg-surface hover:text-text-heading transition-colors"
          aria-label="Insert image"
          title="Insert Workplace Image"
        >
          <ImageIcon className="w-4 h-4" />
        </button>
      </div>

      <EditorContent editor={editor} />
    </div>
  );
}
