import { BadgeCheck } from 'lucide-react';

export default function ProfileHeader({ username }: { username: string }) {
  const initials = username[0].toUpperCase();

  return (
    <div className="text-center py-5 space-y-4">
      <div className="relative inline-block">
        <div className="w-24 h-24 rounded-full border-4 border-white shadow-lg flex items-center justify-center 
                        text-white text-3xl font-bold
                        bg-gradient-to-br from-teal-500 to-teal-700
                        select-none">
          {initials}
        </div>
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-1.5 shadow-md">
          <BadgeCheck className="w-6 h-6 text-teal-600 fill-teal-100" />
        </div>
      </div>
      
     <div className="space-y-1">
  <div className="flex items-center justify-center space-x-1.5">
    
    <h1 className="text-3xl font-bold tracking-tight text-slate-900">
      @{username}
    </h1>
  </div>
  
  <p className="text-slate-500 font-medium max-w-xs mx-auto text-base">
    Send <span className="text-slate-900 font-semibold">{username}</span> a payment instantly.
  </p>
</div>
    </div>
  );
}