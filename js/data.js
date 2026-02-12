// Dummy data for companies
const companies = [
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
    }
];

// Add new companies with AI-ML branch
companies.push(
    {
        id: 11,
        name: "Flipkart",
        role: "Software Engineer",
        package: "₹ 28.0 LPA",
        cgpaCutoff: 8.0,
        eligibleBranches: ["CSE", "IT", "AI-ML"]
    },
    {
        id: 12,
        name: "IBM",
        role: "Software Developer",
        package: "₹ 8.0 LPA",
        cgpaCutoff: 7.2,
        eligibleBranches: ["CSE", "IT", "ECE"]
    }
);

// Dummy users data
const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        password: "password123",
        branch: "CSE",
        cgpa: 8.5
    },
    {
        id: 2,
        name: "Jane Smith",
        email: "jane@example.com",
        password: "password456",
        branch: "ECE",
        cgpa: 7.2
    }
];

// Export data (for environments that support modules)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { companies, users };
}