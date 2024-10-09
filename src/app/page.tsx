import { auth, signIn } from "@/auth";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import { redirect } from "next/navigation";

export default async  function Home() {
  const session = await auth()
  if(session?.user){
    redirect("/dashboard")
  }
  return (
    <div>
      <main className="pt-14 ">
        <Hero/>
        <Footer/>
      </main>
    </div>
  );
}
