export interface SystemPage {
    id: string;
    properties: {
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
        image?: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
    };
} 