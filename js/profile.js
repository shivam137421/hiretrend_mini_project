// Profile management functions

// Function to get profile data from localStorage
function getProfileData() {
    const currentUser = getCurrentUser();
    if (!currentUser) return null;
    
    const profileData = localStorage.getItem(`profile_${currentUser.email}`);
    return profileData ? JSON.parse(profileData) : null;
}

// Function to save profile data to localStorage
function saveProfileData(profile) {
    const currentUser = getCurrentUser();
    if (!currentUser) return;
    
    localStorage.setItem(`profile_${currentUser.email}`, JSON.stringify(profile));
}

// Function to calculate profile completeness
function calculateCompleteness(profile) {
    if (!profile) return 0;
    
    let filledFields = 0;
    const totalFields = 5; // fullName, branch, cgpa, skills, resume
    
    if (profile.fullName && profile.fullName.trim() !== '') filledFields++;
    if (profile.branch && profile.branch.trim() !== '') filledFields++;
    if (profile.cgpa && profile.cgpa > 0) filledFields++;
    if (profile.skills && profile.skills.trim() !== '') filledFields++;
    if (profile.resume && profile.resume.trim() !== '') filledFields++;
    
    return Math.round((filledFields / totalFields) * 100);
}

// Function to update profile completeness display
function updateCompletenessDisplay() {
    const profile = getProfileData();
    const completeness = calculateCompleteness(profile);
    
    document.getElementById('completenessPercentage').textContent = `${completeness}%`;
    document.getElementById('progressFill').style.width = `${completeness}%`;
}

// Function to populate profile form
function populateProfileForm() {
    const profile = getProfileData();
    const currentUser = getCurrentUser();
    
    if (!profile) {
        // Initialize with default values from user data
        document.getElementById('fullName').value = currentUser ? currentUser.name : '';
        document.getElementById('email').value = currentUser ? currentUser.email : '';
        document.getElementById('branch').value = '';
        document.getElementById('cgpa').value = '';
        document.getElementById('skills').value = '';
        document.getElementById('resumeMessage').textContent = 'No resume uploaded yet';
        document.getElementById('resumeFilename').textContent = '';
    } else {
        // Populate with saved profile data
        document.getElementById('fullName').value = profile.fullName || '';
        document.getElementById('email').value = currentUser ? currentUser.email : '';
        document.getElementById('branch').value = profile.branch || '';
        document.getElementById('cgpa').value = profile.cgpa || '';
        document.getElementById('skills').value = profile.skills || '';
        
        // Update resume status
        if (profile.resume && profile.resume.trim() !== '') {
            document.getElementById('resumeMessage').textContent = 'Resume uploaded successfully!';
            document.getElementById('resumeFilename').textContent = profile.resume;
        } else {
            document.getElementById('resumeMessage').textContent = 'No resume uploaded yet';
            document.getElementById('resumeFilename').textContent = '';
        }
    }
    
    updateCompletenessDisplay();
}

// Function to handle profile form submission
function handleProfileSubmit(e) {
    e.preventDefault();
    
    const profile = {
        fullName: document.getElementById('fullName').value,
        branch: document.getElementById('branch').value,
        cgpa: parseFloat(document.getElementById('cgpa').value) || 0,
        skills: document.getElementById('skills').value,
        resume: getProfileData()?.resume || '' // Preserve existing resume
    };
    
    saveProfileData(profile);
    updateCompletenessDisplay();
    showNotification('Profile saved successfully!', 'success');
}

// Function to handle resume upload
function handleResumeUpload() {
    const fileInput = document.getElementById('resumeUpload');
    const file = fileInput.files[0];
    
    if (!file) {
        showNotification('Please select a file to upload', 'error');
        return;
    }
    
    // Check if file is PDF
    if (file.type !== 'application/pdf') {
        showNotification('Please upload a PDF file only', 'error');
        return;
    }
    
    // In a real application, we would upload the file to a server
    // For this demo, we'll just save the filename to localStorage
    const fileName = file.name;
    
    // Update profile with resume filename
    const profile = getProfileData() || {};
    profile.resume = fileName;
    saveProfileData(profile);
    
    // Update UI
    document.getElementById('resumeMessage').textContent = 'Resume uploaded successfully!';
    document.getElementById('resumeFilename').textContent = fileName;
    updateCompletenessDisplay();
    
    showNotification('Resume uploaded successfully!', 'success');
}

// Initialize profile page
function initProfilePage() {
    // Check if user is logged in
    const currentUser = getCurrentUser();
    if (!currentUser) {
        window.location.href = 'login.html';
        return;
    }
    
    // Populate form with existing data
    populateProfileForm();
    
    // Add event listeners
    document.getElementById('profileForm').addEventListener('submit', handleProfileSubmit);
    document.getElementById('uploadResumeBtn').addEventListener('click', handleResumeUpload);
    document.getElementById('profileBackBtn').addEventListener('click', function() {
        window.location.href = 'dashboard.html';
    });
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initProfilePage();
});