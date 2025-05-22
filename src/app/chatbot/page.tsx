"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

const animatedWords = ["ゼロから一を作るの", "柔軟な思考と行動", "ユーザの幸せな体験", "フルスタックウェブ開発"];
const questionGroups = [
  {
    title: "このウェブサイトについて",
    questions: [
      "このウェブサイトがどのように作られたか気になりますか？",
      "このウェブサイトの開発にはどういう技術が利用されましたか？",
      "このウェブサイトで何ができますか？",
      "このウェブサイトはなぜ作られましたか？",
    ],
  },
  {
    title: "プロフィール・キャリア",
    questions: [
      "私のプロフィールやキャリアに興味がありますか？",
    ],
  },
  {
    title: "つながり・次のステップ",
    questions: [
      "私とつながりたいですか？",
      "次に何をすればいいか迷っていますか？",
    ],
  },
];

export default function ChatbotPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([
    { role: "bot", content: "こんにちは！ご質問があればどうぞ。" }
  ]);
  const [wordIndex, setWordIndex] = useState(0);
  const [showWord, setShowWord] = useState(true);
  const [openGroup, setOpenGroup] = useState<number | null>(null);

  // アニメーション用
  useEffect(() => {
    const showTimer = setTimeout(() => setShowWord(false), 1800);
    const changeTimer = setTimeout(() => {
      setWordIndex((prev) => (prev + 1) % animatedWords.length);
      setShowWord(true);
    }, 2200);
    return () => {
      clearTimeout(showTimer);
      clearTimeout(changeTimer);
    };
  }, [wordIndex, showWord]);

  // 質問クリック時に自動送信
  const handleQuestionClick = async (q: string) => {
    setMessages(prev => [...prev, { role: "user", content: q }]);
    setInput("");
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: q })
      });
      const data = await res.json();
      if (data.answer) {
        setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", content: "エラーが発生しました。" }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "API通信エラー" }]);
    }
  };

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", content: input };
    setMessages([...messages, userMessage]);
    setInput("");
  
    // API Routeへリクエスト
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input })
      });
      const data = await res.json();
      if (data.answer) {
        setMessages(prev => [...prev, { role: "bot", content: data.answer }]);
      } else {
        setMessages(prev => [...prev, { role: "bot", content: "エラーが発生しました。" }]);
      }
    } catch {
      setMessages(prev => [...prev, { role: "bot", content: "API通信エラー" }]);
    }
  };

  const [displayed, setDisplayed] = useState(""); // 表示中の文字
  const [animating, setAnimating] = useState(true); // アニメーション中か
  const [underlineProgress, setUnderlineProgress] = useState(0); // 下線の進捗（0～1）
  const [textWidth, setTextWidth] = useState(0); // 表示テキストの幅(px)
  const textRef = useRef<HTMLSpanElement>(null);

  // 表示テキストの幅を取得
  useEffect(() => {
    if (textRef.current) {
      setTextWidth(textRef.current.offsetWidth);
    }
  }, [displayed]);

  // アニメーション制御
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let underlineTimeout: NodeJS.Timeout;
    const word = animatedWords[wordIndex];

    if (animating) {
      // 1文字ずつ表示
      if (displayed.length < word.length) {
        timeout = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length + 1));
        }, 80);
      } else {
        // 全部表示されたら下線を100%に
        setUnderlineProgress(1);
        // 一定時間後に下線を右から消す
        underlineTimeout = setTimeout(() => {
          // 下線を徐々に消す
          let progress = 1;
          const interval = setInterval(() => {
            progress -= 0.04;
            setUnderlineProgress(progress > 0 ? progress : 0);
            if (progress <= 0) {
              clearInterval(interval);
              setTimeout(() => {
                setAnimating(false); // 消すアニメーションへ
              }, 100);
            }
          }, 24);
        }, 900);
      }
    } else {
      // 1文字ずつ消す
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(word.slice(0, displayed.length - 1));
        }, 50);
      } else {
        // 次の単語へ
        setWordIndex((prev) => (prev + 1) % animatedWords.length);
        setAnimating(true);
        setUnderlineProgress(0);
      }
    }
    return () => {
      clearTimeout(timeout);
      clearTimeout(underlineTimeout);
    };
  }, [displayed, animating, wordIndex]);

  useEffect(() => {
    // 新しい単語になったらリセット
    setDisplayed("");
    setUnderlineProgress(0);
  }, [wordIndex]);

  return (
    <div className="flex flex-col items-center min-h-[80vh] bg-gray-50 py-8">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 flex flex-col gap-6">
        {/* 上部：プロフィールと質問例 */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* プロフィール・説明 */}
          <div className="flex-1 flex flex-col items-start">
            <div className="flex items-center gap-3 mb-2">
              <Image src="/woodpecker.png" alt="プロフィール画像" width={48} height={48} className="rounded-full border" />
              <div>
                <div className="font-bold text-blue-700">haruto-GPT</div>
                <div className="text-xs text-gray-500">Dify RAGとGPT-4o Miniで構築されたAIチャットボット</div>
              </div>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 mt-2 w-full">
              <span className="relative align-bottom">
                <span
                  ref={textRef}
                  className="text-2xl font-bold text-blue-600 transition-all duration-300"
                  style={{ letterSpacing: "0.02em" }}
                >
                  {displayed}
                </span>
                {/* 縦線カーソル */}
                <span
                  className="absolute top-[45%] -translate-y-[60%] w-[2px] h-[1.2em] bg-blue-600 animate-blink"
                  style={{
                    left: `${textWidth}px`,
                    visibility: animating ? "visible" : "hidden"
                  }}
                />
                {/* 下線アニメーション */}
                <span
                  className="absolute left-0 bottom-0 h-[3px] transition-all duration-200"
                  style={{
                    width: `${textWidth}px`,
                    maxWidth: "100%",
                    opacity: underlineProgress > 0 ? 1 : 0,
                    backgroundColor: "#2563eb", // Tailwindのtext-blue-600
                    transform: `scaleX(${underlineProgress})`,
                    transformOrigin: "left",
                    transition: "transform 0.2s linear, opacity 0.2s"
                  }}
                />
              </span>
              <span className="text-2xl font-bold ml-1 align-bottom">が好きなウェブエンジニア</span>
              <p className="mt-2 text-gray-700 text-sm">
                こんにちは、私はharutoです。フルスタックウェブエンジニアになりたくて、最近TypeScriptベースのフルスタック開発、AWS、AIベースのアーキテクチャ設計と開発を学んでいます。
              </p>
              <div className="mt-3 text-xs text-red-500 bg-red-100 rounded px-2 py-1 inline-block">
                haruto-GPTにメッセージを送ると、本サイトの利用規約に同意したものとみなされます
              </div>
            </div>
          </div>
          {/* 質問例（トグルリスト） */}
          <div className="flex-1">
            <div className="bg-gray-50 border rounded-lg p-4">
              <div className="font-bold mb-2">haruto-GPTに自由に質問してください。</div>
              <div className="space-y-2 text-sm">
                {questionGroups.map((group, idx) => (
                  <div key={group.title}>
                    <button
                      className="w-full flex justify-between items-center font-semibold py-2 px-2 rounded hover:bg-blue-100 transition"
                      onClick={() => setOpenGroup(openGroup === idx ? null : idx)}
                    >
                      <span>{group.title}</span>
                      <span>{openGroup === idx ? "▲" : "▼"}</span>
                    </button>
                    {openGroup === idx && (
                      <ul className="mb-2">
                        {group.questions.map((q, qidx) => (
                          <li key={qidx}>
                            <button
                              className="w-full text-left py-2 px-3 hover:bg-blue-50 rounded transition"
                              onClick={() => handleQuestionClick(q)}
                            >
                              {q}
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        {/* チャットエリア */}
        <div className="flex flex-col bg-gray-100 rounded-lg p-4 min-h-[200px] max-h-[300px] overflow-y-auto">
          {messages.map((msg, idx) => (
            <div key={idx} className={`mb-2 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`px-3 py-2 rounded-lg ${msg.role === "user" ? "bg-blue-200 text-right" : "bg-white border"}`}>
                {msg.content}
              </div>
            </div>
          ))}
        </div>
        {/* 入力欄 */}
        <div className="flex items-center gap-2 mt-2">
          <input
            type="text"
            className="flex-1 border rounded-lg px-4 py-2 focus:outline-blue-400"
            placeholder="ここにメッセージを入力してください"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M2 12l15-6-6 15-2-7-7-2z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}