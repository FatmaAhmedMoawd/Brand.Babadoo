import React, { useState, useMemo } from 'react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';
import {
  Users,
  ShieldCheck,
  UserCheck,
  Search,
  SlidersHorizontal,
  Plus,
  UserPlus,
  Pencil,
  Trash2,
  X,
  Check,
  AlertTriangle,
  ChevronLeft,
  ChevronDown,
  Mail,
  User,
  Phone,
  ShoppingCart,
  Box,
  Coins,
  Tag,
  Eye,
  Edit2,
  RotateCcw,
  PlusSquare,
  ArrowDownToLine,
  FileText,
  Upload
} from 'lucide-react';

// Define Interface for Team Member
interface TeamMember {
  id: string;
  name: string;
  email: string;
  phone?: string;
  branch?: string;
  role: 'Branch manager' | 'Branch staff';
  lastActive: string;
  active: boolean;
  avatarUrl: string;
  permissions?: {
    orders: { enabled: boolean; view: boolean; update: boolean; refund: boolean };
    products: { enabled: boolean; add: boolean; edit: boolean; delete: boolean };
    financials: { enabled: boolean; view: boolean; withdraw: boolean };
    offers: { enabled: boolean; create: boolean; delete: boolean; reports: boolean };
  };
}

export const TeamManagementView: React.FC = () => {
  // Current high-level view mode: 'list' (Main Team Management Dashboard), 'add' (Add Team Member page), or 'edit' (Edit Team Member page)
  const [viewMode, setViewMode] = useState<'list' | 'add' | 'edit'>('list');

  // Initial team members state, using the exact photos and details provided in the screenshot
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: '1',
      name: 'Ahmed Mohamed',
      email: 'ahmed.m@vendor.com',
      phone: '01011223344',
      branch: 'Main Branch - Downtown',
      role: 'Branch manager',
      lastActive: '5 minutes ago',
      active: true,
      avatarUrl: 'https://i.postimg.cc/HWh2Nvqb/Capture.png',
      permissions: {
        orders: { enabled: true, view: true, update: true, refund: true },
        products: { enabled: true, add: true, edit: true, delete: true },
        financials: { enabled: true, view: true, withdraw: true },
        offers: { enabled: true, create: true, delete: true, reports: true }
      }
    },
    {
      id: '2',
      name: 'Sara Ali',
      email: 'sara.ali@vendor.com',
      phone: '01222334455',
      branch: 'Main Branch - Downtown',
      role: 'Branch staff',
      lastActive: '30 minutes ago',
      active: false,
      avatarUrl: 'https://i.postimg.cc/3RwXS29n/Capture.png',
      permissions: {
        orders: { enabled: true, view: true, update: true, refund: false },
        products: { enabled: true, add: true, edit: false, delete: false },
        financials: { enabled: false, view: false, withdraw: false },
        offers: { enabled: true, create: true, delete: false, reports: false }
      }
    },
    {
      id: '3',
      name: 'Mahmoud Hassan',
      email: 'mahmoud.h@vendor.com',
      phone: '01555667788',
      branch: 'North Branch',
      role: 'Branch staff',
      lastActive: '2 Hours ago',
      active: true,
      avatarUrl: 'https://i.postimg.cc/prwKL4xd/Capture.png',
      permissions: {
        orders: { enabled: true, view: true, update: true, refund: false },
        products: { enabled: true, add: true, edit: true, delete: false },
        financials: { enabled: false, view: false, withdraw: false },
        offers: { enabled: true, create: true, delete: false, reports: true }
      }
    },
    {
      id: '4',
      name: 'Fatima Omar',
      email: 'fatima.o@vendor.com',
      phone: '01111222333',
      branch: 'Main Branch - Downtown',
      role: 'Branch staff',
      lastActive: '5 minutes ago',
      active: false,
      avatarUrl: 'https://i.postimg.cc/Bnc2JmzG/Capture.png',
      permissions: {
        orders: { enabled: true, view: true, update: true, refund: false },
        products: { enabled: true, add: true, edit: false, delete: false },
        financials: { enabled: false, view: false, withdraw: false },
        offers: { enabled: true, create: true, delete: false, reports: false }
      }
    },
  ]);

  // Search and filter state
  const [searchQuery, setSearchQuery] = useState('');
  const [branchFilter, setBranchFilter] = useState<'All' | 'Manager' | 'Staff'>('All');

  // Interactive dialog controls
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  // Lock scrolling when the delete modal is open
  useBodyScrollLock(isDeleteModalOpen);

  // Buffer fields for Full-Screen "Edit Page"
  const [editName, setEditName] = useState('');
  const [editEmail, setEditEmail] = useState('');
  const [editPhone, setEditPhone] = useState('');
  const [editBranch, setEditBranch] = useState('Main Branch - Downtown');
  const [editRole, setEditRole] = useState<'Branch manager' | 'Branch staff'>('Branch staff');
  const [editActive, setEditActive] = useState(true);
  const [editAvatar, setEditAvatar] = useState('https://i.postimg.cc/HWh2Nvqb/Capture.png');
  const [isEditBranchDropdownOpen, setIsEditBranchDropdownOpen] = useState(false);
  const [isEditRoleDropdownOpen, setIsEditRoleDropdownOpen] = useState(false);

  // Buffer permission toggles for Edit Page
  const [editOrdersEnabled, setEditOrdersEnabled] = useState(true);
  const [editOrderPerms, setEditOrderPerms] = useState({ view: true, update: true, refund: false });

  const [editProductsEnabled, setEditProductsEnabled] = useState(true);
  const [editProductPerms, setEditProductPerms] = useState({ add: true, edit: false, delete: false });

  const [editFinancialsEnabled, setEditFinancialsEnabled] = useState(false);
  const [editFinancialPerms, setEditFinancialPerms] = useState({ view: false, withdraw: false });

  const [editOffersEnabled, setEditOffersEnabled] = useState(true);
  const [editOffersPerms, setEditOffersPerms] = useState({ create: true, delete: false, reports: false });

  // Toast message state for "Changes saved successfully"
  const [showToast, setShowToast] = useState(false);

  // Buffer fields for "Add Team Member Page" (mirrors photo references & input screen components)
  const [addName, setAddName] = useState('');
  const [addEmail, setAddEmail] = useState('');
  const [addPhone, setAddPhone] = useState('');
  const [addBranch, setAddBranch] = useState('Main Branch - Downtown');
  const [addRole, setAddRole] = useState<'Branch manager' | 'Branch staff'>('Branch staff');
  const [addAvatar, setAddAvatar] = useState('https://i.postimg.cc/HWh2Nvqb/Capture.png');
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);

  // Handle local image upload from device as Base64 encoded URL
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setUploadedAvatar(base64String);
        setAddAvatar(base64String);
        setEditAvatar(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  // Dropdown UI states for custom selectors in the Add Member page
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);

  // Permission toggles for Add Member Page
  const [ordersEnabled, setOrdersEnabled] = useState(true);
  const [orderPerms, setOrderPerms] = useState({ view: true, update: true, refund: false });

  const [productsEnabled, setProductsEnabled] = useState(true);
  const [productPerms, setProductPerms] = useState({ add: true, edit: false, delete: false });

  const [financialsEnabled, setFinancialsEnabled] = useState(false);
  const [financialPerms, setFinancialPerms] = useState({ view: false, withdraw: false });

  const [offersEnabled, setOffersEnabled] = useState(true);
  const [offersPerms, setOffersPerms] = useState({ create: true, delete: false, reports: false });

  // Calculated Metrics
  const totalTeamCount = teamMembers.length;
  const managersCount = teamMembers.filter((m) => m.role === 'Branch manager').length;
  const activeNowCount = teamMembers.filter((m) => m.active).length;

  // Filtered members list
  const filteredMembers = useMemo(() => {
    return teamMembers.filter((member) => {
      const matchesSearch =
        member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        member.role.toLowerCase().includes(searchQuery.toLowerCase());

      if (branchFilter === 'All') return matchesSearch;
      if (branchFilter === 'Manager') return matchesSearch && member.role === 'Branch manager';
      if (branchFilter === 'Staff') return matchesSearch && member.role === 'Branch staff';
      return matchesSearch;
    });
  }, [teamMembers, searchQuery, branchFilter]);

  // Handle toggle active status
  const handleToggleActive = (id: string) => {
    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, active: !member.active } : member
      )
    );
  };

  // Pre-fill fields for editing and jump to FULL EDIT VIEW PAGE
  const handleOpenEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setEditName(member.name);
    setEditEmail(member.email);
    setEditPhone(member.phone || '01011223344');
    setEditBranch(member.branch || 'Main Branch - Downtown');
    setEditRole(member.role);
    setEditActive(member.active);
    setEditAvatar(member.avatarUrl);

    // Load member's specific permissions or fallback to defaults
    if (member.permissions) {
      setEditOrdersEnabled(member.permissions.orders.enabled);
      setEditOrderPerms({
        view: member.permissions.orders.view,
        update: member.permissions.orders.update,
        refund: member.permissions.orders.refund
      });

      setEditProductsEnabled(member.permissions.products.enabled);
      setEditProductPerms({
        add: member.permissions.products.add,
        edit: member.permissions.products.edit,
        delete: member.permissions.products.delete
      });

      setEditFinancialsEnabled(member.permissions.financials.enabled);
      setEditFinancialPerms({
        view: member.permissions.financials.view,
        withdraw: member.permissions.financials.withdraw
      });

      setEditOffersEnabled(member.permissions.offers.enabled);
      setEditOffersPerms({
        create: member.permissions.offers.create,
        delete: member.permissions.offers.delete,
        reports: member.permissions.offers.reports
      });
    } else {
      // standard fallbacks
      setEditOrdersEnabled(true);
      setEditOrderPerms({ view: true, update: true, refund: false });
      setEditProductsEnabled(true);
      setEditProductPerms({ add: true, edit: false, delete: false });
      setEditFinancialsEnabled(false);
      setEditFinancialPerms({ view: false, withdraw: false });
      setEditOffersEnabled(true);
      setEditOffersPerms({ create: true, delete: false, reports: false });
    }

    setViewMode('edit');
  };

  // Pre-fill for delete confirmation
  const handleOpenDeleteConfirm = (member: TeamMember) => {
    setSelectedMember(member);
    setIsDeleteModalOpen(true);
  };

  // Edit existing member action (handles saving with full controls)
  const handleSaveEditMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember || !editName.trim() || !editEmail.trim()) {
      alert('Please fill in both Full Name and Email Address');
      return;
    }

    setTeamMembers((prev) =>
      prev.map((member) =>
        member.id === selectedMember.id
          ? {
              ...member,
              name: editName,
              email: editEmail,
              phone: editPhone,
              branch: editBranch,
              role: editRole,
              active: editActive,
              permissions: {
                orders: { enabled: editOrdersEnabled, ...editOrderPerms },
                products: { enabled: editProductsEnabled, ...editProductPerms },
                financials: { enabled: editFinancialsEnabled, ...editFinancialPerms },
                offers: { enabled: editOffersEnabled, ...editOffersPerms }
              }
            }
          : member
      )
    );

    // Show beautiful toast notification "Changes saved successfully"
    setShowToast(true);

    // Automatically dismiss the toast and redirect to list after 2.2 seconds
    setTimeout(() => {
      setShowToast(false);
      setViewMode('list');
      setSelectedMember(null);
    }, 2200);
  };

  // Delete member action
  const handleDeleteMember = () => {
    if (!selectedMember) return;
    setTeamMembers((prev) => prev.filter((m) => m.id !== selectedMember.id));
    setIsDeleteModalOpen(false);
    setSelectedMember(null);
    setViewMode('list');
  };

  // Add new member action (from the Add Member sub-view page)
  const handleCreateTeamMember = () => {
    if (!addName.trim() || !addEmail.trim()) {
      alert('Please fill in both Full Name and Email Address');
      return;
    }

    const newMember: TeamMember = {
      id: Date.now().toString(),
      name: addName,
      email: addEmail,
      phone: addPhone,
      branch: addBranch,
      role: addRole,
      lastActive: 'Just now',
      active: true, // Default to active since they are invited/newly set
      avatarUrl: addAvatar,
      permissions: {
        orders: { enabled: ordersEnabled, ...orderPerms },
        products: { enabled: productsEnabled, ...productPerms },
        financials: { enabled: financialsEnabled, ...financialPerms },
        offers: { enabled: offersEnabled, ...offersPerms }
      }
    };

    setTeamMembers((prev) => [...prev, newMember]);
    
    // Reset buffer & return to list mode
    setAddName('');
    setAddEmail('');
    setAddPhone('');
    setAddBranch('Main Branch - Downtown');
    setAddRole('Branch staff');
    setAddAvatar('https://i.postimg.cc/Vv1m6r7p/default-avatar.png');
    setUploadedAvatar(null);
    
    setOrdersEnabled(true);
    setOrderPerms({ view: true, update: true, refund: false });
    setProductsEnabled(true);
    setProductPerms({ add: true, edit: false, delete: false });
    setFinancialsEnabled(false);
    setFinancialPerms({ view: false, withdraw: false });
    setOffersEnabled(true);
    setOffersPerms({ create: true, delete: false, reports: false });

    setViewMode('list');
  };

  // Go to add member page
  const activateAddMemberPage = () => {
    setAddName('');
    setAddEmail('');
    setAddPhone('');
    setAddBranch('Main Branch - Downtown');
    setAddRole('Branch staff');
    setUploadedAvatar(null);
    
    // Set nice default outline placeholder as default selected under-the-hood
    setAddAvatar('https://i.postimg.cc/Vv1m6r7p/default-avatar.png');
    setViewMode('add');
  };

  return (
    <div id="team-view-container" className="select-none animate-fadeIn">
      {viewMode === 'list' ? (
        <div id="team-list-view" className="space-y-7">
          {/* 1. Header Area with exact alignment */}
          <div id="team-header-bar" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div id="team-header-titles" className="text-start">
              <h1 id="team-main-title" className="text-3xl font-black text-[#1F1F1F] font-sans tracking-tight leading-none">
                Team Management
              </h1>
              <p id="team-main-subtitle" className="text-[14.5px] font-medium text-gray-400 mt-2 font-sans">
                Manage access permissions and staff roles
              </p>
            </div>

            {/* Solid brown premium button with direct link to the new sub-view page */}
            <button
              id="team-add-member-btn"
              onClick={activateAddMemberPage}
              className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-sans py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md self-start sm:self-auto text-[14.5px]"
            >
              <UserPlus className="w-5 h-5 shrink-0" />
              <span>Add Team Member</span>
            </button>
          </div>

          {/* 2. Responsive Metrics Row matching pixel aesthetics */}
          <div id="team-metrics-row" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Metric Card 1: Total Team */}
            <div
              id="metric-card-total"
              className="bg-white rounded-[24px] p-6 border border-gray-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#FCF4EC] border border-[#AE6727]/10 flex items-center justify-center">
                    <Users className="w-5 h-5 text-[#AE6727]" />
                  </div>
                  <span className="text-[#646464] font-bold font-sans text-[15px]">Total Team</span>
                </div>
              </div>
              <div className="mt-5 text-start">
                <span className="text-[34px] font-black text-gray-950 font-sans leading-none">
                  {totalTeamCount}
                </span>
              </div>
            </div>

            {/* Metric Card 2: TotalManagers */}
            <div
              id="metric-card-managers"
              className="bg-white rounded-[24px] p-6 border border-gray-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#E6FDF4] border border-emerald-500/10 flex items-center justify-center">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  </div>
                  <span className="text-[#646464] font-bold font-sans text-[15px]">TotalManagers</span>
                </div>
              </div>
              <div className="mt-5 text-start">
                <span className="text-[34px] font-black text-gray-950 font-sans leading-none">
                  {managersCount}
                </span>
              </div>
            </div>

            {/* Metric Card 3: Active Now */}
            <div
              id="metric-card-active"
              className="bg-white rounded-[24px] p-6 border border-gray-100/50 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-between"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-[#EEF2FF] border border-blue-500/10 flex items-center justify-center">
                    <UserCheck className="w-5 h-5 text-blue-500" />
                  </div>
                  <span className="text-[#646464] font-bold font-sans text-[15px]">Active Now</span>
                </div>
              </div>
              <div className="mt-5 text-start">
                <span className="text-[34px] font-black text-gray-950 font-sans leading-none">
                  {activeNowCount}
                </span>
              </div>
            </div>

          </div>

          {/* 3. Main Data Card Container */}
          <div id="team-table-card" className="bg-white rounded-[24px] border border-gray-100 shadow-[0_8px_30px_rgba(0,0,0,0.03)] overflow-hidden">
            
            {/* Table Search & Filter Toolbar */}
            <div id="team-table-toolbar" className="p-6 pb-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <h2 id="team-table-title" className="text-xl font-black text-gray-900 font-sans text-start shrink-0">
                Team Members
              </h2>

              <div id="team-toolbar-controls" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:max-w-2xl lg:justify-end">
                
                {/* Search Input Box */}
                <div className="relative flex-1 min-w-0">
                  <Search className="absolute start-4.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400" />
                  <input
                    type="text"
                    id="team-search-input"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by name, email, or role"
                    className="w-full ps-[46px] pe-4 py-3 rounded-xl border border-gray-100 bg-gray-50/50 hover:bg-gray-50 focus:bg-white text-gray-900 placeholder-gray-400 text-[14px] font-medium outline-none transition-all focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery('')}
                      className="absolute end-3 top-1/2 -translate-y-1/2 p-1 text-gray-400 hover:text-gray-600 rounded-full"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>

                {/* Simulated Role Filtering dropdown styled cleanly */}
                <div className="relative shrink-0">
                  <SlidersHorizontal className="absolute start-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <select
                    id="team-role-filter-dropdown"
                    value={branchFilter}
                    onChange={(e) => setBranchFilter(e.target.value as any)}
                    className="ps-10 pe-9 py-3 rounded-xl border border-gray-100 bg-white hover:bg-gray-50 text-gray-700 text-[14px] font-bold outline-none cursor-pointer transition-colors appearance-none select-none"
                  >
                    <option value="All">All Branches</option>
                    <option value="Manager">Only Managers</option>
                    <option value="Staff">Only Staff</option>
                  </select>
                  <div className="absolute end-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">
                    ▼
                  </div>
                </div>

              </div>
            </div>

            {/* Members List Table Grid */}
            <div id="team-table-wrapper" className="overflow-x-auto">
              <table id="team-data-table" className="w-full min-w-[800px] border-collapse text-start">
                
                {/* Table Header Row */}
                <thead>
                  <tr className="border-b border-gray-100 bg-[#FAF9F9]/85">
                    <th className="py-4.5 px-6 text-[13px] font-bold text-gray-400 uppercase tracking-wider font-sans text-start w-[32%]">
                      Employee
                    </th>
                    <th className="py-4.5 px-6 text-[13px] font-bold text-gray-400 uppercase tracking-wider font-sans text-start w-[18%]">
                      Role
                    </th>
                    <th className="py-4.5 px-6 text-[13px] font-bold text-gray-400 uppercase tracking-wider font-sans text-start w-[18%]">
                      Last Active
                    </th>
                    <th className="py-4.5 px-6 text-[13px] font-bold text-gray-400 uppercase tracking-wider font-sans text-center w-[16%]">
                      Status
                    </th>
                    <th className="py-4.5 px-6 text-[13px] font-bold text-gray-400 uppercase tracking-wider font-sans text-center w-[16%]">
                      Actions
                    </th>
                  </tr>
                </thead>

                {/* Table Body rows */}
                <tbody className="divide-y divide-gray-100">
                  {filteredMembers.length > 0 ? (
                    filteredMembers.map((member) => (
                      <tr
                        key={member.id}
                        id={`member-row-${member.id}`}
                        className="hover:bg-[#FAF9F9]/40 transition-colors group"
                      >
                        
                        {/* Column 1: Employee avatar & details */}
                        <td className="py-4.5 px-6 align-middle">
                          <div className="flex items-center gap-4 text-start">
                            {/* Avatar Image using standard JSX with referrerPolicy */}
                            <img
                              src={member.avatarUrl}
                              alt={member.name}
                              referrerPolicy="no-referrer"
                              className="w-12 h-12 rounded-2xl object-cover border border-gray-100 shadow-xs ring-4 ring-neutral-50 shrink-0"
                              onError={(e) => {
                                // Fallback if image fails
                                (e.target as HTMLImageElement).src = `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(member.name)}`;
                              }}
                            />
                            <div className="flex flex-col min-w-0">
                              <span className="text-[15.5px] font-black text-gray-900 leading-tight">
                                {member.name}
                              </span>
                              <span className="text-[13px] text-gray-400 font-medium truncate mt-0.5">
                                {member.email}
                              </span>
                            </div>
                          </div>
                        </td>

                        {/* Column 2: Role badge matching screenshot styling */}
                        <td className="py-4.5 px-6 align-middle text-start">
                          {member.role === 'Branch manager' ? (
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-blue-400 bg-blue-50/70 text-blue-600 text-[12.5px] font-bold leading-none whitespace-nowrap">
                              Branch manager
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-amber-400 bg-amber-50/70 text-amber-600 text-[12.5px] font-bold leading-none whitespace-nowrap">
                              Branch staff
                            </span>
                          )}
                        </td>

                        {/* Column 3: Last active string */}
                        <td className="py-4.5 px-6 align-middle text-start text-[14.5px] text-[#646464] font-semibold font-sans">
                          {member.lastActive}
                        </td>

                        {/* Column 4: Custom iOS toggle switch */}
                        <td className="py-4.5 px-6 align-middle text-center">
                          <div className="flex items-center justify-center">
                            <button
                              type="button"
                              onClick={() => handleToggleActive(member.id)}
                              className={`relative w-12 h-[26px] rounded-full transition-colors duration-200 outline-none cursor-pointer focus:ring-1 focus:ring-[#AE6727]/30 ${
                                member.active ? 'bg-blue-600' : 'bg-gray-200'
                              }`}
                              aria-label={`Toggle active status for ${member.name}`}
                            >
                              <span
                                className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200 ${
                                  member.active ? 'translate-x-[22px]' : 'translate-x-0'
                                }`}
                              />
                            </button>
                          </div>
                        </td>

                        {/* Column 5: Edit and Delete buttons */}
                        <td className="py-4.5 px-6 align-middle text-center">
                          <div className="flex items-center justify-center gap-3.5">
                            
                            {/* Edit Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(member)}
                              className="p-2.5 rounded-xl border border-gray-100 hover:border-[#AE6727]/15 hover:bg-[#FCF5EE]/40 text-gray-500 hover:text-[#AE6727] transition-all duration-200 cursor-pointer"
                              title="Edit member"
                            >
                              <Pencil className="w-4 h-4 stroke-[2.25]" />
                            </button>

                            {/* Delete Button */}
                            <button
                              type="button"
                              onClick={() => handleOpenDeleteConfirm(member)}
                              className="p-2.5 rounded-xl border border-gray-150 hover:border-red-100 hover:bg-red-50/50 text-gray-500 hover:text-red-500 transition-all duration-200 cursor-pointer"
                              title="Delete member"
                            >
                              <Trash2 className="w-4 h-4 stroke-[2.25]" />
                            </button>
                          </div>
                        </td>

                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-gray-400 font-bold text-base">
                        No team members found matching your search.
                      </td>
                    </tr>
                  )}
                </tbody>

              </table>
            </div>

          </div>

        </div>
      ) : viewMode === 'add' ? (
        /* ==========================================================
           4. ADD TEAM MEMBER FULL VIEW PAGE (Matches screenshots visually and logically!)
           ========================================================== */
        <div id="team-add-view" className="space-y-8 text-start">
          
          {/* Breadcrumbs link with ChevronLeft icon */}
          <div id="add-member-breadcrumbs">
            <button
              onClick={() => setViewMode('list')}
              className="flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-bold text-[15px] transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Team Managment</span>
            </button>
          </div>

          {/* Subheader: Row with titles, Cancel, and Invite buttons */}
          <div id="add-member-action-bar" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
            <div id="add-member-headline">
              <h1 className="text-3xl font-black text-[#1F1F1F] font-sans tracking-tight leading-none">
                Add Team Member
              </h1>
              <p className="text-[14.5px] font-medium text-gray-400 mt-2 font-sans">
                Invite a new member to your team and assign permissions
              </p>
            </div>

            {/* Action buttons list on the right side */}
            <div id="add-member-actions-row" className="flex items-center gap-4 self-end md:self-auto shrink-0 font-sans">
              <button
                type="button"
                onClick={() => setViewMode('list')}
                className="text-gray-400 hover:text-gray-600 font-bold text-[15px] transition-colors cursor-pointer py-2 px-3.5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleCreateTeamMember}
                className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold text-[14.5px] py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
              >
                <Mail className="w-[18px] h-[18px] shrink-0" />
                <span>Send invite</span>
              </button>
            </div>
          </div>

          {/* Core Member Information form card */}
          <div id="add-member-info-panel" className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-gray-900 font-sans leading-none">
                Member Information
              </h2>
              <p className="text-[13px] text-gray-400 font-bold font-sans">
                Enter the basic details of the new team member
              </p>
            </div>

            {/* Selector strip for choosing one of our 4 employee avatars or uploading a custom one */}
            <div className="space-y-3 pt-2">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest font-sans block text-start">
                Choose Employee Avatar <span className="text-[#AE6727]">*</span>
              </label>
              <div className="flex items-center gap-4.5 flex-wrap">
                {[
                  ...(uploadedAvatar ? [{ name: 'Custom Image', url: uploadedAvatar }] : [])
                ].map((av, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setAddAvatar(av.url)}
                    className={`relative p-1 rounded-2xl transition-all border-2 cursor-pointer ${
                      addAvatar === av.url ? 'border-[#AE6727] scale-105 shadow-sm bg-[#FCF5EE]/30' : 'border-transparent hover:scale-102 hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={av.url}
                      alt={av.name}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-xl object-cover"
                    />
                    {addAvatar === av.url && (
                      <div className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full bg-[#AE6727] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-gray-400 mt-1 block max-w-[64px] truncate text-center">
                      {av.name.includes('Custom') ? 'Custom' : av.name.split(' ')[0]}
                    </span>
                  </button>
                ))}

                {/* Local Device Image File Upload Card */}
                <label className="relative p-1 rounded-2xl transition-all border-2 border-dashed border-gray-300 hover:border-[#AE6727] bg-[#FAF9F9]/50 hover:bg-[#FCF5EE]/10 cursor-pointer flex flex-col items-center justify-center w-[64px] h-[80px] group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-[#AE6727] transition-colors leading-none">
                    <Upload className="w-5 h-5 mb-1.5 text-gray-400 group-hover:text-[#AE6727] transition-colors" />
                    <span className="text-[10px] font-bold font-sans text-center leading-tight">Upload</span>
                    <span className="text-[7.5px] text-gray-400 mt-0.5 font-sans leading-none">رفع صورة</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Inputs Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              
              {/* Field 1: Full Name */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-900 font-sans block">
                  Full Name <span className="text-red-500 font-bold font-sans">*</span>
                </label>
                <div className="relative">
                  <User className="absolute start-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={addName}
                    onChange={(e) => setAddName(e.target.value)}
                    placeholder="Ahmed Muhammed"
                    className="w-full ps-[48px] pe-4 py-3.5 rounded-xl border border-gray-150 focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30 bg-white placeholder-gray-400 text-gray-900 text-[14.5px] font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 2: Email Address */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-900 font-sans block">
                  Email Address <span className="text-red-500 font-bold font-sans">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute start-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={addEmail}
                    onChange={(e) => setAddEmail(e.target.value)}
                    placeholder="email@vendor.com"
                    className="w-full ps-[48px] pe-4 py-3.5 rounded-xl border border-gray-150 focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30 bg-white placeholder-gray-400 text-gray-900 text-[14.5px] font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 3: Phone Number */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-900 font-sans block">
                  Phone Number <span className="text-red-500 font-bold font-sans">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute start-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={addPhone}
                    onChange={(e) => setAddPhone(e.target.value)}
                    placeholder="01*********"
                    className="w-full ps-[48px] pe-4 py-3.5 rounded-xl border border-gray-150 focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30 bg-white placeholder-gray-400 text-gray-900 text-[14.5px] font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 4: Custom dropdown selector for "Branch" */}
              <div className="space-y-2 relative">
                <label className="text-[14px] font-bold text-gray-900 font-sans block">
                  Select Branch <span className="text-red-500 font-bold font-sans">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsBranchDropdownOpen(!isBranchDropdownOpen);
                    setIsRoleDropdownOpen(false); // Close other dropdown
                  }}
                  className="w-full px-4.5 py-4.5 rounded-xl border border-gray-150 bg-white hover:bg-gray-50/50 text-gray-800 text-[14.5px] font-bold transition-all outline-none cursor-pointer flex items-center justify-between"
                >
                  <span>{addBranch}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isBranchDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {/* Exact Dropdown List mapping in the screenshot */}
                {isBranchDropdownOpen && (
                  <div className="absolute top-[86px] start-0 w-full z-40 bg-white border border-gray-150 rounded-xl shadow-lg py-1.5 animate-fadeIn">
                    {[
                      'Main Branch - Downtown',
                      'North Branch'
                    ].map((br, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setAddBranch(br);
                          setIsBranchDropdownOpen(false);
                        }}
                        className={`w-full text-start px-5 py-3 text-[14.5px] font-bold transition-colors cursor-pointer block ${
                          addBranch === br ? 'text-[#AE6727] bg-[#FCF5EE]/40' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {br}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 5: Custom dropdown selector for "Role" */}
              <div className="space-y-2 relative">
                <label className="text-[14px] font-bold text-gray-900 font-sans block">
                  Select Role <span className="text-red-500 font-bold font-sans">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsRoleDropdownOpen(!isRoleDropdownOpen);
                    setIsBranchDropdownOpen(false); // Close other dropdown
                  }}
                  className="w-full px-4.5 py-4.5 rounded-xl border border-gray-150 bg-white hover:bg-gray-50/50 text-gray-800 text-[14.5px] font-bold transition-all outline-none cursor-pointer flex items-center justify-between"
                >
                  <span>{addRole}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isRoleDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {/* Dropdown Options matching Role List in the screenshot */}
                {isRoleDropdownOpen && (
                  <div className="absolute top-[86px] start-0 w-full z-40 bg-white border border-gray-150 rounded-xl shadow-lg py-1.5 animate-fadeIn">
                    {[
                      'Branch manager',
                      'Branch staff'
                    ].map((rl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setAddRole(rl as any);
                          setIsRoleDropdownOpen(false);
                        }}
                        className={`w-full text-start px-5 py-3 text-[14.5px] font-bold transition-colors cursor-pointer block ${
                          addRole === rl ? 'text-[#AE6727] bg-[#FCF5EE]/40' : 'text-gray-700 hover:bg-gray-50'
                        }`}
                      >
                        {rl}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Permissions Matrix section wrapper matching Assign Permissions details */}
          <div id="add-member-permissions" className="bg-transparent space-y-5">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-gray-900 font-sans leading-none">
                Assign Permissions
              </h2>
              <p className="text-[13px] text-gray-400 font-bold font-sans">
                Select what this employee can view or modify
              </p>
            </div>

            {/* Grid display layout */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

              {/* Module 1: Orders Management */}
              <div
                id="perm-card-orders"
                className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4"
              >
                {/* Module main toggle switch bar */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-[#FCF4EC] flex items-center justify-center text-[#AE6727]">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Orders Management
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setOrdersEnabled(!ordersEnabled)}
                    className={`relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer ${
                      ordersEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        ordersEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Permissions Grid with checkboxes & icons matching the page screenshot */}
                <div className={`space-y-3 transition-opacity duration-200 ${ordersEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  
                  {/* View Orders Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={orderPerms.view}
                      onChange={(e) => setOrderPerms({ ...orderPerms, view: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span>View Orders</span>
                    </div>
                  </label>

                  {/* Update Status Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={orderPerms.update}
                      onChange={(e) => setOrderPerms({ ...orderPerms, update: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                      <span>Update Status</span>
                    </div>
                  </label>

                  {/* Refund Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={orderPerms.refund}
                      onChange={(e) => setOrderPerms({ ...orderPerms, refund: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <RotateCcw className="w-4 h-4 text-gray-400" />
                      <span>Refund</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Module 2: Product Management */}
              <div
                id="perm-card-products"
                className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4"
              >
                {/* Module main toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <Box className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Product Management
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setProductsEnabled(!productsEnabled)}
                    className="relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: productsEnabled ? '#2563eb' : '#e5e7eb' }}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        productsEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Permissions Grid with checkboxes & icons */}
                <div className={`space-y-3 transition-opacity duration-200 ${productsEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  
                  {/* Add Product Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={productPerms.add}
                      onChange={(e) => setProductPerms({ ...productPerms, add: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <PlusSquare className="w-4 h-4 text-gray-400" />
                      <span>Add Product</span>
                    </div>
                  </label>

                  {/* Edit Prices Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={productPerms.edit}
                      onChange={(e) => setProductPerms({ ...productPerms, edit: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                      <span>Edit Prices</span>
                    </div>
                  </label>

                  {/* Delete product Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={productPerms.delete}
                      onChange={(e) => setProductPerms({ ...productPerms, delete: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                      <span>Delete product</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Module 3: Financials */}
              <div
                id="perm-card-financials"
                className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4"
              >
                {/* Module main toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-violet-50 flex items-center justify-center text-violet-600">
                      <Coins className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Financials
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setFinancialsEnabled(!financialsEnabled)}
                    className="relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: financialsEnabled ? '#2563eb' : '#e5e7eb' }}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        financialsEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Permissions Grid with checkboxes & icons */}
                <div className={`space-y-3 transition-opacity duration-200 ${financialsEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  
                  {/* View Earnings Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={financialPerms.view}
                      onChange={(e) => setFinancialPerms({ ...financialPerms, view: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span>View Earnings</span>
                    </div>
                  </label>

                  {/* Withdraw Funds Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={financialPerms.withdraw}
                      onChange={(e) => setFinancialPerms({ ...financialPerms, withdraw: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <ArrowDownToLine className="w-4 h-4 text-gray-400" />
                      <span>Withdraw Funds</span>
                    </div>
                  </label>

                </div>
              </div>

              {/* Module 4: Offers */}
              <div
                id="perm-card-offers"
                className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4"
              >
                {/* Module main toggle */}
                <div className="flex items-center justify-between pb-3 border-b border-gray-50">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                      <Tag className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Offers
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setOffersEnabled(!offersEnabled)}
                    className="relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer"
                    style={{ backgroundColor: offersEnabled ? '#2563eb' : '#e5e7eb' }}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        offersEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                {/* Sub Permissions Grid with checkboxes & icons */}
                <div className={`space-y-3 transition-opacity duration-200 ${offersEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  
                  {/* Create Offers Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={offersPerms.create}
                      onChange={(e) => setOffersPerms({ ...offersPerms, create: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span>Create Offers</span>
                    </div>
                  </label>

                  {/* Delete Offers Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={offersPerms.delete}
                      onChange={(e) => setOffersPerms({ ...offersPerms, delete: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                      <span>Delete Offers</span>
                    </div>
                  </label>

                  {/* Payment Reports Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors">
                    <input
                      type="checkbox"
                      checked={offersPerms.reports}
                      onChange={(e) => setOffersPerms({ ...offersPerms, reports: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>Payment Reports</span>
                    </div>
                  </label>

                </div>
              </div>

            </div>

          </div>

          {/* Mobile-friendly bottom action block bar */}
          <div className="flex items-center justify-end gap-3.5 border-t border-gray-100 pt-6">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-bold transition-colors cursor-pointer text-[14.5px]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleCreateTeamMember}
              className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold text-[14.5px] py-3.5 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              <Mail className="w-[18px] h-[18px]" />
              <span>Send invite</span>
            </button>
          </div>

        </div>
      ) : (
        /* ==========================================================
           5. EDIT TEAM MEMBER FULL VIEW PAGE (Matches screenshots visually and logically!)
           ========================================================== */
        <form onSubmit={handleSaveEditMember} className="space-y-8 text-start select-none">
          
          {/* Breadcrumbs link with ChevronLeft icon */}
          <div id="edit-member-breadcrumbs">
            <button
              type="button"
              onClick={() => {
                setViewMode('list');
                setSelectedMember(null);
              }}
              className="flex items-center gap-1.5 text-[#AE6727] hover:text-[#8D501D] font-bold text-[15px] transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-5 h-5 transition-transform group-hover:-translate-x-0.5" />
              <span>Back to Team Managment</span>
            </button>
          </div>

          {/* Subheader: Row with titles, Cancel, and Save Changes buttons */}
          <div id="edit-member-action-bar" className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-gray-100 pb-5">
            <div id="edit-member-headline">
              <h1 className="text-3xl font-black text-[#1F1F1F] font-sans tracking-tight leading-none">
                Edit Team Member
              </h1>
              <p className="text-[14.5px] font-medium text-gray-400 mt-2 font-sans">
                Update member information and permissions
              </p>
            </div>

            {/* Action buttons list on the right side */}
            <div id="edit-member-actions-row" className="flex items-center gap-4 self-end md:self-auto shrink-0 font-sans">
              <button
                type="button"
                onClick={() => {
                  setViewMode('list');
                  setSelectedMember(null);
                }}
                className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white font-bold transition-colors cursor-pointer text-[14.5px]"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold text-[14.5px] py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
              >
                <span>Save Changes</span>
              </button>
            </div>
          </div>

          {/* Visual card summary row from the screenshot */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Box (User profile summary) */}
            <div className="lg:col-span-2 bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 flex flex-col sm:flex-row sm:items-center gap-5">
              <img
                src={editAvatar}
                alt={editName}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-[22px] object-cover border border-gray-150"
              />
              <div className="flex-1 space-y-2 text-start">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl font-black text-gray-900 font-sans tracking-tight leading-none">
                    {editName || 'Ahmed Muhammed'}
                  </h3>
                  {editActive && (
                    <span className="text-emerald-600 bg-emerald-50 border border-emerald-400 font-bold px-3 py-1 rounded-lg text-[13px] leading-none">
                      Active
                    </span>
                  )}
                </div>
                <p className="text-[14.5px] font-medium text-gray-400 font-sans pb-1">
                  {editEmail || 'ahmed.m@vendor.com'}
                </p>
                {/* Role badge */}
                <div>
                  {editRole === 'Branch manager' ? (
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-blue-400 bg-blue-50/70 text-blue-600 text-[12.5px] font-bold leading-none">
                      Branch manager
                    </span>
                  ) : (
                    <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-lg border border-amber-400 bg-amber-50/70 text-amber-600 text-[12.5px] font-bold leading-none">
                      Branch staff
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Right Box (Audit modifier summary) */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 flex items-center gap-4.5">
              <div className="w-12 h-12 rounded-2xl bg-[#FCF4EC] flex items-center justify-center text-[#AE6727] shrink-0 border border-[#AE6727]/10">
                <User className="w-5.5 h-5.5" />
              </div>
              <div className="text-start leading-tight">
                <span className="text-[14px] font-black text-gray-400 font-sans uppercase tracking-widest block mb-1">
                  Last Edited by Owner
                </span>
                <span className="text-[15.5px] font-extrabold text-gray-800 font-sans">
                  Feb 8, 2026
                </span>
              </div>
            </div>

          </div>

          {/* Member Information Form Card */}
          <div id="edit-member-info-panel" className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.02)] p-6 md:p-8 space-y-6">
            <div className="space-y-1">
              <h2 className="text-lg font-black text-gray-900 font-sans leading-none">
                Member Information
              </h2>
              <p className="text-[13px] text-gray-400 font-bold font-sans">
                Enter the basic details of the team member
              </p>
            </div>

            {/* Selector strip for choosing one of our 4 employee avatars or uploading a custom one */}
            <div className="space-y-3 pt-2">
              <label className="text-[13px] font-bold text-gray-400 uppercase tracking-widest font-sans block text-start">
                Choose Employee Avatar <span className="text-[#AE6727]">*</span>
              </label>
              <div className="flex items-center gap-4.5 flex-wrap">
                {[
                  ...(editAvatar ? [{ name: 'Current Image', url: editAvatar }] : [])
                ].map((av, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() => setEditAvatar(av.url)}
                    className={`relative p-1 rounded-2xl transition-all border-2 cursor-pointer ${
                      editAvatar === av.url ? 'border-[#AE6727] scale-105 shadow-sm bg-[#FCF5EE]/30' : 'border-transparent hover:scale-102 hover:border-gray-200'
                    }`}
                  >
                    <img
                      src={av.url}
                      alt={av.name}
                      referrerPolicy="no-referrer"
                      className="w-13 h-13 rounded-xl object-cover"
                    />
                    {editAvatar === av.url && (
                      <div className="absolute -top-1.5 -end-1.5 w-5 h-5 rounded-full bg-[#AE6727] text-white flex items-center justify-center shadow-sm">
                        <Check className="w-3.5 h-3.5 stroke-[3]" />
                      </div>
                    )}
                    <span className="text-[10px] font-bold text-gray-400 mt-1 block max-w-[64px] truncate text-center font-sans">
                      {av.name.includes('Custom') ? 'Custom' : av.name.split(' ')[0]}
                    </span>
                  </button>
                ))}

                {/* Local Device Image File Upload Card */}
                <label className="relative p-1 rounded-2xl transition-all border-2 border-dashed border-gray-300 hover:border-[#AE6727] bg-[#FAF9F9]/50 hover:bg-[#FCF5EE]/10 cursor-pointer flex flex-col items-center justify-center w-[64px] h-[80px] group">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex flex-col items-center justify-center text-gray-400 group-hover:text-[#AE6727] transition-colors leading-none font-sans">
                    <Upload className="w-5 h-5 mb-1.5 text-gray-400 group-hover:text-[#AE6727] transition-colors" />
                    <span className="text-[10px] font-bold text-center leading-tight">Upload</span>
                    <span className="text-[7.5px] text-gray-400 mt-0.5 leading-none">رفع صورة</span>
                  </div>
                </label>
              </div>
            </div>

            {/* Inputs Grid Layout */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2 font-sans">
              
              {/* Field 1: Full Name */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-900 block text-start">
                  Full Name <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <User className="absolute start-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    placeholder="Ahmed Muhammed"
                    className="w-full ps-[48px] pe-4 py-3.5 rounded-xl border border-gray-150 focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30 bg-white placeholder-gray-400 text-gray-900 text-[14.5px] font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 2: Email Address */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-900 block text-start">
                  Email Address <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <Mail className="absolute start-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    required
                    value={editEmail}
                    onChange={(e) => setEditEmail(e.target.value)}
                    placeholder="email@vendor.com"
                    className="w-full ps-[48px] pe-4 py-3.5 rounded-xl border border-gray-150 focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30 bg-white placeholder-gray-400 text-gray-900 text-[14.5px] font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 3: Phone Number */}
              <div className="space-y-2">
                <label className="text-[14px] font-bold text-gray-900 block text-start">
                  Phone Number <span className="text-red-500 font-bold">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute start-4.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    required
                    value={editPhone}
                    onChange={(e) => setEditPhone(e.target.value)}
                    placeholder="01*********"
                    className="w-full ps-[48px] pe-4 py-3.5 rounded-xl border border-gray-150 focus:border-[#AE6727] focus:ring-1 focus:ring-[#AE6727]/30 bg-white placeholder-gray-400 text-gray-900 text-[14.5px] font-medium transition-all outline-none"
                  />
                </div>
              </div>

              {/* Field 4: Custom dropdown selector for "Branch" */}
              <div className="space-y-2 relative">
                <label className="text-[14px] font-bold text-gray-900 block text-start">
                  Select Branch <span className="text-red-500 font-bold">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditBranchDropdownOpen(!isEditBranchDropdownOpen);
                    setIsEditRoleDropdownOpen(false); // Close other dropdown
                  }}
                  className="w-full px-4.5 py-4.5 rounded-xl border border-gray-150 bg-white hover:bg-gray-50/50 text-gray-800 text-[14.5px] font-bold transition-all outline-none cursor-pointer flex items-center justify-between font-sans"
                >
                  <span>{editBranch}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isEditBranchDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {/* Dropdown Options */}
                {isEditBranchDropdownOpen && (
                  <div className="absolute top-[86px] start-0 w-full z-40 bg-white border border-gray-150 rounded-xl shadow-lg py-1.5 animate-fadeIn">
                    {[
                      'Main Branch - Downtown',
                      'North Branch'
                    ].map((br, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setEditBranch(br);
                          setIsEditBranchDropdownOpen(false);
                        }}
                        className="w-full text-start px-5 py-3 hover:bg-[#FCF5EE]/40 text-gray-700 font-bold font-sans hover:text-[#AE6727] text-[14px] transition-colors cursor-pointer"
                      >
                        {br}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Field 5: Custom dropdown selector for "Role" */}
              <div className="space-y-2 relative">
                <label className="text-[14px] font-bold text-gray-900 block text-start">
                  Select Role <span className="text-red-500 font-bold">*</span>
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setIsEditRoleDropdownOpen(!isEditRoleDropdownOpen);
                    setIsEditBranchDropdownOpen(false); // Close branch dropdown
                  }}
                  className="w-full px-4.5 py-4.5 rounded-xl border border-gray-150 bg-white hover:bg-gray-50/50 text-gray-800 text-[14.5px] font-bold transition-all outline-none cursor-pointer flex items-center justify-between font-sans"
                >
                  <span>{editRole}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isEditRoleDropdownOpen ? 'transform rotate-180' : ''}`} />
                </button>

                {/* Role dropdown lists */}
                {isEditRoleDropdownOpen && (
                  <div className="absolute top-[86px] start-0 w-full z-40 bg-white border border-gray-150 rounded-xl shadow-lg py-1.5 animate-fadeIn">
                    {[
                      'Branch manager',
                      'Branch staff'
                    ].map((rl, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => {
                          setEditRole(rl as any);
                          setIsEditRoleDropdownOpen(false);
                        }}
                        className="w-full text-start px-5 py-3 hover:bg-[#FCF5EE]/40 text-gray-700 font-bold font-sans hover:text-[#AE6727] text-[14px] transition-colors cursor-pointer"
                      >
                        {rl}
                      </button>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>

          {/* Section: Save Assign Permissions Card */}
          <div className="space-y-4 pt-4">
            <div className="space-y-1 text-start">
              <h2 className="text-xl font-black text-gray-900 font-sans tracking-tight leading-none">
                Assign Permissions
              </h2>
              <p className="text-[13.5px] text-gray-400 font-bold font-sans">
                Select what this employee can view or modify
              </p>
            </div>

            {/* Sub modules 2x2 spacing grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Module 1: Orders Management */}
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4_">
                <div className="flex items-center justify-between pb-3 border-b border-gray-50 p-6 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-blue-50 flex items-center justify-center text-blue-600">
                      <ShoppingCart className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Orders Management
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setEditOrdersEnabled(!editOrdersEnabled)}
                    className={`relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer ${
                      editOrdersEnabled ? 'bg-blue-600' : 'bg-gray-200'
                    }`}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        editOrdersEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className={`p-6 pt-0 space-y-3 transition-opacity duration-200 ${editOrdersEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  {/* View Orders Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editOrderPerms.view}
                      onChange={(e) => setEditOrderPerms({ ...editOrderPerms, view: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span>View Orders</span>
                    </div>
                  </label>

                  {/* Update Status Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editOrderPerms.update}
                      onChange={(e) => setEditOrderPerms({ ...editOrderPerms, update: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                      <span>Update Status</span>
                    </div>
                  </label>

                  {/* Refund Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editOrderPerms.refund}
                      onChange={(e) => setEditOrderPerms({ ...editOrderPerms, refund: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <RotateCcw className="w-4 h-4 text-gray-400" />
                      <span>Refund</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Module 2: Product Management */}
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4_">
                <div className="flex items-center justify-between pb-3 border-b border-gray-50 p-6 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-orange-50 flex items-center justify-center text-orange-600">
                      <Box className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Product Management
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setEditProductsEnabled(!editProductsEnabled)}
                    className="relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer animate-none"
                    style={{ backgroundColor: editProductsEnabled ? '#2563eb' : '#e5e7eb' }}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        editProductsEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className={`p-6 pt-0 space-y-3 transition-opacity duration-200 ${editProductsEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  {/* Add Product Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editProductPerms.add}
                      onChange={(e) => setEditProductPerms({ ...editProductPerms, add: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <PlusSquare className="w-4 h-4 text-gray-400" />
                      <span>Add Product</span>
                    </div>
                  </label>

                  {/* Edit Prices Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editProductPerms.edit}
                      onChange={(e) => setEditProductPerms({ ...editProductPerms, edit: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Edit2 className="w-4 h-4 text-gray-400" />
                      <span>Edit Prices</span>
                    </div>
                  </label>

                  {/* Delete product Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editProductPerms.delete}
                      onChange={(e) => setEditProductPerms({ ...editProductPerms, delete: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                      <span>Delete product</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Module 3: Financials */}
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4_">
                <div className="flex items-center justify-between pb-3 border-b border-gray-50 p-6 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-violet-50 flex items-center justify-center text-[#7c3aed]">
                      <Coins className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Financials
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setEditFinancialsEnabled(!editFinancialsEnabled)}
                    className="relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer animate-none"
                    style={{ backgroundColor: editFinancialsEnabled ? '#2563eb' : '#e5e7eb' }}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        editFinancialsEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className={`p-6 pt-0 space-y-3 transition-opacity duration-200 ${editFinancialsEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  {/* View Earnings Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editFinancialPerms.view}
                      onChange={(e) => setEditFinancialPerms({ ...editFinancialPerms, view: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Eye className="w-4 h-4 text-gray-400" />
                      <span>View Earnings</span>
                    </div>
                  </label>

                  {/* Withdraw Funds Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editFinancialPerms.withdraw}
                      onChange={(e) => setEditFinancialPerms({ ...editFinancialPerms, withdraw: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <ArrowDownToLine className="w-4 h-4 text-gray-400" />
                      <span>Withdraw Funds</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Module 4: Offers */}
              <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 space-y-4_">
                <div className="flex items-center justify-between pb-3 border-b border-gray-50 p-6 pb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-[38px] h-[38px] rounded-xl bg-amber-50 flex items-center justify-center text-amber-600">
                      <Tag className="w-5 h-5" />
                    </div>
                    <span className="text-[15.5px] font-black text-gray-950 font-sans">
                      Offers
                    </span>
                  </div>
                  {/* Toggle */}
                  <button
                    type="button"
                    onClick={() => setEditOffersEnabled(!editOffersEnabled)}
                    className="relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer animate-none"
                    style={{ backgroundColor: editOffersEnabled ? '#2563eb' : '#e5e7eb' }}
                  >
                    <span
                      className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                        editOffersEnabled ? 'translate-x-[22px]' : 'translate-x-0'
                      }`}
                    />
                  </button>
                </div>

                <div className={`p-6 pt-0 space-y-3 transition-opacity duration-200 ${editOffersEnabled ? 'opacity-100' : 'opacity-40 pointer-events-none'}`}>
                  {/* Create Offers Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editOffersPerms.create}
                      onChange={(e) => setEditOffersPerms({ ...editOffersPerms, create: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Tag className="w-4 h-4 text-gray-400" />
                      <span>Create Offers</span>
                    </div>
                  </label>

                  {/* Delete Offers Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editOffersPerms.delete}
                      onChange={(e) => setEditOffersPerms({ ...editOffersPerms, delete: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <Trash2 className="w-4 h-4 text-gray-400" />
                      <span>Delete Offers</span>
                    </div>
                  </label>

                  {/* Payment Reports Sub Toggle */}
                  <label className="flex items-center gap-4 py-3.5 px-4 rounded-xl border border-gray-100 hover:bg-gray-50/50 cursor-pointer transition-colors text-start">
                    <input
                      type="checkbox"
                      checked={editOffersPerms.reports}
                      onChange={(e) => setEditOffersPerms({ ...editOffersPerms, reports: e.target.checked })}
                      className="w-4.5 h-4.5 rounded text-[#AE6727] border-gray-150 focus:ring-[#AE6727]/30 cursor-pointer"
                    />
                    <div className="flex items-center gap-2 text-gray-600 font-sans font-semibold text-[14px]">
                      <FileText className="w-4 h-4 text-gray-400" />
                      <span>Payment Reports</span>
                    </div>
                  </label>
                </div>
              </div>

            </div>
          </div>

          {/* Account Settings Row panels (Deactivate, Remove) */}
          <div className="space-y-6 pt-4 font-sans">
            
            {/* Panel 1: Deactivate Account */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-start">
                <div className="w-11 h-11 rounded-xl bg-[#FAF9F9] flex items-center justify-center text-orange-600 shrink-0 border border-gray-100">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="text-[15.5px] font-black text-gray-900 block mb-1">
                    Deactivate Account
                  </span>
                  <span className="text-[13px] text-gray-400 font-medium block">
                    Prevent employee from accessing the system while retaining their data
                  </span>
                </div>
              </div>

              {/* Toggle switch for deactivating */}
              <button
                type="button"
                onClick={() => setEditActive(!editActive)}
                className={`relative w-12 h-[26px] rounded-full transition-colors duration-200 cursor-pointer shrink-0 ${
                  !editActive ? 'bg-orange-500' : 'bg-gray-200'
                }`}
              >
                <span
                  className={`absolute top-[3px] start-[3px] w-5 h-5 rounded-full bg-white shadow-xs transition-transform duration-200 ${
                    !editActive ? 'translate-x-[22px]' : 'translate-x-[0]'
                  }`}
                />
              </button>
            </div>

            {/* Panel 2: Remove Member Permanently */}
            <div className="bg-white rounded-[24px] border border-gray-100 shadow-[0_4px_25px_rgba(0,0,0,0.01)] p-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center gap-3 text-start">
                <div className="w-11 h-11 rounded-xl bg-red-50 flex items-center justify-center text-red-500 shrink-0">
                  <Trash2 className="w-5 h-5" />
                </div>
                <div className="leading-tight">
                  <span className="text-[15.5px] font-black text-gray-900 block mb-1">
                    Remove Member Permanently
                  </span>
                  <span className="text-[13px] text-gray-400 font-medium block">
                    Permanently delete all data related to this member. This action cannot be undone
                  </span>
                </div>
              </div>

              {/* Outline premium Delete Button */}
              <button
                type="button"
                onClick={() => handleOpenDeleteConfirm(selectedMember!)}
                className="border border-[#AE6727] text-[#AE6727] font-bold px-7 py-2.5 rounded-xl text-[14px] hover:bg-[#FCF5EE]/40 transition-colors cursor-pointer shrink-0 self-start sm:self-auto"
              >
                Delete
              </button>
            </div>

          </div>

          {/* Bottom actions bar */}
          <div className="flex items-center justify-end gap-3.5 border-t border-gray-100 pt-6">
            <button
               type="button"
               onClick={() => {
                 setViewMode('list');
                 setSelectedMember(null);
               }}
               className="px-5 py-3 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 bg-white font-bold transition-colors cursor-pointer text-[14.5px]"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold text-[14.5px] py-3.5 px-6 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xs"
            >
              Save Changes
            </button>
          </div>

        </form>
      )}

      {/* Toast Notification element: "Changes saved successfully" */}
      {showToast && (
        <div className="fixed top-6 right-6 z-50 overflow-hidden bg-white border border-[#E2F5E9] p-5 pr-6 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] flex items-center gap-3.5 animate-slideIn select-none max-w-sm">
          <div className="w-6.5 h-6.5 rounded-full bg-[#E2F5E9] flex items-center justify-center text-[#1FAA57] shrink-0">
            <Check className="w-4.5 h-4.5 stroke-[3]" />
          </div>
          <span className="text-[15px] font-bold text-[#1FAA57] font-sans">
            Changes saved successfully
          </span>
          <button type="button" onClick={() => setShowToast(false)} className="ms-4 p-1 text-gray-400 hover:text-gray-600 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
          {/* Green bottom highlight line */}
          <div className="absolute bottom-0 start-0 end-0 h-[3px] bg-[#1FAA57]" />
        </div>
      )}

      {/* Confirm Delete Dialog (Styled exactly like the mock Alert/Pop-up!) */}
      {isDeleteModalOpen && selectedMember && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop gray click-away wrapper */}
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-xs animate-fadeIn"
            onClick={() => setIsDeleteModalOpen(false)}
          />
          
          {/* The Central Dialog box */}
          <div className="bg-white rounded-[28px] w-full max-w-[420px] shadow-[0_24px_50px_rgba(0,0,0,0.16)] border border-gray-100 overflow-hidden relative z-10 animate-scaleIn select-none">
            <div className="p-8 pb-7 text-center space-y-5 flex flex-col items-center">
              
              {/* Warning Symbol: Rounded Hex/Square brown golden container, icon has white color */}
              <div className="w-14 h-14 rounded-2xl bg-[#AE6727] flex items-center justify-center text-white shadow-xs">
                <AlertTriangle className="w-6.5 h-6.5 stroke-[2.25] rotate-180" />
              </div>

              {/* Descriptions */}
              <div className="space-y-2">
                <h3 className="text-gray-900 text-[19px] font-extrabold font-sans tracking-tight">
                  Revoke Access
                </h3>
                <p className="text-gray-500 text-[14.5px] font-medium leading-relaxed font-sans px-1 text-center">
                  Are you sure you want to remove <span className="text-gray-900 font-bold">"{selectedMember.name}"</span>?
                </p>
                <p className="text-gray-400 text-[13px] font-medium leading-relaxed font-sans px-1 text-center">
                  You can <span className="font-semibold text-gray-800">(Disable)</span> their account temporarily to block access while keeping their activity logs, or <span className="font-semibold text-gray-800">(Delete)</span> them permanently to remove all their data from the system.
                </p>
              </div>

              {/* Flat cancel button and Solid Delete actions */}
              <div className="flex items-center justify-between w-full pt-4 px-1">
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="text-[#AE6727] hover:text-[#8D501D] font-black text-[15px] transition-colors cursor-pointer py-2 px-4"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleDeleteMember}
                  className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-extrabold text-[14.5px] py-3.5 px-10 rounded-xl transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md"
                >
                  Delete
                </button>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
