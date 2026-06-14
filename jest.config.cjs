// <rootDir> confs
module.exports = {
  // exclude from <rootDir> project test
  modulePathIgnorePatterns: [
    '<rootDir>/automata/automata-app',
    '<rootDir>/automata/automata-cache',
    '<rootDir>/automata/automata-db',
    '<rootDir>/automata/automata-rest',
    '<rootDir>/automata/automata-user-management',
    '<rootDir>/automata/automata-utils',
  ],
  projects: [
    '<rootDir>',
    '<rootDir>/automata/automata-app',
    '<rootDir>/automata/automata-cache',
    '<rootDir>/automata/automata-db',
    '<rootDir>/automata/automata-rest',
    '<rootDir>/automata/automata-user-management',
    '<rootDir>/automata/automata-utils',
  ],
  setupFiles: ['./jest/jest.setup.config.js'],
  setupFilesAfterEnv: ['./jest/jest.setup.db.js'],
};
