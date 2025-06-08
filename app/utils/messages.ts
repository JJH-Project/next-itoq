import messages from '../messages/ja.json';

export function getMessage(path: string): string {
    const keys = path.split('.');
    let result: any = messages;
    
    for (const key of keys) {
        if (result[key] === undefined) {
        console.warn(`Message not found for path: ${path}`);
        return path;
        }
        result = result[key];
    }
    
    return result;
} 