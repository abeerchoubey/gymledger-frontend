import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Zap, Star, Award, Shield, ArrowLeft } from 'lucide-react';
import Logo from '../components/Logo';
import { cn } from '../lib/utils';

const plans = [
  { id: 'bronze', name: 'Bronze', price: '499', early: '399', members: '50', icon: <Zap className="w-6 h-6 text-blue-600" /> },
  { id: 'silver', name: 'Silver', price: '1199', early: '999', members: '150', icon: <Star className="w-6 h-6 text-blue-600" /> },
  { id: 'gold', name: 'Gold', price: '2499', early: '2199', members: '350', popular: true, icon: <Award className="w-6 h-6 text-blue-600" /> },
  { id: 'professional', name: 'Professional', price: '7999', early: '6999', members: '1000', icon: <Shield className="w-6 h-6 text-blue-600" /> }
];

export default function Plans() {
  const [isYearly, setIsYearly] = React.useState(false);
  const navigate = useNavigate();

  const handleSelectPlan = (planId: string) => {
    localStorage.setItem('selected_plan', planId);
    localStorage.setItem('plan_billing', isYearly ? 'yearly' : 'monthly');
    
    navigate('/payment');
  };

  const calculatePrice = (price: string) => {
    const num = parseInt(price);
    if (isYearly) {
      return Math.round((num * 12 * 0.9) / 12); // Monthly equivalent with 10% off
    }
    return num;
  };

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-start mb-8">
          <button 
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-black hover:text-blue-600 font-medium transition-colors group"
          >
            <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>
        </div>

        <div className="text-center mb-12">
          <Logo className="mx-auto mb-4" showText={false} size="lg" />
          <h1 className="text-4xl font-bold text-black tracking-tight">Choose Your Plan</h1>
          <p className="text-black/60 mt-4 text-lg">Select a tier to unlock your gym dashboard and start managing members.</p>
          
          {/* Billing Toggle */}
          <div className="mt-10 flex items-center justify-center">
            <div className="bg-black/5 p-1.5 rounded-2xl flex items-center gap-1 border border-black/5 shadow-inner">
              <button 
                onClick={() => setIsYearly(false)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200",
                  !isYearly 
                    ? "bg-white text-black shadow-md" 
                    : "text-black/40 hover:text-black/60"
                )}
              >
                Monthly
              </button>
              <button 
                onClick={() => setIsYearly(true)}
                className={cn(
                  "px-6 py-2.5 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2",
                  isYearly 
                    ? "bg-white text-black shadow-md" 
                    : "text-black/40 hover:text-black/60"
                )}
              >
                Yearly
                <span className="bg-blue-600 text-white text-[10px] px-2 py-0.5 rounded-lg">
                  -10%
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6">
          {plans.map((plan) => (
            <div key={plan.id} className={cn(
              "relative bg-white p-8 rounded-3xl border flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-1",
              plan.popular ? "border-black shadow-xl scale-105 z-10" : "border-black/5"
            )}>
              {plan.popular && (
                <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-black text-white px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-black/10">
                  Most Popular
                </span>
              )}
              <div className="mb-6 flex items-center justify-between">
                <h3 className="text-xl font-bold text-black tracking-tight">{plan.name}</h3>
                <div className="p-2 bg-black/5 rounded-xl">
                  {plan.icon}
                </div>
              </div>
              <div className="mb-8">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-black/40 line-through text-sm font-medium">₹{plan.price}</span>
                  <span className="text-blue-600 text-[10px] font-bold bg-blue-50 px-2 py-0.5 rounded-md border border-blue-100">
                    Early Bird
                  </span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black text-black tracking-tighter">₹{calculatePrice(plan.early)}</span>
                  <span className="text-black/40 text-sm font-medium">/mo</span>
                </div>
                {isYearly && (
                  <div className="mt-3 p-2 bg-blue-50 rounded-xl border border-blue-100">
                    <p className="text-[11px] text-blue-700 font-bold flex items-center gap-1.5">
                      <Zap className="w-3 h-3" />
                      Billed annually: ₹{calculatePrice(plan.early) * 12}
                    </p>
                  </div>
                )}
              </div>
              <ul className="space-y-4 mb-10 flex-grow">
                <li className="flex items-center gap-3 text-sm text-black/70">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Up to {plan.members} members
                </li>
                <li className="flex items-center gap-3 text-sm text-black/70">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Expiry Alerts
                </li>
                <li className="flex items-center gap-3 text-sm text-black/70">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  Mobile Dashboard
                </li>
                <li className="flex items-center gap-3 text-sm text-black/70">
                  <CheckCircle className="w-4 h-4 text-blue-600" />
                  One-click renewals
                </li>
              </ul>
              <button 
                onClick={() => handleSelectPlan(plan.id)}
                className={`w-full py-4 rounded-xl font-bold text-lg transition-all ${plan.popular ? 'bg-black text-white hover:bg-blue-600' : 'bg-black/5 text-black hover:bg-black/10'}`}
              >
                Buy Plan
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center bg-white p-8 rounded-3xl border border-black/5 max-w-2xl mx-auto">
          <p className="text-black font-bold text-lg mb-2">Want to save more?</p>
          <p className="text-black/60 mb-6">Choose a yearly subscription and get an additional 10% discount on any plan.</p>
          <button className="text-blue-600 font-bold hover:underline">View Yearly Pricing</button>
        </div>
      </div>
    </div>
  );
}
