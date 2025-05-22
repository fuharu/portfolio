import { redirect } from "next/navigation";

export default function Home() {
  redirect("/chatbot");
  return null;
}