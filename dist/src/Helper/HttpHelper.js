"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = new class HttpHelper {
    Convert(response, result) {
        var objectToCamel = JSON.parse(JSON.stringify(result), this.ToCamelCase);
        return response.status(result.success ? 200 : 400).json(objectToCamel);
    }
    ParseRequest(object) {
        return JSON.parse(JSON.stringify(object), this.ToPascalCase);
    }
    ToCamelCase(key, value) {
        if (value && typeof value === 'object') {
            for (var k in value) {
                if (/^[A-Z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                    value[k.charAt(0).toLowerCase() + k.substring(1)] = value[k];
                    delete value[k];
                }
            }
        }
        return value;
    }
    ToPascalCase(key, value) {
        if (value && typeof value === 'object') {
            for (var k in value) {
                if (/^[a-z]/.test(k) && Object.hasOwnProperty.call(value, k)) {
                    value[k.charAt(0).toUpperCase() + k.substring(1)] = value[k];
                    delete value[k];
                }
            }
        }
        return value;
    }
};
