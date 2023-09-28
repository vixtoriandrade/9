const inquirer = require('inquirer');
const fs = require('fs');

// Function to render the license badge
function renderLicenseBadge(license) {
  const licenseBadgeMap = {
    'MIT': '[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)',
    'Apache 2.0': '[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)',
    // Add more licenses and badge URLs as needed
  };
  return licenseBadgeMap[license] || '';
}

// Function to render the license link
function renderLicenseLink(license) {
  const licenseLinkMap = {
    'MIT': 'https://opensource.org/licenses/MIT',
    'Apache 2.0': 'https://opensource.org/licenses/Apache-2.0',
    // Add more licenses and URLs as needed
  };
  return licenseLinkMap[license] || '';
}

// Function to render the license section of README
function renderLicenseSection(license) {
  return `## License

This project is licensed under the [${license}](${renderLicenseLink(license)}) license.`;
}

function generateMarkdown(data) {
  const licenseBadge = renderLicenseBadge(data.license);
  return `# ${data.title}

${licenseBadge}

## Description

${data.description}

${renderLicenseSection(data.license)}

## Questions

GitHub: [${data.githubUsername}](https://github.com/${data.githubUsername})

If you have any questions, please contact me at ${data.email}.
`;
}

function writeToFile(fileName, data) {
  fs.writeFile(fileName, data, (err) => {
    if (err) {
      console.error(err);
    } else {
      console.log(`Successfully created ${fileName}`);
    }
  });
}

const questions = [
  {
    type: 'input',
    name: 'title',
    message: 'Enter the project title:',
  },
  {
    type: 'input',
    name: 'description',
    message: 'Enter a project description:',
  },
  {
    type: 'list',
    name: 'license',
    message: 'Choose a license for your project:',
    choices: ['MIT', 'Apache 2.0', 'Other'], // Add more license options as needed
  },
  {
    type: 'input',
    name: 'installation',
    message: 'Enter installation instructions:',
  },
  {
    type: 'input',
    name: 'usage',
    message: 'Enter usage information:',
  },
  {
    type: 'input',
    name: 'contributing',
    message: 'Enter contribution guidelines:',
  },
  {
    type: 'input',
    name: 'tests',
    message: 'Enter test instructions:',
  },
  {
    type: 'input',
    name: 'githubUsername',
    message: 'Enter your GitHub username:',
  },
  {
    type: 'input',
    name: 'email',
    message: 'Enter your email address:',
  },
];

function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      const readmeContent = generateMarkdown(answers);
      writeToFile('README.md', readmeContent);
    })
    .catch((err) => {
      console.error(err);
    });
}

init();
