import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function Landing() {
  const [email, setEmail] = useState('')
  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-50 header">
        <div className="container flex between">
          <Link to="/" className="brand">DevResume<span className="accent">AI</span></Link>
          <div className="flex gap">
            <Link to="/app" className="btn btn-primary">Dashboard</Link>
            <Link to="/app/analysis" className="btn btn-secondary">History</Link>
          </div>
        </div>
      </header>
      <section className="container hero">
        <div className="grid two">
          <div>
            <h1 className="title">You didn't lose your skill.<br /><span className="highlight">You lost your context.</span></h1>
            <p className="sub">DevResume AI restores what you were building, what's missing, and exactly where to continue—so you can ship faster.</p>
            <div className="flex gap mt">
              <Link to="/app" className="btn btn-primary">Get Started</Link>
              <a href="#demo" className="btn btn-secondary">Watch Demo</a>
            </div>
            <div className="flex gap mt">
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input"
              />
              <button className="btn btn-primary">Try Now</button>
            </div>
          </div>
          <div className="card">
            <pre className="code"># TODO: finish user auth{'\n'}def login(email, password):{'\n'}    pass  # ← you stopped here</pre>
            <div className="arrow">➜</div>
            <pre className="code lime">GOAL: Build secure login endpoint{'\n'}NEXT: Add bcrypt + JWT{'\n'}MOMENTUM: 60% → Low effort</pre>
          </div>
        </div>
      </section>
      <section id="demo" className="container">
        <h2 className="heading">See It In Action</h2>
        <div className="grid two">
          <div className="card">
            <h3 className="card-title">Input</h3>
            <textarea
              className="textarea"
              defaultValue={`def process_payment(amount, user_id):
    # TODO: validate amount
    # TODO: check user balance
    # TODO: call payment gateway
    pass`}
            />
            <div className="flex gap mt">
              <select className="select">
                <option>Beginner</option>
                <option>Intermediate</option>
                <option>Advanced</option>
              </select>
              <Link to="/app" className="btn btn-primary flex1">Analyze</Link>
            </div>
          </div>
          <div className="card">
            <h3 className="card-title">Recovery Report</h3>
            <pre className="code">{`GOAL:
Build a payment processing system

CURRENT STATE:
Functions: 1, TODOs: 3, Incomplete: pass statements

EXPLANATION:
Technically, the code defines a single function with three TODO items indicating unimplemented validation and processing steps.

NEXT STEPS:
- Implement amount validation logic
- Add user balance verification
- Integrate payment gateway API

MOMENTUM SCORE:
Completion: 15%
Effort to Continue: High

RISKS / IMPROVEMENTS:
- Outstanding TODOs indicate unfinished work
- Missing error handling for payment failures`}</pre>
          </div>
        </div>
      </section>
      <footer className="footer">© 2026 DevResume AI — Built for developers who ship</footer>
    </div>
  )
}
