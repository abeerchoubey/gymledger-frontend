import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Copy, ExternalLink, ShieldCheck } from 'lucide-react';
import Logo from '../components/Logo';

export default function Payment() {
  const [submitted, setSubmitted] = React.useState(false);
  const navigate = useNavigate();

  // Get selected plan info from localStorage or default
  const [selectedPlanId, setSelectedPlanId] = React.useState(localStorage.getItem('selected_plan') || 'bronze');
  const [billingCycle, setBillingCycle] = React.useState(localStorage.getItem('plan_billing') || 'monthly');
  
  const plansData: Record<string, { name: string, price: number }> = {
    'bronze': { name: 'Bronze', price: 399 },
    'silver': { name: 'Silver', price: 999 },
    'gold': { name: 'Gold', price: 2199 },
    'professional': { name: 'Professional', price: 6999 }
  };

  const plan = plansData[selectedPlanId] || plansData['bronze'];
  const monthlyPrice = billingCycle === 'yearly' ? Math.round(plan.price * 0.9) : plan.price;
  const totalAmount = billingCycle === 'yearly' ? monthlyPrice * 12 : monthlyPrice;

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newPlanId = e.target.value;
    setSelectedPlanId(newPlanId);
    localStorage.setItem('selected_plan', newPlanId);
  };

  const handleBillingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newBilling = e.target.value;
    setBillingCycle(newBilling);
    localStorage.setItem('plan_billing', newBilling);
  };

  const handlePaymentConfirm = () => {
    // Mark user as "plan purchased" in localStorage
    localStorage.setItem('plan_purchased', 'true');
    // Ensure a plan is selected (default to bronze if not)
    if (!localStorage.getItem('selected_plan')) {
      localStorage.setItem('selected_plan', selectedPlanId || 'bronze');
    }
    // Redirect to login page
    navigate('/login');
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-4 font-sans">
        <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl border border-black/5 p-12 text-center animate-in zoom-in-95">
          <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="text-blue-600 w-10 h-10" />
          </div>
          <h2 className="text-3xl font-bold text-black mb-4 tracking-tight">Payment Submitted!</h2>
          <p className="text-black/60 leading-relaxed mb-8">
            Waiting for account confirmation. Our team will verify the payment and activate your dashboard within 2-4 hours.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-black/10"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white py-12 px-4 font-sans">
      <div className="max-w-4xl mx-auto">
        <button 
          onClick={() => navigate('/')}
          className="flex items-center gap-2 text-black hover:text-blue-600 font-medium mb-8 transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </button>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Payment Info */}
          <div className="bg-white rounded-3xl shadow-2xl border border-black/5 p-8 lg:p-10">
            <Logo textClassName="text-black" suffix="Pay" />

            <h2 className="text-2xl font-bold text-black mb-6 tracking-tight">Complete your subscription</h2>
            
            {/* Plan Selection Dropdowns */}
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label className="block text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1.5">Select Tier</label>
                <select 
                  value={selectedPlanId}
                  onChange={handlePlanChange}
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-3 py-2 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
                >
                  <option value="bronze">Bronze Tier</option>
                  <option value="silver">Silver Tier</option>
                  <option value="gold">Gold Tier</option>
                  <option value="professional">Professional Tier</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-bold text-black/40 uppercase tracking-widest mb-1.5">Billing Cycle</label>
                <select 
                  value={billingCycle}
                  onChange={handleBillingChange}
                  className="w-full bg-black/5 border border-black/10 rounded-xl px-3 py-2 text-sm font-bold text-black outline-none focus:ring-2 focus:ring-blue-600 transition-all cursor-pointer"
                >
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly (10% Off)</option>
                </select>
              </div>
            </div>

            {/* Plan Summary Card */}
            <div className="mb-8 p-4 bg-black/5 rounded-2xl border border-black/5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-black/40 uppercase tracking-wider mb-1">Selected Plan</p>
                <h4 className="text-lg font-bold text-black">{plan.name} Tier</h4>
                <p className="text-xs text-black/60 font-medium capitalize">{billingCycle} Billing</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-blue-600">₹{totalAmount}</p>
                <p className="text-[10px] text-black/40 font-bold uppercase tracking-widest">Total Amount</p>
              </div>
            </div>

            <div className="bg-black/5 rounded-2xl p-6 mb-8 border border-black/5">
              <p className="text-sm font-bold text-black/40 uppercase tracking-wider mb-4">Scan QR to Pay</p>
              <div className="aspect-square bg-white rounded-xl border border-black/10 flex items-center justify-center mb-4 overflow-hidden shadow-inner">
                <img 
                  src="/qr.jpeg" 
                  alt="Payment QR Code" 
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=upi://pay?pa=abeerchoubey@fam&pn=GymLedger';
                  }}
                />
              </div>
              <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-black/10">
                <span className="text-sm font-medium text-black/60">abeerchoubey@fam</span>
                <button 
                  onClick={() => {
                    navigator.clipboard.writeText('abeerchoubey@fam');
                    alert('UPI ID copied!');
                  }}
                  className="text-blue-600 hover:text-blue-700 transition-colors"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-black/60">1</span>
                </div>
                <p className="text-sm text-black/60">Scan the QR code or use the UPI ID to make the payment for your chosen plan.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-black/5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-black/60">2</span>
                </div>
                <p className="text-sm text-black/60">Take a screenshot of the successful transaction.</p>
              </div>
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-2xl border border-blue-100">
                <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold text-white">3</span>
                </div>
                <div className="text-sm">
                  <p className="font-bold text-black/80 mb-2">
                    Kindly send the screenshot of transaction to our WhatsApp support:
                  </p>
                  <a 
                    href="https://wa.me/919425323937" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700 transition-all shadow-md"
                  >
                    Send to WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Account Activation Info */}
          <div className="bg-white rounded-3xl shadow-2xl border border-black/5 p-8 lg:p-10 flex flex-col justify-center text-center">
            <div className="w-20 h-20 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="text-blue-600 w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold text-black mb-4 tracking-tight">Account Activation</h3>
            <p className="text-black/60 leading-relaxed mb-8 text-lg">
              After the payment is verified, you will receive a <strong className="text-black">username and password</strong> via WhatsApp/Email. 
              Use these credentials to log in to your gym's dashboard and complete your profile setup.
            </p>

            <button 
              onClick={handlePaymentConfirm}
              className="w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all shadow-xl shadow-black/10"
            >
              I have made the payment
            </button>

            <div className="mt-8 p-4 bg-black/5 rounded-2xl border border-black/5 flex items-center gap-3 text-left">
              <ShieldCheck className="text-blue-600 w-5 h-5 flex-shrink-0" />
              <p className="text-xs text-black/60 font-medium leading-relaxed">
                Our verification team works 24/7 to ensure your dashboard is active within 2-4 hours of payment confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
