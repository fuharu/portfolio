import Image from 'next/image';

export default function PortfolioPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-blue-50 to-white text-foreground font-sans">
      {/* ヒーローセクション */}
      <section className="flex flex-col items-center justify-center py-20 bg-gradient-to-b from-blue-200 to-transparent">
        <Image
          src="/woodpecker.png"
          alt="プロフィール画像"
          width={140}
          height={140}
          className="rounded-full border-4 border-blue-400 shadow-lg mb-4"
        />
        <h1 className="text-5xl md:text-6xl font-extrabold mb-2 text-blue-700 drop-shadow">藤本悠杜</h1>
        <p className="text-lg md:text-2xl text-gray-700 mb-4 font-medium">フロントエンドエンジニア／AIチャットボット開発に興味があります。</p>
        <div className="flex gap-4 mt-2">
          <a
            href="mailto:haruto7fujimoto@gmail.com"
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-semibold"
          >
            お問い合わせ
          </a>
          <a
            href="#projects"
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition font-semibold"
          >
            プロジェクトを見る
          </a>
        </div>
      </section>

      {/* スキル */}
      <section className="max-w-3xl mx-auto py-12 px-4" id="skills">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">スキル</h2>
        <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl">💻</span>
            <span className="mt-2 font-semibold">JavaScript / TypeScript</span>
          </li>
          <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl">⚛️</span>
            <span className="mt-2 font-semibold">React / Next.js</span>
          </li>
          <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl">🐍</span>
            <span className="mt-2 font-semibold">Python</span>
          </li>
          <li className="bg-white rounded-xl shadow p-4 flex flex-col items-center">
            <span className="text-2xl">🤖</span>
            <span className="mt-2 font-semibold">AI・LLM活用</span>
          </li>
        </ul>
      </section>

      {/* プロジェクト */}
      <section className="max-w-3xl mx-auto py-12 px-4" id="projects">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">プロジェクト</h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="p-6 border rounded-xl shadow bg-white flex flex-col justify-between">
            <h3 className="text-xl font-bold mb-2">ポートフォリオサイト</h3>
            <p className="text-gray-700 mb-4">このサイト。Next.jsとTailwind CSSで作成。</p>
            <a href="#" className="text-blue-600 hover:underline font-semibold">詳細を見る →</a>
          </div>
          <div className="p-6 border rounded-xl shadow bg-white flex flex-col justify-between">
            <h3 className="text-xl font-bold mb-2">AIチャットボット</h3>
            <p className="text-gray-700 mb-4">Dify＋OpenAIを活用したAIチャットボット（近日公開予定）</p>
            <a href="#" className="text-blue-600 hover:underline font-semibold">詳細を見る →</a>
          </div>
        </div>
      </section>

      {/* お問い合わせ */}
      <section className="max-w-3xl mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold mb-6 text-blue-700">お問い合わせ</h2>
        <p className="mb-2">メール: <a href="mailto:haruto7fujimoto@gmail.com" className="text-blue-600 underline">haruto7fujimoto@gmail.com</a></p>
        <div className="flex gap-4 mt-4">
          <a
            href="mailto:haruto7fujimoto@gmail.com"
            className="px-6 py-2 bg-blue-600 text-white rounded-full shadow hover:bg-blue-700 transition font-semibold"
          >
            メールで連絡
          </a>
          <a
            href="#"
            className="px-6 py-2 border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition font-semibold"
          >
            SNSを見る
          </a>
        </div>
      </section>
    </main>
  );
}