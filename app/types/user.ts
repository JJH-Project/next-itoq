export interface UserPage {
    id: string;
    properties: {
        name: {
            title: Array<{
                plain_text: string;
            }>;
        };
        email: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
        password: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
        role: {
            title: Array<{
                plain_text: string;
            }>;
        };
    };
} 