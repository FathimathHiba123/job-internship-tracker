/**
 * CareerTrack - SaaS Application Tracker Logic
 * Pure Vanilla JavaScript implementation with LocalStorage persistence.
 */

// Initial Seed Data (At least 12 realistic dummy records)
const INITIAL_APPLICATIONS = [
    {
        id: "app-101",
        company: "Stripe",
        role: "Frontend Engineer Intern",
        location: "San Francisco, CA",
        type: "Internship",
        arrangement: "Hybrid",
        salary: "$55/hr",
        date: "2026-10-01",
        status: "Interview Scheduled",
        url: "https://stripe.com/jobs/101",
        recruiter: "Alex Rivera",
        contact: "arivera@stripe.com",
        interviewDate: "2026-11-02T14:00",
        followupDate: "2026-11-04",
        notes: "Technical phone screen scheduled. Focus on Data Structures and React rendering optimization."
    },
    {
        id: "app-102",
        company: "Google",
        role: "Associate Software Engineer",
        location: "Mountain View, CA",
        type: "Full-time",
        arrangement: "On-site",
        salary: "$145,000/yr",
        date: "2026-09-15",
        status: "Assessment",
        url: "https://careers.google.com/jobs/102",
        recruiter: "Sarah Chen",
        contact: "schen@google.com",
        interviewDate: "",
        followupDate: "2026-10-30",
        notes: "Completed Online Assessment. Awaiting recruiter review for next round."
    },
    {
        id: "app-103",
        company: "Vercel",
        role: "UI/UX Developer",
        location: "Remote",
        type: "Full-time",
        arrangement: "Remote",
        salary: "$130,000/yr",
        date: "2026-10-10",
        status: "Applied",
        url: "https://vercel.com/careers/ui-dev",
        recruiter: "Dave Miller",
        contact: "dave@vercel.com",
        interviewDate: "",
        followupDate: "2026-10-28",
        notes: "Submitted portfolio with modern web canvas app links."
    },
    {
        id: "app-104",
        company: "Microsoft",
        role: "Software Engineer I",
        location: "Redmond, WA",
        type: "Full-time",
        arrangement: "Hybrid",
        salary: "$135,000/yr",
        date: "2026-08-20",
        status: "Offer Received",
        url: "https://careers.microsoft.com/104",
        recruiter: "Karen Smith",
        contact: "ksmith@microsoft.com",
        interviewDate: "2026-09-25T10:00",
        followupDate: "2026-11-05",
        notes: "Offer received! Base salary $135k + $15k signing bonus. Decision deadline Nov 10."
    },
    {
        id: "app-105",
        company: "Airbnb",
        role: "Frontend Developer Intern",
        location: "San Francisco, CA",
        type: "Internship",
        arrangement: "Hybrid",
        salary: "$50/hr",
        date: "2026-09-02",
        status: "Rejected",
        url: "https://airbnb.com/careers/105",
        recruiter: "John Doe",
        contact: "recruiting@airbnb.com",
        interviewDate: "",
        followupDate: "",
        notes: "Received automated rejection email after resume screen."
    },
    {
        id: "app-106",
        company: "Datadog",
        role: "Full Stack Engineer",
        location: "New York, NY",
        type: "Full-time",
        arrangement: "On-site",
        salary: "$140,000/yr",
        date: "2026-10-18",
        status: "Applied",
        url: "https://datadog.com/careers/106",
        recruiter: "",
        contact: "",
        interviewDate: "",
        followupDate: "2026-11-01",
        notes: "Applied via employee referral from Mike."
    },
    {
        id: "app-107",
        company: "Figma",
        role: "Design Systems Engineer",
        location: "San Francisco, CA",
        type: "Full-time",
        arrangement: "Hybrid",
        salary: "$150,000/yr",
        date: "2026-09-28",
        status: "Interview Completed",
        url: "https://figma.com/careers/107",
        recruiter: "Elena Rostova",
        contact: "elena@figma.com",
        interviewDate: "2026-10-22T13:00",
        followupDate: "2026-10-29",
        notes: "System design round went great. Waiting for final feedback from VP of Engineering."
    },
    {
        id: "app-108",
        company: "Notion",
        role: "Web Application Developer",
        location: "Remote",
        type: "Contract",
        arrangement: "Remote",
        salary: "$65/hr",
        date: "2026-10-05",
        status: "Assessment",
        url: "https://notion.so/careers/108",
        recruiter: "Chris Paul",
        contact: "cpaul@notion.so",
        interviewDate: "",
        followupDate: "2026-10-31",
        notes: "Take-home project assigned. Deadline in 3 days."
    },
    {
        id: "app-109",
        company: "Cloudflare",
        role: "Systems Engineer Intern",
        location: "Austin, TX",
        type: "Internship",
        arrangement: "On-site",
        salary: "$45/hr",
        date: "2026-08-15",
        status: "Withdrawn",
        url: "https://cloudflare.com/careers/109",
        recruiter: "Tina Fey",
        contact: "tfey@cloudflare.com",
        interviewDate: "",
        followupDate: "",
        notes: "Withdrew application after accepting another offer."
    },
    {
        id: "app-110",
        company: "Shopify",
        role: "Frontend Developer",
        location: "Remote",
        type: "Full-time",
        arrangement: "Remote",
        salary: "$125,000/yr",
        date: "2026-10-12",
        status: "Applied",
        url: "https://shopify.com/careers/110",
        recruiter: "",
        contact: "",
        interviewDate: "",
        followupDate: "2026-11-03",
        notes: "Submitted application via LinkedIn."
    },
    {
        id: "app-111",
        company: "Linear",
        role: "Product Engineer",
        location: "Remote",
        type: "Full-time",
        arrangement: "Remote",
        salary: "$160,000/yr",
        date: "2026-09-30",
        status: "Interview Scheduled",
        url: "https://linear.app/careers/111",
        recruiter: "Marcus Vance",
        contact: "marcus@linear.app",
        interviewDate: "2026-11-01T16:00",
        followupDate: "2026-11-02",
        notes: "Cultural fit & past projects overview round."
    },
    {
        id: "app-112",
        company: "Postman",
        role: "Developer Relations Intern",
        location: "San Francisco, CA",
        type: "Internship",
        arrangement: "Hybrid",
        salary: "$42/hr",
        date: "2026-09-10",
        status: "Rejected",
        url: "https://postman.com/careers/112",
        recruiter: "Lisa Ray",
        contact: "lray@postman.com",
        interviewDate: "",
        followupDate: "",
        notes: "Position filled internally."
    }
];

