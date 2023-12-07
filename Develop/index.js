const generateMarkdown = require('./utils/generateMarkdown')
const fs = require('fs');
const inquirer = require('inquirer');
const util = require('util');



const writeFileAsync = util.promisify(fs.writeFile);

// Array of questions for user input
const questions = [
    {
        type: 'input',
        name: 'projectName',
        message: 'What is the title of your project?',
    },
    {
        type: 'input',
        name: 'description',
        message: 'What is the description of your project?',
    },
    {
        type: 'input',
        name: 'installationinstruction',
        message: 'What are the instructions for installation?',
    },
    {
        type: 'input',
        name: 'usage',
        message: 'What is the project used for?',
    },
    {
        type: 'input',
        name: 'contributors',
        message: 'Who are the contributors for the project?',
    },
    {
        type: 'list',
        name: 'license',
        message: 'Select the appropriate license.',
        choices: ['Apache 2.0', 'MIT', 'BSD-3'],
    },
    {
        type: 'input',
        name: 'username',
        message: 'What is your GitHub username?',
    },
    {
        type: 'input',
        name: 'email',
        message: 'What is your email?',
    },
    {
        type: 'input',
        name: 'test',
        message: 'Is there any test included?',
    },
];

// Function to prompt the questions
async function promptUser() {
    try {
        const userInput = await inquirer.prompt(questions);
        return userInput;
    } catch (error) {
        console.error('Error while prompting user:', error);
    }
}

// Function to generate the content for the README file
function generateReadmeContent(data) {
    const markdownContent = generateMarkdown(data);
  

    return `
# ${data.projectName}

## Description
${data.description}

## Table of Contents
- [Installation Instructions](#installation-instructions)
- [Usage](#usage)
- [Test](#test)
- [License](#license)
- [Contributors](#contributors)
- [Questions](#questions)

## Installation Instructions
${data.installationinstruction}

## Usage
${data.usage}

## Test
${data.test}

## License
${data.license}

## Contributors
${data.contributors}

## Questions
Contact me for any further questions or help!
- GitHub: [${data.username}]
- Email: [${data.email}]
`;
}

// Function to write README file
async function writeToFile(fileName, data) {
    const content = generateReadmeContent(data);
    try {
        await writeFileAsync(fileName, content);
        console.log('README file generated successfully.');
    } catch (error) {
        console.error('Error generating README file:', error);
    }
}

// Function to initialize app
async function init() {
    console.log('Initializing the app...');
    const userInput = await promptUser();
    writeToFile('README.md', userInput);
}

// Function call to initialize app
init();
