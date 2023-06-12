import {JsonDocs} from "@stencil/core/internal";
import fs from "fs";

export interface WebTypesGeneratorConfig {
    name: string;
    version: string;
    defaultIconPath: string;
    outputPath: string;
}

export class WebTypesGenerator {
    constructor(public config: WebTypesGeneratorConfig) {}

    generateWebTypesJson = async(docsData: JsonDocs) => {
        const jsonData = {
            "$schema": "https://json.schemastore.org/web-types",
            "name": this.config.name,
            "version": this.config.version,
            "default-icon": this.config.defaultIconPath,
            "description-markup": "markdown",
            "contributions": {
                "html": {
                    "elements": docsData.components.map((component) => ({
                        name: component.tag,
                        description: component.docs,

                        attributes: component.props
                            .filter((prop) => prop.attr)
                            .map((prop) => ({
                                name: prop.attr,
                                description: prop.docs,
                                type: prop.type,
                                defaultValue: prop.default,
                                required: prop.required,
                            })),

                        properties: component.props.map((prop) => ({
                            name: prop.name,
                            type: prop.type,
                            description: prop.docs,
                            defaultValue: prop.default,
                            required: prop.required,
                        })),

                        "/js/events": component.events.map((event) => ({
                            name: event.event,
                            description: event.docs,
                        })),

                        methods: component.methods.map((method) => ({
                            name: method.name,
                            description: method.docs,
                            signature: method.signature,
                        })),

                        cssProperties: component.styles
                            .filter((style) => style.annotation === 'prop')
                            .map((style) => ({
                                name: style.name,
                                description: style.docs,
                            })),

                        cssParts: component.parts.map((part) => ({
                            name: part.name,
                            description: part.docs,
                        })),
                    }))
                }
            }
        };

        await fs.writeFile(
            this.config.outputPath,
            JSON.stringify(jsonData, null, 2),
            () => {}
        );
    }
}