import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/authSlice'; 
import { useNavigate } from 'react-router-dom';
import { User, Lock, ArrowRight } from 'lucide-react';

export default function Login() {
  const [creds, setCreds] = useState({ user: '', pass: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch(); 
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    setTimeout(() => {
      if (creds.user && creds.pass) {
        dispatch(login()); 
        navigate('/products');
      } else {
        alert("Enter any username/password");
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 p-4">
        <div className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white/10 p-8 shadow-2xl backdrop-blur-xl border border-white/20">
            <form onSubmit={handleSubmit} className="space-y-6">
                
                  <div className="space-y-4">
                    <div className="relative group">
                         <div className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-slate-400 transition group-focus-within:text-blue-400">
                             <User size={20} />
                         </div>
                         <input type="text" placeholder="Username" className="w-full rounded-xl bg-slate-800/50 border border-slate-700 py-4 pl-12 pr-4 text-white placeholder-slate-400 outline-none ring-0 transition-all focus:border-blue-500 focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/20" onChange={(e) => setCreds({ ...creds, user: e.target.value })} required />
                    </div>
                    <div className="relative group">
                         <div className="absolute left-0 top-0 flex h-full w-12 items-center justify-center text-slate-400 transition group-focus-within:text-blue-400">
                             <Lock size={20} />
                         </div>
                         <input type="password" placeholder="Password" className="w-full rounded-xl bg-slate-800/50 border border-slate-700 py-4 pl-12 pr-4 text-white placeholder-slate-400 outline-none ring-0 transition-all focus:border-blue-500 focus:bg-slate-800 focus:ring-4 focus:ring-blue-500/20" onChange={(e) => setCreds({ ...creds, pass: e.target.value })} required />
                    </div>
                 </div>
                 <button disabled={isLoading} className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 p-4 font-bold text-white shadow-lg transition-all hover:scale-[1.02] hover:shadow-blue-500/25 active:scale-95 disabled:cursor-not-allowed disabled:opacity-70">
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isLoading ? 'Signing In...' : 'Access Dashboard'}
                      {!isLoading && <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />}
                    </span>
                 </button>
            </form>
        </div>
      </div>
  );
}