// src/components/Topbar.tsx
export function Topbar() {
  return (
    <header className="h-16 flex items-center justify-end px-6 bg-transparent">
      <div className="flex items-center space-x-3">
        <div className="text-right">
          <div className="font-semibold">User Name</div>
          <div className="text-xs text-gray-400">Role</div>
        </div>
        <img
          src="/avatars/user.png"
          alt="User"
          className="w-10 h-10 rounded-full border"
        />
      </div>
    </header>
  );
}
