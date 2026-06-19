"use client";

import { useEffect, useRef, useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-text";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";
import "ace-builds/src-noconflict/keybinding-vim";

const initialBuffer = 
`
============================================================
========================= PLAY !! ==========================
============================================================
====                                                    ====
====            .--------------------.                  ====
====            |  SHUBHAM'S ARENA   |       |===|      ====
====            |                    |       |:::|      ====
====            |                    |       |===|      ====
====            |                    |       |===|      ====
====            |                    |       |:::|      ====
====            '--------------------'       |===|      ====
====              )----------------(     -- - - - --    ====
====              /:::::: | | hjkl \\      \\ no mouse \\  ====
====             /::::::: | |:::::::\\      \\ required \\ ====
============================================================
====          Created just to mess things up 😉         ====
============================================================

// Press dd to delete this line. Then press u to undo it. Now you know dd and u.
const hero = { name: "your_name", goal: "SDE-2", dream: "Google" };

// Move word by word with w and b. Jump to the G in Google with fG.
function slowCoder(bad, slow, painful) { return fast(good, clean); }

// Place cursor on any bracket and press % — try it on the { above.
const stack = ["algorithms", "system design", "vim", "coffee", "patience"];

// Search for the word slow using /slow — then replace with :%s/slow/fast/g
if (youPracticeDaily && youStayConsistent) { return dreamOffer; }

// Yank this entire paragraph with yap, then paste it below with p.
const truth = "The best time to learn vim was yesterday. Second best is now.";

// Vim is Fun !
`;

export default function VimPlayground() {
  const [buffer, setBuffer] = useState(initialBuffer);
  const [lastKey, setLastKey] = useState("-");
  const [repeatCount, setRepeatCount] = useState(0);
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastKeyRef = useRef("-");

  const formatKeyLabel = (event: KeyboardEvent): string | null => {
    if (event.key === "Shift" || event.key === "Control" || event.key === "Alt" || event.key === "Meta") {
      return null;
    }

    const mods: string[] = [];

    if (event.ctrlKey) {
      mods.push("Ctrl");
    }
    if (event.altKey) {
      mods.push("Alt");
    }
    if (event.metaKey) {
      mods.push("Meta");
    }
    if (event.shiftKey && event.key.length > 1) {
      mods.push("Shift");
    }

    let base = event.key;
    if (base === " ") {
      base = "Space";
    } else if (base === "Escape") {
      base = "Esc";
    } else if (base === "ArrowUp") {
      base = "Up";
    } else if (base === "ArrowDown") {
      base = "Down";
    } else if (base === "ArrowLeft") {
      base = "Left";
    } else if (base === "ArrowRight") {
      base = "Right";
    } else if (base === "Enter") {
      base = "Enter";
    } else if (base === "Tab") {
      base = "Tab";
    }

    return mods.length > 0 ? `${mods.join("+")}+${base}` : base;
  };

  const showKeyToast = (keyLabel: string) => {
    if (lastKeyRef.current === keyLabel) {
      setRepeatCount((prev) => prev + 1);
    } else {
      lastKeyRef.current = keyLabel;
      setLastKey(keyLabel);
      setRepeatCount(1);
    }

    setToastVisible(true);
    if (toastTimerRef.current) {
      clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = setTimeout(() => {
      setToastVisible(false);
      setRepeatCount(0);
      lastKeyRef.current = "-";
    }, 1800);
  };

  useEffect(() => {
    const onWindowKeyDown = (event: KeyboardEvent) => {
      const keyLabel = formatKeyLabel(event);
      if (keyLabel) {
        showKeyToast(keyLabel);
      }
    };

    window.addEventListener("keydown", onWindowKeyDown, true);

    return () => {
      window.removeEventListener("keydown", onWindowKeyDown, true);
      if (toastTimerRef.current) {
        clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  return (
    <>
      <div
        className={`pointer-events-none fixed right-6 top-6 z-50 rounded-xl border border-white/10 bg-black/30 px-6 py-4 font-mono shadow-2xl backdrop-blur-md transition-all duration-900 ease-out ${
          toastVisible
            ? "translate-y-0 scale-100 opacity-60"
            : "translate-y-5 scale-95 opacity-0"
        }`}
      >
        <span className="block text-[10px] uppercase tracking-widest text-white/40 mb-1">key</span>
        <span className="text-6xl font-semibold text-white">
          {lastKey}
          {repeatCount > 1 && (
            <span className="ml-3 text-lg font-normal text-white/50">×{repeatCount}</span>
          )}
        </span>
      </div>

      <section className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#26312a] bg-[#0f1318] sm:min-h-0">
      <div className="flex items-center justify-between border-b border-[#1f2335] 
                bg-[#16161e] px-4 py-3 text-xs text-[#565f89]">
        <span className="font-mono text-[#7dcfff]">shubham_buffer.txt</span>
      </div>

      <AceEditor
        mode="text"
        theme="tomorrow_night_blue"
        name="vim-playground-editor"
        value={buffer}
        style={{ fontFamily: "'JetBrains Mono', 'Fira Code', monospace" }}
        onChange={setBuffer}
        keyboardHandler="vim"
        width="100%"
        height="100%"
        fontSize={14}
        showPrintMargin={false}
        showGutter
        highlightActiveLine
        wrapEnabled
        setOptions={{
          useWorker: false,
          tabSize: 2,
          useSoftTabs: true,
          showLineNumbers: true,
          highlightGutterLine: true,
        }}
        editorProps={{ $blockScrolling: true }}
        onLoad={(editor) => {
          editor.focus();
          editor.resize();
        }}
      />
      </section>
    </>
  );
}