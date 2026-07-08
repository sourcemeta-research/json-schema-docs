const fs = require('fs');
const path = require('path');

const DOCS_DIR = path.join(__dirname, 'draft-3-docs');
if (!fs.existsSync(DOCS_DIR)) {
  fs.mkdirSync(DOCS_DIR);
}

// 1. Detailed NPM Package Manifest Schema (100+ lines)
const packageJsonSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "NPM Package Specification",
  "description": "Comprehensive NPM package.json configuration schema for Node.js developers.",
  "type": "object",
  "properties": {
    "name": {
      "type": "string",
      "required": true,
      "pattern": "^[a-zA-Z0-9-._]+$",
      "description": "The unique name of the package."
    },
    "version": {
      "type": "string",
      "required": true,
      "pattern": "^[0-9]+\\.[0-9]+\\.[0-9]+(-[a-zA-Z0-9.]+)?$",
      "description": "Semantic version number."
    },
    "description": { "type": "string" },
    "keywords": {
      "type": "array",
      "items": { "type": "string" }
    },
    "homepage": { "type": "string", "format": "uri" },
    "bugs": {
      "type": ["string", "object"],
      "properties": {
        "url": { "type": "string", "format": "uri" },
        "email": { "type": "string", "format": "email" }
      }
    },
    "license": { "type": "string", "default": "ISC" },
    "author": {
      "type": ["string", "object"],
      "properties": {
        "name": { "type": "string", "required": true },
        "email": { "type": "string", "format": "email" },
        "url": { "type": "string", "format": "uri" }
      }
    },
    "contributors": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "name": { "type": "string", "required": true },
          "email": { "type": "string", "format": "email" }
        }
      }
    },
    "bin": {
      "type": ["string", "object"],
      "additionalProperties": { "type": "string" }
    },
    "repository": {
      "type": "object",
      "required": ["type", "url"],
      "properties": {
        "type": { "type": "string", "default": "git" },
        "url": { "type": "string" },
        "directory": { "type": "string" }
      }
    },
    "scripts": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "dependencies": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "devDependencies": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "peerDependencies": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "engines": {
      "type": "object",
      "properties": {
        "node": { "type": "string", "default": ">=18.0.0" },
        "npm": { "type": "string" }
      }
    },
    "publishConfig": {
      "type": "object",
      "properties": {
        "registry": { "type": "string", "format": "uri" },
        "access": { "type": "string", "default": "public" }
      }
    }
  }
};

// 2. TSConfig Schema (100+ lines)
const tsConfigSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "TypeScript Compiler Settings",
  "description": "Extensive TypeScript configuration schema detailing compiler options.",
  "type": "object",
  "properties": {
    "compilerOptions": {
      "type": "object",
      "properties": {
        "target": { "type": "string", "default": "es2022" },
        "module": { "type": "string", "default": "commonjs" },
        "lib": {
          "type": "array",
          "items": { "type": "string" }
        },
        "allowJs": { "type": "boolean", "default": false },
        "checkJs": { "type": "boolean", "default": false },
        "jsx": { "type": "string" },
        "declaration": { "type": "boolean", "default": false },
        "declarationMap": { "type": "boolean", "default": false },
        "emitDeclarationOnly": { "type": "boolean", "default": false },
        "sourceMap": { "type": "boolean", "default": false },
        "outDir": { "type": "string" },
        "rootDir": { "type": "string" },
        "removeComments": { "type": "boolean", "default": false },
        "noEmit": { "type": "boolean", "default": false },
        "strict": { "type": "boolean", "default": true },
        "noImplicitAny": { "type": "boolean", "default": true },
        "strictNullChecks": { "type": "boolean", "default": true },
        "strictFunctionTypes": { "type": "boolean", "default": true },
        "noUnusedLocals": { "type": "boolean", "default": false },
        "noUnusedParameters": { "type": "boolean", "default": false },
        "noImplicitReturns": { "type": "boolean", "default": false },
        "moduleResolution": { "type": "string", "default": "node" },
        "baseUrl": { "type": "string" },
        "paths": {
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": { "type": "string" }
          }
        },
        "esModuleInterop": { "type": "boolean", "default": true },
        "experimentalDecorators": { "type": "boolean", "default": false },
        "emitDecoratorMetadata": { "type": "boolean", "default": false }
      }
    },
    "files": {
      "type": "array",
      "items": { "type": "string" }
    },
    "include": {
      "type": "array",
      "items": { "type": "string" }
    },
    "exclude": {
      "type": "array",
      "items": { "type": "string" }
    },
    "references": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["path"],
        "properties": {
          "path": { "type": "string" },
          "prepend": { "type": "boolean", "default": false }
        }
      }
    }
  }
};

