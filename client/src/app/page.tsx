import { redirect } from "next/navigation";

export default function Home() {
    // change url '/' to '/home'
    redirect('/home');
}
