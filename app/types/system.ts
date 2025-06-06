export interface SystemProperties {
    title: {
        title: Array<{
            plain_text: string;
        }>;
    };
    contents: {
        rich_text: Array<{
            plain_text: string;
        }>;
    };
    image: {
        rich_text: Array<{
            plain_text: string;
        }>;
    };
}

export interface SystemPageType {
    id: string;
    properties: SystemProperties;
} 