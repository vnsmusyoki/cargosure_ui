import React, { useEffect, useState, useCallback } from 'react';
import { Search, Save, Building2, CheckSquare, Square, ChevronDown, ChevronRight } from 'lucide-react';
import toast from 'react-hot-toast';
import { getMenusForRole, getOrgMenuAccess, assignOrgMenus } from '@/services/menuService';

const ASSIGNABLE_ROLES = ['Company', 'Distributor'];

const MenuAccessAssignment = () => {
  const [orgs, setOrgs] = useState([]);             // [{organizationId, organizationName, enabledMenuIds}]
  const [roleMenus, setRoleMenus] = useState({});   // {roleName: [{id, category, items}]}
  const [selectedOrg, setSelectedOrg] = useState(null);
  const [orgAccess, setOrgAccess] = useState([]);   // enabled menuIds for selected org
  const [activeRole, setActiveRole] = useState('Company');
  const [orgSearch, setOrgSearch] = useState('');
  const [saving, setSaving] = useState(false);
  const [loadingOrgs, setLoadingOrgs] = useState(true);
  const [loadingMenus, setLoadingMenus] = useState(false);
  const [expandedCats, setExpandedCats] = useState({});

  // Load orgs and their current access
  useEffect(() => {
    getOrgMenuAccess()
      .then((data) => setOrgs(data ?? []))
      .catch(() => toast.error('Failed to load organizations'))
      .finally(() => setLoadingOrgs(false));
  }, []);

  // Load menus for the active role tab
  useEffect(() => {
    if (roleMenus[activeRole]) return;
    setLoadingMenus(true);
    getMenusForRole(activeRole)
      .then((data) => setRoleMenus((prev) => ({ ...prev, [activeRole]: data ?? [] })))
      .catch(() => toast.error(`Failed to load ${activeRole} menus`))
      .finally(() => setLoadingMenus(false));
  }, [activeRole]);

  const selectOrg = useCallback((org) => {
    setSelectedOrg(org);
    setOrgAccess(org.enabledMenuIds ?? []);
  }, []);

  const toggleMenu = (menuId) => {
    setOrgAccess((prev) =>
      prev.includes(menuId) ? prev.filter((id) => id !== menuId) : [...prev, menuId]
    );
  };

  const toggleCat = (catId, allIds) => {
    const allSelected = allIds.every((id) => orgAccess.includes(id));
    if (allSelected) {
      setOrgAccess((prev) => prev.filter((id) => !allIds.includes(id)));
    } else {
      setOrgAccess((prev) => [...new Set([...prev, ...allIds])]);
    }
  };

  const handleSave = async () => {
    if (!selectedOrg) return;
    setSaving(true);
    try {
      await assignOrgMenus({
        organizationId: selectedOrg.organizationId,
        menuIds: orgAccess,
      });
      // Update local state so the sidebar reflects saved state
      setOrgs((prev) =>
        prev.map((o) =>
          o.organizationId === selectedOrg.organizationId
            ? { ...o, enabledMenuIds: orgAccess }
            : o
        )
      );
      toast.success(`Menu access updated for ${selectedOrg.organizationName}`);
    } catch {
      toast.error('Failed to save menu access');
    } finally {
      setSaving(false);
    }
  };

  const filteredOrgs = orgs.filter((o) =>
    o.organizationName.toLowerCase().includes(orgSearch.toLowerCase())
  );

  const categories = roleMenus[activeRole] ?? [];

  return (
    <div className="flex h-full gap-6 p-6">
      {/* ── Left panel: org picker ── */}
      <div className="w-72 flex-shrink-0 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
            Companies & Distributors
          </h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            <input
              type="text"
              placeholder="Search organizations..."
              className="w-full pl-9 pr-3 py-2 text-sm bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={orgSearch}
              onChange={(e) => setOrgSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {loadingOrgs ? (
            <div className="p-4 space-y-2 animate-pulse">
              {[1,2,3,4].map((i) => <div key={i} className="h-10 bg-gray-200 dark:bg-gray-700 rounded-lg" />)}
            </div>
          ) : filteredOrgs.length === 0 ? (
            <p className="p-4 text-sm text-gray-500 text-center">No organizations found</p>
          ) : (
            filteredOrgs.map((org) => (
              <button
                key={org.organizationId}
                onClick={() => selectOrg(org)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                  selectedOrg?.organizationId === org.organizationId
                    ? 'bg-blue-50 dark:bg-blue-900/20 border-l-2 border-blue-500'
                    : ''
                }`}
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-600 flex items-center justify-center flex-shrink-0">
                  <Building2 size={14} className="text-white" />
                </div>
                <div className="min-w-0">
                  <div className="text-sm font-medium text-gray-900 dark:text-white truncate">
                    {org.organizationName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {org.enabledMenuIds?.length ?? 0} menus assigned
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* ── Right panel: menu assignment ── */}
      <div className="flex-1 flex flex-col bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white">
              {selectedOrg
                ? `Menu Access — ${selectedOrg.organizationName}`
                : 'Select an organization to configure menu access'}
            </h2>
            {selectedOrg && (
              <p className="text-xs text-gray-500 mt-0.5">
                {orgAccess.length} menu{orgAccess.length !== 1 ? 's' : ''} enabled
              </p>
            )}
          </div>
          {selectedOrg && (
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

        {selectedOrg && (
          <div className="flex gap-2 px-4 py-3 border-b border-gray-100 dark:border-gray-800">
            {ASSIGNABLE_ROLES.map((r) => (
              <button
                key={r}
                onClick={() => setActiveRole(r)}
                className={`px-3 py-1.5 text-sm rounded-lg font-medium transition-colors ${
                  activeRole === r
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
                    : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
                }`}
              >
                {r}
              </button>
            ))}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-4">
          {!selectedOrg ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <Building2 size={48} className="mb-3" />
              <p className="text-sm">Pick an organization from the left panel</p>
            </div>
          ) : loadingMenus ? (
            <div className="space-y-3 animate-pulse">
              {[1,2,3].map((i) => <div key={i} className="h-14 bg-gray-200 dark:bg-gray-700 rounded-lg" />)}
            </div>
          ) : (
            categories.map((cat) => {
              const catIds = cat.items.map((m) => m.id);
              const allSelected = catIds.every((id) => orgAccess.includes(id));
              const isExpanded = expandedCats[cat.id] ?? true;

              return (
                <div key={cat.id} className="mb-3 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
                  <div
                    className="flex items-center justify-between px-4 py-2.5 bg-gray-50 dark:bg-gray-800 cursor-pointer select-none"
                    onClick={() => setExpandedCats((prev) => ({ ...prev, [cat.id]: !isExpanded }))}
                  >
                    <div className="flex items-center gap-2">
                      {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                      <span className="text-sm font-medium text-gray-900 dark:text-white">{cat.category}</span>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); toggleCat(cat.id, catIds); }}
                      className="text-xs text-blue-600 hover:text-blue-800 font-medium"
                    >
                      {allSelected ? 'Deselect all' : 'Select all'}
                    </button>
                  </div>

                  {isExpanded && (
                    <div className="px-4 py-3 grid grid-cols-2 gap-2">
                      {cat.items.map((item) => {
                        const enabled = orgAccess.includes(item.id);
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

export default MenuAccessAssignment;