// 3. Docker Compose Schema (100+ lines)
const dockerComposeSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "Docker Compose Configuration",
  "description": "Multi-service container definitions, volumes, and network settings.",
  "type": "object",
  "properties": {
    "version": { "type": "string", "required": true },
    "services": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "image": { "type": "string" },
          "build": {
            "type": ["string", "object"],
            "properties": {
              "context": { "type": "string" },
              "dockerfile": { "type": "string", "default": "Dockerfile" },
              "args": {
                "type": "object",
                "additionalProperties": { "type": "string" }
              }
            }
          },
          "container_name": { "type": "string" },
          "ports": {
            "type": "array",
            "items": { "type": "string" }
          },
          "volumes": {
            "type": "array",
            "items": { "type": "string" }
          },
          "networks": {
            "type": "array",
            "items": { "type": "string" }
          },
          "environment": {
            "type": ["array", "object"],
            "additionalProperties": { "type": "string" }
          },
          "command": {
            "type": ["string", "array"],
            "items": { "type": "string" }
          },
          "restart": { "type": "string", "default": "always" },
          "depends_on": {
            "type": "array",
            "items": { "type": "string" }
          },
          "healthcheck": {
            "type": "object",
            "properties": {
              "test": {
                "type": ["string", "array"],
                "items": { "type": "string" }
              },
              "interval": { "type": "string", "default": "30s" },
              "timeout": { "type": "string", "default": "10s" },
              "retries": { "type": "integer", "default": 3 }
            }
          }
        }
      }
    },
    "volumes": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "driver": { "type": "string", "default": "local" },
          "external": { "type": "boolean", "default": false }
        }
      }
    },
    "networks": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "properties": {
          "driver": { "type": "string", "default": "bridge" },
          "external": { "type": "boolean", "default": false }
        }
      }
    }
  }
};

// 4. GitHub Actions Workflow Schema (100+ lines)
const githubWorkflowSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "GitHub Actions Workflow Setup",
  "description": "Complete CI/CD workflow automation pipeline settings.",
  "type": "object",
  "properties": {
    "name": { "type": "string", "required": true },
    "on": {
      "type": ["string", "array", "object"],
      "properties": {
        "push": {
          "type": "object",
          "properties": {
            "branches": {
              "type": "array",
              "items": { "type": "string" }
            },
            "tags": {
              "type": "array",
              "items": { "type": "string" }
            }
          }
        },
        "pull_request": {
          "type": "object",
          "properties": {
            "branches": {
              "type": "array",
              "items": { "type": "string" }
            }
          }
        },
        "schedule": {
          "type": "array",
          "items": {
            "type": "object",
            "properties": {
              "cron": { "type": "string" }
            }
          }
        }
      }
    },
    "env": {
      "type": "object",
      "additionalProperties": { "type": "string" }
    },
    "jobs": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["runs-on", "steps"],
        "properties": {
          "name": { "type": "string" },
          "runs-on": { "type": "string", "default": "ubuntu-latest" },
          "needs": {
            "type": ["string", "array"],
            "items": { "type": "string" }
          },
          "env": {
            "type": "object",
            "additionalProperties": { "type": "string" }
          },
          "steps": {
            "type": "array",
            "items": {
              "type": "object",
              "required": ["run"],
              "properties": {
                "name": { "type": "string" },
                "uses": { "type": "string" },
                "with": {
                  "type": "object",
                  "additionalProperties": { "type": "string" }
                },
                "run": { "type": "string" },
                "env": {
                  "type": "object",
                  "additionalProperties": { "type": "string" }
                },
                "continue-on-error": { "type": "boolean", "default": false }
              }
            }
          }
        }
      }
    }
  }
};

// 5. OpenAPI v2 Schema (100+ lines)
const openApiSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "OpenAPI / Swagger Contract",
  "description": "Comprehensive structure defining API paths, security, and objects.",
  "type": "object",
  "properties": {
    "swagger": { "type": "string", "required": true, "default": "2.0" },
    "info": {
      "type": "object",
      "required": ["title", "version"],
      "properties": {
        "title": { "type": "string" },
        "version": { "type": "string" },
        "description": { "type": "string" },
        "termsOfService": { "type": "string" },
        "contact": {
          "type": "object",
          "properties": {
            "name": { "type": "string" },
            "email": { "type": "string" },
            "url": { "type": "string" }
          }
        }
      }
    },
    "host": { "type": "string" },
    "basePath": { "type": "string", "default": "/" },
    "schemes": {
      "type": "array",
      "items": { "type": "string" }
    },
    "consumes": {
      "type": "array",
      "items": { "type": "string" }
    },
    "produces": {
      "type": "array",
      "items": { "type": "string" }
    },
    "paths": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "properties": {
            "summary": { "type": "string" },
            "description": { "type": "string" },
            "operationId": { "type": "string" },
            "parameters": {
              "type": "array",
              "items": {
                "type": "object",
                "required": ["name", "in"],
                "properties": {
                  "name": { "type": "string" },
                  "in": { "type": "string" },
                  "description": { "type": "string" },
                  "required": { "type": "boolean", "default": false },
                  "type": { "type": "string" }
                }
              }
            }
          }
        }
      }
    }
  }
};

