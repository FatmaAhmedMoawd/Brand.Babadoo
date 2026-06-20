import React, { useState, useEffect } from 'react';
import { useBodyScrollLock } from '../../../shared/hooks/useBodyScrollLock';
import {
  Store,
  CheckCircle2,
  XCircle,
  SquarePen,
  Trash2,
  ChevronLeft,
  Plus,
  Phone,
  Mail,
  MapPin,
  Clock,
  Copy,
  ChevronRight,
  Search,
  Check,
  AlertCircle
} from 'lucide-react';

interface WorkingDay {
  day: string;
  isOpen: boolean;
  from: string;
  to: string;
}

interface Branch {
  id: number;
  name: string;
  address: string;
  isOpen: boolean;
  contact: string;
  email: string;
  workingHours: WorkingDay[];
}

interface BranchManagementViewProps {
  onBack: () => void;
}

const DEFAULT_DAYS: WorkingDay[] = [
  { day: 'Saturday', isOpen: true, from: '09:00 Am', to: '10:00 Pm' },
  { day: 'Sunday', isOpen: true, from: '09:00 Am', to: '10:00 Pm' },
  { day: 'Monday', isOpen: true, from: '09:00 Am', to: '10:00 Pm' },
  { day: 'Tuesday', isOpen: true, from: '09:00 Am', to: '10:00 Pm' },
  { day: 'Wednesday', isOpen: true, from: '09:00 Am', to: '10:00 Pm' },
  { day: 'Thursday', isOpen: true, from: '09:00 Am', to: '10:00 Pm' },
  { day: 'Friday', isOpen: false, from: '09:00 Am', to: '10:00 Pm' },
];

const INITIAL_BRANCHES: Branch[] = [
  {
    id: 1,
    name: 'Main Branch - Downtown',
    address: 'King Fahd Road, Riyadh',
    isOpen: true,
    contact: '011 411 1111',
    email: 'main@babbad.com',
    workingHours: JSON.parse(JSON.stringify(DEFAULT_DAYS)),
  },
  {
    id: 2,
    name: 'North Branch',
    address: 'Olaya Street, Riyadh',
    isOpen: true,
    contact: '011 422 2222',
    email: 'north@babbad.com',
    workingHours: JSON.parse(JSON.stringify(DEFAULT_DAYS)),
  },
  {
    id: 3,
    name: 'West Branch',
    address: 'Takhassusi Street, Riyadh',
    isOpen: false,
    contact: '011 433 3333',
    email: 'west@babbad.com',
    workingHours: JSON.parse(JSON.stringify(DEFAULT_DAYS)),
  },
];

