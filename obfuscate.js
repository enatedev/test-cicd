import pkg from 'javascript-obfuscator';
const { obfuscate } = pkg;
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

(async () => {
  try {
    // Define paths 
    const inputFilePath = join(process.cwd(), 'dist/assets/index.js');
    const outputFilePath = join(process.cwd(), 'dist/assets/index.min.js');

    // Read the JavaScript file
    const code = readFileSync(inputFilePath, 'utf8');

    // Obfuscate the code
    const obfuscatedCode = obfuscate(code, {
      compact: true,
      controlFlowFlattening: true
    }).getObfuscatedCode();

    // Write the obfuscated code to a new file
    writeFileSync(outputFilePath, obfuscatedCode);

    console.log(`Obfuscated file written to ${outputFilePath}`);
  } catch (error) {
    console.error('Error during obfuscation:', error);
  }
})();