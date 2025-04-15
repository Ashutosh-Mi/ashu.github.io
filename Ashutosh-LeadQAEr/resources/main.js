// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        window.scrollTo({
            top: targetElement.offsetTop - 80,
            behavior: 'smooth'
        });
    });
});

// Set Current Year in Footer
document.getElementById('year').textContent = new Date().getFullYear();

// Animation on Scroll
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.skill-category, .project-card, .cert-card');
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.3;
        if (elementPosition < screenPosition) {
            element.classList.add('animate');
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
animateOnScroll(); // Run once on load

// API Testing Tab System
const apiTabBtns = document.querySelectorAll('.api-tab-btn');
const apiTabContents = document.querySelectorAll('.api-tab-content');

apiTabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        apiTabBtns.forEach(btn => btn.classList.remove('active'));
        apiTabContents.forEach(content => content.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Interactive Framework Diagram
const frameworkComponents = document.querySelectorAll('.framework-component');

frameworkComponents.forEach(component => {
    component.addEventListener('click', () => {
        // Show detailed information about the clicked component
        const componentName = component.getAttribute('data-component');
        const componentInfo = document.getElementById(`${componentName}-info`);
        
        // Toggle visibility
        componentInfo.classList.toggle('show-info');
    });
});

// Test Execution Visualization
function visualizeTestExecution() {
    const testCases = [
        { name: 'Login Test', status: 'passed', duration: 2.3 },
        { name: 'Checkout Flow', status: 'passed', duration: 5.1 },
        { name: 'Search Functionality', status: 'failed', duration: 3.7 },
        { name: 'Profile Update', status: 'passed', duration: 4.2 }
    ];
    
    const executionViz = document.getElementById('execution-visualization');
    
    testCases.forEach(test => {
        const testElement = document.createElement('div');
        testElement.className = `test-case ${test.status}`;
        testElement.innerHTML = `
            <span class="test-name">${test.name}</span>
            <span class="test-duration">${test.duration}s</span>
            <div class="test-bar" style="width: ${test.duration * 20}px"></div>
        `;
        executionViz.appendChild(testElement);
    });
}

// Run on page load
document.addEventListener('DOMContentLoaded', visualizeTestExecution);

// Diagram Tab System
const diagramTabs = document.querySelectorAll('.diagram-tab');
const diagramContents = document.querySelectorAll('.diagram-content');

diagramTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs and contents
        diagramTabs.forEach(t => t.classList.remove('active'));
        diagramContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Show corresponding content
        const diagramId = tab.getAttribute('data-diagram');
        document.getElementById(`${diagramId}-diagram`).classList.add('active');
    });
});

// Test Executor Simulation
const testCases = document.querySelectorAll('.test-case');
const runTestBtn = document.getElementById('run-test');
const runAllBtn = document.getElementById('run-all');
const executionOutput = document.getElementById('execution-output');
const progressBar = document.getElementById('progress-bar');

testCases.forEach(testCase => {
    testCase.addEventListener('click', () => {
        testCases.forEach(tc => tc.classList.remove('active'));
        testCase.classList.add('active');
    });
});

runTestBtn.addEventListener('click', () => {
    const activeTest = document.querySelector('.test-case.active');
    simulateTestExecution(activeTest);
});

runAllBtn.addEventListener('click', () => {
    simulateTestSuiteExecution();
});

function simulateTestExecution(testElement) {
    const testStatus = testElement.querySelector('.test-status');
    const testName = testElement.querySelector('.test-name').textContent;
    
    // Reset output
    executionOutput.textContent = `[SYSTEM] Starting test: ${testName}\n`;
    progressBar.style.width = '0%';
    testStatus.className = 'test-status running';
    
    // Simulate test steps
    const steps = [
        `[TEST] Initializing test environment...`,
        `[TEST] Loading test data...`,
        `[TEST] Executing test steps...`,
        `[TEST] Verifying results...`,
        `[TEST] Cleaning up resources...`
    ];
    
    let progress = 0;
    const pass = Math.random() > 0.2; // 80% chance of passing
    
    steps.forEach((step, index) => {
        setTimeout(() => {
            executionOutput.textContent += `${step}\n`;
            executionOutput.scrollTop = executionOutput.scrollHeight;
            progress = ((index + 1) / steps.length) * 100;
            progressBar.style.width = `${progress}%`;
            
            if (index === steps.length - 1) {
                const result = pass ? 'PASSED' : 'FAILED';
                const resultMsg = pass ? 
                    `[RESULT] Test completed successfully` : 
                    `[ERROR] Verification failed at step 3`;
                
                executionOutput.textContent += `[RESULT] Test ${result}\n${resultMsg}\n`;
                testStatus.className = pass ? 'test-status passed' : 'test-status failed';
            }
        }, index * 800);
    });
}

function simulateTestSuiteExecution() {
    executionOutput.textContent = '[SYSTEM] Starting test suite execution...\n';
    progressBar.style.width = '0%';
    
    let completedTests = 0;
    const totalTests = testCases.length;
    
    testCases.forEach((testCase, index) => {
        setTimeout(() => {
            const testStatus = testCase.querySelector('.test-status');
            const testName = testCase.querySelector('.test-name').textContent;
            
            testStatus.className = 'test-status running';
            executionOutput.textContent += `\n[TEST ${index+1}/${totalTests}] Starting: ${testName}\n`;
            
            // Simulate test execution
            setTimeout(() => {
                completedTests++;
                const progress = (completedTests / totalTests) * 100;
                progressBar.style.width = `${progress}%`;
                
                const pass = Math.random() > 0.2;
                testStatus.className = pass ? 'test-status passed' : 'test-status failed';
                
                executionOutput.textContent += `[RESULT] ${pass ? 'PASSED' : 'FAILED'}\n`;
                
                if (completedTests === totalTests) {
                    executionOutput.textContent += '\n[SYSTEM] Test suite execution completed\n';
                }
                
                executionOutput.scrollTop = executionOutput.scrollHeight;
            }, 1500);
        }, index * 2000);
    });
}

// Dashboard Filter System
const filterBtns = document.querySelectorAll('.filter-btn');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Simulate data change
        const cards = document.querySelectorAll('.dashboard-card');
        cards.forEach(card => {
            const valueElement = card.querySelector('.card-value');
            const chartBar = card.querySelector('.chart-bar');
            const trendElement = card.querySelector('.card-trend');
            
            // Generate random data for demo
            const newValue = Math.floor(Math.random() * 30) + 70;
            const trendChange = Math.floor(Math.random() * 15) - 5;
            
            valueElement.textContent = btn.textContent === 'Year' ? 
                `${newValue - 5}%` : 
                `${newValue}%`;
                
            chartBar.style.height = `${newValue}%`;
            
            if (trendElement) {
                trendElement.textContent = `${trendChange > 0 ? '+' : ''}${trendChange}%`;
                trendElement.className = `card-trend ${trendChange >= 0 ? 'up' : 'down'}`;
            }
        });
    });
});

// Initialize dashboard charts
document.addEventListener('DOMContentLoaded', () => {
    const chartBars = document.querySelectorAll('.chart-bar');
    chartBars.forEach(bar => {
        // Animate the bars on page load
        const targetHeight = bar.style.height;
        bar.style.height = '0%';
        
        setTimeout(() => {
            bar.style.height = targetHeight;
        }, 300);
    });
});