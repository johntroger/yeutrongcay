const fs = require('fs');

const plants = JSON.parse(fs.readFileSync('api/plants_data.json', 'utf8'));

const tsHeader = `import { Plant } from '../types/index.ts';\n\nexport const SEED_PLANTS: Plant[] = `;
const tsFooter = `;\n\nexport const allPlants: Plant[] = SEED_PLANTS;\n`;

fs.writeFileSync('src/data/plants.ts', tsHeader + JSON.stringify(plants, null, 2) + tsFooter, 'utf8');
console.log(`Synced src/data/plants.ts from api/plants_data.json (${plants.length} plants).`);
