import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Users, 
  Plus, 
  Search, 
  LogOut, 
  RefreshCw, 
  Trash2, 
  Loader2, 
  Calendar, 
  Phone, 
  User,
  ShieldCheck,
  AlertCircle,
  CheckCircle2,
  X,
  Clock
} from 'lucide-react';
import Logo from '../components/Logo';
import { membersApi } from '../services/api';
import { cn } from '../lib/utils';

interface Member {
  id: number;
  name: string;
  phone: string;
  join_date: string;
  expiry_date: string;
}

export default function Dashboard() {
  const [members, setMembers] = React.useState<Member[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [gymStatus, setGymStatus] = React.useState<string>('');
  const [searchQuery, setSearchQuery] = React.useState('');
  const [isAddModalOpen, setIsAddModalOpen] = React.useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = React.useState(false);
  const [isRenewModalOpen, setIsRenewModalOpen] = React.useState(false);
  const [selectedMember, setSelectedMember] = React.useState<Member | null>(null);
  
  // Tier info
  const [tier, setTier] = React.useState<number>(1);
  const TIER_LIMITS: Record<number, number> = {
    1: 50,
    2: 150,
    3: 350,
    4: 1000
  };
  const memberLimit = TIER_LIMITS[tier as keyof typeof TIER_LIMITS] || 50;
  const currentMembers = members.length;
  const isLimitReached = currentMembers >= memberLimit;
  const usagePercent = (currentMembers / memberLimit) * 100;
  const isNearLimit = usagePercent >= 80;

  const getUsageColor = () => {
    if (usagePercent >= 100) return 'text-red-500';
    if (usagePercent >= 70) return 'text-yellow-500';
    return 'text-green-500';
  };

  // Add Member Form
  const [newName, setNewName] = React.useState('');
  const [newPhone, setNewPhone] = React.useState('');
  const [newPlanDays, setNewPlanDays] = React.useState(30);
  const [newAmount, setNewAmount] = React.useState(0);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const navigate = useNavigate();

  const username = localStorage.getItem('username') || '';

  const fetchMembers = async () => {
    try {
      setLoading(true);
      const response = await membersApi.getMembers();
      setMembers(response.members || []);
      if (response.tier) setTier(response.tier);
      
      try {
        const statusRes = await membersApi.getMemberStatus();
        setGymStatus(statusRes.status);
        if (statusRes.tier) setTier(statusRes.tier);
      } catch (statusErr) {
        console.warn('Failed to fetch gym status');
      }
    } catch (err: any) {
      setError('Failed to fetch members. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchMembers();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    navigate('/login');
  };

  const handleAddMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLimitReached) {
      alert('Member limit reached. Upgrade your plan to add more members.');
      return;
    }
    setIsSubmitting(true);
    try {
      await membersApi.addMember({
        name: newName,
        phone: newPhone,
        plan_days: String(newPlanDays),
        amount: String(newAmount)
      });
      fetchMembers();
      setIsAddModalOpen(false);
      setNewName('');
      setNewPhone('');
      setNewPlanDays(30);
      setNewAmount(0);
    } catch (err: any) {
      if (err.status === 403) {
        alert('Member limit reached. Upgrade your plan to add more members.');
      } else {
        alert(err.message || 'Failed to add member');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteMember = async (id: number) => {
    if (!window.confirm('Are you sure you want to delete this member?')) return;
    try {
      await membersApi.deleteMember(id);
      setMembers(members.filter(m => m.id !== id));
    } catch (err: any) {
      alert('Failed to delete member');
    }
  };

  const handleRenewMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    setIsSubmitting(true);
    try {
      await membersApi.renewMember(selectedMember.id, newPlanDays);
      fetchMembers();
      setIsRenewModalOpen(false);
      setSelectedMember(null);
      setNewPlanDays(30);
    } catch (err: any) {
      alert('Failed to renew membership');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditMember = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;
    setIsSubmitting(true);
    try {
      await membersApi.editMember(selectedMember.id, {
        name: newName,
        phone: newPhone
      });
      fetchMembers();
      setIsEditModalOpen(false);
      setSelectedMember(null);
      setNewName('');
      setNewPhone('');
    } catch (err: any) {
      alert('Failed to edit member');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTierChange = (tier: string) => {
    localStorage.setItem('selected_plan', tier);
    window.location.reload();
  };

  const filteredMembers = members.filter(m => 
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.phone.includes(searchQuery)
  );

  const isExpired = (expiryDate: string) => {
    return new Date(expiryDate) < new Date();
  };

  const isExpiringSoon = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays >= 0 && diffDays <= 7;
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans">
      {/* Header */}
      <header className="bg-black border-b border-white/10 sticky top-0 z-30 shadow-xl shadow-black/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <Logo textClassName="text-white" />
          
          <div className="flex items-center gap-6">
            <div className={cn(
              "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
              "bg-blue-600 text-white border-blue-500"
            )}>
              Tier {tier}
            </div>
            {gymStatus && (
              <div className={cn(
                "px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border shadow-sm",
                gymStatus === 'active' && "bg-white text-black border-black/10",
                gymStatus === 'expired' && "bg-red-500 text-white border-red-400",
                gymStatus === 'expiring' && "bg-yellow-400 text-black border-yellow-300",
                gymStatus === 'no_plan' && "bg-white/10 text-white border-white/20"
              )}>
                {gymStatus.replace('_', ' ')}
              </div>
            )}
            <div className="hidden md:flex flex-col items-end">
              <span className="text-xs font-bold text-white/90 truncate max-w-[150px]">{username}</span>
              <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest">Gym Owner</span>
            </div>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 text-white/70 hover:text-blue-400 font-bold transition-all group"
            >
              <LogOut className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              <span className="hidden sm:block text-sm">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Dashboard Actions */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-black text-black tracking-tighter">Member Directory</h1>
            <p className="text-black/40 font-medium mt-1">Manage your gym memberships and track renewals in real-time</p>
          </div>
          <div className="flex items-center gap-3">
            <button 
              onClick={() => setIsAddModalOpen(true)}
              disabled={isLimitReached}
              className={cn(
                "bg-black text-white px-8 py-4 rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-blue-600 transition-all shadow-2xl shadow-black/10 active:scale-95",
                isLimitReached && "bg-black/20 hover:bg-black/30 cursor-not-allowed shadow-none"
              )}
            >
              <Plus className="w-5 h-5" />
              Add New Member
            </button>
            {/* Upgrade buttons removed as all users are paid and payment interface is hidden */}
          </div>
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6 mb-10">
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-2xl shadow-black/5 group hover:border-blue-600/20 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
                <Users className="text-blue-500 w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1">Total Members</p>
                <div className="flex items-baseline gap-1.5">
                  <p className={cn("text-3xl font-black tracking-tighter", getUsageColor())}>{currentMembers}</p>
                  <p className="text-black/20 text-sm font-bold">/ {memberLimit}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-2xl shadow-black/5 group hover:border-blue-600/20 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/10 group-hover:scale-110 transition-transform">
                <CheckCircle2 className="text-white w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1">Active</p>
                <p className="text-3xl font-black text-black tracking-tighter">
                  {members.filter(m => !isExpired(m.expiry_date)).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-2xl shadow-black/5 group hover:border-blue-600/20 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center shadow-lg shadow-black/10 group-hover:scale-110 transition-transform">
                <Clock className="text-blue-500 w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1">Expiring Soon</p>
                <p className="text-3xl font-black text-black tracking-tighter">
                  {members.filter(m => isExpiringSoon(m.expiry_date)).length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-2xl shadow-black/5 group hover:border-blue-600/20 transition-all">
            <div className="flex items-center gap-5">
              <div className="w-14 h-14 bg-red-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/10 group-hover:scale-110 transition-transform">
                <AlertCircle className="text-white w-7 h-7" />
              </div>
              <div>
                <p className="text-[10px] text-black/40 font-black uppercase tracking-widest mb-1">Expired</p>
                <p className="text-3xl font-black text-black tracking-tighter">
                  {members.filter(m => isExpired(m.expiry_date)).length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Tier Benefits Alert */}
        {isNearLimit && (
          <div className={cn(
            "mb-10 p-6 rounded-3xl border flex items-center justify-between gap-6 shadow-xl shadow-black/5",
            isLimitReached ? "bg-red-500 text-white border-red-400" : "bg-yellow-400 text-black border-yellow-300"
          )}>
            <div className="flex items-center gap-4">
              <div className={cn(
                "w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0",
                isLimitReached ? "bg-white/20" : "bg-black/10"
              )}>
                <AlertCircle className="w-6 h-6" />
              </div>
              <div>
                <p className="font-black text-lg tracking-tight">
                  {isLimitReached ? "Member limit reached" : "You're close to your limit"}
                </p>
                <p className={cn("text-sm font-medium", isLimitReached ? "text-white/80" : "text-black/60")}>
                  {isLimitReached 
                    ? "Upgrade your plan to add more members." 
                    : "You have used " + Math.round(usagePercent) + "% of your member limit. Upgrade your plan to avoid interruption."}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className={cn(
          "mb-10 p-6 rounded-3xl border flex items-center justify-between gap-6 shadow-xl shadow-black/5",
          "bg-black text-white border-white/10"
        )}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="font-black text-lg tracking-tight">You are on Tier {tier}</p>
              <p className="text-sm text-white/60 font-medium">
                {tier === 1 && "Enjoy basic member tracking for up to 50 members."}
                {tier === 2 && "Professional management for up to 150 members with priority tracking."}
                {tier === 3 && "Advanced gym management for up to 350 members with full analytics."}
                {tier === 4 && "Enterprise power! Manage up to 1000 members with VIP support."}
              </p>
            </div>
          </div>
          {/* Upgrade button removed as all users are paid and payment interface is hidden */}
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-[2rem] border border-black/5 shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
          <div className="p-6 border-b border-black/5 bg-black/[0.02]">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
              <input 
                type="text"
                placeholder="Search by name or phone..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-6 py-4 rounded-2xl border border-black/5 bg-white focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all placeholder:text-black/20 font-bold"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-black">
                  <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Member</th>
                  <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Phone</th>
                  <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Join Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Expiry Date</th>
                  <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Status</th>
                  <th className="px-8 py-5 text-[10px] font-black text-white/40 uppercase tracking-[0.2em] text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-black/5">
                {loading ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <div className="flex flex-col items-center gap-4">
                        <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
                        <p className="text-black/40 font-black uppercase tracking-widest text-xs">Loading members...</p>
                      </div>
                    </td>
                  </tr>
                ) : filteredMembers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-8 py-20 text-center">
                      <p className="text-black/40 font-black uppercase tracking-widest text-xs">No members found</p>
                    </td>
                  </tr>
                ) : (
                  filteredMembers.map((member) => (
                    <tr key={member.id} className="hover:bg-black/[0.01] transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-blue-500 font-black shadow-lg shadow-black/5 group-hover:scale-105 transition-transform">
                            {member.name.charAt(0).toUpperCase()}
                          </div>
                          <span className="font-black text-black tracking-tight">{member.name}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-black/60 font-bold">{member.phone}</td>
                      <td className="px-8 py-6 text-black/40 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600/40" />
                          {new Date(member.join_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-black/40 text-sm font-medium">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4 text-blue-600/40" />
                          {new Date(member.expiry_date).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        {isExpired(member.expiry_date) ? (
                          <span className="px-4 py-1.5 bg-red-500 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-red-500/10">Expired</span>
                        ) : isExpiringSoon(member.expiry_date) ? (
                          <span className="px-4 py-1.5 bg-yellow-400 text-black text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-yellow-400/10">Expiring Soon</span>
                        ) : (
                          <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest shadow-lg shadow-blue-600/10">Active</span>
                        )}
                      </td>
                      <td className="px-8 py-6 text-right">
                        <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => {
                              setSelectedMember(member);
                              setNewName(member.name);
                              setNewPhone(member.phone);
                              setIsEditModalOpen(true);
                            }}
                            className="p-3 text-black/40 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Edit Member"
                          >
                            <User className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => {
                              setSelectedMember(member);
                              setIsRenewModalOpen(true);
                            }}
                            className="p-3 text-black/40 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"
                            title="Renew Membership"
                          >
                            <RefreshCw className="w-5 h-5" />
                          </button>
                          <button 
                            onClick={() => handleDeleteMember(member.id)}
                            className="p-3 text-black/40 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Member"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* Add Member Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300 border border-black/5">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-black tracking-tighter">New Member</h2>
                <button onClick={() => setIsAddModalOpen(false)} className="text-black/20 hover:text-black transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <form onSubmit={handleAddMember} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
                    <input 
                      required
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all placeholder:text-black/20 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
                    <input 
                      required
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all placeholder:text-black/20 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Plan Duration</label>
                  <select 
                    value={newPlanDays}
                    onChange={(e) => setNewPlanDays(Number(e.target.value))}
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all appearance-none text-black font-bold cursor-pointer"
                  >
                    <option value={30}>30 Days (Monthly)</option>
                    <option value={90}>90 Days (Quarterly)</option>
                    <option value={180}>180 Days (Half-Yearly)</option>
                    <option value={365}>365 Days (Yearly)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Amount Paid (₹)</label>
                  <input 
                    required
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    placeholder="500"
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all placeholder:text-black/20 font-bold"
                  />
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting || isLimitReached}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg mt-4 hover:bg-blue-600 transition-all shadow-2xl shadow-black/10 disabled:opacity-70 flex items-center justify-center gap-3 active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : isLimitReached ? 'Limit Reached' : 'Register Member'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Edit Member Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300 border border-black/5">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-3xl font-black text-black tracking-tighter">Edit Member</h2>
                <button onClick={() => setIsEditModalOpen(false)} className="text-black/20 hover:text-black transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <form onSubmit={handleEditMember} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
                    <input 
                      required
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="John Doe"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all placeholder:text-black/20 font-bold"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-black/20 w-5 h-5" />
                    <input 
                      required
                      type="tel"
                      value={newPhone}
                      onChange={(e) => setNewPhone(e.target.value)}
                      placeholder="9876543210"
                      className="w-full pl-12 pr-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all placeholder:text-black/20 font-bold"
                    />
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg mt-4 hover:bg-blue-600 transition-all shadow-2xl shadow-black/10 disabled:opacity-70 flex items-center justify-center gap-3 active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Update Member'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Renew Modal */}
      {isRenewModalOpen && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[2.5rem] w-full max-w-md shadow-[0_64px_128px_-24px_rgba(0,0,0,0.3)] animate-in zoom-in-95 duration-300 border border-black/5">
            <div className="p-10">
              <div className="flex justify-between items-center mb-8">
                <div>
                  <h2 className="text-3xl font-black text-black tracking-tighter">Renew</h2>
                  <p className="text-black/40 font-bold text-sm">Extending {selectedMember?.name}</p>
                </div>
                <button onClick={() => setIsRenewModalOpen(false)} className="text-black/20 hover:text-black transition-colors">
                  <X className="w-8 h-8" />
                </button>
              </div>
              <form onSubmit={handleRenewMember} className="space-y-6">
                <div>
                  <label className="block text-[10px] font-black text-black/40 uppercase tracking-[0.2em] mb-2">Extend By</label>
                  <select 
                    value={newPlanDays}
                    onChange={(e) => setNewPlanDays(Number(e.target.value))}
                    className="w-full px-6 py-4 rounded-2xl border border-black/5 bg-black/[0.02] focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 outline-none transition-all appearance-none text-black font-bold cursor-pointer"
                  >
                    <option value={30}>30 Days (Monthly)</option>
                    <option value={90}>90 Days (Quarterly)</option>
                    <option value={180}>180 Days (Half-Yearly)</option>
                    <option value={365}>365 Days (Yearly)</option>
                  </select>
                </div>
                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-black text-white py-5 rounded-2xl font-black text-lg mt-4 hover:bg-blue-600 transition-all shadow-2xl shadow-black/10 disabled:opacity-70 flex items-center justify-center gap-3 active:scale-95"
                >
                  {isSubmitting ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Confirm Renewal'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
