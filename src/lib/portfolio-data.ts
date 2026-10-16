export const sections = ['Home', 'About', 'Experience', 'Skills', 'Work', 'Awards', 'Contact'] as const

export const profile = {
  name: 'Mukesh Kumar B',
  role: 'System Engineer · Troubleshooting & Software Quality',
  city: 'India',
  tagline: "I find what's broken, isolate why, and prove it's fixed.",
  intro: 'Computer Science Engineer with hands-on experience in system troubleshooting, software quality assurance, build stability verification, technical support, issue investigation and system validation.',
  about: 'I diagnose hardware, operating system, boot, application and configuration issues, validate systems after corrective actions, run regression testing and track defects across platforms. I am building my career in System Engineering, IT Operations, Linux, infrastructure support and networking fundamentals.',
  email: 'mukesh.b.kumar14@gmail.com',
  phone: '+91 9500354760',
  linkedin: 'https://www.linkedin.com/in/mukesh-kumar-b',
}

export const stats = [
  { value: 700, suffix: '+', label: 'defects tracked and retested' },
  { value: 5, suffix: '', label: 'certifications' },
  { value: 7.19, suffix: '', label: 'CGPA, B.E. Computer Science', decimals: 2 },
  { value: 2025, suffix: '', label: 'IEEE publication' },
]

export const experience = [
  {
    role: 'Game Quality Assurance Engineer', company: 'SIDE International Studios · PTW – Pole To Win, Bangalore', period: 'Mar 2026 – Aug 2026',
    summary: 'Build stability and software quality validation for a major game franchise across multiple platforms.',
    points: ['Verified stability of new software builds', 'Executed test cases and regression cycles', 'Logged, tracked and retested 700+ defects in JIRA', 'Supported release-quality validation'],
    chips: ['PC', 'Xbox', 'PS5', 'Steam Deck', 'Nintendo Switch'],
    flow: ['Build', 'Test', 'Identify', 'Log', 'Retest', 'Validate'],
  },
  {
    role: 'Service Engineer', company: 'Simsoft Info Systems · Tamil Nadu', period: 'May 2025 – Feb 2026',
    summary: 'Hands-on troubleshooting and system service for desktops and laptops.',
    points: ['Diagnosed hardware, OS and boot failures', 'Identified root causes and applied fixes', 'Tested systems after repairs and config changes', 'Communicated findings clearly to customers'],
    chips: ['Hardware', 'Operating system', 'Boot', 'Applications'],
    flow: ['Issue', 'Investigate', 'Root cause', 'Fix', 'Validate', 'Handover'],
  },
]

export const categories = ['All', 'Systems', 'Quality', 'Tools'] as const
export type Category = typeof categories[number]
export const skills: { name: string; category: Exclude<Category, 'All'>; icon: string }[] = [
  { name: 'Linux', category: 'Systems', icon: '$_' },
  { name: 'Networking', category: 'Systems', icon: '⇄' },
  { name: 'Hardware Diagnostics', category: 'Systems', icon: '⚙' },
  { name: 'OS & Boot Troubleshooting', category: 'Systems', icon: '⏻' },
  { name: 'Technical Support', category: 'Systems', icon: '☎' },
  { name: 'Regression Testing', category: 'Quality', icon: '↺' },
  { name: 'Build Verification', category: 'Quality', icon: '✓' },
  { name: 'Test Case Execution', category: 'Quality', icon: '▶' },
  { name: 'Defect Tracking', category: 'Quality', icon: '⚑' },
  { name: 'Root Cause Analysis', category: 'Quality', icon: '⌕' },
  { name: 'JIRA', category: 'Tools', icon: 'J' },
  { name: 'Power BI', category: 'Tools', icon: '▤' },
  { name: 'HTML / CSS / JS', category: 'Tools', icon: '</>' },
  { name: 'Machine Learning', category: 'Tools', icon: 'ML' },
]
export function filterSkills(category: Category) {
  return category === 'All' ? skills : skills.filter(s => s.category === category)
}

export const publication = {
  title: 'Integrity Assessment and Intrusion Detection Using ACGAN-Powered Machine Learning',
  description: 'An intrusion detection research project using an Auxiliary Classifier Generative Adversarial Network (ACGAN) to generate synthetic attack data and support intrusion detection.',
  venue: '2025 International Conference on Data Science, Agents & Artificial Intelligence (ICDSAAI), Chennai, India',
  authors: 'B. M. Kumar, R. N. Kumar and V. Muthulakshmi',
  doi: '10.1109/ICDSAAI65575.2025.11011683',
  tags: ['Machine Learning', 'ACGAN', 'Intrusion Detection', 'Cybersecurity', 'Synthetic Data'],
}

export const certifications = [
  { issuer: 'Microsoft Certified', name: 'Power BI Data Analyst Associate', code: 'PL-300' },
  { issuer: 'Microsoft Certified', name: 'Fabric Analytics Engineer Associate', code: 'DP-600' },
  { issuer: 'Oracle Certified', name: 'AI Foundations Associate', code: 'OCI' },
  { issuer: 'Coursera · Johns Hopkins', name: 'HTML, CSS and JavaScript for Web Developers', code: 'WEB' },
  { issuer: 'NPTEL', name: 'Software Testing', code: 'QA' },
]

export const education = { school: "St Joseph's College of Engineering", degree: 'B.E. Computer Science Engineering', period: '2021 – 2025 · CGPA 7.19' }
