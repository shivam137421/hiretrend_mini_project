// Recommendation functions

// Function to get recommended companies based on user profile
function getRecommendedCompanies() {
    const user = getCurrentUser();
    if (!user) return [];
    
    const allCompanies = getCompanies();
    
    // Get user profile data
    const profileData = localStorage.getItem(`profile_${user.email}`);
    if (!profileData) return allCompanies; // Return all if no profile
    
    const profile = JSON.parse(profileData);
    
    // Filter companies based on user profile
    const recommendedCompanies = allCompanies.filter(company => {
        // Check branch match
        const branchMatch = company.eligibleBranches.includes(user.branch);
        
        // Check CGPA match (allowing for slight variations)
        const cgpaMatch = user.cgpa >= company.cgpaCutoff;
        const closeCgpa = user.cgpa >= (company.cgpaCutoff - 0.5);
        
        // Check if user's skills match company requirements (basic check)
        let skillsMatch = true;
        if (profile.skills && profile.skills.trim() !== '') {
            const userSkills = profile.skills.toLowerCase().split(',').map(skill => skill.trim());
            // This is a simplified check - in a real app, you'd have more sophisticated matching
            skillsMatch = userSkills.length > 0;
        }
        
        return branchMatch && (cgpaMatch || closeCgpa) && skillsMatch;
    });
    
    return recommendedCompanies;
}

// Function to update recommendations when profile changes
function updateRecommendations() {
    // This function can be called when profile data is updated
    // For now, we're handling this in the dashboard render functions
    console.log("Recommendations updated");
}