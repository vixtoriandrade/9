const inquirer = require('inquirer');
const fs = require('fs');

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

// ... rest of the code