// 6. Kubernetes Pod Specification Schema (100+ lines)
const kubernetesPodSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "Kubernetes Pod Template",
  "description": "Standard configuration parameters defining container runtime environments.",
  "type": "object",
  "properties": {
    "apiVersion": { "type": "string", "required": true, "default": "v1" },
    "kind": { "type": "string", "required": true, "default": "Pod" },
    "metadata": {
      "type": "object",
      "required": ["name"],
      "properties": {
        "name": { "type": "string" },
        "namespace": { "type": "string", "default": "default" },
        "labels": {
          "type": "object",
          "additionalProperties": { "type": "string" }
        },
        "annotations": {
          "type": "object",
          "additionalProperties": { "type": "string" }
        }
      }
    },
    "spec": {
      "type": "object",
      "required": ["containers"],
      "properties": {
        "restartPolicy": { "type": "string", "default": "Always" },
        "dnsPolicy": { "type": "string", "default": "ClusterFirst" },
        "hostNetwork": { "type": "boolean", "default": false },
        "containers": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["name", "image"],
            "properties": {
              "name": { "type": "string" },
              "image": { "type": "string" },
              "command": {
                "type": "array",
                "items": { "type": "string" }
              },
              "workingDir": { "type": "string" },
              "ports": {
                "type": "array",
                "items": {
                  "type": "object",
                  "required": ["containerPort"],
                  "properties": {
                    "name": { "type": "string" },
                    "containerPort": { "type": "integer" },
                    "protocol": { "type": "string", "default": "TCP" }
                  }
                }
              },
              "imagePullPolicy": { "type": "string", "default": "IfNotPresent" }
            }
          }
        }
      }
    }
  }
};

// 7. GeoJSON Schema (100+ lines)
const geoJsonSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "GeoJSON Feature Collection Specification",
  "description": "Data structures representing spatial coordinates and feature properties.",
  "type": "object",
  "properties": {
    "type": { "type": "string", "required": true, "default": "FeatureCollection" },
    "bbox": {
      "type": "array",
      "items": { "type": "number" },
      "minItems": 4,
      "maxItems": 6
    },
    "features": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["type", "geometry", "properties"],
        "properties": {
          "type": { "type": "string", "default": "Feature" },
          "id": { "type": ["string", "number"] },
          "properties": {
            "type": ["object", "null"],
            "additionalProperties": { "type": "string" }
          },
          "geometry": {
            "type": "object",
            "required": ["type", "coordinates"],
            "properties": {
              "type": {
                "type": "string",
                "default": "Point"
              },
              "coordinates": {
                "type": "array",
                "items": {
                  "type": ["number", "array"],
                  "items": {
                    "type": ["number", "array"],
                    "items": { "type": "number" }
                  }
                }
              }
            }
          }
        }
      }
    },
    "crs": {
      "type": "object",
      "required": ["type", "properties"],
      "properties": {
        "type": { "type": "string", "default": "name" },
        "properties": {
          "type": "object",
          "required": ["name"],
          "properties": {
            "name": { "type": "string" }
          }
        }
      }
    }
  }
};

// 8. PWA Web App Manifest Schema (100+ lines)
const webManifestSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "Web App Manifest Specification",
  "description": "Configuration metadata enabling progressive web application installation.",
  "type": "object",
  "properties": {
    "name": { "type": "string", "required": true },
    "short_name": { "type": "string" },
    "description": { "type": "string" },
    "start_url": { "type": "string", "default": "/" },
    "display": { "type": "string", "default": "standalone" },
    "orientation": { "type": "string", "default": "any" },
    "background_color": { "type": "string", "default": "#ffffff" },
    "theme_color": { "type": "string" },
    "lang": { "type": "string", "default": "en-US" },
    "dir": { "type": "string", "default": "ltr" },
    "scope": { "type": "string" },
    "prefer_related_applications": { "type": "boolean", "default": false },
    "categories": {
      "type": "array",
      "items": { "type": "string" }
    },
    "icons": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["src", "sizes"],
        "properties": {
          "src": { "type": "string" },
          "sizes": { "type": "string" },
          "type": { "type": "string", "default": "image/png" },
          "purpose": { "type": "string", "default": "any" }
        }
      }
    },
    "shortcuts": {
      "type": "array",
      "items": {
        "type": "object",
        "required": ["name", "url"],
        "properties": {
          "name": { "type": "string" },
          "short_name": { "type": "string" },
          "url": { "type": "string" },
          "icons": {
            "type": "array",
            "items": {
              "type": "object",
              "properties": {
                "src": { "type": "string" },
                "sizes": { "type": "string" }
              }
            }
          }
        }
      }
    }
  }
};

