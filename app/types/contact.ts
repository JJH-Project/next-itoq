export interface ContactPage {
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
        formTitle: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
        contents: {
            rich_text: Array<{
                plain_text: string;
            }>;
        };
    };
} 