// App State Management
class AppState {
    constructor() {
        this.applications = this.loadApplications();
        this.settings = this.loadSettings();
        this.currentView = 'dashboard';
        this.editingId = null;
        this.deletingId = null;
    }

    loadApplications() {
        const stored = localStorage.getItem('careertrack_apps');
        if (!stored) {
            localStorage.setItem('careertrack_apps', JSON.stringify(INITIAL_APPLICATIONS));
            return INITIAL_APPLICATIONS;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            console.error("Failed to parse stored applications", e);
            return INITIAL_APPLICATIONS;
        }
    }

    saveApplications() {
        localStorage.setItem('careertrack_apps', JSON.stringify(this.applications));
    }

    loadSettings() {
        const stored = localStorage.getItem('careertrack_settings');
        if (!stored) {
            const defaults = { name: "Jane Doe", targetGoal: 20 };
            localStorage.setItem('careertrack_settings', JSON.stringify(defaults));
            return defaults;
        }
        try {
            return JSON.parse(stored);
        } catch (e) {
            return { name: "Jane Doe", targetGoal: 20 };
        }
    }

    saveSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
        localStorage.setItem('careertrack_settings', JSON.stringify(this.settings));
    }

    addApplication(app) {
        app.id = 'app-' + Date.now();
        this.applications.unshift(app);
        this.saveApplications();
    }

    updateApplication(id, updatedApp) {
        const index = this.applications.findIndex(a => a.id === id);
        if (index !== -1) {
            this.applications[index] = { ...updatedApp, id };
            this.saveApplications();
        }
    }

    deleteApplication(id) {
        this.applications = this.applications.filter(a => a.id !== id);
        this.saveApplications();
    }

    resetDemoData() {
        this.applications = [...INITIAL_APPLICATIONS];
        this.saveApplications();
    }
}

const state = new AppState();

