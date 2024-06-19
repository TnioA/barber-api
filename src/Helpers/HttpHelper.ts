import { Response } from 'express';

export default new class HttpHelper {

    public Convert(response: Response, result: any): Response {
        var objectToCamel = JSON.parse(JSON.stringify(result), this.ToCamelCase);
        return response.status(result.success ? 200 : 400).json(objectToCamel);
    }

    public ParseRequest(object: any) {
        return JSON.parse(JSON.stringify(object), this.ToPascalCase);
    }

    private ToCamelCase(key: any, value: any) {
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

    private ToPascalCase(key: any, value: any) {
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
} 