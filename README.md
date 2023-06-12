# stenciljs-web-types-generator
Generator of Web-Types for StencilJS web components. Web-Types is a JSON format for documenting web component libraries, aimed at providing IDEs and other tools with the metadata information about the contents of a component library. See for more information https://github.com/JetBrains/web-types.

## Installation
Installation can be done using npm alongside your created StencilJS web components.
```bash
npm install stenciljs-web-types-generator
```

## Usage
1. Add the following to your `stencil.config.ts` to generate the Web-Types during a build:
```typescript
import {WebTypesGenerator} from "stenciljs-web-types-generator/web-types-generator";
import { Config } from '@stencil/core';

export const config: Config = {
  outputTargets: [
    {
      type: 'docs-custom',
      generator: new WebTypesGenerator({
        name: "<your-component-library-name>",
        version: "<your-component-library-version>",
        outputPath: "dist/types/web-types.json"
      }).generateWebTypesJson,
    }
  ]
};
```
2. Add a reference to the generated Web-Types file in your `package.json`:
```json
{
  "web-types": "dist/types/web-types.json",
}
```
You're done. Editors supporting Web-Types (like IntelliJ) will automatically pick up the types and start offering suggestions, autocompletion etc.