// Utility Functions
function escapeHTML(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

function formatDate(dateStr) {
    if (!dateStr) return 'N/A';
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

function formatDateTime(dateTimeStr) {
    if (!dateTimeStr) return 'N/A';
    const d = new Date(dateTimeStr);
    if (isNaN(d.getTime())) return dateTimeStr;
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>${escapeHTML(message)}</span>
    `;
    container.appendChild(toast);
    setTimeout(() => {
        toast.remove();
    }, 3500);
}

function getStatusBadgeClass(status) {
    switch (status) {
        case 'Applied': return 'badge-applied';
        case 'Assessment': return 'badge-assessment';
        case 'Interview Scheduled':
        case 'Interview Completed': return 'badge-interview';
        case 'Offer Received': return 'badge-offer';
        case 'Rejected': return 'badge-rejected';
        case 'Withdrawn': return 'badge-withdrawn';
        default: return 'badge-applied';
    }
}

// UI Initialization & Navigation
document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initSettingsView();
    renderAllViews();
    initFormValidation();
    initModalEvents();
});

function initNavigation() {
    const navButtons = document.querySelectorAll('.nav-btn');
    const viewSections = document.querySelectorAll('.view-section');
    const pageTitle = document.getElementById('page-title');
    const mobileToggle = document.getElementById('mobile-toggle');
    const sidebar = document.getElementById('sidebar');
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    const topbarAddBtn = document.getElementById('topbar-add-btn');
    const dashViewAll = document.getElementById('dash-view-all');

    const viewTitles = {
        'dashboard': 'Dashboard Overview',
        'applications': 'My Applications',
        'kanban': 'Application Pipeline View',
        'add-app': 'Add New Application',
        'calendar': 'Interviews & Task Schedule',
        'reports': 'Analytics & Reports',
        'settings': 'Settings & User Profile'
    };

    function switchView(viewName) {
        state.currentView = viewName;
        navButtons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === viewName);
        });

        viewSections.forEach(sec => {
            sec.classList.toggle('active', sec.id === `view-${viewName}`);
        });

        if (pageTitle && viewTitles[viewName]) {
            pageTitle.textContent = viewTitles[viewName];
        }

        // Close mobile sidebar if open
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');

        // Refresh dynamic view contents
        renderAllViews();
    }

    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchView(btn.dataset.view);
        });
    });

    if (topbarAddBtn) {
        topbarAddBtn.addEventListener('click', () => {
            resetForm();
            switchView('add-app');
        });
    }

    if (dashViewAll) {
        dashViewAll.addEventListener('click', () => {
            switchView('applications');
        });
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            sidebarOverlay.classList.toggle('active');
        });
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
        });
    }
}

function renderAllViews() {
    renderDashboard();
    renderApplicationsTable();
    renderKanbanBoard();
    renderScheduleView();
    renderReportsView();
    updateUserProfileDisplay();
}

function updateUserProfileDisplay() {
    const nameDisplay = document.getElementById('sidebar-username');
    const avatarDisplay = document.getElementById('user-avatar');

    if (nameDisplay && state.settings.name) {
        nameDisplay.textContent = state.settings.name;
        const initials = state.settings.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);
        if (avatarDisplay) avatarDisplay.textContent = initials || 'JD';
    }
}

// 1. DASHBOARD RENDERER
function renderDashboard() {
    const apps = state.applications;

    // Calculate totals
    const total = apps.length;
    const applied = apps.filter(a => a.status === 'Applied').length;
    const assessments = apps.filter(a => a.status === 'Assessment').length;
    const interviews = apps.filter(a => a.status.includes('Interview')).length;
    const offers = apps.filter(a => a.status === 'Offer Received').length;
    const rejected = apps.filter(a => a.status === 'Rejected' || a.status === 'Withdrawn').length;

    document.getElementById('stat-total').textContent = total;
    document.getElementById('stat-applied').textContent = applied;
    document.getElementById('stat-assessments').textContent = assessments;
    document.getElementById('stat-interviews').textContent = interviews;
    document.getElementById('stat-offers').textContent = offers;
    document.getElementById('stat-rejected').textContent = rejected;

    // Interview Rate
    const conversionRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
    document.getElementById('dash-conversion-rate').textContent = `${conversionRate}%`;
    document.getElementById('dash-rate-subtext').textContent = `${interviews} interviews scheduled from ${total} total applications`;

    // Status Distribution Progress Bars
    const distContainer = document.getElementById('status-distribution-container');
    distContainer.innerHTML = '';

    const statuses = [
        { label: 'Applied', count: applied, color: 'var(--status-applied)' },
        { label: 'Assessment', count: assessments, color: 'var(--status-assessment)' },
        { label: 'Interviewing', count: interviews, color: 'var(--status-interview)' },
        { label: 'Offers', count: offers, color: 'var(--status-offer)' },
        { label: 'Rejected/Closed', count: rejected, color: 'var(--status-rejected)' }
    ];

    statuses.forEach(s => {
        const pct = total > 0 ? Math.round((s.count / total) * 100) : 0;
        const barItem = document.createElement('div');
        barItem.className = 'status-bar-item';
        barItem.innerHTML = `
            <div class="status-bar-info">
                <span>${s.label}</span>
                <span>${s.count} (${pct}%)</span>
            </div>
            <div class="status-bar-bg">
                <div class="status-bar-inner" style="width: ${pct}%; background-color: ${s.color}"></div>
            </div>
        `;
        distContainer.appendChild(barItem);
    });

    // Recent Applications Table (Top 5)
    const recentTable = document.getElementById('dash-recent-table');
    recentTable.innerHTML = '';
    const sortedApps = [...apps].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);

    sortedApps.forEach(app => {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td class="table-company-name">${escapeHTML(app.company)}</td>
            <td>${escapeHTML(app.role)}</td>
            <td>${formatDate(app.date)}</td>
            <td><span class="badge ${getStatusBadgeClass(app.status)}">${escapeHTML(app.status)}</span></td>
            <td>
                <button class="btn-icon" onclick="openDetailsModal('${app.id}')" title="View Details">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                </button>
            </td>
        `;
        recentTable.appendChild(tr);
    });

    // Mini Schedule: Upcoming Interviews
    const upcomingList = document.getElementById('dash-upcoming-interviews');
    upcomingList.innerHTML = '';
    const upcomingInterviews = apps
        .filter(a => a.interviewDate && new Date(a.interviewDate) >= new Date())
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate))
        .slice(0, 3);

    if (upcomingInterviews.length === 0) {
        upcomingList.innerHTML = '<li class="text-muted text-sm text-center padding-10">No upcoming interviews</li>';
    } else {
        upcomingInterviews.forEach(app => {
            const li = document.createElement('li');
            li.className = 'mini-schedule-item';
            li.innerHTML = `
                <div>
                    <div class="mini-company">${escapeHTML(app.company)}</div>
                    <div class="table-subtext">${escapeHTML(app.role)}</div>
                </div>
                <div class="mini-date">${formatDateTime(app.interviewDate)}</div>
            `;
            upcomingList.appendChild(li);
        });
    }

    // Mini Schedule: Followups
    const followupList = document.getElementById('dash-upcoming-followups');
    followupList.innerHTML = '';
    const upcomingFollowups = apps
        .filter(a => a.followupDate)
        .sort((a, b) => new Date(a.followupDate) - new Date(b.followupDate))
        .slice(0, 3);

    if (upcomingFollowups.length === 0) {
        followupList.innerHTML = '<li class="text-muted text-sm text-center padding-10">No follow-ups pending</li>';
    } else {
        upcomingFollowups.forEach(app => {
            const isOverdue = new Date(app.followupDate) < new Date().setHours(0,0,0,0);
            const li = document.createElement('li');
            li.className = 'mini-schedule-item';
            li.innerHTML = `
                <div>
                    <div class="mini-company">${escapeHTML(app.company)}</div>
                    <div class="table-subtext">${escapeHTML(app.role)}</div>
                </div>
                <div class="mini-date ${isOverdue ? 'text-danger' : ''}">${formatDate(app.followupDate)} ${isOverdue ? '(Overdue)' : ''}</div>
            `;
            followupList.appendChild(li);
        });
    }
}

