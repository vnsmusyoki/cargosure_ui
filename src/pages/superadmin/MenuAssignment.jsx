import React, { useEffect, useState, useCallback } from 'react';
import { Search, Save, User, ChevronDown, ChevronRight, CheckSquare, Square } from 'lucide-react';
import toast from 'react-hot-toast';
import { getAllMenus, getUserMenuAccess, assignUserMenus } from '@/services/menuService';
import api from '@/services/api';

const MenuAssignment = () => {
  const [allMenus, setAllMenus] = useState([]);       // [{roleName, urlPrefix, categories}]
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [userAccess, setUserAccess] = useState([]);   // currently enabled menuIds for selected user
  const [saving, setSaving] = useState(false);
  const [loadingMenus, setLoadingMenus] = useState(true);
  const [loadingUsers, setLoadingUsers] = useState(true);
  const [userSearch, setUserSearch] = useState('');
  const [expandedRoles, setExpandedRoles] = useState({});

  // Load all menus once
  useEffect(() => {
    getAllMenus()
      .then((data) => setAllMenus(data.roles ?? []))
      .catch(() => toast.error('Failed to load menus'))
      .finally(() => setLoadingMenus(false));
  }, []);

  // Load users list
  useEffect(() => {
    api.get('/AdminUser/users')
      .then((res) => setUsers(res.data ?? []))
      .catch(() => {
        // endpoint may not exist yet — silently degrade
        setUsers([]);
      })
      .finally(() => setLoadingUsers(false));
  }, []);

  const selectUser = useCallback(async (usr) => {
    setSelectedUser(usr);
    try {
      const data = await getUserMenuAccess(usr.id);
      setUserAccess(data.enabledMenuIds ?? []);
    } catch {
      setUserAccess([]);
    }
  }, []);

  const toggleMenu = (menuId) => {
    setUserAccess((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  const toggleRole = (roleName, allIds) => {
    const allSelected = allIds.every((id) => userAccess.includes(id));
    if (allSelected) {
      setUserAccess((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      setUserAccess((prev) => [...new Set([...prev, ...allIds])]);
    }
  };

  const handleSave = async () => {
    if (!selectedUser) return;
    setSaving(true);
    try {
      await assignUserMenus({
        userId: selectedUser.id,
        roleId: selectedUser.roleId ?? '',
        menuIds: userAccess,
      });
      toast.success(`Menu access updated for ${selectedUser.fullName ?? selectedUser.email}`);
    } catch {
      toast.error('Failed to save menu access');
    } finally {
      setSaving(false);
    }
  };

  const filteredUsers = users.filter((u) =>
    (u.fullName ?? u.email ?? '').toLowerCase().includes(userSearch.toLowerCase())
  );

  const toggleRoleExpand = (roleName) =>
    setExpandedRoles((prev) => ({ ...prev, [roleName]: !prev[roleName] }));

  return (
    <div className="flex h-full gap-6 p-6">
      {/* ── Left panel: user picker ── */}
      <div className="w-72 flex-shrink-0 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Select User</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search users..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={userSearch}
              onChange={(e) => setUserSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingUsers ? (
            <div className="p-4 space-y-2 animate-pulse">
              {[1,2,3,4].map((i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />)}
            </div>
          ) : filteredUsers.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 text-center">No users found</p>
          ) : (
            filteredUsers.map((usr) => (
              <button
                key={usr.id}
                onClick={() => selectUser(usr)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedUser?.id === usr.id ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500' : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {(usr.fullName ?? usr.email ?? '?')[0].toUpperCase()}
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {usr.fullName ?? usr.email}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{usr.role}</div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Right panel: menu tree ── */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {selectedUser
                ? `Menu Access — ${selectedUser.fullName ?? selectedUser.email}`
                : 'Select a user to configure menu access'}
            </h2>
            {selectedUser && (
              <p className="text-xs text-gray-500 mt-0.5">
                {userAccess.length} menu{userAccess.length !== 1 ? 's' : ''} enabled
              </p>
            )}
          </div>
          {selectedUser && (
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-60 text-white text-sm font-medium rounded-lg transition-colors"
            >
              <Save size={16} />
              {saving ? 'Saving…' : 'Save Changes'}
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {!selectedUser ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <User size={48} className="mb-3" />
              <p className="text-sm">Pick a user from the left panel</p>
            </div>
          ) : loadingMenus ? (
            <div className="space-y-4 animate-pulse">
              {[1,2,3].map((i) => <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded-lg" />)}
            </div>
          ) : (
            allMenus.map((roleGroup) => {
              const allRoleIds = roleGroup.categories.flatMap((c) => c.items.map((m) => m.id));
              const selectedCount = allRoleIds.filter((id) => userAccess.includes(id)).length;
              const isExpanded = expandedRoles[roleGroup.roleName] ?? false;

              return (
                <div key={roleGroup.roleName} className="mb-4 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  {/* Role header */}
                  <div
                    className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 cursor-pointer select-none"
                    onClick={() => toggleRoleExpand(roleGroup.roleName)}
                  >
                    <div className="flex items-center gap-3">
                      {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                      <span className="text-sm font-semibold text-gray-900 dark:text-white">
                        {roleGroup.roleName}
                      </span>
                      <span className="text-xs text-gray-500 font-mono">{roleGroup.urlPrefix}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-gray-500">
                        {selectedCount}/{allRoleIds.length} selected
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); toggleRole(roleGroup.roleName, allRoleIds); }}
                        className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                      >
                        {selectedCount === allRoleIds.length ? 'Deselect all' : 'Select all'}
                      </button>
                    </div>
                  </div>

                  {/* Categories & menus */}
                  {isExpanded && (
                    <div className="divide-y divide-gray-100 dark:divide-gray-800">
                      {roleGroup.categories.map((cat) => (
                        <div key={cat.id} className="px-4 py-3">
                          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                            {cat.category}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {cat.items.map((item) => {
                              const enabled = userAccess.includes(item.id);
                              return (
                                <button
                                  key={item.id}
                                  onClick={() => toggleMenu(item.id)}
                                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-colors ${
                                    enabled
                                      ? 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400'
                                      : 'bg-gray-50 text-gray-600 dark:bg-gray-800 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700'
                                  }`}
                                >
                                  {enabled ? <CheckSquare size={14} /> : <Square size={14} />}
                                  <span className="truncate">{item.label}</span>
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuAssignment;
