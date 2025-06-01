    // Check for saved theme preference when any page loads
    document.addEventListener('DOMContentLoaded', function() {
        const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
        const darkModeToggle = document.getElementById('darkModeToggle');
        
        // Apply theme if enabled
        if (darkModeEnabled) {
            document.documentElement.classList.add('dark-mode');
            if (darkModeToggle) darkModeToggle.checked = true;
        }
        
        // Theme toggle functionality (only add if toggle exists on page)
        if (darkModeToggle) {
            darkModeToggle.addEventListener('change', function() {
                if (this.checked) {
                    document.documentElement.classList.add('dark-mode');
                    localStorage.setItem('darkMode', 'enabled');
                } else {
                    document.documentElement.classList.remove('dark-mode');
                    localStorage.setItem('darkMode', 'disabled');
                }
            });
        }
    });
    // Sample tenant data
    const tenants = [
        {
            id: 1,
            name: "John Doe",
            property: "Property A - House 1",
            phone: "+254712345678",
            email: "john@example.com",
            rent: "15,000",
            status: "Active"
        },
        {
            id: 2,
            name: "Jane Smith",
            property: "Property B - Apartment 3",
            phone: "+254723456789",
            email: "jane@example.com",
            rent: "25,000",
            status: "Active"
        },
        // Add more sample tenants as needed
    ];

    // DOM Elements
    const addTenantBtn = document.getElementById('addTenantBtn');
    const addTenantModal = document.getElementById('addTenantModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const cancelAddTenant = document.getElementById('cancelAddTenant');
    const tenantForm = document.getElementById('tenantForm');
    const tenantsTableBody = document.getElementById('tenantsTableBody');
    const deleteModal = document.getElementById('deleteModal');
    const closeDeleteModalBtn = document.getElementById('closeDeleteModalBtn');
    const cancelDeleteBtn = document.getElementById('cancelDeleteBtn');
    const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    const toggleSidebar = document.getElementById('toggleSidebar');
    const contentArea = document.getElementById('contentArea');

    // Toggle sidebar
    toggleSidebar.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        contentArea.classList.toggle('expanded');
    });

    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        sidebar.classList.toggle('open');
    });

    // Modal functions
    function openModal(modal) {
        modal.classList.add('active');
    }

    function closeModal(modal) {
        modal.classList.remove('active');
    }

    // Add Tenant Modal
    addTenantBtn.addEventListener('click', () => openModal(addTenantModal));
    closeModalBtn.addEventListener('click', () => closeModal(addTenantModal));
    cancelAddTenant.addEventListener('click', () => closeModal(addTenantModal));

    // Delete Modal
    closeDeleteModalBtn.addEventListener('click', () => closeModal(deleteModal));
    cancelDeleteBtn.addEventListener('click', () => closeModal(deleteModal));

    // Form submission
    tenantForm.addEventListener('submit', (e) => {
        e.preventDefault();
        // Here you would typically send the data to a server
        alert('Tenant added successfully!');
        closeModal(addTenantModal);
        tenantForm.reset();
    });

    // Render tenants table
    function renderTenants() {
        tenantsTableBody.innerHTML = '';
        tenants.forEach(tenant => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="flex items-center">
                        <div class="tenant-avatar bg-blue-600">
                            ${tenant.name.charAt(0)}
                        </div>
                        <div class="ml-4">
                            <div class="text-sm font-medium text-gray-900">${tenant.name}</div>
                        </div>
                    </div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">${tenant.property}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">${tenant.phone}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">${tenant.email}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-500">KSh ${tenant.rent}</div>
                </td>
                <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                        ${tenant.status === 'Active' ? 'bg-green-100 text-green-800' : 
                          tenant.status === 'Overdue' ? 'bg-red-100 text-red-800' : 
                          'bg-yellow-100 text-yellow-800'}">
                        ${tenant.status}
                    </span>
                </td>
                <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button class="text-blue-600 hover:text-blue-900 mr-3 edit-btn" data-id="${tenant.id}">Edit</button>
                    <button class="text-red-600 hover:text-red-900 delete-btn" data-id="${tenant.id}">Delete</button>
                </td>
            `;
            tenantsTableBody.appendChild(row);
        });

        // Add event listeners to delete buttons
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tenantId = e.target.getAttribute('data-id');
                openModal(deleteModal);
                confirmDeleteBtn.onclick = () => {
                    // Here you would typically delete the tenant from your data
                    alert(`Tenant with ID ${tenantId} deleted`);
                    closeModal(deleteModal);
                };
            });
        });
    }

    // Initialize the page
    document.addEventListener('DOMContentLoaded', () => {
        renderTenants();
        document.getElementById('totalTenants').textContent = tenants.length;
    });
    // Add this to your script
const searchInput = document.querySelector('input[type="text"]');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filteredTenants = tenants.filter(tenant => 
        tenant.name.toLowerCase().includes(searchTerm) || 
        tenant.property.toLowerCase().includes(searchTerm) ||
        tenant.email.toLowerCase().includes(searchTerm));
    renderFilteredTenants(filteredTenants);
});
document.addEventListener('DOMContentLoaded', function() {
    const darkModeEnabled = localStorage.getItem('darkMode') === 'enabled';
    const darkModeToggle = document.getElementById('darkModeToggle');
    
    // Apply theme if enabled
    if (darkModeEnabled) {
        document.documentElement.classList.add('dark-mode');
        if (darkModeToggle) darkModeToggle.checked = true;
    }
    
    // Theme toggle functionality
    if (darkModeToggle) {
        darkModeToggle.addEventListener('change', function() {
            if (this.checked) {
                document.documentElement.classList.add('dark-mode');
                localStorage.setItem('darkMode', 'enabled');
            } else {
                document.documentElement.classList.remove('dark-mode');
                localStorage.setItem('darkMode', 'disabled');
            }
        });
    }
});