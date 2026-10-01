import { Mail, Briefcase, Hash, MapPin, Phone, Calendar } from 'lucide-react';
import { useAuthStore } from '@/store/useAuthStore';
import { Card } from '@/components/ui/Card';
import { Avatar } from '@/components/ui/Avatar';
import { Button } from '@/components/ui/Button';

export function ProfilePage() {
  const user = useAuthStore((state) => state.user);
  const role = useAuthStore((state) => state.role);

  if (!user) return null;

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">My Profile</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your personal information and account preferences.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Avatar & Summary */}
        <div className="md:col-span-1 space-y-6">
          <Card>
            <Card.Body className="flex flex-col items-center text-center p-6">
              <Avatar name={user.name || 'User'} size="lg" className="h-24 w-24 mb-4 text-2xl" />
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">{user.name}</h2>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase tracking-wide mt-1">
                {role || 'Staff'}
              </p>
              <div className="w-full mt-6 space-y-3">
                <Button variant="outline" className="w-full">
                  Update Avatar
                </Button>
              </div>
            </Card.Body>
          </Card>
          
          <Card>
            <Card.Header title="Quick Info" />
            <Card.Body className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Hash className="w-4 h-4 text-slate-400" />
                <span>ID: EMP-{user.id?.toString().padStart(4, '0') || '0000'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Calendar className="w-4 h-4 text-slate-400" />
                <span>Joined: {user.joinedDate || 'Jan 15, 2023'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 dark:text-slate-300">
                <Briefcase className="w-4 h-4 text-slate-400" />
                <span>Department: {user.department || 'General Medicine'}</span>
              </div>
            </Card.Body>
          </Card>
        </div>

        {/* Right Column: Details Form (Read Only / Edit Mock) */}
        <div className="md:col-span-2">
          <Card>
            <Card.Header 
              title="Personal Details" 
              description="Update your contact information and personal details here."
            />
            <Card.Body className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Full Name</label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                    <span className="flex-1 truncate">{user.name}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Email Address</label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                    <Mail className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="flex-1 truncate">{user.email || `${role}@hospital.com`}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Phone Number</label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                    <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="flex-1 truncate">{user.phone || '+92 300 1234567'}</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-slate-700 dark:text-slate-300">Location</label>
                  <div className="flex items-center gap-2 px-3 py-2 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white">
                    <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                    <span className="flex-1 truncate">{user.location || 'Lahore, Pakistan'}</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-100 dark:border-slate-800">
                <Button variant="outline">Cancel</Button>
                <Button variant="primary">Save Changes</Button>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