// 2. APPLICATIONS TABLE RENDERER WITH SEARCH & FILTERS
function renderApplicationsTable() {
    const tableBody = document.getElementById('applications-table-body');
    const emptyState = document.getElementById('table-empty-state');
    if (!tableBody) return;

    tableBody.innerHTML = '';

    const searchTerm = document.getElementById('table-search').value.toLowerCase().trim();
    const statusFilter = document.getElementById('filter-status').value;
    const typeFilter = document.getElementById('filter-type').value;
    const workplaceFilter = document.getElementById('filter-workplace').value;
    const sortBy = document.getElementById('sort-by').value;

    let filtered = state.applications.filter(app => {
        const matchesSearch = 
            app.company.toLowerCase().includes(searchTerm) ||
            app.role.toLowerCase().includes(searchTerm) ||
            (app.location && app.location.toLowerCase().includes(searchTerm));

        const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
        const matchesType = typeFilter === 'ALL' || app.type === typeFilter;
        const matchesWorkplace = workplaceFilter === 'ALL' || app.arrangement === workplaceFilter;

        return matchesSearch && matchesStatus && matchesType && matchesWorkplace;
    });

    // Sorting
    filtered.sort((a, b) => {
        if (sortBy === 'date-desc') return new Date(b.date) - new Date(a.date);
        if (sortBy === 'date-asc') return new Date(a.date) - new Date(b.date);
        if (sortBy === 'company-asc') return a.company.localeCompare(b.company);
        if (sortBy === 'company-desc') return b.company.localeCompare(a.company);
        return 0;
    });

    if (filtered.length === 0) {
        emptyState.classList.remove('hidden');
    } else {
        emptyState.classList.add('hidden');
        filtered.forEach(app => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>
                    <div class="table-company-name">${escapeHTML(app.company)}</div>
                    <div class="table-subtext">${escapeHTML(app.location || 'N/A')}</div>
                </td>
                <td>${escapeHTML(app.role)}</td>
                <td>
                    <div>${escapeHTML(app.type)}</div>
                    <div class="table-subtext">${escapeHTML(app.arrangement)}</div>
                </td>
                <td>${formatDate(app.date)}</td>
                <td><span class="badge ${getStatusBadgeClass(app.status)}">${escapeHTML(app.status)}</span></td>
                <td>${escapeHTML(app.salary || 'N/A')}</td>
                <td>
                    <div style="display: flex; gap: 4px;">
                        <button class="btn-icon" onclick="openDetailsModal('${app.id}')" title="View Details">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
                        </button>
                        <button class="btn-icon" onclick="editApp('${app.id}')" title="Edit Application">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                        </button>
                        <button class="btn-icon" onclick="confirmDelete('${app.id}')" title="Delete Record">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                </td>
            `;
            tableBody.appendChild(tr);
        });
    }
}

// Attach filter listeners
document.querySelectorAll('#table-search, #filter-status, #filter-type, #filter-workplace, #sort-by').forEach(elem => {
    elem.addEventListener('input', renderApplicationsTable);
    elem.addEventListener('change', renderApplicationsTable);
});

document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
    document.getElementById('table-search').value = '';
    document.getElementById('filter-status').value = 'ALL';
    document.getElementById('filter-type').value = 'ALL';
    document.getElementById('filter-workplace').value = 'ALL';
    document.getElementById('sort-by').value = 'date-desc';
    renderApplicationsTable();
});

// 3. KANBAN PIPELINE RENDERER
function renderKanbanBoard() {
    const columns = {
        'Applied': document.getElementById('kanban-Applied'),
        'Assessment': document.getElementById('kanban-Assessment'),
        'Interview': document.getElementById('kanban-Interview'),
        'Offer Received': document.getElementById('kanban-Offer'),
        'Rejected': document.getElementById('kanban-Rejected')
    };

    if (!columns['Applied']) return;

    // Clear board
    Object.keys(columns).forEach(key => columns[key].innerHTML = '');

    const counts = { 'Applied': 0, 'Assessment': 0, 'Interview': 0, 'Offer Received': 0, 'Rejected': 0 };

    state.applications.forEach(app => {
        let colKey = app.status;
        if (app.status === 'Interview Scheduled' || app.status === 'Interview Completed') {
            colKey = 'Interview';
        } else if (app.status === 'Withdrawn') {
            colKey = 'Rejected';
        }

        if (columns[colKey]) {
            counts[colKey]++;
            const card = document.createElement('div');
            card.className = 'kanban-card';
            card.onclick = () => openDetailsModal(app.id);
            card.innerHTML = `
                <div class="kanban-card-company">${escapeHTML(app.company)}</div>
                <div class="kanban-card-title">${escapeHTML(app.role)}</div>
                <div class="kanban-card-footer">
                    <span>${formatDate(app.date)}</span>
                    <select class="form-control select-sm" onclick="event.stopPropagation();" onchange="updateAppStatus('${app.id}', this.value)">
                        <option value="Applied" ${app.status === 'Applied' ? 'selected' : ''}>Applied</option>
                        <option value="Assessment" ${app.status === 'Assessment' ? 'selected' : ''}>Assessment</option>
                        <option value="Interview Scheduled" ${app.status === 'Interview Scheduled' ? 'selected' : ''}>Interview Scheduled</option>
                        <option value="Interview Completed" ${app.status === 'Interview Completed' ? 'selected' : ''}>Interview Completed</option>
                        <option value="Offer Received" ${app.status === 'Offer Received' ? 'selected' : ''}>Offer Received</option>
                        <option value="Rejected" ${app.status === 'Rejected' ? 'selected' : ''}>Rejected</option>
                        <option value="Withdrawn" ${app.status === 'Withdrawn' ? 'selected' : ''}>Withdrawn</option>
                    </select>
                </div>
            `;
            columns[colKey].appendChild(card);
        }
    });

    // Update Kanban Counters
    document.getElementById('count-applied').textContent = counts['Applied'];
    document.getElementById('count-assessment').textContent = counts['Assessment'];
    document.getElementById('count-interview').textContent = counts['Interview'];
    document.getElementById('count-offer').textContent = counts['Offer Received'];
    document.getElementById('count-rejected').textContent = counts['Rejected'];
}

function updateAppStatus(id, newStatus) {
    const app = state.applications.find(a => a.id === id);
    if (app) {
        app.status = newStatus;
        state.saveApplications();
        renderAllViews();
        showToast(`Status updated to ${newStatus}`);
    }
}

// 4. INTERVIEW & SCHEDULE VIEW RENDERER
function renderScheduleView() {
    const interviewContainer = document.getElementById('interview-timeline');
    const followupContainer = document.getElementById('followup-timeline');
    if (!interviewContainer) return;

    interviewContainer.innerHTML = '';
    followupContainer.innerHTML = '';

    const scheduledInterviews = state.applications
        .filter(a => a.interviewDate)
        .sort((a, b) => new Date(a.interviewDate) - new Date(b.interviewDate));

    if (scheduledInterviews.length === 0) {
        interviewContainer.innerHTML = '<div class="empty-state"><p>No interviews scheduled yet.</p></div>';
    } else {
        scheduledInterviews.forEach(app => {
            const item = document.createElement('div');
            item.className = 'timeline-item';
            item.innerHTML = `
                <div>
                    <div class="timeline-date">${formatDateTime(app.interviewDate)}</div>
                    <div class="timeline-company">${escapeHTML(app.company)}</div>
                    <div class="timeline-role">${escapeHTML(app.role)}</div>
                    ${app.notes ? `<div class="table-subtext margin-top-10">${escapeHTML(app.notes)}</div>` : ''}
                </div>
                <button class="btn btn-sm btn-outline" onclick="openDetailsModal('${app.id}')">View</button>
            `;
            interviewContainer.appendChild(item);
        });
    }

    const scheduledFollowups = state.applications
        .filter(a => a.followupDate)
        .sort((a, b) => new Date(a.followupDate) - new Date(b.followupDate));

    if (scheduledFollowups.length === 0) {
        followupContainer.innerHTML = '<div class="empty-state"><p>No follow-ups recorded.</p></div>';
    } else {
        scheduledFollowups.forEach(app => {
            const isOverdue = new Date(app.followupDate) < new Date().setHours(0,0,0,0);
            const item = document.createElement('div');
            item.className = `timeline-item ${isOverdue ? 'overdue' : ''}`;
            item.innerHTML = `
                <div>
                    <div class="timeline-date">${formatDate(app.followupDate)} ${isOverdue ? '(Overdue)' : ''}</div>
                    <div class="timeline-company">${escapeHTML(app.company)}</div>
                    <div class="timeline-role">${escapeHTML(app.role)}</div>
                </div>
                <button class="btn btn-sm btn-outline" onclick="openDetailsModal('${app.id}')">View</button>
            `;
            followupContainer.appendChild(item);
        });
    }
}

// 5. REPORTS & ANALYTICS RENDERER
function renderReportsView() {
    const chartContainer = document.getElementById('monthly-chart-container');
    const funnelContainer = document.getElementById('funnel-metrics-container');
    if (!chartContainer) return;

    chartContainer.innerHTML = '';
    funnelContainer.innerHTML = '';

    // Generate monthly distribution data
    const monthsMap = {};
    state.applications.forEach(app => {
        if (app.date) {
            const monthKey = app.date.slice(0, 7); // YYYY-MM
            monthsMap[monthKey] = (monthsMap[monthKey] || 0) + 1;
        }
    });

    const sortedMonths = Object.keys(monthsMap).sort();
    const maxCount = Math.max(...Object.values(monthsMap), 1);

    if (sortedMonths.length === 0) {
        chartContainer.innerHTML = '<div class="empty-state"><p>No data available for monthly report.</p></div>';
    } else {
        sortedMonths.forEach(mKey => {
            const count = monthsMap[mKey];
            const pct = Math.round((count / maxCount) * 100);
            const d = new Date(mKey + "-01");
            const label = d.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });

            const group = document.createElement('div');
            group.className = 'bar-group';
            group.innerHTML = `
                <span class="bar-value">${count}</span>
                <div class="bar-wrapper">
                    <div class="bar-fill" style="height: ${pct}%"></div>
                </div>
                <span class="bar-label">${label}</span>
            `;
            chartContainer.appendChild(group);
        });
    }

    // Funnel breakdown
    const total = state.applications.length;
    const interviews = state.applications.filter(a => a.status.includes('Interview')).length;
    const offers = state.applications.filter(a => a.status === 'Offer Received').length;

    const interviewRate = total > 0 ? Math.round((interviews / total) * 100) : 0;
    const offerRate = interviews > 0 ? Math.round((offers / interviews) * 100) : 0;

    funnelContainer.innerHTML = `
        <div class="status-bar-item">
            <div class="status-bar-info">
                <span>Application to Interview Rate</span>
                <span>${interviewRate}%</span>
            </div>
            <div class="status-bar-bg">
                <div class="status-bar-inner" style="width: ${interviewRate}%; background-color: var(--primary);"></div>
            </div>
        </div>

        <div class="status-bar-item margin-top-15">
            <div class="status-bar-info">
                <span>Interview to Offer Conversion</span>
                <span>${offerRate}%</span>
            </div>
            <div class="status-bar-bg">
                <div class="status-bar-inner" style="width: ${offerRate}%; background-color: var(--status-offer);"></div>
            </div>
        </div>
    `;
}

// Export CSV Feature
document.getElementById('btn-export-csv')?.addEventListener('click', () => {
    if (state.applications.length === 0) {
        showToast('No applications to export.', 'error');
        return;
    }

    const headers = ["ID", "Company", "Role", "Location", "Type", "Arrangement", "Salary", "Application Date", "Status", "URL", "Recruiter", "Contact", "Notes"];
    const rows = state.applications.map(app => [
        `"${app.id}"`,
        `"${app.company.replace(/"/g, '""')}"`,
        `"${app.role.replace(/"/g, '""')}"`,
        `"${(app.location || '').replace(/"/g, '""')}"`,
        `"${app.type}"`,
        `"${app.arrangement}"`,
        `"${(app.salary || '').replace(/"/g, '""')}"`,
        `"${app.date}"`,
        `"${app.status}"`,
        `"${(app.url || '').replace(/"/g, '""')}"`,
        `"${(app.recruiter || '').replace(/"/g, '""')}"`,
        `"${(app.contact || '').replace(/"/g, '""')}"`,
        `"${(app.notes || '').replace(/"/g, '""')}"`
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `CareerTrack_Applications_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Applications exported as CSV successfully!");
});

// 6. FORM VALIDATION & HANDLING
function initFormValidation() {
    const form = document.getElementById('app-form');
    const cancelBtn = document.getElementById('form-cancel-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // Perform Validation
        let isValid = true;

        const companyInput = document.getElementById('form-company');
        const roleInput = document.getElementById('form-role');
        const dateInput = document.getElementById('form-date');
        const urlInput = document.getElementById('form-url');

        // Company Check
        if (!companyInput.value.trim()) {
            companyInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            companyInput.parentElement.classList.remove('has-error');
        }

        // Role Check
        if (!roleInput.value.trim()) {
            roleInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            roleInput.parentElement.classList.remove('has-error');
        }

        // Date Check
        if (!dateInput.value) {
            dateInput.parentElement.classList.add('has-error');
            isValid = false;
        } else {
            dateInput.parentElement.classList.remove('has-error');
        }

        // URL Check (If provided)
        if (urlInput.value.trim()) {
            const urlPattern = /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;
            if (!urlPattern.test(urlInput.value.trim())) {
                urlInput.parentElement.classList.add('has-error');
                isValid = false;
            } else {
                urlInput.parentElement.classList.remove('has-error');
            }
        } else {
            urlInput.parentElement.classList.remove('has-error');
        }

        if (!isValid) {
            showToast('Please fix the errors in the form.', 'error');
            return;
        }

        const formData = {
            company: companyInput.value.trim(),
            role: roleInput.value.trim(),
            location: document.getElementById('form-location').value.trim(),
            type: document.getElementById('form-type').value,
            arrangement: document.getElementById('form-arrangement').value,
            salary: document.getElementById('form-salary').value.trim(),
            date: dateInput.value,
            status: document.getElementById('form-status').value,
            interviewDate: document.getElementById('form-interview-date').value,
            followupDate: document.getElementById('form-followup-date').value,
            url: urlInput.value.trim(),
            recruiter: document.getElementById('form-recruiter').value.trim(),
            contact: document.getElementById('form-contact').value.trim(),
            notes: document.getElementById('form-notes').value.trim()
        };

        if (state.editingId) {
            state.updateApplication(state.editingId, formData);
            showToast(`Updated application for ${formData.company}`);
        } else {
            state.addApplication(formData);
            showToast(`Added new application for ${formData.company}`);
        }

        resetForm();
        // Return to applications table
        document.querySelector('[data-view="applications"]').click();
    });

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            resetForm();
            document.querySelector('[data-view="applications"]').click();
        });
    }
}

function resetForm() {
    state.editingId = null;
    const form = document.getElementById('app-form');
    if (form) {
        form.reset();
        document.getElementById('app-id').value = '';
        document.getElementById('form-title').textContent = 'Add New Application';
        document.querySelectorAll('.form-group').forEach(fg => fg.classList.remove('has-error'));
        document.getElementById('form-date').valueAsDate = new Date();
    }
}

function editApp(id) {
    const app = state.applications.find(a => a.id === id);
    if (!app) return;

    state.editingId = id;
    document.getElementById('form-title').textContent = `Edit Application - ${app.company}`;
    document.getElementById('app-id').value = app.id;
    document.getElementById('form-company').value = app.company || '';
    document.getElementById('form-role').value = app.role || '';
    document.getElementById('form-location').value = app.location || '';
    document.getElementById('form-type').value = app.type || 'Full-time';
    document.getElementById('form-arrangement').value = app.arrangement || 'Hybrid';
    document.getElementById('form-salary').value = app.salary || '';
    document.getElementById('form-date').value = app.date || '';
    document.getElementById('form-status').value = app.status || 'Applied';
    document.getElementById('form-interview-date').value = app.interviewDate || '';
    document.getElementById('form-followup-date').value = app.followupDate || '';
    document.getElementById('form-url').value = app.url || '';
    document.getElementById('form-recruiter').value = app.recruiter || '';
    document.getElementById('form-contact').value = app.contact || '';
    document.getElementById('form-notes').value = app.notes || '';

    // Switch view to form
    document.querySelector('[data-view="add-app"]').click();
}

// 7. MODALS & CONFIRMATION DIALOGS
function initModalEvents() {
    const detailsModal = document.getElementById('details-modal');
    const confirmModal = document.getElementById('confirm-modal');

    document.getElementById('modal-close-btn')?.addEventListener('click', () => {
        detailsModal.classList.remove('active');
    });

    document.getElementById('confirm-cancel-btn')?.addEventListener('click', () => {
        confirmModal.classList.remove('active');
        state.deletingId = null;
    });

    document.getElementById('confirm-action-btn')?.addEventListener('click', () => {
        if (state.deletingId) {
            state.deleteApplication(state.deletingId);
            showToast('Application deleted successfully.');
            confirmModal.classList.remove('active');
            detailsModal.classList.remove('active');
            state.deletingId = null;
            renderAllViews();
        }
    });
}

function openDetailsModal(id) {
    const app = state.applications.find(a => a.id === id);
    if (!app) return;

    const detailsModal = document.getElementById('details-modal');
    document.getElementById('modal-company-title').textContent = app.company;
    document.getElementById('modal-role-subtitle').textContent = app.role;

    const bodyContent = document.getElementById('modal-body-content');
    bodyContent.innerHTML = `
        <div class="modal-detail-grid">
            <div>
                <div class="detail-label">Status</div>
                <div class="detail-value"><span class="badge ${getStatusBadgeClass(app.status)}">${escapeHTML(app.status)}</span></div>
            </div>
            <div>
                <div class="detail-label">Applied Date</div>
                <div class="detail-value">${formatDate(app.date)}</div>
            </div>
            <div>
                <div class="detail-label">Location</div>
                <div class="detail-value">${escapeHTML(app.location || 'N/A')}</div>
            </div>
            <div>
                <div class="detail-label">Work Type & Arrangement</div>
                <div class="detail-value">${escapeHTML(app.type)} (${escapeHTML(app.arrangement)})</div>
            </div>
            <div>
                <div class="detail-label">Salary / Pay</div>
                <div class="detail-value">${escapeHTML(app.salary || 'N/A')}</div>
            </div>
            <div>
                <div class="detail-label">Posting Link</div>
                <div class="detail-value">${app.url ? `<a href="${escapeHTML(app.url)}" target="_blank" rel="noopener">View Posting &rarr;</a>` : 'N/A'}</div>
            </div>
            <div>
                <div class="detail-label">Recruiter Name</div>
                <div class="detail-value">${escapeHTML(app.recruiter || 'N/A')}</div>
            </div>
            <div>
                <div class="detail-label">Recruiter Contact</div>
                <div class="detail-value">${escapeHTML(app.contact || 'N/A')}</div>
            </div>
            <div>
                <div class="detail-label">Scheduled Interview</div>
                <div class="detail-value">${formatDateTime(app.interviewDate)}</div>
            </div>
            <div>
                <div class="detail-label">Follow-up Date</div>
                <div class="detail-value">${formatDate(app.followupDate)}</div>
            </div>
        </div>
        <div class="margin-top-20">
            <div class="detail-label">Notes & Details</div>
            <div class="detail-value margin-top-10" style="white-space: pre-wrap; background: var(--slate-50); padding: 12px; border-radius: 6px;">${escapeHTML(app.notes || 'No notes provided.')}</div>
        </div>
    `;

    document.getElementById('modal-edit-btn').onclick = () => {
        detailsModal.classList.remove('active');
        editApp(app.id);
    };

    document.getElementById('modal-delete-btn').onclick = () => {
        confirmDelete(app.id);
    };

    detailsModal.classList.add('active');
}

function confirmDelete(id) {
    state.deletingId = id;
    const app = state.applications.find(a => a.id === id);
    if (app) {
        document.getElementById('confirm-message').textContent = `Are you sure you want to delete the record for ${app.company} (${app.role})?`;
        document.getElementById('confirm-modal').classList.add('active');
    }
}

// 8. SETTINGS VIEW LOGIC
function initSettingsView() {
    const form = document.getElementById('settings-form');
    if (!form) return;

    document.getElementById('setting-name').value = state.settings.name || 'Jane Doe';
    document.getElementById('setting-target').value = state.settings.targetGoal || 20;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const newName = document.getElementById('setting-name').value.trim();
        const newTarget = parseInt(document.getElementById('setting-target').value, 10);

        state.saveSettings({ name: newName, targetGoal: newTarget });
        updateUserProfileDisplay();
        showToast('Settings saved successfully!');
    });

    document.getElementById('btn-reset-demo')?.addEventListener('click', () => {
        if (confirm('Reset all applications to original seed demo data? Custom changes will be lost.')) {
            state.resetDemoData();
            renderAllViews();
            showToast('Demo data restored.');
        }
    });
}
