import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { CheckCircle, ArrowRight, Zap, Smartphone, Clock, FileText, Database, TrendingUp, DollarSign, Award, Star, Shield, Users } from 'lucide-react';
import Logo from '../components/Logo';

export default function Landing() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 22, seconds: 45 });
  const [revenue, setRevenue] = useState(1000000);
  const [selectedPlanId, setSelectedPlanId] = useState('gold-monthly');
  const [isYearly, setIsYearly] = useState(false);

  const estimatorPlans = [
    { id: 'bronze-monthly', name: 'Bronze (Monthly)', price: 399 },
    { id: 'bronze-yearly', name: 'Bronze (Yearly)', price: 359 },
    { id: 'silver-monthly', name: 'Silver (Monthly)', price: 999 },
    { id: 'silver-yearly', name: 'Silver (Yearly)', price: 899 },
    { id: 'gold-monthly', name: 'Gold (Monthly)', price: 2199 },
    { id: 'gold-yearly', name: 'Gold (Yearly)', price: 1979 },
    { id: 'professional-monthly', name: 'Professional (Monthly)', price: 6999 },
    { id: 'professional-yearly', name: 'Professional (Yearly)', price: 6299 },
  ];

  const currentEstimatorPlan = estimatorPlans.find(p => p.id === selectedPlanId) || estimatorPlans[4];
  const savings = Math.round((revenue * 0.15) - currentEstimatorPlan.price);

  const calculatePrice = (price: string) => {
    const num = parseInt(price);
    if (isYearly) {
      return Math.round((num * 12 * 0.9) / 12); // Monthly equivalent with 10% off
    }
    return num;
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* Promo Banner */}
      <div className="bg-black text-white py-2 px-4 text-center text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-4">
        <span>🚀 Early Bird Offer: Get 20% off on all plans.</span>
        <span className="bg-white/10 px-2 py-1 rounded tabular-nums border border-white/10">
          Ends in: {String(timeLeft.hours).padStart(2, '0')}h {String(timeLeft.minutes).padStart(2, '0')}m {String(timeLeft.seconds).padStart(2, '0')}s
        </span>
      </div>
      {/* Navbar */}
      <nav className="border-b border-zinc-100 sticky top-0 bg-white/80 backdrop-blur-md z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Logo />
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#advantages" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Advantages</a>
              <a href="#features" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Features</a>
              <a href="#pricing" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Pricing</a>
              <Link to="/contact" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Contact</Link>
              <Link to="/login" className="text-sm font-medium text-zinc-600 hover:text-black transition-colors">Login</Link>
              <Link to="/payment" className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-zinc-800 transition-all shadow-sm">
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8 border border-blue-100 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            Made for Indian Gym Owners
          </div>
          <h1 className="text-5xl lg:text-7xl font-extrabold text-black tracking-tight mb-6 leading-tight">
            Manage Your Gym Smarter — <br />
            <span className="text-blue-600">No More Registers or Excel</span>
          </h1>
          <p className="text-xl text-zinc-600 max-w-2xl mx-auto mb-10 leading-relaxed">
            Track members, payments, and expiries in seconds. Join <span className="font-bold text-black">500+ Indian Gyms</span> already using GymLedger.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link to="/payment" className="w-full sm:w-auto bg-black text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-800 transition-all shadow-lg flex items-center justify-center gap-2">
              Get Started <ArrowRight className="w-5 h-5" />
            </Link>
            <Link to="/login" className="w-full sm:w-auto bg-white border border-zinc-200 text-black px-8 py-4 rounded-full text-lg font-bold hover:bg-zinc-50 transition-all">
              Login
            </Link>
          </div>
          <p className="mt-6 text-zinc-400 text-sm font-medium">
            <CheckCircle className="w-4 h-4 inline-block mr-1 text-blue-500" /> No credit card required to sign up
          </p>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-zinc-100 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-black" />
              <span className="font-bold text-black tracking-tight">SECURE CLOUD</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-black" />
              <span className="font-bold text-black tracking-tight">DEDICATED SUPPORT</span>
            </div>
            <div className="flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-black" />
              <span className="font-bold text-black tracking-tight">MOBILE READY</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-black" />
              <span className="font-bold text-black tracking-tight">MADE IN INDIA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Advantages Section */}
      <section id="advantages" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">GymLedger vs Traditional Methods</h2>
            <p className="text-blue-600 font-medium">Stop wasting time with outdated systems that hold you back.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-stretch">
            {/* Traditional */}
            <div className="bg-zinc-50 p-8 rounded-3xl border border-zinc-200">
              <h3 className="text-xl font-bold mb-6 text-zinc-400 uppercase tracking-widest">Traditional (Pen & Excel)</h3>
              <ul className="space-y-6">
                {[
                  { title: "Data gets lost", desc: "Registers get damaged, Excel files get corrupted or deleted." },
                  { title: "Hard to track expiries", desc: "Manually checking dates every day is a nightmare." },
                  { title: "No automation", desc: "Everything requires manual entry and constant supervision." },
                  { title: "Time consuming", desc: "Hours wasted every week on basic record keeping." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-zinc-200 flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-zinc-500 font-bold text-xs">✕</span>
                    </div>
                    <div>
                      <h4 className="font-bold text-zinc-700">{item.title}</h4>
                      <p className="text-zinc-500 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* GymLedger */}
            <div className="bg-black p-8 rounded-3xl shadow-xl shadow-black/10 text-white">
              <h3 className="text-xl font-bold mb-6 text-white uppercase tracking-widest">GymLedger Advantage</h3>
              <ul className="space-y-6">
                {[
                  { title: "Automatic expiry tracking", desc: "System alerts you before a member's plan expires." },
                  { title: "One-click management", desc: "Add or renew members in seconds, not minutes." },
                  { title: "Works on phone", desc: "Manage your gym from anywhere, even while traveling." },
                  { title: "Saves hours daily", desc: "Automate the boring stuff and focus on your clients." },
                  { title: "Professional system", desc: "Build trust with members using a digital system." }
                ].map((item, i) => (
                  <li key={i} className="flex gap-4">
                    <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0 mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <h4 className="font-bold text-white">{item.title}</h4>
                      <p className="text-blue-100 text-sm">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Get Started in 3 Simple Steps</h2>
            <p className="text-blue-600 font-medium">The fastest way to digitize your gym operations.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connector Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-zinc-200 -translate-y-1/2 z-0" />
            
            {[
              { step: "1", title: "Choose a Plan", desc: "Select the tier that fits your gym size and sign up." },
              { step: "2", title: "Make Payment", desc: "Scan the QR code and share the screenshot with our support team." },
              { step: "3", title: "Start Managing", desc: "Get your credentials and access your dashboard instantly." }
            ].map((s, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center text-2xl font-black mb-6 shadow-md border-4 border-white">
                  {s.step}
                </div>
                <h3 className="text-xl font-bold mb-2">{s.title}</h3>
                <p className="text-zinc-500 text-sm max-w-[200px]">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
            <p className="text-blue-600 font-medium">Everything you need to run a modern gym in India.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { icon: <Users className="w-6 h-6 text-black" />, title: "Member Management", desc: "Centralized database for all your members." },
              { icon: <Clock className="w-6 h-6 text-black" />, title: "Expiry Alerts", desc: "Never miss a renewal with automated tracking." },
              { icon: <Zap className="w-6 h-6 text-black" />, title: "Simple Dashboard", desc: "Clean interface that anyone can use." },
              { icon: <Smartphone className="w-6 h-6 text-black" />, title: "Mobile Friendly", desc: "Fully responsive for your smartphone." }
            ].map((feature, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-zinc-100 hover:border-blue-200 transition-colors">
                <div className="w-12 h-12 bg-zinc-50 rounded-xl flex items-center justify-center mb-6">
                  {feature.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{feature.title}</h3>
                <p className="text-zinc-500 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why GymLedger Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-black rounded-[3rem] p-8 md:p-16 text-white overflow-hidden relative border border-white/10 shadow-xl">
            <div className="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-5xl font-black mb-6 leading-tight tracking-tighter">
                  Stop Losing Money on <br />
                  <span className="text-blue-400 underline decoration-blue-400/30 underline-offset-8">Unpaid Memberships</span>
                </h2>
                <p className="text-zinc-300 text-lg mb-8 leading-relaxed">
                  Most Indian gyms lose 15-20% of their revenue simply because they forget to ask for renewals. GymLedger pays for itself by ensuring every member pays on time.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center font-bold text-blue-400">₹</div>
                    <p className="font-medium">Average Gym saves ₹5,000+ monthly in lost renewals.</p>
                  </div>
                  <div className="flex items-center gap-4 bg-white/5 p-4 rounded-2xl border border-white/5">
                    <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center font-bold text-blue-400">
                      <Clock className="w-5 h-5" />
                    </div>
                    <p className="font-medium">Save 10+ hours weekly on manual record keeping.</p>
                  </div>
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-8 border border-white/5 backdrop-blur-sm">
                <h3 className="text-xl font-bold mb-6 text-blue-300 uppercase tracking-widest text-center">Profit Growth Estimator</h3>
                <div className="space-y-6">
                  <div>
                    <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 block flex justify-between">
                      <span>Monthly Revenue</span>
                      <span className="text-white">₹{revenue.toLocaleString()}</span>
                    </label>
                    <input 
                      type="range" 
                      min="10000" 
                      max="5000000" 
                      step="10000" 
                      className="w-full accent-blue-500 cursor-pointer" 
                      value={revenue} 
                      onChange={(e) => setRevenue(parseInt(e.target.value))} 
                    />
                    <div className="flex justify-between text-[10px] text-zinc-400 mt-1">
                      <span>10k</span>
                      <span>25L</span>
                      <span>50L</span>
                    </div>
                  </div>

                  <div>
                    <label className="text-xs font-bold text-blue-300 uppercase tracking-wider mb-2 block">Select Your Plan</label>
                    <select 
                      value={selectedPlanId}
                      onChange={(e) => setSelectedPlanId(e.target.value)}
                      className="w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-3 text-white font-bold focus:ring-2 focus:ring-blue-500 outline-none appearance-none"
                    >
                      {estimatorPlans.map(plan => (
                        <option key={plan.id} value={plan.id}>
                          {plan.name} - ₹{plan.price}/mo
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="bg-zinc-900/50 p-6 rounded-2xl border border-white/5 text-center">
                    <p className="text-sm text-zinc-300 mb-1">Estimated Monthly Profit Increase</p>
                    <p className="text-4xl font-black text-blue-400 tracking-tighter">₹{savings.toLocaleString()}</p>
                    <p className="text-[10px] text-zinc-400 mt-2 italic">Based on 15% recovery of lost renewals minus plan cost</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparison Table Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Why Switch to GymLedger?</h2>
            <p className="text-blue-600 font-medium">A side-by-side comparison of the old way vs. the smart way.</p>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-zinc-100">
                  <th className="py-6 px-4 text-left text-zinc-400 font-bold uppercase tracking-widest text-xs">Feature</th>
                  <th className="py-6 px-4 text-left text-zinc-400 font-bold uppercase tracking-widest text-xs">Traditional Register</th>
                  <th className="py-6 px-4 text-left text-black font-bold uppercase tracking-widest text-xs bg-zinc-50 rounded-t-2xl">GymLedger</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {[
                  { f: "Expiry Tracking", old: "Manual page flipping", new: "Automatic alerts" },
                  { f: "Member Search", old: "Minutes of searching", new: "Instant (under 1 sec)" },
                  { f: "Data Security", old: "Paper can burn/get lost", new: "Secure Cloud Backup" },
                  { f: "Mobile Access", old: "Must be at the desk", new: "Access from anywhere" },
                  { f: "Professionalism", old: "Old school / messy", new: "Modern / Trustworthy" },
                  { f: "Payment History", old: "Hard to verify", new: "Clear digital logs" }
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-zinc-50/50 transition-colors">
                    <td className="py-6 px-4 font-bold text-black">{row.f}</td>
                    <td className="py-6 px-4 text-zinc-500">{row.old}</td>
                    <td className="py-6 px-4 font-bold text-blue-600 bg-zinc-50/30">{row.new}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Affordable Plans</h2>
            <p className="text-blue-600 font-medium">Choose the plan that fits your gym's size.</p>

            {/* Billing Toggle */}
            <div className="mt-10 flex items-center justify-center">
              <div className="bg-white p-1.5 rounded-2xl flex items-center gap-1 border border-zinc-200 shadow-sm">
                <button 
                  onClick={() => setIsYearly(false)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 ${
                    !isYearly 
                      ? "bg-black text-white shadow-md" 
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  Monthly
                </button>
                <button 
                  onClick={() => setIsYearly(true)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2 ${
                    isYearly 
                      ? "bg-black text-white shadow-md" 
                      : "text-zinc-500 hover:text-black"
                  }`}
                >
                  Yearly
                  <span className="bg-blue-100 text-blue-700 text-[10px] px-2 py-0.5 rounded-lg border border-blue-200">
                    -10%
                  </span>
                </button>
              </div>
            </div>
          </div>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { id: 'bronze', name: "Bronze", price: "499", early: "399", members: "50" },
              { id: 'silver', name: "Silver", price: "1199", early: "999", members: "150" },
              { id: 'gold', name: "Gold", price: "2499", early: "2199", members: "350", popular: true },
              { id: 'professional', name: "Professional", price: "7999", early: "6999", members: "1000" }
            ].map((plan, i) => (
              <div key={i} className={`relative bg-white p-8 rounded-3xl border ${plan.popular ? 'border-black shadow-2xl scale-105 z-10' : 'border-zinc-200'} flex flex-col transition-all duration-500 hover:shadow-xl`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
                    <span className="bg-black text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg">
                      Most Popular
                    </span>
                  </div>
                )}
                <h3 className="text-lg font-bold text-black mb-2">{plan.name}</h3>
                <div className="mb-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-zinc-400 line-through text-lg">₹{plan.price}</span>
                    <span className="bg-blue-100 text-blue-700 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">Save 20%</span>
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">₹{calculatePrice(plan.early)}</span>
                    <span className="text-zinc-500 text-sm">/mo</span>
                  </div>
                  {isYearly && (
                    <div className="mt-2 text-[10px] text-blue-600 font-bold">
                      Billed annually: ₹{calculatePrice(plan.early) * 12}
                    </div>
                  )}
                </div>
                <ul className="space-y-4 mb-8 flex-grow">
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Up to {plan.members} members
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Expiry Alerts
                  </li>
                  <li className="flex items-center gap-3 text-sm text-zinc-600">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    Mobile Dashboard
                  </li>
                </ul>
                <button 
                  onClick={() => {
                    localStorage.setItem('selected_plan', plan.id);
                    localStorage.setItem('plan_billing', isYearly ? 'yearly' : 'monthly');
                    navigate('/payment');
                  }}
                  className={`w-full py-3 rounded-xl font-bold text-center transition-all ${plan.popular ? 'bg-black text-white hover:bg-zinc-800' : 'bg-zinc-100 text-black hover:bg-zinc-200'}`}
                >
                  Buy Plan
                </button>
                <div className="mt-4 flex items-center justify-center gap-2 opacity-40">
                  <Shield className="w-3 h-3" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Secure UPI Payment</span>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center flex flex-col items-center gap-4">
            <p className="text-blue-600 font-bold bg-blue-50 inline-block px-6 py-2 rounded-full">
              Yearly Option: Save 10% on all plans!
            </p>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold mb-4">A Dashboard Built for Speed</h2>
            <p className="text-blue-600 font-medium">No complex training required. If you can use WhatsApp, you can use GymLedger.</p>
          </div>
          
          <div className="relative mx-auto max-w-5xl">
            <div className="bg-black rounded-3xl p-2 shadow-2xl shadow-black/10">
              <div className="bg-zinc-50 rounded-2xl overflow-hidden border border-zinc-200">
                {/* Mock Dashboard Header */}
                <div className="h-12 bg-white border-b border-zinc-200 flex items-center justify-between px-4">
                  <Logo size="sm" />
                  <div className="flex gap-2">
                    <div className="w-20 h-4 bg-zinc-100 rounded-full" />
                    <div className="w-8 h-4 bg-zinc-100 rounded-full" />
                  </div>
                </div>
                {/* Mock Dashboard Content */}
                <div className="p-6 grid grid-cols-3 gap-4">
                  <div className="col-span-3 grid grid-cols-3 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">Total Members</p>
                      <p className="text-xl font-black text-black">142</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">Expiring Soon</p>
                      <p className="text-xl font-black text-blue-600">12</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm">
                      <p className="text-[10px] text-zinc-400 font-bold uppercase">Active</p>
                      <p className="text-xl font-black text-blue-600">130</p>
                    </div>
                  </div>
                  <div className="col-span-3 bg-white rounded-xl border border-zinc-200 shadow-sm overflow-hidden">
                    <div className="p-3 bg-zinc-50 border-b border-zinc-200 flex justify-between">
                      <div className="w-32 h-4 bg-zinc-200 rounded" />
                      <div className="w-16 h-4 bg-zinc-100 rounded" />
                    </div>
                    <div className="p-4 space-y-3">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="flex items-center justify-between border-b border-zinc-50 pb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-zinc-100 rounded-full" />
                            <div className="space-y-1">
                              <div className="w-24 h-3 bg-zinc-200 rounded" />
                              <div className="w-16 h-2 bg-zinc-100 rounded" />
                            </div>
                          </div>
                          <div className="w-12 h-4 bg-zinc-50 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-black/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-600/5 rounded-full blur-3xl" />
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Common Questions</h2>
            <p className="text-blue-600 font-medium">Everything you need to know before getting started.</p>
          </div>
          <div className="space-y-6">
            {[
              { q: "How do I get my login credentials?", a: "After you pay and share the screenshot, our team verifies it and sends your unique credentials to your registered email within 2-4 hours." },
              { q: "Is my data safe?", a: "Yes, we use secure cloud databases with daily backups. Your member data is private and only accessible by you." },
              { q: "Can I use it on my phone?", a: "Absolutely! GymLedger is designed to work perfectly on smartphones, tablets, and computers." },
              { q: "What if I need help?", a: "We provide dedicated support for all our gym owners. Just reach out to us via our contact page and we'll help you out." }
            ].map((faq, i) => (
              <div key={i} className="bg-zinc-50 p-6 rounded-2xl border border-zinc-100">
                <h4 className="font-bold text-black mb-2">{faq.q}</h4>
                <p className="text-zinc-600 text-sm leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-black text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-6 border border-white/10">
            Join 500+ Gym Owners
          </div>
          <h2 className="text-4xl font-bold mb-6 tracking-tight">Ready to Professionalize Your Gym?</h2>
          <p className="text-xl text-zinc-300 mb-10">Ditch the registers today. Start your digital journey with India's most loved gym software.</p>
          <Link to="/payment" className="inline-flex items-center gap-2 bg-blue-600 text-white px-10 py-4 rounded-full text-xl font-bold hover:bg-blue-700 transition-all shadow-2xl shadow-blue-500/20">
            Get Started Now <ArrowRight className="w-6 h-6" />
          </Link>
          <p className="mt-6 text-zinc-400 text-sm font-medium">No credit card required.</p>
        </div>
        {/* Background Accents */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-12 mb-12 border-b border-white/5 pb-12">
            <div className="col-span-2">
              <Logo className="mb-6" textClassName="text-white" />
              <p className="text-zinc-400 max-w-sm leading-relaxed">
                The most trusted gym management software for Indian fitness businesses. Ditch the register and join the digital revolution.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-blue-500">Product</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
                <li><a href="#pricing" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#advantages" className="hover:text-white transition-colors">Advantages</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 uppercase tracking-widest text-xs text-blue-500">Support</h4>
              <ul className="space-y-4 text-zinc-400 text-sm">
                <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              </ul>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-500 text-xs">© 2026 GymLedger. All rights reserved. Built for Indian Gym Owners.</p>
            <div className="flex items-center gap-6 opacity-20 grayscale brightness-200">
              <span className="text-[10px] font-black uppercase tracking-widest">Secure UPI</span>
              <span className="text-[10px] font-black uppercase tracking-widest">Cloud Hosted</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