export const BranchManagementView: React.FC<BranchManagementViewProps> = ({ onBack }) => {
  // Load branches from local storage if available, otherwise use initial data
  const [branches, setBranches] = useState<Branch[]>(() => {
    const saved = localStorage.getItem('babbad_branches');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Error parsing branches:', e);
      }
    }
    return INITIAL_BRANCHES;
  });

  // Save branches to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('babbad_branches', JSON.stringify(branches));
  }, [branches]);

  // View state: 'list' | 'add' | 'edit'
  const [currentView, setCurrentView] = useState<'list' | 'add' | 'edit'>('list');
  const [editingBranchId, setEditingBranchId] = useState<number | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [successModalType, setSuccessModalType] = useState<'add' | 'edit' | null>(null);
  const [deletingBranch, setDeletingBranch] = useState<Branch | null>(null);

  // Lock scroll when success modal or delete confirmation modal is open
  useBodyScrollLock(successModalType !== null || deletingBranch !== null);

  // Form states for creating/editing a branch
  const [formName, setFormName] = useState('');
  const [formIsOpen, setFormIsOpen] = useState(true);
  const [formContact, setFormContact] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formAddress, setFormAddress] = useState('');
  const [formWorkingHours, setFormWorkingHours] = useState<WorkingDay[]>([]);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  // Trigger feedback banner state when timings are copied to other days
  const [copiedFeedback, setCopiedFeedback] = useState<string | null>(null);

  // Stats
  const totalBranches = branches.length;
  const currentlyOpen = branches.filter((b) => b.isOpen).length;
  const currentlyClosed = branches.filter((b) => !b.isOpen).length;

  // Toggle Branch status directly from list view
  const handleToggleStatus = (id: number) => {
    setBranches((prev) =>
      prev.map((b) => (b.id === id ? { ...b, isOpen: !b.isOpen } : b))
    );
  };

  // Delete Branch
  const handleDeleteBranch = (id: number) => {
    const branch = branches.find((b) => b.id === id);
    if (branch) {
      setDeletingBranch(branch);
    }
  };

  // Open Edit Branch View
  const handleOpenEdit = (branch: Branch) => {
    setEditingBranchId(branch.id);
    setFormName(branch.name);
    setFormIsOpen(branch.isOpen);
    setFormContact(branch.contact);
    setFormEmail(branch.email);
    setFormAddress(branch.address);
    setFormWorkingHours(JSON.parse(JSON.stringify(branch.workingHours || DEFAULT_DAYS)));
    setFormErrors({});
    setCurrentView('edit');
    setIsEditMode(false); // starts in view-only / non-edit mode (screenshot 2 style)
  };

  // Open Add Branch View
  const handleOpenAdd = () => {
    setEditingBranchId(null);
    setFormName('');
    setFormIsOpen(true);
    setFormContact('');
    setFormEmail('');
    setFormAddress('');
    setFormWorkingHours(JSON.parse(JSON.stringify(DEFAULT_DAYS)));
    setFormErrors({});
    setCurrentView('add');
    setIsEditMode(true); // adding a branch must be in active edit mode
  };

  // Cancel Edit Mode
  const handleCancelEdit = () => {
    if (editingBranchId !== null) {
      const originalBranch = branches.find((b) => b.id === editingBranchId);
      if (originalBranch) {
        setFormName(originalBranch.name);
        setFormIsOpen(originalBranch.isOpen);
        setFormContact(originalBranch.contact);
        setFormEmail(originalBranch.email);
        setFormAddress(originalBranch.address);
        setFormWorkingHours(JSON.parse(JSON.stringify(originalBranch.workingHours || DEFAULT_DAYS)));
      }
    }
    setFormErrors({});
    setIsEditMode(false);
  };

  // Copy standard hours to all other checked days
  const copyHoursToAllDays = (sourceDay: WorkingDay) => {
    setFormWorkingHours((prev) =>
      prev.map((d) => {
        if (d.day !== sourceDay.day) {
          return {
            ...d,
            from: sourceDay.from,
            to: sourceDay.to,
          };
        }
        return d;
      })
    );
    setCopiedFeedback(`Copied ${sourceDay.day}'s timing to other days!`);
    setTimeout(() => {
      setCopiedFeedback(null);
    }, 2500);
  };

  // Toggle individual day status in working hours
  const handleToggleDay = (index: number) => {
    setFormWorkingHours((prev) =>
      prev.map((d, idx) => (idx === index ? { ...d, isOpen: !d.isOpen } : d))
    );
  };

  // Modify day "from" time
  const handleDayFromChange = (index: number, val: string) => {
    setFormWorkingHours((prev) =>
      prev.map((d, idx) => (idx === index ? { ...d, from: val } : d))
    );
  };

  // Modify day "to" time
  const handleDayToChange = (index: number, val: string) => {
    setFormWorkingHours((prev) =>
      prev.map((d, idx) => (idx === index ? { ...d, to: val } : d))
    );
  };

  // Form submission / Validation
  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { [key: string]: string } = {};
    if (!formName.trim()) errors.name = 'Branch Name is required';
    if (!formContact.trim()) errors.contact = 'Contact Number is required';
    if (!formAddress.trim()) errors.address = 'Full Address is required';

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      // scroll to top of form wrapper
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (currentView === 'add') {
      const newBranch: Branch = {
        id: Date.now(),
        name: formName,
        address: formAddress,
        isOpen: true,
        contact: formContact,
        email: formEmail,
        workingHours: formWorkingHours,
      };
      setBranches((prev) => [...prev, newBranch]);
      setSuccessModalType('add');
    } else if (currentView === 'edit' && editingBranchId !== null) {
      setBranches((prev) =>
        prev.map((b) =>
          b.id === editingBranchId
            ? {
                ...b,
                name: formName,
                address: formAddress,
                isOpen: formIsOpen,
                contact: formContact,
                email: formEmail,
                workingHours: formWorkingHours,
              }
            : b
        )
      );
      setSuccessModalType('edit');
    }
  };

  // Render Success Modal
  const renderSuccessModal = () => {
    if (!successModalType) return null;

    const isAdd = successModalType === 'add';
    const title = isAdd ? 'New Branch Added Successfully' : 'Branch Changes Saved Successfully';
    const subtitle = isAdd 
      ? 'Your new branch has been added to the system. You can now start managing its staff, inventory, and orders from the Branch Management dashboard.'
      : 'Your branch changes have been saved to the system. You can now manage its staff, inventory, and orders.';

    return (
      <div 
        id="success-modal-overlay" 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
        onClick={() => {
          setSuccessModalType(null);
          setCurrentView('list');
          setIsEditMode(false);
        }}
      >
        <div 
          id="success-modal-card" 
          className="bg-white rounded-[24px] max-w-md w-full p-8 shadow-2xl flex flex-col items-center text-center border border-gray-100 max-h-[90vh] overflow-y-auto animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Circular green check icon overlay */}
          <div className="w-18 h-18 rounded-full flex items-center justify-center bg-[#22C55E] text-white shadow-xl shadow-green-100 mb-6">
            <Check className="w-9 h-9 stroke-[3]" />
          </div>

          <h2 className="text-[24px] font-black tracking-tight text-gray-900 font-sans leading-tight mb-3">
            {title}
          </h2>

          <p className="text-[15px] font-medium leading-relaxed text-gray-500 font-sans px-2 mb-8">
            {subtitle}
          </p>

          <button
            type="button"
            onClick={() => {
              setSuccessModalType(null);
              setCurrentView('list');
              setIsEditMode(false);
            }}
            className="w-full bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold py-3.5 px-6 rounded-xl text-[15px] font-sans shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-98"
          >
            Done
          </button>
        </div>
      </div>
    );
  };

  // Render Delete Confirmation Modal
  const renderDeleteModal = () => {
    if (!deletingBranch) return null;

    return (
      <div 
        id="delete-modal-overlay" 
        className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center z-50 p-4 animate-fadeIn"
        onClick={() => setDeletingBranch(null)}
      >
        <div 
          id="delete-modal-card" 
          className="bg-white rounded-[24px] max-w-sm w-full p-8 shadow-2xl flex flex-col items-center text-center border border-gray-100 max-h-[90vh] overflow-y-auto animate-scaleIn"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Custom Squircle alert icon matching the screenshot */}
          <div className="w-[68px] h-[68px] rounded-[20px] bg-[#AE6727] text-white flex items-center justify-center shadow-lg shadow-amber-100/30 mb-6 font-sans">
            <AlertCircle className="w-8 h-8 stroke-[2.5]" />
          </div>

          <h2 className="text-[22px] font-black tracking-tight text-gray-900 font-sans leading-tight mb-3">
            Delete Branch?
          </h2>

          <p className="text-[14.5px] font-medium leading-relaxed text-gray-400 font-sans px-2 mb-8 select-text text-center">
            Are you sure you want to delete <span className="font-bold text-gray-800">"{deletingBranch.name}"</span>? This action is permanent and will remove the branch from the system. This cannot be undone.
          </p>

          <div className="flex items-center justify-between w-full mt-2 px-2">
            <button
              type="button"
              onClick={() => setDeletingBranch(null)}
              className="text-[15px] font-bold text-[#AE6727] hover:text-[#8D501D] font-sans transition-colors cursor-pointer px-4 py-2"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                setBranches((prev) => prev.filter((b) => b.id !== deletingBranch.id));
                setDeletingBranch(null);
              }}
              className="bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold py-3 px-8 rounded-xl text-[15px] font-sans shadow-sm hover:shadow-md transition-all cursor-pointer active:scale-98"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  };

  // RENDER: BRANCH LIST VIEW
  if (currentView === 'list') {
    return (
      <div id="branch-management-view" className="space-y-8 text-start select-none w-full animate-fadeIn">
        {/* Back navigation */}
        <button
          id="back-to-settings-btn"
          onClick={onBack}
          className="text-sm font-bold text-[#AE6727] flex items-center gap-1.5 focus:outline-none hover:opacity-85 transition-opacity cursor-pointer font-cairo"
        >
          <ChevronLeft className="w-5 h-5 text-[#AE6727]" />
          <span>Back to Setting</span>
        </button>

        {/* Header Block & Add button */}
        <div id="branch-mgmt-header" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="space-y-1">
            <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
              Branch Management
            </h1>
            <p className="text-[15px] font-medium text-gray-400 font-cairo leading-relaxed">
              Manage all your business locations
            </p>
          </div>

          <button
            id="add-new-branch-btn"
            onClick={handleOpenAdd}
            className="self-start sm:self-center bg-[#AE6727] hover:bg-[#8D501D] text-white font-bold font-cairo text-[15px] px-6 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-200 cursor-pointer shadow-sm active:scale-98 whitespace-nowrap"
          >
            <Plus className="w-4.5 h-4.5 font-black stroke-[3]" />
            <span>Add New Branch</span>
          </button>
        </div>

        {/* Metrics Row */}
        <div id="branch-metrics-row" className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Total */}
          <div className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#FCF5EE] border border-[#AE6727]/12 flex items-center justify-center">
                <Store className="w-[18px] h-[18px] text-[#AE6727]" />
              </div>
              <span className="text-[15px] font-bold text-gray-500 font-cairo">Total Branches</span>
            </div>
            <div className="mt-4 text-[32px] font-black text-gray-950 font-sans leading-none">
              {totalBranches}
            </div>
          </div>

          {/* Card 2: Open */}
          <div className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#E6F4EA] border border-green-200/50 flex items-center justify-center">
                <CheckCircle2 className="w-[18px] h-[18px] text-green-600" />
              </div>
              <span className="text-[15px] font-bold text-gray-500 font-cairo">Currently Open</span>
            </div>
            <div className="mt-4 text-[32px] font-black text-gray-950 font-sans leading-none">
              {currentlyOpen}
            </div>
          </div>

          {/* Card 3: Closed */}
          <div className="bg-white border border-gray-100 rounded-[20px] p-5 shadow-[0_4px_20px_rgba(0,0,0,0.01)] flex flex-col justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-[12px] bg-[#FCE8E6] border border-red-200/50 flex items-center justify-center">
                <XCircle className="w-[18px] h-[18px] text-red-500" />
              </div>
              <span className="text-[15px] font-bold text-gray-500 font-cairo">Currently Closed</span>
            </div>
            <div className="mt-4 text-[32px] font-black text-gray-950 font-sans leading-none">
              {currentlyClosed}
            </div>
          </div>
        </div>

        {/* Branches list card table */}
        <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.01)] overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-100">
            <h2 className="text-[18px] font-black text-gray-900 font-cairo">Branches List</h2>
          </div>

          <div className="overflow-x-auto custom-scrollbar">
            {branches.length === 0 ? (
              <div className="p-12 text-center text-gray-400 font-cairo font-medium">
                No branches found. Click "Add New Branch" to create one.
              </div>
            ) : (
              <table className="w-full text-left border-collapse min-w-[700px]">
                <thead>
                  <tr className="bg-[#EAEAEA]/80">
                    <th className="px-6 py-3.5 text-[14px] font-bold text-gray-700 font-cairo">
                      Branch Name
                    </th>
                    <th className="px-6 py-3.5 text-[14px] font-bold text-gray-700 font-cairo">
                      Address
                    </th>
                    <th className="px-6 py-3.5 text-[14px] font-bold text-gray-700 font-cairo text-center">
                      Status
                    </th>
                    <th className="px-6 py-3.5 text-[14px] font-bold text-gray-700 font-cairo text-center">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {branches.map((branch) => (
                    <tr key={branch.id} className="hover:bg-gray-50/50 transition-colors">
                      {/* Name */}
                      <td className="px-6 py-4.5">
                        <span className="text-[15px] font-bold text-gray-950 font-cairo leading-normal select-text">
                          {branch.name}
                        </span>
                      </td>

                      {/* Address */}
                      <td className="px-6 py-4.5">
                        <span className="text-[14.5px] font-semibold text-gray-500 font-cairo leading-normal select-text">
                          {branch.address}
                        </span>
                      </td>

                      {/* Toggle status */}
                      <td className="px-6 py-4.5 text-center">
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={() => handleToggleStatus(branch.id)}
                            className="relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                            style={{ backgroundColor: branch.isOpen ? '#2563EB' : '#D1D5DB' }}
                            aria-label={`Toggle branch ${branch.name} status`}
                          >
                            <span
                              aria-hidden="true"
                              className="pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"
                              style={{ transform: branch.isOpen ? 'translateX(22px)' : 'translateX(0px)' }}
                            />
                          </button>
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4.5 text-center">
                        <div className="flex items-center justify-center gap-4">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(branch)}
                            className="p-1 px-1.5 text-gray-700 hover:text-blue-600 transition-colors cursor-pointer"
                            title="Edit Location"
                          >
                            <SquarePen className="w-[18px] h-[18px]" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteBranch(branch.id)}
                            className="p-1 px-1.5 text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
                            title="Delete Location"
                          >
                            <Trash2 className="w-[18px] h-[18px] text-red-500" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
        {renderSuccessModal()}
        {renderDeleteModal()}
      </div>
    );
  }

  // RENDER: CREATE / EDIT BRANCH VIEW
  return (
    <>
    <form onSubmit={handleSave} className="space-y-8 text-start select-none w-full animate-fadeIn">
      {/* Top action header */}
      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={() => setCurrentView('list')}
          className="text-sm font-bold text-[#AE6727] flex items-center gap-1.5 focus:outline-none hover:opacity-85 transition-opacity cursor-pointer font-cairo"
        >
          <ChevronLeft className="w-5 h-5 text-[#AE6727]" />
          <span>Back to Branch Management</span>
        </button>

        <div className="flex items-center gap-3.5">
          {currentView === 'edit' && !isEditMode ? (
            <button
              type="button"
              onClick={() => setIsEditMode(true)}
              className="px-8 py-2.5 rounded-xl bg-[#AE6727] hover:bg-[#8D501D] font-bold text-white font-cairo text-[14.5px] cursor-pointer transition-colors shadow-sm active:scale-98"
            >
              Edite
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  if (currentView === 'add') {
                    setCurrentView('list');
                  } else {
                    handleCancelEdit();
                  }
                }}
                className="px-5 py-2.5 rounded-xl border border-gray-300 font-bold text-gray-700 font-cairo text-[14.5px] hover:bg-gray-50 cursor-pointer transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-[#AE6727] hover:bg-[#8D501D] font-bold text-white font-cairo text-[14.5px] cursor-pointer transition-colors shadow-sm active:scale-98"
              >
                {currentView === 'add' ? 'Save Branch' : 'Save Changes'}
              </button>
            </>
          )}
        </div>
      </div>

      {/* Page titles */}
      <div className="space-y-1">
        <h1 className="text-[32px] font-black text-gray-950 font-cairo tracking-tight leading-none">
          {currentView === 'add' ? 'Add New Branch' : `Edit Branch: ${formName}`}
        </h1>
        <p className="text-[15px] font-medium text-gray-400 font-cairo leading-relaxed">
          {currentView === 'add' ? 'Create a new branch location' : 'Manage branch details, location, and working hours'}
        </p>
      </div>

      {/* Floating alert if timings copied */}
      {copiedFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#2563EB] text-white font-cairo font-bold px-5 py-3 rounded-xl shadow-lg border border-blue-400 flex items-center gap-2 animate-scaleIn">
          <Check className="w-5 h-5 animate-bounce" />
          <span>{copiedFeedback}</span>
        </div>
      )}

      {/* Branch Status toggle widget (Only on EDIT view) */}
      {currentView === 'edit' && (
        <div className="bg-white border border-gray-100 rounded-[18px] p-5 px-6 shadow-[0_4px_24px_rgba(0,0,0,0.01)] flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="text-[15px] font-black text-gray-950 font-cairo leading-tight">Branch Status</h3>
            <p className="text-[12.5px] font-semibold text-gray-400 font-cairo leading-none">
              Toggle to open/close branch
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setFormIsOpen(!formIsOpen);
                if (!isEditMode) {
                  setIsEditMode(true);
                }
              }}
              className="relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
              style={{ backgroundColor: formIsOpen ? '#2563EB' : '#D1D5DB' }}
              aria-label="Toggle branch status"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"
                style={{ transform: formIsOpen ? 'translateX(22px)' : 'translateX(0px)' }}
              />
            </button>
            <span className={`text-[13.5px] font-black font-cairo ${formIsOpen ? 'text-green-600' : 'text-gray-400'}`}>
              {formIsOpen ? 'Open' : 'Closed'}
            </span>
          </div>
        </div>
      )}

      {/* Panel 1: General Info */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.01)] p-6 md:p-8 space-y-6">
        <h2 className="text-[19px] font-black text-gray-950 font-cairo tracking-tight border-b border-gray-50 pb-3 flex items-center gap-2.5">
          <span className="w-2.5 h-6 rounded-full bg-[#AE6727]"></span>
          General Information
        </h2>

        <div className="space-y-4">
          {/* Branch Name */}
          <div className="flex flex-col gap-2">
            <label className="text-[14.5px] font-bold text-gray-700 font-cairo">
              Branch Name <span className="text-red-500">*</span>
            </label>
            <div className="relative flex items-center">
              <span className="absolute left-4.5 text-gray-300">
                <Store className="w-5 h-5" />
              </span>
              <input
                type="text"
                value={formName}
                disabled={!isEditMode}
                onChange={(e) => {
                  setFormName(e.target.value);
                  if (formErrors.name) setFormErrors((p) => ({ ...p, name: '' }));
                }}
                placeholder="e.g. Downtown Branch"
                className={`w-full bg-[#FCFBFA] border ${
                  formErrors.name ? 'border-red-400 focus:ring-red-100' : 'border-gray-200/80 focus:ring-amber-100/50'
                } rounded-xl py-3 pl-12 pr-5 text-[15px] font-semibold font-cairo focus:outline-none focus:ring-4 focus:border-[#AE6727] transition-all ${
                  isEditMode ? 'text-gray-900 bg-white' : 'text-gray-500 bg-gray-50/50 cursor-not-allowed'
                }`}
              />
            </div>
            {formErrors.name && (
              <span className="text-red-500 text-[13px] font-bold font-cairo flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" /> {formErrors.name}
              </span>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
            {/* Contact Number */}
            <div className="flex flex-col gap-2">
              <label className="text-[14.5px] font-bold text-gray-700 font-cairo">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4.5 text-gray-300">
                  <Phone className="w-5 h-5" />
                </span>
                <input
                  type="text"
                  value={formContact}
                  disabled={!isEditMode}
                  onChange={(e) => {
                    setFormContact(e.target.value);
                    if (formErrors.contact) setFormErrors((p) => ({ ...p, contact: '' }));
                  }}
                  placeholder="011 *** ****"
                  className={`w-full bg-[#FCFBFA] border ${
                    formErrors.contact ? 'border-red-400 focus:ring-red-100' : 'border-gray-200/80 focus:ring-amber-100/50'
                  } rounded-xl py-3 pl-12 pr-5 text-[15px] font-semibold font-sans focus:outline-none focus:ring-4 focus:border-[#AE6727] transition-all ${
                    isEditMode ? 'text-gray-900 bg-white' : 'text-gray-500 bg-gray-50/50 cursor-not-allowed'
                  }`}
                />
              </div>
              {formErrors.contact && (
                <span className="text-red-500 text-[13px] font-bold font-cairo flex items-center gap-1 mt-1">
                  <AlertCircle className="w-4 h-4" /> {formErrors.contact}
                </span>
              )}
            </div>

            {/* Email Address */}
            <div className="flex flex-col gap-2">
              <label className="text-[14.5px] font-bold text-gray-700 font-cairo">
                Email Address (optional) <span className="text-red-500">*</span>
              </label>
              <div className="relative flex items-center">
                <span className="absolute left-4.5 text-gray-300">
                  <Mail className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  value={formEmail}
                  disabled={!isEditMode}
                  onChange={(e) => setFormEmail(e.target.value)}
                  placeholder="branch@gmail.com"
                  className={`w-full bg-[#FCFBFA] border border-gray-200/80 rounded-xl py-3 pl-12 pr-5 text-[15px] font-semibold font-sans focus:outline-none focus:ring-4 focus:ring-amber-100/50 focus:border-[#AE6727] transition-all ${
                    isEditMode ? 'text-gray-900 bg-white' : 'text-gray-500 bg-gray-50/50 cursor-not-allowed'
                  }`}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Panel 2: Location Settings */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.01)] p-6 md:p-8 space-y-6">
        <h2 className="text-[19px] font-black text-gray-950 font-cairo tracking-tight border-b border-gray-50 pb-3 flex items-center gap-2.5">
          <span className="w-2.5 h-6 rounded-full bg-[#AE6727]"></span>
          Location Settings
        </h2>

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <span className="text-[14.5px] font-bold text-gray-700 font-cairo">
              Branch Location <span className="text-red-500">*</span>
            </span>

            {/* High fidelity realistic Map Mockup matching screenshot 2 exactly */}
            <div className="relative w-full h-[280px] bg-sky-50 border border-gray-200/80 rounded-[20px] overflow-hidden shadow-inner flex items-center justify-center select-none">
              {/* Map Layout Grids & Custom Roads */}
              <div className="absolute inset-0 opacity-40 bg-[radial-gradient(#ccc_1px,transparent_1px)] [background-size:16px_16px]" />
              
              {/* Major river/marine bay curve */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-50,220 C200,200 400,290 800,230 L800,300 L-50,300 Z" fill="#D3E2F2" />
                {/* Horizontal & Diagonal Custom roads */}
                <path d="M-20,60 L900,120" stroke="#FFFFFF" strokeWidth="24" fill="none" opacity="0.9" />
                <path d="M-20,60 L900,120" stroke="#E1E1E1" strokeWidth="18" fill="none" opacity="0.9" />
                
                <path d="M120,-30 L110,320" stroke="#FFFFFF" strokeWidth="20" fill="none" opacity="0.9" />
                <path d="M120,-30 L110,320" stroke="#EAEAEA" strokeWidth="14" fill="none" opacity="0.9" />

                <path d="M520,-30 L490,320" stroke="#FFFFFF" strokeWidth="28" fill="none" opacity="0.9" />
                <path d="M520,-30 L490,320" stroke="#EEC450" strokeWidth="18" fill="none" opacity="0.8" /> {/* Main highway highway 280 */}

                <path d="M300,-10 C50,110 320,180 820,140" stroke="#FFFFFF" strokeWidth="18" fill="none" opacity="0.9" />
                <path d="M300,-10 C50,110 320,180 820,140" stroke="#E6E6E6" strokeWidth="12" fill="none" opacity="0.9" />
              </svg>

              {/* Park and green zones */}
              <div className="absolute bottom-20 left-12 w-28 h-14 bg-emerald-100/70 border border-emerald-200 rounded-[30px] opacity-90 blur-[1px] flex items-center justify-center text-emerald-800 text-[10px] font-black font-cairo">
                Park Pl
              </div>

              {/* Street labels */}
              <div className="absolute top-10 left-36 text-[10px] text-gray-500 font-bold tracking-wide -rotate-12">
                7th Ave N
              </div>
              <div className="absolute top-26 left-[310px] text-[10px] text-gray-500 font-bold tracking-wide rotate-[15deg]">
                6th Ave N
              </div>
              <div className="absolute top-16 right-48 text-[10px] text-gray-500 font-bold tracking-wide rotate-[80deg]">
                5th Ave N
              </div>
              <div className="absolute top-25 right-12 text-[10px] text-gray-500 font-bold tracking-wide">
                2nd Alley
              </div>

              {/* Landmarks */}
              <div className="absolute right-[170px] top-[148px] bg-white/95 border border-slate-300 shadow-sm p-1.5 rounded-lg flex items-center gap-1.5">
                <div className="w-5 h-5 rounded bg-blue-500 flex items-center justify-center text-white text-[9px] font-bold">
                  📮
                </div>
                <div className="flex flex-col text-left leading-none">
                  <span className="text-[9px] text-gray-900 font-black">United States Postal Service</span>
                  <span className="text-[7.5px] text-gray-400 font-bold mt-[1px]">Post Office</span>
                </div>
              </div>

              {/* Locator pin: Switch between "Change Location" (edit view) and "Select Location on Map" (add view) */}
              <div className="absolute top-14 left-[44%] -translate-x-1/2 flex flex-col items-center">
                {currentView === 'edit' ? (
                  <button
                    type="button"
                    disabled={!isEditMode}
                    className={`bg-white border border-gray-200 px-5 py-2.5 rounded-xl shadow-md font-bold text-[13.5px] font-cairo transition-all duration-200 flex items-center gap-2 ${
                      isEditMode
                        ? 'text-gray-800 hover:scale-103 cursor-pointer active:scale-98'
                        : 'opacity-70 cursor-not-allowed bg-gray-100 text-gray-400'
                    }`}
                  >
                    <span>Change Location</span>
                  </button>
                ) : (
                  <div className="bg-white text-gray-800 border border-gray-200 px-5 py-2.5 rounded-xl shadow-md font-bold text-[13.5px] font-cairo hover:scale-103 transition-transform duration-200 cursor-pointer flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#AE6727]" />
                    <span className="text-[#AE6727] font-black">Select Location On Map</span>
                  </div>
                )}
              </div>

              {/* Location marker pin exact placement */}
              <div className="absolute top-[135px] left-[110px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
                <div className="relative">
                  <div className="absolute -inset-2 bg-blue-500/30 rounded-full animate-ping pointer-events-none" />
                  <div className="w-7 h-7 bg-blue-600 rounded-full border-2 border-white shadow-md flex items-center justify-center text-white z-10">
                    <Store className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Full Address */}
          <div className="flex flex-col gap-2">
            <label className="text-[14.5px] font-bold text-gray-700 font-cairo">
              Full Address <span className="text-red-500">*</span>
            </label>
            <textarea
              value={formAddress}
              disabled={!isEditMode}
              onChange={(e) => {
                setFormAddress(e.target.value);
                if (formErrors.address) setFormErrors((p) => ({ ...p, address: '' }));
              }}
              placeholder="Building number, street name"
              rows={3}
              className={`w-full bg-[#FCFBFA] border ${
                formErrors.address ? 'border-red-400 focus:ring-red-100' : 'border-gray-200/80 focus:ring-amber-100/50'
              } rounded-xl p-4 text-[15px] font-semibold font-cairo focus:outline-none focus:ring-4 focus:border-[#AE6727] transition-all resize-none ${
                isEditMode ? 'text-gray-900 bg-white' : 'text-gray-500 bg-gray-50/50 cursor-not-allowed'
              }`}
            />
            {formErrors.address && (
              <span className="text-red-500 text-[13px] font-bold font-cairo flex items-center gap-1 mt-1">
                <AlertCircle className="w-4 h-4" /> {formErrors.address}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Panel 3: Working Hours */}
      <div className="bg-white border border-gray-100 rounded-[24px] shadow-[0_4px_24px_rgba(0,0,0,0.01)] p-4 sm:p-6 md:p-8 space-y-6">
        <h2 className="text-[19px] font-black text-gray-950 font-cairo tracking-tight border-b border-gray-50 pb-3 flex items-center gap-2.5">
          <span className="w-2.5 h-6 rounded-full bg-[#AE6727]"></span>
          Working Hours
        </h2>

        {/* List of 7 Days */}
        <div id="working-hours-daylist" className="space-y-4">
          {formWorkingHours.map((d, index) => (
            <div
              key={d.day}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 p-3.5 sm:p-4 border border-gray-50 hover:border-gray-100 rounded-[16px] transition-all bg-white"
            >
              <div className="flex items-center gap-2.5 sm:gap-4 sm:min-w-[200px]">
                {/* Check/Switch Status */}
                <button
                  type="button"
                  onClick={() => {
                    handleToggleDay(index);
                    if (!isEditMode) {
                      setIsEditMode(true);
                    }
                  }}
                  className="relative inline-flex h-6.5 w-12 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-500 focus-visible:ring-offset-2"
                  style={{ backgroundColor: d.isOpen ? '#2563EB' : '#D1D5DB' }}
                  aria-label={`Toggle ${d.day} working hours`}
                >
                  <span
                    aria-hidden="true"
                    className="pointer-events-none inline-block h-5.5 w-5.5 transform rounded-full bg-white shadow-md ring-0 transition duration-200 ease-in-out"
                    style={{ transform: d.isOpen ? 'translateX(22px)' : 'translateX(0px)' }}
                  />
                </button>

                {/* Open / Closed labels in green / red */}
                <div className="flex items-center gap-2.5 text-start">
                  <span
                    className={`text-[13px] font-bold font-cairo w-12 ${
                      d.isOpen ? 'text-green-600' : 'text-gray-400'
                    }`}
                  >
                    {d.isOpen ? 'Open' : 'Closed'}
                  </span>
                  <span className="text-[16px] font-bold text-gray-900 font-cairo min-w-[90px]">
                    {d.day}
                  </span>
                </div>
              </div>

              {/* Timings range selector */}
              <div className="flex flex-row items-center gap-2 sm:gap-3 justify-start sm:justify-end w-full sm:w-auto">
                {d.isOpen ? (
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <div className="relative flex items-center">
                      <span className="absolute left-2.5 sm:left-3 text-gray-400">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <select
                        value={d.from}
                        disabled={!isEditMode}
                        onChange={(e) => handleDayFromChange(index, e.target.value)}
                        className={`bg-[#FCFBFA] border border-gray-200 rounded-lg py-1.5 pl-8 sm:pl-9 pr-[18px] sm:pr-6 text-[12.5px] sm:text-[13.5px] font-semibold font-sans focus:outline-none focus:border-[#AE6727] ${
                          isEditMode ? 'text-gray-800 cursor-pointer bg-white' : 'text-gray-500 cursor-not-allowed bg-gray-50/50'
                        }`}
                      >
                        <option value="08:00 Am">08:00 Am</option>
                        <option value="09:00 Am">09:00 Am</option>
                        <option value="10:00 Am">10:00 Am</option>
                        <option value="11:00 Am">11:00 Am</option>
                        <option value="12:00 Pm">12:00 Pm</option>
                      </select>
                    </div>

                    <span className="text-gray-400 font-sans px-0.5 sm:px-1">—</span>

                    <div className="relative flex items-center">
                      <span className="absolute left-2.5 sm:left-3 text-gray-400">
                        <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </span>
                      <select
                        value={d.to}
                        disabled={!isEditMode}
                        onChange={(e) => handleDayToChange(index, e.target.value)}
                        className={`bg-[#FCFBFA] border border-gray-200 rounded-lg py-1.5 pl-8 sm:pl-9 pr-[18px] sm:pr-6 text-[12.5px] sm:text-[13.5px] font-semibold font-sans focus:outline-none focus:border-[#AE6727] ${
                          isEditMode ? 'text-gray-800 cursor-pointer bg-white' : 'text-gray-500 cursor-not-allowed bg-gray-50/50'
                        }`}
                      >
                        <option value="05:00 Pm">05:00 Pm</option>
                        <option value="06:00 Pm">06:00 Pm</option>
                        <option value="07:00 Pm">07:00 Pm</option>
                        <option value="08:00 Pm">08:00 Pm</option>
                        <option value="09:00 Pm">09:00 Pm</option>
                        <option value="10:00 Pm">10:00 Pm</option>
                        <option value="11:00 Pm">11:00 Pm</option>
                        <option value="12:00 Am">12:00 Am</option>
                      </select>
                    </div>

                    {/* Copy timing to all days button */}
                    {isEditMode && (
                      <button
                        type="button"
                        onClick={() => copyHoursToAllDays(d)}
                        className="p-1.5 sm:p-2 ml-1 text-gray-400 hover:text-[#AE6727] hover:bg-gray-100 rounded-lg transition-colors cursor-pointer"
                        title={`Copy standard timings (${d.from} — ${d.to}) to other open days`}
                      >
                        <Copy className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                      </button>
                    )}
                  </div>
                ) : (
                  <span className="text-[13px] font-bold text-gray-400 italic font-cairo pr-4">
                    Closed all day
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Important Warning Alert Banner */}
        <div className="bg-[#FFF9F2] border border-[#AE6727]/12 rounded-xl p-4.5 text-start flex items-start gap-3">
          <AlertCircle className="w-5 h-5 text-[#AE6727] shrink-0 mt-0.5" />
          <p className="text-[13.5px] font-semibold text-[#AE6727] font-cairo leading-relaxed">
            <strong className="font-bold">Note:</strong> These hours will be displayed to customers on your storefront. Make sure they are accurate.
          </p>
        </div>
      </div>
    </form>
    {renderSuccessModal()}
    </>
  );
};
