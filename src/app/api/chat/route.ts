import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const body = await req.json();
  console.log("受信したbody:", body); // デバッグ用
  const message = body.message;

  // messageのバリデーションを少し緩和
  if (typeof message !== "string" || message.length === 0) {
    return NextResponse.json({ error: "messageが空、または不正です。" }, { status: 400 });
  }

  // Dify APIのエンドポイントとAPIキー
  const DIFy_API_URL = "https://api.dify.ai/v1/chat-messages";
  const DIFy_API_KEY = process.env.DIFY_API_KEY; // .env.localにDIFY_API_KEYを設定

  if (!DIFy_API_KEY) {
    return NextResponse.json({ error: "DIFY_API_KEY is not set" }, { status: 500 });
  }

  // Dify APIへリクエスト（inputs: { query: message } で送る）
  const difyRes = await fetch(DIFy_API_URL, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${DIFy_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      inputs: { query: message },
      user: "test-user",
      response_mode: "blocking"
    })
  });

  if (!difyRes.ok) {
    const error = await difyRes.text();
    console.error("Dify API Error:", error); // エラー詳細も出力
    return NextResponse.json({ error }, { status: difyRes.status });
  }

  const data = await difyRes.json();
  // Difyの返却形式に合わせてanswerを返す
  return NextResponse.json({
    answer: data.answer || data.choices?.[0]?.message?.content || "回答が取得できませんでした。"
  });
}