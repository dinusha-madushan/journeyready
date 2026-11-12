"use client";
import { FormEvent, useState } from "react";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { Card } from "@/components/ui";

export default function Login() {
  const { user, ready } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e: FormEvent, mode: "in" | "up") {
    e.preventDefault();
    if (!supabase) return;
    if (!/^\S+@\S+\.\S+$/.test(email)) return setMsg("Enter a valid email address.");
    if (password.length < 6) return setMsg("Password must have at least 6 characters.");
    setBusy(true);
    const { error } = mode === "in" ? await supabase.auth.signInWithPassword({ email, password }) : await supabase.auth.signUp({ email, password });
    setBusy(false);
    setMsg(error ? error.message : mode === "up" ? "Account created. Check your email if confirmation is on." : "Logged in.");
  }

  if (!supabase)
    return (
      <Card>
        <h1>Log in</h1>
        <p>Online saving is off.</p>
      </Card>
    );
  if (!ready) return <Card><p>Loading...</p></Card>;
  if (user)
    return (
      <Card>
        <h1>Your account</h1>
        <p>Logged in as {user.email}. Your plan is saved online.</p>
        <button className="btn" onClick={() => supabase!.auth.signOut()}>Log out</button>
      </Card>
    );
  return (
    <Card className="mx-auto max-w-md">
      <h1>Log in or sign up</h1>
      <form className="grid gap-3" onSubmit={(e) => submit(e, "in")}>
        <input className="inp" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} aria-label="Email" autoComplete="email" />
        <input className="inp" type="password" placeholder="Password (6+ characters)" value={password} onChange={(e) => setPassword(e.target.value)} aria-label="Password" autoComplete="current-password" />
        <div className="row">
          <button className="btn btn-p" disabled={busy} type="submit">Log in</button>
          <button className="btn" disabled={busy} type="button" onClick={(e) => { e.preventDefault(); submit(e as unknown as FormEvent, "up"); }}>Create account</button>
        </div>
        {msg && <p role="alert">{msg}</p>}
      </form>
    </Card>
  );
}
