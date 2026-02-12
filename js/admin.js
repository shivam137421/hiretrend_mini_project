// Admin panel functions

// Function to get companies data from localStorage or use default data
function getCompanies() {
    const companiesData = localStorage.getItem('companies');
    if (companiesData) {
        return JSON.parse(companiesData);
    }
    
    // Default companies data
    return [
        {
            id: 1,
            name: "TCS",
            role: "Software Engineer",
            package: "₹ 7.5 LPA",
            cgpaCutoff: 7.0,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE"]
        },
        {
            id: 2,
            name: "Infosys",
            role: "Systems Engineer",
            package: "₹ 6.5 LPA",
            cgpaCutoff: 6.5,
            eligibleBranches: ["CSE", "IT", "ECE", "ME"]
        },
        {
            id: 3,
            name: "Wipro",
            role: "Project Engineer",
            package: "₹ 5.5 LPA",
            cgpaCutoff: 6.0,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE", "ME", "CE"]
        },
        {
            id: 4,
            name: "Accenture",
            role: "Associate Software Engineer",
            package: "₹ 6.0 LPA",
            cgpaCutoff: 6.5,
            eligibleBranches: ["CSE", "IT", "ECE"]
        },
        {
            id: 5,
            name: "Cognizant",
            role: "Programmer Analyst",
            package: "₹ 6.5 LPA",
            cgpaCutoff: 6.5,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE"]
        },
        {
            id: 6,
            name: "Capgemini",
            role: "Analyst",
            package: "₹ 7.0 LPA",
            cgpaCutoff: 7.0,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 7,
            name: "HCL Technologies",
            role: "Software Developer",
            package: "₹ 5.0 LPA",
            cgpaCutoff: 6.0,
            eligibleBranches: ["CSE", "IT", "ECE", "EEE", "ME"]
        },
        {
            id: 8,
            name: "Amazon",
            role: "Software Development Engineer",
            package: "₹ 35.0 LPA",
            cgpaCutoff: 8.5,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 9,
            name: "Microsoft",
            role: "Software Engineer",
            package: "₹ 45.0 LPA",
            cgpaCutoff: 9.0,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 10,
            name: "Google",
            role: "Software Engineer",
            package: "₹ 50.0 LPA",
            cgpaCutoff: 9.2,
            eligibleBranches: ["CSE", "IT"]
        },
        {
            id: 11,
            name: "Flipkart",
            role: "Software Engineer",
            package: "₹ 28.0 LPA",
            cgpaCutoff: 8.0,
            eligibleBranches: ["CSE", "IT", "AI-ML"]
        }
    ];
}

// Function to save companies to localStorage
function saveCompanies(companies) {
    localStorage.setItem('companies', JSON.stringify(companies));
}

// Function to check if current user is admin
function checkAdminAccess() {
    // Check if admin is logged in
    const adminSession = localStorage.getItem('adminSession');
    if (adminSession) {
        const session = JSON.parse(adminSession);
        if (session.authenticated === true && session.role === "admin") {
            return true;
        }
    }
    return false;
}

// Function to logout admin
function adminLogout() {
    localStorage.removeItem('adminSession');
    window.location.href = 'login.html';
}

// Function to add a new company
function addCompany(name, role, package, cgpaCutoff, eligibleBranches) {
    const companies = getCompanies();
    
    // Generate new ID
    const newId = companies.length > 0 ? Math.max(...companies.map(c => c.id)) + 1 : 1;
    
    // Create new company object
    const newCompany = {
        id: newId,
        name: name,
        role: role,
        package: package,
        cgpaCutoff: parseFloat(cgpaCutoff),
        eligibleBranches: eligibleBranches
    };
    
    // Add to companies array
    companies.push(newCompany);
    
    // Save to localStorage
    saveCompanies(companies);
    
    showNotification('Company added successfully!', 'success');
    
    // Reset form
    document.getElementById('companyForm').reset();
    
    // Refresh company list
    renderAdminCompanies();
}

// Function to delete a company
function deleteCompany(companyId) {
    let companies = getCompanies();
    
    // Filter out the company with the given ID
    companies = companies.filter(company => company.id !== companyId);
    
    // Save to localStorage
    saveCompanies(companies);
    
    showNotification('Company deleted successfully!', 'success');
    
    // Refresh company list
    renderAdminCompanies();
}

// Function to render companies in admin panel
function renderAdminCompanies() {
    const companies = getCompanies();
    const container = document.getElementById('adminCompaniesContainer');
    
    if (!companies || companies.length === 0) {
        container.innerHTML = '<p class="no-companies">No companies found.</p>';
        return;
    }
    
    container.innerHTML = '';
    
    companies.forEach(company => {
        const companyCard = document.createElement('div');
        companyCard.className = 'company-card';
        companyCard.innerHTML = `
            <h3 class="company-name">${company.name}</h3>
            <div class="company-details">
                <p><strong>Role:</strong> ${company.role}</p>
                <p class="package">${company.package}</p>
                <p><strong>CGPA Cutoff:</strong> ${company.cgpaCutoff}</p>
                <p><strong>Eligible Branches:</strong> ${company.eligibleBranches.join(', ')}</p>
                <button class="btn btn-secondary delete-company" data-id="${company.id}">Delete Company</button>
            </div>
        `;
        
        container.appendChild(companyCard);
    });
    
    // Add event listeners to delete buttons
    document.querySelectorAll('.delete-company').forEach(button => {
        button.addEventListener('click', function() {
            const companyId = parseInt(this.getAttribute('data-id'));
            if (confirm('Are you sure you want to delete this company?')) {
                deleteCompany(companyId);
            }
        });
    });
}

// Initialize admin panel
function initAdminPanel() {
    // Check if admin is logged in
    if (!checkAdminAccess()) {
        // Redirect to login if not admin
        window.location.href = 'login.html';
        return;
    }
    
    // Hide login form and show admin panel
    document.getElementById('adminLoginSection').style.display = 'none';
    document.getElementById('adminPanelSection').style.display = 'block';
    
    // Render companies
    renderAdminCompanies();
    
    // Add event listener to company form
    const companyForm = document.getElementById('companyForm');
    if (companyForm) {
        companyForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const companyName = document.getElementById('companyName').value;
            const jobRole = document.getElementById('jobRole').value;
            const package = document.getElementById('package').value;
            const cgpaCutoff = document.getElementById('cgpaCutoff').value;
            
            // Get selected branches
            const branchSelect = document.getElementById('eligibleBranches');
            const selectedBranches = Array.from(branchSelect.selectedOptions).map(option => option.value);
            
            // Validate inputs
            if (!companyName || !jobRole || !package || !cgpaCutoff || selectedBranches.length === 0) {
                showNotification('Please fill in all fields and select at least one branch.', 'error');
                return;
            }
            
            // Add company
            addCompany(companyName, jobRole, package, cgpaCutoff, selectedBranches);
        });
    }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the admin page
    if (document.getElementById('adminPanel')) {
        initAdminPanel();
        
        // Add event listener to logout button
        const logoutBtn = document.getElementById('adminLogoutBtn');
        if (logoutBtn) {
            logoutBtn.addEventListener('click', adminLogout);
        }
    }
});
