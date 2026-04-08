import { useState } from 'react';
import { Card, Heading, Table, Button, Input } from '@sunaina-dev/ui-library';

interface TableColumn<Row> {
  header: string;
  accessor: keyof Row;
  align?: 'left' | 'center' | 'right';
  render?: (value: Row[keyof Row], row: Row) => React.ReactNode;
}

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'Editor' | 'Viewer';
  status: 'Active' | 'Inactive';
}

export const Users = () => {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com', role: 'Admin', status: 'Active' },
    { id: 2, name: 'Priya Singh', email: 'priya@example.com', role: 'Editor', status: 'Active' },
    { id: 3, name: 'Amit Kumar', email: 'amit@example.com', role: 'Viewer', status: 'Inactive' },
  ]);

  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', role: 'Viewer' as User['role'] });

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  const handleAdd = () => {
    setEditingUser(null);
    setFormData({ name: '', email: '', role: 'Viewer' });
    setIsModalOpen(true);
  };

  const handleEdit = (user: User) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setIsModalOpen(true);
  };

const handleDelete = (id: number) => {
  if (window.confirm('Delete this user?')) {
    setUsers(users.filter(u => u.id!== id));
  }
};

  const handleSave = () => {
    if (!formData.name ||!formData.email) return alert('Name and Email required');

    if (editingUser) {
      setUsers(users.map(u => u.id === editingUser.id? {...u,...formData } : u));
    } else {
      setUsers([...users, { id: Date.now(),...formData, status: 'Active' }]);
    }
    setIsModalOpen(false);
  };

  const columns: TableColumn<User>[] = [
    {
      header: 'User',
      accessor: 'name',
      render: (_, row) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold">
            {row.name[0]}
          </div>
          <div>
            <p className="font-medium text-slate-900">{row.name}</p>
            <p className="text-sm text-slate-500">{row.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: 'role',
      render: (value) => (
        <span className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-sm font-medium">
          {value}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: 'status',
      align: 'center',
      render: (value) => (
        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold ${
          value === 'Active'
       ? 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-600/20'
            : 'bg-slate-100 text-slate-600 ring-1 ring-slate-600/20'
        }`}>
          <span className={`w-1.5 h-1.5 rounded-full ${value === 'Active'? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
          {value}
        </span>
      )
    },
    {
      header: 'Actions',
      accessor: 'id',
      align: 'right',
      render: (_, row) => (
        <div className="flex gap-2 justify-end">
          <Button variant="secondary" onClick={() => handleEdit(row)}>Edit</Button>
          <Button variant="secondary" onClick={() => handleDelete(row.id)}>Delete</Button>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-6 px-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4  [&>div]:px-0">
        <Heading
          title="Team Members"
          subtitle={`${users.length} users in your organization`}
          level={3}
        />
        <Button variant="primary" onClick={handleAdd}>
          + Add User
        </Button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        <Card>
          <div className="pb-6 border-b border-slate-100">
              <Input
                placeholder="Search by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
          </div>
          <Table
            data={filteredUsers}
            columns={columns}
            rowKey={(row) => row.id}
            zebra
          />
        </Card>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setIsModalOpen(false)}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="p-6 border-b border-slate-100">
              <h2 className="text-xl font-semibold text-slate-900">
                {editingUser? 'Edit User' : 'Add New User'}
              </h2>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Name</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Email</label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({...formData, role: e.target.value as User['role']})}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                >
                  <option value="Viewer">Viewer</option>
                  <option value="Editor">Editor</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>
            </div>
            <div className="p-6 bg-slate-50 rounded-b-2xl flex gap-3 justify-end">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>Cancel</Button>
              <Button variant="primary" onClick={handleSave}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};