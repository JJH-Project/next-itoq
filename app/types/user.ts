export interface UserPage {
    id: string;
    properties: {
        name: {
            title: Array<{
                plain_text: string;
            }>;
        };
        email: {
            email: string;
        };
        role: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
    };
} 