// 9. VS Code Extension Manifest Schema (100+ lines)
const vscodeExtensionSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "VS Code Manifest settings",
  "description": "Integration configurations describing visual components and menu contributions.",
  "type": "object",
  "properties": {
    "publisher": { "type": "string", "required": true },
    "displayName": { "type": "string" },
    "categories": {
      "type": "array",
      "items": { "type": "string" }
    },
    "activationEvents": {
      "type": "array",
      "items": { "type": "string" }
    },
    "engines": {
      "type": "object",
      "required": ["vscode"],
      "properties": {
        "vscode": { "type": "string", "default": "^1.80.0" }
      }
    },
    "contributes": {
      "type": "object",
      "properties": {
        "commands": {
          "type": "array",
          "items": {
            "type": "object",
            "required": ["command", "title"],
            "properties": {
              "command": { "type": "string" },
              "title": { "type": "string" },
              "category": { "type": "string" }
            }
          }
        },
        "menus": {
          "type": "object",
          "properties": {
            "editor/title": {
              "type": "array",
              "items": {
                "type": "object",
                "properties": {
                  "command": { "type": "string" },
                  "when": { "type": "string" },
                  "group": { "type": "string" }
                }
              }
            }
          }
        },
        "configuration": {
          "type": "object",
          "properties": {
            "title": { "type": "string" },
            "properties": {
              "type": "object",
              "additionalProperties": {
                "type": "object",
                "properties": {
                  "type": { "type": "string" },
                  "default": { "type": "any" },
                  "description": { "type": "string" }
                }
              }
            }
          }
        }
      }
    }
  }
};

// 10. AWS CloudFormation Schema (100+ lines)
const awsSchema = {
  "$schema": "http://json-schema.org/draft-03/schema#",
  "title": "AWS CloudFormation Specification",
  "description": "Infrastructure template parameters, intrinsic mappings, and output variables.",
  "type": "object",
  "properties": {
    "AWSTemplateFormatVersion": { "type": "string", "default": "2010-09-09" },
    "Description": { "type": "string" },
    "Parameters": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["Type"],
        "properties": {
          "Type": { "type": "string", "default": "String" },
          "Default": { "type": "string" },
          "AllowedValues": {
            "type": "array",
            "items": { "type": "string" }
          },
          "Description": { "type": "string" }
        }
      }
    },
    "Mappings": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {
          "type": "object",
          "additionalProperties": { "type": "string" }
        }
      }
    },
    "Resources": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["Type", "Properties"],
        "properties": {
          "Type": { "type": "string" },
          "Properties": {
            "type": "object",
            "additionalProperties": { "type": "any" }
          }
        }
      }
    },
    "Outputs": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "required": ["Value"],
        "properties": {
          "Description": { "type": "string" },
          "Value": { "type": ["string", "object"] },
          "Export": {
            "type": "object",
            "required": ["Name"],
            "properties": {
              "Name": { "type": "string" }
            }
          }
        }
      }
    }
  }
};

const schemasMap = {
  '1-package-json': packageJsonSchema,
  '2-tsconfig-json': tsConfigSchema,
  '3-docker-compose': dockerComposeSchema,
  '4-github-workflow': githubWorkflowSchema,
  '5-openapi': openApiSchema,
  '6-kubernetes-pod': kubernetesPodSchema,
  '7-geojson': geoJsonSchema,
  '8-web-manifest': webManifestSchema,
  '9-vscode-extension': vscodeExtensionSchema,
  '10-aws-cloudformation': awsSchema
};

Object.entries(schemasMap).forEach(([name, json]) => {
  const filePath = path.join(DOCS_DIR, `${name}.json`);
  fs.writeFileSync(filePath, JSON.stringify(json, null, 2), 'utf8');
  console.log(`[Success] Written: ${name}.json (${fs.readFileSync(filePath, 'utf8').split('\n').length} lines)`);
});
console.log('--- Successfully populated 10 complex schemas of at least 100+ lines each! ---');
